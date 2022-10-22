import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Layout, Text, Divider } from "@ui-kitten/components";
import { FontAwesome } from '@expo/vector-icons'; 
import React from "react";
const RoomCard = (props) => {
  const Footer = () => {
    return (
        <View style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: 40 }}>
        <Text>Click for more information</Text>
      </View>
    );
  };
  return (
      <View style={styles.container}>
            <Card style={[styles.cardContainer, {backgroundColor: props.data.color1}]} footer={Footer} onPress={() => props.navigation.navigate("CheckRoomDetail", {id: props.data.id, name: props.data.type})}>
              <Text style={styles.text} category="h2">{ props.data.type }</Text>
              <Text style={styles.text} category="s1"> Start at <Text category="h6">{props.data.price}</Text> THB / month </Text>
              <Divider style={{zIndex: 100, width: 300, position: "absolute", bottom: 8}} />
            </Card>
            <View style={[styles.circle, { backgroundColor: props.data.color2 }]}>
                <FontAwesome name="hotel" size={40} color="white" />
            </View>
          </View>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
        margin: 20,
        position: "relative",
        padding: 10,
        display: "flex",
        alignItems: "center",
        borderRadius: 30,
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 50,
        position: "absolute",
        bottom: 0,
        backgroundColor: "pink",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        marginBottom: 20
    },
    container: {
        width: 350,
        paddingVertical: 10
    }
});

export default RoomCard;
