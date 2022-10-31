import { BottomNavigation, BottomNavigationTab, Layout, Tab, TabBar, TabView } from "@ui-kitten/components";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Background from "../../component/background/Background";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import MeterForm from "../../component/form/MeterForm";

const RecordMeter = () => {
  const [selectedMeter, setSelectedMeter] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const shouldLoadComponent = (index) => index === selectedMeter;

  const Water = () => {
    return (
        <Entypo name="water" size={24} color="black" />
    )
  }
  const Lightning = () => {
    return (
        <MaterialCommunityIcons name="home-lightning-bolt-outline" size={24} color="black" />
    )
  }
  const [roomWater, setRoomWater] = useState();
  const [meterWater, setMeterWater] = useState();
  const [monthlyWater, setMonthlyWater] = useState();
  const [roomElec, setRoomElec] = useState();
  const [meterElec, setMeterElec] = useState();
  const [monthlyElec, setMonthlyElec] = useState();

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={{ paddingHorizontal: 20, flex: 3}}>

        <View style={{flex: 0.5, justifyContent: "flex-end"}}>
          <TabBar
          selectedIndex={selectedMeter}
          shouldLoadComponent={shouldLoadComponent}
          onSelect={(index) => setSelectedMeter(index)}
          style={{backgroundColor: "white", borderRadius: 50}}
          indicatorStyle={{width: "70%"}}
          
        >
            <Tab style={{paddingVertical: 5}} icon={Water} title="Water"  />
            <Tab icon={Lightning} title="Electricity" />
          </TabBar>
        </View>
        <ScrollView style={{flex: 2, padding: 10, marginTop: 20}}>
          {/* if meter is water and display is form */}
          {(selectedMeter == 0 && selectedType == 0) &&
            <MeterForm test={1} type="water" onChangeRoom={setRoomWater} onChangeMeter={setMeterWater} onChangeMonthly={setMonthlyWater} room={roomWater} meter={meterWater} monthly={monthlyWater} />
          }
          {/* if meter is water and display is table */}
          {(selectedMeter == 0 && selectedType == 1) &&
            <MeterForm test={2} />
          }
          {/* if meter is elec and display is water */}
          {(selectedMeter == 1 && selectedType == 0) &&
            <MeterForm test={1} type="elec" onChangeRoom={setRoomElec} onChangeMeter={setMeterElec} onChangeMonthly={setMonthlyElec} room={roomElec} meter={meterElec} monthly={monthlyElec} />
          }
          {/* if meter is elec and display is table */}
          {(selectedMeter == 1 && selectedType == 1) &&
            <MeterForm test={4} />
          }
        </ScrollView>
        <View style={{flex: 0.2, justifyContent: "flex-end"}}>
          <BottomNavigation selectedIndex={selectedType} onSelect={(index) => setSelectedType(index)} style={{backgroundColor: "white", borderRadius: 50}}
            indicatorStyle={{width: "70%"}}>
            <BottomNavigationTab title="Form" />
            <BottomNavigationTab title="Display" />
          </BottomNavigation>   
        </View> 
      </View>
    </View>
  );
};

export default RecordMeter;
