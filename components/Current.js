import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Button } from "react-native";

const Current = (props) => {
  const [county, setCounty] = useState("");

  const findLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        reverseGeocode(latitude, longitude);
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const reverseGeocode = (lat, long) => {
    const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=WPHoEAbXcaStq9DMisav8kZhp0pXOMcx&location=${lat},${long}`;
    fetch(url)
      .then((r) => r.json())
      .then((r) => setCounty(r.results[0].locations[0].adminArea4));
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.body}>
        There are currently 20 cases and 50 deaths in your county
      </Text>
      <Button title="find me" onPress={findLocation} />
      <Text>county: {county}</Text>
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
