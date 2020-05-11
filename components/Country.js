import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { Divider } from 'react-native-elements';

import Modal from "react-native-modal";

import Card from "./Card";

const Country = (props) => {
  const [countryCases, setCountryCases] = useState("");
  const [countryDeaths, setCountryDeaths] = useState("");
  const [loading, setLoading] = useState(true);
  const [detailView, setDetailView] = useState(false);
  const [recovered, setRecovered] = useState("");
  const [newCases, setNewCases] = useState("");
  const [newDeaths, setNewDeaths] = useState("");

  // const getCasesByCountry = () => {
  //   const url = "https://api.thevirustracker.com/free-api?countryTotal=US";
  //   fetch(url)
  //     .then((r) => r.json())
  //     .then((r) => {
  //       setCountryCases(r.countrydata[0].total_cases);
  //       setCountryDeaths(r.countrydata[0].total_deaths);
  //       setRecovered(r.countrydata[0].total_recovered);
  //       setNewCases(r.countrydata[0].total_new_cases_today);
  //       setNewDeaths(r.countrydata[0].total_new_deaths_today);
  //     });
  //     console.log("hello")
  // };

  const getCasesByCountry = () => {
        setCountryCases("2035885");
        setCountryDeaths("456");
        setRecovered("166");
        setNewCases("1666");
        setNewDeaths("11");
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
    getCasesByCountry();
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
        <Card style={styles.countryCard}>
          <Text style={styles.title}>America</Text>
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
          <View style={styles.modal} >

            <Text style = {{marginTop: "3%", marginBottom: "3%", fontSize: "16", color: "white",}}>America</Text>

            
            <View style = {styles.modalView}>
              <Text style={styles.detailText}>Total Cases:</Text>
              <Text style = {styles.numericText}>{countryCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </View>

            <View style = {styles.modalView}>
              <Text style={styles.detailText}>Total Deaths:</Text>
              <Text style = {styles.numericText}>{countryDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </View>

            <View style = {styles.modalView}>
              <Text style={styles.detailText}>Total Recoveries:</Text>
              <Text style = {styles.numericText}>{recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </View>

            <View style = {styles.modalView}>
              <Text style={styles.detailText}>Cases Today:</Text>
              <Text style = {styles.numericText}>{newCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </View>

            <View style = {styles.modalView}>
              <Text style={styles.detailText}>Deaths Today:</Text>
              <Text style = {styles.numericText}>{newDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </View>

            <Text style={styles.detailTextSmall}>Sources: WHO, CDC</Text>
          </View>
        </Modal>
        <Card style={styles.countryCard}>
          <TouchableOpacity onPress={showMore}>
            <Text style={styles.title}>America</Text>
            <Text style={styles.numbers}>
              {countryCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.things}>Cases</Text>
            <Divider style={{ backgroundColor: 'white', marginTop: "7%", marginLeft: "15%", marginRight: "15%", height: 1, }} />
            <Text style={styles.numbers}>
              {countryDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <Text style={styles.things}>Deaths</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  countryCard: {
    backgroundColor: "#8595ff",
    maxWidth: "100%",
  },
  title: {
    fontSize: RFValue(22),
    fontFamily: "Avenir",
    color: "white",
    marginLeft:"15%",
  },
  numbers: {
    color: "white",
    marginLeft:"15%",
    fontFamily: "Avenir",
    fontWeight: "bold",
    fontSize: RFValue(23),
    paddingTop: RFPercentage(1),
  },
  things: {
    fontFamily:"Avenir",
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
    backgroundColor: "#8595ff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailText: {
    fontSize: RFValue(18),
    alignSelf: "flex-start",
    // paddingLeft: RFValue(10),
    paddingVertical: RFValue(10),
    color: "white",
    // fontWeight: "bold",
  },
  modalView: {
    display: "flex", 
    flexDirection:"row", 
    justifyContent:"space-between", 
    borderBottomWidth: 0.5, 
    borderBottomColor: "white", 
    width: "90%", 
    marginLeft: "10%", 
    marginRight: "10%",
    marginBottom: "2%",
  },
  numericText: {
    fontSize: RFValue(18),
    // alignSelf: "flex-start",
    paddingVertical: RFValue(10),
    color: "white",
    fontWeight: "bold",
    // marginRight:"3%",
  },
  detailTextSmall: {
    position: "absolute",
    bottom: RFValue(5),
    fontSize: RFValue(14),
    justifyContent: "flex-end",
    marginTop: "3%",
    marginBottom:"5%",
    color: "white",
  },
});

export default Country;
