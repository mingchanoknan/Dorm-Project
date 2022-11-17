import {
  Avatar,
  Button,
  Divider,
  IndexPath,
  Layout,
  Popover,
  Select,
  SelectItem,
  Icon
} from "@ui-kitten/components";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderBackground from "../../component/background/HeaderBackground";
import ReportCard from "../../component/card/ReportCard";
import { REPORT } from "../../dummy/REPORT";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Card, Input, List, Text } from "@ui-kitten/components";
import FooterBackground from "../../component/background/FooterBackground";
import {baseUrl} from "@env"
import axios from "axios";
let h = Dimensions.get('window').height
let height;
if (h > 1000) {
  height = h / 2.5
}
else {
  height = h / 3.5
}
let room_number = "A203"
let username = "gotenlnwZa";
const Report = () => {

  const [selectItem, setSelectItem] = useState(new IndexPath(0));
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState([]);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [allReport, setAllReport] = useState([]);
  const [listBySelect, setListBySelect] = useState([]);
  const [selectStatus, setSelectStatus] = useState("all")

  useEffect(() => {
    const getReport = async() => {
      const reports = await axios.get(`${baseUrl}/report/getall/`)
      console.log(reports.data)
      let sortDate = reports.data
      sortDate.sort((a, b) => {
        function convertDate(text) {
          const date = text.replace(",", "")
          const arr = date.split(" ")
          const arrDate = arr[0].split("/")
          const arrTime = arr[1].split(":")
          return new Date(arrDate[2], arrDate[1], arrDate[0], arrTime[0], arrTime[1], arrTime[2])
        }

        return convertDate(b.date) - convertDate(a.date)
      }
        );
      setAllReport(sortDate)
      setListBySelect(sortDate)
    }
   getReport()
  }, [])
  
  useEffect(() => {
    const queryByStatus = async() => {
      const response = await axios.get(`${baseUrl}/report/status/`, { params: { status: selectStatus } })
      
      let sortDate = response.data
      sortDate.sort((a, b) => {
        function convertDate(text) {
          const date = text.replace(",", "")
          const arr = date.split(" ")
          const arrDate = arr[0].split("/")
          const arrTime = arr[1].split(":")
          return new Date(arrDate[2], arrDate[1], arrDate[0], arrTime[0], arrTime[1], arrTime[2])
        }

        return convertDate(b.date) - convertDate(a.date)
      }
      );
      setListBySelect(sortDate)
    }
    if (selectStatus == "all") {
      setListBySelect(allReport)
    }
    else {
      queryByStatus();
    }
    console.log(selectStatus)
  },[selectStatus])
  class report  {
    constructor() {
      this.room_number = room_number;
      this.name = username;
      this.content = "";
      this.date =0;
      this.topic = "";
      this.status = false;
      this.comments = [];
      this.image = []
    }
    room_number;
    name;
    content;
    date;
    topic;
    status;
    comments;
    image;
    
  }
  class comment  {
    constructor() {
      this.name = username;
      this.comment = "";
      this.date =0;

    }

    name;
    comment;
    date;

    
  }
  const sendReport = async () => {
    setLoading(true)
    let imageUrl = [];
    const uploadImage = async () => {
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
      imageUrl = re.data;
      
    } catch (err) {
      console.log(err);
      }
    }

    if (image.length > 0) {
     await uploadImage()
    }
    let createReport = new report();
    let date = new Date().toLocaleString()
    createReport.topic = topic
    createReport.content = content
    createReport.image = imageUrl
    createReport.date = date
    
    const res = await axios.post(`${baseUrl}/report/add`, createReport)
    setLoading(false)
    Alert.alert(res.data, undefined, [
      {
        text: "Yes", onPress: () => {
          setTopic("")
          setContent("")
          setImage([])
          setVisible(false);}
      },
    ])
 console.log(createReport)
  }
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
      setImage(list);
    }
  };
  const deleteImage = (index) => {
    let list = [...image];
    list.splice(index, 1);

    setImage(list);
  };
  const renderToggleButton = () => (
    <View style={{ width: "98%", marginTop: "2%" }}>
      <Button onPress={() => {
        setVisible(true);
      }
        
      } status="warning">
        Let us know about your problem.
      </Button>
    </View>
  );
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}>
      <HeaderBackground image={require("../../assets/bg_invoice.png")} />
      <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
      <Popover
        backdropStyle={styles.backdrop}
        visible={visible}
        anchor={renderToggleButton}
        fullWidth={true}
        onBackdropPress={() => setVisible(false)}
      >
        <View style={{ backgroundColor: "rgba(182, 232, 255, 1)",flex:1}}>
          <View style={styles.formReport}>
            <View style={styles.roomName}>
              <View style={styles.formControl}>
                <Text> ห้อง : </Text>
                <Input
                  disabled={true}
                  placeholder="Disabled"
                  style={{ borderRadius: "50%" }}
                  value={room_number}
                />
              </View>

              <View style={styles.formControl}>
                <Text> ชื่อ : </Text>
                <Input
                  disabled={true}
                  placeholder="Disabled"
                  style={{ borderRadius: "50%" }}
                  value={username}
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
                flex:1,
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
                onPress={pickImage}
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
                      text: "Yes", onPress: () => {
                        sendReport();
                      }
                    },
                  ])
                  
                }}
              >
                <Text category="s1" style={{ color: "white" }}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{maxHeight: height}}>
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
      </Popover>

      <View style={{ flex: 1, marginTop: "5%" }}>
        <View style={styles.filter}>
          <Text category="h6">รายการแจ้งทั้งหมด</Text>

          <Select
            value={
              selectItem.row === 0
                ? "ทั้งหมด"
                : selectItem.row === 1
                ? "ยังไม่ซ่อม"
                : "ซ่อมแล้ว"
            }
            style={{ width: 150 }}
            selectedIndex={selectItem}
            onSelect={(index) => {
              setSelectItem(index);
              if (index.row == 0) {
                setSelectStatus("all")
              } else if (index.row == 1) {
                setSelectStatus(false)
              } else {
                setSelectStatus(true)
              }
            }}
            placeholder={"ทั้งหมด"}
          >
            <SelectItem title="ทั้งหมด"  />

            <SelectItem title="ยังไม่ซ่อม" />
            <SelectItem title="ซ่อมแล้ว" />
          </Select>
        </View>
        <Divider
          style={{
            marginHorizontal: "5%",
            marginBottom: 2,
            backgroundColor: "#777",
            height: 3,
          }}
        ></Divider>
        <ReportCard data={listBySelect} page={"report"} />
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
export default Report;
