import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Icon } from "react-native-elements";

import Card from "./Card";

const NewCountry = (props) => {
  const notSupported = () => {
    Alert.alert("Coming soon!");
  };
  return (
    <View style={styles.screen}>
      <Card>
        <View style={styles.button}>
          <Icon name="plus" type="font-awesome-5" onPress={notSupported} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default NewCountry;
