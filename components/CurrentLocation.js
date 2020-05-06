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
  }

  useEffect(() => {
    findLocationAndCasesByZip();
  }, []);

  if (locationStatus) {
    return (
      <TouchableOpacity>
        <Card>
          <View>
            <Text>
              There are currently {countyCases} cases and {countyDeaths} deaths
              near you {zip}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
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
  text: {
    fontSize: 30,
  },
});

export default CurrentLocation;
