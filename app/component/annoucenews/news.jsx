import React, { useState, useEffect, useCallback } from "react";
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
import { StyleSheet, View, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { baseUrl } from "@env";
import axios from "axios";

const news = ({ item, width, numberOfLines, canEdit, onSelect, navigation}) => {
  const data  = item.item;
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(data._id);
  const [text, setText] = useState(data.text);
  const [title, setTitle] = useState(data.title);
  const [created_date, setCreated_date] = useState(data.created_date);
  const [created_byId, setCreated_byId] = useState(data.created_byId);
  const [show, setShow] = useState(canEdit);

  class news {
    constructor() {
      this._id = id;
      this.title = "";
      this.text = "";
      this.created_date = "";
      this.created_byId = null;
    }
    _id;
    title;
    text;
    created_date;
    created_byId;
  }
// console.log("HI",data)
  useEffect(() => {
    setId(data._id);
    // console.log(id);
  }, [data]);

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log(data)
  //     const url = `${baseUrl}/news`;

  //     const fetchUsers = async () => {
  //       try {
  //         const response = await axios.get(url);
  //         if (response.status === 200) {
  //           // setData(response.data);
  //           console.log("---------------\nDATA\n---------------\n",response.data[index]);
  //           return;
  //         } else {
  //           throw new Error("Failed");
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchUsers();
  //   }, [])
  // );

  const Edited = async () => {
    let record = new news();
    record._id = id;
    record.title = title;
    record.text = text;
    record.created_date = created_date;
    record.created_byId = created_byId;

    const res = await axios.post(`${baseUrl}/updateNews`, record);
    Alert.alert("แก้ไขสำเร็จ", undefined, [
      {
        text: "ปิด",
        onPress: () => {
          setTitle(title);
          setText(text);
        },
      },
    ]);
  };

  const ConfirmDel = () => {
    Alert.alert("ยืนยันการลบ", undefined, [
      {
        text: "ยืนยัน",
        onPress: () => {
          Delete();
        },
      },
      {
        text: "ยกเลิก",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  const Delete = async () => {
    let record = new news();
    record._id = id;
    record.title = title;
    record.text = text;
    record.created_date = created_date;
    record.created_byId = created_byId;

    console.log(record);

    const res = await axios.post(`${baseUrl}/deleteNews`, record);
    Alert.alert("ลบสำเร็จ", undefined, [
      {
        text: "ปิด",
        onPress: () => {
          setTitle(title);
          setText(text);
        },
      },
    ]);
  };

  const Header = () => (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "#90AACB",
        borderBottomWidth: 2,
      }}
    >
      <View>
        <Text category="h6">{data.title}</Text>
      </View>
      {show && (
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
          <MenuItem
            title="Delete"
            onPress={() => {
              ConfirmDel();
            }}
          />
        </OverflowMenu>
      )}
    </View>
  );

  const Footer = () => (
    <View style={[styles.footerContainer]}>
      <Text style={{ paddingLeft: 20, fontSize: 12, color: "#626567" }}>
        สร้างเมื่อ : {created_date}
      </Text>
      <Icon
        fill="black"
        style={{
          width: 15,
          height: 15,
          alignSelf: "flex-end",
          paddingRight: 30,
        }}
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
      <Card style={[styles.card, { width }]} header={Header} footer={Footer}>
        <Text numberOfLines={numberOfLines}>{data.text}</Text>
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
                setTitle(data.title);
                setText(data.text);
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
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: "rgba(230, 248, 253, 0.9)",
    alignSelf: "center",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  shadow: {
    flex: 1,
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
