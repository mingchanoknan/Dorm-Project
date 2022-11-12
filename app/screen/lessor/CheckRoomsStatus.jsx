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
import RoomGridTile from "../../component/contract/RoomGridTile";
import { RENT } from "../../dummy/RENT";
import Search from "../../component/contract/searchBar";
import Time from "../../component/invoice/time";
import Modal from "react-native-modal";
import RESERVE from "../../dummy/RESERVE";
import axios from 'axios';

const baseUrl ='http://192.168.1.117:8080';
const CheckRoomsStatus = ({ route, navigation }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    
      axios.get(`${baseUrl}/rent`)
      .then((response) => {
        setUser(response.data);
        setStatus(response.data.status);
        //console.log(status);
      })
      .catch(
        (error) => console.log('error')
      )
  }, [status]);

  const renderGridItem = (itemData) => {
    return (
      <RoomGridTile
        title={itemData.item.room_number}
        color={itemData.item.room_status == 'unavailable' ? '#F14668' : itemData.item.room_status === 'available' ? '#48C78E' : '#3E8ED0'}
        data={itemData.item.room_status}
        onSelect={() => {
          if (itemData.item.room_status === "available") {
            Alert.alert("ยังไม่มีผู้เช่า", "ทำการจองห้องพัก", [
              // {
              //   text: "Cancel",
              //   onPress: () => console.log("Cancel Pressed"),
              //   style: "cancel",
              // },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
            navigation.navigate("ReserveRoom", {
              categoryId: itemData.item.id,
              categoryTitle: itemData.item.room_number,
            });
          } else if (itemData.item.room_status === "reserve") {
            navigation.navigate("DetailReserve", {
              categoryId: itemData.item.id,
              categoryTitle: itemData.item.room_number,
            });
          } else {
            navigation.navigate("UserProfile", {
              categoryId: itemData.item.id,
              categoryTitle: itemData.item.room_number,
            });
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

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            marginTop: 45,
            marginRight: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: "11px", top: 5 }}>
            สถานะ{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              marginLeft: 5,
              width: "50%",
              height: 30,
              borderWidth: 1,
              borderColor: "#938B8B",
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "row", top: 3 }}>
              <View
                style={{
                  backgroundColor: "#48C78E",
                  marginLeft: 5,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                }}
              />
              <Text
                style={{ marginLeft: 5, fontSize: "12px", fontWeight: "bold" }}
              >
                ว่าง
              </Text>
            </View>

            <View style={{ flexDirection: "row", top: 3 }}>
              <View
                style={{
                  backgroundColor: "#F14668",
                  marginLeft: 5,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                }}
              />
              <Text
                style={{ marginLeft: 5, fontSize: "12px", fontWeight: "bold" }}
              >
                ไม่ว่าง
              </Text>
            </View>

            <View style={{ flexDirection: "row", top: 3 }}>
              <View
                style={{
                  backgroundColor: "#3E8ED0",
                  marginLeft: 5,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                }}
              />
              <Text
                style={{ marginLeft: 5, fontSize: "12px", fontWeight: "bold" }}
              >
                จอง
              </Text>
            </View>
          </View>
        </View>
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

        <Search />
      </View>
      <View style={styles.container}>
        <FlatList data={user}  renderItem={renderGridItem} numColumns={3} />
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
export default CheckRoomsStatus;
