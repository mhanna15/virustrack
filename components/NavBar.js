import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

const NavBar = (props) => {
  const handleHomeClick = () => {
    // props.setNotifications(false);
    // props.setDonate(false);
    props.setNews(false);
  };

  const handleNewsClick = () => {
    props.setNews(true);
    // setTimeout(() => {
    //   props.setNotifications(false);
    //   props.setDonate(false);
    // }, 200);
  };

  // const handleNotificationsClick = () => {
  //   props.setNotifications(true);
  //   setTimeout(() => {
  //     props.setDonate(false);
  //     props.setNews(false);
  //   }, 200);
  // };

  // const handleDonateClick = () => {
  //   props.setDonate(true);
  //   setTimeout(() => {
  //     props.setNotifications(false);
  //     props.setNews(false);
  //   }, 200);
  // };

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
      {/* <TouchableOpacity onPress={handleNotificationsClick}>
        <View style={styles.icon}>
          <Icon
            name="bell"
            type="font-awesome"
            style={styles.icon}
            size={RFValue(30)}
          />
        </View>
      </TouchableOpacity> */}
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
    height: RFValue(75)
  },
  icon: {
    width: "100%",
    paddingHorizontal: RFValue(30),
    paddingVertical: RFValue(5),
    borderRadius: 30,
  },
});

export default NavBar;
