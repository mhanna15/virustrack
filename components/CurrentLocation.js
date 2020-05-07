import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Linking,
  ActivityIndicator,
} from "react-native";

import Geocoder from "react-native-geocoding";

import Card from "./Card";

const CurrentLocation = (props) => {
  const [countyCases, setCountyCases] = useState("");
  const [countyDeaths, setCountyDeaths] = useState("");
  const [locationStatus, setLocationStatus] = useState(true);
  const [loading, setLoading] = useState(true);

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
          console.log(r.results[0].address_components.filter(d=>parseInt(d.long_name.length) == 5).filter(d=>d.types[d.types.indexOf('postal_code')])[0].long_name)
          gettingCountyCases(r.results[0].address_components.filter(d=>parseInt(d.long_name.length) == 5).filter(d=>d.types[d.types.indexOf('postal_code')])[0].long_name);
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

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setLoading(false);
    }
  });

  useEffect(() => {
    findLocationAndCasesByZip();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Card style={styles.currentCard}>
          <Text style={styles.title}>Near you:</Text>
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        </Card>
      </View>
    );
  } else if (locationStatus) {
    return (
      <View style={{ flex: 1 }}>
        <Card style={styles.currentCard}>
          <TouchableOpacity>
            <Text style={styles.title}>Near you:</Text>
            <Text style={styles.numbers}>
              {countyCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.things}>Cases</Text>
            <Text style={styles.numbers}>
              {countyDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.things}>Deaths</Text>
            <View style={styles.loader}>
              <ActivityIndicator size="large" />
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    );
  } else {
    return (
      <TouchableOpacity>
        <Card style={styles.card}>
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
  loader: {
    paddingTop: "100%",
  },
});

export default CurrentLocation;
