import { React } from "react";
import { StyleSheet, Image } from "react-native";
import { View, Text, Flex, Box } from "native-base";
import { SimpleAccordion } from "react-native-simple-accordion";

const AccordionComponent = ({ viewInside, iconName, sectionTitle }) => {
  //   console.log(path);
  const styles = StyleSheet.create({
    sectionIcon: {
      width: 24,
      marginRight: 10,
    },
    sectionTitle: {
      fontWeight: "700",
      fontFamily: "SFProDisplay-Bold",
      fontStyle: "normal",
      fontSize: "17",
    },
  });
  return (
    <SimpleAccordion
      style={styles.accordion}
      viewInside={viewInside}
      title={
        <Flex flexDirection="row" alignItems="center">
          {iconName == "info" ? (
            <Image
              style={styles.sectionIcon}
              source={require("../../assets/icons/plant-info-page-icons/info.png")}
            />
          ) : null}
          {iconName == "measurements" ? (
            <Image
              style={styles.sectionIcon}
              source={require("../../assets/icons/plant-info-page-icons/measurements.png")}
            />
          ) : null}
          {iconName == "reccos" ? (
            <Image
              style={styles.sectionIcon}
              source={require("../../assets/icons/plant-info-page-icons/reccos.png")}
            />
          ) : null}
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        </Flex>
      }
      bannerStyle={{
        borderRadius: "8px",
        marginTop: 18,
        backgroundColor: "#F5F5F5",
        borderWidth: "2px",
        borderColor: "#C6C7C4",
      }}
      viewContainerStyle={{
        shadowColor: "white",
        backgroundColor: "#F5F5F5",
        borderWidth: "2px",
        borderColor: "#F5F5F5",
        borderBottomColor: "#C6C7C4",
        borderLeftColor: "#C6C7C4",
        borderRightColor: "#C6C7C4",
      }}
    />
  );
};

export { AccordionComponent };
