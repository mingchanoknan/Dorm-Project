import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import BillGridTile from "../../component/invoice/BillGridTile";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Modal,
  Button,
} from "@ui-kitten/components";
import { baseUrl } from "@env";
import axios from "axios";
import DatePicker from "react-native-modern-datepicker";

// const baseUrl ='http://192.168.1.117:8080';
const ManageInvoice = ({ route, navigation }) => {
  constructor (

  );
  const [room, setRoom] = useState(null);
  const [all, setAll] = useState(null);

  const data = ["All", "ชั้นที่ 2", "ชั้นที่ 3"];
  const [selectedFloor, setSelectedFloor] = React.useState(new IndexPath(0));
  const displayValue = data[selectedFloor.row];

  const build = ["ตึก", "ตึกที่ A", "ตึกที่ B", "ตึกที่ E"];
  const [selectedBuild, setSelectedBuild] = React.useState(new IndexPath(0));
  const displayBuild = build[selectedBuild.row];

  
  const [date, setDate] = useState("2022");
  const [visible, setVisible] = React.useState(false);

  const [invoices, setInvoices] = useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

    let currentDate = new Date();
    let m = months[currentDate.getMonth()]
    let y= currentDate.getFullYear()
    const [monthYear, setMonthYear] = useState("")
    const [listBy, setListBy] = useState(m.concat(" ",y));
    const [month, setMonth] = useState(m);
    const [year, setYear] = useState(y);

  // console.log(listBy);

  useEffect(() => {
    if (room != null) {
      let newroom = [...all];
      if (displayBuild != "ตึก") {
        newroom = newroom.filter((x) => x.build == displayBuild.slice(7, 8));
      }
      if (displayValue != "All") {
        newroom = newroom.filter((y) => y.floor == displayValue.slice(8, 9));
      }
      setRoom(newroom);
    }
  }, [selectedBuild, selectedFloor]);

  useFocusEffect(
    useCallback(() => {
      //console.log("Hello CheckroomStatus");
      axios
        .get(`${baseUrl}/rent`)
        .then((response) => {
          setRoom(response.data);
          setAll(response.data);
        })
        .catch((error) => console.log("error checkroomstatus"));
      return () => {
        console.log("success checkroom");
      };
    }, [])
  );

  // useEffect(() => {
  //   const urlAllRoom = `${baseUrl}/rent`;

  //   const fetchrooms = async () => {
  //     try {
  //       const room = await axios.get(urlAllRoom);
        
  //       // const user = await axios.get(urlUser);
  //       if (room.status === 200) {
  //         setRoom(room.data);
  //         setAll(room.data);
  //         console.log(room.data)
  //         return;
  //       } else {
  //         throw new Error("Failed to fetch manageinvoice");
  //       }
  //     } catch (error) {
  //       console.log("error manage invoice");
  //     }
  //   };
  //   fetchrooms();
  // }, []);

  const formatedDate = (yearAndMonth) => {
    let array = yearAndMonth.split(" ");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setMonthYear(array[0] + "/" + array[1] + "/01");
    setListBy(months[parseInt(array[1]) - 1] + " " + array[0]);
    setMonth(months[parseInt(array[1]) - 1]);
    setYear(array[0]);
  };

  const renderGridItem = (itemData) => {
    
    return (
      <>
        {displayValue === "All" &&
          (displayBuild === "ตึก" ||
            displayBuild.slice(7, 8) === itemData.item.build) && (
            <BillGridTile
              title={itemData.item.room_number}
              status={itemData.item.room_status}
              color={
                itemData.item.room_status === "unavailable"
                  ? "#7dd4ca"
                  : "#c0b7c7"
              }
              onSelect={() => {
                if (listBy === "เลือกรอบบิล") {
                  Alert.alert("กรุณาเลือกรอบบิล", "", [
                      { text: "OK", onPress: () => console.log("OK Pressed") },
                    ]);
                } else {
                  if (itemData.item.room_status === "unavailable") {
                    navigation.navigate("BillInvoice", {
                      id: itemData.item.id,
                      categoryTitle: itemData.item.room_number,
                      month: month,
                      year: year
                    });
                  } else {
                    Alert.alert("ยังไม่มีผู้เช่า", "ในห้องนี้", [
                      { text: "OK", onPress: () => console.log("OK Pressed") },
                    ]);
                    console.log(itemData.item.room_status)
                  }
                }
              }}
            />
          )}

        {displayValue.slice(8, 9) === itemData.item.floor &&
          (displayBuild === "ตึก" ||
            displayBuild.slice(7, 8) === itemData.item.build) && (
            <BillGridTile
              title={itemData.item.room_number}
              status={itemData.item.room_status}
              color={
                itemData.item.room_status === "unavailable"
                  ? "#7dd4ca"
                  : "#c0b7c7"
              }
              onSelect={() => {
                if (itemData.item.room_status === "unavailable") {
                  navigation.navigate("BillInvoice", {
                    id: itemData.item.id,
                    categoryTitle: itemData.item.room_number,
                  });
                } else {
                  Alert.alert("ยังไม่มีผู้เช่า", "ในห้องนี้", [
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                  ]);
                }
              }}
            />
          )}
      </>
    );
  };

  return (
    <View style={styles.view}>
      <View style={[styles.header]}>
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

        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <View style={{ flex: 1, width: 350, height: 350 }}>
            <DatePicker
              style={{ borderRadius: "30%" }}
              mode="monthYear"
              selectorStartingYear={2000}
              current={monthYear}
              onMonthYearChange={(selectedDate) => {
                // getInvoice(selectedDate);
                formatedDate(selectedDate)
                setVisible(false);
              }}
            />
          </View>
        </Modal>
        <Button
          style={styles.btn}
          onPress={() => setVisible(true)}
          size="small"
        >
          Select Month
        </Button>
        <Text category="s1" style={{ textAlign: "right", marginRight: 5 }}>
          {listBy}
        </Text>
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
      </View>
      <View style={styles.container}>
        {room != null && (
          <FlatList
            data={room}
            renderItem={renderGridItem}
            numColumns={3}
          />
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
  header: {
    margin: 10,
    marginBottom: 0,
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
    shadowColor: "#D9D9D9",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bill: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "white",
    top: "15%",
    left: "3%",
    width: 90,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#F3FDFF",
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
  floorHead: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "30%",
    backgroundColor: "#dee9fa",
  },
  build: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    top: "5%",
    width: 90,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#FFB085",
  },
  btn: {
    margin: 10,
    backgroundColor: "#f57f95",
    borderColor: "#f57f95",
    width: "50%",
    alignSelf: "center",
    borderRadius: "50%",
  },
  backdrop: {
    backgroundColor: "rgba(237, 239, 240,0.8)",
  },
});
export default ManageInvoice;
