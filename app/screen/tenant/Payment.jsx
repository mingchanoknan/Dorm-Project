import React from "react";
import { Text, View, TextInput, FlatList, ScrollView } from "react-native";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { Datepicker, Icon, Layout } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Choice from "../../component/invoice/choice";
import Time from "../../component/invoice/time";
import Date from "../../component/invoice/date";


const Payment = ({ route, navigation }) => {
  const { total } = route.params;
  return (
    <View style={styles.view}>
      <View style={styles.bg_money}>
        <Text
          style={{
            color: "#656464",
            margin: 10,
            marginLeft: 20,
            fontWeight: "bold",
          }}
        >
          ยอดชำระเงินทั้งหมด
        </Text>
        <Text
          style={{
            color: "#1C5DB8",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "32px",
            top: 6,
          }}
        >
          ฿{total.toFixed(2)}
        </Text>
      </View>
      <Image
        source={require("../../assets/bg_payment.png")}
        style={styles.background}
      ></Image>
      <View style={[styles.choice, { position: "absolute" }]}>
        <Text
          style={{
            color: "#656464",
            margin: 10,
            marginLeft: 20,
            fontWeight: "bold",
          }}
        >
          ช่องทางการชำระเงิน
        </Text>
        <Choice />
        <Text
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "center",
            display: "flex",
            top: "42%",
          }}
        >
          ชื่อบัญชี : บจก.หอพัก A5
        </Text>
      </View>
      <View style={[styles.slip, { position: "absolute" }]}>
        <Text
          style={{
            color: "#656464",
            margin: 10,
            marginLeft: 20,
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          แจ้งหลักฐานการโอนเงิน
        </Text>
        <Text style={[styles.txt, { left: "4%" }]}>จำนวนเงิน</Text>
        <TextInput
          style={[styles.inputInfo, { width: "80%", paddingLeft: "5%" }]}
          keyboardType="numeric"
        ></TextInput>

        <View style={styles.timeDate}>
          <Text style={[styles.txt, { position: "absolute", top: 10 }]}>
            วันที่โอนเงิน
          </Text>
          {/* <TextInput style={[styles.inputInfo, {position: 'absolute', top: '10%', right: '12.5%', width: '33%', marginLeft: '13%'}]}></TextInput> */}
          <DatepickerAccessoriesShowcase />
          <Text
            style={[
              styles.txt,
              { position: "absolute", marginLeft: "50%", top: 10 },
            ]}
          >
            เวลาที่โอนเงิน
          </Text>
          {/* <TextInput style={[styles.inputInfo, {position: 'absolute', top: '10%', right: '12.5%', width: '33%', marginLeft: '13%'}]}></TextInput> */}
          <TimePicker />

          <Text style={[styles.txt, { marginTop: 72 }]}>หมายเหตุ(ถ้ามี)</Text>
          <TextInput
            style={[
              styles.inputInfo,
              {
                width: "80%",
                marginTop: 88,
                position: "absolute",
                paddingLeft: "5%",
                marginLeft: "6%",
              },
            ]}
          ></TextInput>

          {/* <Button style={styles.btnUp} title="click">กดเพื่อแนบสลิป</Button> */}

          <TouchableOpacity
            style={[
              styles.btnUp,
              { justifyContent: "center", marginLeft: "6%" },
            ]}
          >
            <Text
              style={{
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              
              Upload Slip
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "red",
              position: "absolute",
              fontSize: "10px",
              fontWeight: "bold",
              marginVertical: 140,
              marginLeft: "45%",
            }}
          >
            
            กรุณาแนบสลิปทุกครั้ง!!
          </Text>
        </View>
        <TouchableOpacity
            style={[
              styles.btnSend,
              { justifyContent: "center"},
            ]}
          >
            <Text
              style={{
                color: "white",
                fontSize: "13px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              แจ้งหลักฐานการชำระเงิน
            </Text>
          </TouchableOpacity>
      </View>
      
    </View>
  );
};

const CalendarIcon = (props) => (
  <AntDesign name="calendar" size={18} color="#65778E" />
);

const TimeIcon = (props) => (
  <MaterialIcons name="access-time" size={18} color="#65778E" />
);

const DatepickerAccessoriesShowcase = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <Layout style={[styles.date, {}]} level="1">
      {/* <Datepicker
        placeholder="Pick Date"
        date={date}
        onSelect={(nextDate) => setDate(nextDate)}
        accessoryRight={CalendarIcon}
      /> */}
      <Date />
    </Layout>
  );
};

const TimePicker = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <Layout
      style={[styles.date, { left: "42%", marginRight: "55%" }]}
      level="1"
    >
      <Time />
    </Layout>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "white",
    alignItems: "center",
  },
  background: {
    height: "85%",
    width: "100%",
    borderRadius: "50px",
    borderBottomEndRadius: "0px",
    borderBottomLeftRadius: "0px",
  },
  bg_money: {
    backgroundColor: "#E5F8FE",
    width: "75%",
    height: "13%",
    alignSelf: "center",
    bottom: 7,
  },
  choice: {
    backgroundColor: "#E5F8FE",
    position: "absolute",
    borderRadius: "15px",
    width: "85%",
    height: "36%",
    top: "17%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  slip: {
    backgroundColor: "#E5F8FE",
    position: "absolute",
    borderRadius: "15px",
    width: "85%",
    height: "43%",
    top: "54.5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  inputInfo: {
    borderWidth: 1,
    borderColor: "#D8D4D4",
    backgroundColor: "white",
    borderRadius: "5px",
    top: "1%",
    height: "9%",
    alignSelf: "center",
  },
  date: {
    position: "absolute",
    marginLeft: "6%",
    top: 28,
    alignSelf: "center",
    width: "32%",
  },
  timeDate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    left: "5%",
    right: "25%",
    height: "100%",
  },
  txt: {
    color: "#646262",
    fontSize: "11px",
    marginLeft: 33,
    fontWeight: "bold",
  },
  btnUp: {
    backgroundColor: "#FFB085",
    position: "absolute",
    width: "30%",
    height: 30,
    color: "white",
    top: 120,
    marginTop: "3%",
    borderRadius: "50%",
  },
  btnSend: {
    display: "flex",
    flexDirection: "column",
    alignSelf: 'center',
    backgroundColor: "#7DC2FB",
    position: "absolute",
    width: "80%",
    height: "12%",
    color: "white",
    top: '80%',
    borderRadius: "10%",
  }
});
export default Payment
