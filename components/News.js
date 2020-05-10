import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Header from "./Header";
import Search from "./Search";

const News = (props) => {
  return (
    <View style={styles.screen}>
      <Header />
      <Search />
      <Text>This is the news page</Text>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
