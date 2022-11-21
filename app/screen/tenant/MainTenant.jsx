import React, { useState, useEffect } from "react";
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
import { FontAwesome5 } from "@expo/vector-icons";
import { Card, Layout, Divider } from "@ui-kitten/components";
import RoomGridTile from "../../component/contract/RoomGridTile";
import { RENT } from "../../dummy/RENT";
import { FontAwesome } from "@expo/vector-icons";
import { NEWS } from "../../dummy/NEWS";
import News from "../../component/annoucenews/news";
import AnnouceNews from "./AnnouceNews";
import { baseUrl } from "@env";
import axios from "axios";

const MainTenant = ({ route, navigation }) => {
  const [news, setNews] = useState(null);

  const renderGridItem = (itemData) => {
    console.log(itemData);
    return (
      <News
      numberOfLines={3}
        item={itemData}
        width={"90%"}
        canEdit={false}
        onSelect={() => {
          navigation.navigate("NewsDetail", {
            title: itemData.item.title,
            newsId: itemData.item.id,
            data: itemData.item,
          });
        }}
      />
    );
  };

  useEffect(() => {
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
  }, []);

  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_login.jpg")}
        style={styles.background}
      ></Image>
      <View style={[styles.container]}>
        <View
          style={{
            // backgroundColor: "red",
            width: "100%",
            height: "20%",
            alignItems: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "90%",
              height: "100%",
              borderRadius: "10%",
              padding: 20,
              elevation: 13,
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
            }}
          >

            <View
              style={{
                width: "90%",
                height: "100%",
                borderRadius: "10%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.viewCircle}>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => navigation.navigate("AllInvoice")}
                >
                  <FontAwesome5 name="file-invoice-dollar" size={36} color="white" />
                  <Text style={styles.headTxt}>บิลค่าเช่า</Text>
                </TouchableOpacity>
               
              </View>

              <View style={styles.viewCircle}>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => navigation.navigate("Parcels")}
                >
                  <FontAwesome5 name="box" size={36} color="white" />
                  <Text style={styles.headTxt}>พัสดุ</Text>
                </TouchableOpacity>
                
              </View>

              <View style={styles.viewCircle}>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => navigation.navigate("Report")}
                >
                  <Ionicons name="megaphone" size={36} color="white" />
                  <Text style={styles.headTxt}>แจ้งเรื่อง</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          </View>
        </View>
        <FlatList
          data={news}
          renderItem={renderGridItem}
          numColumns={1}
          // keyExtractor={(item) => item.id}
          navigation={navigation}
        />
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
    alignItems: "center",
    flex: 1,
  },
  circle: {
    backgroundColor: "rgba(242, 247, 247, 0.5)",
    borderColor: "white",
    borderWidth: 0.3,
    width: 90,
    height: 80,
    borderRadius: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  viewCircle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  newsContent: {
    width: "100%",
    paddingBottom: 50,
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
    color: "white",
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
    height: "60%",
    width: "100%",
    borderRadius: "50px",
    position: "absolute",
    zIndex: -100,
    top: -150,
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
