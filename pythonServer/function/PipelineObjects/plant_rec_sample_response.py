def create_NGA_dict():
    return {
        "plantName": "",
        "lastMeasuredDate": -1,
        "addedDate": 1680908084, ## Need to add this to our plant entries
        "lastWatered": {
            "dates": [], 
            "notes": [],
        },
        "phData": {
            "lowerIdeal": None,
            "upperIdeal": None,
            "dates": [], ## unix timestamp
            "npkMeasurements": ["0-2-1", "4-2-1", "4-2-1", "4-3-1", "4-2-1", "4-2-1"], # mockData
            "measurements": [],## loop comprehension
        },
        "lastFertilized" : {
            "dates": [], ## {seconds: nanoseconds:}
            "notes": [],
        },
        "soilMoistureData" : {
            "lowerIdeal": None,
            "upperIdeal": None,
            "dates": [],
            "measurements": [],
        },
        "humidityData": {
            "lowerIdeal": None,
            "upperIdeal": None,
            "dates": [],
            "measurements": [],
        },
        "temperatureData" : {
            "lowerIdeal": None,
            "upperIdeal": None,
            "dates": [],
            "measurements": [],
        },
        "lightIntensityData" : {
            "lowerIdeal": None,
            "upperIdeal": None,
            "dates": [],
            "measurements": [],
        },
        "NDVI" : None
        # {
        #  dateTime:
        #  value:
        # }
    }