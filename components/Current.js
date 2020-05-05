import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Button } from "react-native";

const Current = (props) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [county, setCounty] = useState("");

  const findLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  console.log("-----------------------------------");
  console.log(latitude + ", " + longitude);

  return (
    <View style={styles.screen}>
      <Text style={styles.body}>
        There are currently 20 cases and 50 deaths in your county
      </Text>
      <Button title="find me" onPress={findLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    maxHeight: 100,
  },
  body: {
    fontSize: 20,
    padding: 20,
  },
});

export default Current;
