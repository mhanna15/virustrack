import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const Search = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.body}>Search for a Specific County:</Text>
      <TextInput style={styles.input}/>
      <Button title="search" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  body: {
    padding: 20,
    fontSize: 20,
  },
  input: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      padding: 10,
      marginHorizontal: 50,
  }
});

export default Search;
