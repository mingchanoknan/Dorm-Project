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
import { baseUrl } from "@env";
import axios from "axios";
import { StackActions } from "@react-navigation/native";

const ReserveRoom = ({ route, navigation }) => {
  const { categoryTitle, prev5 } = route.params;
  const [room_number, setRoom_number] = useState(categoryTitle);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [mobile, setMobile] = useState("");
  const [reserve_date, setReserve_date] = useState(new Date().toISOString().slice(0, 10));
  const [lease_date, setLease_date] = useState("");
  const [status, setStatus] = useState("reserve");

  const onChangeNameHandler = (first_name) => {
    setFirst_name(first_name);
  };
  const onChangeLastHandler = (last_name) => {
    setLast_name(last_name);
  };
  const onChangeMobileHandler = (mobile) => {
    setMobile(mobile);
  };
  const onChangeLeaseHandler = (date) => {
    setLease_date(date);
    // console.log(reserve_date.toISOString());
  };

  const onReserveFormHandler = async (event) => {
    try {
      const response = await axios.post(`${baseUrl}/addReserve`, {
        room_number,
        first_name,
        last_name,
        mobile,
        reserve_date,
        lease_date,
        status,
      });

      const update = await axios.put(
        `${baseUrl}/updateStatus/${room_number}/${status}`
      );

      
      if (update.status === 200 && response.status === 200) {
        alert("ทำการจองสำเร็จ");
        navigation.dispatch(
          StackActions.replace("DetailReserve", { categoryTitle: room_number })
        );
      } else {
        throw new Error("An error ");
      }
    } catch (error) {
      alert(error);
    }
  };

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
        <View style={{ flexDirection: "row", top: "15%" }}>
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}
          >
            ชื่อผู้จอง :
          </Text>
          <TextInput
            onChangeText={onChangeNameHandler}
            style={{
              backgroundColor: "#F5F7F8",
              width: "35%",
              padding: 5,
              borderRadius: 50,
              paddingLeft: 20,
              marginRight: 10,
            }}
          ></TextInput>
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}
          >
            นามสกุล
          </Text>
          <TextInput
            onChangeText={onChangeLastHandler}
            style={{
              backgroundColor: "#F5F7F8",
              width: "33%",
              padding: 5,
              borderRadius: 50,
              paddingLeft: 20,
            }}
          ></TextInput>
        </View>

        <View style={{ display: "flex", flexDirection: "row", top: "20%" }}>
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}
          >
            เบอร์โทร :
          </Text>
          <TextInput keyboardType="numeric"
            onChangeText={onChangeMobileHandler}
            style={{
              backgroundColor: "#F5F7F8",
              width: "33%",
              padding: 5,
              borderRadius: 50,
              paddingLeft: 20,
              marginRight: 10,
            }}
          ></TextInput>
        </View>

        <View style={{ display: "flex", flexDirection: "row", top: "25%" }}>
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}
          >
            วันเข้านัดทำสัญญา :
          </Text>

          <View
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              top: -5,
              width: 105,
            }}
          >
            <DatePicker onReserve={onChangeLeaseHandler} />
          </View>
        </View>

        <View style={{ flexDirection: "row", alignSelf: "center", top: "40%" }}>
          <TouchableOpacity
            style={styles.btnContract}
            onPress={onReserveFormHandler}
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
              จองห้องพัก{" "}
            </Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#47C5FC",
    padding: 5,
    width: 100,
    height: 30,
    borderRadius: 50,
  },
  btnCancle: {
    borderColor: "#F26565",
    borderWidth: 1,
    padding: 5,
    width: 100,
    height: 30,
    borderRadius: 50,
  },
});
export default ReserveRoom;
