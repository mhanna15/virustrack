import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Card from "./Card";

const CurrentLocation = (props) => {
  return (
    <TouchableOpacity onPress={props.findLocationAndCasesByZip}>
      <Card>
        <View>
          <Text>
            There are currently {props.countyCases} cases and{" "}
            {props.countyDeaths} deaths in zipcode {props.zip}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
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
