import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Button
} from 'native-base'
import { Header } from "../../Components/Header/Header";
import { useAuth } from "../../hooks/Contexts/Auth_Context";
import { getAuth, signOut } from "firebase/auth";

const Settings = (props) => {
  const [isSignedIn, dispatch] = useAuth();
  const auth = getAuth();
  return (
    <View>
      <Header {...props} />
      <ScrollView>
        {/* <TouchableOpacity
          onPress={() => {
            signOut(auth).then(() => {
              dispatch({
                type: "sign-out",
              });
            })
            
          }}
        > */}
          <Button bgColor="secondary_green" margin={2} onPress={() => {
            signOut(auth).then(() => {
              dispatch({
                type: "sign-out",
              });
            })
          }}>Log out</Button>
        {/* </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export { Settings };
