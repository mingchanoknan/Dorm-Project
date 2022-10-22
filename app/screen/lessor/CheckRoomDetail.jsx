import { Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import RoomImageCarousel from "../../component/carousel/RoomImageCarousel";
import { ROOM } from "../../dummy/ROOM";

const CheckRoomDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [data, setData] = useState();
  useEffect(() => {
    let get = ROOM.filter((item) => item.id == id)[0];
    setData(get);
  }, [id]);
  return (
    <View style={{ flex: 1 }}>
      {data && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          <RoomImageCarousel />
        </View>
      )}
      {data && (
        <View style={{ flex: 2, alignItems: "center", position: "relative", paddingTop: 80 }}>
          <View style={[styles.banner, { backgroundColor: data.color1 }]}>
            <Text category="h5" style={{ textAlign: "center" }}>
              {data.price}
            </Text>
            <Text category="s2">{"เหมาะสำหรับประหยัดงบและอาศัย 2 คน"}</Text>
            <Text category="s2" style={{ textAlign: "right" }}>
              {"เหลือ 1 ห้อง"}
            </Text>
          </View>
          <ScrollView style={[styles.information]}>
            <View style={{ height: 40 }}></View>
            <Text category="h6" style={{ marginVertical: 10 }}>
              Information
            </Text>
            <Text>
              ห้องพักพร้อมเข้าอยู่ บรรยากาศดี เงียบสงบ สะอาด ปลอดภัย ตั้งอยู่ใน
              ซอยลาดกระบัง 52 (ซอยจินดาฯ) เดินทางสะดวก ใกล้สนามบินสุวรรณภูมิ
              โรงพยาบาลลาดกระบัง
              และสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
              เหมาะสำหรับนักศึกษา, นักศึกษาฝึกงาน หรือ
              คนทำงานย่านสนามบินสุวรรณภูมิ-ลาดกระบัง
            </Text>
            <Text category="h6" style={{ marginVertical: 10 }}>
              Convinience
            </Text>
            {data.conv.map((item, index) => (
              <Text key={index}>- {item}</Text>
            ))}
            <View style={{ height: 40 }}></View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderRadius: 40,
    width: "80%",
    padding: 15,
    position: "absolute",
    top: 25,
    zIndex: 1000
  },
  information: {
    borderWidth: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: 350,
    paddingHorizontal: 20,
  },
});

export default CheckRoomDetail;
