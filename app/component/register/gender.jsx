import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  ActionSheetIOS,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const gender = () => {
  const [gender, setgender] = useState("เพศ");

  const genderSelection = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "ชาย", "หญิง"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setgender("ชาย");
        } else if (buttonIndex === 2) {
          setgender("หญิง");
        }
      }
    );

  return (
    <TouchableOpacity style={[styles.input]} onPress={genderSelection}>
      <Text style={{ fontWeight: "400", color: "#6C6363", fontSize: 20 }}>
        {gender}
      </Text>
      <FontAwesome
        name="caret-down"
        color="#6C6363"
        size={20}
        style={{ paddingLeft: 10 }}
      ></FontAwesome>
    </TouchableOpacity>
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
});

export default gender;
