import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Card, Layout, Divider } from "@ui-kitten/components";
import { baseUrl } from "@env";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const MainLessor = ({ route, navigation }) => {
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [monthandyear, setMonthandyear] = useState("");

  useEffect(() => {
    const dateCurrent = new Date().toISOString().slice(0, 10);
    const formatedDate = (yearAndMonth) => {
      let array = yearAndMonth.split("-");
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      setCurrentMonth(months[parseInt(array[1]) - 1]);
      setCurrentYear(array[0]);
      setCurrentDay(array[2]);
      setMonthandyear(currentMonth + " " + currentYear);
    };
    formatedDate(dateCurrent);
  });
 
  const [countUser, setCountUser] = useState(0);
  const [countRoom, setCountRoom] = useState(0);
  const [countPayInvoice, setCountPayInvoice] = useState(0.0);
  const [countUsewater, setCountUseWater] = useState(0.0);
  const [countUseElec, setCountUseElec] = useState(0.0);

  const [room_status, setRoom_status] = useState("available");
  const [status, setStatus] = useState("APPROVED_BILL");
  const [typeWater, setTypeWater] = useState("water");
  const [typeElec, setTypeElec] = useState("electricity");

  const dateCurrent = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    axios
      .get(`${baseUrl}/countUser`)
      .then((response) => {
        setCountUser(response.data);
      })
      .catch((error) => console.log("error countUser"));
  });

  useEffect(() => {
    axios

      .get(`${baseUrl}/countRoom/${room_status}`)
      .then((response) => {
        setCountRoom(response.data);
      })
      .catch((error) => console.log("error countRoom"));
  });

  console.log(status);
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/countPayInvoice/${currentMonth}/${currentYear}/${status}`
      )
      .then((response) => {
        setCountPayInvoice(response.data.toFixed(2));
      })
      .catch((error) => console.log("error countPayInvoice"));
  });

  useEffect(() => {
    axios
      .get(`${baseUrl}/meter/countPayMeter/${monthandyear}/${typeWater}`)
      .then((response) => {
        setCountUseWater(response.data.toFixed(2));
      })
      .catch((error) => console.log("error countUseWater"));
  });

  useEffect(() => {
    axios
      .get(`${baseUrl}/meter/countPayMeter/${monthandyear}/${typeElec}`)
      .then((response) => {
        setCountUseElec(response.data.toFixed(2));
      })
      .catch((error) => console.log("error countUseElec"));
  });

  return (
    <View style={styles.view}>
      {/* <View style={styles.header2}>
      </View> */}
      <View style={[styles.container]}>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              // backgroundColor: 'red',
              width: "100%",
              height: "20%",
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
                  onPress={() => navigation.navigate("ManageInvoices")}
                >
                  <Ionicons name="document-text" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headTxt}>บิลค่าเช่า</Text>
              </View>

              <View style={styles.viewCircle}>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => navigation.navigate("ManageParcels")}
                >
                  <Feather name="box" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headTxt}>พัสดุ</Text>
              </View>

              <View style={styles.viewCircle}>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => navigation.navigate("Response")}
                >
                  <AntDesign name="notification" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headTxt}>รับเรื่อง</Text>
              </View>

              <View style={styles.viewCircle}>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => navigation.navigate("News")}
                >
                  <Ionicons name="newspaper-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headTxt}>ข่าวสาร</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingLeft: 10,
              paddingRight: 10,
              // backgroundColor:'pink',
              height: "20%",
            }}
          >
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("Room")}
            >
              <Image
                source={require("../../assets/home2.png")}
                style={{ width: "30%", height: "40%" }}
              ></Image>
              <Text style={{ fontWeight: "bold", top: 5, fontSize: "12px" }}>
                ประเภทห้อง
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("CheckPayment")}
            >
              <Image
                source={require("../../assets/contract2.png")}
                style={{ width: "30%", height: "40%" }}
              ></Image>
              <Text style={{ fontWeight: "bold", top: 5, fontSize: "12px" }}>
                ตรวจสอบ
              </Text>
              <Text style={{ fontWeight: "bold", top: 5, fontSize: "12px" }}>
                การชำระเงิน
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("Room Status")}
            >
              <Image
                source={require("../../assets/room2.png")}
                style={{ width: "30%", height: "40%" }}
              />
              <Text style={{ fontWeight: "bold", top: 5, fontSize: "12px" }}>
                สถานะห้องพัก
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingLeft: 10,
              paddingRight: 10,
              // backgroundColor:'green',
              height: "20%",
            }}
          >
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("RecordMeter")}
            >
              <Image
                source={require("../../assets/faucet2.png")}
                style={{ width: "30%", height: "40%" }}
              ></Image>
              <Text style={{ fontWeight: "bold", top: 5, fontSize: "12px" }}>
                มิเตอร์ค่าน้ำ/ค่าไฟ
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("ManageInvoices")}
            >
              <Image
                source={require("../../assets/bill4.png")}
                style={{ width: "30%", height: "40%" }}
              ></Image>
              <Text style={{ fontWeight: "bold", top: 5, fontSize: "12px" }}>
                ใบแจ้งหนี้
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("ManageParcels")}
            >
              <Image
                source={require("../../assets/box2.png")}
                style={{ width: "30%", height: "40%" }}
              ></Image>
              <Text style={{ fontWeight: "bold", top: 5, fontSize: "12px" }}>
                พัสดุ
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              //backgroundColor:'red',
              top: "4%",
              flexDirection: "row",
              padding: 10,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#c7eff0",
                width: "40%",
                height: 140,
                borderRadius: "20%",
                marginRight: 10,
                justifyContent: "flex-end",
                padding: 10,
              }}
            >
              <Image
                source={require("../../assets/users.png")}
                style={{ width: 70, height: 70, top: "15%" }}
              ></Image>
              <Text
                style={{
                  color: "#2C76B2",
                  fontSize: "30px",
                  fontWeight: "bold",
                  textAlign: "right",
                  marginRight: 40,
                  bottom: 30,
                }}
              >
                {countUser}
              </Text>
              <Text
                style={{
                  color: "#2C76B2",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                จำนวนผู้เช่า
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#c7eff0",
                width: "40%",
                height: 140,
                borderRadius: "20%",
                marginRight: 10,
                justifyContent: "flex-end",
                padding: 10,
              }}
            >
              <Image
                source={require("../../assets/bedroom.png")}
                style={{ width: 70, height: 70, top: "15%" }}
              ></Image>
              <Text
                style={{
                  color: "#2C76B2",
                  fontSize: "30px",
                  fontWeight: "bold",
                  textAlign: "right",
                  left: 15,
                  marginRight: 40,
                  bottom: 30,
                }}
              >
                {countRoom}
              </Text>
              <Text
                style={{
                  color: "#2C76B2",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                จำนวนห้องว่าง
              </Text>
            </View>
          </View>
          {/* <Divider style={{zIndex: 100, width: "100%", backgroundColor: '#d9d9d9', top: "5%"}} /> */}
          <View></View>
          <View
            style={{
              backgroundColor: "white",
              padding: 12,
              top: "5%",
              shadowColor: "gray",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            }}
          >
            <Text style={{ fontSize: "15px", fontWeight: "bold" }}>
              รายรับ-รายจ่าย {currentMonth} {currentYear}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              top: "8%",
            }}
          >
            <View style={{ width: "50%" }}>
              <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                ผู้เช่าชำระใบแจ้งหนี้
              </Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "right",
                  color: "#ffc014",
                }}
              >
                ฿ {countPayInvoice}
              </Text>
            </View>
          </View>
          <Divider
            style={{
              zIndex: 100,
              width: "100%",
              backgroundColor: "#d9d9d9",
              top: "7%",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              top: "10%",
            }}
          >
            <View style={{ width: "50%" }}>
              <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                ค่าน้ำที่ใช้ในเดือนนี้
              </Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "right",
                  color: "#ffc014",
                }}
              >
                ฿ {countUsewater}
              </Text>
            </View>
          </View>
          <Divider
            style={{
              zIndex: 100,
              width: "100%",
              backgroundColor: "#d9d9d9",
              top: "9%",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              top: "13%",
            }}
          >
            <View style={{ width: "50%" }}>
              <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                ค่าไฟที่ใช้ในเดือนนี้
              </Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "right",
                  color: "#ffc014",
                }}
              >
                ฿ {countUseElec}
              </Text>
            </View>
          </View>
          <Divider
            style={{
              zIndex: 100,
              width: "100%",
              backgroundColor: "#d9d9d9",
              top: "11%",
            }}
          />
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
    //backgroundColor: "#F4ECEC",
    shadowColor: "#D9D9D9",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    flex: 1,
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
});
export default MainLessor;
