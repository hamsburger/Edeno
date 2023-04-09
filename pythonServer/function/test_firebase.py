import requests
import json
from pprint import pprint
from utilities import FirebaseManager
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import datetime
import random
import time 

firebase_obj = FirebaseManager()
json_input = None

def test_recommendation_req():
    with open("./PipelineObjects/plant_id.json") as f:
        json_input = json.load(f)


    response = requests.post(
        "http://127.0.0.1:5000/get-plant-information-by-plant-id",
        # "https://python-http-plant-recommendation-container-63od3iyczq-uk.a.run.app/get", 
        headers={
        "Content-Type" : "application/json",
    }, data=json.dumps(json_input))

    print(response.content)

    with open("./PipelineObjects/plant_recs_prod.json", mode="w") as f:
        json.dump(response.json(), f, indent=4)


def test_measurement_interval(number_of_sends):
    ref = db.reference("readings")
    for _ in range(number_of_sends):
        ref.push({   
            "dateTime" : str(datetime.datetime.now()),
            "Light": "{:.2f} LUX".format(random.randint(0, 130000)),
            "Moisture": "{:2f}%".format(random.random() * 100),
            "PH": "{:1f}".format(random.random() * 14),
            "Temp": "{}C".format(random.randint(20, 23)),
            "Humidity": "{:2f}%".format(random.random() * 100)
        })
        time.sleep(2)

def save_readings_to_json():
    # test_measurement_interval(1)
    ref = db.reference("readings")
    oneTimeFetchOfChild = ref.get()

    with open("./PipelineObjects/readings.json", mode="w") as f:
        json.dump({"readings" : oneTimeFetchOfChild}, f)



if __name__ == "__main__":
    FIREBASE_URL = "https://edeno-b66fc-default-rtdb.firebaseio.com/"
    CRED_PATH='./utilities/service_account_key/serviceAccountKey.json'
    PATH = ""

    cred = credentials.Certificate(CRED_PATH)
    firebase_admin.initialize_app(cred, {
        'databaseURL': FIREBASE_URL
    })


    test_recommendation_req()
    # test_measurement_interval(10)
    
    # ref = db.reference("readings")
    # oneTimeFetchOfChild = ref.get()
    # # print(oneTimeFetchOfChild)
    # sorted_logs = {k:v["dateTime"] for k,v in sorted(oneTimeFetchOfChild.items(), key=lambda x: x[1]['dateTime'])}
    # print(sorted_logs)
    # with open("./backend_measurement.log", mode="w") as f:
    #     json.dump({"readings" : sorted_logs}, f, indent=4)


