import { React, useEffect, useState } from "react";
import { Image, Keyboard } from "react-native";
import {
  Text,
  Center,
  Input,
  SearchIcon,
  Box,
  Button,
  Flex,
  Spinner,
  Heading,
  FormControl,
  WarningOutlineIcon,
} from "native-base";
import {
  usePlant,
} from "../../hooks/Contexts/AddPlant_Context";
import { usePlants } from "../../hooks/Contexts/Plant_Context";
import { getAuth } from "firebase/auth";
import { useFirebaseDatabase } from "../../hooks/Contexts/Firebase_Context";
// import { plant_icons } from "../../Constants/StaticPlantIconImages";
import { toCamelCase } from '../../functions/utilities';

export function PlantId_Fetch_Manual(props) {
  // const [hasSearched, setSearched] = useState(false);
  // const [firstRun, setFirstRun] = useState(true);
  // const [imageData, setImageData] = useState({});
  // const [loading, setLoading] = useState(false);
  const [inputText, setText] = useState("");
  const [isCommonNameInvalid, setCommonNameInvalid] = useState(true);
  const [inputTextErrorMessage, setInputTextErrorMessage] = useState(false);
  const { setContinue } = props;
  const [Plant, setPlant] = usePlant();
  const [Plants, dispatch] = usePlants();
  const db = useFirebaseDatabase();
  const auth = getAuth();



  return (
    <Center width="100%" mt={5} mb={10}>
      <Center width="80%">
        <Text fontSize="lg" fontWeight="bold">
          {" "}
          Let's Find Your Plant{" "}
        </Text>
        <Text fontSize="sm">
          Type in the common name of your plant and tap the magnifying glass to search.{" "}
        </Text>
        <Box mt={3} width="80%">
          <FormControl isInvalid={isCommonNameInvalid}>
            <Input
              size="md"
              variant="underlined"
              placeholder="Find Your Plant!"
              onChangeText={(text) => setText(text)}
              InputRightElement={
                <Button
                  bg="transparent"
                  onPress={() => {
                    // Input is invalid if we don't have any string entered.
                    if (inputText === "") {
                      setCommonNameInvalid(true);
                      setInputTextErrorMessage("Please Enter a Valid Plant Name");
                      setContinue(false);
                      return;
                    }

                    db.getFetchPromise(`recommendations/NGA/${toCamelCase(inputText)}`).then((snapshot) => 
                      {
                        if (snapshot.exists() === false){
                          setCommonNameInvalid(true);
                          setInputTextErrorMessage("Plant Not Found. Try another Plant Name.");
                          setContinue(false);
                          return;
                        }

                        // else it is valid
                        setCommonNameInvalid(false);
                        setPlant((prevPlant) => ({
                          ...prevPlant,
                          commonName: inputText,
                        })); // Set the plant name
                        setContinue(true);
                        Keyboard.dismiss();
                      }
                    );
                    

                    
                  }}
                  startIcon={<SearchIcon color="edeno_green" />}
                />
              }
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {inputTextErrorMessage}
            </FormControl.ErrorMessage>
          </FormControl>
          {(!isCommonNameInvalid) && <Text color="green.700">
              Your Plant was found successfully in our Database Records! 
          </Text>
          }
        </Box>
      </Center>
    </Center>
  );
}
