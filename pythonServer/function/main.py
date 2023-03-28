from firebase_admin import credentials
from firebase_admin import db
import flask
from flask import escape
import functions_framework
from utilities import FirebaseManager, ChromeDriver, camelCase

# 1. Check if recommendation data exist for specific plant/database key. If exists, we return that piece of data. If not, web scrape.
# 2. Fetch plant recommendation data using ChromeDriver
# 3. Keep track of Firebase URL so we can write to our database later 
# default_app = firebas.initialize_app()

@functions_framework.http
def get_recommendation_data(request : flask.Request):
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
    plant_scientific_name = plant_details["name_authority"]

    rec_reference = db.reference("recommendations/NGA")
    common_name_snapshot = rec_reference.order_by_key().equal_to(camelCase(plant_common_name))
    if common_name_snapshot:
        return common_name_snapshot
    
    scientific_name_snapshot = rec_reference.order_by_child("scientificName").equal_to(camelCase(plant_scientific_name))
    if scientific_name_snapshot:
        return scientific_name_snapshot
    
    newDriver = ChromeDriver()
    NGA_dict = newDriver.scrapeNGA(plant_common_name)

    # RAPITEST API Match needs improvement. We need to format RAPITEST recommendations to identify taxonomy level (Class, Genus, Species)
    # on first key, then the appropriate on second key, because common name match does not guarantee the correct match


    # scraper = cloudscraper.create_scraper()
    # plant = scraper.get("http://garden.org/plants/view/117125/Echeverias-Echeveria/")
    # with open("plant_request.txt", mode="w", encoding="utf-8") as f:
    #     f.write(plant.text)
    