import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import CurrentLocation from "./components/CurrentLocation";
import Search from "./components/Search";
import Country from "./components/Country";
import Global from "./components/Global";

import { Col, Row, Grid } from "react-native-easy-grid";

export default function App() {
  return (
    <View style={styles.screen}>
      <Header />
      <Grid>
        <Col style={styles.col}>
          <Row style={styles.row}>
            <CurrentLocation />
          </Row>
          <Row style={styles.row}>
            <Country />
          </Row>
        </Col>
        <Col style={styles.col}>
          <Row style={styles.row}>
            <Global />
          </Row>
          <Row style={styles.row}>
            <Search />
          </Row>
        </Col>
      </Grid>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#b8c4ff",
  },
  row: {
    width: "100%",
    height: "100%",
  },
  col: {
    width: "50%",
    height: "45%",
  },
});
