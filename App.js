import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import CurrentLocation from "./components/CurrentLocation";
import Search from "./components/Search";
import Api from "./components/Api";

export default function App() {
  const [countyCases, setCountyCases] = useState("");
  const [countyDeaths, setCountyDeaths] = useState("");
  const [zip, setZip] = useState("");

  return (
    <View style={styles.screen}>
      <Header />
      <CurrentLocation
        countyCases={countyCases}
        countyDeaths={countyDeaths}
        zip={zip}
      />
      {/* <Search /> */}
      <Api
        setCountyCases={setCountyCases}
        setCountyDeaths={setCountyDeaths}
        zip={zip}
        setZip={setZip}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
