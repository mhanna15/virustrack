import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import CurrentLocation from "./components/CurrentLocation";
import Search from "./components/Search";
import Country from "./components/Country";
import Global from "./components/Global";

export default function App() {

  

  

  return (
    <View style={styles.screen}>
      <Header />
      <CurrentLocation />
      <Country />
      <Global />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
