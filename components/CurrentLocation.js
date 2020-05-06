import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CurrentLocation = (props) => {
  return (
    <View style={styles.screen}>
      <Text>
        There are currently {props.countyCases} cases and {props.countyDeaths}{" "}
        deaths in zipcode {props.zip}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    maxHeight: 80,
  },
  body: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
  },
});

export default CurrentLocation;
