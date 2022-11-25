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
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [currentDay, setCurrentDay] = useState("")
  const [nextMonth, setNextMonth] = useState("");
  const [date, setDate] = useState(userObject.month);
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

  
  useEffect(() => {
    let temp = months.findIndex((item) => item === date)
    const dateCurrent = new Date().toISOString().slice(0, 10);
    const formatedDate = (yearAndMonth) => {
      let array = yearAndMonth.split("-");
      setNextMonth(months[temp + 1])

      setCurrentMonth(months[parseInt(array[1]) - 1]);
      setCurrentYear(array[0]);
      setCurrentDay(array[2]);
    };

    formatedDate(dateCurrent);

    const compare = async (event) => {
      let indexCurrent = new Date().getMonth();
      let indexInvoice = temp + 1;
      let fine = (indexCurrent - indexInvoice) * 50;
      let amount = userObject.amount + fine;
      let tax = amount * 0.07;
      
      if (indexCurrent > indexInvoice && userObject.status == "UNAPPROVED_BILL") {
        alert("เกินกำหนดชำระบิล คิดค่าปรับเดือนละ 1000 บาท");

        try {
          const response = await axios.put(`${baseUrl}/updateInvoice`, {
          _id: userObject._id,
          month : userObject.month,
          year : userObject.year,
          room_number : userObject.room_number,
          common_fee : userObject.common_fee,
          dorm_fee : userObject.dorm_fee,
          electricity_fee : userObject.electricity_fee,
          water_fee : userObject.water_fee,
          expenses : userObject.expenses,
          fine : fine,
          amount : amount,
          tax : tax,
          total : amount+tax,
          note : userObject.note,
          status : userObject.status
          });
    
          if (response.status === 200) {
            console.log("bill add fine")
          } else {
            throw new Error("An error ");
          }
        } catch (error) {
          alert(error);
        }

      }
    }

    compare();
  }, [])

  console.log(nextMonth);
  console.log(currentMonth + " " + currentYear)

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
            วันครบกำหนดชำระ 10 {nextMonth} {userObject.year}
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
      {invoice && user && (
        <User userObject={invoice} userInfo={user} navigation={navigation} />
      )}
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
