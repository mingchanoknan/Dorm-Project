import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Button, Card, Modal, Text, Input, Icon } from "@ui-kitten/components";
import { FontAwesome } from "@expo/vector-icons";
const CreatedPost = () => {
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");

  const Created = () => {
    console.log("title : " + title);
    console.log("text : " + text);
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
          <View style={[{ flexDirection: "row", justifyContent: "flex-end" }]}>
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
