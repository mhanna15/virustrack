import React from "react";
import { Text, StyleSheet, View } from "react-native";

import { RFPercentage } from "react-native-responsive-fontsize";


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
    maxHeight: "8%",
  },
  top: {
    flex: 1,
    marginTop: RFPercentage(3),
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
  },
});

export default Header;
