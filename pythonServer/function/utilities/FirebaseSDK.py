import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


# 1. Check if recommendation data exist for specific plant/database key. If exists, we return that piece of data. If not, web scrape.
# 2. Fetch plant recommendation data using ChromeDriver
# 3. Keep track of Firebase URL so we can write to our database later 
# default_app = firebas.initialize_app()
FIREBASE_URL = "https://edeno-b66fc-default-rtdb.firebaseio.com/"
PATH = ""

class FirebaseManager:

    def __init__(self, CRED_PATH='./service_account_key/serviceAccountKey.json'):
        cred = credentials.Certificate(CRED_PATH)
        firebase_admin.initialize_app(cred, {
            'databaseURL': FIREBASE_URL
        })
        self.ref = None
    
    def set_reference(self, reference):
        self.ref = db.reference(reference)
        
    def insert_data_on_key(self, key, data):
        child_ref = self.ref.child(key)
        child_ref.set(data)


if __name__ == "__main__":
    
    # Get a database reference to our blog.
    firebase_handler = FirebaseManager()
    child_ref = firebase_handler.set_reference("recommendations/NGA")
    firebase_handler.insert_data_on_key('cactus3', {
            "sunRequirements" : "Full Shade, Partial Shade",
            "waterPreference" : "Mesic",
            "pHRequirements" : {
                "maxPH" : 7,
                "minPH" : 6 
            },
            "pHDescriptions" : "Slightly acidic, neutral",
            "temperatureZones" : {
                "minZone" : "Zone 10a",
                "maxZone" : "Zone 11"
            },
            "link" : "https://www.google.com"
    })
