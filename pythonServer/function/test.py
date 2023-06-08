import json

with open("./logs/backend_measurement.log") as f:
        json_input = json.load(f)
        print("\n".join(list(json_input["readings"].keys())))


