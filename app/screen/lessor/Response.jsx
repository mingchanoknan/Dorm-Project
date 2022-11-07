import { Divider, IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import ReportCard from "../../component/card/ReportCard";
import { REPORT } from "../../dummy/REPORT";

const Response = () => {
  const [selectItem, setSelectItem] = useState(new IndexPath(0));

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../../assets/bg-respone.png')} resizeMode="cover" style={styles.image}>
      <View
        style={{
          flex: 1,
          marginTop: "15%",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          paddingTop: "5%",
          borderTopLeftRadius: '60%',
          borderTopRightRadius: '60%',
        }}
      >
        <View style={styles.filter}>
          <Text category="h6">รายการแจ้งทั้งหมด</Text>

          <Select
            value={
              selectItem.row === 0
                ? "สถานะ"
                : selectItem.row === 1
                ? "ยังไม่ซ่อม"
                : "ซ่อมแล้ว"
            }
            style={{ width: 150 }}
            selectedIndex={selectItem}
            onSelect={(index) => {
              setSelectItem(index);
            }}
            placeholder={"สถานะ"}
          >
            <SelectItem title="สถานะ" disabled />

            <SelectItem title="ยังไม่ซ่อม" />
            <SelectItem title="ซ่อมแล้ว" />
          </Select>
        </View>
        <Divider
          style={{
            marginTop: 20,
            marginHorizontal: "5%",
            marginBottom: 2,
            backgroundColor: "#777777",
            height: 2,
          }}
        ></Divider>
        <ReportCard data={REPORT} page={"response"} />
        </View>
        </ImageBackground>
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

  filter: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: "8%",
    alignItems: "flex-end",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});
export default Response;
