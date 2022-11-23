import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Layout, Text, Divider } from "@ui-kitten/components";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import React from "react";

const InvoiceBox = (props) => {
  // const color2 = props.status;
  // const colorStatus = color2.equals("UNAPPROVED_BILL") ? '#4291FF' : '#F26565';
  //const { id } = route.params;
  // const [data, setData] = useState();
  // useEffect(() => {
  //   let get = INVOICE.filter((item) => item.id == id)[0];
  //   setData(get);
  // }, [id]);
  return (
    <View style={styles.container}>
    {props.filter === 'AllBill' && (
      <Card
        style={[styles.cardContainer]}
        onPress={() =>
          props.navigation.navigate("InvoiceDetail", {  id:  props.data.id,
              categoryTitle:  props.data.room_number, month: props.data.month, year: props.data.year})
        }
      >
        <View style={styles.build}>
          <FontAwesome name="building" size={24} color="black" />
          <FontAwesome
            style={{ left: "-5%", top: 3.5 }}
            name="building"
            size={18}
            color="black"
          />
        </View>
        <View style={styles.head}>
          <Text
            style={{ fontSize: "13px", fontWeight: "bold", color: "white" }}
          >
            {" "}
            ห้อง {props.data.room_number} {props.data.month}/{props.data.year}{" "}
          </Text>
        </View>
        {/* <Text style={styles.text} category="h2">
          {props.data.month}
        </Text>
        <Text style={styles.text} category="s1">
          Start at <Text category="h6">{props.data.year}</Text> THB / month
        </Text> */}

        <View style={{ display: "flex", flexDirection: "column" }}>
          <View style={styles.state}>
            <Text style={styles.txt}> สถานะ: </Text>
            <Text style={[styles.txt, { color: "#F26565" }]}>
              {" "}
              {props.data.status}{" "}
            </Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.txt}> รวมค่าใช้จ่าย </Text>
            <Text
              style={[styles.txt, { backgroundColor: "#CAEEF8", padding: 5 }]}
            >
              {" "}
              {props.data.total.toFixed(2)}{" "}
            </Text>
            <Text style={styles.txt}> บาท </Text>
          </View>
        </View>
        {/* <TouchableOpacity style={styles.btnLoad}>
          <Text
            style={{ fontSize: "10px", fontWeight: "bold", color: "white" }}
          >
            {" "}
            downloade{" "}
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.btnNext}>
          <Text
            style={{ fontSize: "10px", fontWeight: "bold", color: "#FFB085" }}
          >
            {" "}
            ดูรายละเอียด{" "}
          </Text>
          <AntDesign name="rightcircle" size={16} color="#FFB085" />
        </TouchableOpacity>
      </Card>
      )}

      {props.data.month === props.filter && (
        <Card
        style={[styles.cardContainer]}
        onPress={() =>
          props.navigation.navigate("InvoiceDetail", {  id:  props.data.id,
              categoryTitle:  props.data.room_number, month: props.data.month, year: props.data.year})
        }
      >
        <View style={styles.build}>
          <FontAwesome name="building" size={24} color="black" />
          <FontAwesome
            style={{ left: "-5%", top: 3.5 }}
            name="building"
            size={18}
            color="black"
          />
        </View>
        <View style={styles.head}>
          <Text
            style={{ fontSize: "13px", fontWeight: "bold", color: "white" }}
          >
            {" "}
            ห้อง {props.data.room_number} {props.data.month}/{props.data.year}{" "}
          </Text>
        </View>
        {/* <Text style={styles.text} category="h2">
          {props.data.month}
        </Text>
        <Text style={styles.text} category="s1">
          Start at <Text category="h6">{props.data.year}</Text> THB / month
        </Text> */}

        <View style={{ display: "flex", flexDirection: "column" }}>
          <View style={styles.state}>
            <Text style={styles.txt}> สถานะ: </Text>
            <Text style={[styles.txt, { color: "#F26565" }]}>
              {" "}
              {props.data.status}{" "}
            </Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.txt}> รวมค่าใช้จ่าย </Text>
            <Text
              style={[styles.txt, { backgroundColor: "#CAEEF8", padding: 5 }]}
            >
              {" "}
              {props.data.total.toFixed(2)}{" "}
            </Text>
            <Text style={styles.txt}> บาท </Text>
          </View>
        </View>
        {/* <TouchableOpacity style={styles.btnLoad}>
          <Text
            style={{ fontSize: "10px", fontWeight: "bold", color: "white" }}
          >
            {" "}
            downloade{" "}
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.btnNext}>
          <Text
            style={{ fontSize: "10px", fontWeight: "bold", color: "#FFB085" }}
          >
            {" "}
            ดูรายละเอียด{" "}
          </Text>
          <AntDesign name="rightcircle" size={16} color="#FFB085" />
        </TouchableOpacity>
      </Card>
      )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    zIndex: 100,
    width: "100%",
    height: 200,
    position: "relative",
    padding: 10,
    display: "flex",
    borderRadius: 30,
  },
  text: {
    marginBottom: 20,
  },
  container: {
    width: 350,
    paddingVertical: 10,
  },
  build: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    margin: 25,
    marginTop: 5,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#D2EDF9",
    shadowColor: "#C3C3C3",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },

  head: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    margin: 25,
    marginTop: 5,
    left: 80,
    width: "70%",
    height: 40,
    borderRadius: 30,
    backgroundColor: "#FFB085",
  },
  state: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    margin: 5,
    marginTop: -18,
    left: 80,
    top: 63,
  },

  total: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    margin: 5,
    marginTop: -22,
    left: 80,
    top: 90,
  },

  btnLoad: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    margin: 25,
    marginTop: 10,
    left: 60,
    top: 100,
    width: "35%",
    height: 25,
    borderRadius: 30,
    backgroundColor: "#FFB085",
  },
  btnNext: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    margin: 25,
    marginTop: 10,
    left: 165,
    top: 100,
    width: "35%",
    height: 25,
    borderRadius: 30,
    borderColor: "#FFB085",
    borderWidth: 2,
  },
  txt: {
    fontSize: "12px",
    fontWeight: "bold",
  },
});

export default InvoiceBox;
