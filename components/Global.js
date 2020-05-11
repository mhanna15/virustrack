import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Modal from "react-native-modal";

import Card from "./Card";

const Global = (props) => {
  const [globalCases, setGlobalCases] = useState("");
  const [globalDeaths, setGlobalDeaths] = useState("");
  const [loading, setLoading] = useState(true);
  const [detailView, setDetailView] = useState(false);
  const [recovered, setRecovered] = useState("");
  const [newCases, setNewCases] = useState("");
  const [newDeaths, setNewDeaths] = useState("");
  const [affectedCountries, setAffectedCountries] = useState("");

  // const getCasesGlobally = () => {
  //   const url = "https://api.thevirustracker.com/free-api?global=stats";
  //   fetch(url)
  //     .then((r) => r.json())
  //     .then((r) => {
  //       setGlobalCases(r.results[0].total_cases);
  //       setGlobalDeaths(r.results[0].total_deaths);
  //       setRecovered(r.results[0].total_recovered);
  //       setNewCases(r.results[0].total_new_cases_today);
  //       setNewDeaths(r.results[0].total_new_deaths_today);
  //       setAffectedCountries(r.results[0].total_affected_countries);
  //     });
  // };

  const getCasesGlobally = () => {
    setGlobalCases("3000000");
    setGlobalDeaths("4347394");
    setRecovered("4347394");
    setNewCases("4347394");
    setNewDeaths("4347394");
    setAffectedCountries("4347394");
  }

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setLoading(false);
    }
  });

  useEffect(() => {
    getCasesGlobally();
  }, [globalCases]);

  const showMore = () => {
    setDetailView(true);
  };

  const showLess = () => {
    setDetailView(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Card style={styles.globalCard}>
          <Text style={styles.title}>Global:</Text>
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        </Card>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={detailView}
          transparent={true}
          onBackdropPress={showLess}
          animationIn="fadeIn"
          animationOut="fadeOut"
        >
          <View style={styles.modal}>
            <Text style={styles.detailText}>
              Total Cases:{" "}
              {globalCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.detailText}>
              Total Deaths:{" "}
              {globalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.detailText}>
              Total Recoveries:{" "}
              {recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.detailText}>
              Cases Today:{" "}
              {newCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.detailText}>
              Deaths Today:{" "}
              {newDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.detailText}>
              Total Affected Counties: {affectedCountries}
            </Text>
            <Text style={styles.detailTextSmall}>Sources: WHO, CDC</Text>
          </View>
        </Modal>

        <Card style={styles.globalCard}>
          <TouchableOpacity onPress={showMore}>
            <Text style={styles.title}>Global:</Text>
            <Text style={styles.numbers}>
              {globalCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.things}>Cases</Text>
            <Text style={styles.numbers}>
              {globalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.things}>Deaths</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  globalCard: {
    backgroundColor: "black",
  },
  title: {
    fontSize: RFValue(30),
    color: "white",
    alignSelf: "center",
  },
  numbers: {
    alignSelf: "center",
    color: "white",
    fontSize: RFValue(25),
    paddingTop: RFPercentage(5),
  },
  things: {
    justifyContent: "center",
    color: "white",
    alignSelf: "center",
    fontSize: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    marginVertical: "30%",
    marginHorizontal: "10%",
    borderRadius: RFValue(20),
    backgroundColor: "rgb(124,226,232)",
    alignItems: "center",
    justifyContent: "center",
  },
  detailText: {
    fontSize: RFValue(18),
    alignSelf: "flex-start",
    paddingLeft: RFValue(10),
    paddingVertical: RFValue(10),
  },
  detailTextSmall: {
    position: "absolute",
    bottom: RFValue(20),
    fontSize: RFValue(10),
    justifyContent: "flex-end",
  },
});

export default Global;
