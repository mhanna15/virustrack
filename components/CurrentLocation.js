import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Linking,
  ActivityIndicator,
  AppState,
} from "react-native";

import Geocoder from "react-native-geocoding";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Modal from "react-native-modal";
import { Divider } from "react-native-elements";

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
  const [county, setCounty] = useState("");
  const [countyCases, setCountyCases] = useState("");
  const [countyDeaths, setCountyDeaths] = useState("");
  const [locationStatus, setLocationStatus] = useState(true);
  const [loading, setLoading] = useState(true);
  const [detailView, setDetailView] = useState(false);

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
  //  const findLocationAndCasesByZip = () => {
  //    setCounty("Orange County");
  //    setCountyCases(
  //      "25"
  //    );
  //    setCountyDeaths(
  //      "30"
  //    );
  //  }

  const reverseGeocode = (lat, long) => {
    const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=WPHoEAbXcaStq9DMisav8kZhp0pXOMcx&location=${lat},${long}`;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        var county = r.results[0].locations[0].adminArea4;
        setCounty(county);
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

  const showMore = () => {
    setDetailView(true);
  };

  const showLess = () => {
    setDetailView(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Card style={styles.currentCard}>
          <Text style={styles.title}>Near you</Text>
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        </Card>
      </View>
    );
  } else if (locationStatus) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={detailView}
          transparent={true}
          onBackdropPress={showLess}
          animationIn="fadeIn"
          animationOut="fadeOut"
        >
          <View style={styles.modal}>
            <Text
              style={{
                marginTop: "3%",
                marginBottom: "3%",
                fontSize: 16,
                color: "white",
              }}
            >
              Near You
            </Text>
            <View style={styles.modalView}>
              <Text style={styles.detailText}>County:</Text>
              <Text style={styles.numericText}>{county}</Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.detailText}>Total Cases: </Text>
              <Text style={styles.numericText}>
                {countyCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.detailText}>Total Deaths: </Text>
              <Text style={styles.numericText}>
                {countyDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
            <Text style={styles.detailTextSmall}>Source: CSBS</Text>
          </View>
        </Modal>
        <Card style={styles.currentCard}>
          <TouchableOpacity onPress={showMore}>
            <Text style={styles.title}>Near you</Text>
            <Text style={styles.numbers}>
              {countyCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.things}>Cases</Text>
            <Divider
              style={{
                backgroundColor: "white",
                marginTop: "7%",
                marginLeft: "15%",
                marginRight: "15%",
                height: 1,
              }}
            />

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
    fontSize: RFValue(22),
    fontFamily: "Avenir",
    color: "white",
    marginLeft: "15%",
  },
  numbers: {
    color: "white",
    marginLeft: "15%",
    fontFamily: "Avenir",
    fontWeight: "bold",
    fontSize: RFValue(23),
    paddingTop: "10%",
  },
  things: {
    fontFamily: "Avenir",
    marginTop: "1%",
    marginLeft: "15%",
    color: "white",
    fontSize: 20,
  },
  currentCard: {
    backgroundColor: "#62d936",
    maxWidth: "100%",
  },
  locationCard: {
    backgroundColor: "#62d936",
    maxWidth: "100%",
    justifyContent: "center",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
  },
  location: {
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    marginVertical: "30%",
    marginHorizontal: "8%",
    borderRadius: RFValue(14),
    backgroundColor: "#62d936",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    width: "90%",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "1%",
  },
  numericText: {
    fontSize: RFValue(18),
    paddingVertical: RFValue(10),
    color: "white",
    fontWeight: "bold",
  },
  detailText: {
    fontSize: RFValue(18),
    alignSelf: "flex-start",
    paddingVertical: RFValue(10),
    color: "white",
  },
  detailTextSmall: {
    position: "absolute",
    bottom: RFValue(5),
    fontSize: RFValue(14),
    justifyContent: "flex-end",
    marginTop: "3%",
    marginBottom: "5%",
    color: "white",
  },
});

export default CurrentLocation;
