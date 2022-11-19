import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Input, List, Text, Icon } from "@ui-kitten/components";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

let h = Dimensions.get("window").height;
let height;
if (h > 1000) {
  height = h / 2.5;
} else {
  height = h / 3.5;
}
const AddReport = (props) => {
  console.log(props);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  return (
    <View style={{ backgroundColor: "rgba(182, 232, 255, 1)", flex: 1 }}>
      <View style={styles.formReport}>
        <View style={styles.roomName}>
          <View style={styles.formControl}>
            <Text> ห้อง : </Text>
            <Input
              disabled={true}
              placeholder="Disabled"
              style={{ borderRadius: "50%" }}
              value={props.room_number}
            />
          </View>

          <View style={styles.formControl}>
            <Text> ชื่อ : </Text>
            <Input
              disabled={true}
              placeholder="Disabled"
              style={{ borderRadius: "50%" }}
              value={props.name}
            />
          </View>
        </View>
        <View style={[styles.formControl, { paddingVertical: 10 }]}>
          <Text> หัวข้อ : </Text>
          <Input
            style={{ minWidth: "80%", borderRadius: "15%" }}
            placeholder="หัวข้อการแจ้งซ่อม"
            value={topic}
            onChangeText={(nextValue) => setTopic(nextValue)}
          />
        </View>
        <View style={styles.content}>
          <Text> เนื้อหา : </Text>
          <Input
            style={{ minWidth: "80%", borderRadius: "25%" }}
            multiline={true}
            textStyle={{ minHeight: 64 }}
            placeholder="ใส่รายรายละเอียด"
            value={content}
            onChangeText={(nextValue) => setContent(nextValue)}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignSelf: "flex-end",
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFB085",
              borderRadius: "50%",
              paddingHorizontal: 15,
            }}
            onPress={props.pickImage}
          >
            <Text>
              <Ionicons name="ios-image" size={24} color="black" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#FFB085",
              borderRadius: 30,
              borderWidth: 0,
              marginLeft: "3%",
              padding: 15,
            }}
            onPress={() => {
              Alert.alert("ต้องส่งรายงานปัญหาหรือไม่", undefined, [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    props.sendReport(content, topic);
                    setTopic("");
                    setContent("");
                  },
                },
              ]);
            }}
          >
            <Text category="s1" style={{ color: "white" }}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ maxHeight: height }}>
          {props.image.length > 0 &&
            props.image.map((item, index) => {
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
                  <Image
                    source={{ width: "100%", height: 300, uri: item.uri }}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={() => props.deleteImage(index)}
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
                      style={{ width: 32, height: 32 }}
                      fill="#000"
                      name="trash-2-outline"
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  roomName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    // marginTop: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
  },
  formReport: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: "3%",
    paddingTop: "5%",
    display: "flex",
    alignItems: "center",
    margin: "5%",
    backgroundColor: "rgba(256, 256, 256, 0.5)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filter: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: "5%",
    alignItems: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 20,
  },
  content2: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  avatar: {
    marginHorizontal: 4,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});
export default AddReport;
