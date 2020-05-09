import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

const Search = (props) => {
  const [zip, setZip] = useState("");
  const [text, setText] = useState("");

  const gettingCountyCases = (zipCode) => {
    if (zip.length != 5) {
      Alert.alert("please enter a 5 digit zip code");
      return;
    }
    props.setSearchLoading(true);
    const url = `https://covid-hotline-bling.herokuapp.com/zipcode/${zipCode}`;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        props.setSearchLoading(false);
        if (r.cases == undefined || r.deaths == undefined) {
          setTimeout(() =>Alert.alert("please try another zip code"), 40);
        } else {
          setTimeout(() =>Alert.alert(
            `there are currently ${r.cases} cases and ${r.deaths} deaths in area code ${zipCode}`
          ), 40);
        }
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
});

export default Search;
