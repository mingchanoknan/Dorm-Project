import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, Text, Image, StyleSheet, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import MainLessor from '../screen/lessor/MainLessor'
import AddParcel from "../screen/lessor/AddParcel";
import CancelContract from "../screen/lessor/CancelContract";
import CheckRoomDetail from "../screen/lessor/CheckRoomDetail";
import CheckRoomPrice from "../screen/lessor/CheckRoomsPrice";
import CheckRoomsStatus from "../screen/lessor/CheckRoomsStatus";
import LeaseContract from "../screen/lessor/LeaseContract";
import ManageParcel from "../screen/lessor/ManageParcel";
import RecordMeter from "../screen/lessor/RecordMeter";
import Response from "../screen/lessor/Response";
import DetailReserve from "../screen/lessor/DetailReserve";
import ReserveRoom from "../screen/lessor/ReserveRoom";
import UserProfile from "../screen/lessor/UserProfile";
import ManageInvoice from "../screen/lessor/ManageInvoice";
import BillInvoice from "../screen/lessor/BillInvoice";

import { FontAwesome } from "@expo/vector-icons";
const LessorNavigation = () => {
  const LessorNavigator = createDrawerNavigator();

  const RoomNavigator = createNativeStackNavigator();
  const ContractNavigator = createNativeStackNavigator();
  const ParcelNavigator = createNativeStackNavigator();
  const BillNavigator = createNativeStackNavigator();

  const LessorsFavTabNavigator = createBottomTabNavigator();
  const MainTabNavigator = createNativeStackNavigator();
  const LessorsNavigator = createNativeStackNavigator();
  
  const listIconToOpenDrawer = (navigation) => (
    <FontAwesome
      name="bars"
      size={24}
      color="black"
      onPress={() => navigation.openDrawer()}
    />
  );
  const listIconToOpenDrawer2 = (navigation) => (
    <FontAwesome
      name="bars"
      size={24}
      color="black"
      onPress={() => navigation.openDrawer()}
      style={{ paddingLeft: 10 }}
    />
  );
  const listIconToOpenDrawer3 = (navigation) => (
    <FontAwesome
      name="bars"
      size={24}
      color="white"
      onPress={() => navigation.openDrawer()}
      style={{ paddingLeft: 15 }}
    />
  );
  const RoomNavigation = () => {
    return (
      <RoomNavigator.Navigator initialRouteName="CheckRoomPrice">
        <RoomNavigator.Screen
          name="CheckRoomPrice"
          component={CheckRoomPrice}
          options={({ route, navigation }) => {
            return {
              title: "Room",
              headerLeft: () => listIconToOpenDrawer(navigation),
            };
          }}
        />
        <RoomNavigator.Screen
          name="CheckRoomDetail"
          component={CheckRoomDetail}
          options={({ route }) => {
            return {
              title: route.params.name,
            };
          }}
        />
      </RoomNavigator.Navigator>
    );
  };

  
//Stack
const MyLessorsNavigator = () => {
  return (
    <LessorsNavigator.Navigator
      initialRouteName="MainLessor"
      screenOptions={{
        headerShown: false,
        headerTintColor: "white",
      }}
    >
      <LessorsNavigator.Screen
        name="MainLessor"
        component={MainLessor}
        options={({ route, navigation }) => ({
          drawerLabel: "Main",
          title: '',
          headerShown: true,
          headerLeft: () => listIconToOpenDrawer2(navigation),
          headerBackground: () => (
            <View style={{backgroundColor: '#7dd0f5', height: '100%'}}>
                <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
          ></Image>
          </View>
          )
        })}
      />
      <LessorsNavigator.Screen
        name="Invoices"
        component={ManageInvoiceNavigation}
        options={({ route }) => ({
          // title: route.params.categoryTitle,
        })}
      />
      <LessorsNavigator.Screen
        name="ManageParcel"
        component={ManageParcel}
        options={({ route }) => ({
          // title: route.params.categoryTitle,
        })}
      />

      <LessorsNavigator.Screen
        name="CheckRoom"
        component={RoomNavigation}
        options={({ route }) => ({
          // title: route.params.categoryTitle,
        })}
      />
      <LessorsNavigator.Screen
        name="Contract"
        component={CancelContract}
        options={({ route, navigation }) => ({
          // title: route.params.categoryTitle,
          title: 'Contract',
          headerStyle: { backgroundColor: 'transparent'},
          headerTintColor : 'white',
          headerShown: true

        })}
      />
      <LessorsNavigator.Screen
        name="RoomStatus"
        component={ContractNavigation}
        options={({ route }) => ({
          // title: route.params.mealTitle,
          
        })}
      />

      <LessorsNavigator.Screen
        name="Meter"
        component={RecordMeter}
        options={({ route }) => ({
          // title: route.params.categoryTitle,
        })}
      />
    </LessorsNavigator.Navigator>
  );
};


  const MyLessorsFavTabNavigator = () => {
    return (
      <LessorsFavTabNavigator.Navigator
        initialRouteName="Lessors"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'red',
      //     tabBarStyle: {
      //   backgroundColor: '#d1cfcf',
      //   borderTopColor: 'transparent',
      // },
        }}
        
      >
        <LessorsFavTabNavigator.Screen
          name="Lessors"
          component={MyLessorsNavigator}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Entypo name="home" size={24} color="color" />;
            },
            tabBarLabel: () => {
              return <Text style={{fontSize: "12px"}}>หน้าหลัก</Text>;
            },
          }}
        />
        <LessorsFavTabNavigator.Screen
          name="Favorites"
          component={AddParcel}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Fontisto name="bell-alt" size={24} color="color" />;
            },
            tabBarLabel: () => {
              return <Text  style={{fontSize: "12px"}}>การแจ้งเตือน</Text>;
            },
          }}
        />
      </LessorsFavTabNavigator.Navigator>
      
    );
  };

  // const ContractNavigation = () => {
  //   return (
  //     <ContractNavigator.Navigator>
  //       <ContractNavigator.Screen
  //         name="LeaseContract"
  //         component={LeaseContract}
  //         options={({ route, navigation }) => {
  //           return {
  //             title: "Lease Contract",
  //             headerLeft: () => listIconToOpenDrawer(navigation),
  //           };
  //         }}
  //       />
  //       <ContractNavigator.Screen
  //         name="CancelContract"
  //         component={CancelContract}
  //         options={({ route, navigation }) => {
  //           return {
  //             title: "Cancel Contract",
  //             headerLeft: () => listIconToOpenDrawer(navigation),
  //           };
  //         }}
  //       />
  //     </ContractNavigator.Navigator>
  //   );
  // };

  const ContractNavigation = () => {
    return (
      <ContractNavigator.Navigator>
      <ContractNavigator.Screen
         name="CheckRoomsStatus"
        component={CheckRoomsStatus}
        options={({ route, navigation }) => {
          return {
            title: "Room Status",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer2(navigation),
          };
        }}
        />
        <ContractNavigator.Screen
          name="ReserveRoom"
          component={ReserveRoom}
          options={({ route, navigation }) => {
            return {
              title: "ห้อง " + route.params.categoryTitle,
              headerTintColor: '#47C5FC',
            };
          }}
        />
        <ContractNavigator.Screen
          name="DetailReserve"
          component={DetailReserve}
          options={({ route, navigation }) => {
            return {
              title: "ห้อง " + route.params.categoryTitle,
              headerTintColor: '#47C5FC',
            };
          }}
        />
        <ContractNavigator.Screen
          name="LeaseContract"
          component={LeaseContract}
          options={({ route, navigation }) => {
            return {
              title: "Lease Contract",
            };
          }}
        />
        <ContractNavigator.Screen 
          name="UserProfile"
          component={UserProfile}
          options={({ route, navigation }) => {
            return {
              title: "ห้อง " + route.params.categoryTitle,
              headerShown: true,
              headerStyle: { backgroundColor: 'transparent'},
              headerTintColor : 'white',
            };
          }}
        />

      </ContractNavigator.Navigator>
    );
  };

  const ManageInvoiceNavigation = () => {
    return (
      <BillNavigator.Navigator>
      <BillNavigator.Screen
         name="ManageInvoice"
        component={ManageInvoice}
        options={({ route, navigation }) => {
          return {
            title: "Manage Invoice",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer2(navigation),
          };
        }}
        />
        <BillNavigator.Screen name="BillInvoice" component={BillInvoice}
        options={({ route, navigation }) => {
            return {
              title: "ห้อง " + route.params.categoryTitle,
              headerTintColor: '#47C5FC',
            };
          }}
         />
      </BillNavigator.Navigator>
    );
  };

  const ParcelNavigation = () => {
    return (
      <ParcelNavigator.Navigator>
        <ParcelNavigator.Screen
          name="ManageParcel"
          component={ManageParcel}
          options={({ route, navigation }) => {
            return {
              title: "Manage Parcel",
              headerLeft: () => listIconToOpenDrawer(navigation),
            };
          }}
        />
        <ParcelNavigator.Screen name="AddParcel" component={AddParcel} />
      </ParcelNavigator.Navigator>
    );
  };

  return (
    <LessorNavigator.Navigator initialRouteName="Main"
      screenOptions={({ route, navigation }) => {
        return {
          headerShown: false,
          // headerStyle: { backgroundColor: '#47C5FC'},
          // headerTintColor : 'white',
         
        };
      }}
      
    >
      <LessorNavigator.Screen
        name="Main"
        component={MyLessorsFavTabNavigator}
        options={({ route, navigation }) => ({
          drawerLabel: "Main",
          title: '',
          headerShown: false,
        })}
      />
      <LessorNavigator.Screen name="Room" component={RoomNavigation} />
      {/* <LessorNavigator.Screen name="Contract" component={ContractNavigation} /> */}
      <LessorNavigator.Screen
        name="CancelContract"
        component={CancelContract}
        options={({ route, navigation }) => {
          return {
            title: "Contract",
            headerShown: true,
            headerStyle: { backgroundColor: 'transparent'},
            headerTintColor : 'white',
            headerLeft: () => listIconToOpenDrawer3(navigation),
          };
        }}
      />
      {/* <LessorNavigator.Screen
        name="CheckRoomsStatus"
        component={CheckRoomsStatus}
        options={({ route, navigation }) => {
          return {
            title: "Room Status",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer2(navigation),
          };
        }}
      /> */}
      <LessorNavigator.Screen name="Room Status" component={ContractNavigation} />
      <LessorNavigator.Screen
        name="RecordMeter"
        component={RecordMeter}
        options={({ route, navigation }) => {
          return {
            title: "Room Meter",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer2(navigation),
          };
        }}
      />
      <LessorNavigator.Screen name="ManageInvoices" component={ManageInvoiceNavigation} 
       
      />
      <LessorNavigator.Screen name="Parcel" component={ParcelNavigation} />
      <LessorNavigator.Screen
        name="Response"
        component={Response}
        options={({ route, navigation }) => {
          return {
            title: "Response",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer2(navigation),
          };
        }}
      />
    </LessorNavigator.Navigator>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: 160,
    height: 50,
    top: "40%",
    alignSelf: "center"
  },
})
export default LessorNavigation;
