import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Box from "../../component/contract/contractList";
import { RENT } from "../../dummy/RENT";

const CancelContract = ({ route, navigation }) => {
    const ALL_ROOM = RENT.filter((item) => item.room_status == 'unavailable');
  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_cancle.png")}
        style={styles.background}
      ></Image>
      <View style={{backgroundColor: '#FFB085', width: '90%', height: '5%', top: -300, flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
        <Text style={styles.text}> ลำดับ </Text>
        <Text style={styles.text}> ชื่อผู้ทำสัญญา </Text>
        <Text style={styles.text}> วันเริ่มทำสัญญา </Text>
        <Text style={styles.text}> วันสิ้นสุดสัญญา </Text>
        <Text style={styles.text}> เลขที่ห้อง </Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </View>
      <View style={{ width: '90%', height: '70%', top: -280}}>
      <ScrollView style={[styles.box, { flex: 1 }]}>
        <View style={[{ alignItems: "center", width: "100%" }]}>
          {ALL_ROOM.map((item, index) => (
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center"}} key={index}>
              <Box data={item} navigation={navigation} />
            </View>
          ))}
        </View>
      </ScrollView>
      </View>
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
    height: "40%",
    zIndex: -100,
    top: "-10%",
    borderRadius: "40%"
  },
  box: {
    zIndex: 100,
    width: "100%"
  },
  text:{
    fontWeight: "bold",
  }
});

export default CancelContract;
