import { Button, Text, View } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input } from "@ui-kitten/components";
import RoomCard from "../card/RoomCard";
const ManageRoomDetailForm = (props) => {
  const colorPicker = useRef();
  const [bgColor, setBgColor] = useState("#fff");
  const [iconColor, setIconColor] = useState("#fff");
  const [toggleColorPickerBackground, setToggleBackground] = useState(false);
  const [toggleColorPickerIcon, setToggleIcon] = useState(false);
    useEffect(() => {
        setBgColor(props.allData.bgColor)
        setIconColor(props.allData.iconColor)
    }, [])
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: "10%", marginVertical: "3%" }}>
          <Input
            style={{ marginBottom: 10 }}
            label={"ชื่อประเภท"}
            placeholder="Place your Text"
            value={props.allData.typeName}
            onChangeText={(nextValue) => props.changeInput(nextValue, "type")}
          />
          <Input
            style={{ marginBottom: 10 }}
            label={"ราคาเริ่มต้นต่อเดือน"}
            placeholder="Place your Text"
            keyboardType="number-pad"
            value={props.allData.price}
            onChangeText={(nextValue) => props.changeInput(nextValue, "price")}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: bgColor,
              padding: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,

              elevation: 4,
            }}
            onPress={() => setToggleBackground(!toggleColorPickerBackground)}
          >
            <Text>
              {!toggleColorPickerBackground ? "เลือกสีพื้นหลัง" : "ปิดเลือกสี"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setToggleIcon(!toggleColorPickerIcon)}
            style={{
              backgroundColor: iconColor,
              padding: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,

              elevation: 4,
            }}
          >
            <Text>
              {!toggleColorPickerIcon ? "เลือกสีไอคอน" : "ปิดเลือกสี"}
            </Text>
          </TouchableOpacity>
        </View>

        {toggleColorPickerBackground && (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              padding: 30,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
              margin: 10,

              elevation: 8,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              สีพื้นหลัง
            </Text>
            <ColorPicker
              color={bgColor}
              ref={colorPicker}
              onColorChange={(color) => {
                props.changeInput(color, "bg");
                setBgColor(color);
              }}
            />
          </View>
        )}
        {toggleColorPickerIcon && (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              padding: 30,
              margin: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,

              elevation: 8,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 20 }}>สีไอคอน</Text>
            <ColorPicker
              color={iconColor}
              ref={colorPicker}
              onColorChange={(color) => {
                props.changeInput(color, "icon");
                setIconColor(color);
              }}
            />
          </View>
        )}
          </View>
          <RoomCard data={props.allData} />
    </View>
  );
};
export default ManageRoomDetailForm;
