import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Card, Layout, Divider } from "@ui-kitten/components";
import DatePicker from "../../component/contract/DatePicker";
import { RESERVE } from "../../dummy/RESERVE";

const DetailReserve = ({ route, navigation }) => {
  // const catId = route.params.categoryId
  const detail = RESERVE.filter(
    (item) => item.room_id == route.params.categoryId
  );
  // console.log(detail[0].first_name);
  // const displayedMeals = RESERVE.filter(
  //   (meal) => meal.room_id.indexOf(catId) >= 0
  // );

  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          {" "}
          ข้อมูลการจอง{" "}
        </Text>
      </View>

      <Card style={styles.card}>
        <View style={{ flexDirection: "row", top: "15%" }}>
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}
          >
            ชื่อผู้จอง :
          </Text>
          <TextInput
            editable={false}
            style={{
              backgroundColor: "#F5F7F8",
              width: "35%",
              padding: 5,
              borderRadius: 50,
              paddingLeft: 20,
              marginRight: 10,
            }}
          >
            <Text style={{ fontSize: "12.5px" }}>{detail[0].first_name}</Text>
          </TextInput>

          <Text
            style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}
          >
            นามสกุล
          </Text>
          <TextInput
            editable={false}
            style={{
              backgroundColor: "#F5F7F8",
              width: "33%",
              padding: 5,
              borderRadius: 50,
              paddingLeft: 20,
            }}
          >
            <Text style={{ fontSize: "12.5px" }}>{detail[0].last_name}</Text>
          </TextInput>
        </View>

        <View style={{ display: "flex", flexDirection: "row", top: "20%" }}>
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}
          >
            เบอร์โทร :
          </Text>
          <TextInput
            editable={false}
            style={{
              backgroundColor: "#F5F7F8",
              width: "33%",
              padding: 5,
              borderRadius: 50,
              paddingLeft: 20,
              marginRight: 10,
            }}
          >
            <Text style={{ fontSize: "12.5px" }}>{detail[0].mobile}</Text>
          </TextInput>
        </View>

        <View style={{ display: "flex", flexDirection: "row", top: "25%" }}>
          <Text
            style={{ fontSize: "12px", fontWeight: "bold", marginRight: 7 }}
          >
            วันเข้านัดทำสัญญา :
          </Text>
          <TextInput
            style={{
              backgroundColor: "#F5F7F8",
              width: "35%",
              padding: 5,
              borderRadius: 50,
              paddingLeft: 20,
              marginRight: 10,
            }}
          ><Text style={{ fontSize: "12.5px" }}>{detail[0].lease_date}</Text></TextInput>
          {/* <View
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              top: -5,
              width: 105,
            }}
          >
            <DatePicker data={detail[0].lease_date} />
          </View> */}
        </View>

        <View style={{ flexDirection: "row", alignSelf: "center", top: "40%" }}>
          <TouchableOpacity style={styles.btnContract} onPress={() => { 
            navigation.navigate("LeaseContract", {
              // categoryId: itemData.item.id,
              // categoryTitle: itemData.item.room_number,
            });
          }}>
            <Text
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              {" "}
              ทำสัญญา{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnCancle, { marginLeft: 5 }]}>
            <Text
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "#F26565",
                textAlign: "center",
              }}
            >
              {" "}
              ยกเลิกการจอง{" "}
            </Text>
          </TouchableOpacity>
        </View>

      </Card>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    borderRadius: "50%",
    top: "20%",
  },
  header: {
    position: "absolute",
    backgroundColor: "#FFB085",
    padding: 10,
    borderRadius: 50,
    width: "50%",
    textAlign: "center",
    top: "18%",
    zIndex: 100,
    alignSelf: "center",
  },
  btnContract: {
    display: "flex",
    justifyContent: 'center',
    backgroundColor: "#47C5FC",
    padding: 5,
    width: 100,
    height: 35,
    borderRadius: 50,
  },
  btnCancle: {
    display: "flex",
    justifyContent: 'center',
    borderColor: "#F26565",
    borderWidth: 1,
    padding: 5,
    width: 100,
    height: 35,
    borderRadius: 50,
  },
});
export default DetailReserve;
