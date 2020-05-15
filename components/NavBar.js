import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

const NavBar = (props) => {
  const handleHomeClick = () => {
    props.setHome(true)
    props.setNews(false);
    props.setCountries(false);
  };

  const handleNewsClick = () => {
    props.setHome(false)
    props.setNews(true);
    props.setCountries(false);
  };

  const handleCountriesClick = () => {
    props.setHome(false)
    props.setNews(false);
    props.setCountries(true);
  };

  return (
    <View style={styles.background}>
      <TouchableOpacity onPress={handleHomeClick}>
        <View style={styles.icon}>
          <Icon
            name="home"
            type="font-awesome"
            style={styles.icon}
            size={RFValue(35)}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNewsClick}>
        <View style={styles.icon}>
          <Icon
            name="newspaper-o"
            type="font-awesome"
            style={styles.icon}
            size={RFValue(35)}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCountriesClick}>
        <View style={styles.icon}>
          <Icon
            name="globe"
            type="font-awesome"
            style={styles.icon}
            size={RFValue(35)}
          />
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={handleDonateClick}>
        <View style={styles.icon}>
          <Icon
            name="usd"
            type="font-awesome"
            style={styles.icon}
            size={RFValue(30)}
          />
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    marginTop: -65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: RFValue(75),
  },
  icon: {
    width: "100%",
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(5),
    borderRadius: 30,
  },
});

export default NavBar;
