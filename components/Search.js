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
  const [countyCases, setCountyCases] = useState("");
  const [countyDeaths, setCountyDeaths] = useState("");


  const gettingCountyCases = (zipCode) => {
    const url = `https://covid-hotline-bling.herokuapp.com/zipcode/${zipCode}`;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setCountyCases(r.cases);
        setCountyDeaths(r.deaths);
        Alert.alert(
          `there are currently ${r.cases} cases and ${r.deaths} deaths in area code ${zipCode}`
        );
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <View style={styles.input}>
          <TextInput
            placeholder="enter a zip code"
            keyboardType="number-pad"
            maxLength={5}
            onChangeText={(zip) => setZip(zip)}
          />
        </View>
        <TouchableOpacity onPress={gettingCountyCases.bind(this, zip)}>
          <View style={styles.search}>
            <Text>Search</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
    width: 140,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    paddingTop: 50,
    maxHeight: "50%",
    backgroundColor: "red",
  },
  search: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
});

export default Search;
