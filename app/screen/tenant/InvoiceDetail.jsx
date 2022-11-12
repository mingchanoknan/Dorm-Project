import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card, Layout, Divider } from "@ui-kitten/components";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { INVOICE } from "../../dummy/INVOICE";
import TableInvoice from "../../component/invoice/tableInvoice";
import axios from 'axios';

const baseUrl ='http://10.111.2.109:8080';
function User({userObject, navigation}) {
  //console.log(userObject.dorm_fee);
  return (
    <View style={styles.container1}>
      {userObject && (
        <View style={styles.bg_money}>
          <Text
            style={{
              color: "#2D83FC",
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "32px",
            }}
          >
            ฿{userObject.total.toFixed(2)}
          </Text>
          <Text
            style={{
              color: "#777777",
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "12px",
              top: 6,
            }}
          >
            วันครบกำหนดชำระ 10 พ.ศ. 2022
          </Text>
        </View>
      )}

      {userObject && (
      <View style={styles.container}>
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
              ห้อง {userObject.room_number} {userObject.month}/{userObject.year}
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
                  {userObject.status === 'APPROVED_BILL' ? 'ชำระแล้ว' : 'ยังไม่ชำระ'}{" "}
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
              top: "85%",
            }}
          >
            <TableInvoice invoice={userObject}/>
          </View>
          <View
            style={{
              position: "absolute",
              width: "100%",
              marginLeft: 12,
              top: "208ssssssssssssssss%",
            }}
          >
            <View
              style={{
                position: "absolute",
                backgroundColor: "#EEEEEE",
                padding: 15,
                borderRadius: 15,
                width: "106%",
              }}
            >
              <Text style={[styles.txtHead, { fontSize: "10px" }]}>
                {" "}
                หมายเหตุ:{" "}{userObject.note}
              </Text>
            </View>
            <Text
              style={[
                styles.txtHead,
                { fontSize: "10px", color: "#F26565", top: 50, left: 20 },
              ]}
            >
              *หากชำระล่าช้าจะถูกทบในเดือนถัดไป{" "}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btnLoad}
            onPress={() => navigation.navigate("Payment", { id: userObject.id, total: userObject.total})}
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
        </Card>
      </View>
      )}
    </View>
  )
};

const InvioveDetail = ({ route, navigation }, props) => {
  const { id } = route.params;
  const { categoryTitle } = route.params;
  const [data, setData] = useState();
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
  //   let get = INVOICE.filter((item) => item.id == id)[0];
  //   setData(get);
  // }, [id]);
  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_invoice.png")}
        style={styles.background}
      ></Image>
      <User userObject={invoice} navigation={navigation} />
      
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
    width: 300,
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
  container1: {
  },
  container: {
    width: "90%",
    paddingVertical: 10,
    top: -250,
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
    top: "230%",
    left: "85%",
    width: 85,
    padding: 8,
    position: "absolute",
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
});
export default InvioveDetail;
