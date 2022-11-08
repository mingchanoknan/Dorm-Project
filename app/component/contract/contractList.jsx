import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Layout, Text, Divider } from "@ui-kitten/components";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

const ContractList = (props) => {
  // const color2 = props.status;
  // const colorStatus = color2.equals("UNAPPROVED_BILL") ? '#4291FF' : '#F26565';
  return (
    <View style={styles.container}>
      <Card
        style={[styles.cardContainer]}
      >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between'}}>
        <Text style={{fontWeight: "bold", fontSize: "12px"}}> 1 </Text>
        <Text style={[styles.text, {width: "26%", textAlign: "center"}]}>อาภัสรา โมรัษเฐียร</Text>
        <Text style={styles.text}> 2022-04-01 </Text>
        <Text style={styles.text}> 2023-04-01 </Text>
        <Text style={{fontWeight: "bold", width: "20%", fontSize: "12px"}}> {props.data.room_number} </Text>
        <View style={{ flexDirection: "row", width: "5%",}}>
        <TouchableOpacity style={styles.btnLoad}>
          <Text
            style={{ fontSize: "10px", fontWeight: "bold", color: "white" }}
          >
            {" "}
            ดูสัญญา{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNext}>
          <Text
            style={{ fontSize: "10px", fontWeight: "bold", color: "white" }}
          >
            {" "}
            ยกเลิกสัญญา{" "}
          </Text>
        </TouchableOpacity>
        </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    zIndex: 100,
    width: "100%",
    height: 60,
    position: "relative",
    padding: 5,
    display: "flex",
    borderRadius: 0,
    backgroundColor: '#EEEEEE',
  },
  container: {
    width: "100%",
    paddingVertical: 5,
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
  state: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    margin: 5,
    marginTop: -18,
    left: 80,
    top: 63,
  },

  total: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    margin: 5,
    marginTop: -22,
    left: 80,
    top: 90,
  },

  btnLoad: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    // position: "absolute",
    // margin: 25,
    // marginTop: 10,
    // left: 60,
    // top: 100,
    left: -80,
    width: 60,
    height: 25,
    marginRight: 5,
    borderRadius: 30,
    backgroundColor: "#47C5FC",
  },
  btnNext: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    // position: "absolute",
    // margin: 25,
    // marginTop: 10,
    // left: 165,
    // top: 100,
    left: -80,
    width: 70,
    height: 25,
    borderRadius: 30,
    backgroundColor: "#F14668"
  },
  txt: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  text:{
    fontWeight: "bold",
    width: "20%",
    fontSize: "11px"
  }
});

export default ContractList;
