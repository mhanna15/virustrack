import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Header from "./Header";
import Card from "./Card";

const Countries = (props) => {
  const [loading, setLoading] = useState(true);
  const [countryData, setCountryData] = useState([]);

  const fetchCountries = () => {
    const url = "https://api.covid19api.com/summary";
    fetch(url)
      .then((r) => r.json())
      .then((r) => setCountryData(r.Countries));
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
    fetchCountries();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <Header />
        <View style={styles.countryContainer}>
          <FlatList
            data={countryData}
            keyExtractor={(item) => item.CountryCode}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Card style={styles.card}>
                  <View style={styles.countryContainerText}>
                    <Text style={styles.country}>{item.Country}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  country: {
    fontSize: 20,
    fontFamily: "Avenir",
  },
  countryContainer: {
    marginBottom: RFValue(56),
  },
  countryContainerText: {
    paddingLeft: 10,
  },
  card: {
    height: 50,
    width: "94%",
    marginBottom: "4%",
    marginLeft: "3%",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
});
export default Countries;
