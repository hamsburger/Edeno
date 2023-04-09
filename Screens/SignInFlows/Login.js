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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../hooks/Contexts/Auth_Context";
import { styles } from "./LoginStyles";
import { TouchableOpacity, StatusBar } from "react-native";
import HidePassword from "../../assets/icons/visibility_off.svg";
import ShowPassword from "../../assets/icons/visibility.svg";

const Login = ({ navigation }) => {
  const [isSignedIn, dispatch] = useAuth();

  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (text) => setEmail(text);
  const handleChangePassword = (text) => setPassword(text);
  const [show, setShow] = useState(false);

  const auth = getAuth();

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
              value={email}
              w="100%"
              onChangeText={handleChangeEmail}
              placeholderTextColor="#A0999E"
              placeholder="Email"
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

        <Text style={styles.error}>{errors}</Text>

        <Button
          width={180}
          marginTop={4}
          bg="secondary_green"
          _disabled={{ opacity: 1, bg: "faded_green" }}
          isDisabled={email.length == 0 || password.length == 0}
          onPress={() => {
            const loginInfo = { email: email, password: password };
            let regEmail =
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regEmail.test(email)) {
              setErrors("Invalid email.");
              return;
            }

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
              dispatch({
                type: "sign-in",
                ...loginInfo,
              });
  
              // ...
            })
            .catch((error) => {
              setErrors(`Firebase Error: User not found or incorrect password`);
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
              navigation.navigate("SignUp");
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
