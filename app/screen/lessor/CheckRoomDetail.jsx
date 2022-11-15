import { useFocusEffect } from "@react-navigation/native";
import { Text, Icon } from "@ui-kitten/components";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderBackground from "../../component/background/HeaderBackground";
import RoomImageCarousel from "../../component/carousel/imageCarousel";
const baseUrl = "http://192.168.1.10:8080";
const CheckRoomDetail = ({ route, navigation }) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const { id, editable } = route.params;
  const [data, setData] = useState();


  useFocusEffect(
    useCallback(() => {
    
      axios
        .get(`${baseUrl}/room/getbyid`, {
          params: {
            id : id
        } })
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])
  );
  const image = [
    {
      src: require("../../assets/1.jpg"),
    },
    {
      src: require("../../assets/2.jpg"),
    },
    {
      src: require("../../assets/3.jpg"),
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "#FDF8F4" }}>
      <HeaderBackground
        image={require("../../assets/bg_invoice.png")}
        style={{ paddingHorizontal: 50 }}
      />
      {data && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
            // backgroundColor: "rgba(123, 255, 207,0.7)",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <RoomImageCarousel
            image={data.image}
            width={width - 50}
            height={height / 2.8}
            paginationColor={data.bgColor}
          />
        </View>
      )}
      <View style={{ flex: 2, marginTop: "10%" }}>
        {editable && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              position: "absolute",
              bottom: 10,
              right: 10,
              zIndex: 10,
            }}
          >
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => console.log("Test")}
            >
              <Icon
                fill="#000"
                name="edit-2-outline"
                style={{ width: "35", height: "35" }}
              ></Icon>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                fill="#000"
                name="trash-2-outline"
                style={{ width: "35", height: "35" }}
              ></Icon>
            </TouchableOpacity>
          </View>
        )}
        {data && (
          <View style={{ flex: 1, alignItems: "center", position: "relative" }}>
            <View
              style={[
                styles.banner,
                { backgroundColor: data.bgColor, marginTop: 20 },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  
                  justifyContent: "center",
                }}
              >
                <View style={{display:'flex' ,justifyContent: "center",}}>
                    <Text category="s1" style={{ textAlign: "center"}}>
                  Start at
                </Text>
                </View>
               
                <Text category="h3" style={{ textAlign: "center",marginHorizontal:10 }}>
                  {data.price} THB
                </Text>
                <View style={{display:'flex' ,justifyContent: "flex-end",}}>
                  <Text category="s1">/mount</Text>
                  </View>
              </View>

              <Text category="s1" style={{ marginTop: "3%" }}>
                {data.suggestion}
              </Text>
              <Text
                category="label"
                style={{ textAlign: "right", color: "red" }}
              >
                {"เหลือ 1 ห้อง"}
              </Text>
            </View>
            <ScrollView
              style={[
                styles.information,
                {
                  borderColor: data.bgColor,
                  marginTop: height / 10,
                  marginBottom: editable ? 50 : 0,
                },
              ]}
            >
              <View style={{ paddingBottom: 20 }}>
                <View style={{ height: 40 }}></View>
                <Text category="h5">Information</Text>
                <Text category="s1">
                {data.information}
                </Text>
                <Text category="h5" style={{ marginVertical: 10 }}>
                  Convinience
                </Text>
                {data.convenience.map((item, index) => (
                  <Text category="s1" key={index}>
                    - {item}
                  </Text>
                ))}
                <View style={{ height: 50 }}></View>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderRadius: "70%",
    width: "80%",
    padding: "6%",
    position: "absolute",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  information: {
    flex: 1,
    borderTopLeftRadius: "45%",
    borderTopRightRadius: "45%",
    width: "90%",
    paddingHorizontal: "5%",
    paddingTop: "10%",
    backgroundColor: "white",
    borderWidth: 3,
  },
});

export default CheckRoomDetail;
