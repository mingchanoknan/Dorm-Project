import React, { useState } from "react";
import {
  Button,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const Example = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = React.useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
    setDate(date);
    hideDatePicker();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 280,
      }}
    >
      <Text
        style={{
          fontWeight: "400",
          color: "#6C6363",
          fontSize: 18,
          marginLeft: 5,
        }}
      >
        วันเกิด :
      </Text>
      <TouchableOpacity
        style={[styles.calen, { width: 120 }]}
        onPress={showDatePicker}
      >
        <Text style={{ fontWeight: "500", color: "#6C6363", fontSize: 17 }}>
          {date.toLocaleDateString()}
        </Text>
        <FontAwesome
          name="calendar"
          color="#6C6363"
          size={15}
          style={{ paddingLeft: 10 }}
        ></FontAwesome>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text
        style={{
          fontWeight: "400",
          color: "#6C6363",
          fontSize: 18,
          marginLeft:5
        }}
      >
        อายุ :
      </Text>
      <TextInput
        style={[styles.age]}
        placeholder="10 ปี"
        editable={false}
        placeholderTextColor="#6C6363"
        fontWeight="400"
        textAlign="center"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calen: {
    padding: 10,
    borderColor: "#90AACB",
    borderWidth: 2,
    borderRadius: 20,
    height: 45,
    marginBottom: 2,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: 120,
    backgroundColor: "white",
  },
  age: {
    height: 45,
    width: 60,
    borderColor: "#90AACB",
    borderWidth: 2,
    borderRadius: 30,
    fontSize: 18,
    position: "relative",
    marginBottom: 2,
    backgroundColor: "white",
  },
});

export default Example;
