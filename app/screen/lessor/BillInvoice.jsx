import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity, TextInput, Alert
} from "react-native";
import { Card, Layout, Divider } from "@ui-kitten/components";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import {baseUrl} from "@env"
import axios from 'axios';
import BillRoomInvoice from "../../component/invoice/BillRoomInvoice";
import FormInvoice from "../../component/invoice/FormInvoice";
import { StackActions } from "@react-navigation/native";


function User({userObject, month, year, user, roomInvoice, rentPrice, meterWater, meterElec, navigation}) {
  
  // console.log(dorm_fee)
  // console.log(common_fee)
  // console.log(expenses)

  return (
    <View style={styles.container}>
    { user && roomInvoice && meterWater && meterElec && (
      <Card style={[styles.cardContainer]} disabled={true}>
        <BillRoomInvoice roomInvoice={roomInvoice} user={user} month={month} year={year}  meterWater={meterWater} meterElec={meterElec} />
      </Card>
    )}
    { user && !roomInvoice && rentPrice && meterWater && meterElec && (
      <Card style={[styles.cardContainer]} disabled={true}>
        <FormInvoice rentPrice={rentPrice} user={user} month={month} year={year} meterWater={meterWater} meterElec={meterElec} />
      </Card>
    )}
    
    
        </View>
  );
}

const BillInvoice = ({ route, navigation }, props) => {
  const { categoryTitle, month, year } = route.params;
  const [data, setData] = useState();
  const [user, setUser] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [roomInvoice, setRoomInvoice] = useState(null);
  const [rentPrice, setRentPrice] = useState(null);
  const [water, setWater] = useState(null);
  const [electricity, setElectricity] = useState(null);

  useEffect(() => {
    const url = `${baseUrl}/getInvoiceNum/${categoryTitle}`;
    const urlUser = `${baseUrl}/getUserNum/${categoryTitle}`;
    const urlRoomInvoice = `${baseUrl}/getInvoice/${categoryTitle}/${month}/${year}`;
    const urlRentPrice = `${baseUrl}/getRoomNum/${categoryTitle}`;
    const urlWaterMeter =`${baseUrl}/meter/getMeterInvoice/${categoryTitle}/water/${month} ${year}`;
    const urlElecMeter =`${baseUrl}/meter/getMeterInvoice/${categoryTitle}/electricity/${month} ${year}`;

    const fetchUsers = async () => {
      try {
        const response = await axios.get(url);
        const resUser = await axios.get(urlUser);
        const resInvoice = await axios.get(urlRoomInvoice);
        const resRentPrice = await axios.get(urlRentPrice);
        const resWater = await axios.get(urlWaterMeter);
        const resElectric = await axios.get(urlElecMeter);

        if (response.status === 200 && resUser.status === 200 && resInvoice.status === 200 && resRentPrice.status === 200 && resWater.status === 200 && resElectric.status === 200) {
          
              setInvoice(response.data);
              setUser(resUser.data);
              setRoomInvoice(resInvoice.data);
              setRentPrice(resRentPrice.data);
              setElectricity(resElectric.data);
              setWater(resWater.data);

              console.log(resRentPrice.data);
              console.log(resElectric.data);
              console.log(resWater.data);

          if(resElectric.data === "" || resWater.data === ""){
            
                 Alert.alert(  
                  'กรุณากรอกมิเตอร์ของรอบบิล',  
                  month+" "+year,  
                  [  
                      {text: 'OK', onPress: () => {
                      navigation.dispatch(
                        StackActions.replace("Meter", {  })
                      );
                      }},  
                      // {  
                      //     text: 'Cancel',  
                      //     onPress: () => console.log('Cancel Pressed'),  
                      //     style: 'cancel',  
                      // }
                  ],  
                  {cancelable: false}  
              )  
            
          }
          //console.log(resInvoice.data);
          //console.log(resUser.data);
          //console.log(response.data);
          // console.log("1"+categoryTitle);
          return;
        } else {
          throw new Error("Failed to fetch users bill");
        }
      } catch (error) {
          console.log('Data fetching cancelled bill');
      }
      
    };
    fetchUsers();
  }, [categoryTitle]);
  //console.log(invoice);

  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_invoice.png")}
        style={styles.background}
      ></Image>
       <User rentPrice={rentPrice} roomInvoice={roomInvoice} user={user} month={month} year={year} meterWater={water} navigation={navigation} meterElec={electricity}/>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    alignItems: "center",
    height: "100%",
  },
  background: {
    width: "100%",
    zIndex: -100,
  },
  box: {
    top: -145,
    zIndex: 100,
  },

  bg_money: {
    zIndex: 100,
    top: -255,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",

    width: "75%",
    height: "13%",
    alignSelf: "center",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    zIndex: 100,
    width: "100%",
    height: "90%",
    position: "relative",
    padding: 10,
    display: "flex",
    borderRadius: 30,
  },
  text: {
    marginBottom: 20,
  },
  container: {
    width: "95%",
    height: "100%",
    paddingVertical: 10,
    top: -260,
    zIndex: 100,
    alignItems: "center",
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

  btnLoad: {
    top: 370,
    left: "75%",
    width: 85,
    padding: 8,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#FFB085",
  },
  txt: {
    fontSize: "11px",
    fontWeight: "bold",
  },
  txtHead: {
    fontSize: "11px",
    fontWeight: "bold",
  },
  status: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "55%",
    marginLeft: 15,
  },
  conStatus: {
    backgroundColor: "#EEEEEE",
    padding: 15,
    borderRadius: 15,
    alignSelf: "flex-end",
    flexDirection: "row",
    width: "100%",
    marginLeft: 10,
  },
  send: {
    width: "100%",
    marginLeft: 10,
    marginTop: 5,
    backgroundColor: "#EEEEEE",
    padding: 15,
    borderRadius: 15,
    alignSelf: "flex-end",
  },
  conSend: {
    backgroundColor: "#D9D9D9",
    padding: 2,
    borderRadius: 5,
    width: "100%",
    top: -9,
  },
  txtInput: {
    borderWidth:1,
    padding: 3, 
    paddingLeft: 5, 
    borderRadius: 5,  
    borderColor: "#bedefa",
     width: "60%", 
     height: 30, 
     fontSize: "11px", 
     fontWeight: 'bold',
      color: '#2D83FC',
  }
});
export default BillInvoice;
