import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
  Tab,
  TabBar,
  TabView,
} from "@ui-kitten/components";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Background from "../../component/background/Background";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MeterForm from "../../component/form/MeterForm";
import HeaderBackground from "../../component/background/HeaderBackground";
import MeterDisplay from "../../component/display/MeterDisplay";

const RecordMeter = () => {
  const [selectedMeter, setSelectedMeter] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const shouldLoadComponent = (index) => index === selectedMeter;
  const shakeIconRefWater = useRef();
  const shakeIconRefElectricity = useRef();
  useEffect(() => {
    if (selectedMeter === 0) {
      shakeIconRefWater.current.startAnimation()
    } else {
      shakeIconRefElectricity.current.startAnimation()
    }

  },[selectedMeter])
  const waterShakeIcon = (props) => {
    return (
      <Icon {...props} ref={shakeIconRefWater} animation="shake" name="droplet"/>
    );
  };
  const electricityShakeIcon = (props) => {
    return (
      <Icon {...props} ref={shakeIconRefElectricity} animation="shake" name="flash"/>
    );
  };
  const Water = () => {
    return <Entypo name="water" size={24} color="black" />;
  };
  const Lightning = () => {
    return (
      <MaterialCommunityIcons name="home-lightning-bolt-outline" size={24} />
    );
  };
  const [roomWater, setRoomWater] = useState();
  const [meterWater, setMeterWater] = useState();
  const [monthlyWater, setMonthlyWater] = useState();
  const [roomElec, setRoomElec] = useState();
  const [meterElec, setMeterElec] = useState();
  const [monthlyElec, setMonthlyElec] = useState();

  return (
    <View style={{ flex: 1 }}>
      <HeaderBackground image={require("../../assets/bg_cancle.png")} />
      <View style={{ paddingHorizontal: 20, flex: 3 }}>
        <View style={{ flex: 0.75, justifyContent: "flex-end" }}>
          <TabBar
            selectedIndex={selectedMeter}
            shouldLoadComponent={shouldLoadComponent}
            onSelect={(index) => 
              setSelectedMeter(index)
            }
            style={{ backgroundColor: "white", borderRadius: 50 }}
            indicatorStyle={{ width: "80%" }}
          >
            <Tab
              
              // style={{ paddingVertical: 5 }}
              icon={waterShakeIcon}
              title="มิเตอร์ค่าน้ำ"
            />
            <Tab icon={electricityShakeIcon} title="มิเตอร์ค่าไฟ" />
          </TabBar>
        </View>
        <View style={{ flex: 2, padding: 10, marginTop:15}}>
          {/* if meter is water and display is form */}
          {selectedMeter == 0 && selectedType == 0 && (
            <MeterForm
              type="water"
              onChangeRoom={setRoomWater}
              onChangeMeter={setMeterWater}
              onChangeMonthly={setMonthlyWater}
              room={roomWater}
              meter={meterWater}
              monthly={monthlyWater}
            />
          )}
          {/* if meter is water and display is table */}
          {selectedMeter == 0 && selectedType == 1 &&
            <MeterDisplay  type={'water'}
            />}
          {selectedMeter == 1 && selectedType == 0 && (
            <MeterForm
              type="electricity"
              onChangeRoom={setRoomElec}
              onChangeMeter={setMeterElec}
              onChangeMonthly={setMonthlyElec}
              room={roomElec}
              meter={meterElec}
              monthly={monthlyElec}
            />
          )}
          {/* if meter is elec and display is table */}
          {selectedMeter == 1 && selectedType == 1 && <MeterDisplay type={'electricity'}/>}
        </View>
        <View style={{ flex: 0.2, justifyContent: "flex-end" }}>
          <BottomNavigation
            selectedIndex={selectedType}
            onSelect={(index) => setSelectedType(index)}
            style={{ backgroundColor: "white", borderRadius: 50 }}
            indicatorStyle={{ width: "75%" }}
          >
            <BottomNavigationTab title="บันทึก" />
            <BottomNavigationTab title="แสดงข้อมูล" />
          </BottomNavigation>
        </View>
      </View>
    </View>
  );
};

export default RecordMeter;
