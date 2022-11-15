import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Card, Layout, Divider } from "@ui-kitten/components";
import RoomGridTile from "../../component/contract/RoomGridTile";
import { RENT } from "../../dummy/RENT";
import { FontAwesome } from "@expo/vector-icons";
import { NEWS } from "../../dummy/NEWS";
import News from "../../component/annoucenews/news";
import AnnouceNews from "./AnnouceNews";
const MainTenant = ({ route, navigation }) => {
  const annNews = NEWS;
  const [text, setText] = React.useState("");

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
  return (
    <View style={styles.view}>
      {/* <View style={styles.header2}>
      </View> */}
      <View style={[styles.container]}>
        <ScrollView>
          <View
            style={{
              //   backgroundColor: "red",
              width: "100%",
              height: "10%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#d6ddea",
                width: "90%",
                height: "80%",
                borderRadius: "10%",
                padding: 20,
                shadowColor: "gray",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.39,
                shadowRadius: 8.3,

                elevation: 13,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View style={styles.viewCircle}>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => navigation.navigate("InvoiceBill")}
                >
                  <Ionicons name="document-text" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headTxt}>บิลค่าเช่า</Text>
              </View>

              <View style={styles.viewCircle}>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => navigation.navigate("Parcel")}
                >
                  <Feather name="box" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headTxt}>พัสดุ</Text>
              </View>

              <View style={styles.viewCircle}>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => navigation.navigate("Reports")}
                >
                  <AntDesign name="notification" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headTxt}>แจ้งเรื่อง</Text>
              </View>

              <View style={styles.viewCircle}>
                <TouchableOpacity style={styles.circle}>
                  <Ionicons name="newspaper-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headTxt}>ข่าวสาร</Text>
              </View>
            </View>
          </View>

          {/* <ScrollView style={{ top: "2%" }}> */}
            <View style={styles.newsContent}>
              <FlatList
                data={NEWS}
                renderItem={renderGridItem}
                numColumns={2}
                keyExtractor={(item) => item.id}
                navigation={navigation}
              />
            </View>
          {/* </ScrollView> */}

          {/* <ScrollView style={{ flex: 1 }}>
        <View style={[{ alignItems: "center" }]}>
          {annNews.map((item, index) => (
            <View key={index}>
              <News data={item} navigation={navigation} />
            </View>
          ))}
        </View>
      </ScrollView> */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  header: {
    margin: 10,
    height: "13%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  header2: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginBottom: 0,
    height: "5%",
    backgroundColor: "#D9D9D9",
    shadowColor: "#B2B1B1",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  container: {
    margin: 10,
    height: "95%",
    // backgroundColor: "#F4ECEC",
    shadowColor: "#D9D9D9",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  circle: {
    backgroundColor: "#333b5f",
    width: 40,
    height: 40,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  viewCircle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "28%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 7,
    marginHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headTxt: {
    fontWeight: "bold",
    top: 5,
    fontSize: "12px",
    color: "#646262",
  },
  container1: {
    // justifyContent: "space-between",
    display: "flex",
    height: "100%",
    felx: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  background: {
    width: "100%",
    height: "29%",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  input: {
    height: 60,
    width: 250,
    padding: 15,
    fontSize: 18,
    marginBottom: 2,
    borderRightColor: "white",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
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
    borderRadius: 10,
    backgroundColor: "white",
  },
  //   scrollView: {
  //     width: "100%",
  //     top: 250,
  //     position: "absolute",
  //     height: 600,
  //     paddingBottom: 50,
  //   },
  newsContent: {
    width: "100%",
    height: 600,
    paddingBottom: 50,
    alignItems: "center",
  },
});
export default MainTenant;
