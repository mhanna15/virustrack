import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  ActivityIndicator,
  Modal,
  Text,
} from "react-native";

import Header from "./components/Header";
import CurrentLocation from "./components/CurrentLocation";
import Search from "./components/Search";
import UnitedStates from "./components/UnitedStates";
import Global from "./components/Global";
import News from "./components/News";
import NavBar from "./components/NavBar";
import Countries from "./components/Countries";

import { Col, Row, Grid } from "react-native-easy-grid";

export default function App() {
  const [searchLoading, setSearchLoading] = useState(false);
  const [news, setNews] = useState(false);
  const [countries, setCountries] = useState(false);
  const [home, setHome] = useState(true);

  

  return (
    <View>
      <Modal visible={home}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Header />
            <Search setSearchLoading={setSearchLoading} />
            <Modal visible={searchLoading}>
              <View style={styles.loader}>
                <ActivityIndicator size="large" />
              </View>
            </Modal>
            <Grid>
              <Col style={styles.col}>
                <Row style={styles.row}>
                  <CurrentLocation />
                </Row>
                <Row style={styles.row}>
                  <UnitedStates />
                </Row>
              </Col>
              <Col style={styles.col}>
                <Row style={styles.row}>
                  <Global />
                </Row>
                <Row style={styles.row}></Row>
              </Col>
            </Grid>
          </View>
        </TouchableWithoutFeedback>
        <NavBar
          setNews={setNews}
          setCountries={setCountries}
          setHome={setHome}
        />
      </Modal>

      <Modal visible={news}>
        <View style={styles.screen}>
          <News />
          <NavBar
            setNews={setNews}
            setCountries={setCountries}
            setHome={setHome}
          />
        </View>
      </Modal>
      <Modal visible={countries}>
        <View style={styles.screen}>
          <Countries />
          <NavBar
            setNews={setNews}
            setCountries={setCountries}
            setHome={setHome}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ebebeb",
  },
  row: {
    width: "100%",
    height: "100%",
  },
  col: {
    width: "50%",
    height: "46%",
  },
  loader: {
    flex: 1,
    backgroundColor: "#ebebeb",
    justifyContent: "center",
    alignItems: "center",
  },
});
