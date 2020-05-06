import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import Card from "./Card";

const Global = (props) => {
  const [globalCases, setGlobalCases] = useState("");
  const [globalDeaths, setGlobalDeaths] = useState("");

  const getCasesGlobally = () => {
    const url = "https://api.thevirustracker.com/free-api?global=stats";
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setGlobalCases(r.results[0].total_active_cases);
        setGlobalDeaths(r.results[0].total_deaths);
      });
  };

  useEffect(() => {
    getCasesGlobally();
  }, []);

  return (
    <Card style={styles.globalCard}>
      <TouchableOpacity>
        <Text style={styles.title}>Global:</Text>
        <Text style={styles.numbers}>{globalCases}</Text>
        <Text style={styles.things}>Cases</Text>
        <Text style={styles.numbers}>{globalDeaths}</Text>
        <Text style={styles.things}>Deaths</Text>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  globalCard: {
    backgroundColor: "#1fffc0",
  },
  title: {
    fontSize: 35,
    alignSelf: "center",
    paddingHorizontal: 17
  },
  numbers: {
    alignSelf: "center",
    fontSize: 30,
    paddingTop: 45,
  },
  things: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 20
  },
});

export default Global;
