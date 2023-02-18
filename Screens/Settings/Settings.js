import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Header } from "../../Components/Header/Header";
import { useAuth } from "../../Hooks/Contexts/Auth_Context";

const Settings = (props) => {
  const [isSignedIn, dispatch] = useAuth();
  return (
    <View>
      <Header {...props} />
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            dispatch({
              type: "sign-out",
            });
          }}
        >
          <Text>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export { Settings };
