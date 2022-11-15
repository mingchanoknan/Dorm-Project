import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "@ui-kitten/components";
import register from "./Register"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const login = async () => {
    console.log("login : " + username);
    console.log("login : " + password);
    try {
      const result = await axios.get("http://192.168.1.10:8080/login?username=gotenlnwZa2&password=goteneiei")
      console.log(result.data)
    }
    catch (e) {
      console.log(e.message)
    }
  };

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
            width: 260,
            position: "relative",
            top: 200,
          }}
        />
      </View>

      <View style={styles.loginBox}>
        <TextInput
          style={[styles.input]}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
          placeholderTextColor="#6C6363"
          fontWeight="400"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor="#6C6363"
          fontWeight="400"
          keyboardType="default"
        />
        <TouchableOpacity
          style={{
            position: "relative",
            alignSelf: "flex-end",
            marginRight: 20,
            placeholderTextColor: "#6C6363",
          }}
        >
          <Text style={{ fontSize: 18 }}>Forget Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // onPress={onPress}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              color: "white",
              textAlign: "center",
            }}
            onPress={login}
          >
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.create}
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
      </TouchableOpacity>
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
    justifyContent: "center",
    alignSelf: "center",
  },
  header: {
    fontSize: 34,
    letterSpacing: "5px",
    fontWeight: "bold",
    display: "flex",
    position: "relative",
    // textAlign: "center",
    // justifyContent: "center",
    top: 180,
    left: "10%",
  },
  text: {
    fontSize: 25,
    display: "flex",
    position: "relative",
    top: 175,
    left: "10%",
  },
  circle: {
    position: "absolute",
    top: 150,
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    paddingRight: "5%",
  },
  loginBox: {
    width: 320,
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
    top: 300,
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
  },
  create: {
    padding: 10,
    width: 290,
    alignSelf: "center",
    justifyContent: "flex-end",
    display: "flex",
    position: "absolute",
    bottom: 60,
    borderWidth: 3,
    borderColor: "#90AACB",
  },
});
export default Login;
