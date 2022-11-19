import React, { useState } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";

const TimePicker = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  // console.log(time.toLocaleTimeString('en-US'));
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time1) => {
    // console.warn("A date has been picked: ", date);
    setTime(time1);
    props.onTime(time1.toLocaleTimeString('en-US'))
    //console.log(time1.toLocaleTimeString('en-US'));
    hideDatePicker();
  };

  const TimeIcon = (props) => (
    <MaterialIcons name="access-time" size={18} color="#65778E" />
  );

  return (
    <View style={{backgroundColor: '#E5F8FE'}}>
      <TouchableOpacity style={{display: 'flex', flexDirection: 'row', top: 5, padding: 8, borderWidth: 1, borderColor: '#D8D4D4', borderRadius: 10, backgroundColor: '#F7F8FB'}} onPress={showDatePicker}>
        <Text style={{color:"#8F9AB3"}}>{time.toLocaleTimeString('en-US')}</Text>
        <MaterialIcons style={{marginLeft: 6}} name="access-time" size={18} color="#65778E" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        time = {time}
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default TimePicker;