import { Alert, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RoomImageCarousel from "../carousel/imageCarousel";
import { Input, Text, Card, Avatar, Divider } from "@ui-kitten/components";
import { useState } from "react";

const RenderCard = (props) => {
  const [commentInput, setCommentInput] = useState("");
  const [widthOfView, setWidthOfView] = useState(0);
  return (
    <View
      style={styles.item}
      onLayout={(event) => setWidthOfView(event.nativeEvent.layout.width)}
    >
      {/* Header */}
      <View
        style={{
          display: "flex",
          padding: "2%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text category="h5">{props.item.topic}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text category="s2">By :</Text>
            <View
              style={[
                styles.writer,
                { backgroundColor: "rgba(130, 219, 208, 0.6)" },
              ]}
            >
              <Text category="s2">{props.item.name} </Text>
            </View>

            <View
              style={[
                styles.writer,
                { backgroundColor: "rgba(130, 219, 150, 0.6)" },
              ]}
            >
              <Text category="s2">{props.item.room_number} </Text>
            </View>
          </View>
        </View>

        {props.page == "response" && props.item.status == false ? (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text category="c1" status="danger">
              Change Status
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: props.item.status ? "#48C78E" : "#F14668",
                padding: 10,
                borderRadius: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxHeight: 40,
                width: 80,
              }}
              onPress={() => {
                Alert.alert("ต้องการเปลี่ยนเป็นซ่อมแล้วหรือไม่?", undefined, [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      props.updateStatus(props.item);
                    },
                  },
                ]);
              }}
            >
              <Text style={{ color: "white" }}>
                {props.item.status ? "ซ่อมแล้ว" : "ยังไม่ซ่อม"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: props.item.status ? "#48C78E" : "#F14668",
              padding: 10,
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxHeight: 40,
              width: 80,
            }}
          >
            <Text style={{ color: "white" }}>
              {props.item.status ? "ซ่อมแล้ว" : "ยังไม่ซ่อม"}
            </Text>
          </View>
        )}
      </View>
      <Divider />
      <View style={{ flex: 1 }}>
        <Text category="s1" style={{ textAlign: "center", marginTop: 10 }}>
          {props.item.content}
        </Text>
        {props.item.image.length > 0 && (
          <RoomImageCarousel
            image={props.item.image}
            width={widthOfView - 50}
            height={300}
            paginationColor={"#84E6E3"}
          />
        )}

        <View
          style={{ display: "flex", alignItems: "flex-end", marginTop: 10 }}
        >
          <Text category="label" style={{ color: "#A4A2A2" }}>
            {props.item.date}
          </Text>
        </View>
      </View>
      <Divider />
      {/* footer */}
      <View style={{ margin: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Input
            style={{ minWidth: "70%", borderRadius: "25%" }}
            multiline={true}
            placeholder="Response Problem..."
            onChangeText={(text) => setCommentInput(text)}
            value={commentInput}
          ></Input>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(249, 169, 145, 0.6)",
              padding: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10%",
              marginLeft: 20,
            }}
            onPress={() => {
              if (commentInput != "") {
                props.saveComment(props.item, commentInput);
                setCommentInput("");
              }
            }}
          >
            <Text category="label">SEND</Text>
          </TouchableOpacity>
        </View>
        {props.item.comments.length > 0 &&
          props.item.comments.map((item, index) => (
            <View key={index}>
              <Card style={styles.card}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Avatar
                    style={{ marginRight: 10 }}
                    size="large"
                    source={require("../../assets/user.png")}
                  />
                  <View>
                    <Text
                      style={{ marginLeft: 20, marginBottom: 2 }}
                      category="label"
                    >
                      {item.name}
                    </Text>
                    <View
                      style={{
                        backgroundColor: "white",
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        minWidth: "60%",
                        marginLeft: 10,
                        borderRadius: 15,
                        maxWidth: "85%",
                        display: "flex",
                      }}
                    >
                      <Text category="s1">{item.comment}</Text>
                    </View>
                  </View>
                </View>
              </Card>
              <View style={{ display: "flex", alignItems: "flex-end" }}>
                <Text
                  category="label"
                  style={{ marginRight: 10, color: "#A4A2A2" }}
                >
                  {item.date}
                </Text>
              </View>
            </View>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "rgba(144, 170, 203, 0)",
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    borderRadius: "40%",
    backgroundColor: "rgba(255, 255, 255, 0.80)",
    marginTop: "2%",
    marginHorizontal: "5%",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  writer: {
    marginLeft: 10,
    padding: 8,
    borderRadius: "50%",
  },
  card: {
    flex: 1,
    marginTop: "2%",
    borderColor: "rgba(144, 170, 203, 0)",
    backgroundColor: "rgba(103, 189, 252,0.3)",
    borderRadius: 20,
  },
});

export default RenderCard;
