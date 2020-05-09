import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Linking,
  ActivityIndicator,
  Alert,
  AppState,
} from "react-native";

import Geocoder from "react-native-geocoding";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import Card from "./Card";

function abbrState(input, to) {
  var states = [
    ["Arizona", "AZ"],
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Pennsylvania", "PA"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"],
  ];

  if (to == "abbr") {
    input = input.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    for (i = 0; i < states.length; i++) {
      if (states[i][0] == input) {
        return states[i][1];
      }
    }
  } else if (to == "name") {
    input = input.toUpperCase();
    for (i = 0; i < states.length; i++) {
      if (states[i][1] == input) {
        return states[i][0];
      }
    }
  }
}

const CurrentLocation = (props) => {
  const [countyCases, setCountyCases] = useState("");
  const [countyDeaths, setCountyDeaths] = useState("");
  const [locationStatus, setLocationStatus] = useState(true);
  const [loading, setLoading] = useState(true);

  Geocoder.init("AIzaSyBcd6WBxVxSf7CZmjs649VaaLxBbaQaJZM");

  const findLocationAndCasesByZip = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus(true);
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        reverseGeocode(lat, long);
      },
      (error) => setLocationStatus(false),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const reverseGeocode = (lat, long) => {
    const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=WPHoEAbXcaStq9DMisav8kZhp0pXOMcx&location=${lat},${long}`;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        var county = r.results[0].locations[0].adminArea4;
        var state = r.results[0].locations[0].adminArea3;
        state = abbrState(state, "name");
        gettingCountyCases(county, state);
      });
  };

  const gettingCountyCases = (inputCounty, inputState) => {
    const url = `https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=US&source=csbs`;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setCountyCases(
          r.locations.filter(
            (d) => d.county == inputCounty && d.province == inputState
          )[0].latest.confirmed
        );
        setCountyDeaths(
          r.locations.filter(
            (d) => d.county == inputCounty && d.province == inputState
          )[0].latest.deaths
        );
      });
  };

  const handleEnableLocation = () => {
    Linking.openSettings();
    setTimeout(() => {
      AppState.addEventListener("change", findLocationAndCasesByZip);
    }, 2000);
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
          </TouchableOpacity>
        </Card>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Card style={styles.locationCard}>
          <TouchableOpacity>
            <View style={styles.location}>
              <Button title="enable location" onPress={handleEnableLocation} />
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    fontSize: RFValue(30),
    alignSelf: "center",
  },
  things: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 20,
  },
  currentCard: {
    backgroundColor: "#ffe367",
    maxWidth: "100%",
  },
  locationCard: {
    backgroundColor: "#ffe367",
    maxWidth: "100%",
    justifyContent: "center",
  },
  numbers: {
    alignSelf: "center",
    fontSize: RFValue(25),
    paddingTop: RFPercentage(5),
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  location: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CurrentLocation;
