import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";

const Search = (props) => {
  const [zip, setZip] = useState("");
  const [text, setText] = useState("");

  const gettingCountyCases = (zipCode) => {
    const url = `https://covid-hotline-bling.herokuapp.com/zipcode/${zipCode}`;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        Alert.alert(
          `there are currently ${r.cases} cases and ${r.deaths} deaths in area code ${zipCode}`
        );
      });
      setText("");
  };

  const handleZipValidation = (text) => {
    var newText = text.replace(/[^0-9]/g, "");
    setText(newText);
    setZip(newText);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <View style={styles.input}>
          <TextInput
            placeholder="search for a specific zip code"
            maxLength={5}
            onChangeText={(text) => handleZipValidation(text)}
            onSubmitEditing={gettingCountyCases.bind(this, zip)}
            returnKeyType="search"
            value={text}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    maxHeight: 50,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: "95%",
    alignSelf: "center",
  },
  // modal: {
  //   paddingTop: 50,
  //   maxHeight: "50%",
  //   backgroundColor: "red",
  // },
});

export default Search;
