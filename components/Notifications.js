import React from "react";
import { Text, TouchableOpacity, Alert, View, StyleSheet } from "react-native";

const Notifications = () => {
  const notSupported = () => {
    Alert.alert("Sorry, this function is not yet implemented");
  };
  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={notSupported}>
        <View style={styles.button}>
          <Text style={styles.text}>Notifications</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#d1ff74",
    flex: 0.08,
    marginTop: -90,
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    paddingTop: 13,
  },
});
