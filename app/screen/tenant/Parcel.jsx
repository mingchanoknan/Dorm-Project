import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Divider, Layout, Modal } from "@ui-kitten/components";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "@env";
import axios from "axios";
import { NEWS } from "../../dummy/NEWS";
import { StackActions } from "@react-navigation/native";
import BoxParcelTenant from "../../component/parcel/BoxParcelTenant";
import { useFocusEffect } from "@react-navigation/native";
import { useDerivedValue } from "react-native-reanimated";

const Parcel = ({ route, navigation }) => {
  const user = useSelector((state) => state.user)

  const [parcel, setParcel] = useState(null);
  const [select, setSelect] = useState("myParcel");
  const [room_number, setRoom_number] = useState(user.room_number);
  const [url, setUrl] = useState(`${baseUrl}/getParcelNum/${room_number}`);

  const [countReceived, setCountReceived] = useState(0);
  const [countNotReceived, setCountNotReceived] = useState(0);

  useFocusEffect(
    useCallback(() => {
      if(select == 'myParcel'){
        setRoom_number(user.room_number)
        setUrl(`${baseUrl}/getParcelNum/${user.room_number}`)
        // console.log("p")
      }else{
        setUrl(`${baseUrl}/parcel`)
        // console.log("Hello")
      }
      const url1 = `${baseUrl}/getParcelNum/${room_number}`;
      
      const fetchUsers = async () => {
        try {
          const response = await axios.get(url);
          if (response.status === 200) {
            setParcel(response.data);
           
            return;
          } else {
            throw new Error("Failed to fetch parcel");
          }
        } catch (error) {
          console.log("Data fetching cancelled parcel");
        }
      };
      fetchUsers();
    }, [parcel])
  );

  const renderGridItem = (itemData) => {
    // console.log(itemData);
    return <BoxParcelTenant item={itemData} user={user.room_number}  width={"85%"} numberOfLines={1} />;
  };

  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_cancle.png")}
        style={styles.background}
      ></Image>

      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            top: 2,
          }}
        >
        <View style={styles.segment}>
          <TouchableOpacity style={[styles.btnSelect, { marginRight:5}, select == 'myParcel' ? { backgroundColor: "#B1E5F3"} : ""]} onPress={() => setSelect('myParcel')}>
            <Text style={{fontSize: "12px", fontWeight: "bold",}}>รายการพัสดุของฉัน</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btnSelect, { marginLeft:5}, select == 'allParcel' ? { backgroundColor: "#B1E5F3"} : ""]} onPress={() => setSelect('allParcel')}>
            <Text style={{fontSize: "12px", fontWeight: "bold"}}>รายการพัสดุทั้งหมด</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={{ flex: 3 }}>
          <FlatList
            data={parcel}
            renderItem={renderGridItem}
            numColumns={1}
            keyExtractor={(item) => item._id}
            navigation={navigation}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  text: {
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center",
  },
  background: {
    top: -100,
    width: "100%",
    height: "30%",
    borderRadius: "50%",
    position: "absolute",
  },
  btnAdd: {
    flexDirection: "row",
    backgroundColor: "#FFB085",
    width: "50%",
    padding: 10,
    justifyContent: "center",
    borderRadius: "50%",
    alignItems: "center",
  },
  btnShow: {
    backgroundColor: "white",
    width: "33%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#86becf",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  segment: {
    backgroundColor: 'white', 
    width: '70%',
    top: "8%",
    height: 50, 
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnSelect: {
    width: "45%", 
    color: "white",
    borderRadius: 10, 
    height: "80%", 
    justifyContent: "center", 
    alignItems: "center",

  }
});

export default Parcel;
