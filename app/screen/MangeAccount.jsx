import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { baseUrl } from "@env";
import axios from "axios";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

const MangeAccount = () => {
  const user = useSelector((state) => state.user);
  const [id, setId] = React.useState(user._id);
  const [isEditable, setEditable] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [firstname, onChangeFirstname] = useState(user.first_name);
  const [lastname, onChangeLastname] = useState(user.last_name);
  const [address, onChangeAddress] = useState(user.address);
  const [tel1, onChangeTel1] = useState(user.tel_no1);
  const [tel2, onChangeTel2] = useState(user.tel_no2);

  useFocusEffect(
    useCallback(() => {
      const url = `${baseUrl}/news`;

      const fetchUsers = async () => {
        try {
          const response = await axios.get(url);
          if (response.status === 200) {
            // setNews(response.data);
            console.log(response.data);
            return;
          } else {
            throw new Error("Failed");
          }
        } catch (error) {
          console.log("error");
        }
      };
      fetchUsers();
    }, [])
  );

  useEffect(() => {
    console.log("------\n", user);
    console.log("pass", user.password);
    setId(user._id);
    console.log(id);
  }, [user]);

  const edit = () => {
    setEditable(true);
  };

  const submit = async () => {
    const res = await axios.get(`${baseUrl}/getUserById/${id}`);
    let record = { ...res.data };
    record.first_name = firstname;
    record.last_name = lastname;
    record.address = address;
    record.tel_no1 = tel1;
    record.tel_no2 = tel2;

    console.log("--------", record);
    const res2 = await axios.post(`${baseUrl}/updateUser`, record);
    console.log(res2.data);
    if (res2.status === 200) {
      Alert.alert("แก้ไขสำเร็จ", undefined, [
        {
          text: "ปิด",
          onPress: () => {
            setUpdate(false);
          },
        },
      ]);
    } else {
      throw new Error("Failed");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bg_login.jpg")}
        style={styles.background}
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
          onPress={() => {
            edit();
            setUpdate(true);
          }}
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
        <ScrollView style={{ width: 320 }}>
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
                fontSize: 15,
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

          <Text style={[styles.text]}>Tel 1</Text>

          <TextInput
            style={[
              styles.input,
              { backgroundColor: isEditable ? "white" : "rgb(217, 217, 217)" },
            ]}
            onChangeText={onChangeTel1}
            value={tel1}
            // placeholder="0945525308"
            placeholderTextColor="#6C6363"
            fontWeight="400"
            keyboardType="default"
            editable={isEditable}
          />

          <Text style={[styles.text]}>Tel 2</Text>

          <TextInput
            style={[
              styles.input,
              { backgroundColor: isEditable ? "white" : "rgb(217, 217, 217)" },
            ]}
            onChangeText={onChangeTel2}
            value={tel2}
            // placeholder="0945525308"
            placeholderTextColor="#6C6363"
            fontWeight="400"
            keyboardType="default"
            editable={isEditable}
          />
          <View style={[{ flexDirection: "row", justifyContent: "center" }]}>
            {isUpdate ? (
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    marginTop: 10,
                    marginRight: 10,
                    backgroundColor: "white",
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                  onPress={() => {
                    setEditable(false);
                    onChangeFirstname(user.first_name);
                    onChangeLastname(user.last_name);
                    onChangeAddress(user.address);
                    onChangeTel1(user.tel_no1);
                    onChangeTel2(user.tel_no2);
                    setEditable(false);
                    console.log("Cancel Pressed");
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            ) : null}

            {isUpdate ? (
              <TouchableOpacity style={[styles.button, { marginTop: 10 }]}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "white",
                    textAlign: "center",
                  }}
                  onPress={() => {
                    Alert.alert("ยืนยันการแก้ไข", undefined, [
                      {
                        text: "ยืนยัน",
                        onPress: () => {
                          submit();
                          setEditable(false);
                        },
                      },
                      {
                        text: "ยกเลิก",
                        onPress: () => {
                          onChangeFirstname(user.first_name);
                          onChangeLastname(user.last_name);
                          onChangeAddress(user.address);
                          onChangeTel1(user.tel_no1);
                          onChangeTel2(user.tel_no2);
                          setEditable(false);
                          console.log("Cancel Pressed");
                        },
                        style: "cancel",
                      },
                    ]);
                  }}
                >
                  Update Profile
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
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
    width: "90%",
    height: "80%",
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
    top: 70,
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
    marginBottom: 15,
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
    alignSelf: "center",
  },
  text: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 20,
  },
});

export default MangeAccount;
