import React, { useState } from "react";
import { StyleSheet, View, TextInput, Alert } from "react-native";
import { Button, Card, Modal, Text, Input, Icon } from "@ui-kitten/components";
import { FontAwesome } from "@expo/vector-icons";
import { baseUrl } from "@env";
import axios from "axios";

const CreatedPost = () => {
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [created_date, setCreated_date] = React.useState(null);

  class news {
    constructor() {
      this.title = "";
      this.text = "";
      this.created_date = "";
      this.created_byId = null;
    }
    title;
    text;
    created_date;
    created_byId;
  }

  useState(() => {
    let currentDate = new Date();
    let d = currentDate.getDate();
    let m = currentDate.getMonth();
    let y = currentDate.getFullYear();
    setCreated_date(y + "-" + m + "-" + d);
  }, []);

  const Created = async () => {
    let record = new news();
    record.title = title;
    record.text = text;
    record.created_date = created_date;
    record.created_byId = 1;

    console.log(record);

    const res = await axios.post(`${baseUrl}/addNews`, record);
    Alert.alert(res.data, undefined, [
      {
        text: "Yes",
        onPress: () => {
          setTitle("");
          setText("");
          setVisible(false);
        },
      },
    ]);
  };

  return (
    <View style={styles.search}>
      <TextInput
        multiline
        placeholder="type...."
        fontSize={20}
        // onChangeText={setText}
        // value={value}
        editable={false}
        style={[styles.input]}
      ></TextInput>

      <FontAwesome
        name="pencil-square-o"
        color={"grey"}
        size={25}
        onPress={() => setVisible(true)}
      ></FontAwesome>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={{ width: 300 }}>
          <Icon
            fill="grey"
            style={{ width: 20, height: 20, alignSelf: "flex-end" }}
            name="close-circle-outline"
            onPress={() => {
              setVisible(false);
            }}
          ></Icon>
          <Input
            style={{ marginBottom: 10, marginTop: 10 }}
            textStyle={{ minHeight: 20, fontSize: 17 }}
            placeholder="หัวข้อ"
            onChangeText={setTitle}
          />
          <Input
            multiline={true}
            textStyle={{ minHeight: 100, fontSize: 17 }}
            placeholder="เนื้อหา"
            onChangeText={setText}
          />
          <View style={[{ flexDirection: "row", justifyContent: "flex-end" , alignItems:"center",}]}>
            <Icon
              fill="#626567"
              style={{ width: 30, height: 30, alignSelf: "center",marginTop: 20 ,marginHorizontal: 5}}
              name="image"
              onPress={() => {
               
              }}
            ></Icon>
            <Button
              style={{ alignSelf: "center", marginTop: 20 }}
              size="small"
              onPress={() => {
                setVisible(false);
                Created();
              }}
            >
              POST!
            </Button>
            {/* <Button
              style={{ alignSelf: "center", marginTop: 20 }}
              size="small"
              onPress={() => {
                setVisible(false);
              }}
            >
              CANCEL
            </Button> */}
          </View>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    height: 45,
    width: 250,
    padding: 15,
    fontSize: 18,
    marginBottom: 2,
    borderRightColor: "white",
  },
  search: {
    position: "absolute",
    alignItems: "center",
    top: 40,
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    paddingRight: 10,
    borderColor: "#90AACB",
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: "white",
  },
});

export default CreatedPost;
