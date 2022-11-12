import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import BillGridTile from "../../component/invoice/BillGridTile";
import { RENT } from "../../dummy/RENT";
import Search from "../../component/contract/searchBar";
import Time from "../../component/invoice/time";
import Modal from "react-native-modal";
import RESERVE from "../../dummy/RESERVE";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const baseUrl ='http://192.168.1.117:8080';
const ManageInvoice = ({ route, navigation }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    
      axios.get(`${baseUrl}/rent`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(
        (error) => console.log('error')
      )
  }, []);

  const renderGridItem = (itemData) => {
    return (
      <BillGridTile
        title={itemData.item.room_number}
        color={itemData.item.room_status === "unavailable" ? '#48c78e' : '#c0b7c7'}
        onSelect={() => {
          if (itemData.item.room_status === "unavailable") {
            navigation.navigate("BillInvoice", {
              id: itemData.item.id,
              categoryTitle: itemData.item.room_number,
            });
          } else {
            Alert.alert("ยังไม่มีผู้เช่า", "ในห้องนี้", [
              // {
              //   text: "Cancel",
              //   onPress: () => console.log("Cancel Pressed"),
              //   style: "cancel",
              // },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
          }
        }}
      />
    );
  };
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.build, { alignSelf: "center" }]}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "13px",
              marginRight: 12,
            }}
          >
            ตึก E
          </Text>
          <AntDesign name="down" size={13} color="white" />
        </TouchableOpacity>
       
      </View>
      <View style={styles.header2}>
        <TouchableOpacity style={[styles.bill, { position: "absolute" }]}>
          <Text
            style={{
              color: "#5099FF",
              fontWeight: "bold",
              fontSize: "11px",
              marginRight: 12,
            }}
          >
            ชั้น
          </Text>
          <AntDesign name="down" size={13} color="#2D83FC" />
        </TouchableOpacity>

      </View>
      <View style={styles.container}>
        <FlatList data={user} renderItem={renderGridItem} numColumns={3} />
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
    height: "70%",
    backgroundColor: "#F4ECEC",
    shadowColor: "#D9D9D9",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bill: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "white",
    top: "15%",
    left: "3%",
    width: 90,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#F3FDFF",
  },
  build: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    top: "5%",
    width: 90,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#FFB085",
  },
});
export default ManageInvoice;
