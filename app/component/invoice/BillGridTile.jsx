import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const BillGridTile = (props) => {
  return (
    <TouchableOpacity
      style={[styles.gridItem]}
      onPress={() => {
        props.onSelect();
      }}
      
    >
       <Text style={styles.title} numberOfLines={1}>
          {props.title}
        </Text>
      <View
        style={{ ...styles.container, ...{ backgroundColor: props.color } }}
      >
        {/* <Text>{itemData.item.title}</Text> */}
        { props.status === 'unavailable' && (<MaterialCommunityIcons name="email-newsletter" size={45} color="#fafae1" />)}
        { props.status != 'unavailable' && (<FontAwesome5 name="user-alt-slash" size={35} color="#fafae1" />)}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 0.33,
    margin: 10,
    width: 80,
    height: 120,
  },
  container: {
    flex: 1,
    borderRadius: 15,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: '12px',
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
  },
  status: {
    fontSize: '12px',
    fontWeight: "bold",
    textAlign: "center",
    top: 5,
    color: 'white'
  },
});

export default BillGridTile;
