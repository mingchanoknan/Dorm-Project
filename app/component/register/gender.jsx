import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  ActionSheetIOS,
  StyleSheet,
} from "react-native";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
const data = ["หญิง", "ชาย"];
const gender = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  
  const renderOption = (title, index) => <SelectItem title={title} key={index}/>;
  const displayValue = data[selectedIndex.row];

  // const genderSelection = () => {
  //   ActionSheetIOS.showActionSheetWithOptions(
  //     {
  //       options: ["Cancel", "ชาย", "หญิง"],
  //       destructiveButtonIndex: 2,
  //       cancelButtonIndex: 0,
  //     },
  //     (buttonIndex) => {
  //       if (buttonIndex === 0) {
  //         // cancel action
  //       } else if (buttonIndex === 1) {
  //         setgender("ชาย");
  //         setSex("M");
  //         props.onGender(gender);
  //       } else if (buttonIndex === 2) {
  //         setgender("หญิง");
  //         setSex("F");
  //         props.onGender(gender);
  //         console.log(sex);
  //       }
  //     }
  //   );
  //   console.log(gender);
  //   // props.onGender(sex);
  //   // props.onGender(gender);
  // };

  const onSelectHandler = (index) => {
    setSelectedIndex(index);
    props.onGender(index.row);
  };

  return (
    // <TouchableOpacity
    //   style={[styles.input]}
    //   // onChange={setgender}
    //   onPress={genderSelection}
    // >
    //   <TextInput
    //     style={{ fontWeight: "400", color: "#6C6363", fontSize: 20 }}

    //     editable={false}
    //   >
    //     {gender}
    //   </TextInput>
    //   <FontAwesome
    //     name="caret-down"
    //     color="#6C6363"
    //     size={20}
    //     style={{ paddingLeft: 10 }}
    //   ></FontAwesome>
    // </TouchableOpacity>
    <Select
      style={[{ width: 105 }]}
      placeholder="Default"
      value={displayValue}
      selectedIndex={selectedIndex}
      onSelect={(index) => onSelectHandler(index)}
    >
      {data.map(renderOption)}
    </Select>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderColor: "#90AACB",
    borderWidth: 2,
    borderRadius: 30,
    padding: 10,
    fontSize: 18,
    position: "relative",
    alignItems: "center",
    width: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  select: {
    flex: 1,
    margin: 1,
  },
});

export default gender;
