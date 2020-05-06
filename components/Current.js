import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
import * as gps from "gps2zip";

const Current = (props) => {

  const findLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        coorsToZip(latitude, longitude);
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const coorsToZip = (lat, long) => {
    props.setZip(gps.gps2zip(lat, long))
  };
  console.log(zip)

  return (
    <View style={styles.screen}>
      <Text>There are currently 20 cases and 50 deaths in {props.zip} zip</Text>
      <View>
        <TouchableOpacity onPress={findLocation}>
          <Text style={styles.text}>find me</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>zip: {props.zip}</Text>
      </View>
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

export default Current;
