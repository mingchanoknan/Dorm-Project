import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Layout, Text, Divider } from "@ui-kitten/components";
import DatePicker from "../../component/contract/DatePicker"
import { FontAwesome } from "@expo/vector-icons";

const LeaseContract = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <Card style={[styles.cardContainer]} disabled={true}>
        <SafeAreaView style={styles.container2}>
          <ScrollView style={[styles.scrollView, { height: "100%" }]}>
            <View style={{ flexDirection: "column", marginRight: 10, marginLeft: 10 }}>
              <View style={{ flexDirection: "row", top: 5 }}>
                <Text style={styles.text}> วันที่ : </Text>
                <View style={{backgroundColor:"white", borderRadius: 50, top: -2}}>
                <DatePicker />
                </View>
              </View>
              <Text style={[styles.text, { top: 20, textAlign: "justify" }]}>
                สัญญานี้ทำขึ้นระหว่างระหว่าง หอพัก A5 ที่อยู่ บ้านเลขที่ 1
                ตำบล/แขวง ลาดกระบัง ซอยฉลองกรุง เขตลาดกระบัง
                จังหวัดกรุงเทพมหานคร
              </Text>
              <Text style={[styles.text, { top: 35, textAlign: "justify" }]}>
                ซึ่งต่อไปในสัญญานี้จะเรียกว่า "ผู้ให้เช่า" ฝ่ายหนึ่งกับ{" "}
              </Text>

              <View style={{ flexDirection: "row", top: 50 }}>
                <Text style={styles.text}>คุณ </Text>
                <TextInput style={[styles.text, styles.txtInput]}>
                  Somsak
                </TextInput>
                <TextInput style={[styles.text, styles.txtInput]}>
                  Deena
                </TextInput>
              </View>

              <View style={{ flexDirection: "row", top: 60 }}>
                <Text style={styles.text}>ที่อยู่ </Text>
                <TextInput style={[styles.text, styles.txtAdress]}>
                  {" "}
                  กรุงเทพ{" "}
                </TextInput>
              </View>
              <Text style={[styles.text, { top: 70, textAlign: "justify" }]}>
                ซึ่งต่อไปในสัญญานี้จะเรียกว่า "ผู้เช่า" อีกฝ่ายหนึ่ง
                ทั้งสองฝ่ายตกลงทำสัญญากันโดยมีข้อความดังต่อไปนี้
              </Text>

              <View style={{ flexDirection: "column", top: 90 }}>
                <Text style={styles.text}>
                  ข้อ 1 ผู้เช่าตกลงเช่าและผู้ให้เช่าตกลงให้เช่าห้องพักอาศัย{" "}
                </Text>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "row", top: 5 }}>
                    <Text style={[styles.text]}>ห้องเลขที่ </Text>
                    <TextInput
                      style={[styles.text, styles.txtInput, { width: 60 }]}
                    >
                      {" "}
                      E205{" "}
                    </TextInput>
                  </View>

                  <View
                    style={{ flexDirection: "row", top: 5, marginLeft: 10 }}
                  >
                    <Text style={styles.text}> ชั้นที่ </Text>
                    <TextInput
                      style={[styles.text, styles.txtInput, { width: 50 }]}
                    >
                      {" "}
                      2{" "}
                    </TextInput>
                  </View>

                  <View
                    style={{ flexDirection: "row", top: 5, marginLeft: 10 }}
                  >
                    <Text style={styles.text}> ตึกที่ </Text>
                    <TextInput
                      style={[styles.text, styles.txtInput, { width: 50 }]}
                    >
                      {" "}
                      E{" "}
                    </TextInput>
                  </View>
                </View>

                <Text
                  style={[styles.text, { justifyContent: "justify", top: 10 }]}
                >
                  ของ หอพัก A5 ซึ่งหอพักตั้งอยู่ที่บ้านเลขที่ 1 แขวงลาดกระบัง
                  ซอยฉลองกรุง จังหวัดกรุงเทพมหานคร เพื่อใช้เป็นที่พักอาศัย
                </Text>
                <Text
                  style={[styles.text, { justifyContent: "justify", top: 15 }]}
                >
                  ในอัตราค่าเช่าเดือนละ {""}5000{""} บาท
                  ค่าเช่านี้ไม่รวมถึงค่าไฟฟ้า ค่าน้ำประปา ค่าส่วนกลาง
                  ค่าใช้จ่ายเพิ่มเติม
                  ซึ่งผู้เช่าต้องชำระแก่ผู้ให้เช่าตามอัตราที่กำหนดไว้ในสัญญาข้อ
                  4{" "}
                </Text>

                <Text style={[styles.text, { top: 40 }]}>
                  ข้อ 2 ผู้เช่าตกลงเช่าห้องพักอาศัยตามสัญญาข้อ 1 มีกำหนดเวลา ...
                  ปี
                </Text>
                <View style={{ flexDirection: "row", top: 43 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.text]}>นับตั้งแต่วันที่ </Text>
                    {/* <TextInput
                      style={[styles.text, styles.txtInput, { width: 90 }]}
                    >
                      วว/ดด/ปป
                    </TextInput> */}
                    <View style={{backgroundColor:"white", borderRadius: 50, top:-5, width: 105}}>
                <DatePicker/>
                </View>
                  </View>
                  <View style={{ flexDirection: "row", marginLeft: 5 }}>
                    <Text style={[styles.text]}>ถึงวันที่ </Text>
                    {/* <TextInput
                      style={[styles.text, styles.txtInput, { width: 90 }]}
                    >
                      วว/ดด/ปป
                    </TextInput> */}
                    <View style={{backgroundColor:"white", borderRadius: 50, top:-5, width: 105}}>
                <DatePicker/>
                </View>
                  </View>
                </View>

                <Text style={[styles.text, { top: 70, textAlign: "justify" }]}>
                  ข้อ 3 การชำระค่าเช่านั้น ผู้เช่าตกลงจะชำระค่าเช่าแก่ผู้ให้เช่า
                  โดยชำระภายในวันที่ 10 ของทุกเดือนตลอดเวลาอายุการเช่า
                </Text>

                <Text
                  style={[
                    styles.text,
                    { top: 80, textAlign: "justify", marginLeft: 40 },
                  ]}
                >
                  (1) ค่าไฟฟ้ายูนิตละ 6 บาท
                </Text>

                <Text
                  style={[
                    styles.text,
                    { top: 85, textAlign: "justify", marginLeft: 40 },
                  ]}
                >
                  (2) ค่าน้ำประปาลูกบาศก์เมตรละ 17 บาท
                </Text>

                <Text
                  style={[
                    styles.text,
                    { top: 90, textAlign: "justify", marginLeft: 40 },
                  ]}
                >
                  (3) ค่าส่วนกลาง 500 บาท
                </Text>

                <Text style={[styles.text, { top: 120, textAlign: "justify" }]}>
                  ข้อ 5 ผู้เช่าต้องชำระค่าไฟฟ้า ค่าน้ำประปา ค่าส่วนกลาง
                  ตามจำนวนหน่วยที่ใช้ในแต่ละเดือนและต้องชำระพร้อมกับการชำระค่าเช่าของเดือนถัดไป
                </Text>

                <Text style={[styles.text, { top: 150, textAlign: "justify" }]}>
                  ข้อ 6 ผู้เช่าต้องดูแลห้องพักอาศัยและทรัพย์สินต่างๆ
                  ในห้องพักดังกล่าวเสมือนเป็นทรัพย์สินของตนเอง
                  และต้องรักษาความสะอาดตลอดจนรักษาความสงบเรียบร้อย
                  ไม่ก่อให้เกิดเสียงให้เป็นที่เดือดร้อนรำคาญแก่ผู้อยู่ห้องพักอาศัยข้างเคียง
                </Text>

                <Text style={[styles.text, { top: 180, textAlign: "justify" }]}>
                  ข้อ 7
                  ผู้เช่าสัญญาว่าจะปฏิบัติตามระเบียบข้อบังคับของอพาร์ตเม้นต์ท้ายสัญญานี้
                  ซึ่งคู่สัญญาทั้งสองฝ่ายให้ถือว่าระเบียบข้อบังคับดังกล่าวเป็นส่วนหนึ่งแห่งสัญญาเช่านี้ด้วย
                  หากผู้เช่าละเมิดแล้วผู้ให้เช่าย่อมให้สิทธิตามข้อ 9
                  แห่งสัญญานี้ได้
                </Text>

                <Text style={[styles.text, { top: 210, textAlign: "justify" }]}>
                  ข้อ 8
                  ผู้ให้เช่าไม่ต้องรับผิดชอบในความสูญหายหรือความเสียหายอย่างใดๆ
                  อันเกิดขึ้นแก่รถยนต์รวมทั้งทรัพย์สินต่างๆ ในรถยนต์ของผู้เช่า
                  ซึ่งได้นำมาจอดไว้ในที่จอดรถยนต์ที่ผู้ให้เช่าจัดไว้ให้
                </Text>

                <Text style={[styles.text, { top: 240, textAlign: "justify" }]}>
                  ข้อ 9
                  ผู้เช่าตกลงว่าการผิดสัญญาเช่าเครื่องเรือนซึ่งผู้เช่าได้ทำไว้กับผู้ให้เช่าต่างหากจากสัญญานี้
                  ถือว่าเป็นการผิดสัญญานี้ด้วยและโดยนัยเดียวกัน
                  การผิดสัญญานี้ย่อมถือเป็นการผิดสัญญาเช่าเครื่องเรือนด้วย
                </Text>

                <Text style={[styles.text, { top: 270, textAlign: "justify" }]}>
                  คู่สัญญาได้อ่านและเข้าใจข้อความในสัญญานี้
                  โดยตลอดแล้วเห็นว่าถูกต้อง
                  จึงได้ลงลายมือชื่อไว้เป็นสำคัญต่อหน้าพยาน
                </Text>
                
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Card>
      <TouchableOpacity style={styles.btnSave}>
        <Text style={{ fontSize: "12px", fontWeight: "bold", color: "white" }}>
          Clear
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnClear}>
        <Text style={{ fontSize: "12px", fontWeight: "bold", color: "white" }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  container2: {
    paddingTop: StatusBar.currentHeight,
  },
  cardContainer: {
    backgroundColor: "#f5f6f7",
    zIndex: 100,
    width: "95%",
    height: "85%",
    borderRadius: 30,
    top: 15,
  },
  btnSave: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: 30,
    width: "20%",
    height: 35,
    borderRadius: 30,
    backgroundColor: "#47C5FC",
  },
  btnClear: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    left: 90,
    top: 30,
    width: "20%",
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
