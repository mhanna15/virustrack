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
import Country from "./components/Country";
import Global from "./components/Global";
import NewCountry from "./components/NewCountry";
import Notifications from "./components/Notifications";
import News from "./components/News";
import Donate from "./components/Donate";
import NavBar from "./components/NavBar";

import { Col, Row, Grid } from "react-native-easy-grid";

export default function App() {
  const [searchLoading, setSearchLoading] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [news, setNews] = useState(false);
  const [donate, setDonate] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <Header />
        <Search setSearchLoading={setSearchLoading} />
        <Modal visible={searchLoading}>
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        </Modal>
        <Modal visible={notifications}>
          <View style={styles.screen}>
            <Notifications />
            <NavBar
              setNews={setNews}
              setDonate={setDonate}
              setNotifications={setNotifications}
            />
          </View>
        </Modal>
        <Modal visible={news}>
          <View style={styles.screen}>
            <News />
            <NavBar
              setNews={setNews}
              setDonate={setDonate}
              setNotifications={setNotifications}
            />
          </View>
        </Modal>
        <Modal visible={donate}>
          <View style={styles.screen}>
            <Donate />
            <NavBar
              setNews={setNews}
              setDonate={setDonate}
              setNotifications={setNotifications}
            />
          </View>
        </Modal>
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
              <NewCountry />
            </Row>
          </Col>
        </Grid>
        <NavBar
          setNews={setNews}
          setDonate={setDonate}
          setNotifications={setNotifications}
        />
      </View>
    </TouchableWithoutFeedback>
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
  loader: {
    flex: 1,
    backgroundColor: "#b8c4ff",
    justifyContent: "center",
    alignItems: "center",
  },
});
