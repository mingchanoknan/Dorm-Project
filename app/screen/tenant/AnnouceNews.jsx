import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NEWS } from "../../dummy/NEWS";
import News from "../../component/card/news";

const AnnouceNews = ({ route, navigation }) => {
  const annNews = NEWS;
  const [text, setText] = React.useState("");
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg_login.jpg")}
        style={styles.background}
      ></Image>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "500",
          position: "absolute",
          top: 60,
          alignSelf: "center",
        }}
      >
        Feed
      </Text>
      <View style={styles.search}>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="type...."
          fontSize={20}
          onChangeText={setText}
          // value={value}
          style={[styles.input]}
        ></TextInput>
        <FontAwesome
          name="pencil-square-o"
          color={"grey"}
          size={25}
        ></FontAwesome>
      </View>

      <View style={styles.scrollView}>
        <ScrollView>
          {annNews.map((item, index) => (
            <News data={item} key={index}  navigation={navigation} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: "space-between",
    display: "flex",
    height: "100%",
    felx: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  background: {
    width: "100%",
    height: "29%",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  input: {
    height: 60,
    width: 250,
    padding: 15,
    fontSize: 18,
    marginBottom: 2,
    borderRightColor: "white",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  search: {
    position: "absolute",
    alignItems: "center",
    top: 120,
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    paddingRight: 10,
    borderColor: "#90AACB",
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "white",
  },
  scrollView: {
    width: "100%",
    top: 250,
    position: "absolute",
    height: 600,
    paddingBottom: 50,
  },
});

export default AnnouceNews;
