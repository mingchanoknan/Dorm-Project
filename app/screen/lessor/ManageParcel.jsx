import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Divider, Layout, Modal } from "@ui-kitten/components";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { baseUrl } from "@env";
import axios from "axios";
import { NEWS } from "../../dummy/NEWS";
import { StackActions } from "@react-navigation/native";
import BoxParcel from "../../component/parcel/BoxParcel";
import { useFocusEffect } from "@react-navigation/native";

const ManageParcel = ({ route, navigation }) => {
  const [parcel, setParcel] = useState(null);
  const [showRecieved, setRecieved] = useState("not_received");

  const [countReceived, setCountReceived] = useState(0);
  const [countNotReceived, setCountNotReceived] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const received = "received";
      const not_received = "not_received";

      const url = `${baseUrl}/parcel`;
      const urlCountReceived = `${baseUrl}/countParcel/${received}`;
      const urlCountNotReceived = `${baseUrl}/countParcel/${not_received}`;
      const fetchUsers = async () => {
        try {
          const response = await axios.get(url);

          const countReceived = await axios.get(urlCountReceived);
          const countNotReceived = await axios.get(urlCountNotReceived);
          if (
            response.status === 200 &&
            countReceived.status === 200 &&
            countNotReceived.status === 200
          ) {
            console.log(response.data)
            setParcel(response.data);
            setCountReceived(countReceived.data);
            setCountNotReceived(countNotReceived.data);
            return;
          } else {
            throw new Error("Failed to fetch parcel");
          }
        } catch (error) {
          console.log("Data fetching cancelled parcel");
        }
      };
      fetchUsers();
    }, [parcel])
  );

  const renderGridItem = (itemData) => {
    // console.log(itemData);
    return (
      <BoxParcel
        item={itemData}
        width={"85%"}
        numberOfLines={1}
      />
    );
  };

  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_cancle.png")}
        style={styles.background}
      ></Image>

      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            top: 2,
          }}
        >
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={() => {
              navigation.navigate("AddParcel");
            }}
          >
            <Ionicons name="add-circle" size={18} color="black" />
            <Text
              style={{
                color: "black",
                fontSize: "13px",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              เพิ่มรายการพัสดุ
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              height: "55%",
              marginTop: 5,
              top: "3%",
            }}
          >
            <View style={[styles.btnShow]}>
              <View
                style={[{ flexDirection: "row", justifyContent: "flex-start" }]}
              >
                <Image
                  source={require("../../assets/parcelRecieve.png")}
                  style={{ width: 42, height: 42, left: -15 }}
                ></Image>
                <Text
                  style={{
                    color: "#2C76B2",
                    fontSize: "23px",
                    fontWeight: "bold",
                    top: 10,
                  }}
                >
                  {countReceived}
                </Text>
              </View>
              <Text
                style={{
                  color: "#3E8ED0",
                  fontSize: "11px",
                  fontWeight: "bold",
                  top: "10%",
                  textAlign: "center",
                }}
              >
                จำนวนพัสดุที่รับแล้ว
              </Text>
            </View>

            <View style={[styles.btnShow, { marginLeft: 10 }]}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../assets/parcelNot.png")}
                  style={{ width: 42, height: 42, left: -15 }}
                ></Image>
                <Text
                  style={{
                    color: "#2C76B2",
                    fontSize: "23px",
                    fontWeight: "bold",
                    top: 10,
                  }}
                >
                  {countNotReceived}
                </Text>
              </View>
              <Text
                style={{
                  color: "#3E8ED0",
                  fontSize: "11px",
                  fontWeight: "bold",
                  top: "10%",
                  textAlign: "center",
                }}
              >
                จำนวนพัสดุที่ยังไม่ได้รับ
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 3 }}>
          <FlatList
            data={parcel}
            renderItem={renderGridItem}
            numColumns={1}
            keyExtractor={(item) => item._id}
            navigation={navigation}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  text: {
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center",
  },
  background: {
    top: -100,
    width: "100%",
    height: "30%",
    borderRadius: "50%",
    position: "absolute",
  },
  btnAdd: {
    flexDirection: "row",
    backgroundColor: "#FFB085",
    width: "50%",
    padding: 10,
    justifyContent: "center",
    borderRadius: "50%",
    alignItems: "center",
  },
  btnShow: {
    backgroundColor: "white",
    width: "33%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#86becf",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ManageParcel;
