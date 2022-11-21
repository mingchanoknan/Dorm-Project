import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import RoomGridTile from "../../component/contract/RoomGridTile";
import Search from "../../component/contract/searchBar";
import { baseUrl } from "@env";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";


const CheckRoomsStatus = ({ route, navigation }) => {
  const [user, setUser] = useState(null);
  const [all, setAll] = useState(null);

  const data = ["All", "ชั้นที่ 2", "ชั้นที่ 3"];
  const [selectedFloor, setSelectedFloor] = React.useState(new IndexPath(0));
  const displayValue = data[selectedFloor.row];

  const build = ["ตึก", "ตึกที่ A", "ตึกที่ B", "ตึกที่ E"];
  const [selectedBuild, setSelectedBuild] = React.useState(new IndexPath(0));
  const displayBuild = build[selectedBuild.row];

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (user != null) {
      let newUser = [...all];
      if (displayBuild != "ตึก") {
        newUser = newUser.filter((x) => x.build == displayBuild.slice(7, 8));
      }
      if (displayValue != "All") {
        newUser = newUser.filter((y) => y.floor == displayValue.slice(8, 9));
      }
      setUser(newUser);
    }
  }, [selectedBuild, selectedFloor]);

  useEffect(() => {
    if (user != null) {
      let newUser = [...all];
      const textData = searchPhrase.toLocaleUpperCase();
      if (searchPhrase != "") {
        const newData = newUser.filter(item => {
          const itemData =  item.room_number.toLocaleUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        newUser = newData
      } 
      setUser(newUser);
    }
  }, [searchPhrase])

  useFocusEffect(
    useCallback(() => {
      //console.log("Hello CheckroomStatus");
      axios
        .get(`${baseUrl}/rent`)
        .then((response) => {
          setUser(response.data);
          setAll(response.data);
        })
        .catch((error) => console.log("error checkroomstatus"));
      return () => {
        console.log("success checkroom");
      };
    }, [])
  );
  const renderGridItem = (itemData) => {
    return (
      <>
        {displayValue === "All" &&
          (displayBuild === "ตึก" ||
            displayBuild.slice(7, 8) === itemData.item.build) && (
            <RoomGridTile
              title={itemData.item.room_number}
              color={
                itemData.item.room_status == "unavailable"
                  ? "#f25a79"
                  : itemData.item.room_status === "available"
                  ? "#7dd4ad"
                  : "#6cb4f0"
              }
              data={itemData.item.room_status}
              onSelect={() => {
                if (itemData.item.room_status === "available") {
                  Alert.alert("ยังไม่มีผู้เช่า", "ทำการจองห้องพัก", [
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                  ]);
                  navigation.navigate("ReserveRoom", {
                    prev: "CheckRoomsStatus",
                    categoryId: itemData.item._id,
                    categoryTitle: itemData.item.room_number,
                  });
                } else if (itemData.item.room_status === "reserve") {
                  navigation.navigate("DetailReserve", {
                    categoryId: itemData.item._id,
                    categoryTitle: itemData.item.room_number,
                  });
                } else {
                  navigation.navigate("UserProfile", {
                    categoryId: itemData.item._id,
                    categoryTitle: itemData.item.room_number,
                  });
                }
              }}
            />
          )}

        {displayValue.slice(8, 9) === itemData.item.floor &&
          (displayBuild === "ตึก" ||
            displayBuild.slice(7, 8) === itemData.item.build) && (
            <RoomGridTile
              title={itemData.item.room_number}
              color={
                itemData.item.room_status == "unavailable"
                  ? "#f25a79"
                  : itemData.item.room_status === "available"
                  ? "#7dd4ad"
                  : "#6cb4f0"
              }
              data={itemData.item.room_status}
              onSelect={() => {
                if (itemData.item.room_status === "available") {
                  Alert.alert("ยังไม่มีผู้เช่า", "ทำการจองห้องพัก", [
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                  ]);
                  navigation.navigate("ReserveRoom", {
                    prev: "CheckRoomsStatus",
                    categoryId: itemData.item._id,
                    categoryTitle: itemData.item.room_number,
                  });
                } else if (itemData.item.room_status === "reserve") {
                  navigation.navigate("DetailReserve", {
                    categoryId: itemData.item._id,
                    categoryTitle: itemData.item.room_number,
                  });
                } else {
                  navigation.navigate("UserProfile", {
                    categoryId: itemData.item._id,
                    categoryTitle: itemData.item.room_number,
                  });
                }
              }}
            />
          )}
      </>
    );
  };

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Layout style={styles.buildHead} level="1">
          <Select
            style={{ width: 130, borderRadius: "50%" }}
            placeholder="รอบบิล"
            value={displayBuild}
            selectedFloor={selectedBuild}
            onSelect={(index) => setSelectedBuild(index)}
          >
            {build.map((title, index) => (
              <SelectItem key={index} title={title} />
            ))}
          </Select>
        </Layout>

        <View
          style={{
            flexDirection: "row",
            marginRight: 10,
            alignSelf: "flex-end",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: "11px", top: 5 }}>
            สถานะ{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              marginLeft: 5,
              width: "50%",
              height: 30,
              borderWidth: 1,
              borderColor: "#938B8B",
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "row", top: 3 }}>
              <View
                style={{
                  backgroundColor: "#7dd4ad",
                  marginLeft: 5,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                }}
              />
              <Text
                style={{ marginLeft: 5, fontSize: "12px", fontWeight: "bold" }}
              >
                ว่าง
              </Text>
            </View>

            <View style={{ flexDirection: "row", top: 3 }}>
              <View
                style={{
                  backgroundColor: "#f25a79",
                  marginLeft: 5,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                }}
              />
              <Text
                style={{ marginLeft: 5, fontSize: "12px", fontWeight: "bold" }}
              >
                ไม่ว่าง
              </Text>
            </View>

            <View style={{ flexDirection: "row", top: 3 }}>
              <View
                style={{
                  backgroundColor: "#6cb4f0",
                  marginLeft: 5,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                }}
              />
              <Text
                style={{ marginLeft: 5, fontSize: "12px", fontWeight: "bold" }}
              >
                จอง
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.header2}>
        <Layout style={styles.floorHead}>
          <Select
            style={{ width: 120, borderRadius: "50%" }}
            placeholder="รอบบิล"
            value={displayValue}
            selectedFloor={selectedFloor}
            onSelect={(index) => setSelectedFloor(index)}
          >
            {data.map((title, index) => (
              <SelectItem key={index} title={title} />
            ))}
          </Select>
        </Layout>

        <Layout style={styles.searchHead}>
          <Search
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        </Layout>
      </View>
      <View style={styles.container}>
        {user != null && (
          <FlatList data={user} renderItem={renderGridItem} numColumns={3} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  background: {
    width: "100%",
    height: "40%",
    zIndex: -100,
    top: "-12%",
    borderRadius: "40%",
    position: "absolute",
  },
  floorHead: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "30%",
    backgroundColor: "#dee9fa",
  },
  searchHead: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    backgroundColor: "#dee9fa",
  },
  buildHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "center",
    width: "30%",
    borderRadius: "50%",
  },
  header: {
    margin: 10,
    height: "13%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    //backgroundColor: "rgb(255, 214, 225)",
    borderRadius: "5%",
  },
  header2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    marginBottom: 0,
    height: "6%",
    borderRadius: 10,
    padding: 2,
    backgroundColor: "#dee9fa",
    shadowColor: "#B2B1B1",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  container: {
    margin: 10,
    height: "70%",
    backgroundColor: "#F4ECEC",
    shadowColor: "#dee9fa",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});
export default CheckRoomsStatus;
