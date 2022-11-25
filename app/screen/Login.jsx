import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "@ui-kitten/components";
import register from "./Register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../storeRedux/action/userAction";
import axios from "axios";
import { baseUrl } from "@env";
import { Icon, Input } from "@ui-kitten/components";

const  Login = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(user);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const comFirmLogin = async () => {
    console.log(baseUrl + "/login")
    setUsername(username);
    setPassword(password);
    try {
      const result = await axios.get(baseUrl + "/login", {
        params: {
          username,
          password,
        },
      });
      console.log(result.data)
      if (!result.data) {
        console.log("Login ไม่สำเร็จ")
        Alert.alert("Login ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", undefined, [
          {
            text: "ปิด",
            onPress: () => {
            },
          },
        ]);
      } else if (result.data) {
        console.log("------------\nLogin!\n------------\n", result.data,"\n-----------------------------------")
        Alert.alert("Login สำเร็จ", undefined, [
          {
            text: "ปิด",
            onPress: () => {
            },
          },
        ]);
        props.setUserFromApp(result.data);
        dispatch(setUser({ ...result.data }));
      }
    } catch (e) {
      console.log(e);
      if(e.message === "Request failed with status code 500"){
        Alert.alert("Cant find this username", undefined, [
          {
            text: "ปิด",
            onPress: () => {
            },
          },
        ]);
      }
    }
  };
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
      />
    </TouchableWithoutFeedback>
  );
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bg_login.jpg")}
        style={styles.background}
      ></Image>

      <View style={styles.circle}>
        <FontAwesome name="circle" color={"red"} size={20}></FontAwesome>
        <FontAwesome name="circle" color={"grey"} size={20}></FontAwesome>
        <FontAwesome name="circle" color="#FFBD4A" size={20}></FontAwesome>
      </View>

      <View style={styles.box}>
        <Text style={[styles.header]}>DORMITORY</Text>
        <Text style={[styles.text]}>หอ A5</Text>
        <Divider
          style={{
            height: 3,
            color: "yellow",
            width: "100%",
            top: "170%",
          }}
        />
      </View>

      <View style={styles.loginBox}>
        <Input
          style={[styles.input]}
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="Username"
          placeholderTextColor="#6C6363"
          fontWeight="400"
          keyboardType="default"
        />
        <Input
          style={styles.input}
          secureTextEntry={secureTextEntry}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          placeholderTextColor="#6C6363"
          fontWeight="400"
          keyboardType="default"
          accessoryRight={renderIcon}
        />
        <TouchableOpacity
          style={{
            position: "relative",
            alignSelf: "flex-end",
            marginRight: 20,
            placeholderTextColor: "#6C6363",
          }}
        >
          <Text style={{ fontSize: "15%" }}>Forget Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={comFirmLogin}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              color: "white",
              textAlign: "center",
            }}
          >
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        style={styles.create}
        onPress={() => props.setIsLogin(false)}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: "#90AACB",
            textAlign: "center",
          }}
        >
          Create New Account
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    display: "flex",
    height: "100%",
    // position: "relative",
    // felx: 1,
  },
  background: {
    width: "100%",
    height: "50%",
    alignSelf: "center",
  },
  box: {
    position: "absolute",
    // justifyContent: "center",
    alignSelf: "center",
  },
  header: {
    fontSize: 34,
    letterSpacing: "5px",
    fontWeight: "bold",
    display: "flex",
    // textAlign: "center",
    // justifyContent: "center",
    top: "160%",
    left: "10%",
  },
  text: {
    fontSize: 25,
    display: "flex",
    top: "160%",
    left: "10%",
  },
  circle: {
    position: "absolute",
    top: 100,
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    paddingRight: "5%",
  },
  loginBox: {
    width: "90%",
    height: 310,
    shadowColor: "#000000",
    shadowOffset: {
      width: 2,
      height: 6,
    },
    borderWidth: 0.3,
    shadowOpacity: 0.27,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: "rgba(230, 248, 253, 0.8)",
    justifyContent: "center",
    alignSelf: "center",
    top: "35%",
  },
  input: {
    height: 45,
    margin: 12,
    borderColor: "#90AACB",
    borderWidth: 3,
    borderRadius: 20,
    padding: 10,
    fontSize: 18,
  },
  button: {
    position: "relative",
    alignSelf: "center",
    marginTop: 30,
    width: 100,
    borderRadius: 80,
    backgroundColor: "#90AACB",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  create: {
    padding: 10,
    width: 290,
    alignSelf: "center",
    justifyContent: "flex-end",
    display: "flex",
    position: "absolute",
    bottom: "5%",
    borderWidth: 3,
    borderColor: "#90AACB",
  },
});
export default Login;
