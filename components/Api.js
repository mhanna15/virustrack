import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import Geocoder from "react-native-geocoding";

const Api = (props) => {
  const gettingCountyCases = (zipCode) => {
    const url = `https://covid-hotline-bling.herokuapp.com/zipcode/${zipCode}`;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        props.setCountyCases(r.cases);
        props.setCountyDeaths(r.deaths);
      });
  };

  Geocoder.init("AIzaSyBcd6WBxVxSf7CZmjs649VaaLxBbaQaJZM");

  const findLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        Geocoder.from({
          latitude: lat,
          longitude: long,
        }).then((r) => {
          props.setZip(r.results[0].address_components[8].long_name);
          gettingCountyCases(r.results[0].address_components[8].long_name);
        });
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <View style={styles.screen}>
      <Button title="around me" onPress={findLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Api;
