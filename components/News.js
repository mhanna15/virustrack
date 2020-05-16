import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Linking,
  Image,
  ActivityIndicator,
} from "react-native";

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import Card from "./Card";

import Header from "./Header";

const months = new Array();
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNewsFetch = () => {
    fetch("https://virustrack-api.herokuapp.com/articles")
      .then((r) => r.json())
      .then((r) => {
        for (var i = 0; i < r.length; i++) {
          setArticles(r);
        }
      });
    console.log("api endpoint hit");
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
    handleNewsFetch();
  }, []);

  const handleDate = (date) => {
    const newDate = date.split("-");
    const year = newDate[0];
    const month = months[parseInt(newDate[1] - 1)];
    const day = newDate[2].substring(0, 2);
    const returnDate = `${month} ${day}, ${year}`;
    return returnDate;
  };

  const handleDescription = (item) => {
    if (item.description == null) {
      return item.content;
    } else {
      return item.description;
    }
  };

  const handleImageUrl = (item) => {
    if (item.image_url == null) {
      return;
    } else {
      return item.image_url;
    }
  };

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
        <View style={styles.articles}>
          <FlatList
            data={articles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Card
                  style={{
                    borderRadius: 20,
                    height: 154,
                    width: "94%",
                    padding: 20,
                    marginBottom: "4%",
                    marginLeft: "3%",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      backgroundColor: "#e6e6e6",
                      marginBottom: "2%",
                      marginTop: "-1%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      onPress={() => Linking.openURL(handleImageUrl(item))}
                      style={{ fontStyle: "italic" }}
                    >
                      {item.source}
                    </Text>
                    <Text>{handleDate(item.date)}</Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "2%",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Avenir",
                        fontWeight: "bold",
                        fontSize: 14,
                        width: "70%",
                      }}
                      onPress={() => Linking.openURL(item.url)}
                    >
                      {handleDescription(item)}
                    </Text>
                    <Image
                      source={{ uri: item.image_url }}
                      style={{
                        width: 90,
                        height: 94,
                        borderRadius: 10,
                        marginLeft: "3%",
                      }}
                    />
                  </View>
                </Card>
              </View>
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
  text: {
    display: "flex",
    flexDirection: "row",
  },
  articles: {
    flex: 1,
    marginBottom: RFValue(54),
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
});

export default News;
