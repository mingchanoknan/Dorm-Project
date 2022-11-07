import { Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { Dimensions, ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import HeaderBackground from "../../component/background/HeaderBackground";
import RoomImageCarousel from "../../component/carousel/imageCarousel";
import { ROOM } from "../../dummy/ROOM";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const CheckRoomDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [data, setData] = useState();
  useEffect(() => {
    let get = ROOM.filter((item) => item.id == id)[0];
    setData(get);
  }, [id]);
  const image = [
    {
      src: require("../../assets/1.jpg"),
    },
    {
      src: require("../../assets/2.jpg"),
    },
    {
      src: require("../../assets/3.jpg"),
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: '#FDF8F4' }}>
      <HeaderBackground/>
      {data && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
            // backgroundColor: "rgba(123, 255, 207,0.7)",
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
          

          
          <RoomImageCarousel
            image={image}
            width={width-50}
            height={height/3.5}
            paginationColor={data.color1}
          />
        </View>
      )}
      {data && (
        <View style={{ flex: 2, alignItems: "center", position: "relative" }}>
          <View
            style={[
              styles.banner,
              { backgroundColor: data.color1, marginTop: height / 15 },
            ]}
          ><View style={{flexDirection:'row',alignItems:'flex-end',justifyContent:'center'}}>
              <Text category="h3" style={{ textAlign: "center" }}>
              {data.price} THB
            </Text>
            <Text category="s1">/mount</Text>
          </View>
            
            <Text category="s1" style={{ marginTop: "3%" }}>
              {"เหมาะสำหรับประหยัดงบและอาศัย 2 คน"}
            </Text>
            <Text category="label" style={{ textAlign: "right",color:'red'}}>
              {"เหลือ 1 ห้อง"}
            </Text>
          </View>
          <ScrollView style={[styles.information, {borderColor:data.color1 }]}>
            <View style={{ height: 40 }}></View>
            <Text category="h5">Information</Text>
            <Text category="s1">
              ห้องพักพร้อมเข้าอยู่ บรรยากาศดี เงียบสงบ สะอาด ปลอดภัย ตั้งอยู่ใน
              ซอยลาดกระบัง 52 (ซอยจินดาฯ) เดินทางสะดวก ใกล้สนามบินสุวรรณภูมิ
              โรงพยาบาลลาดกระบัง
              และสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
              เหมาะสำหรับนักศึกษา, นักศึกษาฝึกงาน หรือ
              คนทำงานย่านสนามบินสุวรรณภูมิ-ลาดกระบัง
            </Text>
            <Text category="h5" style={{ marginVertical: 10 }}>
              Convinience
            </Text>
            {data.conv.map((item, index) => (
              <Text category="s1" key={index}>
                - {item}
              </Text>
            ))}
            <View style={{ height: 50 }}></View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderRadius: "70%",
    width: "80%",
    padding: "6%",
    position: "absolute",
    top: 10,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  information: {
    flex:1,
    borderWidth: 1,
    borderTopLeftRadius: '45%',
    borderTopRightRadius: '45%',
    width: "90%",
    paddingHorizontal: "5%",
    paddingTop: "10%",
    marginTop: height / 7,
    backgroundColor: "white",
    borderWidth:3
    
  },
});

export default CheckRoomDetail;
