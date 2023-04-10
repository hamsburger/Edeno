import { React, useState } from 'react';
import {
    Center,
    Box,
    Input,
    Text
} from "native-base";
import { usePlant } from '../../Hooks/Contexts/AddPlant_Context';


export function Add_Nickname({ setContinue }) {
    const [Plant, setPlant] = usePlant();
    const [inputText, setText] = useState("");

    return (<Center width="100%" mt={5} mb={10}>
        <Center width="80%">
            <Box width="85%">
                <Text fontSize="md" fontWeight="bold">
                Give your plant a cute nickname!
                </Text>
                <Input
                size="md"
                variant="underlined"
                placeholder="Enter a Nickname!"
                onChangeText={(text) => {
                    if (text === ""){
                        setContinue(false);
                        return;
                    }
                    
                    setText(text)
                    setPlant((prevPlant) => ({
                    ...prevPlant,
                    nickName: text,
                    })); // Set the plant name
                    setContinue(true);  
                }}>
                </Input>
                
            </Box>
        </Center>
    </Center>
    )

}

// const uid = auth.currentUser.uid;
//                     num_matches = db.fetchListOfChildren(`users/${uid}/plants`).filter(elem => elem === inputText);
//                     if (num_matches.length !== 0){
//                       setInputTextInvalid(true);
//                       setInputTextErrorMessage("Plant Name Already Exists in Database");
//                       setContinue(false);
//                       return;
//                     }