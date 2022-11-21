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
  Alert,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { baseUrl } from "@env";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import Dialog from "react-native-dialog";
import DialogInput from "react-native-dialog-input";

const PaymentDatail = ({ route, navigation }) => {
  const {
    id,
    amount,
    uri,
    payment_date,
    payment_time,
    idInvoice,
    room_number,
    payment_note,
  } = route.params;
  const [select, setSelect] = useState("waitingCheck");
  const [payment, setPayment] = useState(null);
  const [roomNum, setRoomNum] = useState("");
  const [payment_status, setPayment_status] = useState("checking_payment");
  const [url, setUrl] = useState(
    `${baseUrl}/getPaymentStatus/${payment_status}`
  );
  const [invoice, setInvoice] = useState(null);
  const [statusApproved, setStatusApproved] = useState("APPROVED_BILL");
  const [statusCancle, setStatusCancle] = useState("WRONG_BILL");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");

  const [fix, setFix] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };

  useEffect(() => {
    const url = `${baseUrl}/getInvoiceById/${idInvoice}`;
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setInvoice(response.data);
          console.log(response.data);
          return;
        } else {
          throw new Error("Failed to fetch invoice pay");
        }
      } catch (error) {
        console.log("Data fetching cancelled invoice pay");
      }
    };
    fetchUsers();
  }, [invoice]);

  const updateAprroved = async (event) => {
    try {
      Alert.alert(
        "ตรวจสอบรายการชำระเงินถูกต้องเรียบร้อย",
        "",
        [
          {
            text: "OK",
            onPress: async (event) => {
              const response = await axios.put(
                `${baseUrl}/updateStatusInvoice/${idInvoice}/${statusApproved}`
              );

              const update = await axios.post(`${baseUrl}/updatePayment`, {
                _id: id,
                amount: amount,
                payment_date: payment_date,
                payment_time: payment_time,
                payment_note: payment_note,
                idInvoice: idInvoice,
                url: uri,
                room_number: room_number,
                payment_status: "checked",
              });

              if (update.status === 200 && response.status === 200) {
                alert("อัปเดตสถานะการจ่ายเงินแล้ว");
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

  const canclePayment = async (event) => {
    setVisible(true);
    console.log(visible);
  };

  const sendCancle = async (event) => {
    try {
      // const response = await axios.put(
      //   `${baseUrl}/updateStatusInvoice/${idInvoice}/${statusCancle}`
      // );
      const response = await axios.put(
        `${baseUrl}/updateInvoice`, {
        _id: invoice._id,
        month: invoice.month,
        year: invoice.year,
        room_number: invoice.room_number,
        common_fee: invoice.common_fee,
        dorm_fee: invoice.dorm_fee,
        electricity_fee: invoice.electricity_fee,
        water_fee: invoice.water_fee,
        expenses: invoice.expenses,
        fine: invoice.fine,
        amount: invoice.amount,
        tax: invoice.tax,
        total: invoice.total,
        note: invoice.note + " [ "+input+" ]",
        status: statusCancle
      }
      );

      const update = await axios.post(`${baseUrl}/updatePayment`, {
        _id: id,
        amount: amount,
        payment_date: payment_date,
        payment_time: payment_time,
        payment_note: payment_note + " [ " + input + " ]",
        idInvoice: idInvoice,
        url: uri,
        room_number: room_number,
        payment_status: "checked",
      });

      if (update.status === 200 && response.status === 200) {
        setVisible(false);
        setInput("");
        alert("ส่งแจ้งการชำระเงินไม่ถูกต้องไปยังผู้เช่าเรียบร้อย");
      } else {
        throw new Error("An error wrong bill");
      }
    } catch (error) {
      alert(error);
    }
  };

  const fixPayment = async (event) => {
    try {
      Alert.alert(
        "รายการชำระเงินนี้ถูกแก้ไขเรียบร้อย",
        "",
        [
          {
            text: "OK",
            onPress: async (event) => {
              const response = await axios.put(
                `${baseUrl}/updateStatusInvoice/${idInvoice}/${statusApproved}`
              );

              if (response.status === 200) {
                alert("ผู้เช่าชำระบิลเรียบร้อย");
              } else {
                throw new Error("An error fixPayment");
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
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_paymentDetail.png")}
        style={styles.background}
      ></Image>

      <View style={{ flex: 5, alignItems: "center", }}>
        <View
          style={{
            width: "90%",
            height: "100%",
            backgroundColor: "rgba(230, 244, 247, 0.7)",
            borderRadius: "50%",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text
            style={{ fontSize: "35px", fontWeight: "bold", color: "#1AA1A1" }}
          >
            ฿ {amount}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 45 }}>
            <Text
              style={{ fontSize: "11px", fontWeight: "bold", color: "black" }}
            >
              {" "}
              สลิปโอนเงิน :{" "}
            </Text>
                        <Image
                        source={{ width: 240, height: 240,  uri: uri }}
                        style={{borderRadius: 10}}
                        resizeMode="cover"
                      />
          </View>

          <View style={{ flexDirection: "row", marginTop: 70 }}>
            <Text
              style={{ fontSize: "11px", fontWeight: "bold", color: "black" }}
            >
              {" "}
              วันที่โอนเงิน :{" "}
            </Text>
            <View
              style={{
                backgroundColor: "#9BCBCE",
                padding: 5,
                borderRadius: 50,
                marginRight: 10,
              }}
            >
              <Text
                style={{ fontSize: "11px", fontWeight: "bold", color: "black" }}
              >
                {" "}
                {payment_date}{" "}
              </Text>
            </View>

            <Text
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                color: "black",
                marginLeft: 10,
              }}
            >
              {" "}
              เวลาที่โอนเงิน :{" "}
            </Text>
            <View
              style={{
                backgroundColor: "#9BCBCE",
                padding: 5,
                borderRadius: 50,
              }}
            >
              <Text
                style={{ fontSize: "11px", fontWeight: "bold", color: "black" }}
              >
                {" "}
                {payment_time}{" "}
              </Text>
            </View>
          </View>
          <View style={{backgroundColor: "#b6dee0",
                padding: 5,
                borderRadius: 10,
                marginRight: 10, width: "80%", height: 25, alignSelf: "center", marginTop: 10, justifyContent: "center"}}>
                <Text
                style={{ fontSize: "11px", fontWeight: "bold", color: "white" }}
              >
                {" "}
                {payment_note}{" "}
              </Text>
          </View>
        </View>
      </View>
      {invoice && (
        <View
          style={{
            top: 0,
            flex: 3,
            height: "100%",
            width: "90%",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(235, 230, 247, 0.9)",
              width: "100%",
              height: "30%",
              borderRadius: 20,
              justifyContent: "center",
              marginTop: 20,
            }}
            onPress={() => {
              navigation.navigate("BillInvoice", {
                id: invoice._id,
                categoryTitle: room_number,
                month: invoice.month,
                year: invoice.year,
              });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: "12px", fontWeight: "bold", color: "black" }}
              >
                ยอดในใบแจ้งหนี้
              </Text>
              <Text
                style={{ fontSize: "20px", fontWeight: "bold", color: "black" }}
              >
                ฿ {invoice.total}
              </Text>
              <AntDesign name="right" size={18} color="black" />
            </View>
          </TouchableOpacity>
          {invoice.status === "checking_payment"  && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={styles.btnChecked}
                onPress={updateAprroved}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  ตรวจสอบเรียบร้อย
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.btnChecked,
                  { backgroundColor: "#B7B4B4", marginLeft: 10 },
                ]}
                onPress={canclePayment}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  ยกเลิกรายการ
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {invoice.status == "APPROVED_BILL" && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity disabled={true}>
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#a2c26e",
                  }}
                >
                  ตรวจสอบเรียบร้อย
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {invoice.status == "WRONG_BILL" && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity disabled={fix} onPress={fixPayment}>
                <Text
                  style={{ fontSize: "16px", fontWeight: "bold", color: "red" }}
                >
                  เกิดข้อผิดพลาด อยู่ระหว่างการแก้ไข
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <Dialog.Container visible={visible}>
        <Dialog.Title>รายการชำระเงินไม่ถูกต้อง</Dialog.Title>
        <Dialog.Description>โปรดแจ้งหมายเหตุแก้ผู้เช่า</Dialog.Description>
        <Dialog.Input
          onChangeText={(value) => setInput(value)}
          value={input}
          multiline
          autoCapitalize={"none"}
          autoFocus={true}
        ></Dialog.Input>

        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setVisible(false);
            setInput("");
          }}
        />
        <Dialog.Button label="Send" onPress={sendCancle} />
      </Dialog.Container>
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
    height: "40%",
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
    backgroundColor: "white",
    width: "70%",
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
  },
  btnChecked: {
    padding: 10,
    backgroundColor: "#60B4FF",
    borderRadius: "50%",
    shadowColor: "#60B4FF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  container1: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PaymentDatail;
