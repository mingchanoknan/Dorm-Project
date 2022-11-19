import React, { useState } from "react";
import { Button, View, TouchableOpacity,Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from "@expo/vector-icons";

const Example = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
    setDate(date);
    props.onReserve(date.toISOString().slice(0, 10))
    console.log(date.toISOString().slice(0, 10));
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity style={{display: 'flex', flexDirection: 'row', padding: 5, paddingLeft:10, borderWidth: 1, borderColor: '#D8D4D4', borderRadius: 50, backgroundColor: '#F7F8FB', width: 110}} onPress={showDatePicker}>
        <Text style={{color:"#8F9AB3", fontSize: '12px'}}>{date.toLocaleDateString().slice(0, 10)}</Text>
        <AntDesign name="calendar"  style={{marginLeft: 8}} size={14} color="#65778E" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default Example;