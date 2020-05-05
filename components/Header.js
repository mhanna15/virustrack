import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <Text>VirusTracker</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    maxHeight: 100,
  },
  top: {
    marginTop: 30,
    padding: 20,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default Header;
