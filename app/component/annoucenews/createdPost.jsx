import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Card, Modal, Text, Input, Icon } from "@ui-kitten/components";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { baseUrl } from "@env";
import axios from "axios";

const CreatedPost = () => {
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [created_date, setCreated_date] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);

  class news {
    constructor() {
      this.title = "";
      this.text = "";
      this.created_date = "";
      this.url = "";
    }
    title;
    text;
    created_date;
    created_byId;
    url;
  }

  useState(() => {
    let currentDate = new Date();
    let d = currentDate.getDate();
    let m = currentDate.getMonth();
    let y = currentDate.getFullYear();
    setCreated_date(y + "-" + m + "-" + d);
  }, []);

  const Created = async () => {
    let formData = new FormData();
    for (var i = 0; i < image.length; i++) {
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = image[i].uri;
      let filename = localUri.split("/").pop();
      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[i]}` : `image`;

      formData.append("files", { uri: localUri, name: filename, type });
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      const re = await axios.post(
        `${baseUrl}/file/upload`,
        formData,
        config
      );
      let imageUrl = re.data;
      let record = new news();
        record.title = title;
        record.text = text;
        record.created_date = created_date;
        record.created_byId = 1;
        record.url = imageUrl

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
      
    } catch (err) {
      console.log(err);
    }
  };

  const sendImg = async () => {
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let list = [...image];
      list.unshift(result);
      // props.changeInput(list, "image");
      setImage(list);
    }
  };

  const deleteImage = (index) => {
    let list = [...image];
    list.splice(index, 1);
    setImage(list);
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
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              },
            ]}
          >
            <Icon
              fill="#626567"
              style={{
                width: 30,
                height: 30,
                alignSelf: "center",
                marginTop: 20,
                marginHorizontal: 5,
              }}
              name="image"
              onPress={() => {
                sendImg();
              }}
            ></Icon>
            {/* {image.length > 0 &&
          image.map((item, index) => {
            console.log(item)
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "center",
                  margin: 20,
                  padding: 5,
                  width: "80%",
                }}
              >
                {item.uri == undefined && (
                  <Image
                    source={{ width: "100%", height: 300, uri: item }}
                    resizeMode="cover"
                  />
                )}
                {item.uri != undefined && (
                  <Image
                    source={{ width: "100%", height: 300, uri: item.uri }}
                    resizeMode="cover"
                  />
                )}
                
                <TouchableOpacity
                  onPress={() => deleteImage(index)}
                  style={{
                    backgroundColor: "pink",
                    position: "absolute",
                    top: -10,
                    right: -10,
                    borderRadius: 50,
                    padding: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}
                >
                  <Icon
                    style={styles.icon}
                    fill="#000"
                    name="trash-2-outline"
                  />
                </TouchableOpacity>
              </View>
            );
          })} */}
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
          {image.length > 0 &&
            image.map((item, index) => {
              console.log(item);
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    position: "relative",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                    marginLeft: 15,
                    padding: 5,
                    width: "100%",
                  }}
                >
                  {item.uri == undefined && (
                    <Image
                      source={{ width: "100%", height: 150, uri: item }}
                      resizeMode="cover"
                    />
                  )}
                  {item.uri != undefined && (
                    <Image
                      source={{ width: "100%", height: 150, uri: item.uri }}
                      resizeMode="cover"
                    />
                  )}
                  <Icon
                    fill="#EC1212"
                    style={{ width: 30, height: 30, left:-20, top:-15 }}
                    name="close-circle-outline"
                    onPress={() => deleteImage(index)}
                  ></Icon>
                </View>
              );
            })}
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
