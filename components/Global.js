import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Modal,
} from "react-native";

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import Card from "./Card";

const Global = (props) => {
  const [globalCases, setGlobalCases] = useState("");
  const [globalDeaths, setGlobalDeaths] = useState("");
  const [loading, setLoading] = useState(true);
  const [detailView, setDetailView] = useState(false);

  const getCasesGlobally = () => {
    const url = "https://api.thevirustracker.com/free-api?global=stats";
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setGlobalCases(r.results[0].total_cases);
        setGlobalDeaths(r.results[0].total_deaths);
      });
  };

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
        {/* <Modal visible={detailView}>
            <View style={styles.detailed}>
              <Text>HEllo</Text>
            </View>
          </Modal> */}

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
    backgroundColor: "#1fffc0",
  },
  title: {
    fontSize: RFValue(30),
    alignSelf: "center",
  },
  numbers: {
    alignSelf: "center",
    fontSize: RFValue(25),
    paddingTop: RFPercentage(5),

  },
  things: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center"
  },
  detailed: {
    flex: 1,
    marginVertical: "40%",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Global;
