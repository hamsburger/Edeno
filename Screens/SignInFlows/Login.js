import { React, useState } from "react";
import {
  View,
  Text,
  Box,
  Input,
  Flex,
  Image,
  Pressable,
  Button,
} from "native-base";
import { useAuth } from "../../Hooks/Contexts/Auth_Context";
import { styles } from "./LoginStyles";
import { TouchableOpacity, StatusBar } from "react-native";
import HidePassword from "../../assets/icons/visibility_off.svg";
import ShowPassword from "../../assets/icons/visibility.svg";

const Login = () => {
  const [isSignedIn, dispatch] = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (text) => setUsername(text);
  const handleChangePassword = (text) => setPassword(text);
  const [show, setShow] = useState(false);

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <Flex
        w="100%"
        justifyContent="center"
        alignItems="center"
        paddingTop={150}
        paddingLeft={33}
        paddingRight={33}
      >
        <Image
          resizeMode="contain"
          width="100%"
          height="60"
          alt="logo"
          source={require("../../assets/icons/edeno-logo.png")}
        />
        <Text style={styles.motto}>lorem ipsum our motto</Text>
        <Text style={styles.loginTitle}>Login to get started</Text>
        <View style={styles.inputsContainer}>
          <Box alignItems="center">
            <Input
              style={styles.inputs}
              variant="underlined"
              value={username}
              w="100%"
              onChangeText={handleChangeUsername}
              placeholderTextColor="#A0999E"
              placeholder="Username"
            />
          </Box>
          <Box alignItems="center">
            <Input
              type={show ? "text" : "password"}
              style={styles.inputs}
              value={password}
              variant="underlined"
              w="100%"
              placeholderTextColor="#A0999E"
              onChangeText={handleChangePassword}
              placeholder="Password"
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  {show ? <HidePassword /> : <ShowPassword />}
                </Pressable>
              }
            />
          </Box>
        </View>
        <Button
          width={180}
          marginTop={31}
          bg="secondary_green"
          _disabled={{ opacity: 1, bg: "faded_green" }}
          isDisabled={username.length == 0 || password.length == 0}
          onPress={() => {
            const loginInfo = { username: username, password: password };
            dispatch({
              type: "sign-in",
              ...loginInfo,
            });
          }}
        >
          <Text style={styles.logInButton}>Log in</Text>
        </Button>

        <TouchableOpacity
          onPress={() => {
            null;
          }}
          style={{ marginTop: 27 }}
        >
          <Text style={styles.linkText}>Forgot your username or password?</Text>
        </TouchableOpacity>

        <Text style={styles.signUpText}>
          Don’t have an account?{" "}
          <TouchableOpacity
            onPress={() => {
              null;
            }}
          >
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
          .
        </Text>
      </Flex>
    </View>
  );
};

export { Login };
