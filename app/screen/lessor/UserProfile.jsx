import React, { useState, useEffect } from "react";
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
} from "react-native";
import { Divider, Layout, Modal } from "@ui-kitten/components";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { baseUrl } from "@env";
import axios from "axios";
import { StackActions } from "@react-navigation/native";

function User({ userObject, navigation, contract, roomNumber, vehicle }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addVehicle, setAddVehicle] = useState(false);
  const [warning, setWarning] = useState(false);
  const [license_plate, setLicense_plate] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [room_number, setRoom_number] = useState(roomNumber);
  const [status, setStatus] = useState("moveOut");
  const [statusRoom, setStatusRoom] = useState("available");

  const addCar = async (event) => {
    try {
      const response = await axios.post(`${baseUrl}/addVehicle`, {
        license_plate,
        color,
        brand,
        room_number,
      });

      if (response.status === 200) {
        alert("เพิ่มยานพาหนะสำเร็จ");
        setAddVehicle(!addVehicle);
        setLicense_plate("");
        setColor("");
        setBrand("");
        setWarning(false);
      } else {
        throw new Error("An error ");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (license_plate != "" && color != "" && brand != "") {
      setWarning(false);
    } else {
      setWarning(true);
    }
  }, [license_plate, color, brand]);

  const cancleContract = async (event) => {
    const dataUser = {
      address: userObject.address,
      age: userObject.age,
      birthdate: userObject.birthdate,
      email: userObject.email,
      first_name: userObject.first_name,
      last_name: userObject.last_name,
      password: userObject.password,
      role: userObject.role,
      room_number: userObject.room_number,
      sex: userObject.sex,
      tel_no1: userObject.tel_no1,
      tel_no2: userObject.tel_no2,
      username: userObject.username,
      _id: userObject._id,
    };
    try {
      Alert.alert(
        "ยืนยันที่จะยกเลิกสัญญาเช่า",
        "ถ้าลบเเล้วไม่สามารถกู้คืนได้ โปรดตรวจสอบให้ครบถ้วน",
        [
          {
            text: "ยืนยัน",
            onPress: async (event) => {
              const updateContract = await axios.put(
                `${baseUrl}/updateStatusContract/${room_number}/${status}`
              );

              const updateRoom = await axios.put(
                `${baseUrl}/updateStatus/${room_number}/${statusRoom}`
              );

              let arrayids = [];
              vehicle.forEach((d) => {
                arrayids.push(d._Id);
              });

              if (arrayids.length > 0) {
                var deleteCar = await axios.delete(
                  `${baseUrl}/deleteAllVehicle/${arrayids}`
                );
              }

              const deleteUser = await axios.delete(
                `${baseUrl}/deleteUser/${userObject._id}`
              );

              if (
                updateContract.status === 200 &&
                updateRoom.status === 200 &&
                deleteUser.status === 200
              ) {
                alert("ยกเลิกสัญญาเช่าแล้ว");
                navigation.dispatch(
                  StackActions.replace("CheckRoomsStatus", {
                    categoryTitle: room_number,
                  })
                );
              } else {
                throw new Error("An error ");
              }
            },
          },
          {
            text: "เลิกทำ",
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

  const deleteVehicle = (item) => {
    axios
      .post(`${baseUrl}/deleteVehicle`, item)
      .then((response) => {
        console.log("delete vehicle success");
      })
      .catch((error) => console.log("error deleteVehicle"));
  };

  return (
    <View style={styles.view2}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[
                styles.button,
                { justifyContent: "flex-end", alignSelf: "flex-end" },
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AntDesign name="closecircle" size={24} color="#fa667a" />
            </TouchableOpacity>
            {contract && (
              <ScrollView style={{ flex: 1 }}>
                <View
                  style={{
                    marginRight: 8,
                    marginLeft: 5,
                    flexWrap: "wrap",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{ display: "flex", flexDirection: "row", top: 5 }}
                  >
                    <Text style={[styles.text, { top: 5 }]}> วันที่ : </Text>
                    <View style={[styles.txtInput, { width: "50%" }]}>
                      {/* <DatePicker onReserve={onChangeLeaseHandler} /> */}
                      <Text style={styles.text}>{contract.lease_date}</Text>
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
                    <Text style={[styles.text, styles.txtInput]}>
                      {contract.first_name}
                      {""}
                    </Text>
                    <Text style={[styles.text, styles.txtInput]}>
                      {contract.last_name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.text, { marginTop: 10 }]}>
                      เบอร์โทร{" "}
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        styles.txtInput,
                        { marginVertical: 10 },
                      ]}
                    >
                      {contract.phone}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Text style={styles.text}>ที่อยู่ </Text>
                    <Text style={[styles.text, styles.txtInput]}>
                      {" "}
                      {contract.address}{" "}
                    </Text>
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
                        <Text style={[styles.text, { top: 5 }]}>
                          ห้องเลขที่{" "}
                        </Text>
                        <Text
                          style={[styles.text, styles.txtInput, { width: 60 }]}
                        >
                          {" "}
                          {contract.room_number}{" "}
                        </Text>
                      </View>

                      <View style={{ flexDirection: "row", marginLeft: 10 }}>
                        <Text style={styles.text}> ชั้นที่ </Text>
                        <Text
                          style={[styles.text, styles.txtInput, { width: 30 }]}
                        >
                          {" "}
                          {contract.room_number.slice(1, 2)}{" "}
                        </Text>
                      </View>

                      <View style={{ flexDirection: "row", xmarginLeft: 10 }}>
                        <Text style={styles.text}> ตึกที่ </Text>
                        <Text
                          style={[styles.text, styles.txtInput, { width: 30 }]}
                        >
                          {" "}
                          {contract.room_number.slice(0, 1)}{" "}
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.text,
                        { justifyContent: "justify", marginTop: 10 },
                      ]}
                    >
                      ของ หอพัก A5 ซึ่งหอพักตั้งอยู่ที่บ้านเลขที่ 1
                      แขวงลาดกระบัง ซอยฉลองกรุง จังหวัดกรุงเทพมหานคร
                      เพื่อใช้เป็นที่พักอาศัย
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        { justifyContent: "justify", marginVertical: 10 },
                      ]}
                    >
                      ประเภทห้อง {contract.room_type} ในอัตราค่าเช่าเดือนละ {""}
                      {contract.room_price}
                      {""} บาท ค่าเช่านี้ไม่รวมถึงค่าไฟฟ้า ค่าน้ำประปา
                      ค่าส่วนกลาง ค่าใช้จ่ายเพิ่มเติม
                      ซึ่งผู้เช่าต้องชำระแก่ผู้ให้เช่าตามอัตราที่กำหนดไว้ในสัญญาข้อ
                      4{" "}
                    </Text>
                  </View>
                  <Text style={[styles.text]}>
                    ข้อ 2 ผู้เช่าตกลงเช่าห้องพักอาศัยตามสัญญาข้อ 1 มีกำหนดเวลา
                  </Text>
                  <View
                    style={{
                      marginTop: 0,
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={[styles.text]}>นับตั้งแต่วันที่ </Text>
                      <View
                        style={{
                          backgroundColor: "white",
                          borderRadius: 50,
                          width: 105,
                        }}
                      >
                        <Text style={[styles.text, { textAlign: "center" }]}>
                          {contract.start_date}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", marginLeft: 5 }}>
                        <Text style={[styles.text]}>ถึงวันที่ </Text>
                        <View
                          style={{
                            backgroundColor: "white",
                            borderRadius: 50,
                            width: 105,
                          }}
                        >
                          <Text style={[styles.text, { textAlign: "center" }]}>
                            {contract.end_date}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                    <Text
                      style={[
                        styles.text,
                        { textAlign: "justify", marginTop: 10 },
                      ]}
                    >
                      ข้อ 3 การชำระค่าเช่านั้น
                      ผู้เช่าตกลงจะชำระค่าเช่าแก่ผู้ให้เช่า โดยชำระภายในวันที่
                      10 ของทุกเดือนตลอดเวลาอายุการเช่า
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
                      style={[
                        styles.text,
                        { textAlign: "justify", marginTop: 10 },
                      ]}
                    >
                      ข้อ 5 ผู้เช่าต้องชำระค่าไฟฟ้า ค่าน้ำประปา ค่าส่วนกลาง
                      ตามจำนวนหน่วยที่ใช้ในแต่ละเดือนและต้องชำระพร้อมกับการชำระค่าเช่าของเดือนถัดไป
                    </Text>

                    <Text
                      style={[
                        styles.text,
                        { textAlign: "justify", marginTop: 10 },
                      ]}
                    >
                      ข้อ 6 ผู้เช่าต้องดูแลห้องพักอาศัยและทรัพย์สินต่างๆ
                      ในห้องพักดังกล่าวเสมือนเป็นทรัพย์สินของตนเอง
                      และต้องรักษาความสะอาดตลอดจนรักษาความสงบเรียบร้อย
                      ไม่ก่อให้เกิดเสียงให้เป็นที่เดือดร้อนรำคาญแก่ผู้อยู่ห้องพักอาศัยข้างเคียง
                    </Text>

                    <Text
                      style={[
                        styles.text,
                        { textAlign: "justify", marginTop: 10 },
                      ]}
                    >
                      ข้อ 7
                      ผู้เช่าสัญญาว่าจะปฏิบัติตามระเบียบข้อบังคับของอพาร์ตเม้นต์ท้ายสัญญานี้
                      ซึ่งคู่สัญญาทั้งสองฝ่ายให้ถือว่าระเบียบข้อบังคับดังกล่าวเป็นส่วนหนึ่งแห่งสัญญาเช่านี้ด้วย
                      หากผู้เช่าละเมิดแล้วผู้ให้เช่าย่อมให้สิทธิตามข้อ 9
                      แห่งสัญญานี้ได้
                    </Text>

                    <Text
                      style={[
                        styles.text,
                        { textAlign: "justify", marginTop: 10 },
                      ]}
                    >
                      ข้อ 8
                      ผู้ให้เช่าไม่ต้องรับผิดชอบในความสูญหายหรือความเสียหายอย่างใดๆ
                      อันเกิดขึ้นแก่รถยนต์รวมทั้งทรัพย์สินต่างๆ
                      ในรถยนต์ของผู้เช่า
                      ซึ่งได้นำมาจอดไว้ในที่จอดรถยนต์ที่ผู้ให้เช่าจัดไว้ให้
                    </Text>

                    <Text
                      style={[
                        styles.text,
                        { textAlign: "justify", marginTop: 10 },
                      ]}
                    >
                      ข้อ 9
                      ผู้เช่าตกลงว่าการผิดสัญญาเช่าเครื่องเรือนซึ่งผู้เช่าได้ทำไว้กับผู้ให้เช่าต่างหากจากสัญญานี้
                      ถือว่าเป็นการผิดสัญญานี้ด้วยและโดยนัยเดียวกัน
                      การผิดสัญญานี้ย่อมถือเป็นการผิดสัญญาเช่าเครื่องเรือนด้วย
                    </Text>

                    <View
                      style={[
                        styles.checkboxContainer,
                        {
                          flexWrap: "wrap",
                          flexDirection: "row",
                          width: "100%",
                        },
                      ]}
                    >
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
            )}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "#2196F3",
                  borderRadius: 10,
                  padding: 10,
                  alignSelf: "flex-end",
                },
              ]}
              onPress={cancleContract}
            >
              <Text
                style={[
                  styles.textStyle,
                  { fontSize: "10px", fontWeight: "bold" },
                ]}
              >
                ยกเลิกสัญญาเช่า
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {userObject && (
        <View
          style={{
            marginTop: "14%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            source={
              userObject.sex === "male"
                ? require("../../assets/male.png")
                : require("../../assets/female.png")
            }
            style={styles.profile}
          ></Image>

          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: "bold",
              color: "#2C76B2",
              alignSelf: "center",
            }}
          >
            {userObject.first_name} {userObject.last_name}{" "}
          </Text>
        </View>
      )}
      <Divider
        style={{
          zIndex: 110,
          width: "80%",
          backgroundColor: "#7ED6FF",
          height: 2.5,
          alignSelf: "center",
          top: "1.5%",
        }}
      />

      {userObject && (
        <View
          style={{
            backgroundColor: "#f0f7f7",
            marginTop: 25,
            width: "90%",
            height: "15%",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "30%",
          }}
        >
          <Layout style={[styles.container2]}>
            <Layout style={[styles.layout]}>
              <Ionicons name="md-calendar-sharp" size={24} color="#f5718b" />
              <Text style={{ fontWeight: "bold", left: 10, fontSize: "13px" }}>
                {userObject.birthdate}
              </Text>
            </Layout>

            <Layout style={[styles.layout]}>
              <MaterialCommunityIcons
                name="gender-male-female"
                size={24}
                color="#f5718b"
              />
              <Text style={{ fontWeight: "bold", left: 10, fontSize: "13px" }}>
                {userObject.sex == "male" ? "ชาย" : "หญิง"}
              </Text>
            </Layout>
          </Layout>

          <Layout style={[styles.container4, { width: "70%" }]}>
            <Layout style={[styles.layout, { justifyContent: "flex-start" }]}>
              <Ionicons name="md-location-sharp" size={24} color="#f5718b" />
              <Text
                style={{
                  fontWeight: "bold",
                  left: 10,
                  fontSize: "13px",
                  flexWrap: "wrap",
                }}
              >
                {userObject.address}
              </Text>
            </Layout>
          </Layout>
        </View>
      )}
      {userObject && (
        <View
          style={{
            backgroundColor: "#f0f7f7",
            marginTop: 10,
            width: "90%",
            height: "12%",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "30%",
          }}
        >
          <Layout style={styles.container3}>
            <Layout style={[styles.layout2]}>
              <Feather name="phone-call" size={24} color="#f5718b" />
              <Layout
                style={{ flexDirection: "column", backgroundColor: "#f0f7f7" }}
              >
                <Text
                  style={{ fontWeight: "bold", left: 10, fontSize: "13px" }}
                >
                  {userObject.tel_no1}
                </Text>

                <Text
                  style={{ fontWeight: "bold", left: 10, fontSize: "13px" }}
                >
                  {userObject.tel_no2}
                </Text>
              </Layout>
            </Layout>

            <Layout style={[styles.layout2]}>
              <MaterialIcons name="email" size={24} color="#f5718b" />
              <Text style={{ fontWeight: "bold", left: 10, fontSize: "13px" }}>
                {userObject.email}
              </Text>
            </Layout>
          </Layout>
        </View>
      )}
      {userObject && (
        <View
          style={{
            backgroundColor: "#f0f7f7",
            marginTop: 10,
            width: "90%",
            height: "10%",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "30%",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "60%",
              justifyContent: "center",
              height: 50,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              left: "2%",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              วันเริ่มสัญญา : 2022-22-12
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              วันสิ้นสุดสัญญา : 2022-22-12
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              backgroundColor: "#f5aa64",
              padding: 10,
              borderRadius: 10,
              width: "25%",
              height: 50,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "11px",
                textAlign: "center",
              }}
            >
              ดูสัญญาเช่า
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal animationType="slide" transparent={true} visible={addVehicle}>
        <View style={styles.centeredView}>
          <View style={styles.modalView2}>
            {warning && (
              <Text
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginBottom: 10,
                  color: "red",
                }}
              >
                กรุณกรอกข้อมูลให้ครบถ้วน*
              </Text>
            )}
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                  license_plate :
                </Text>
                <TextInput
                  onChangeText={(license_plate) =>
                    setLicense_plate(license_plate)
                  }
                  placeholder={"ทะเบียนรถ"}
                  style={{
                    backgroundColor: "#f2f7fc",
                    width: 120,
                    borderRadius: 50,
                    padding: 5,
                    paddingLeft: 15,
                    alignSelf: "center",
                    fontSize: "12px",
                  }}
                ></TextInput>
              </View>

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Color :
                </Text>
                <TextInput
                  onChangeText={(color) => setColor(color)}
                  placeholder={"สีรถ"}
                  style={{
                    backgroundColor: "#f2f7fc",
                    width: 120,
                    borderRadius: 50,
                    padding: 5,
                    paddingLeft: 15,
                    alignSelf: "center",
                    fontSize: "12px",
                  }}
                ></TextInput>
              </View>

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Brand :
                </Text>
                <TextInput
                  onChangeText={(brand) => setBrand(brand)}
                  placeholder={"ยี่ห้อรถ"}
                  style={{
                    backgroundColor: "#f2f7fc",
                    width: 120,
                    borderRadius: 50,
                    padding: 5,
                    paddingLeft: 15,
                    alignSelf: "center",
                    fontSize: "12px",
                  }}
                ></TextInput>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.button2,
                  styles.buttonClose,
                  {
                    marginTop: 10,
                    marginRight: 10,
                    backgroundColor: "#cad5de",
                  },
                ]}
                onPress={() => {
                  setAddVehicle(!addVehicle), setWarning(false);
                }}
              >
                <Text
                  style={[
                    styles.textStyle,
                    { fontSize: "12px", fontWeight: "bold" },
                  ]}
                >
                  ยกเลิก
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button2, styles.buttonClose, { marginTop: 10 }]}
                onPress={() => {
                  if (license_plate != "" && color != "" && brand != "") {
                    addCar();
                  } else {
                    setWarning(true);
                  }
                }}
              >
                <Text
                  style={[
                    styles.textStyle,
                    { fontSize: "12px", fontWeight: "bold" },
                  ]}
                >
                  เพิ่มยานพาหนะ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 13,
          alignSelf: "center",
          backgroundColor: "#fce6eb",
          width: "90%",
          marginTop: "3%",
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: "13px", fontWeight: "bold", marginRight: 10 }}>
          ข้อมูลยานพาหนะ
        </Text>
        <TouchableOpacity onPress={() => setAddVehicle(true)}>
          <AntDesign name="pluscircle" size={22} color="#4482c2" />
        </TouchableOpacity>
      </View>
      {vehicle == "" && (
        <View
          style={{
            backgroundColor: "#f7f0f2",
            borderColor: "#C3DCE3",
            marginTop: "1%",
            alignSelf: "center",
            borderRadius: 0,
            padding: 10,
            width: "90%",
            marginBottom: "4%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              fontAlign: "center",
              color: "#35648c",
            }}
          >
            {" "}
            ผู้เช่ายังไม่มีข้อมูลยานพาหนะ
          </Text>
        </View>
      )}
      {vehicle != "" && (
        <>
          <ScrollView style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: "#f7f0f2",
                borderColor: "#C3DCE3",
                marginTop: "1%",
                alignSelf: "center",
                borderRadius: "10%",
                padding: 10,
                width: "90%",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 2,
                marginBottom: "4%",
              }}
            >
              {vehicle.map((item, index) => (
                <View
                  key={index}
                  style={[
                    index % 2 === 0
                      ? { backgroundColor: "#cfe1ff" }
                      : { backgroundColor: "#d1f0d3" },
                    { marginBottom: 10 },
                  ]}
                >
                  <View
                    style={{
                      padding: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome5 name="car" size={16} color={"#415e80"} />
                      <Text
                        category="label"
                        style={{ marginLeft: 10, fontWeight: "bold" }}
                      >
                        {item.license_plate}
                        {""}
                        {""}
                        {""} สี{item.color}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        category="label"
                        style={{ fontWeight: "bold", marginRight: 5 }}
                      >
                        {item.brand}
                      </Text>
                      <TouchableOpacity onPress={() => deleteVehicle(item)}>
                        <AntDesign
                          name="closecircleo"
                          size={20}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const UserProfile = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const { categoryTitle } = route.params;
  const [data, setData] = useState();
  const [user, setUser] = useState(null);
  const [contract, setContract] = useState(null);
  const [vehicle, setVehicle] = useState("");

  useEffect(() => {
    const url = `${baseUrl}/getUserNum/${categoryTitle}`;

    const urlContract = `${baseUrl}/getContractNum/${categoryTitle}`;

    const urlVehicle = `${baseUrl}/getVehicleNum/${categoryTitle}`;

    const fetchUsers = async () => {
      try {
        const response = await axios.get(url);
        const contract = await axios.get(urlContract);
        const vehicle = await axios.get(urlVehicle);
        if (
          response.status === 200 &&
          contract.status === 200 &&
          vehicle.status === 200
        ) {
          setUser(response.data);
          setContract(contract.data[0]);
          setVehicle(vehicle.data);
          // console.log(response.data);
          //console.log(contract.data[0]);
          //console.log(response.data);
          //console.log(vehicle.data);
          //console.log(contract.data[0]);

          return;
        } else {
          throw new Error("Failed to fetch user");
        }
      } catch (error) {
        console.log("Data fetching cancelled user");
      }
    };
    fetchUsers();
  }, [vehicle]);
  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_invoice.png")}
        style={styles.background}
      ></Image>

      <User
        userObject={user}
        contract={contract}
        vehicle={vehicle}
        roomNumber={categoryTitle}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    alignSelf: "center",
    backgroundColor: "#f0f7f7",
  },
  container5: {
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
  container4: {
    top: "2%",
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#f0f7f7",
  },
  container3: {
    flexDirection: "column",
  },
  layout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f7f7",
  },
  layout2: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f0f7f7",
  },
  container: {
    minHeight: 128,
  },
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  view2: {
    flex: 1,
  },
  text: {
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center",
  },
  background: {
    width: "100%",
    height: "55%",
    zIndex: -100,
    top: "-40%",
    position: "absolute",
  },
  profile: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    zIndex: 100,
    borderWidth: 5,
    borderColor: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#95c7c6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 600,
    backgroundColor: "#d5e8f7",
  },
  modalView2: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  txtInput: {
    backgroundColor: "white",
    textAlign: "center",
    padding: 3,
    width: "40%",
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#95c7c6",
    borderRadius: 5,
    alignItems: "center",
  },
  button: {
    padding: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default UserProfile;
