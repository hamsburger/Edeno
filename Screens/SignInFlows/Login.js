import { React, useState } from "react";
import { View, Text, Box, Input } from "native-base";
import { useAuth } from "../../Hooks/Contexts/Auth_Context";
import { TouchableOpacity } from "react-native";

const Login = () => {
  const [isSignedIn, dispatch] = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (text) => setUsername(text);
  const handleChangePassword = (text) => setPassword(text);

  return (
    <View style={{ paddingTop: 70, paddingLeft: 20, paddingRight: 20 }}>
      <Text>Login</Text>
      <Box alignItems="center">
        <Input
          value={username}
          w="100%"
          onChangeText={handleChangeUsername}
          placeholder="Value Controlled Input"
        />
      </Box>
      <Box alignItems="center">
        <Input
          value={password}
          w="100%"
          onChangeText={handleChangePassword}
          placeholder="Value Controlled Input"
        />
      </Box>
      <TouchableOpacity
        onPress={() => {
          console.log(username, password);

          const loginInfo = { username: username, password: password };

          dispatch({
            type: "sign-in",
            ...loginInfo,
          });
        }}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export { Login };
