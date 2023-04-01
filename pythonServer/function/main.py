import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import flask
from flask import escape
from flask import request
import os
from flask import Flask
from utilities import FirebaseManager, ChromeDriver, camelCase

firebase_handler = FirebaseManager()
app = Flask(__name__)

FIREBASE_URL = "https://edeno-b66fc-default-rtdb.firebaseio.com/"
CRED_PATH='./utilities/service_account_key/serviceAccountKey.json'
PATH = ""

cred = credentials.Certificate(CRED_PATH)
firebase_admin.initialize_app(cred, {
    'databaseURL': FIREBASE_URL
})

# 1. Check if recommendation data exist for specific plant/database key. If exists, we return that piece of data. If not, web scrape.
# 2. Fetch plant recommendation data using ChromeDriver
# 3. Keep track of Firebase URL so we can write to our database later 
# default_app = firebas.initialize_app()

@app.route("/", methods=['POST'])
def get_recommendation_data():
    '''
    1. Check if plant recommendations have already been populated in Firebase Database. If yes, return object.
    2. Else, Scrape NGA and RAPITEST for data

    INPUT: Plant.id object
    OUTPUT: JSON Recommendation Data for one plant, in addition to other possible common names
    '''
    request_json = request.get_json(force=True)
    if not request_json:
        raise Exception("Request Object is not passed into Request correctly")
    elif "plant_id_obj" not in request_json:
        raise Exception("plant.id Request Object has invalid format")

    plant_details = request_json["plant_id_obj"]["plant_details"]
    plant_common_name = plant_details["common_names"][0]
    plant_common_name_cc = camelCase(plant_common_name)
    plant_scientific_name = plant_details["scientific_name"].strip()
    
    plant_id_to_garden_org_reference = db.reference(
        f"recommendations/plantIdToNGAMap/{plant_common_name_cc}"
    )

    # Check if common name has already been queried on garden.org before. 
    # If yes, assign common name to previously fetched garden.org name
    plant_garden_org_name = plant_id_to_garden_org_reference.get()
    if plant_garden_org_name:
        plant_common_name_cc = plant_garden_org_name
    
    # Return Recommendations from Firebase if the recommendations already exist
    rec_reference = db.reference("recommendations/NGA")
    common_name_snapshot = rec_reference.order_by_key().equal_to(plant_common_name_cc).get()
    if common_name_snapshot:
        return common_name_snapshot[plant_common_name_cc]
    
    scientific_name_snapshot = rec_reference.order_by_child("scientificName").equal_to(camelCase(plant_scientific_name)).get()
    if scientific_name_snapshot:
        return scientific_name_snapshot[camelCase(plant_scientific_name)]
    

    # If not exists, Garden.org Scraper
    
    newDriver = ChromeDriver()
    NGA_dict = newDriver.scrapeNGA(plant_scientific_name)

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


    # Add entry plant.id common name --> garden.org common name 
    # so that we do not have to rescrape plants identified by two users
    firebase_handler.set_reference(
        f"recommendations/plantIdToNGAMap"
    )

    garden_org_name = camelCase(NGA_dict["gardenOrgCommonName"])
    firebase_handler.insert_data_on_key(
        plant_common_name_cc, garden_org_name
    )

    NGA_dict.pop("gardenOrgCommonName")

    ## Insert Actual Data
    firebase_handler.set_reference("recommendations/NGA")
    firebase_handler.insert_data_on_key(garden_org_name, NGA_dict)

          
    return NGA_dict

if __name__ == "__main__":
    app.run(debug=True, host="192.168.2.11", port=int(os.environ.get("PORT", 8080)))
