import React, { useState, useEffect } from "react";
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
import { Card, Layout, Divider,  TabBar } from "@ui-kitten/components";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import DatePicker from "../../component/contract/DatePicker";
import { USERS } from "../../dummy/USERS";
import axios from "axios";

const baseUrl = "http:/192.168.1.117:8080";
function User({ userObject, navigation }) {
  //console.log(userObject.dorm_fee);
  return (
    <View style={styles.view2}>
      {userObject && (
        <Image
          source={
            userObject.sex === "male"
              ? require("../../assets/male.png")
              : require("../../assets/female.png")
          }
          style={styles.profile}
        ></Image>
      )}
      {userObject && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#2C76B2",
            alignSelf: "center",
            top: "-8%",
          }}
        >
          {" "}
          {userObject.first_name} {userObject.last_name}
        </Text>
      )}
      {/* <Divider
        style={{
          zIndex: 110,
          width: "80%",
          backgroundColor: "#7ED6FF",
          height: 2.5,
          alignSelf: "center",
          top: "-3%",
        }}
      /> */}
     
      {userObject && (
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
      )}

      {userObject && (
        <Layout style={[styles.container4, { width: "76%" }]}>
          <Layout
            style={[
              styles.layout,
              { justifyContent: "flex-start", left: "18%" },
            ]}
          >
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
      )}
      
      {/* <Divider
        style={{
          zIndex: 110,
          width: "80%",
          backgroundColor: "#7ED6FF",
          height: 2.5,
          alignSelf: "center",
          top: "8%",
        }}
      /> */}
      {userObject && (
        <Layout style={styles.container3}>
          <Layout style={[styles.layout2]}>
            <Feather name="phone-call" size={24} color="#f5718b" />
            <Layout style={{ flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold", left: 10, fontSize: "13px" }}>
                {userObject.tel_no1}
              </Text>

              <Text style={{ fontWeight: "bold", left: 10, fontSize: "13px" }}>
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
      )}
      <Text
        style={{
          fontWeight: "bold",
          backgroundColor: "white",
          padding: 3,
          width: "30%",
          textAlign: "center",
          color: "#4291FF",
          top: "13%",
          alignSelf: "flex-start",
          left: "20%",
          zIndex: 100
        }}
      >
        ข้อมูลสัญญาเช่า
      </Text>
      <View
        style={{
          borderWidth: 2,
          width: "85%",
          height: "25%",
          borderRadius: 30,
          borderColor: "#7ED6FF",
          top: "10%",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
      
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "12px",
              color: "#2C76B2",
              marginRight: 10,
            }}
          >
            วันเริ่มสัญญา:
          </Text>
          {/* <Text style={{ fontWeight: "bold", fontSize: "12px", backgroundColor: "#E2E4E4", width: "20%", padding: 5, borderRadius: "50%" }}></Text> */}
          <DatePicker />
        </View>
        <View style={{ flexDirection: "row", top: 5 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "12px",
              color: "#2C76B2",
              marginRight: 10,
            }}
          >
            วันสิ้นสุดสัญญา:
          </Text>
          {/* <Text style={{ fontWeight: "bold", fontSize: "12px", backgroundColor: "#E2E4E4", width: "20%", padding: 5, borderRadius: "50%" }}></Text> */}
          <DatePicker />
        </View>
      </View>
      
      <Text style={{ fontWeight: "bold", backgroundColor: "white", padding: 3, width: "35%", textAlign: "center", color: "#4291FF", top: "15%", alignSelf: 'flex-start', left: "17%", zIndex: 100}}>ข้อมูลยานพาหนะ</Text>
      <View style={{borderWidth: 2, width: "85%", height: "20%", borderRadius: 30, borderColor: "#7ED6FF", top:"12%", alignItems: "flex-start", justifyContent: "center", alignSelf: "center"}}>
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
      
    </View>
  );
}
const UserProfile = ({ route, navigation }) => {
  // const detail = USERS.filter(
  //   (item) => item.room_number == 'A205'
  // );
  // console.log(detail);
  const { id } = route.params;
  const { categoryTitle } = route.params;
  const [data, setData] = useState();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    // const response = axios.get(`${baseUrl}/invoices`);
    // setInvoice(response);
    // console.log(response);
    const url = `${baseUrl}/getUserNum/${categoryTitle}`;
    console.log("test");
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setInvoice(response.data);
          console.log(response.data);
          // console.log("1"+categoryTitle);
          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.log("Data fetching cancelled");
      }
    };
    fetchUsers();
    // console.log(invoice);
    // let get = invoice.filter((item) => item.room_number == categoryTitle)[0];
    // setData(get);
    // console.log("2"+categoryTitle);
  }, [categoryTitle]);
  //console.log(invoice);
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
  container2: {
    flexDirection: "row",
    //backgroundColor: 'red',
    justifyContent: "space-around",
  },
  container4: {
    top: "2%",
    flexDirection: "row",
  },
  container3: {
    height: "18%",
    flexDirection: "column",
    top: "12%",
    left: "14%",
  },
  layout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  layout2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    minHeight: 128,
  },
  view: {
    backgroundColor: "white",
    alignItems: "center",
    height: "100%",
    flex: 1,
  },
  view2: {
    // backgroundColor: "red",
    flex: 1,
    width: "90%",
    top: "-10%",
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
    top: "-30%",
    alignSelf: "center",
    borderWidth: 5,
    borderColor: "white",
  },
});

export default UserProfile;
