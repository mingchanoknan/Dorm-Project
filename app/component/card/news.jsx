import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const news = (props) => {
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
        <Text style={{ fontSize: 18 }}>Date : {props.data.date}</Text>
        <TouchableOpacity
          style={[styles.button, { left: 50 }]}
          // onPress={onPress}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { left: 60, backgroundColor: "salmon" }]}
          // onPress={onPress}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Text style={{fontSize:18, paddingTop:20}}>{props.data.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 320,
    height: 190,
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

export default news;
