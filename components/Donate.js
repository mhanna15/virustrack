import React from "react";
import { Text, StyleSheet, View } from "react-native";

import Header from "./Header";
import Search from "./Search";

const Donate = (props) => {
  return (
    <View style={styles.screen}>
      <Header />
      <Search />
      <Text>This is the donate page</Text>
    </View>
  );
};

export default Donate;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
