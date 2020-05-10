import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Modal from "react-native-modal";

import Card from "./Card";

const Country = (props) => {
  const [countryCases, setCountryCases] = useState("");
  const [countryDeaths, setCountryDeaths] = useState("");
  const [loading, setLoading] = useState(true);
  const [detailView, setDetailView] = useState(false);
  const [recovered, setRecovered] = useState("");
  const [newCases, setNewCases] = useState("");
  const [newDeaths, setNewDeaths] = useState("");

  // const getCasesByCountry = () => {
  //   const url = "https://api.thevirustracker.com/free-api?countryTotal=US";
  //   fetch(url)
  //     .then((r) => r.json())
  //     .then((r) => {
  //       setCountryCases(r.countrydata[0].total_cases);
  //       setCountryDeaths(r.countrydata[0].total_deaths);
  //       setRecovered(r.countrydata[0].total_recovered);
  //       setNewCases(r.countrydata[0].total_new_cases_today);
  //       setNewDeaths(r.countrydata[0].total_new_deaths_today);
  //     });
  //     console.log("hello")
  // };

  const getCasesByCountry = () => {
        setCountryCases("2035885");
        setCountryDeaths("2058385");
        setRecovered("2035838");
        setNewCases("2038385");
        setNewDeaths("2058385");
  }

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setLoading(false);
    }
  });

  useEffect(() => {
    getCasesByCountry();
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
        <Card style={styles.countryCard}>
          <Text style={styles.title}>America:</Text>
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        </Card>
      </View>
    );
  } else {
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
            <Text style={styles.detailText}>
              Total Cases:{" "}
              {countryCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.detailText}>
              Total Deaths:{" "}
              {countryDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.detailText}>
              Total Recoveries:{" "}
              {recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.detailText}>
              Cases Today:{" "}
              {newCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.detailText}>
              Deaths Today:{" "}
              {newDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.detailTextSmall}>Sources: WHO, CDC</Text>
          </View>
        </Modal>
        <Card style={styles.countryCard}>
          <TouchableOpacity onPress={showMore}>
            <Text style={styles.title}>America:</Text>
            <Text style={styles.numbers}>
              {countryCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.things}>Cases</Text>
            <Text style={styles.numbers}>
              {countryDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.things}>Deaths</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  countryCard: {
    backgroundColor: "#24e9ff",
    maxWidth: "100%",
  },
  title: {
    fontSize: RFValue(30),
    alignSelf: "center",
  },
  numbers: {
    alignSelf: "center",
    fontSize: RFValue(25),
    paddingTop: RFPercentage(5),
  },
  things: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    marginVertical: "33%",
    marginHorizontal: "10%",
    borderRadius: RFValue(20),
    backgroundColor: "rgb(124,226,232)",
    alignItems: "center",
    justifyContent: "center",
  },
  detailText: {
    fontSize: RFValue(18),
    alignSelf: "flex-start",
    paddingLeft: RFValue(10),
    paddingVertical: RFValue(10),
  },
  detailTextSmall: {
    position: "absolute",
    bottom: RFValue(20),
    fontSize: RFValue(10),
    justifyContent: "flex-end",
  },
});

export default Country;
