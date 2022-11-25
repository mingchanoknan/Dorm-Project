import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Layout, Text, Divider } from "@ui-kitten/components";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

const RoomCard = (props) => {
  const Footer = () => {
    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 40,
        }}
      >

        <Text>Click for more information</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Card
        style={[styles.cardContainer, { backgroundColor: props.data.bgColor}]}
        footer={Footer}
        onPress={() =>{
          if(props.screen == "show room type"){
          props.navigation.navigate("CheckRoomDetail", {
            id: props.data._id,
            name: props.data.typeName,
            editable: props.editable
          })}}
        }
      >
        <Text style={styles.text} category="h2">
          {props.data.typeName}
        </Text>
        <Text style={[styles.text, {marginVertical:'3%'}]} category="s1">
          Start at <Text category="h6">{props.data.price}</Text> THB / month
        </Text>
      </Card>
      <Divider style={{ zIndex: 100, width: "92%", position: "absolute", bottom: 65 }} />
      <View style={[styles.circle, { backgroundColor: props.data.iconColor }]}>
        <FontAwesome name="hotel" size={40} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    marginHorizontal:20,
    position: "relative",
    padding: 10,
    display: "flex",
    alignItems: "center",
    //     justifyContent:'center',
    borderRadius: 30,
    
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: "100%",
    position: "absolute",
    bottom:8,
    backgroundColor: "pink",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: -1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 6,


  },
  text: {
    // marginBottom: 20,
    textAlign: "center",
  },
  container: {
    width: "90%",
    paddingVertical: 10,
  },
});

export default RoomCard;
