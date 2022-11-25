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
import { TouchableOpacity, StyleSheet, View, Alert} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { baseUrl } from "@env";
import axios from "axios";

const BoxParcel = ({ item, width }) => {
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(item.item.name);
  const [room_number, setRoom_number] = useState(item.item.room_number);
  const [sent_date, setSent_date] = useState(item.item.sent_date);
  const [receive_date, setReceive_date] = useState(item.item.receive_date);
  const [transport_name, setTransport_name] = useState(item.item.transport_name);
  const [status, setStatus] = useState(item.item.status);

  const Edited = async (event) => {
    try {
      const response = await axios.post(`${baseUrl}/updateParcel`, {
        _id : item.item._id,
        name: name,
        room_number: room_number.toUpperCase(),
        sent_date : sent_date,
        receive_date : receive_date,
        transport_name : transport_name,
        status : status
      });

      if (response.status === 200) {
        alert("แก้ไขรายการพัสดุสำเร็จ");
      } else {
        throw new Error("An error updateParcel");
      }
    } catch (error) {
      alert(error);
    }
  };

  const renderToggleButton = () => (
    <Icon
      fill="black"
      style={{ width: 20, height: 20, alignSelf: "flex-end" }}
      name="more-horizontal-outline"
      onPress={() => {
        setVisible(true);
      }}
    ></Icon>
  );

  const  deleteHandler = async (event) => {
    try {
      Alert.alert(
        "ยืนยันที่จะลบรายการพัสดุ",
        "",
        [
          {
            text: "OK",
            onPress: async (event) => {
              const response = await axios.post(`${baseUrl}/deleteParcel`, {
                _id : item.item._id,
                name: name,
                room_number: room_number.toUpperCase(),
                sent_date : sent_date,
                receive_date : receive_date,
                transport_name : transport_name,
                status : status
              });

              if (response.status === 200) {
                alert("ลบรายการพัสดุสำเร็จ");
              } else {
                throw new Error("An error deleteParcel");
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
  };

  return (
    <View style={[styles.shadow]}>
      <Card style={[styles.card, { width }, item.item.status == 'not_received' ? {backgroundColor: "rgba(195, 220, 227, 0.4)"} : {    borderColor: "#abc7cf", borderWidth: 2}]}>
        <View
          style={{
            top: -5,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <OverflowMenu
            visible={visible}
            anchor={renderToggleButton}
            onBackdropPress={() => setVisible(false)}
          >
            <MenuItem
              title="Edit"
              onPress={() => {
                setIsEditing(true);
                setVisible(false);
              }}
            />
            <MenuItem title="Delete" onPress={deleteHandler} />
          </OverflowMenu>
        </View>

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
          </View>
        </View>
      </Card>

      <Modal
        visible={isEditing}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={{ width: 350, borderRadius: "50%", padding: 20}}>
          <Text style={styles.textLabel}>ชื่อผู้รับ </Text>
          <Input
            style={{ marginBottom: 10, borderRadius: "50%"}}
            textStyle={{ fontSize: 12, fontWeight: "bold"}}
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.textLabel}>เลขห้อง </Text>
          <Input
            style={{borderRadius: "50%", marginBottom: 10,}}
            textStyle={{ fontSize: 12, fontWeight: "bold" }}
            value={room_number}
            onChangeText={setRoom_number}
          />
          <Text style={styles.textLabel}>บริษัขนส่ง </Text>
          <Input
            style={{borderRadius: "50%", marginBottom: 10,}}
            textStyle={{ fontSize: 12, fontWeight: "bold" }}
            value={transport_name}
            onChangeText={setTransport_name}
          />
          <View style={[styles.footerContainer]}>
            <Button
              style={[{ alignSelf: "center", borderWidth:0, marginTop: 20, marginRight: 5, borderRadius: "50%", backgroundColor: "#a7dbd6" }]}
              size="small"
              onPress={() => {
                setIsEditing(false);
                Edited();
              }}
            >
              EDIT
            </Button>
            <Button
              style={[{ alignSelf: "center", marginTop: 20, borderRadius: "50%", borderWidth: 0, backgroundColor: "#c8cfcf" }]}
              size="small"
              onPress={() => {
                setIsEditing(false);
              }}
            >
              CANCEL
            </Button>
          </View>
        </Card>
      </Modal>
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

export default BoxParcel;
