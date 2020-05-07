import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

import Card from "./Card";

const Country = (props) => {
  const [countryCases, setCountryCases] = useState("");
  const [countryDeaths, setCountryDeaths] = useState("");

  const getCasesByCountry = () => {
    const url = "https://api.thevirustracker.com/free-api?countryTotal=US";
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setCountryCases(r.countrydata[0].total_cases);
        setCountryDeaths(r.countrydata[0].total_deaths);
      });
  };

  useEffect(() => {
    getCasesByCountry();
  }, []);

  return (
    <View style={{ flex: 1 }}>

    <Card style={styles.countryCard}>
      <TouchableOpacity>
        <Text style={styles.title}>America:</Text>
        <Text style={styles.numbers}>{countryCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
        <Text style={styles.things}>Cases</Text>
        <Text style={styles.numbers}>{countryDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
        <Text style={styles.things}>Deaths</Text>
      </TouchableOpacity>
    </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  countryCard: {
    backgroundColor: "#24e9ff",
  },
  title: {
    fontSize: 35,
    alignSelf: "center",
    paddingHorizontal: 6,
  },
  numbers: {
    alignSelf: "center",
    fontSize: 30,
    paddingTop: 45,
  },
  things: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 20,
  },
});

export default Country;
