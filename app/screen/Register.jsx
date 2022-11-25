import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Gender from "../component/register/gender";
import Date from "../component/register/datePicker";
import { baseUrl } from "@env";
import axios from "axios";
import { StackActions } from "@react-navigation/native";

const Register = ({ route, navigation }) => {
  const { first_name, last_name, categoryTitle, address1, tel_no1, categoryId } = route.params;
  const [firstname, setFirstname] = useState(first_name);
  const [lastname, setLastname] = useState(last_name);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [address, setAddress] = useState(address1);
  const [email, setEmail] = useState("");
  const [tel1, setTel1] = useState(tel_no1);
  const [tel2, setTel2] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState(null);
  const [sex, setSex] = useState(null);
  const [roomNo, setRoomNo] = useState(categoryTitle);
  const [role, setRole] = useState("tenant");
  console.log(first_name);
  class user {
    constructor() {
      this.username = "";
      this.password = "";
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.tel_no1 = "";
      this.tel_no2 = "";
      this.address = "";
      this.sex = "";
      this.birthdate = "";
      this.age = "";
      this.room_number = "";
      this.role = "";
    }
    username;
    password;
    first_name;
    last_name;
    email;
    tel_no1;
    tel_no2;
    address;
    sex;
    birthdate;
    age;
    room_number;
    role;
  }

  const Submit = async () => {
    let record = new user();
    record.username = username;
    record.password = password;
    record.first_name = firstname;
    record.last_name = lastname;
    record.email = email;
    record.tel_no1 = tel1;
    record.tel_no2 = tel2;
    record.address = address;
    record.sex = sex;
    record.birthdate = birthdate;
    record.age = age;
    record.room_number = roomNo;
    record.role = role;

    console.log(record);
    const res = await axios.post(`${baseUrl}/addUser`, record);
    if (res.data === false) {
      Alert.alert("username นี้ถูกใช้ไปแล้ว", undefined, [
        {
          text: "ปิด",
          onPress: () => {
            // setTitle("");
            // setText("");
            // setVisible(false);
          },
        },
      ]);
    } else if (res.data === true) {
      Alert.alert("ลงทะเบียนสำเร็จ", undefined, [
        {
          text: "ปิด",
          onPress: () => {
            setUsername(null);
            setPassword(null);
            setFirstname("");
            setLastname("");
            setEmail("");
            setTel1("");
            setTel2("");
            setAddress("");
            setBirthdate("");
            setAge(null);
            setSex(null);
            setRoomNo("");
            navigation.dispatch(
              StackActions.replace("UserProfile", {
                categoryId: categoryId,
                categoryTitle: roomNo,
              })
            );
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bg_login.jpg")}
        style={styles.background}
      ></Image>

      <View style={[styles.scroll]}>
        <ScrollView style={{flex: 1}}>
          {/* USERNAME */}
          <TextInput
            style={[styles.input]}
            onChangeText={setUsername}
            value={username}
            textContentType="username"
            placeholder="Username"
            placeholderTextColor="#6C6363"
            fontWeight="400"
            keyboardType="default"
          />
          {/* PASSWORD */}
          <TextInput
            style={[styles.input]}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#6C6363"
            fontWeight="400"
            keyboardType="default"
            secureTextEntry={true}
          />
          <TextInput editable={false}
            style={[styles.input]}
            value={firstname}
            placeholder="Firstname"
            placeholderTextColor="#6C6363"
            fontWeight="400"
            keyboardType="default"
          />
          <TextInput editable={false}
            style={[styles.input]}
            value={lastname}
            placeholder="Lastname"
            placeholderTextColor="#6C6363"
            fontWeight="400"
            keyboardType="default"
          />
          <TextInput
            style={[styles.input]}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#6C6363"
            fontWeight="400"
            keyboardType="default"
          />
          <TextInput editable={false}
            style={[styles.input]}
            value={tel1}
            placeholder="Tel no."
            placeholderTextColor="#6C6363"
            fontWeight="400"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input]}
            onChangeText={setTel2}
            value={tel2}
            placeholder="Tel no."
            placeholderTextColor="#6C6363"
            fontWeight="400"
            keyboardType="numeric"
          />
          <TextInput editable={false}
            style={[styles.input]}
            value={address}
            placeholder="Address"
            placeholderTextColor="#6C6363"
            keyboardType="default"
            multiline={2}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 12,
            }}
          >
            <Date
              onData={(age) => {
                setAge(age);
              }}
              onDate={(date) => {
                setBirthdate(date);
                console.log(birthdate);
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: 12,
              marginRight: 12,
            }}
          >
            <Text
              style={{
                fontWeight: "400",
                color: "#6C6363",
                fontSize: 12,
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              ระบุเพศ :
            </Text>
            <Gender 
              onGender={(sex) => {
                if (sex == 0) {
                  setSex("female");
                } else if (sex == 1) {
                  setSex("male");
                }
              }}
            />

            <Text
              style={{
                fontWeight: "400",
                color: "#6C6363",
                fontSize: 12,
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              ห้อง :
            </Text>
            <TextInput editable={false}
              style={[styles.room]}
              value={roomNo}
              placeholder="Room no"
              placeholderTextColor="#6C6363"
              fontWeight="400"
              keyboardType="default"
              textAlign="center"
            />
          </View>
        </ScrollView>
        <View style={{ padding: 5, marginBottom: 10 ,flexDirection:'row',justifyContent:'space-between'}}>
          {/* <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 10 }} onPress={() => {
            navigation.dispatch(
              StackActions.replace("DetailReserve", {
                categoryId: categoryId,
                categoryTitle: roomNo,
              })
            );
        }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "500",
                color: "red",
                textAlign: "center",
              }}
            >
              CANCEL
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={{flex: 0.15, width: "100%", justifyContent: "center", alignItems: "flex-end"}}>
          <TouchableOpacity style={styles.button} onPress={Submit}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: "white",
                textAlign: "center",
              }}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: "space-between",
    display: "flex",
    height: "100%",
    felx: 1,
    alignItems: "center",
    backgroundColor: "rgba(230, 248, 253, 0.8)",
  },
  background: {
    width: "100%",
    height: "30%",
    alignSelf: "center",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    position: "absolute"
  },
  scroll: {
    flex: 0.8,
    marginTop: "10%",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "rgba(255, 255, 255, 0.4)",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 10,
    
  },
  input: {
    height: 45,
    width: 260,
    margin: 12,
    backgroundColor: "white",
    borderColor: "#90AACB",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    fontSize: 12,
    position: "relative",
    marginBottom: 2,
    alignSelf: "center",
  },
  button: {
    borderRadius: 80,
    backgroundColor: "#90AACB",
    padding: 13,
    alignSelf: "flex-end",
    marginRight : "12%"
  },
  room: {
    height: 45,
    width: 80,
    borderColor: "#90AACB",
    borderWidth: 2,
    borderRadius: 30,
    fontSize: 12,
    position: "relative",
    marginBottom: 2,
    backgroundColor: "white",
  },
});

export default Register;
