import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Card, Layout, Divider } from "@ui-kitten/components";
import DatePicker from "../../component/contract/DatePicker";
import { RESERVE } from "../../dummy/RESERVE";
import {baseUrl} from "@env";
import axios from "axios";
import { StackActions } from "@react-navigation/native";

function User({ roomNumber, userObject, navigation }) {
  const [status, setStatus] = useState("available");
  const [cancleStatus, setCancleStatus] = useState("cancle");
  const  onCancleFormHandler = async (event) => {
    try {
      const cancle = await axios.put(`${baseUrl}/updateStatusReserve/${userObject._id}/${cancleStatus}`);
        // console.log(cancleReserve);
        // console.log(status);
        // console.log(userObject._id);
        const update =await axios.put(`${baseUrl}/updateStatus/${roomNumber}/${status}`);
        //console.log(reserve_date.toISOString().slice(0, 9));

      if (update.status === 200 && cancle.status === 200) {
        alert("ยกเลิกการจองสำเร็จ");
        navigation.dispatch(StackActions.replace("CheckRoomsStatus", {categoryTitle: roomNumber}))
      } else {
        throw new Error("An error cancle");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View>
    {userObject && (
      <View style={{ flexDirection: "row", top: "15%" }}>
        <Text style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}>
          ชื่อผู้จอง :
        </Text>
        <View style={{ backgroundColor: "#F5F7F8",
            width: "35%",
            padding: 5,
            borderRadius: 50,
            paddingLeft: 20,
            marginRight: 10,}}>
          <Text style={{ fontSize: "12.5px",color: "#8f8d8d"}}>{userObject.first_name}</Text>
        </View>

        <Text style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}>
          นามสกุล
        </Text>
        <View
          style={{
            backgroundColor: "#F5F7F8",
            width: "33%",
            padding: 5,
            borderRadius: 50,
            paddingLeft: 20,
          }}
        >
          <Text style={{ fontSize: "12.5px", color: "#8f8d8d" }}>{userObject.last_name}</Text>
        </View>
      </View>
      )}

      {userObject && (
      <View style={{ display: "flex", flexDirection: "row", top: "20%" }}>
        <Text style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}>
          เบอร์โทร :
        </Text>
        <View
          style={{
            backgroundColor: "#F5F7F8",
            width: "33%",
            padding: 5,
            borderRadius: 50,
            paddingLeft: 20,
            marginRight: 10,
          }}
        >
          <Text style={{ fontSize: "12.5px", color: "#8f8d8d" }}>{userObject.mobile}</Text>
        </View>
      </View>
      )}

      {userObject && (
      <View style={{ display: "flex", flexDirection: "row", top: "25%" }}>
        <Text style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}>
          วันเข้านัดทำสัญญา :
        </Text>
        <View editable={true}
          style={{
            backgroundColor: "#F5F7F8",
            width: "35%",
            padding: 5,
            borderRadius: 50,
            paddingLeft: 20,
            marginRight: 10,
          }}
        >
          <Text style={{ fontSize: "12.5px", color: "#8f8d8d" }}>{userObject.lease_date}</Text>
        </View>

      </View>
      )}

      {userObject && (
      <View style={{ flexDirection: "row", alignSelf: "center", top: "40%" }}>
        <TouchableOpacity
          style={styles.btnContract}
          onPress={() => {
            navigation.navigate("LeaseContract", {
              categoryId: userObject._id,
              categoryTitle: userObject.room_number,
              reserveFname: userObject.first_name,
              reserveLname: userObject.last_name,
            });
          }}
        >
          <Text
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            {" "}
            ทำสัญญา{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnCancle, { marginLeft: 5 }]} onPress={onCancleFormHandler}>
          <Text
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#F26565",
              textAlign: "center",
            }}
          >
            {" "}
            ยกเลิกการจอง{" "}
          </Text>
        </TouchableOpacity>
      </View>
      )}
    </View>
  );
}
const DetailReserve = ({ route, navigation }) => {
  const { categoryTitle , categoryId} = route.params;
  const [reserve, setReserve] = useState(null);

  useEffect(() => {
    const url = `${baseUrl}/getReserveNum/${categoryTitle}`;
    console.log("DetailReserve");
    console.log(url);
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setReserve(response.data[0]);
          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.log("Data fetching cancelled detail");
      }
    };
    fetchUsers();

  }, [categoryTitle]);
  //console.log(reserve);

  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          {" "}
          ข้อมูลการจอง{" "}
        </Text>
      </View>

      <Card style={styles.card}>
        <User userObject={reserve} navigation={navigation} roomNumber={categoryTitle} />
      </Card>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    borderRadius: "50%",
    top: "20%",
  },
  header: {
    position: "absolute",
    backgroundColor: "#FFB085",
    padding: 10,
    borderRadius: 50,
    width: "50%",
    textAlign: "center",
    top: "18%",
    zIndex: 100,
    alignSelf: "center",
  },
  btnContract: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#47C5FC",
    padding: 5,
    width: 100,
    height: 35,
    borderRadius: 50,
  },
  btnCancle: {
    display: "flex",
    justifyContent: "center",
    borderColor: "#F26565",
    borderWidth: 1,
    padding: 5,
    width: 100,
    height: 35,
    borderRadius: 50,
  },
});
export default DetailReserve;
