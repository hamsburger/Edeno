import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  motto: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-BoldItalic",
    fontSize: 23,
    letterSpacing: "2",
    paddingTop: 13,
    color: "#432D1E",
  },
  loginTitle: {
    fontWeight: "700",
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 24,
    paddingTop: 60,
    color: "#432D1E",
  },
  inputsContainer: {
    width: "80%",
    paddingTop: 5,
    fontFamily: "SFProDisplay-BoldItalic",
  },
  inputs: {
    marginTop: 15,
    fontSize: 16,
    fontFamily: "SFProDisplay-Regular",
    color: "#432D1E",
  },
  logInButton: {
    fontFamily: "SFProDisplay-Bold",
    color: "white",
    fontSize: 15,
  },
  linkText: {
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 15,
    color: "#597F51",
    fontWeight: 510,
  },

  signUpText: {
    fontFamily: "SFProDisplay-Regular",
    fontSize: 15,
    color: "#432D1E",
    fontWeight: 700,
    marginTop: 12,
  },
  error: {
    color: "#B9422C",
    fontFamily: "SFProDisplay-Semibold",
    marginTop: 10,
    height: 18,
  },
});

export { styles };
