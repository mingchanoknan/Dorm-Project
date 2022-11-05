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
import TableBill from "../../component/invoice/tableBill";

const BillInvoice = ({ route, navigation }, props) => {
  const { categoryTitle } = route.params;
  const [data, setData] = useState();
  useEffect(() => {
    let get = INVOICE.filter((item) => item.room_number == categoryTitle)[0];
    setData(get);
  }, [categoryTitle]);
  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_invoice.png")}
        style={styles.background}
      ></Image>

      {data && (
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
                ห้อง E205 05/2022
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
              }}
            >
              <TableBill invoice={data} />
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
                  padding: 15,
                  borderRadius: 15,
                  width: "106%",
                }}
              >
                <Text style={[styles.txtHead, { fontSize: "10px" }]}>
                  {" "}
                  หมายเหตุ:{" "}
                </Text>
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
        </View>
      )}
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
});
export default BillInvoice;
