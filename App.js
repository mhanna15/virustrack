import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import Current from "./components/Current";
import Search from "./components/Search";

export default function App() {
  return (
    <View style={styles.screen}>
      <Header />
      <Current />
      {/* <Search /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
