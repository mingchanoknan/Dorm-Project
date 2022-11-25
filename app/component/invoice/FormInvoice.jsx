import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import { baseUrl } from "@env";
import axios from "axios";
import { StackActions } from "@react-navigation/native";

const FormInvoice = (props) => {
  const [dorm_fee, setDorm_fee] = useState(props.rentPrice.room_price);
  const [water_fee, setWater_fee] = useState(props.meterWater.sum);
  const [electricity_fee, setElectricity_fee] = useState(props.meterElec.sum);
  const [common_fee, setCommon_fee] = useState(props.rentPrice.common_fee);
  const [expenses, setExpenses] = useState(0);
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [note, setNote] = useState("");
  const [fine, setFine] = useState(0);
  const [edit, setEditable] = useState(false);
  const [sent, setSent] = useState(false);
  
  useEffect(() => {
    dorm_fee == "" ? setDorm_fee(0) : dorm_fee;
    water_fee == "" ? setWater_fee(0) : water_fee;
    electricity_fee == "" ? setElectricity_fee(0) : electricity_fee;
    common_fee == "" ? setCommon_fee(0) : common_fee;
    expenses == "" ? setExpenses(0) : expenses;

    const sum =
      parseInt(dorm_fee) +
      parseInt(water_fee) +
      parseInt(electricity_fee) +
      parseInt(common_fee) +
      parseInt(expenses);
    const tax1 =
      (parseInt(dorm_fee) +
        parseInt(water_fee) +
        parseInt(electricity_fee) +
        parseInt(common_fee) +
        parseInt(expenses)) *
      0.07;
    const total1 = sum + tax1;
    setAmount(sum.toFixed(2));
    setTax(tax1.toFixed(2));
    setTotal(total1.toFixed(2));
  }, [dorm_fee, water_fee, electricity_fee, common_fee, expenses]);

  const sendBill = async (event) => {
    const roomInvoice = {
        month : props.month,
          year : props.year,
          room_number : props.rentPrice.room_number,
          invoice_date : new Date().toISOString().slice(0,10),
          common_fee : common_fee,
          dorm_fee : dorm_fee,
          electricity_fee : electricity_fee,
          water_fee : water_fee,
          expenses : expenses,
          fine : fine,
          amount : amount,
          tax : tax,
          total : total,
          note : note,
          status : "UNAPPROVED_BILL"
    }
    try {
      const updateInvoice = await axios.post(
        `${baseUrl}/addInvoice`, roomInvoice
      );

      if (updateInvoice.status === 200) {
        setSent(true);
        alert("ส่งบิลไปยังผู้เช่าเรียบร้อย");
      } else {
        throw new Error("An error ");
      }
    } catch (error) {
      alert(error);
    }
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
          ห้อง  {props.month}/{props.year}
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
          <Text style={styles.txtHead}> ชื่อ คุณ {props.user.first_name} </Text>
          <Text style={[styles.txtHead]}> เบอร์โทร : </Text>
          <Text style={[styles.txtHead]}>{props.user.tel_no1} </Text>
          <Text style={styles.txtHead}> เบอร์โทรสำรอง : </Text>
          <Text style={styles.txtHead}>{props.user.tel_no2} </Text>
        </View>

        <View style={styles.status}>
          <View style={styles.conStatus}>
            <Text style={styles.txtHead}> สถานะบิล</Text>
            <Text style={[styles.txtHead, { color: "red", marginLeft: 20 }]}>
              {" "}
              {sent ? "ยังไม่ชำระ" : "บิลยังไม่ถูกส่ง"}
            </Text>
          </View>

          <View style={styles.send}>
            <View style={styles.conSend}>
              <Text style={[styles.txtHead]}> บิลจะถูกส่งไปให้ผู้เช่า </Text>
            </View>
            <Text style={[styles.txtHead, { fontSize: "12px" }, sent ? {color: "black"} : {color: "gray", textAlign: "center", fontSize: "12px"}]}>
              {" "} {sent ? props.user.first_name+" "+props.user.last_name : "ยังไม่มีผู้เช่าเชื่อมต่อ"}
            </Text>
            <Text style={[styles.txtHead, { fontSize: "12px" }]}>
              {" "} {sent ? props.user.tel_no1 : ""}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          zIndex: 100,
          width: "105%",
          alignSelf: "center",
          top: "78%",
          height: "120%",
          //backgroundColor: 'red'
        }}
      >
        {/* <TableBill invoice={roomInvoice} /> */}
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
            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
              ค่าเช่าห้อง(Room rate)
            </Text>
            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
              ค่าน้ำ(Water rate) หน่วยละ {props.meterWater.consumption} บาท ใช้ไป {props.meterWater.used_unit} หน่วย
            </Text>
            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
              ค่าไฟฟ้า(Electrical rate) หน่วยละ {props.meterElec.consumption} บาท ใช้ไป {props.meterElec.used_unit} หน่วย
            </Text>
            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
              ค่าส่วนกลาง(Common free)
            </Text>
            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
              ค่าใช้จ่ายเพิ่มเติม
            </Text>
            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
              เงินรวมก่อนภาษี
            </Text>
            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
              ภาษีมูลค่าเพิ่ม 7 %
            </Text>
            <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
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
              onChangeText={(dorm_fee) => setDorm_fee(dorm_fee)}
            >
              {dorm_fee}
            </TextInput>
            <TextInput
              keyboardType="numeric"
              editable={false}
              onChangeText={(water_fee) => setWater_fee(water_fee)}
              style={[
                styles.txtInput,
                
                { marginTop: 5, backgroundColor: "#e1f2eb", borderColor: "#e1f2eb" },
              ]}
            >
              {water_fee}
            </TextInput>
            <TextInput
              keyboardType="numeric"
              editable={false}
              onChangeText={(electricity_fee) =>
                setElectricity_fee(electricity_fee)
              }
              style={[
                styles.txtInput,
                { marginTop: 5, backgroundColor: "#e1f2eb", borderColor: "#e1f2eb" },
              ]}
            >
              {electricity_fee}
            </TextInput>
            <TextInput
              keyboardType="numeric"
              editable={edit}
              onChangeText={(common_fee) => setCommon_fee(common_fee)}
              style={[
                styles.txtInput,
                !edit
                  ? { backgroundColor: "#e1f2eb", borderColor: "#e1f2eb" }
                  : { borderColor: "#e1f2eb" },
                { marginTop: 5 },
              ]}
            >
              {common_fee}
            </TextInput>
            <TextInput
              keyboardType="numeric"
              editable={edit}
              onChangeText={(expenses) => setExpenses(expenses)}
              style={[
                styles.txtInput,
                !edit
                  ? { backgroundColor: "#e1f2eb", borderColor: "#e1f2eb" }
                  : { borderColor: "#e1f2eb" },
                { marginTop: 5 },
              ]}
            >
              {expenses}
            </TextInput>
            <TextInput
              keyboardType="numeric"
              editable={false}
              onChangeText={(amount) => setAmount(amount)}
              style={[
                styles.txtInput,
                {
                  marginTop: 5,
                  backgroundColor: "#e1f2eb",
                  borderColor: "#e1f2eb",
                },
              ]}
            >
              {amount}
            </TextInput>
            <TextInput
              keyboardType="numeric"
              editable={false}
              onChangeText={(tax) => setTax(tax)}
              style={[
                styles.txtInput,
                {
                  marginTop: 5,
                  backgroundColor: "#e1f2eb",
                  borderColor: "#e1f2eb",
                },
              ]}
            >
              {tax}
            </TextInput>
            <TextInput
              keyboardType="numeric"
              editable={false}
              onChangeText={(total) => setTotal(total)}
              style={[
                styles.txtInput,
                {
                  marginTop: 5,
                  backgroundColor: "#e1f2eb",
                  borderColor: "#e1f2eb",
                },
              ]}
            >
              {total}
            </TextInput>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          top: "105%",
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
            style={[ edit ? {backgroundColor: "white"} : "", {
              fontSize: "10px",
              padding: 2,
              paddingLeft: 5,
              width: "80%",
              height: 25,
              borderRadius: "50%",
              alignSelf: "center",
            }]}
            placeholder="กรอกข้อความที่นี่(ถ้ามี)"
            onChangeText={(note) => setNote(note)}
          >
            {note}
          </TextInput>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        {!edit && !sent && ( 
            <TouchableOpacity
            onPress={sendBill}
            style={[styles.btnLoad]}
          >
            <Text
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {" "}
              ส่งบิล{" "}
            </Text>
          </TouchableOpacity>
          )}
          {!edit && !sent && (
          <TouchableOpacity
            onPress={() => setEditable(true)}
            style={[styles.btnEdite, {marginLeft: 10}]}
          >
            <Feather name="edit" size={18} color="white" />
          </TouchableOpacity>
        )}
        {!edit && sent && (
          <TouchableOpacity
            onPress={() => setEditable(true)}
            style={styles.btnLoad}
            // onPress={() => navigation.navigate("Payment", { id: data.id, total: data.total})}
          >
            <Text
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {" "}
              แก้ไขบิล{" "}
            </Text>
          </TouchableOpacity>
        )}
        {edit && (
          <TouchableOpacity
            onPress={() => setEditable(false)}
            style={[styles.btnLoad, { backgroundColor: "#689fe3" }]}
          >
            <Text
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {" "}
              บันทึก{" "}
            </Text>
          </TouchableOpacity>
        )}
        {edit && (
          <TouchableOpacity
            onPress={() => {
                setEditable(false)
              setDorm_fee(props.rentPrice.room_price)
              setWater_fee(props.meterWater.sum)
              setElectricity_fee(props.meterElec.sum)
              setCommon_fee(props.rentPrice.common_fee)
              setNote("");
                }}
            style={[
              styles.btnLoad,
              { marginLeft: 10, backgroundColor: "#e3686f" },
            ]}
          >
            <Text
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {" "}
              ยกเลิก{" "}
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
    height: "90%",
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
    top: 370,
    left: "75%",
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

export default FormInvoice;
