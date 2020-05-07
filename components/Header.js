import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <Text style={styles.title}>VirusTracker</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    maxHeight: 90,
  },
  top: {
    marginTop: 30,
    padding: 15,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
  },
});

export default Header;
