import {
  Avatar,
  Button,
  Divider,
  IndexPath,
  Layout,
  Popover,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderBackground from "../../component/background/HeaderBackground";
import ReportCard from "../../component/card/ReportCard";
import { REPORT } from "../../dummy/REPORT";
import { Ionicons } from "@expo/vector-icons";
import { Card, Input, List, Text } from "@ui-kitten/components";
import FooterBackground from "../../component/background/FooterBackground";

const Report = () => {
  const [selectItem, setSelectItem] = useState(new IndexPath(0));
  const [visible, setVisible] = useState(false);

  const renderToggleButton = () => (
    <View style={{width:'98%', marginTop:'2%'}}>
    <Button onPress={() => setVisible(true)} status='warning' >
      Let us know about your problem.
      </Button>
    </View>
  );
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}>
      <HeaderBackground />
      <Popover
      backdropStyle={styles.backdrop}
      visible={visible}
      anchor={renderToggleButton}
        onBackdropPress={() => setVisible(false)}>
        <View style={{ backgroundColor:'rgba(182, 232, 255, 1)',}}>
        <View style={styles.formReport}>
          <View style={styles.roomName}>
            <View style={styles.formControl}>
              <Text> ห้อง : </Text>
              <Input
                disabled={true}
                placeholder="Disabled"
                style={{ borderRadius: "50%" }}
              />
            </View>

            <View style={styles.formControl}>
              <Text> ชื่อ : </Text>
              <Input
                disabled={true}
                placeholder="Disabled"
                style={{ borderRadius: "50%" }}
              />
            </View>
          </View>
          <View style={[styles.formControl, { paddingVertical: 10 }]}>
            <Text> หัวข้อ : </Text>
            <Input
              style={{ minWidth: "80%", borderRadius: "15%" }}
              placeholder="หัวข้อการแจ้งซ่อม"
            />
          </View>
          <View style={styles.content}>
            <Text> เนื้อหา : </Text>
            <Input
              style={{ minWidth: "80%", borderRadius: "25%" }}
              multiline={true}
              textStyle={{ minHeight: 64 }}
              placeholder="ใส่รายรายละเอียด"
            />
          </View>
          <View
            style={{
              display: "flex",
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
                borderRadius: '50%',
                paddingHorizontal:15
                
              }}
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
              onPress={()=> setVisible(false)}
            >
              <Text category="s1" style={{ color: "white" }}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
          </View>
    </Popover>
     
      <View style={{ flex: 1, marginTop: "5%" }}>
        <View style={styles.filter}>
          <Text category="h6">รายการแจ้งทั้งหมด</Text>
          
            <Select
            value={selectItem.row === 0 ? 'สถานะ': (selectItem.row === 1 ?'ยังไม่ซ่อม': 'ซ่อมแล้ว')}
            style={{ width: 150}}
            selectedIndex={selectItem}
            onSelect={(index) => {
              setSelectItem(index);
              ;
            }}
            placeholder={"สถานะ"}
          >
            <SelectItem title="สถานะ" disabled />

            <SelectItem title="ยังไม่ซ่อม" />
            <SelectItem title="ซ่อมแล้ว" />
          </Select>

          
        </View>
        <Divider
          style={{marginHorizontal:'5%',marginBottom:2, backgroundColor: "#777",height:3 }}
        ></Divider>
        <ReportCard data={REPORT} page={"report"} />
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
    paddingHorizontal: '5%',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding:20
  },
  content2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  avatar: {
    marginHorizontal: 4,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});
export default Report;
