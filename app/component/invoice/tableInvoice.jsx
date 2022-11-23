import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { baseUrl } from "@env";
import axios from "axios";
import { StackActions } from "@react-navigation/native";

const TableInvoice = (props) => {
  const [edit, setEditable] = useState(false);
  const [sent, setSent] = useState(false);

  const payment = async (event) => {
    // const roomInvoice = {
    //     month : props.month,
    //       year : props.year,
    //       room_number : props.rentPrice.room_number,
    //       invoice_date : new Date().toLocaleDateString().slice(0,10),
    //       common_fee : common_fee,
    //       dorm_fee : dorm_fee,
    //       electricity_fee : electricity_fee,
    //       water_fee : water_fee,
    //       expenses : expenses,
    //       fine : fine,
    //       amount : amount,
    //       tax : tax,
    //       total : total,
    //       note : note,
    //       status : "UNAPPROVED_BILL"
    // }
    // try {
    //   const updateInvoice = await axios.post(
    //     `${baseUrl}/addInvoice`, roomInvoice
    //   );
    //   if (updateInvoice.status === 200) {
    //     setSent(true);
    //     alert("ส่งบิลไปยังผู้เช่าเรียบร้อย");
    //   } else {
    //     throw new Error("An error ");
    //   }
    // } catch (error) {
    //   alert(error);
    // }
  };
  return (
    <>
      <View style={styles.build}>
        <FontAwesome name="building" size={24} color="black" />
        <FontAwesome
          style={{ left: "-5%", top: 3.5 }}
          name="building"
          size={18}
          color="black"
        />
      </View>
      <View style={styles.head}>
        <Text
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {" "}
          ห้อง {props.invoice.room_number} {props.invoice.month}/{props.invoice.year}
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          left: "-7%",
          marginVertical: 60,
        }}
      >
        <View
          style={{
            backgroundColor: "#EEEEEE",
            padding: 15,
            borderRadius: 20,
            width: "50%",
          }}
        >
          <Text style={styles.txtHead}> รายละเอียดหัวบิล </Text>
          <Text style={styles.txtHead}> ชื่อ คุณ {props.userInfo.first_name} </Text>
          <Text style={[styles.txtHead]}> เบอร์โทร : </Text>
          <Text style={[styles.txtHead]}> {props.userInfo.tel_no1} </Text>
          <Text style={styles.txtHead}> เบอร์โทรสำรอง : </Text>
          <Text style={styles.txtHead}> {props.userInfo.tel_no2}</Text>
        </View>

        <View style={styles.status}>
          <View style={styles.conStatus}>
            <Text style={styles.txtHead}> สถานะบิล</Text>
            <Text style={[styles.txtHead, { color: "red", marginLeft: 20 }]}>
              {" "}
              {props.invoice.status == "UNAPPROVED_BILL" ? 'ยังไม่ชำระ' : props.invoice.status == "checking_payment" ? "กำลังตรวจสอบ" : props.invoice.status == "WRONG_BILL" ? "บิลเกิดข้อผิดพลาด" : "ชำระแล้ว"}
            </Text>
          </View>

          <View style={styles.send}>
            <View style={styles.conSend}>
              <Text style={[styles.txtHead]}> บิลจะถูกส่งไปให้ผู้เช่า </Text>
            </View>
            <Text
              style={[
                styles.txtHead, { fontSize: "10px"}
              ]}
            >
              {props.userInfo.first_name} {props.userInfo.last_name}
            </Text>
            <Text style={[styles.txtHead, { fontSize: "10px"}]}>{props.userInfo.tel_no1}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          zIndex: 100,
          width: "105%",
          alignSelf: "center",
          top: "72%",
          height: "120%"
        }}
      >
        <View
          style={{
            backgroundColor: "#e3effa",
            height: "13%",
            borderRadius: "10%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>รายการ</Text>
          </View>
          <View>
            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
              จำนวนเงิน (บาท)
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#f6f8fa",
            height: "90%",
            top: "-5%",
            zIndex: -100,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              height: "100%",
              width: "50%",
              zIndex: 100,
              justifyContent: "space-around",
              padding: 10,
              paddingTop: "5%",
            }}
          >
            <Text style={{ fontSize: "11px", fontWeight: "bold" }}>
              ค่าเช่าห้อง(Room rate)
            </Text>
            <Text style={{ fontSize: "11px", fontWeight: "bold" }}>
              ค่าน้ำ(Water rate)
            </Text>
            <Text style={{ fontSize: "11px", fontWeight: "bold" }}>
              ค่าไฟฟ้า(Electrical rate)
            </Text>
            <Text style={{ fontSize: "11px", fontWeight: "bold" }}>
              ค่าส่วนกลาง(Common free)
            </Text>
            <Text style={{ fontSize: "11px", fontWeight: "bold" }}>
              ค่าใช้จ่ายเพิ่มเติม
            </Text>
            <Text style={{ fontSize: "11px", fontWeight: "bold" }}>
              เงินรวมก่อนภาษี
            </Text>
            <Text style={{ fontSize: "11px", fontWeight: "bold" }}>
              ภาษีมูลค่าเพิ่ม 7 %
            </Text>
            <Text style={{ fontSize: "11px", fontWeight: "bold" }}>
              รวมสุทธิ
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              height: "100%",
              width: "50%",
              zIndex: 100,
              justifyContent: "space-around",
              padding: 10,
              paddingTop: "6%",
            }}
          >
            <TextInput
              keyboardType="numeric"
              editable={edit}
              style={[
                styles.txtInput,
                !edit
                  ? { backgroundColor: "#e1f2eb", borderColor: "#e1f2eb" }
                  : { borderColor: "#e1f2eb" },
              ]}
            >
             ฿ {props.invoice.dorm_fee}
            </TextInput>
            <TextInput
              keyboardType="numeric"
              editable={false}
              style={[
                styles.txtInput,
                {
                  marginTop: 5,
                  backgroundColor: "#e1f2eb",
                  borderColor: "#e1f2eb",
                },
              ]}
            >
             ฿ {props.invoice.water_fee}
            </TextInput>
            <TextInput
              keyboardType="numeric"
              editable={false}
              style={[
                styles.txtInput,
                {
                  marginTop: 5,
                  backgroundColor: "#e1f2eb",
                  borderColor: "#e1f2eb",
                },
              ]}
            >
             ฿ {props.invoice.electricity_fee}
            </TextInput>
            <TextInput
              keyboardType="numeric"
              editable={edit}
              style={[
                styles.txtInput,
                !edit
                  ? { backgroundColor: "#e1f2eb", borderColor: "#e1f2eb" }
                  : { borderColor: "#e1f2eb" },
                { marginTop: 5 },
              ]}
            >
             ฿ {props.invoice.common_fee}
            </TextInput>
            <View style={{ flexDirection:"row" }}>
            <TextInput
              keyboardType="numeric"
              editable={edit}
              style={[
                styles.txtInput,
                !edit
                  ? { backgroundColor: "#e1f2eb", borderColor: "#e1f2eb" }
                  : { borderColor: "#e1f2eb" },
                { marginTop: 5 },
              ]}
            >
             ฿ {props.invoice.expenses}
              </TextInput>
              {props.invoice.fine != 0 && (
                <Text style={{ color: 'red', fontSize: "12px", fontWeight: "bold", marginLeft: 5, marginTop: 10 }}>+ {props.invoice.fine}</Text>
              )}
              </View>
            <TextInput
              keyboardType="numeric"
              editable={false}
              style={[
                styles.txtInput,
                {
                  marginTop: 5,
                  backgroundColor: "#e1f2eb",
                  borderColor: "#e1f2eb",
                },
              ]}
            >
             ฿ {props.invoice.amount}
            </TextInput>
            <TextInput
              keyboardType="numeric"
              editable={false}
              style={[
                styles.txtInput,
                {
                  marginTop: 5,
                  backgroundColor: "#e1f2eb",
                  borderColor: "#e1f2eb",
                },
              ]}
            >
             ฿ {props.invoice.tax}
            </TextInput>
            <TextInput
              keyboardType="numeric"
              editable={false}
              style={[
                styles.txtInput,
                {
                  marginTop: 5,
                  backgroundColor: "#e1f2eb",
                  borderColor: "#e1f2eb",
                },
              ]}
            >
            ฿ {props.invoice.total}
            </TextInput>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          top: "102%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            backgroundColor: "#EEEEEE",
            padding: 10,
            borderRadius: 15,
            width: "106%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={[styles.txtHead, { fontSize: "10px" }]}>
            {" "}
            หมายเหตุ:{" "}
          </Text>
          <TextInput
            editable={edit}
            style={[
              edit ? { backgroundColor: "white" } : "",
              {
                fontSize: "10px",
                padding: 2,
                paddingLeft: 5,
                width: "80%",
                height: 25,
                borderRadius: "50%",
                alignSelf: "center",
              },
            ]}
          >
            {props.invoice.note}
          </TextInput>
        </View>
        <Text
          style={[
            styles.txtHead,
            { fontSize: "10px", color: "#F26565", top: 45, left: 20, textAlign: 'left', alignSelf: "flex-start" },
          ]}
        >
          *หากชำระล่าช้าจะคิดค่าปรับ{" "}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        {props.invoice.status == "UNAPPROVED_BILL" && !edit && !sent && (
          <TouchableOpacity
            style={styles.btnLoad}
            onPress={() =>
              props.navigation.navigate("Payment", {
                id: props.invoice._id,
                total: props.invoice.total,
                categoryTitle:  props.invoice.room_number, month: props.invoice.month, year: props.invoice.year
              })
            }
          >
            <Text
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {" "}
              ชำระบิล{" "}
            </Text>
          </TouchableOpacity>
        )}
        {props.invoice.status == "checking_payment" && (
          <TouchableOpacity
            style={[styles.btnLoad, {backgroundColor: 'gray', width: 110,}]}
            disabled={true}
          >
            <Text
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {" "}
              กำลังตรวจสอบ{" "}
            </Text>
          </TouchableOpacity>
        )}
        {props.invoice.status == "WRONG_BILL" && (
          <TouchableOpacity
            style={[styles.btnLoad, {backgroundColor: 'gray', width: 110,}]}
            disabled={true}
          >
            <Text
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {" "}
              บิลมีปัญหา{" "}
            </Text>
          </TouchableOpacity>
        )}
        {props.invoice.status == "APPROVED_BILL" && (
          <TouchableOpacity
            style={[styles.btnLoad, {backgroundColor: 'gray', width: 90,}]}
            disabled={true}
          >
            <Text
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {" "}
              จ่ายเงินแล้ว{" "}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
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
    zIndex: -100,
  },
  box: {
    top: -145,
    zIndex: 100,
  },

  bg_money: {
    zIndex: 100,
    top: -255,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",

    width: "75%",
    height: "13%",
    alignSelf: "center",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    zIndex: 100,
    width: "100%",
    height: "80%",
    position: "relative",
    padding: 10,
    display: "flex",
    borderRadius: 30,
  },
  text: {
    marginBottom: 20,
  },
  container: {
    width: "95%",
    height: "100%",
    paddingVertical: 10,
    top: -260,
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
    top: 340,
    left: "55%",
    justifyContent: "center",
    width: 85,
    padding: 8,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#FFB085",
  },
  btnEdite: {
    top: 370,
    left: "73%",
    width: 30,
    height: 30,
    justifyContent: "center",
    padding: 5,
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: "#9fc1c9",
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
  txtInput: {
    borderWidth: 1,
    padding: 3,
    paddingLeft: 5,
    borderRadius: 5,
    borderColor: "#bedefa",
    width: "60%",
    height: 30,
    fontSize: "11px",
    fontWeight: "bold",
    color: "#2D83FC",
  },
});

export default TableInvoice;
