import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";

import Geocoder from "react-native-geocoding";

import Card from "./Card";

const CurrentLocation = (props) => {
  const [countyCases, setCountyCases] = useState("");
  const [countyDeaths, setCountyDeaths] = useState("");
  const [zip, setZip] = useState("");
  const [locationStatus, setLocationStatus] = useState(true);

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
      (error) => setLocationStatus(false),
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

  const handleEnableLocation = () => {
    Linking.openSettings();
  };

  useEffect(() => {
    findLocationAndCasesByZip();
  }, []);

  if (locationStatus) {
    return (
      <Card style={styles.currentCard}>
        <TouchableOpacity>
          <Text style={styles.title}>Near you:</Text>
          <Text style={styles.numbers}>{countyCases}</Text>
          <Text style={styles.things}>Cases</Text>
          <Text style={styles.numbers}>{countyDeaths}</Text>
          <Text style={styles.things}>Deaths</Text>
        </TouchableOpacity>
      </Card>
    );
  } else {
    return (
      <TouchableOpacity>
        <Card>
          <Button title="enable location" onPress={handleEnableLocation} />
        </Card>
      </TouchableOpacity>
    );
  }
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
  title: {
    fontSize: 35,
  },
  things: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 20,
  },
  currentCard: {
    backgroundColor: "#ffe367",
  },
  numbers: {
    alignSelf: "center",
    fontSize: 30,
    paddingTop: 45,
  },
});

export default CurrentLocation;
