from firebase_admin import credentials
from firebase_admin import db
import requests
from utilities.ChromeDriver import ChromeDriver
import sys
import cloudscraper
import os

# 1. Check if recommendation data exist for specific plant/database key. If exists, we return that piece of data. If not, web scrape.
# 2. Fetch plant recommendation data using ChromeDriver
# 3. Keep track of Firebase URL so we can write to our database later 
# default_app = firebas.initialize_app()
FIREBASE_URL = "https://edeno-b66fc-default-rtdb.firebaseio.com/"
PATH = ""

    


if __name__ == '__main__':
    print(os.getcwd())
    for path in sys.path:
        print(path)
    plant_name = "echeveria"
    newDriver = ChromeDriver()


    # First, we look for the best plant match in the database

    #S
    newDriver.scrapeNGA(plant_name)
    # scraper = cloudscraper.create_scraper()
    # plant = scraper.get("http://garden.org/plants/view/117125/Echeverias-Echeveria/")
    # with open("plant_request.txt", mode="w", encoding="utf-8") as f:
    #     f.write(plant.text)