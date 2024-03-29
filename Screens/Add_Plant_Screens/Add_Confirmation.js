import { React, useEffect } from "react";
import { Image } from "react-native";
import { Text, Center, Box } from "native-base";
import { usePlant } from "../../Hooks/Contexts/AddPlant_Context";
import { usePlants } from "../../Hooks/Contexts/Plant_Context";
import { plant_icons } from "../../Constants/StaticPlantIconImages";
import { useFirebaseDatabase } from "../../Hooks/Contexts/Firebase_Context";
import { getAuth } from "firebase/auth";
import { getCurrentTime } from "../../Functions/utilities";

export function Add_Confirmation({ setContinue }) {
  const [Plant, _] = usePlant();
  const [__, dispatch] = usePlants();
  const db = useFirebaseDatabase();
  const auth = getAuth();

  useEffect(() => {
    setContinue(true);
    db.pushChildToRealTimeDatabase(`users/${auth.currentUser.uid}/plants`, {
      ...Plant,
      addedDate: getCurrentTime()
    });
  }, []);

  return (
    <Center w="100%">
      <Center w="90%">
        <Text fontSize="lg">
          <Text fontWeight="bold">{Plant.nickName}</Text> has been successfully
          added to your Eden!
        </Text>
        <Center width="100%" mt={5} mb={10}>
          <Image
            source={plant_icons[Plant.iconId]}
            style={{ height: 144, width: 144 }}
          />
        </Center>
      </Center>
    </Center>
  );
}
