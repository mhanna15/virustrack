import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

import { RFPercentage } from "react-native-responsive-fontsize";

const Header = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <Text
          style={{
            fontFamily: "Avenir",
            fontSize: 24,
            fontWeight: "bold",
            color: "black",
          }}
        >
          VirusTrack
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    maxHeight: "10%",
  },
  top: {
    flex: 1,
    marginTop: RFPercentage(5),
    marginHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
  },
});

export default Header;
