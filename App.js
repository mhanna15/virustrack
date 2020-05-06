import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import Current from "./components/Current";
import Search from "./components/Search";
import Api from "./components/Api";

export default function App() {
  const [zip, setzip] = useState("");

    return (
      <View style={styles.screen}>
        <Header />
        <Current zip={zip} setZip={setZip} />
        {/* <Search /> */}
        <Api zip={zip} />
      </View>
    );
  }

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
