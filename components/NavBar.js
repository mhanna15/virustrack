import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

const NavBar = (props) => {
  const handleHomeClick = () => {
    props.setNews(false);
  };

  const handleNewsClick = () => {
    props.setNews(true);
  };

  return (
    <View style={styles.background}>
      <TouchableOpacity onPress={handleHomeClick}>
        <View style={styles.icon}>
          <Icon
            name="home"
            type="font-awesome"
            style={styles.icon}
            size={RFValue(40)}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNewsClick}>
        <View style={styles.icon}>
          <Icon
            name="newspaper-o"
            type="font-awesome"
            style={styles.icon}
            size={RFValue(40)}
          />
        </View>
      </TouchableOpacity>
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
    paddingHorizontal: RFValue(30),
    paddingVertical: RFValue(5),
    borderRadius: 30,
  },
});

export default NavBar;
