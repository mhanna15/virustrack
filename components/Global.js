import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import Modal from "react-native-modal";
import { Divider } from "react-native-elements";

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

  const getCasesGlobally = () => {
    const url = "https://api.thevirustracker.com/free-api?global=stats";
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setGlobalCases(r.results[0].total_cases);
        setGlobalDeaths(r.results[0].total_deaths);
        setRecovered(r.results[0].total_recovered);
        setNewCases(r.results[0].total_new_cases_today);
        setNewDeaths(r.results[0].total_new_deaths_today);
        setAffectedCountries(r.results[0].total_affected_countries);
      });
  };

  // const getCasesGlobally = () => {
  //   setGlobalCases("3000000");
  //   setGlobalDeaths("6848649");
  //   setRecovered("547545");
  //   setNewCases("10567");
  //   setNewDeaths("3086");
  //   setAffectedCountries("79");
  // }

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
  }, []);

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
          <Text style={styles.title}>Global</Text>
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
            <Text
              style={{
                marginTop: "3%",
                marginBottom: "3%",
                fontSize: 16,
                color: "white",
              }}
            >
              Global
            </Text>
            <View style={styles.modalView}>
              <Text style={styles.detailText}>Total Cases:</Text>
              <Text style={styles.numericText}>
                {globalCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.detailText}>Total Deaths:</Text>
              <Text style={styles.numericText}>
                {globalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.detailText}>Total Recoveries:</Text>
              <Text style={styles.numericText}>
                {recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.detailText}>Cases Today:</Text>
              <Text style={styles.numericText}>
                {newCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.detailText}>Deaths Today:</Text>
              <Text style={styles.numericText}>
                {newDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.detailText}>Affected Countries:</Text>
              <Text style={styles.numericText}>{affectedCountries}</Text>
            </View>
            <Text style={styles.detailTextSmall}>Sources: WHO, CDC</Text>
          </View>
        </Modal>
        <Card style={styles.globalCard}>
          <TouchableOpacity onPress={showMore}>
            <Text style={styles.title}>Global</Text>
            <Text style={styles.numbers}>
              {globalCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.things}>Cases</Text>
            <Divider
              style={{
                backgroundColor: "white",
                marginTop: "7%",
                marginLeft: "15%",
                marginRight: "15%",
                height: 1,
              }}
            />
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
    backgroundColor: "#f09456",
  },
  title: {
    fontSize: RFValue(22),
    fontFamily: "Avenir",
    color: "white",
    marginLeft: "15%",
  },
  numbers: {
    color: "white",
    marginLeft: "15%",
    fontFamily: "Avenir",
    fontWeight: "bold",
    fontSize: RFValue(23),
    paddingTop: "10%",
  },
  things: {
    fontFamily: "Avenir",
    marginTop: "1%",
    marginLeft: "15%",
    color: "white",
    fontSize: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    marginVertical: "30%",
    marginHorizontal: "8%",
    borderRadius: RFValue(14),
    backgroundColor: "#f09456",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    width: "90%",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "2%",
  },
  numericText: {
    fontSize: RFValue(18),
    paddingVertical: RFValue(10),
    color: "white",
    fontWeight: "bold",
  },
  detailText: {
    fontSize: RFValue(18),
    alignSelf: "flex-start",
    paddingVertical: RFValue(10),
    color: "white",
  },
  detailTextSmall: {
    position: "absolute",
    bottom: RFValue(5),
    fontSize: RFValue(14),
    justifyContent: "flex-end",
    marginTop: "3%",
    marginBottom: "5%",
    color: "white",
  },
});

export default Global;
