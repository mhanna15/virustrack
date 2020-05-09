import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import Card from "./Card";

const Country = (props) => {
  const [countryCases, setCountryCases] = useState("");
  const [countryDeaths, setCountryDeaths] = useState("");
  const [loading, setLoading] = useState(true);

  const getCasesByCountry = () => {
    const url = "https://api.thevirustracker.com/free-api?countryTotal=US";
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setCountryCases(r.countrydata[0].total_cases);
        setCountryDeaths(r.countrydata[0].total_deaths);
      });
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
    getCasesByCountry();
  }, []);

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
        <Card style={styles.countryCard}>
          <TouchableOpacity>
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
});

export default Country;
