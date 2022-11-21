import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, ScrollView, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Layout, Text, Divider } from "@ui-kitten/components";
import DatePicker from "../../component/contract/DatePicker";
import { Checkbox } from "react-native-paper";
import { baseUrl } from "@env";
import axios from "axios";
import { StackActions } from "@react-navigation/native";

const LeaseContract = ({ route, navigation }) => {
  const [checked, setChecked] = useState(false);
  const { categoryId, categoryTitle, reserveFname, reserveLname } = route.params;
  const [lease_date, setLeaseDate] = useState(new Date().toISOString().slice(0,10));
  const [first_name, setFirst_name] = useState(reserveFname);
  const [last_name, setLast_name] = useState(reserveLname);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [room_price, setRoom_price] = useState(0);
  const [room_number, setRoom_number] = useState("");
  const [room_type, setRoom_type] = useState("");
  const [room, setRoom] = useState(null);
  const [status, setStatus] = useState("rent");
  const [statusUpdate, setStatusUpdate] = useState("unavailable");
  const [rentStatus, setRentStatus] = useState("rent");

  useEffect(() => {
    const url = `${baseUrl}/getRoomNum/${categoryTitle}`;

    const fetchUsers = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setRoom(response.data);
          setRoom_price(response.data.room_price);
          setRoom_type(response.data.room_type);
          setRoom_number(response.data.room_number);
          // console.log(response.data.room_price);
          
          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.log("Data fetching cancelled detail");
      }
    };
    fetchUsers();
  }, [categoryTitle]);
  
  const onChangeLeaseHandler = (date) => {
    setLeaseDate(date);
  };

  const onStart_dateHandler = (date) => {
    setStart_date(date);
    // console.log("----------");
    // console.log(start_date);
  };

  const onEnd_dateHandler = (date) => {
    setEnd_date(date);
  };

  const onContractFormHandler = async (event) => {
    try {
      const response = await axios.post(`${baseUrl}/addContract`, {
        first_name,
        last_name,
        address,
        phone,
        start_date,
        end_date,
        room_price,
        room_number,
        room_type,
        lease_date,
        status,
      });

      const update = await axios.put(
        `${baseUrl}/updateStatus/${categoryTitle}/${statusUpdate}`
      );

      const cancle = await axios.put(`${baseUrl}/updateStatusReserve/${categoryId}/${rentStatus}`);
      
      if (update.status === 200 && response.status === 200 && cancle.status === 200) {
        alert("ทำสัญญาสำเร็จ");

        navigation.dispatch(
          StackActions.replace("Register", {
            categoryId: response.data._id,
            categoryTitle: room_number,
            first_name: first_name,
            last_name: last_name,
            address1: address,
            tel_no1: phone,
          })
        );
      } else {
        throw new Error("An error ");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              marginRight: 8,
              marginLeft: 5,
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row", top: 5 }}>
              <Text style={[styles.text, { top: 5 }]}> วันที่ : </Text>
              <View
                style={{ backgroundColor: "white", borderRadius: 50, top: 2 }}
              >
                <DatePicker onReserve={onChangeLeaseHandler} />
              </View>
            </View>
            <View style={{ marginVertical: 20 }}>
              <Text style={[styles.text, { textAlign: "justify" }]}>
                สัญญานี้ทำขึ้นระหว่างระหว่าง หอพัก A5 ที่อยู่ บ้านเลขที่ 1
                ตำบล/แขวง ลาดกระบัง ซอยฉลองกรุง เขตลาดกระบัง
                จังหวัดกรุงเทพมหานคร
              </Text>
              <Text style={[styles.text, { textAlign: "justify" }]}>
                ซึ่งต่อไปในสัญญานี้จะเรียกว่า "ผู้ให้เช่า" ฝ่ายหนึ่งกับ{" "}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.text}>คุณ </Text>
              <TextInput
                style={[styles.text, styles.txtInput]}
                value={first_name}
                onChangeText={setFirst_name}
              ></TextInput>
              <TextInput style={[styles.text, styles.txtInput]} value={last_name}
                onChangeText={setLast_name}>
              </TextInput>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={styles.text}>เบอร์โทร </Text>
              <TextInput keyboardType="numeric" style={[styles.text, styles.txtInput, {width: "50%"}]} value={phone}
                onChangeText={setPhone}></TextInput>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <Text style={styles.text}>ที่อยู่ </Text>
              <TextInput style={[styles.text, styles.txtAdress]} value={address}
                onChangeText={setAddress}></TextInput>
            </View>
            <Text style={[styles.text, { textAlign: "justify" }]}>
              ซึ่งต่อไปในสัญญานี้จะเรียกว่า "ผู้เช่า" อีกฝ่ายหนึ่ง
              ทั้งสองฝ่ายตกลงทำสัญญากันโดยมีข้อความดังต่อไปนี้
            </Text>

            <View style={{ flexDirection: "column", marginVertical: 10 }}>
              <Text style={styles.text}>
                ข้อ 1 ผู้เช่าตกลงเช่าและผู้ให้เช่าตกลงให้เช่าห้องพักอาศัย{" "}
              </Text>

              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.text, { top: 5 }]}>ห้องเลขที่ </Text>
                  <TextInput
                    style={[styles.text, styles.txtInput, { width: 60 }]}
                  >
                    {" "}
                    {categoryTitle}{" "}
                  </TextInput>
                </View>

                <View style={{ flexDirection: "row",marginLeft: 10 }}>
                  <Text style={styles.text}> ชั้นที่ </Text>
                  <TextInput
                    style={[styles.text, styles.txtInput, { width: 30 }]}
                  >
                    {" "}
                    {categoryTitle.slice(1, 2)}{" "}
                  </TextInput>
                </View>

                <View style={{ flexDirection: "row",xmarginLeft: 10 }}>
                  <Text style={styles.text}> ตึกที่ </Text>
                  <TextInput
                    style={[styles.text, styles.txtInput, { width: 30 }]}
                  >
                    {" "}
                    {categoryTitle.slice(0, 1)}{" "}
                  </TextInput>
                </View>
              </View>
              <Text
                style={[
                  styles.text,
                  { justifyContent: "justify", marginTop: 10 },
                ]}
              >
                ของ หอพัก A5 ซึ่งหอพักตั้งอยู่ที่บ้านเลขที่ 1 แขวงลาดกระบัง
                ซอยฉลองกรุง จังหวัดกรุงเทพมหานคร เพื่อใช้เป็นที่พักอาศัย
              </Text>
              <Text
                style={[
                  styles.text,
                  { justifyContent: "justify", marginVertical: 10 },
                ]}
              >
                ประเภทห้อง {room_type} ในอัตราค่าเช่าเดือนละ {""}{room_price}{""} บาท
                ค่าเช่านี้ไม่รวมถึงค่าไฟฟ้า ค่าน้ำประปา ค่าส่วนกลาง
                ค่าใช้จ่ายเพิ่มเติม
                ซึ่งผู้เช่าต้องชำระแก่ผู้ให้เช่าตามอัตราที่กำหนดไว้ในสัญญาข้อ 4{" "}
              </Text>
            </View>
            <Text style={[styles.text]}>
              ข้อ 2 ผู้เช่าตกลงเช่าห้องพักอาศัยตามสัญญาข้อ 1 มีกำหนดเวลา
            </Text>
            <View
              style={{ marginTop: 0, flexDirection: "row", flexWrap: "wrap" }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.text]}>นับตั้งแต่วันที่ </Text>
                <DatePicker onReserve={onStart_dateHandler} />
                <View style={{ flexDirection: "row", marginLeft: 5 }}>
                  <Text style={[styles.text]}>ถึงวันที่ </Text>
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 50,
                      width: 105,
                    }}
                  >
                    <DatePicker onReserve={onEnd_dateHandler}/>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
              <Text
                style={[styles.text, { textAlign: "justify", marginTop: 10 }]}
              >
                ข้อ 3 การชำระค่าเช่านั้น ผู้เช่าตกลงจะชำระค่าเช่าแก่ผู้ให้เช่า
                โดยชำระภายในวันที่ 10 ของทุกเดือนตลอดเวลาอายุการเช่า
              </Text>

              <Text
                style={[
                  styles.text,
                  { textAlign: "justify", marginLeft: 40, marginTop: 10 },
                ]}
              >
                (1) ค่าไฟฟ้ายูนิตละ 6 บาท
              </Text>

              <Text
                style={[
                  styles.text,
                  { textAlign: "justify", marginLeft: 40, marginTop: 10 },
                ]}
              >
                (2) ค่าน้ำประปาลูกบาศก์เมตรละ 17 บาท
              </Text>

              <Text
                style={[
                  styles.text,
                  { textAlign: "justify", marginLeft: 40, marginTop: 10 },
                ]}
              >
                (3) ค่าส่วนกลาง 500 บาท
              </Text>

              <Text
                style={[styles.text, { textAlign: "justify", marginTop: 10 }]}
              >
                ข้อ 5 ผู้เช่าต้องชำระค่าไฟฟ้า ค่าน้ำประปา ค่าส่วนกลาง
                ตามจำนวนหน่วยที่ใช้ในแต่ละเดือนและต้องชำระพร้อมกับการชำระค่าเช่าของเดือนถัดไป
              </Text>

              <Text
                style={[styles.text, { textAlign: "justify", marginTop: 10 }]}
              >
                ข้อ 6 ผู้เช่าต้องดูแลห้องพักอาศัยและทรัพย์สินต่างๆ
                ในห้องพักดังกล่าวเสมือนเป็นทรัพย์สินของตนเอง
                และต้องรักษาความสะอาดตลอดจนรักษาความสงบเรียบร้อย
                ไม่ก่อให้เกิดเสียงให้เป็นที่เดือดร้อนรำคาญแก่ผู้อยู่ห้องพักอาศัยข้างเคียง
              </Text>

              <Text
                style={[styles.text, { textAlign: "justify", marginTop: 10 }]}
              >
                ข้อ 7
                ผู้เช่าสัญญาว่าจะปฏิบัติตามระเบียบข้อบังคับของอพาร์ตเม้นต์ท้ายสัญญานี้
                ซึ่งคู่สัญญาทั้งสองฝ่ายให้ถือว่าระเบียบข้อบังคับดังกล่าวเป็นส่วนหนึ่งแห่งสัญญาเช่านี้ด้วย
                หากผู้เช่าละเมิดแล้วผู้ให้เช่าย่อมให้สิทธิตามข้อ 9
                แห่งสัญญานี้ได้
              </Text>

              <Text
                style={[styles.text, { textAlign: "justify", marginTop: 10 }]}
              >
                ข้อ 8
                ผู้ให้เช่าไม่ต้องรับผิดชอบในความสูญหายหรือความเสียหายอย่างใดๆ
                อันเกิดขึ้นแก่รถยนต์รวมทั้งทรัพย์สินต่างๆ ในรถยนต์ของผู้เช่า
                ซึ่งได้นำมาจอดไว้ในที่จอดรถยนต์ที่ผู้ให้เช่าจัดไว้ให้
              </Text>

              <Text
                style={[styles.text, { textAlign: "justify", marginTop: 10 }]}
              >
                ข้อ 9
                ผู้เช่าตกลงว่าการผิดสัญญาเช่าเครื่องเรือนซึ่งผู้เช่าได้ทำไว้กับผู้ให้เช่าต่างหากจากสัญญานี้
                ถือว่าเป็นการผิดสัญญานี้ด้วยและโดยนัยเดียวกัน
                การผิดสัญญานี้ย่อมถือเป็นการผิดสัญญาเช่าเครื่องเรือนด้วย
              </Text>

              <View
                style={[
                  styles.checkboxContainer,
                  { flexWrap: "wrap", flexDirection: "row", width: "100%" },
                ]}
              >
                <Checkbox.Android
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <View style={{ width: "80%" }}>
                  <Text style={[styles.text, { marginTop: 5 }]}>
                    คู่สัญญาได้อ่านและเข้าใจข้อความในสัญญานี้
                    โดยตลอดแล้วเห็นว่าถูกต้อง
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          flex: 0.09,
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: 20,
        }}
      >
        {/* <TouchableOpacity
          style={{
            backgroundColor: "pink",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: "50%",
            marginHorizontal: 10,
            backgroundColor: "#48C78E",
          }}
        >
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", color: "white" }}
          >
            Clear
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: "50%",
            backgroundColor: "#47C5FC",
          }}
          onPress={() => {
            if (!checked) {
              Alert.alert("กดยินยอมรับเงื่อนไข", "ตามสัญญาที่กล่าวมา", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]);
            }else{
            onContractFormHandler()}
          }}
        >
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", color: "white" }}
          >
            ทำสัญญา
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    // alignItems: "center",
    backgroundColor: "white",
  },
  container2: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "#f5f6f7",
    marginHorizontal: 20,
    marginTop: 15,
    padding: 10,
    paddingTop: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  cardContainer: {
    flex: 1,
    // backgroundColor: "#f5f6f7",
    backgroundColor: "#000",
    zIndex: 100,
    width: "95%",
    // height: "85%",
    borderRadius: 30,
    top: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  btnSave: {
    // top: 30,
    width: "100%",
    height: 35,
    borderRadius: 30,
    backgroundColor: "#47C5FC",
  },
  btnClear: {
    left: 90,
    // top: 30,
    width: "50%",
    height: 35,
    borderRadius: 30,
    backgroundColor: "#48C78E",
  },
  text: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  txtInput: {
    backgroundColor: "white",
    textAlign: "center",
    padding: 3,
    borderRadius: 50,
    width: "40%",
    marginLeft: 8,
  },
  txtAdress: {
    backgroundColor: "white",
    textAlign: "center",
    padding: 3,
    borderRadius: 20,
    width: "82%",
    height: 70,
    marginLeft: 8,
  },
});

export default LeaseContract;
