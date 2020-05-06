import React from "react";
import { Text, View, StyleSheet } from "react-native";


const Api = (props) => {
  const countyCases = (county) => {};

  return (
    <View style={styles.screen}>
      <Text>{props.county}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Api;
