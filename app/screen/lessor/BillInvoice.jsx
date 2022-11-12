import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity, TextInput
} from "react-native";
import { Card, Layout, Divider } from "@ui-kitten/components";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { INVOICE } from "../../dummy/INVOICE";
import TableBill from "../../component/invoice/tableBill";
import axios from 'axios';

const baseUrl ='http://192.168.1.117:8080';
function User({userObject}) {
  //console.log(userObject.dorm_fee);
  return (
    <View style={styles.container}>
    { userObject && (
      <Card style={[styles.cardContainer]} disabled={true}>
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
                ห้อง {userObject.room_number} 05/2022
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
                <Text style={styles.txtHead}> ชื่อ คุณ Somsak </Text>
                <Text style={styles.txtHead}> เบอร์โทร : 0622108493 </Text>
                <Text style={styles.txtHead}> เบอร์โทรสำรอง : </Text>
              </View>

              <View style={styles.status}>
                <View style={styles.conStatus}>
                  <Text style={styles.txtHead}> สถานะบิล</Text>
                  <Text
                    style={[styles.txtHead, { color: "red", marginLeft: 20 }]}
                  >
                    {" "}
                    ชำระแล้ว
                  </Text>
                </View>

                <View style={styles.send}>
                  <View style={styles.conSend}>
                    <Text style={[styles.txtHead]}>
                      {" "}
                      บิลจะถูกส่งไปให้ผู้เช่า{" "}
                    </Text>
                  </View>
                  <Text style={[styles.txtHead, { fontSize: "10px" }]}>
                    {" "}
                    Somsak Deena
                  </Text>
                  <Text style={[styles.txtHead, { fontSize: "10px" }]}>
                    {" "}
                    0622108493{" "}
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
              {/* <TableBill invoice={userObject} /> */}
              <View style={{backgroundColor: '#e3effa', height: '13%', borderRadius: "10%", flexDirection: "row", justifyContent: "space-around", alignItems: "center",}}>
                  <View>
                  <Text style={{fontSize: "12px",fontWeight: "bold"}}>รายการ</Text>
                  </View>
                  <View>
                  <Text  style={{fontSize: "12px",fontWeight: "bold"}}>จำนวนเงิน</Text>
                  </View>
              </View>
              <View style={{ backgroundColor: '#f6f8fa', height: '90%', top: "-5%", zIndex: -100, flexDirection: "row", }}>
                  <View style={{  flexDirection: "column",  height: "100%", width: "50%", zIndex: 100, justifyContent: "space-around", padding: 10, paddingTop: "5%"}}>
                    <Text style={{fontSize: "12px",fontWeight: "bold"}}>ค่าเช่าห้อง(Room rate)</Text>
                    <Text style={{fontSize: "12px",fontWeight: "bold"}}>ค่าน้ำ(Water rate)</Text> 
                    <Text style={{fontSize: "12px",fontWeight: "bold"}}>ค่าไฟฟ้า(Electrical rate)</Text>
                    <Text style={{fontSize: "12px",fontWeight: "bold"}}>ค่าส่วนกลาง(dorm free)</Text>
                    <Text style={{fontSize: "12px",fontWeight: "bold"}}>ค่าใช้จ่ายเพิ่มเติม</Text>
                    <Text style={{fontSize: "12px",fontWeight: "bold"}}>เงินรวมก่อนภาษี</Text>
                    <Text style={{fontSize: "12px",fontWeight: "bold"}}>ภาษีมูลค่าเพิ่ม 7 %</Text>
                    <Text style={{fontSize: "12px",fontWeight: "bold"}}>รวมสุทธิ</Text>
                  </View>
                  <View style={{  flexDirection: "column",  height: "100%", width: "50%", zIndex: 100, justifyContent: "space-around", padding: 10, paddingTop: "6%"}}>
                      <TextInput style={styles.txtInput}>฿ {userObject.dorm_fee}</TextInput>
                      <TextInput style={styles.txtInput}>฿ {""}</TextInput>
                      <TextInput style={styles.txtInput}>฿ {""}</TextInput>
                      <TextInput style={styles.txtInput}>฿ {""}</TextInput>
                      <TextInput style={styles.txtInput}>฿{""}</TextInput>
                      <TextInput style={styles.txtInput}>฿ {""}</TextInput>
                      <TextInput style={styles.txtInput}>฿ {""}</TextInput>
                      <TextInput style={styles.txtInput}>฿ {""}</TextInput>
                  </View>
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                width: "100%",
                marginLeft: 12,
                top: "208%",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  backgroundColor: "#EEEEEE",
                  padding: 10,
                  borderRadius: 15,
                  width: "106%",
                  flexDirection: "row"
                }}
              >
                <Text style={[styles.txtHead, { fontSize: "10px" }]}>
                  {" "}
                  หมายเหตุ:{" "}
                </Text>
                <TextInput style={{fontSize: "10px", padding: 2, paddingLeft: 5, top:-4, width: "80%", height: 25}} placeholder="กรอกข้อความที่นี่(ถ้ามี)"></TextInput>
              </View>
            </View>
            <TouchableOpacity
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
                ส่งบิล{" "}
              </Text>
            </TouchableOpacity>
          </Card>
    )}
          
        </View>
  );
}

const BillInvoice = ({ route, navigation }, props) => {
  const { categoryTitle } = route.params;
  const [data, setData] = useState();
  const [user, setUser] = useState(null);
  const [invoice, setInvoice] = useState(null);
  useEffect(() => {
    // const response = axios.get(`${baseUrl}/invoices`);
    // setInvoice(response);
    // console.log(response);
    const url = `${baseUrl}/getInvoiceNum/${categoryTitle}`;
    console.log("test");
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setInvoice(response.data);
          //console.log(response.data);
          // console.log("1"+categoryTitle);
          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
          console.log('Data fetching cancelled');
      }
      
    };
    fetchUsers();
    // console.log(invoice);
    // let get = invoice.filter((item) => item.room_number == categoryTitle)[0];
    // setData(get);
    // console.log("2"+categoryTitle);
  }, [categoryTitle]);
  console.log(invoice);
  // useEffect(() => {
    
  //     axios.get(`${baseUrl}/invoices`)
  //     .then((response) => {
  //       setUser(response.data[0]);
  //       console.log(response.data[0]);
  //     })
  //     .catch(
  //       (error) => console.log('error')
  //     )
  // }, []);
  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_invoice.png")}
        style={styles.background}
      ></Image>
       <User userObject={invoice} />
      
    </View>
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
    width: 85,
    padding: 8,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#FFB085",
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
    borderWidth:1, padding: 3, paddingLeft: 5, borderRadius: 5,  borderColor: "#bedefa", width: "60%", height: 30, fontSize: "11px", fontWeight: 'bold', color: '#2D83FC'
  }
});
export default BillInvoice;
