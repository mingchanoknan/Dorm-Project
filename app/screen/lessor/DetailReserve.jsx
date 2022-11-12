import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Card, Layout, Divider } from "@ui-kitten/components";
import DatePicker from "../../component/contract/DatePicker";
import { RESERVE } from "../../dummy/RESERVE";
import axios from "axios";

const baseUrl = "http://192.168.1.117:8080";
function User({ userObject, navigation }) {
  //console.log(userObject.dorm_fee);
  return (
    <View>
    {userObject && (
      <View style={{ flexDirection: "row", top: "15%" }}>
        <Text style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}>
          ชื่อผู้จอง :
        </Text>
        <TextInput
          editable={false}
          style={{
            backgroundColor: "#F5F7F8",
            width: "35%",
            padding: 5,
            borderRadius: 50,
            paddingLeft: 20,
            marginRight: 10,
          }}
        >
          <Text style={{ fontSize: "12.5px" }}>{userObject.first_name}</Text>
        </TextInput>

        <Text style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}>
          นามสกุล
        </Text>
        <TextInput
          editable={false}
          style={{
            backgroundColor: "#F5F7F8",
            width: "33%",
            padding: 5,
            borderRadius: 50,
            paddingLeft: 20,
          }}
        >
          <Text style={{ fontSize: "12.5px" }}>{userObject.last_name}</Text>
        </TextInput>
      </View>
      )}

      {userObject && (
      <View style={{ display: "flex", flexDirection: "row", top: "20%" }}>
        <Text style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}>
          เบอร์โทร :
        </Text>
        <TextInput
          editable={false}
          style={{
            backgroundColor: "#F5F7F8",
            width: "33%",
            padding: 5,
            borderRadius: 50,
            paddingLeft: 20,
            marginRight: 10,
          }}
        >
          <Text style={{ fontSize: "12.5px" }}>{userObject.mobile}</Text>
        </TextInput>
      </View>
      )}

      {userObject && (
      <View style={{ display: "flex", flexDirection: "row", top: "25%" }}>
        <Text style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}>
          วันเข้านัดทำสัญญา :
        </Text>
        <TextInput editable={true}
          style={{
            backgroundColor: "#F5F7F8",
            width: "35%",
            padding: 5,
            borderRadius: 50,
            paddingLeft: 20,
            marginRight: 10,
          }}
        >
          <Text style={{ fontSize: "12.5px" }}>{userObject.lease_date}</Text>
        </TextInput>
        {/* <View
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              top: -5,
              width: 105,
            }}
          >
            <DatePicker data={detail[0].lease_date} />
          </View> */}
      </View>
      )}

      {userObject && (
      <View style={{ flexDirection: "row", alignSelf: "center", top: "40%" }}>
        <TouchableOpacity
          style={styles.btnContract}
          onPress={() => {
            navigation.navigate("LeaseContract", {
              // categoryId: itemData.item.id,
              // categoryTitle: itemData.item.room_number,
            });
          }}
        >
          <Text
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            {" "}
            ทำสัญญา{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnCancle, { marginLeft: 5 }]}>
          <Text
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#F26565",
              textAlign: "center",
            }}
          >
            {" "}
            ยกเลิกการจอง{" "}
          </Text>
        </TouchableOpacity>
      </View>
      )}
    </View>
  );
}
const DetailReserve = ({ route, navigation }) => {
  // const catId = route.params.categoryId
  // const detail = RESERVE.filter(
  //   (item) => item.room_id == route.params.categoryId
  // );
  // console.log(detail[0].first_name);
  // const displayedMeals = RESERVE.filter(
  //   (meal) => meal.room_id.indexOf(catId) >= 0
  // );
  const { id } = route.params;
  const { categoryTitle } = route.params;
  const [data, setData] = useState();
  const [invoice, setInvoice] = useState(null);
  useEffect(() => {
    // const response = axios.get(`${baseUrl}/invoices`);
    // setInvoice(response);
    // console.log(response);
    const url = `${baseUrl}/getReserveNum/${categoryTitle}`;
    console.log("test");
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setInvoice(response.data);
          console.log(response.data);
          // console.log("1"+categoryTitle);
          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.log("Data fetching cancelled");
      }
    };
    fetchUsers();
    // console.log(invoice);
    // let get = invoice.filter((item) => item.room_number == categoryTitle)[0];
    // setData(get);
    // console.log("2"+categoryTitle);
  }, [categoryTitle]);
  console.log(invoice);

  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          {" "}
          ข้อมูลการจอง{" "}
        </Text>
      </View>

      <Card style={styles.card}>
        <User userObject={invoice} navigation={navigation} />
      </Card>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    borderRadius: "50%",
    top: "20%",
  },
  header: {
    position: "absolute",
    backgroundColor: "#FFB085",
    padding: 10,
    borderRadius: 50,
    width: "50%",
    textAlign: "center",
    top: "18%",
    zIndex: 100,
    alignSelf: "center",
  },
  btnContract: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#47C5FC",
    padding: 5,
    width: 100,
    height: 35,
    borderRadius: 50,
  },
  btnCancle: {
    display: "flex",
    justifyContent: "center",
    borderColor: "#F26565",
    borderWidth: 1,
    padding: 5,
    width: 100,
    height: 35,
    borderRadius: 50,
  },
});
export default DetailReserve;
