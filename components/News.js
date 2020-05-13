import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Linking,
  Image,
} from "react-native";

import Header from "./Header";

const News = (props) => {
  const [articles, setArticles] = useState([]);

  const handleNewsFetch = () => {
    fetch("http:localhost:3000/articles")
      .then((r) => r.json())
      .then((r) => {
        for (var i = 0; i < r.length; i++) {
          setArticles(...articles, r);
        }
      });
  };

  return (
    <View style={styles.screen}>
      <Header />
      <Button title="click" onPress={handleNewsFetch} />
      <View style={styles.articles}>
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <View style={styles.text}>
              <Image
                source={{ uri: item.image_url }}
                style={{ width: 50, height: 50 }}
              />
              <Text>{item.description}</Text>
              <Text>Date: {item.date}</Text>
              <Text onPress={() => Linking.openURL(item.url)}>Source</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    padding: 10,
  },
  articles: {
    flex: 1,
    marginBottom: 60,
  },
});
