import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, Card, Input, List, Text } from "@ui-kitten/components";
import RoomImageCarousel from "../carousel/imageCarousel";
import { useTheme } from "@react-navigation/native";
import { baseUrl } from "@env";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import RenderCard from "./RenderCard";
import Spinner from "react-native-loading-spinner-overlay/lib";

const data = new Array(8).fill({
  title: "Item",
});
const width = Dimensions.get("screen").width;
const ReportCard = (props) => {
  const [loading, setLoading] = useState(false);


  class comment {
    constructor(comment) {
      this.name = props.name;
      this.comment = comment;
      this.date = new Date().toLocaleString();
    }
    name;
    comment;
    date;
  }
  const saveComment = async (item, commentInput) => {
    setLoading(true)
    const newcomment = new comment(commentInput);
    item.comments.push(newcomment);
    console.log(item.comments)
    const res = await axios.put(`${baseUrl}/report/update/`, item);
    setLoading(false)
    console.log( item.comments)
  };
  
  return (
    <View style={{ flex: 1 }}>
      <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
      {props.page == "response" ? (
        <ScrollView>
          {props.data.map((item, index) => {
            return (
              <View key={index}>
                <RenderCard
                item={item}
                page={props.page}
                  updateStatus={props.updateStatus}
                  saveComment= {saveComment}
              />
              </View>
              
            )
          })}
        </ScrollView>
      ) : (
        <ImageBackground
          source={require("../../assets/bg-report.png")}
          style={{ flex: 1 }}
          resizeMode={"cover"}
          >
            <ScrollView>
            {props.data.map((item,index) => {
            
              return (
                <View key={index}>
                  <RenderCard item={item} saveComment={saveComment}  page={props.page} />
               </View>
              )
            })}
              </ScrollView>
        </ImageBackground>
      )}
    </View>
  );
};
export default ReportCard;

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
  },
  writer: {
    marginLeft: 10,
    padding: 8,
    borderRadius: "50%",
  },
  card: {
    flex: 1,
    marginTop: "2%",
    marginHorizontal: "5%",
    borderColor: "rgba(144, 170, 203, 0)",
    backgroundColor: "rgba(103, 189, 252,0.3)",
    borderRadius: 20,
  },
});
