import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Card, Layout, Divider } from "@ui-kitten/components";
import DatePicker from "../../component/contract/DatePicker";
import { baseUrl } from "@env";
import axios from "axios";
import { StackActions } from "@react-navigation/native";

const AddParcel = ({ route, navigation }) => {
  // const { categoryTitle, prev5 } = route.params;
  const [name, setName] = useState("");
  const [room_number, setRoom_number] = useState("");
  const [sent_date, setSent_date] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [receive_date, setReceive_date] = useState("");
  const [transport_name, setTransport_name] = useState("");
  const [status, setStatus] = useState("not_received");

  const [warning, setWarning] = useState(false);

  const onChangeNameHandler = (name) => {
    setName(name);
    console.log(name);
  };

  const onChangeRoomHandler = (room_number) => {
    setRoom_number(room_number.toUpperCase());
  };

  const onChangeTransHandler = (transport_name) => {
    setTransport_name(transport_name);
  };

  const onChangeSentHandler = (date) => {
    setSent_date(date);
  };

  const onAddParcelFormHandler = () => {
    if (name != "" && room_number != "" && transport_name != "") {
      try {
        Alert.alert(
          "ยืนยันที่จะบันทึก",
          "",
          [
            {
              text: "OK",
              onPress: async (event) => {
                const response = await axios.post(`${baseUrl}/addParcel`, {
                  name,
                  room_number,
                  sent_date,
                  receive_date,
                  transport_name,
                  status,
                });

                if (response.status === 200) {
                  alert("เพิ่มรายการพัสดุสำเร็จ");
                  setName("");
                  setRoom_number("");
                  setTransport_name("");
                  setSent_date(new Date().toISOString().slice(0, 10));
                } else {
                  throw new Error("An error addParcel ");
                }
              },
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      } catch (error) {
        alert(error);
      }
    } else {
      setWarning(true);
    }
  };

  //   useEffect(() => {
  //     if (name != "" || room_number != "" || transport_name != "") {
  //       setWarning(false);
  //     } else {
  //       setWarning(true);
  //     }
  //   }, [name, room_number, transport_name]);

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
          เพิ่มรายการพัสดุ{" "}
        </Text>
      </View>

      <Card style={styles.card}>
        {warning && (
          <Text
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "red",
              textAlign: "center",
              top: "33%",
            }}
          >
            *กรุณากรอกข้อมูลให้ครบถ้วน
          </Text>
        )}
        <View style={{ display: "flex", flexDirection: "row", top: "15%" }}>
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}
          >
            ชื่อผู้รับ :
          </Text>
          <TextInput
            onChangeText={onChangeNameHandler}
            style={{
              backgroundColor: "#F5F7F8",
              width: "78%",
              padding: 5,
              borderRadius: 50,
              paddingLeft: 20,
              marginRight: 10,
              fontSize: "12px", fontWeight: "bold",
            }}
          >
            {name}
          </TextInput>
        </View>
        <View style={{ flexDirection: "row", top: "20%" }}>
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7,fontSize: "12px", fontWeight: "bold", }}
          >
            เลขห้อง :
          </Text>
          <TextInput
            onChangeText={onChangeRoomHandler}
            style={{
              backgroundColor: "#F5F7F8",
              width: "20%",
              padding: 5,
              borderRadius: 50,
              paddingLeft: 20,
              marginRight: 10,
              fontSize: "12px", fontWeight: "bold",
            }}
          >
            {room_number}
          </TextInput>
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}
          >
            บริษัทขนส่ง
          </Text>
          <TextInput
            onChangeText={onChangeTransHandler}
            style={{
              backgroundColor: "#F5F7F8",
              width: "35%",
              padding: 5,
              borderRadius: 50,
              paddingLeft: 20,
              fontSize: "12px", fontWeight: "bold",
            }}
          >
            {transport_name}
          </TextInput>
        </View>

        <View style={{ display: "flex", flexDirection: "row", top: "25%" }}>
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}
          >
            วันที่พัสดุมาถึง :
          </Text>

          <View
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              top: -5,
              width: 105,
            }}
          >
            <DatePicker onReserve={onChangeSentHandler} />
          </View>
        </View>

        <View style={{ flexDirection: "row", alignSelf: "center", top: "40%" }}>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginRight: 10,
            }}
          >
            <TouchableOpacity
              style={styles.btnAdd}
              onPress={onAddParcelFormHandler}
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
                ยืนยัน{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={[
                styles.btnAdd,
                {
                  backgroundColor: "white",
                  borderColor: "#F26565",
                  borderWidth: 1,
                  width: 70
                },
              ]}
              onPress={() => {
                setName("");
                setRoom_number("");
                setTransport_name("");
                setSent_date("");
                setWarning(false);
              }}
            >
              <Text
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#F26565",
                  textAlign: "center",
                }}
              >
                {" "}
                Clear{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    top: -100,
  },
  card: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    borderRadius: "50%",
    top: "30%",
  },
  header: {
    position: "absolute",
    backgroundColor: "#FFB085",
    padding: 10,
    borderRadius: 50,
    width: "50%",
    textAlign: "center",
    top: "28%",
    zIndex: 100,
    alignSelf: "center",
  },
  btnAdd: {
    backgroundColor: "#47C5FC",
    padding: 10,
    width: 120,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
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
export default AddParcel;
