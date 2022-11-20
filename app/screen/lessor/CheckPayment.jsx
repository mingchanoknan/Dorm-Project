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
import { baseUrl } from "@env";
import axios from "axios";
import { NEWS } from "../../dummy/NEWS";
import { StackActions } from "@react-navigation/native";
import BoxPyment, {BoxPayment} from '../../component/payment/BoxPayment';
import { useFocusEffect } from "@react-navigation/native";


const CheckPayment = ({ route, navigation }) => {
    const [select, setSelect] = useState("waitingCheck");
    const [payment, setPayment] = useState(null);
    const [room_number, setRoom_number] = useState("");
    const [payment_status, setPayment_status] = useState("checking_payment");
    const [url, setUrl] = useState(`${baseUrl}/getPaymentStatus/${payment_status}`);
 
    console.log(select);
    useFocusEffect(
        useCallback(() => {
            if(select === "waitingCheck"){
              setPayment_status("checking_payment")
              setUrl(`${baseUrl}/getPaymentStatus/${payment_status}`)
                // console.log(select+"po")
              }else{
                
                setPayment_status("checked")
                setUrl(`${baseUrl}/getPaymentStatus/${payment_status}`)
                // console.log(select)
              }
              
         const url1 = `${baseUrl}/getPaymentStatus/${payment_status}`;
          
          const fetchUsers = async () => {
            try {
              const response = await axios.get(url);
              if (response.status === 200) {
                setPayment(response.data);
                return;
              } else {
                throw new Error("Failed to fetch checking");
              }
            } catch (error) {
              console.log("Data fetching cancelled checking");
            }
          };
          fetchUsers();
        }, [select])
      );

      const renderGridItem = (itemData) => {
        // console.log(itemData);
        return <BoxPyment item={itemData} width={"95%"} numberOfLines={1} navigation={navigation}/>;
      };

  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_checkPayment.png")}
        style={styles.background}
      ></Image>

      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            top: "-1%",
          }}
        >
        <View style={styles.segment}>
          <TouchableOpacity style={[styles.btnSelect, { marginRight:5}, select == 'waitingCheck' ? { backgroundColor: "#B1E5F3"} : ""]} onPress={() => setSelect("waitingCheck")}>
            <Text style={{fontSize: "12px", fontWeight: "bold",}}>รอการตรวจสอบ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btnSelect, { marginLeft:5}, select == 'checked' ? { backgroundColor: "#B1E5F3"} : ""]} onPress={() => setSelect("checked")}>
            <Text style={{fontSize: "12px", fontWeight: "bold"}}>ตรวจสอบแล้ว</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={{ flex: 5 }}>
        <FlatList
            data={payment}
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
    height: "25%",
    borderRadius: "55%",
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
  segment: {
    backgroundColor: 'white', 
    width: '70%',
    top: "8%",
    height: 50, 
    borderRadius: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnSelect: {
    width: "45%", 
    color: "white",
    borderRadius: "50%", 
    height: "80%", 
    justifyContent: "center", 
    alignItems: "center",

  }
});

export default CheckPayment;
