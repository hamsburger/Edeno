import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import flask
from flask import escape
from flask import request
import os
from flask import Flask
from utilities import FirebaseManager, ChromeDriver, camelCase
from firebase_admin import auth
from PipelineObjects.plant_rec_sample_response import create_NGA_dict
from datetime import datetime
import time
import json
import re

firebase_handler = FirebaseManager()
app = Flask(__name__)

FIREBASE_URL = "https://edeno-b66fc-default-rtdb.firebaseio.com/"
CRED_PATH='./utilities/service_account_key/serviceAccountKey.json'
PATH = ""
PROD = 0

cred = credentials.Certificate(CRED_PATH)
firebase_admin.initialize_app(cred, {
    'databaseURL': FIREBASE_URL
})

@app.route("/scrape-nga", methods=['POST'])
def scrape_nga_data():
    '''
    Scrape NGA and RAPITEST for data
    INPUT: Plant.id object
    OUTPUT: JSON Recommendation Data for one plant, in addition to other possible common names
    '''
    searchName = request.args.get("searchName")
    commonName = request.args.get("commonName") 

    plant_common_name = commonName
    plant_common_name_cc = camelCase(plant_common_name)

    # If not exists, Garden.org Scraper    
    newDriver = ChromeDriver()
    NGA_dict = newDriver.scrapeNGA(searchName)

    # Attempt Genus only + Common Name search
    # taxonomy = camelCase(plant_details["taxonomy"]["genus"])
    for elem in [plant_common_name_cc]:
        rapi_reference = db.reference(f"recommendations/rapitest/{elem}")
        water_recommendation = rapi_reference.get()
        if water_recommendation:
            moisture_recommendation = water_recommendation["moisture"] * 10
            NGA_dict["soilMoistureData"] = {
                "lowerIdeal" : moisture_recommendation
            } 
            break


    # Add entry plant.id common name --> garden.org common name 
    # so that we do not have to rescrape plants identified by two users
    # firebase_handler.set_reference(
    #     f"recommendations/plantIdToNGAMap"
    # )

    # garden_org_name = camelCase(NGA_dict["gardenOrgCommonName"])
    # firebase_handler.insert_data_on_key(
    #     plant_common_name_cc, garden_org_name
    # )
    ## Insert Actual Data
    firebase_handler.set_reference("recommendations/NGA")
    firebase_handler.insert_data_on_key(plant_common_name_cc, NGA_dict)          
    return NGA_dict


