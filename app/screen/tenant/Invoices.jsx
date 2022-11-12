import React, { useState, useEffect }  from "react";
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
import axios from 'axios';

const baseUrl ='http://10.111.2.109:8080';
const Invoices = ({ route, navigation }) => {
  const ALL_ROOM = INVOICE;
  const data = ["บิลทั้งหมด", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const displayValue = data[selectedIndex.row];

  const renderOption = (title) => <SelectItem title={title} />;
  const [user, setUser] = useState(null);

  useEffect(() => {
    
      axios.get(`${baseUrl}/invoices`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(
        (error) => console.log('error')
      )
  }, []);
  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_invoice.png")}
        style={styles.background}
      ></Image>
      
      {/* <Layout style={{position: "absolute", width: "35%", borderRadius: "50%", top: "12%", left: "10%"}} level='1'>
      <Select  size='meduim'
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <SelectItem title='Option 1'/>
        <SelectItem title='Option 2'/>
        <SelectItem title='Option 3'/>
      </Select>
    </Layout> */}
      {/* <TouchableOpacity style={[styles.bill, { position: "absolute" }]}>
        <Text
          style={{ color: "#5099FF", fontWeight: "bold", fontSize: "14px" }}
        >
          รอบบิล
        </Text>
        <AntDesign name="down" size={20} color="#9E9E9E" />
      </TouchableOpacity> */}

      <Layout style={styles.bill1} level="1">
        <Select 
          style={{ width: "100%", borderRadius: "50%"}}
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
      {/* <Text style={{position: "absolute"}}>{displayValue}</Text> */}
      <ScrollView style={[styles.box, { flex: 1 }]}>
        <View style={[{ alignItems: "center" }]}>
          {user && (user.map((item, index) => (
            <View key={index}>
              <Box data={item} filter={displayValue} navigation={navigation} />
            </View>
          ))
          )}
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
    width: "35%",
    borderRadius: 50,
    top: "10%",
    marginLeft: 50,
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: 'pink',
    
  },
  box: {
    top: -145,
    zIndex: 100,
  },
});

export default Invoices;
