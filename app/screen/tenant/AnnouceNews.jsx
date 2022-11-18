import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NEWS } from "../../dummy/NEWS";
import News from "../../component/annoucenews/news";
import {baseUrl} from "@env"
import axios from 'axios';

const AnnouceNews = ({ navigation }) => {
  const renderGridItem = (itemData) => {
    console.log(itemData);
    return (
      <News
        item={itemData}
        width={150}
        numberOfLines={2}
        onSelect={() => {
          navigation.navigate("NewsDetail",{
            title : itemData.item.title,
            newsId: itemData.item.id,
            data : itemData.item
          });
        }}
      />
    );
  };

  useEffect(() =>{

  })

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg_login.jpg")}
        style={styles.background}
      ></Image>

      <View style={styles.newsContent}>
        <FlatList
        data={NEWS}
        renderItem={renderGridItem}
        numColumns={1}
        keyExtractor={item => item.id}
        navigation={navigation}
      />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    felx: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  background: {
    width: "100%",
    height: "50%",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  input: {
    height: 45,
    width: 250,
    padding: 15,
    fontSize: 18,
    marginBottom: 2,
    borderRightColor: "white",
  },
  search: {
    position: "absolute",
    alignItems: "center",
    top: 120,
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    paddingRight: 10,
    borderColor: "#90AACB",
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: "white",
  },
  newsContent: {
    width: "100%",
    top: 50,
    position: "absolute",
    height: 600,
    paddingBottom: 50,
    alignItems: "center",
  },
});

export default AnnouceNews;
