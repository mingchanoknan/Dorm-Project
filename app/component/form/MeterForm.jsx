import { Button, Input, Text, Modal } from "@ui-kitten/components";
import axios from "axios";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { baseUrl } from "@env";
let consumptionWater = 14;
let consumptionElec = 6;
const MeterForm = (props) => {
  const [roomNoValue, setRoomNoValue] = useState("");
  const [unit, setUnit] = useState("");
  const [monthYear, setMonthYear] = useState();
  class meter {
    constructor() {
      this.room_number = "";
      this.utilities_type = props.type;
      this.monthAndYear = "";
      this.consumption =0;
      this.used_unit = "";
      this.sum = 0;
    }
    room_number;
    utilities_type;
    monthAndYear;
    consumption;
    used_unit;
    sum;
    
  }
  
  
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

  useState(() => {
    let currentDate = new Date();
    let m = months[currentDate.getMonth()]
    let y= currentDate.getFullYear()
    setMonthYear(m.concat(" ",y));
  }, []);

  const saveMeter = (async() => {
    let record = new meter();
    record.monthAndYear = monthYear
    record.room_number = roomNoValue
    record.used_unit = parseInt(unit) 
    if (props.type == "water") {
      record.consumption = consumptionWater
      record.sum = record.used_unit * record.consumption
    }
    else {
      record.consumption = consumptionElec
      record.sum = record.used_unit * record.consumption
    }
    const res = await axios.post(`${baseUrl}/meter/add`,record)
    Alert.alert(res.data, undefined, [
      {
        text: "Yes", onPress: () => {
          setUnit("")
        setRoomNoValue("")}
      },
    ])
  })
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "rgba(195, 220, 227,0.5)",
          width: "100%",
          borderRadius: "30%",
          padding: "8%",
        }}
      >
        <Input
          placeholder="Place your Text"
          label={"Month"}
          value={monthYear}
          disabled={true}
        />
        <Input
          placeholder="Place your Text"
          label={"Room number"}
          value={roomNoValue}
          onChangeText={(nextValue) => setRoomNoValue(nextValue)}
        />
        <Input
          placeholder="Place your Text"
          label={"Number of units used"}
          value={unit}
          onChangeText={(nextValue) => setUnit(nextValue)}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: "4%",
        }}
      >
        <Button
          style={{ marginRight: "2%" }}
          appearance="outline"
          status="danger"
          onPress={() =>
            Alert.alert("ต้องการยกเลิกหรือไม่", undefined, [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Yes", onPress: () => {
                  setUnit("")
                setRoomNoValue("")}
              },
            ])
          }
        >
          CANCEL
        </Button>
        <Button
          style={{ paddingHorizontal: 23 }}
          appearance="filled"
          status="success"
          onPress={() => {
            saveMeter()
            
          }}
        >
          SAVE
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 10,
  },
  container: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0,0.8)",
  },
});
export default MeterForm;
