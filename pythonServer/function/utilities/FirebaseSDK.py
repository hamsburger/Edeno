import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from pprint import pprint
import sys
print(sys.path)
# from utilities.util_functions import camelCase
# 1. Check if recommendation data exist for specific plant/database key. If exists, we return that piece of data. If not, web scrape.
# 2. Fetch plant recommendation data using ChromeDriver
# 3. Keep track of Firebase URL so we can write to our database later 
# default_app = firebas.initialize_app()


class FirebaseManager:

    def __init__(self):
        self.ref = None
    
    def set_reference(self, reference):
        self.ref = db.reference(reference)
        
    def insert_data_on_key(self, key, data):
        child_ref = self.ref.child(key)
        child_ref.set(data)


if __name__ == "__main__":    
    FIREBASE_URL = "https://edeno-b66fc-default-rtdb.firebaseio.com/"
    CRED_PATH='./utilities/service_account_key/serviceAccountKey.json'
    PATH = ""

    cred = credentials.Certificate(CRED_PATH)
    firebase_admin.initialize_app(cred, {
        'databaseURL': FIREBASE_URL
    })

    # Get a database reference to plant.
    firebase_handler = FirebaseManager()
    ref = db.reference("users/XPhzPvyULVTvb25wJblsyRvdGed2/isSensorOn")
    print(type(ref.get()))
    # plant_snapshot = ref.get()
    # modified_snapshot = {}

    # for key, obj in plant_snapshot.items():
    #     plantName = camelCase(obj["plantName"])
    #     del obj["plantName"]
    #     modified_snapshot[plantName] = obj

    # ref = db.reference("recommendations/rapitest")
    # ref.set(modified_snapshot)
