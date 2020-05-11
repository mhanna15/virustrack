import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

const NavBar = (props) => {
  const handleHomeClick = () => {
    props.setNotifications(false);
    props.setDonate(false);
    props.setNews(false);
  };

  const handleNewsClick = () => {
    props.setNews(true);
    setTimeout(() => {
      props.setNotifications(false);
      props.setDonate(false);
    }, 200);
  };

  const handleNotificationsClick = () => {
    props.setNotifications(true);
    setTimeout(() => {
      props.setDonate(false);
      props.setNews(false);
    }, 200);
  };

  const handleDonateClick = () => {
    props.setDonate(true);
    setTimeout(() => {
      props.setNotifications(false);
      props.setNews(false);
    }, 200);
  };

  return (
    <View style={styles.background}>
      <TouchableOpacity onPress={handleHomeClick}>
        <Icon
          name="home"
          type="font-awesome"
          style={styles.icon}
          size={RFValue(30)}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNewsClick}>
        <Icon
          name="newspaper-o"
          type="font-awesome"
          style={styles.icon}
          size={RFValue(30)}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNotificationsClick}>
        <Icon
          name="bell"
          type="font-awesome"
          style={styles.icon}
          size={RFValue(25)}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDonateClick}>
        <Icon
          name="usd"
          type="font-awesome"
          style={styles.icon}
          size={RFValue(25)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 0.1,
    backgroundColor: "white",
    marginTop: -70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    paddingHorizontal: RFValue(33),
  },
});

export default NavBar;
