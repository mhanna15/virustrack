import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const Search = (props) => {
  return (
    <View style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <TextInput
            placeholder="enter a zip code"
            keyboardType="number-pad"
            style={styles.input}
          />
          <Button title="search" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 50,
  },
});

export default Search;
