import React, { useState, useCallback } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import News from "../../component/annoucenews/news";
import Modal from "../../component/annoucenews/createdPost";
import { baseUrl } from "@env";
import axios from "axios";

const AnnouceNews = ({ navigation }) => {
  const [news, setNews] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const url = `${baseUrl}/news`;

      const fetchUsers = async () => {
        try {
          const response = await axios.get(url);
          if (response.status === 200) {
            setNews(response.data);
            // console.log(response.data);
            return;
          } else {
            throw new Error("Failed");
          }
        } catch (error) {
          console.log("error");
        }
      };
      fetchUsers();
    }, [])
  );

  const renderGridItem = (itemData) => {
    return (
      <News
        item={itemData}
        // index={index}
        width={"90%"}
        numberOfLines={2}
        canEdit={true}
        onSelect={() => {
          navigation.navigate("NewsDetail", {
            title: itemData.item.title,
            newsId: itemData.item.text,
            item: itemData.item,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg_login.jpg")}
        style={styles.background}
      ></Image>

      <Modal />

      <View style={styles.newsContent}>
        <FlatList
          data={news}
          renderItem={renderGridItem}
          numColumns={1}
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
    top: 150,
    position: "absolute",
    height: 600,
    paddingBottom: 50,
    alignItems: "center",
  },
});

export default AnnouceNews;
