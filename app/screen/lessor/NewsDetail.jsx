import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Card, Text, Modal, Input, Icon } from "@ui-kitten/components";
import { baseUrl } from "@env";
import axios from "axios";
import RoomImageCarousel from "../../component/carousel/imageCarousel";

const NewsDetail = ({ route, navigation }) => {
  const data = route.params.item;
  const [isEditing, setIsEditing] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [text, setText] = React.useState(data.text);
  const [title, setTitle] = React.useState(data.title);
  const [created_date, setCreated_date] = React.useState(data.created_date);
  const [created_byId, setCreated_byId] = React.useState(data.created_byId);
  const [image, setImage] = useState([]);
  const [editImage, setEditImage] = useState([]);
  const [visible, setVisible] = React.useState(false);
  // console.log("---------------------\n", data);
  // console.log("---------------------\n", data.url);
  // console.log('"' + data.url + '"');
  // console.log({ uri: image });
  // console.log("Set : ",image)

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

  useEffect(() => {
    setId(data._id);
    // console.log(id);
  }, [data]);
  useEffect(() => {
    setImage(data.url)
    setEditImage(data.url)
  }, [id])

  const uploadFile = async () => {
    let formData = new FormData();
    for (var i = 0; i < allData.image.length; i++) {
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = allData.image[i].uri;
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
      const re = await axios.post(`${baseUrl}/file/upload`, formData, config);
      setImageUri(re.data);
    } catch (err) {
      console.log(err);
    }
  };
  const Edited = async () => {
    // let record = new news();
    // record._id = id;
    // record.title = title;
    // record.text = text;
    // record.created_date = created_date;
    // record.created_byId = created_byId;
    let existedImage = [...editImage].filter(
      (image) => image.uri == undefined
    );
    let unexistedImage = [...editImage].filter(
      (image) => image.uri != undefined
    );

    let formData = new FormData();
    for (var i = 0; i < unexistedImage.length; i++) {
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = unexistedImage[i].uri;
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
      let re = [];
      if (unexistedImage.length > 0) {
        re = await axios.post(`${baseUrl}/file/upload`, formData, config);
      }
      let newArr = existedImage.concat(re.data);
      newArr = newArr.filter((item) => item != undefined && item != null)
      let record = { ...data };
      record.title = title;
      record.text = text;
      record.url = newArr
      console.log(record)
      const res = await axios.post(`${baseUrl}/updateNews`, record);
      Alert.alert("แก้ไขสำเร็จ", undefined, [
        {
          text: "ปิด",
          onPress: () => {
            setTitle(title);
            setText(text);
            navigation.navigate("AnnouceNews");
          },
        },
      ]);
    } catch (err) {
      console.log(err);
    }
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
          // setTitle(title);
          // setText(text);
          navigation.navigate("AnnouceNews");
        },
      },
    ]);
  };

  const sendImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result)
      let list = [...image];
      list.push(result);
      setEditImage(list);
      console.log(list)
    }
  };
  const sendImgForEdit = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result)
      let list = [...image];
      list.unshift(result);
      setEditImage(list);
    }
  };

  const Header = (props) => (
    <View {...props}>
      <Text category="h6" onChangeText={(text) => setTitle(text)}>
        {title}
      </Text>
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
        <View style={{ display: "flex", alignItems: "center" }}>
          {image && (
            <RoomImageCarousel
              image={image}
              width={200}
              height={200}
              paginationColor={"#84E6E3"}
            />
          )}
        </View>

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
          {editImage != null && editImage.map((img, index) => (
            <View style={{ position: "relative" }}>
              {img.uri == undefined && (
                <Image source={{ uri: img }} style={[styles.image]}></Image>
              )}
              {img.uri != undefined && (
                <Image source={{ uri: img.uri }} style={[styles.image]}></Image>
              )}
              <Icon
                fill="#EC1212"
                style={{
                  width: 30,
                  height: 30,
                  right: 35,
                  top: -175,
                  position: "absolute",
                  zIndex: 1,
                }}
                name="plus-circle"
                onPress={() => {
                  let newArr = [...editImage]
                  console.log(newArr)
                  console.log(index)
                  newArr.splice(index, 1)
                  setEditImage(newArr)
                }}
              ></Icon>
            </View>
          ))}
          <View style={[styles.footerContainer, { marginVertical: 3 }]}>
            <Icon
              fill="#EC1212"
              style={{
                width: 50,
                height: 50,
              }}
              name="plus-circle"
              onPress={() => {
                sendImgForEdit();
              }}
            ></Icon>
            <Button
              style={[{ alignSelf: "center", marginTop: 20, marginRight: 10 }]}
              status="warning"
              size="small"
              onPress={() => {
                Alert.alert("ยืนยันการแก้ไข", undefined, [
                  {
                    text: "ยืนยัน",
                    onPress: () => {
                      Edited();
                    },
                  },
                  {
                    text: "ยกเลิก",
                    style: "cancel",
                    onPress: () => {
                      setIsEditing(false);
                    },
                  },
                ]);
              }}
            >
              SAVE
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
    alignItems: "center"
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
