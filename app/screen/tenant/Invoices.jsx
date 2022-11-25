import React, { useState, useEffect } from "react";
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
import { baseUrl } from "@env";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Invoices = ({ route, navigation }) => {
  const myUser = useSelector((state) => state.user)

  const data = [
    "AllBill",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const displayValue = data[selectedIndex.row];

  const renderOption = (title) => <SelectItem title={title} />;
  const [user, setUser] = useState(null);
  
  
  useEffect(() => {
    const url = `${baseUrl}/getListInvoiceNum/${myUser.room_number}`;
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setUser(response.data);
          console.log("POPO")
          console.log(response.data);
          return;
        } else {
          throw new Error("Failed to fetch users invoice user");
        }
      } catch (error) {
        console.log("Data fetching cancelled invoice user");
      }
    };
    fetchUsers();
  }, []);

  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_invoice.png")}
        style={styles.background}
      ></Image>

      <Layout style={styles.bill1} level="1">
        <Select
          style={{ width: "100%", borderRadius: "50%" }}
          placeholder="รอบบิล"
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {data.map((title, index) => (
            <SelectItem key={index} title={title} />
          ))}
          {/* {data.map(renderOption)} */}
        </Select>
      </Layout>

      <ScrollView style={[styles.box, { flex: 1 }]}>
        <View style={[{ alignItems: "center" }]}>
          {user &&
            user.map((item, index) => (
              <View key={index}>
                <Box
                  data={item}
                  filter={displayValue}
                  navigation={navigation}
                />
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
    height: "50%",
    position: "absolute",
    zIndex: -100,
    top: -150,
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
    width: "35%",
    borderRadius: 50,
    marginTop: "10%",
    marginLeft: 50,
    marginBottom: 10,
    borderRadius: 4,
    margin: 2,
  },
  box: {
    zIndex: 100,
  },
});

export default Invoices;
