import requests
import json
from pprint import pprint
from utilities import FirebaseManager

firebase_obj = FirebaseManager()
json_input = None

with open("./PipelineObjects/plant_id.json") as f:
    json_input = json.load(f)


response = requests.post(
    # "http://127.0.0.1:5000",
    "https://python-http-plant-recommendation-container-63od3iyczq-uk.a.run.app/", 
    headers={
    "Content-Type" : "application/json",
}, data=json.dumps(json_input))

print(response.content)

with open("./PipelineObjects/plant_recs_prod.json", mode="w") as f:
    json.dump(response.json(), f, indent=4)