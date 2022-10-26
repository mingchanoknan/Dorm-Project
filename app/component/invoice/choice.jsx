import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Avatar, Button, Layout, Popover,  Divider } from "@ui-kitten/components";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

const PopoverFullWidthShowcase = () => {
  const [visibleqr, setVisibleqr] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  const renderToggleButton = () => (
    <Button title="qr"
      style={[styles.btnQr,]}
      onPress={() => setVisibleqr(true)}
    >
      <MaterialCommunityIcons name="qrcode-scan" size={18} color="#093879" />
      <Text style={{ color: "black", fontSize: "12px", }}>QR พร้อมเพย์</Text>
    </Button>
  );
  const renderToggleButton2 = () => (
    <Button title="pay" style={[styles.btnQr]} onPress={() => setVisible(true)}>
      <MaterialIcons name="payment" size={18} color="#093879" />
      {/* <Avatar
            style={styles.avatar}
            source={require("../../assets/ic_prompt_pay.png")}
          />  */}
      <Text style={{ color: "black", fontSize: "12px" }}>โอน/ชำระผ่านบัญชีธนาคาร</Text>
    </Button>
  );

  return (
    <View style={{ marginTop: 3, marginLeft: 20, marginRight: 20,}}>
      <Popover
        visible={visibleqr}
        anchor={renderToggleButton}
        fullWidth={true}
        onBackdropPress={() => setVisibleqr(false)}
      >
        <Layout style={styles.container}>
          {/* <Avatar
            style={styles.avatar}
            source={require("../../assets/ic_prompt_payn.png")}
          /> */}
          <Image style={{
             resizeMode: "center",
            height: 300,
            width: 200}} source={require("../../assets/qr.jpg")}></Image>
        </Layout>
      </Popover>

      <Popover
        visible={visible}
        anchor={renderToggleButton2}
        fullWidth={true}
        onBackdropPress={() => setVisible(false)}
      >
        <Layout style={styles.content}>
        
       
          <View style={{display: 'flex', flexDirection: 'row'}}>
          <Image style={{
             resizeMode: "contain",
            height: 22,
            }} source={require("../../assets/kbank.png")}></Image>
            <Text style={{fontWeight: "bold", marginTop: 2, fontSize: "12px"}}> กสิกรไทย(KBANK)</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{fontWeight: "bold", fontSize: "12px"}}> เลขที่บัญชี : </Text> 
            <Text style={{fontWeight: "bold", fontSize: "14px", color: "#11BD63"}}> 679-586-85687 </Text> 
            </View>

            <Divider style={{zIndex: 100, width: '100%', position: "absolute", top: '55%'}} />
            
            <View style={{display: 'flex', flexDirection: 'row', marginTop: '5%'}}>
          <Image style={{
             resizeMode: "contain",
            height: 22,
            }} source={require("../../assets/ktb.png")}></Image>
            <Text style={{fontWeight: "bold", marginTop: 2, fontSize: "12px"}}> กรุงไทย(KTB)</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{fontWeight: "bold", fontSize: "12px"}}> เลขที่บัญชี : </Text> 
            <Text style={{fontWeight: "bold", color: "#4291FF", fontSize: "14px"}}> 679-586-85687 </Text> 
            </View>
        </Layout>

      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  avatar: {
    marginHorizontal: 4,
  },
  btnQr: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderColor: "white",
    borderBottomColor: "#757575",
    borderRadius: 0,
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
  }
});

export default PopoverFullWidthShowcase;
