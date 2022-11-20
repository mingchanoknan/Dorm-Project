import * as React from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Layout } from "@ui-kitten/components";
import ManageRoomDetailForm from "./ManageRoomDetailForm";
import HeaderBackground from "../background/HeaderBackground";
import ManageRoomTypeForm from "./ManageRoomTypeForm";
import ConfirmRoom from "./ConfirmRoom";
import AddRoomType from "../../screen/lessor/AddRoomType";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { baseUrl } from "@env";

const RoomFormEdit = ({ navigation, route, data }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [allData, setAllData] = React.useState(null);
  const [imageUri, setImageUri] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const onStepPress = (position) => {
    setCurrentPage(position);
  };
  React.useEffect(() => {
    setAllData(data);
  }, [data]);

  const uploadFile = async () => {
    let existedImage = [...allData.image].filter(
      (image) => image.uri == undefined
    );
    let unexistedImage = [...allData.image].filter(
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
        
      let all = { ...allData };
      all.image = newArr.filter(
        (image) => image != undefined
      );
      console.log(all.image);
      axios
        .put(`${baseUrl}/room/update`, all)
        .then((response) => {
          setVisible(false);
          Alert.alert(response.data, undefined, [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const changeInput = (text, type) => {
    let objRoom = { ...allData };
    if (type == "type") {
      objRoom.typeName = text;
    }
    if (type == "bg") {
      objRoom.bgColor = text;
    }
    if (type == "icon") {
      objRoom.iconColor = text;
    }
    if (type == "suggest") {
      objRoom.suggestion = text;
    }
    if (type == "inform") {
      objRoom.information = text;
    }
    if (type == "conve") {
      const arr = text.split(",");
      objRoom.convenience = arr;
    }
    if (type == "price") {
      objRoom.price = text;
    }
    if (type == "image") {
      objRoom.image = text;
    }
    setAllData(objRoom);
  };
  const secondIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#47C5FC",
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: "#47C5FC",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#47C5FC",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#47C5FC",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#47C5FC",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#47C5FC",
  };

  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: "feed",
      color: stepStatus === "finished" ? "#ffffff" : "#000",
      size: 15,
    };
    switch (position) {
      case 0: {
        iconConfig.name = "building";
        break;
      }
      case 1: {
        iconConfig.name = "bed";
        break;
      }
      case 2: {
        iconConfig.name = "check";
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
  };

  class room {
    constructor() {
      this.typeName = "";
      this.suggestion = "";
      this.information = "";
      this.convenience = [];
      this.price = 0;
      this.bgColor = "#ffffff";
      this.iconColor = "#ffffff";
      this.image = [];
    }
    typeName;
    suggestion;
    information;
    convenience;
    price;
    bgColor;
    iconColor;
    image;
  }
  const renderStepIndicator = (params) => (
    <FontAwesome {...getStepIndicatorIconConfig(params)} />
  );
  return (
    <View style={styles.container}>
      <HeaderBackground image={require("../../assets/bg_cancle.png")} />
      <Spinner
        visible={visible}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.stepIndicator}>
        <StepIndicator
          stepCount={3}
          customStyles={secondIndicatorStyles}
          currentPosition={currentPage}
          onPress={onStepPress}
          renderStepIndicator={renderStepIndicator}
          labels={["Room Type", "Room Detail", "Confirm"]}
        />
      </View>
      <ScrollView style={{ flex: 1 }}>
        {allData != null && currentPage == 0 && (
          <ManageRoomTypeForm allData={allData} changeInput={changeInput} />
        )}
        {allData != null && currentPage == 1 && (
          <ManageRoomDetailForm
            allData={allData}
            changeInput={changeInput}
            screen={"edit"}
          />
        )}
        {allData != null && currentPage == 2 && (
          <ConfirmRoom allData={allData} screen={"edit"} />
        )}
      </ScrollView>
      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", margin: 20 }}
      >
        {currentPage == 0 && (
          <Button
            style={{ marginRight: 20 }}
            onPress={() => {
              Alert.alert(
                "ต้องการยกเลิกการเพิ่มประเภทห้องหรือไม่",
                "ถ้ากดยกเลิกแล้วไม่สามารถย้อนกลับได้",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "OK", onPress: () => navigation.goBack() },
                ]
              );
            }}
            appearance="ghost"
            status="danger"
          >
            Cancle
          </Button>
        )}
        {currentPage > 0 && (
          <Button
            style={{ marginRight: 20 }}
            onPress={() => {
              let temp = currentPage;
              --temp;
              setCurrentPage(temp);
            }}
            appearance="outline"
          >
            Previous
          </Button>
        )}
        {(currentPage == 0 || currentPage == 1) && (
          <Button
            style={{}}
            onPress={() => {
              if (
                currentPage == 0 &&
                (allData.typeName == "" || allData.price == "0")
              ) {
                Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วน", undefined, [
                  {
                    text: "OK",
                  },
                ]);
              } else if (
                currentPage == 1 &&
                (allData.suggestion == "" ||
                  allData.information == "" ||
                  allData.convenience == "" ||
                  allData.image == "")
              ) {
                Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วน", undefined, [
                  {
                    text: "OK",
                  },
                ]);
              } else {
                let temp = currentPage;
                ++temp;
                setCurrentPage(temp);
              }
            }}
          >
            Next
          </Button>
        )}
        {currentPage == 2 && (
          <Button
            style={{}}
            onPress={() => {
              let temp = currentPage;
              ++temp;
              setCurrentPage(temp);
              Alert.alert("ต้องการบันทึกข้อมูลใช่หรือไม่", undefined, [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: async () => {
                    setVisible(true);
                    await uploadFile();
                  },
                },
              ]);
            }}
            status="success"
          >
            Save
          </Button>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  stepIndicator: {
    marginVertical: "12%",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginHorizontal: "5%",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stepLabel: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#999999",
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#4aae4f",
  },
});

export default RoomFormEdit;
