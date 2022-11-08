import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const newstenant = (props) => {
  return (
    <View style={styles.box}>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
          },
        ]}
      >
      <View style={{backgroundColor: 'pink', width: 150, height: 25, borderRadius: 50,  justifyContent: "center", alignItems: "center"}}>
        <Text style={{ fontSize: "13px", fontWeight: "bold"}}>Date : {props.data.date}</Text>
        </View>
      </View>
      <Text style={{fontSize: "12px" , paddingTop:20, textAlign: "justify"}}>{props.data.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "80%",
    height: "20%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 2,
      height: 6,
    },
    borderWidth: 0.3,
    shadowOpacity: 0.27,
    borderRadius: 30,
    position: "relative",
    backgroundColor: "rgba(230, 248, 253, 0.8)",
    alignSelf: "center",

    padding: 20,
    marginBottom: 25,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#90AACB",
    borderRadius: 15,
    padding: 10,
  },
});

export default newstenant;
