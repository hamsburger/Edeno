import string
# from utilities.FirebaseSDK import FirebaseManager
from firebase_admin import db

# firebase_handler = FirebaseManager()

def camelCase(st : str) -> str:
    """
        Name: camelCase
        Args: st, an input string
        Description: camel cases words. For example,
        'he ate an apple' outputs 'heAteAnApple'  
    """
    capitalized_words = string.capwords(st).replace(" ", "").strip()
    return capitalized_words if not capitalized_words else capitalized_words[0].lower() \
    + capitalized_words[1:]


def deriveNumericRequirements(scale_type, 
                              requirements: str) -> tuple[int, int]:
    """
        Name: deriveNumericRequirements
        Args: 
            requirements -- a comma-delimited (specifically 
            ' ,'-delimited) string containing qualitative 
            description of requirements that can be turned into 
            quantative descriptions,

            scale_type -- Type of scale used. Type of scale
            can be found in our Firebase Realtime Database schema, under recommendations/scale.
    """
    if requirements is None:
        return


    ref = db.reference(f"recommendations/scale/{scale_type}")
    all_scale_types = ref.get()

    all_requirements = [camelCase(requirement) for requirement in requirements.split("\n")]
    all_requirement_thresholds = \
    [all_scale_types[requirement] for requirement 
                                  in all_requirements]
    
    maxIdeal = max(all_requirement_thresholds, key=lambda x: x["max"])
    minIdeal = min(all_requirement_thresholds, key=lambda x: x["min"])


    return {
        "lowerIdeal" : minIdeal["min"],
        "upperIdeal" : maxIdeal["max"]
    }
    


