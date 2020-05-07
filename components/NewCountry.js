import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Icon } from "react-native-elements";

import Card from "./Card";

const NewCountry = (props) => {
  const notSupported = () => {
    Alert.alert("Sorry, this function is not yet supported");
  };
  return (
    <View style={styles.screen}>
      <Card>
        <Icon
          name="plus"
          type="font-awesome-5"
          onPress={notSupported}
          style={styles.button}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  button: {
    paddingTop: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default NewCountry;
