import React, { useState } from "react";
import { Button, View, TouchableOpacity,Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from "@expo/vector-icons";

const Example = (props) => {
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
    props.onDate(date.toISOString().slice(0,10))
    hideDatePicker();
  };

  return (
    <View style={{backgroundColor: '#E5F8FE'}}>
      <TouchableOpacity style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 8, top: 5, borderWidth: 1, borderColor: '#D8D4D4', borderRadius: 10, backgroundColor: '#F7F8FB'}} onPress={showDatePicker}>
        <Text style={{color:"#8F9AB3"}}>{date.toISOString().slice(0,10)}</Text>
        <AntDesign name="calendar"  style={{marginLeft: 8}} size={18} color="#65778E" />
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