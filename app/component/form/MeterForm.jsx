import { Button, Input, Text, Modal } from "@ui-kitten/components";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import DatePicker from "react-native-modern-datepicker";

const MeterForm = (props) => {
  const [roomNoValue, setRoomNoValue] = useState("");
  const [unit, setUnit] = useState("");
  const [month, setMonth] = useState();
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
    setMonth(months[currentDate.getMonth()]);
  }, []);
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
          value={month}
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
              { text: "Yes", onPress: () => console.log("OK Pressed") },
            ])
          }
        >
          CANCEL
        </Button>
        <Button
          style={{ paddingHorizontal: 23 }}
          appearance="filled"
          status="success"
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
