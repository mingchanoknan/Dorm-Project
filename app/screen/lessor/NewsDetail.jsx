import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { Button, Card, Text, Modal, Input, Icon } from "@ui-kitten/components";
import { baseUrl } from "@env";
import axios from "axios";

const NewsDetail = ({ route, navigation }) => {
  const data = route.params.item;
  const [isEditing, setIsEditing] = React.useState(false);
  const [id, setId] = React.useState(data._id);
  const [text, setText] = React.useState(data.text);
  const [title, setTitle] = React.useState(data.title);
  const [created_date, setCreated_date] = React.useState(data.created_date);
  const [created_byId, setCreated_byId] = React.useState(data.created_byId);
  const [visible, setVisible] = React.useState(false);
  console.log("--------\n", data._id, "\n", data);

  class news {
    constructor() {
      this._id = id;
      this.title = "";
      this.text = "";
      this.created_date = "";
      this.created_byId = null;
    }
    id;
    title;
    text;
    created_date;
    created_byId;
  }

  const Edited = async () => {
    let record = new news();
    record._id = id;
    record.title = title;
    record.text = text;
    record.created_date = created_date;
    record.created_byId = created_byId;

    console.log(record);

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

    // if (res.status === 200){
    //   Alert.alert("แก้ไขสำเร็จ", undefined, [
    //     {
    //       text: "ปิด",
    //       onPress: () => {
    //         setTitle(title);
    //         setText(text);
    //       },
    //     },
    //   ]);
    // }else{
    //   throw new Error("An error ");
    // }
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

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">{title}</Text>
      {/* <Text style={{marginTop:5,paddingLeft:10, fontSize:13,color:"#626567"}}>สร้างเมื่อ : {created_date}</Text> */}
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size="small"
        status="info"
        onPress={() => {
          setIsEditing(true);
          setVisible(false);
        }}
      >
        EDIT
      </Button>
      <Button
        style={styles.footerControl}
        size="small"
        status="danger"
        onPress={() => {
          ConfirmDel();
        }}
      >
        DELETE
      </Button>
    </View>
  );
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg_login.jpg")}
        style={styles.background}
      ></Image>
      <Card style={styles.card} header={Header} footer={Footer}>
        <Text>{text}</Text>
        <Image
          source={require("../../assets/user.jpg")}
          style={styles.image}
        ></Image>
        <Text style={{ fontSize: 12, color: "#626567", textAlign: "right" }}>
          สร้างเมื่อ : {created_date}
        </Text>
      </Card>
      <Modal
        visible={isEditing}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={[{ width: 300 }]}>
          <Input
            style={{ marginVertical: 10 }}
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
          <Image
            source={require("../../assets/user.jpg")}
            style={[styles.image]}
          ></Image>
          <Icon
            fill="black"
            style={{
              width: 15,
              height: 15,
              right: 55,
              top: -160,
              position: "absolute",
              zIndex: 1,
            }}
            name="upload-outline"
            onPress={() => {}}
          ></Icon>
          <View style={[styles.footerContainer, { marginVertical: 3 }]}>
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
  container: {
    display: "flex",
    height: "100%",
    felx: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "47%",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    position: "absolute",
    alignSelf: "flex-start",
    top: 0,
  },
  card: {
    flex: 1,
    alignSelf: "center",
    position: "absolute",
    backgroundColor: "rgba(230, 248, 253, 0.9)",
    width: 300,
    borderRadius: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 15,
  },
});

export default NewsDetail;
