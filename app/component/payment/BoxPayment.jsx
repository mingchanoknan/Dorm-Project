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
import { AntDesign } from '@expo/vector-icons';

const BoxPyment = ({ item, width, navigation }) => {
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [id, setId] = useState(item.item._id);
  const [amount, setAmount] = useState(item.item.amount);
  const [room_number, setRoom_number] = useState(item.item.room_number);
  const [payment_date, setPayment_date] = useState(item.item.payment_date);
  const [payment_time, setPayment_time] = useState(item.item.payment_time);
  const [payment_note, setPayment_note] = useState(item.item.payment_note);
  const [idInvoice, setIdInvoice] = useState(item.item.idInvoice);
  const [url, setUrl] = useState(item.item.url);
  

  const Edited = async (event) => {

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
   
  };

  return (
    <View style={[styles.shadow]}>
      <Card style={[styles.card, { width}, item.item.payment_status == 'checking_payment' ? {backgroundColor: "rgba(181, 236, 229, 0.5)"} : {    borderColor: "#abc7cf", borderWidth: 2}]}
      onPress={() => {
        navigation.navigate("PaymentDetail", {
          id : id,
          amount: amount,
          uri: url,
          payment_date: payment_date,
          payment_time : payment_time,
          idInvoice : idInvoice,
          room_number: room_number,
          payment_note : payment_note,
        })

      }}
      >
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            alignSelf: "flex-end",
            paddingRight: 20,
            paddingTop: 10
          }}
        >
           <View style={{flexDirection: "row" }}>
            <Text style={[styles.txt, {fontSize: "10px"}]}>วันเวเลาที่โอน: </Text>
            <Text style={[styles.txt, {color: 'black', fontSize: "10px"}]}> {payment_date} {payment_time}</Text>
            </View>
          
        </View>

        <View
          style={{
            flexDirection: "row",
            height: "100%",
            alignItems: "flex-start"
          }}
        >
          <View style={{ width: "50%", height: "100%",  alignItems: "flex-start"}}>
           <View style={{width:110, height: 85, top: -5, backgroundColor: "rgba(130, 219, 208, 0.8)", borderRadius: 20, justifyContent: "center" }}>
                <Text style={{ marginLeft: 10, fontSize: "15px", fontWeight: "bold", color: "white"}}>ห้อง</Text>
                <Text style={{ fontSize: "23px", fontWeight: "bold", color: "white", textAlign: "center"}}>{room_number}</Text>
           </View>
          </View>

          <View style={{ width: "50%", height: "100%", flexDirection: 'column', justifyContent: "flex-end", alignItems: "flex-end" }}>
           <View style={{ flexDirection: "row", justifyContent: "center", }}>
            <Text style={[styles.txt, {top: 5 }]}>ยอดโอน</Text>
            <Text style={{ marginLeft: 10, fontSize: "23px", fontWeight: "bold", color: '#093879'}}>฿ {amount}</Text>
            <AntDesign style={{top: 5}} name="caretright" size={18} color="black" />
            </View>
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
    borderRadius: "20%",
    borderWidth: 0,
    alignSelf: "center",
    height: 110,
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

export default BoxPyment;
