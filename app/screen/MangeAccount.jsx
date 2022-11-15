import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const MangeAccount = () => {
  const [isEditable, setEditable] = useState(false);
  const [firstname, onChangeFirstname] = React.useState("Pleng");
  const [lastname, onChangeLastname] = React.useState("Piplengx");
  const [address, onChangeAddress] = React.useState(
    "683 หอพัก jia jia place ห้อง 1411 ซ.ฉลองกรุง1 แยก6 ถ.ฉลองกรุง แขวงลาดกระบัง เขตลาดกระบัง จ.กทม 10520"
  );
  const [tel, onChangeTel] = React.useState("0945525308");

  const edit = () => {
    // console.log("before : " + firstname)
    // console.log("before : " + lastname)
    setEditable(true);
  };

  const submit = () => {
    setEditable(false);
    // console.log("after : " + firstname)
    // console.log("after : " + lastname)
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
          width: 180,
          height: 180,
          position: "relative",
          alignSelf: "center",
          top: -290,
        }}
      ></Image>

      <View style={styles.box}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "white",
              alignSelf: "flex-end",
              marginRight: 10,
            },
          ]}
          onPress={edit}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              color: "black",
              textAlign: "center",
            }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>

        <Text style={[styles.text]}>Firstname</Text>

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isEditable ? "white" : "rgb(217, 217, 217)" },
          ]}
          onChangeText={onChangeFirstname}
          value={firstname}
          // placeholder="pleng"
          fontWeight="400"
          keyboardType="default"
          editable={isEditable}
        />

        <Text style={[styles.text]}>Lastname</Text>

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isEditable ? "white" : "rgb(217, 217, 217)" },
          ]}
          onChangeText={onChangeLastname}
          value={lastname}
          // placeholder="piplengx"
          fontWeight="400"
          keyboardType="default"
          editable={isEditable}
        />

        <Text style={[styles.text]}>Address</Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isEditable ? "white" : "rgb(217, 217, 217)",
              paddingTop: 10,
              fontSize:15,
            },
          ]}
          onChangeText={onChangeAddress}
          value={address}
          // placeholder="683 หอพัก jia jia place ห้อง 1411 ซ.ฉลองกรุง1 แยก6 ถ.ฉลองกรุง แขวงลาดกระบัง เขตลาดกระบัง จ.กทม 10520"
          fontWeight="400"
          keyboardType="default"
          multiline={true}
          editable={isEditable}
          numberOfLines={3}
          height={70}
        />

        <Text style={[styles.text]}>Tel</Text>

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isEditable ? "white" : "rgb(217, 217, 217)" },
          ]}
          onChangeText={onChangeTel}
          value={tel}
          // placeholder="0945525308"
          placeholderTextColor="#6C6363"
          fontWeight="400"
          keyboardType="default"
          editable={isEditable}
        />

        <TouchableOpacity style={[styles.button, { marginTop: 10 }]}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "white",
              textAlign: "center",
            }}
            onPress={submit}
          >
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    felx: 1,
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "45%",
    alignSelf: "center",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  box: {
    width: 320,
    height: 490,
    paddingTop: 20,
    shadowColor: "000000",
    shadowOffset: {
      width: 2,
      height: 6,
    },
    borderWidth: 1,
    shadowOpacity: 0.27,
    borderRadius: 40,
    borderColor: "rgb(217, 217, 217)",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "flex-start",
    alignItems: "center",
    top: 280,
    zIndex: 1,
  },
  button: {
    position: "relative",
    alignSelf: "center",
    borderColor: "#FFB085",
    borderWidth: 3,
    borderRadius: 80,
    backgroundColor: "#FFB085",
    padding: 7,
  },
  input: {
    height: 45,
    width: 280,
    marginBottom: 12,
    borderColor: "rgb(217, 217, 217)",
    backgroundColor: "rgb(217, 217, 217)",
    borderWidth: 3,
    borderRadius: 20,
    padding: 10,
    fontSize: 15,
  },
  text: {
    fontSize: 15,
    alignSelf: "flex-start",
    paddingLeft: 30,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default MangeAccount;
