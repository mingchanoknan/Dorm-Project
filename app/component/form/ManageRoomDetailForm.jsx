import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Icon, Input } from "@ui-kitten/components";
import RoomCard from "../card/RoomCard";
const ManageRoomForm = (props) => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    setImage(props.allData.image);
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let list = [...image];
      list.unshift(result);
      props.changeInput(list, "image");
      setImage(list);
    }
  };
  const deleteImage = (index) => {
    let list = [...image];
    list.splice(index, 1);
    props.changeInput(list, "image");
    setImage(list);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: "10%", marginVertical: "3%" }}>
        <Input
          style={{ marginBottom: 10 }}
          label="คำแนะนำ"
          placeholder="Place your Text"
          value={props.allData.suggestion}
          onChangeText={(nextValue) => props.changeInput(nextValue, "suggest")}
        />
        <Input
          label="Information"
          style={{ marginBottom: 10 }}
          placeholder="Place your Text"
          multiline={true}
          textStyle={{ minHeight: 64 }}
          value={props.allData.information}
          onChangeText={(nextValue) => props.changeInput(nextValue, "inform")}
        />
        <Input
          label="Convenience"
          style={{ marginBottom: 10 }}
          placeholder="Place your Text"
          multiline={true}
          textStyle={{ minHeight: 64 }}
          value={props.allData.convenience.join(",")}
          onChangeText={(nextValue) => props.changeInput(nextValue, "conve")}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(71, 197, 252, 0.1)",
            padding: 20,
            borderRadius: 20,
          }}
          onPress={pickImage}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Icon
              name="cloud-upload-outline"
              fill="#000"
              style={{ width: 50, height: 50 }}
            />
            <Text>UPLOAD YOUR IMAGE</Text>
          </View>
        </TouchableOpacity>

        {image.length > 0 &&
          image.map((item, index) => {
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
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
export default ManageRoomForm;
