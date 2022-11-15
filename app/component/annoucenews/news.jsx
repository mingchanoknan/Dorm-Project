import React, { useState } from "react";
import {
  Button,
  Card,
  Modal,
  MenuItem,
  OverflowMenu,
  Text,
  Input,
  Icon,
} from "@ui-kitten/components";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const news = ({ item, width, numberOfLines, onSelect }) => {
  // console.log(item)
  const [visible, setVisible] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [text, setText] = React.useState(item.item.text);
  const [title, setTitle] = React.useState(item.item.title);

  const Edited = () => {
    console.log("title : " + title);
    console.log("text : " + text);
  };

  const Header = () => (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor:"#90AACB",
        borderBottomWidth:2
      }}
    >
      <Text category="h6">{title}</Text>
      <OverflowMenu
        visible={visible}
        anchor={renderToggleButton}
        onBackdropPress={() => setVisible(false)}
      >
        <MenuItem
          title="Edit"
          onPress={() => {
            setIsEditing(true);
            setVisible(false);
          }}
        />
        <MenuItem title="Delete" />
      </OverflowMenu>
    </View>
  );

  const Footer = () => (
    <View style={[styles.footerContainer]}>
      <Icon
      fill="black"
      style={{ width: 15, height: 15, alignSelf: "flex-end" }}
      name="arrowhead-right-outline"
      onPress={() => {
        {
          onSelect();
        }
      }}
    ></Icon>
    </View>
  );

  const renderToggleButton = () => (
    <Icon
      fill="black"
      style={{ width: 20, height: 20, alignSelf: "flex-end" }}
      name="more-horizontal-outline"
      onPress={() => {
        setVisible(true);
      }}
    ></Icon>
  );

  return (
    <View style={[styles.shadow]}>
      <Card style={[styles.card, { width}]} header={Header} footer={Footer}>
        <Text numberOfLines={numberOfLines}>{text}</Text>
      </Card>

      <Modal
        visible={isEditing}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={{ width: 300 }}>
          <Input
            style={{ marginBottom: 10 }}
            textStyle={{ minHeight: 20, fontSize: 17 }}
            value={title}
            onChangeText={setTitle}
          />
          <Input
            multiline={true}
            numberOfLines={4}
            textStyle={{ minHeight: 20, fontSize: 17 }}
            value={text}
            onChangeText={setText}
          />
          <View style={[styles.footerContainer]}>
            <Button
              style={[{ alignSelf: "center", marginTop: 20, marginRight: 10 }]}
              status="warning"
              size="small"
              onPress={() => {
                setIsEditing(false);
                Edited();
              }}
            >
              EDIT
            </Button>
            <Button
              style={[{ alignSelf: "center", marginTop: 20 }]}
              status="danger"
              size="small"
              onPress={() => {
                setIsEditing(false);
              }}
            >
              CANCEL
            </Button>
          </View>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 7,
    marginBottom: 10,
    borderRadius:15,
    backgroundColor: "rgba(230, 248, 253, 0.9)",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});

export default news;
