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
import { Card, Layout, Divider } from "@ui-kitten/components";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import DatePicker from "../../component/contract/DatePicker";
import { USERS } from "../../dummy/USERS";

const UserProfile = ({ route, navigation }) => {
    const gender = 'male';
    const detail = USERS.filter(
      (item) => item.room_number == 'A205'
    );
    console.log(detail);
  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_invoice.png")}
        style={styles.background}
      ></Image>
      <Image
        source={gender === 'male' ? require("../../assets/male.png") : require("../../assets/female.png") }
        style={styles.profile}
      ></Image>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#2C76B2",
          position: "absolute",
          top: "26%",
        }}
      >
        {" "}
        {detail[0].first_name}{" "}{detail[0].last_name}
      </Text>
      <Divider
        style={{
          zIndex: 110,
          width: "80%",
          backgroundColor: "#7ED6FF",
          height: 2.5,
          position: "absolute",
          top: "33%",
        }}
      />
      <Layout style={styles.container2}>
        <Layout style={styles.layout}>
          <Ionicons name="md-calendar-sharp" size={24} color="#f5718b" />
          <Text style={{ fontWeight: "bold", left: 10, fontSize: "13px"}}>{detail[0].birth_date}</Text>
        </Layout>

        <Layout style={styles.layout}>
          <MaterialCommunityIcons
            name="gender-male-female"
            size={24}
            color="#f5718b"
          />
          <Text style={{ fontWeight: "bold", left: 10, fontSize: "13px" }}>{detail[0].sex == 'MALE' ? 'ชาย' : 'หญิง'}</Text>
        </Layout>
      </Layout>
      <Layout style={[styles.container2]}>
        <Layout
          style={[styles.layout, { justifyContent: "flex-start", left: 23 }]}
        >
          <Ionicons name="md-location-sharp" size={24} color="#f5718b" />
          <Text style={{ fontWeight: "bold", left: 10, fontSize: "13px" }}>{detail[0].address}</Text>
        </Layout>
      </Layout>
      <Divider
        style={{
          zIndex: 110,
          width: "80%",
          backgroundColor: "#7ED6FF",
          height: 2.5,
          top: "-3%",
        }}
      />

      <Layout style={styles.container3}>
        <Layout style={[styles.layout2]} >
          <Feather name="phone-call" size={24} color="#f5718b" />
          <Layout style={{ flexDirection: "column" }} >
            <Text style={{ fontWeight: "bold", left: 10, fontSize: "13px" }}>{detail[0].phone1}</Text>

            <Text style={{ fontWeight: "bold", left: 10, fontSize: "13px" }}>{detail[0].phone2}</Text>
          </Layout>
        </Layout>

        <Layout style={styles.layout2} >
          <MaterialIcons name="email" size={24} color="#f5718b" />
          <Text style={{ fontWeight: "bold", left: 10, fontSize: "13px" }}>
          {detail[0].email}
          </Text>
        </Layout>
      </Layout>
      
      <View style={{borderWidth: 2, width: "80%", height: "13%", borderRadius: 30, borderColor: "#7ED6FF", top:20, alignItems: "center", justifyContent: "center"}}>
        <View style={{flexDirection: "row"}}>
        <Text style={{ fontWeight: "bold", fontSize: "12px", color: "#2C76B2", marginRight: 10 }}>วันเริ่มสัญญา:</Text>
        {/* <Text style={{ fontWeight: "bold", fontSize: "12px", backgroundColor: "#E2E4E4", width: "20%", padding: 5, borderRadius: "50%" }}></Text> */}
        <DatePicker/>
        </View>
        <View style={{flexDirection: "row", top: 5}}>
        <Text style={{ fontWeight: "bold", fontSize: "12px", color: "#2C76B2", marginRight: 10 }}>วันสิ้นสุดสัญญา:</Text>
        {/* <Text style={{ fontWeight: "bold", fontSize: "12px", backgroundColor: "#E2E4E4", width: "20%", padding: 5, borderRadius: "50%" }}></Text> */}
        <DatePicker/>
        </View>
      </View>
      <Text style={{ fontWeight: "bold", backgroundColor: "white", padding: 3, width: "30%", textAlign: "center", color: "#4291FF", position: "absolute", top: "59%", alignSelf: 'flex-start', left: "20%"}}>ข้อมูลสัญญาเช่า</Text>

      <View style={{borderWidth: 2, width: "80%", height: "13%", borderRadius: 30, borderColor: "#7ED6FF", top:50, alignItems: "flex-start", justifyContent: "center"}}>
        <View style={{flexDirection: "row", left: 20}}>
        <Text style={{ fontWeight: "bold", fontSize: "12px", color: "#2C76B2", marginRight: 10, top:15 }}>คันที่ 1</Text>


            <View style={{flexDirection: "column" }}>
            <Text style={{fontSize: "9px", color: "#9E9E9E", left: 12, bottom:3}}>ทะเบียนยานพาหนะ</Text>
            <TextInput
              style={{
                backgroundColor: "#F5F7F8",
                width: 110,
                height: 30,
                padding: 5,
                borderRadius: 50,
                paddingLeft: 20,
                left: 10
              }}
            >
            </TextInput>
            </View>
            <View style={{flexDirection: "column"}}>
            <Text style={{fontSize: "9px", color: "#9E9E9E", left: 32, bottom:3}}>สีของยานพาหนะ</Text>
            <TextInput
              style={{
                backgroundColor: "#F5F7F8",
                width: 110,
                height: 30,
                padding: 5,
                borderRadius: 50,
                paddingLeft: 20,
                left: 25
              }}
            >
            </TextInput>
            </View>
        </View>
        

        
      </View>
      <Text style={{ fontWeight: "bold", backgroundColor: "white", padding: 3, width: "30%", textAlign: "center", color: "#4291FF", position: "absolute", top: "76%", alignSelf: 'flex-start', left: "20%"}}>ข้อมูลยานพาหนะ</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    width: "80%",
    height: "4%",
    top: "-10%",
    flexDirection: "row",
  },
  container3: {
    width: "80%",
    height: "10%",
    flexDirection: "column",
    top: "-1%"
  },
  layout: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  layout2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    left: 20
  },
  container: {
    minHeight: 128,
  },
  view: {
    backgroundColor: "white",
    alignItems: "center",
    height: "100%",
  },
  background: {
    width: "100%",
    height: "40%",
    zIndex: -100,
    top: "-20%",
  },
  profile: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    zIndex: 100,
    position: "absolute",
    top: "14%",
    borderWidth: 5,
    borderColor: "white",
  },
});

export default UserProfile;
