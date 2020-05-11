import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
  Text,
} from "react-native";

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

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
        <View style = {{marginLeft: "3.5%", marginRight: "3.5%",display:"flex", flexDirection:"row" }}>
          <View style={styles.input}>
            <TextInput
              placeholder="Search by zipcode"
              maxLength={5}
              onChangeText={(text) => handleZipValidation(text)}
              onSubmitEditing={gettingCountyCases.bind(this, zip)}
              returnKeyType="search"
              value={text}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    maxHeight: RFValue(55),
    // backgroundColor:"red",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: "2.5%",
    width: "100%",
    marginBottom:"5%",
  },
});

export default Search;
