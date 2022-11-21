import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card, Layout, Divider } from "@ui-kitten/components";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { INVOICE } from "../../dummy/INVOICE";
import TableInvoice from "../../component/invoice/tableInvoice";
import {baseUrl} from "@env"
import axios from 'axios';
import { useFocusEffect } from "@react-navigation/native";

function User({userObject, navigation, userInfo}) {
  //console.log(userObject.dorm_fee);
  return (
    <View style={styles.container1}>
      {userObject && userInfo && (
        <View style={styles.bg_money}>
          <Text
            style={{
              color: "#2D83FC",
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "32px",
            }}
          >
            ฿{userObject.total.toFixed(2)}
          </Text>
          <Text
            style={{
              color: "#777777",
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "12px",
              top: 6,
            }}
          >
            วันครบกำหนดชำระ 10 {userObject.month} {userObject.year}
          </Text>
        </View>
      )}

      {userObject && userInfo && (
      <View style={styles.container}>
        <Card style={[styles.cardContainer]} disabled={true}>
            <TableInvoice invoice={userObject} userInfo={userInfo} navigation={navigation}/>
        </Card>
      </View>
      )}
    </View>
  )
};

const InvioveDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const { categoryTitle, month, year } = route.params;
  const [data, setData] = useState();
  const [invoice, setInvoice] = useState(null);
  const [user, setUser] = useState(null);

  useFocusEffect(
    useCallback(() => {
    const url = `${baseUrl}/getInvoice/${categoryTitle}/${month}/${year}`;
    const urlUser = `${baseUrl}/getUserNum/${categoryTitle}`;

    console.log("test");
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url);
        const resUser = await axios.get(urlUser);
        if (response.status === 200 && resUser.status === 200) {
          setInvoice(response.data);
          setUser(resUser.data);
          //console.log(response.data);
          // console.log(resUser.data);
          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
          console.log('Data fetching cancelled');
      }
      
    };
    fetchUsers();
  
  }, [categoryTitle])
  );
  console.log(invoice);

  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_invoice.png")}
        style={styles.background}
      ></Image>
      <User userObject={invoice} userInfo={user} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    alignItems: "center",
    height: "100%",
  },
  background: {
    width: "100%",
    top: -90,
    zIndex: -100,
  },
  box: {
    top: -145,
    zIndex: 100,
  },

  bg_money: {
    zIndex: 100,
    top: -280,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 360,
    height: "10%",
    alignSelf: "center",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    zIndex: 100,
    width: "95%",
    height: "78%",
    position: "relative",
    padding: 10,
    display: "flex",
    borderRadius: 30,
  },
  text: {
    marginBottom: 20,
  },
  container1: {
  },
  container: {
    width: "95%",
    height: "100%",
    paddingVertical: 10,
    top: -283,
    zIndex: 100,
    alignItems: "center",
  },
  build: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    margin: 25,
    marginTop: 5,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#D2EDF9",
    shadowColor: "#C3C3C3",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },

  head: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    margin: 25,
    marginTop: 5,
    left: 80,
    width: "70%",
    height: 40,
    borderRadius: 30,
    backgroundColor: "#FFB085",
  },

  btnLoad: {
    top: "230%",
    left: "85%",
    width: 85,
    padding: 8,
    position: "absolute",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#FFB085",
  },
  txt: {
    fontSize: "11px",
    fontWeight: "bold",
  },
  txtHead: {
    fontSize: "11px",
    fontWeight: "bold",
  },
  status: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "55%",
    marginLeft: 15,
  },
  conStatus: {
    backgroundColor: "#EEEEEE",
    padding: 15,
    borderRadius: 15,
    alignSelf: "flex-end",
    flexDirection: "row",
    width: "100%",
    marginLeft: 10,
  },
  send: {
    width: "100%",
    marginLeft: 10,
    marginTop: 5,
    backgroundColor: "#EEEEEE",
    padding: 15,
    borderRadius: 15,
    alignSelf: "flex-end",
  },
  conSend: {
    backgroundColor: "#D9D9D9",
    padding: 2,
    borderRadius: 5,
    width: "100%",
    top: -9,
  },
});
export default InvioveDetail;
