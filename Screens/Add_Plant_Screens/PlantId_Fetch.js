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
} from "../../Hooks/Contexts/AddPlant_Context";
import { usePlants } from "../../Hooks/Contexts/Plant_Context";
import { plant_icons } from "../../Constants/StaticPlantIconImages";

export function PlantId_Fetch(props) {
  const [hasSearched, setSearched] = useState(false);
  const [firstRun, setFirstRun] = useState(true);
  const [imageData, setImageData] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputText, setText] = useState("");
  const [isInputTextInvalid, setInputTextInvalid] = useState(false);
  const [inputTextErrorMessage, setInputTextErrorMessage] = useState(false);
  const { setContinue } = props;
  const [Plant, setPlant] = usePlant();
  const [Plants, dispatch] = usePlants();

  // // useEffect to fetch from plant.id
  useEffect(() => {
    // Don't run a fetch request on Component Mount
    if (firstRun) {
      setFirstRun(false);
      return;
    }

    setContinue(false); // in between search and result, we cannot continue
    setImageData({});
    setLoading(true);
    // Wait for data after search and get data
    /* fetch().then(({data}) => {
         setImageData({...})
      }); */

    // When the data has been fetched, we can now continue
    setTimeout(() => {
      setImageData({ a: 1 }); // dummy for now
      setContinue(true);
      setLoading(false);
    }, 2000);
  }, [hasSearched]);

  return (
    <Center width="100%" mt={5} mb={10}>
      <Center width="90%">
        <Text fontSize="lg" fontWeight="bold">
          {" "}
          Let's Find Your Plant{" "}
        </Text>
        <Text fontSize="sm">
          Type in the name of your plant and tap the magnifying glass to search.{" "}
        </Text>
        <Box mt={3} width="75%">
          <FormControl isInvalid={isInputTextInvalid}>
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
                      setInputTextInvalid(true);
                      setInputTextErrorMessage("Please Enter a Valid Plant Name");
                      setContinue(false);
                      return;
                    }

                    // If the Input already exists in Plant Database
                    if (Plants.filter(e => e.plantName === inputText).length > 0){
                      setInputTextInvalid(true);
                      setInputTextErrorMessage("Plant Name Already Exists in Database");
                      setContinue(false);
                      return;
                    }


                    // else it is valid
                    setInputTextInvalid(false);
                    setSearched(!hasSearched); // Toggle search
                    setPlant((prevPlant) => ({
                      ...prevPlant,
                      id : inputText,
                      plantName: inputText,
                    })); // Set the plant name
                    Keyboard.dismiss();
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
        </Box>
      </Center>
      {Object.keys(imageData).length !== 0 && (
        <Center mt={10} width="75%">
          <Text fontSize="lg" fontWeight="bold">
            {" "}
            Do these look like your plant?{" "}
          </Text>
          <Text fontSize="sm">
            {" "}
            Proceed to the next step if you are satisfied with the images below
            or re-enter with the genus or species name.
          </Text>
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            mt={3}
            width="75%"
          >
            {plant_icons.slice(0, 3).map((elem) => {
              return <Image source={elem} style={{ height: 64, width: 64 }} />;
            })}
          </Flex>
        </Center>
      )}

      {loading && (
        <Center mt={10} width="75%">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </Center>
      )}
    </Center>
  );
}
