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
import { useFirebaseDatabase } from "../../Hooks/Contexts/Firebase_Context";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { styles } from "./LoginStyles";
import { TouchableOpacity, StatusBar } from "react-native";
import HidePassword from "../../assets/icons/visibility_off.svg";
import ShowPassword from "../../assets/icons/visibility.svg";

const SignUp = ({ navigation }) => {
  const db = useFirebaseDatabase();
  const auth = getAuth();
  const [isSignedIn, dispatch] = useAuth();

  const [errors, setErrors] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeFirstName = (text) => setFirstName(text);
  const handleChangeLastName = (text) => setLastName(text);
  const handleChangeEmail = (text) => setEmail(text);
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
        <Text style={styles.loginTitle}>Let's get you signed up!</Text>
        <View style={styles.inputsContainer}>
          <Box alignItems="center">
            <Input
              style={styles.inputs}
              variant="underlined"
              value={firstName}
              w="100%"
              onChangeText={handleChangeFirstName}
              placeholderTextColor="#A0999E"
              placeholder="First Name"
            />
          </Box>
          <Box alignItems="center">
            <Input
              style={styles.inputs}
              variant="underlined"
              value={lastName}
              w="100%"
              onChangeText={handleChangeLastName}
              placeholderTextColor="#A0999E"
              placeholder="Last Name"
            />
          </Box>
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
          isDisabled={
            email.length == 0 ||
            password.length == 0 ||
            firstName.length == 0 ||
            lastName.length == 0
          }
          onPress={() => {
            let regEmail =
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regEmail.test(email)) {
              setErrors("Invalid email.");
              return;
            }

            const signUpInfo = {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
            };

            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Fetch user
              const user = userCredential.user;
  
              // Push signup info to Realtime Database
              db.pushWithKeyRealTimeDatabase("users", user.uid, signUpInfo);
  
              dispatch({
                type: "sign-up",
                ...signUpInfo,
              });

              // Firebase automatically signs in user on account creation. 
              // But we don't sign in on sign up, so we sign out.
              auth.signOut() 
              navigation.navigate("Login");
              // ...
            })
            .catch((error) => {
              setErrors(`Firebase Error ${error.code}: ${error.message}`);
              // ..
            });
          }}
        >
          <Text style={styles.logInButton}>Sign Up</Text>
        </Button>

        <Text style={styles.signUpText}>
          Already have an account?{" "}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={{ paddingTop: 4 }}
          >
            <Text style={styles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </Text>
      </Flex>
    </View>
  );
};

export { SignUp };
