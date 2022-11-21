import React, { useState } from "react";
import {
  Button,
  Card,
  Modal,
  MenuItem,
  OverflowMenu,
  Text,
  Input,
  Icon, TextInput
} from "@ui-kitten/components";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { baseUrl } from "@env";
import axios from "axios";

const BoxParcelTenant = ({ item, width, user }) => {
  const [name, setName] = useState(item.item.name);
  const [room_number, setRoom_number] = useState(item.item.room_number);
  const [sent_date, setSent_date] = useState(item.item.sent_date);
  const [receive_date, setReceive_date] = useState(item.item.receive_date);
  const [transport_name, setTransport_name] = useState(item.item.transport_name);
  const [status, setStatus] = useState(item.item.status);


  const onConfirmParcel = () => {
    axios
    .post(`${baseUrl}/updateParcel`, {
        _id: item.item._id,
        name: name,
        room_number : room_number,
        sent_date : sent_date,
        receive_date : new Date().toISOString().slice(0,10),
        transport_name : transport_name,
        status : 'received'
    } )
    .then((response) => {
      setReceive_date(new Date().toISOString().slice(0,10))
      setStatus("received")
      console.log("update status success");
    })
    .catch((error) => console.log("error updateStatus"));
  }

  return (
    <View style={[styles.shadow]}>
      <Card disabled={true} style={[styles.card, { width }, item.item.status == 'not_received' ? {backgroundColor: "rgba(195, 220, 227, 0.4)"} : { borderColor: "#abc7cf", borderWidth: 2}]}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%", height: "100%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.txt}>ผู้รับ : </Text>
              <Text style={[styles.txt, { color: "black" }]}> {name}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.txt}>บริษัขนส่ง : </Text>
              <Text style={[styles.txt, { color: "black" }]}> {transport_name} </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.txt}>สถานะ : </Text>
              <Text style={[styles.txt, { color: "black" }]}>
                {" "}
                {status}
              </Text>
            </View>
          </View>

          <View style={{ width: "50%", height: "100%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.txt}>เลขห้อง : </Text>
              <Text style={[styles.txt, { color: "black" }]}> {room_number} </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.txt}>วันที่มาถึง : </Text>
              <Text style={[styles.txt, { color: "black" }]}> {sent_date} </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.txt}>วันที่มารับ : </Text>
              <Text style={[styles.txt, { color: "black" }]}> {receive_date} </Text>
            </View>

          {  item.item.status === 'not_received' && item.item.room_number === user && (
            <TouchableOpacity style={{backgroundColor: "#e8799c", padding: 5, width: 90, alignItems: "center", borderRadius: "50%", alignSelf: "flex-end" }} onPress={onConfirmParcel}>
                <Text style={{ fontSize: "10px", fontWeight: "bold", color: "white"}}>ยืนยันรับพัสดุ</Text>
            </TouchableOpacity>
          )}
          {   item.item.status === 'received' && item.item.room_number === user && (
            <TouchableOpacity disabled={true} style={{borderColor: "#9E9E9E", borderWidth: 2, padding: 3, width: 90, alignItems: "center", borderRadius: "50%", alignSelf: "flex-end" }}>
                <Text style={{ fontSize: "10px", fontWeight: "bold", color: "#9E9E9E"}}>รับพัสดุแล้ว</Text>
            </TouchableOpacity>
            )}
          </View>
          
        </View>
      </Card>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginTop: 10,
    borderRadius: "40%",
    borderWidth: 0,
    alignSelf: "center",
    height: 130,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  shadow: {
    flex: 1,
    
  },
  txt: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#777777",
    marginBottom: 10,
  },
  textLabel: {
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: 10,
  }
});

export default BoxParcelTenant;