# 1. Check if recommendation data exist for specific plant/database key. If exists, we return that piece of data. If not, web scrape.
# 2. Fetch plant recommendation data using ChromeDriver
# 3. Keep track of Firebase URL so we can write to our database later 
# default_app = firebas.initialize_app()
@app.route("/get-plant-information-by-plant-id", methods=['POST'])
def get_recommendation_data():
    NGA_dict = create_NGA_dict()
    # '''
    # 1. Check if plant recommendations have already been populated in Firebase Database. If yes, return object.
    # 2. Else, Scrape NGA and RAPITEST for data

    # INPUT: Plant.id object
    # OUTPUT: JSON Recommendation Data for one plant, in addition to other possible common names
    # '''
    # request_json = request.get_json(force=True)
    # if not request_json:
    #     raise Exception("Request Object is not passed into Request correctly")
    # elif "plant_id_obj" not in request_json:
    #     raise Exception("plant.id Request Object has invalid format")
    plantId = request.args.get("plantId")
    client_token = request.args.get("token")
    user_uid = None
    if client_token:
        decoded_token = auth.verify_id_token(client_token)
        user_uid = decoded_token['uid']

    
    plant_ref = db.reference(f'users/{user_uid}/plants/{plantId}')
    plant_details = plant_ref.get()
    plant_common_name = plant_details["commonName"]
    plant_nick_name = plant_details["nickName"]
    plant_common_name_cc = camelCase(plant_common_name)
    
    NGA_dict["plantName"] = f"{plant_nick_name} ({plant_common_name})"
    NGA_dict["plantId"] = plantId


    def process_time(time_obj):
        the_time = datetime.strptime(time_obj, "%Y-%m-%d %H:%M:%S.%f")
        return time.mktime(the_time.timetuple())
    
    NGA_dict["addedDate"] = process_time(plant_details["addedDate"])
    
    # Return Recommendations from Firebase. Assume they always exist
    rec_reference = db.reference(f"recommendations/NGA/{plant_common_name_cc}")
    recommendation_data = rec_reference.get()
    
    if recommendation_data:
        if "phData" in recommendation_data:
            NGA_dict["phData"].update(recommendation_data["phData"])

        if "soilMoistureData" in recommendation_data:
            NGA_dict["soilMoistureData"].update(
                recommendation_data["soilMoistureData"]
            )

        if "humidityData" in recommendation_data:
            NGA_dict["humidityData"].update(
                recommendation_data["humidityData"]
            )

        if "temperatureData" in recommendation_data:
            NGA_dict["temperatureData"].update(recommendation_data["temperatureData"])

        if "lightIntensityData" in recommendation_data:
            NGA_dict["lightIntensityData"].update(recommendation_data["lightIntensityData"])


    # Measurement Dates and Values
    measurements_ref = plant_ref.child("readings/SavedReadings")
    measurements_dict = measurements_ref.get()
    if measurements_dict:
        def build_object(dates, measurements):
            return {
                "dates" : dates,
                "measurements": measurements
            }

        measurements = list(measurements_dict.values()) # Dictioanry of measurements
        plant_measurement_utc = [process_time(v["dateTime"]) for v in measurements]
        plant_measurement_times = [{
               "seconds": utc_seconds,
               "nanoseconds": 0
        }for utc_seconds in plant_measurement_utc]

        pH_measurements = [v["PH"] for v in measurements]
        temp_measurements = [v["Temp"] for v in measurements]
        moisture_measurements = [v["Moisture"] for v in measurements]
        light_measurements = [v["Light"] for v in measurements]
        humidity_measurements = [v["Humidity"] for v in measurements]

        pH_object = build_object(plant_measurement_times, pH_measurements)
        temp_object = build_object(plant_measurement_times, temp_measurements)
        moisture_object = build_object(plant_measurement_times, moisture_measurements)
        light_object = build_object(plant_measurement_times, light_measurements)
        humidity_object = build_object(plant_measurement_times, humidity_measurements)

        NGA_dict["phData"].update(pH_object)
        NGA_dict["temperatureData"].update(temp_object)
        NGA_dict["soilMoistureData"].update(moisture_object)
        NGA_dict["lightIntensityData"].update(light_object)
        NGA_dict["humidityData"].update(humidity_object)
        NGA_dict["lastMeasuredDate"] = plant_measurement_utc[-1]
        
    
    NDVI_ref = plant_ref.child("readings/NDVIReadings")
    NDVI_dict = NDVI_ref.get()

    if NDVI_dict:
        lastNDVI_value = list(NDVI_dict.values())[-1]
        NGA_dict["NDVI"] = lastNDVI_value
        unix_timestamp = time.mktime(datetime.strptime(NGA_dict['NDVI']["dateTime"] , "%Y-%m-%d %H:%M:%S.%f").timetuple())
        NGA_dict["NDVI"]["dateTime"] = unix_timestamp

    with open("./PipelineObjects/plant_recs_prod.json", mode="w") as f:
        json.dump(NGA_dict, f, indent=4)

    # last watered and last fertilized readings IF TIME ALLOTS

    return NGA_dict    







    
    



    # scientific_name_snapshot = rec_reference.order_by_child("scientificName").equal_to(camelCase(plant_scientific_name)).get()
    # if scientific_name_snapshot:
    #     return scientific_name_snapshot[camelCase(plant_scientific_name)]
    
        
    # Attempt Genus only + Common Name search
    taxonomy = camelCase(plant_details["taxonomy"]["genus"])
    for elem in [plant_common_name_cc, taxonomy]:
        rapi_reference = db.reference(f"recommendations/rapitest/{elem}")
        water_recommendation = rapi_reference.get()
        if water_recommendation:
            moisture_recommendation = water_recommendation["moisture"] * 10
            NGA_dict["soilMoistureData"] = {
                "lowerIdeal" : moisture_recommendation
            } 
            break

    ## Insert Actual Data
    firebase_handler.set_reference("recommendations/NGA")
    firebase_handler.insert_data_on_key(plant_common_name, NGA_dict)

          
    return NGA_dict

@app.route("/get-plants-from-user-id", methods=['GET'])
def get_user_plants():
    user_uid = None
    if request.args.get("token"):
        client_token = request.args.get('token')
        decoded_token = auth.verify_id_token(client_token)
        user_uid = decoded_token['uid']
        print(f"User ID: {user_uid}")
    else:
        return {}

    plants_ref = db.reference(f"users/{user_uid}/plants")
    
    plants = plants_ref.get()
    if plants is None:
        return {}
        
    restructured_plants = {}
    for k,v in plants.items():
        plant_ref = plants_ref.child(k)
        ## Try just Saved Readings instead of readings/SavedReadings to see if it works
        saved_readings_ref = plant_ref.child("readings/SavedReadings").order_by_child("dateTime").limit_to_last(1)
        last_reading = saved_readings_ref.get()

        restructured_plants[k] = { 
            "plantId" : k,
            "commonName" : v["commonName"],
            "nickName" : v["nickName"],
            "lastMeasured": None if last_reading is None else list(last_reading.values())[0]["dateTime"],
            "requiresAttention": None if last_reading is None else list(last_reading.values())[0]["isOutOfRange"], 
            "addedDate": v["addedDate"], # ISO 8601 Extended Format
            "iconId" : v["iconId"]
        }
    
    return restructured_plants

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=int(os.environ.get("PORT", 8040)))
