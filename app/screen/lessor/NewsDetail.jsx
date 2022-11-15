import React, { useState } from "react";
import { View, Image, StyleSheet, TextInput, FlatList } from "react-native";
import { Button, Card, Text, Modal, Input } from "@ui-kitten/components";
import { FontAwesome } from "@expo/vector-icons";
import { NEWS } from "../../dummy/NEWS";
// import News from "../../component/AnnouceNews/news";
// import Modal from "../../component/AnnouceNews/createdPost";

const NewsDetail = ({ route, navigation }) => {
  const data = route.params.item;
  const [isEditing, setIsEditing] = React.useState(false);
  const [text, setText] = React.useState(data.text);
  const [title, setTitle] = React.useState(data.title);
  const [visible, setVisible] = React.useState(false);

  console.log("--------\n", route.params.newsId, "\n", data);
  console.log(route.params.title);

  const Edited = () => {
    console.log("title : " + title);
    console.log("text : " + text);
  };

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">{title}</Text>
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
      <Button style={styles.footerControl} size="small" status="danger">
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
  container: {
    display: "flex",
    height: "100%",
    felx: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  background: {
    width: "100%",
    height: "60%",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  card: {
    flex: 1,
    margin: 2,
    top: 220,
    position: "absolute",
    backgroundColor: "rgba(230, 248, 253, 0.9)",
    width: 300,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default NewsDetail;
