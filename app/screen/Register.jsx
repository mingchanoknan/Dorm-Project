import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Gender from "../component/register/gender";
import Date from "../component/register/datePicker";

const Register = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tel1, setTel1] = React.useState("");
  const [tel2, setTel2] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [roomNo, setRoomNo] = React.useState("");

  const submit = () => {
    // setUsername(username);
    // setPassword(password);
    // setFirstname(firstname);
    console.log("regis : " + username);
    console.log("regis : " + password);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bg_login.jpg")}
        style={styles.background}
      ></Image>

      <Image
        source={require("../assets/user.jpg")}
        style={{
          width: 160,
          height: 160,
          position: "relative",
          alignSelf: "center",
          top: -200,
        }}
      ></Image>

      <View style={[styles.scroll]}>
        <ScrollView>
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
          />
          <TextInput
            style={[styles.input]}
            onChangeText={setFirstname}
            value={firstname}
            placeholder="Firstname"
            placeholderTextColor="#6C6363"
            fontWeight="400"
            keyboardType="default"
          />
          <TextInput
            style={[styles.input]}
            onChangeText={setLastname}
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
          <TextInput
            style={[styles.input]}
            onChangeText={setTel1}
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
          <TextInput
            style={[styles.input]}
            onChangeText={setAddress}
            value={address}
            placeholder="Address"
            placeholderTextColor="#6C6363"
            fontWeight="400"
            keyboardType="default"
            multiline={true}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 12,
            }}
          >
            <Date />
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
                fontSize: 18,
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              ระบุเพศ :
            </Text>
            <Gender />

            <Text
              style={{
                fontWeight: "400",
                color: "#6C6363",
                fontSize: 18,
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              ห้อง :
            </Text>
            <TextInput
              style={[styles.room]}
              onChangeText={setRoomNo}
              value={roomNo}
              placeholder="Room no"
              placeholderTextColor="#6C6363"
              fontWeight="400"
              keyboardType="default"
              textAlign="center"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "500",
                color: "white",
                textAlign: "center",
              }}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
    height: "35%",
    alignSelf: "center",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  scroll: {
    height: 500,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "rgba(255, 255, 255, 0.4)",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    position: "absolute",
    top: 260,
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
    fontSize: 18,
    position: "relative",
    marginBottom: 2,
    alignSelf: "center",
  },
  button: {
    position: "relative",
    // width: 120,
    borderRadius: 80,
    backgroundColor: "#90AACB",
    padding: 13,
    marginTop: 12,
    alignSelf: "center",
  },
  room: {
    height: 45,
    width: 80,
    borderColor: "#90AACB",
    borderWidth: 2,
    borderRadius: 30,
    fontSize: 18,
    position: "relative",
    marginBottom: 2,
    backgroundColor: "white",
  },
});

export default Register;
