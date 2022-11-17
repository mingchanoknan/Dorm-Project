import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, Card, Input, List, Text } from "@ui-kitten/components";
import RoomImageCarousel from "../carousel/imageCarousel";

const data = new Array(8).fill({
  title: "Item",
});
const width = Dimensions.get('screen').width;
const ReportCard = (props) => {
  const [widthOfView, setWidthOfView] = useState(0);
  const renderItemHeader = (headerProps, item) => (
    <View {...headerProps}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text category="h6">{item.item.topic}</Text>
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
              <Text category="s2">{item.item.name} </Text>
            </View>

            <View
              style={[
                styles.writer,
                { backgroundColor: "rgba(130, 219, 150, 0.6)" },
              ]}
            >
              <Text category="s2">{item.item.room_number} </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: item.item.status ?  "#48C78E" :"#F14668",
            padding: 10,
            borderRadius: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxHeight: 40,
            width: 110,
          }}
        >
          <Text style={{ color: "white" }}>
            {item.item.status? "ซ่อมแล้ว" : "ยังไม่ซ่อม"}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderFooter = (footerProps, item) => {
      return (
        <View
          {...footerProps}
          style={{
            margin: 10,
          }}
        >
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
            >
              <Text category="label">SAVE</Text>
            </TouchableOpacity>
          </View>
          {item.item.comments.length > 0 &&
            item.item.comments.map((item, index) => (
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
                  <Text category="label" style={{ marginRight: "5%",color:"#A4A2A2"}}>
                    {item.date}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      );
  };

  const renderItem = (item) => (
    <View style={{ marginVertical: "1%" }} onLayout={(event) => setWidthOfView(event.nativeEvent.layout.width)}>
      <Card
        style={styles.item}
        header={(headerProps) => renderItemHeader(headerProps, item)}
        footer={(footerProps) => renderFooter(footerProps, item)}
      >
        <Text category="s1" style={{ padding: 10, textAlign: "center" }}>
          {item.item.content}
        </Text>
        {item.item.image.length > 0 &&
          <RoomImageCarousel image={item.item.image} width={widthOfView - 50} height={300} paginationColor={"#84E6E3" } />
       }
          
       
        <View style={{ display: "flex", alignItems: "flex-end" }}>
          <Text category="label" style={{ color: "#A4A2A2" }}>
            {item.item.date}
          </Text>
        </View>
      </Card>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {props.page == "response" ? (
        <View style={{ flex: 1 }}>
          <List
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={props.data}
            renderItem={renderItem}
          />
        </View>
      ) : (
        <ImageBackground
          source={require("../../assets/bg-report.png")}
          style={{ flex: 1 }}
          resizeMode={"cover"}
        >
          <List
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={props.data}
            renderItem={renderItem}
          />
        </ImageBackground>
      )}
    </View>
  );
};
export default ReportCard;

const styles = StyleSheet.create({
  container: {
    flex:1,
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
