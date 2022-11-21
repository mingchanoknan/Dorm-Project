import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import RoomCard from "../../component/card/RoomCard";
import React from "react";
import axios from "axios";
import { Toggle, Button, Text, Icon } from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";
import {baseUrl} from "@env"
const CheckRoomPrice = ({ route, navigation }) => {
  const [ROOMS, setROOMS] = useState([]);
  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${baseUrl}/room/getall`)
          .then((response) => {
            // console.log(response.data)
          setROOMS(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []),
  );
    
  const [checkedEditable, setCheckedEditable] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#FDF8F4" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: "10%",
          marginTop: 10,
        }}
      >
        <Text category="label" style={{ marginRight: 10, color: "gray" }}>
          Add New Type And Edit Imforation
        </Text>
        {checkedEditable && (
          <Toggle
            checked={checkedEditable}
            onChange={(isChecked) => setCheckedEditable(isChecked)}
            status="success"
          ></Toggle>
        )}
        {!checkedEditable && (
          <Toggle
            checked={checkedEditable}
            onChange={(isChecked) => setCheckedEditable(isChecked)}
          ></Toggle>
        )}
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "#FDF8F4" }}>
        <View>
          {ROOMS.map((item, index) => (
                    <View key={index} style={{ width:'100%',alignItems:'center'}} >
              <RoomCard data={item} navigation={navigation} editable={checkedEditable} screen={"show room type"} /> 
                    </View>
                ))}
        </View>
      </ScrollView>
      {checkedEditable && (
        <View style={styles.addBtnContainer}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate("Add new type room")}
          >
            <Icon
              fill="#47C5FC"
              style={{ width: 70, height: 70 }}
              name="plus-circle"
            ></Icon>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  addBtnContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    // right: 0,
    width: "100%",
    alignItems: "flex-end",
    marginRight: "12%",
    marginBottom: "3%",
  },
  addBtn: {
    borderRadius: "50%",
    backgroundColor: "#fff",
  },
});
export default CheckRoomPrice;
