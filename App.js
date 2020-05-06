import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Geocoder from "react-native-geocoding";

import Header from "./components/Header";
import CurrentLocation from "./components/CurrentLocation";
import Search from "./components/Search";
import Country from "./components/Country";

export default function App() {
  const [countyCases, setCountyCases] = useState("");
  const [countyDeaths, setCountyDeaths] = useState("");
  const [zip, setZip] = useState("");

  Geocoder.init("AIzaSyBcd6WBxVxSf7CZmjs649VaaLxBbaQaJZM");

  const findLocationAndCasesByZip = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        Geocoder.from({
          latitude: lat,
          longitude: long,
        }).then((r) => {
          setZip(r.results[0].address_components[8].long_name);
          gettingCountyCases(r.results[0].address_components[8].long_name);
        });
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const gettingCountyCases = (zipCode) => {
    const url = `https://covid-hotline-bling.herokuapp.com/zipcode/${zipCode}`;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setCountyCases(r.cases);
        setCountyDeaths(r.deaths);
      });
  };

  return (
    <View style={styles.screen}>
      <Header />
      <CurrentLocation
        countyCases={countyCases}
        countyDeaths={countyDeaths}
        zip={zip}
        findLocationAndCasesByZip={findLocationAndCasesByZip}
      />
      <Country />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
