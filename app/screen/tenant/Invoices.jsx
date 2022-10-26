import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import Box from "../../component/invoice/InvoiveBox";
import { INVOICE } from "../../dummy/INVOICE";

const CheckRoomPrice = ({ route, navigation }) => {
  const ALL_ROOM = INVOICE;
  const data = ["Developer", "Designer", "Product Manager"];
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const displayValue = data[selectedIndex.row];

  const renderOption = (title) => <SelectItem title={title} />;

  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_invoice.png")}
        style={styles.background}
      ></Image>
      <TouchableOpacity style={[styles.bill, { position: "absolute" }]}>
        <Text
          style={{ color: "#5099FF", fontWeight: "bold", fontSize: "14px" }}
        >
          รอบบิล
        </Text>
        <AntDesign name="down" size={20} color="#9E9E9E" />
      </TouchableOpacity>

      {/* <Layout style={styles.bill1} level="1">
        <Select
          style={{ width: "100%"}}
          placeholder="รอบบิล"
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {data.map(renderOption)}
        </Select>
      </Layout> */}

      <ScrollView style={[styles.box, { flex: 1 }]}>
        <View style={[{ alignItems: "center" }]}>
          {ALL_ROOM.map((item, index) => (
            <View key={index}>
              <Box data={item} navigation={navigation} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
  view: {
    backgroundColor: "white",
    alignItems: "center",
    height: "100%",
  },
  background: {
    width: "100%",
    zIndex: -100,
    //   borderRadius: "50px",
    //   borderBottomEndRadius: "0px",
    //   borderBottomLeftRadius: "0px",
  },
  bill: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "white",
    position: "absolute",
    width: "35%",
    height: "5%",
    borderRadius: 50,
    top: "12%",
    marginLeft: 55,
  },
  bill1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "white",
    position: "absolute",
    width: "40%",
    borderRadius: 50,
    top: "12%",
    marginLeft: 55,
  },
  box: {
    top: -145,
    zIndex: 100,
  },
});

export default CheckRoomPrice;
