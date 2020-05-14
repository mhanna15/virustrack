import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>

  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    paddingVertical: 20,
    borderRadius: 10,
    marginLeft: "7.5%",
    width: "85%",
    height: "90%",
    marginRight:"7.5%"
  },
});

export default Card;
