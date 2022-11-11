import * as React from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Layout } from "@ui-kitten/components";
import ManageRoomForm from "./ManageRoomDetailForm";
import HeaderBackground from "../background/HeaderBackground";
import ManageRoomDetailForm from "./ManageRoomTypeForm";
import ConfirmRoom from "./ConfirmRoom";

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
        this.bgColor = "#fff";
        this.iconColor = "#fff";
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

export default function RoomForm() {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [allData, setAllData] = React.useState(new room());

  const onStepPress = (position) => {
    setCurrentPage(position);
  };

  const renderStepIndicator = (params) => (
    <FontAwesome {...getStepIndicatorIconConfig(params)} />
    );
    
    const changeInput = (text, type) => {
        let obj = {...allData}
        if (type == "type") {
            obj.typeName = text;
        }
        if (type == "bg") {
            obj.bgColor = text
        }
        if (type == "icon") {
            obj.iconColor = text
        }
        if (type == "suggest") {
            obj.suggestion = text
        }
        if (type == "inform") {
            obj.information = text
        }
        if (type == "conve") {
            const arr = text.split(",")
            obj.convenience = arr
        }
        if (type == "price") {
            obj.price = text
        }
        if (type == "image") {
            obj.image = text
        }
        setAllData(obj)
    }

  return (
    <View style={styles.container}>
      <HeaderBackground image={require("../../assets/bg_cancle.png")} />
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
        {currentPage == 0 && <ManageRoomDetailForm allData={allData} changeInput={changeInput} />}
              {currentPage == 1 && <ManageRoomForm allData={allData} changeInput={changeInput} />}
              {currentPage == 2 && <ConfirmRoom allData={allData} />}
      </ScrollView>
      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", margin: 20 }}
      >
        {currentPage == 0 && (
          <Button
            style={{ marginRight: 20 }}
            onPress={() => {
              Alert.alert("Alert Title", "My Alert Msg", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]);
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
              let temp = currentPage;
              ++temp;
              setCurrentPage(temp);
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
              Alert.alert("Alert Title", "My Alert Msg", [
                {
                  text: "Cancel",
                  onPress: () => {
                    console.log("Cancel Pressed");
                    setCurrentPage(2);
                  },
                  style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
