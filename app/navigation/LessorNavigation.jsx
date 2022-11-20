import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import MainLessor from "../screen/lessor/MainLessor";
import AddParcel from "../screen/lessor/AddParcel";
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
import AnnouceNews from "../screen/lessor/AnnouceNews";
import NewsDetail from "../screen/lessor/NewsDetail";
import BillRoomInvoice from "../component/invoice/BillRoomInvoice";
import CheckPayment from "../screen/lessor/CheckPayment";
import PaymentDetail from "../screen/lessor/PaymentDetail";
import Register from "../screen/Register";

import { FontAwesome } from "@expo/vector-icons";
import AddRoomType from "../screen/lessor/AddRoomType";
import EditRoomType from "../screen/lessor/EditRoomType";
const LessorNavigation = (props) => {
  const LessorNavigator = createDrawerNavigator();

  const RoomNavigator = createNativeStackNavigator();
  const ContractNavigator = createNativeStackNavigator();
  const PaymentNavigator = createNativeStackNavigator();
  const ParcelNavigator = createNativeStackNavigator();
  const BillNavigator = createNativeStackNavigator();

  const LessorsFavTabNavigator = createBottomTabNavigator();
  const MainTabNavigator = createNativeStackNavigator();
  const LessorsNavigator = createNativeStackNavigator();
  const NewsNavigator = createNativeStackNavigator();

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
  const logout2 = () => (
    <Ionicons
      name="ios-log-out-outline"
      size={24}
      color="black"
      onPress={() => {
        Alert.alert("ต้องการออกจากระบบหรือไม่", undefined, [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Yes", onPress: () => props.setUserFromApp(null) },
        ]);
      }}
      style={{ paddingLeft: 10 }}
    />
  );

  const logout = () => (
    <Ionicons
      name="ios-log-out-outline"
      size={24}
      color="black"
      onPress={() => {
        Alert.alert("ต้องการออกจากระบบหรือไม่", undefined, [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Yes", onPress: () => props.setUserFromApp(null) },
        ]);
      }}
      style={{ marginRight: 10 }}
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
      <RoomNavigator.Navigator
        initialRouteName="CheckRoomPrice"
        screenOptions={{
          headerRight: () => logout2(),
        }}
      >
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
        <RoomNavigator.Screen
          name="Add new type room"
          component={AddRoomType}
          options={({ route }) => {
            return {};
          }}
        />

        <RoomNavigator.Screen
          name="Edit type room"
          component={EditRoomType}
          options={({ route }) => {
            return {};
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
            title: "",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer2(navigation),
            headerRight: () => logout2(),
            headerBackground: () => (
              <View style={{ backgroundColor: "#7dd0f5", height: "100%" }}>
                <Image
                  source={require("../assets/logo.png")}
                  style={styles.logo}
                ></Image>
              </View>
            ),
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
          name="Manage Parcel"
          component={ManageParcel}
          options={({ route }) => ({
            // title: route.params.categoryTitle,
            title: "Manage Parcel",
            headerStyle: { backgroundColor: "transparent" },
            headerTintColor: "white",
            headerShown: true,
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
          name="CheckPayments"
          component={PaymentNavigation}
          options={({ route, navigation }) => ({
            // title: route.params.categoryTitle,
            headerShown: false,
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
        {/* <LessorsNavigator.Screen
          name="AddParcel"
          component={AddParcel}
          options={({ route }) => ({
            // title: route.params.categoryTitle,
            title: "Add Parcel",
            headerStyle: { backgroundColor: "transparent" },
            headerTintColor: "white",
            headerShown: true,
          })}
        /> */}
      </LessorsNavigator.Navigator>
    );
  };

  const MyLessorsFavTabNavigator = () => {
    return (
      <LessorsFavTabNavigator.Navigator
        initialRouteName="Lessors"
        screenOptions={{
          headerShown: false,
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
              return <Entypo name="home" size={24} color={color} />;
            },
            tabBarLabel: () => {
              return <Text style={{ fontSize: "12px" }}>หน้าหลัก</Text>;
            },
          }}
        />
        <LessorsFavTabNavigator.Screen
          name="Favorites"
          component={ParcelNavigation}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Fontisto name="bell-alt" size={24} color={color} />;
            },
            tabBarLabel: () => {
              return <Text style={{ fontSize: "12px" }}>การแจ้งเตือน</Text>;
            },
          }}
        />
      </LessorsFavTabNavigator.Navigator>
    );
  };

  const PaymentNavigation = () => {
    return (
      <PaymentNavigator.Navigator>
        <PaymentNavigator.Screen
          name="CheckPayments"
          component={CheckPayment}
          options={({ route, navigation }) => ({
            // title: route.params.categoryTitle,
            title: "Check Payment",
            headerStyle: { backgroundColor: "transparent" },
            headerTintColor: "white",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer3(navigation),
          })}
        />
        <PaymentNavigator.Screen
          name="PaymentDetail"
          component={PaymentDetail}
          options={({ route, navigation }) => ({
            // title: route.params.categoryTitle,
            title: "Check Payment",
            headerStyle: { backgroundColor: "transparent" },
            headerTintColor: "white",
            headerShown: true,
          })}
        />
        <PaymentNavigator.Screen
          name="BillInvoice"
          component={BillInvoice}
          options={({ route, navigation }) => {
            return {
              title: "ห้อง " ,
              headerTintColor: "#47C5FC",
            };
          }}
        />
         <PaymentNavigator.Screen
          name="Meter"
          component={RecordMeter}
          options={({ route }) => ({
            // title: route.params.categoryTitle,
          })}
        />
      </PaymentNavigator.Navigator>
    );
  };

  const ContractNavigation = () => {
    return (
      <ContractNavigator.Navigator
        screenOptions={{
          headerRight: () => logout2(),
        }}
      >
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
              headerTintColor: "#47C5FC",
            };
          }}
        />
        <ContractNavigator.Screen
          name="DetailReserve"
          component={DetailReserve}
          options={({ route, navigation }) => {
            return {
              title: "ห้อง " + route.params.categoryTitle,
              headerTintColor: "#47C5FC",
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
              headerStyle: { backgroundColor: "transparent" },
              headerTintColor: "white",
            };
          }}
        />
        <ContractNavigator.Screen
          name="Register"
          component={Register}
          options={({ route, navigation }) => {
            return {
              title: "ห้อง " + route.params.categoryTitle,
              // headerShown: true,
              // headerStyle: { backgroundColor: "transparent" },
              // headerTintColor: "white",
            };
          }}
        />
      </ContractNavigator.Navigator>
    );
  };

  const ManageInvoiceNavigation = () => {
    return (
      <BillNavigator.Navigator
        screenOptions={{
          headerRight: () => logout2(),
        }}
      >
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
        <BillNavigator.Screen
          name="BillInvoice"
          component={BillInvoice}
          options={({ route, navigation }) => {
            return {
              title: "ห้อง " + route.params.categoryTitle,
              headerTintColor: "#47C5FC",
            };
          }}
        />
        <BillNavigator.Screen
          name="BillRoomInvoice"
          component={BillRoomInvoice}
          options={({ route, navigation }) => {
            return {
              title: "ห้อง " + route.params.categoryTitle,
              headerTintColor: "#47C5FC",
            };
          }}
        />
        <BillNavigator.Screen
          name="Meter"
          component={RecordMeter}
          options={({ route }) => ({
            // title: route.params.categoryTitle,
          })}
        />
      </BillNavigator.Navigator>
    );
  };

  const ParcelNavigation = ({ route, navigation }) => {
    return (
      <ParcelNavigator.Navigator
        screenOptions={{
          headerRight: () => logout2(),
        }}
      >
        <ParcelNavigator.Screen
          name="ManageParcel"
          component={ManageParcel}
          options={({ route }) => ({
            // title: route.params.categoryTitle,
            title: "Manage Parcel",
            headerStyle: { backgroundColor: "transparent" },
            headerTintColor: "white",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer3(navigation),
          })}
        />
        <ParcelNavigator.Screen
          name="AddParcel"
          component={AddParcel}
          options={({ route }) => ({
            // title: route.params.categoryTitle,
            title: "Add Parcel",
            headerStyle: { backgroundColor: "transparent" },
            headerTintColor: "white",
            headerShown: true,
          })}
        />
      </ParcelNavigator.Navigator>
    );
  };

  const NewsNavigation = () => {
    return (
      <NewsNavigator.Navigator
        initialRouteName="AnnouceNews"
        screenOptions={{
          headerRight: () => logout2(),
        }}
      >
        <NewsNavigator.Screen
          name="AnnouceNews"
          component={AnnouceNews}
          options={({ route, navigation }) => {
            return {
              title: "Annouce News",
              headerLeft: () => listIconToOpenDrawer(navigation),
            };
          }}
        />
        <NewsNavigator.Screen
          name="NewsDetail"
          component={NewsDetail}
          options={({ route }) => ({
            title: route.params.title.toString(),
            headerShown: true,
          })}
        />
      </NewsNavigator.Navigator>
    );
  };

  return (
    <LessorNavigator.Navigator
      initialRouteName="Main"
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
        component={MyLessorsNavigator}
        options={({ route, navigation }) => ({
          drawerLabel: "Main",
          title: "",
          headerShown: false,
        })}
      />
      <LessorNavigator.Screen name="Room" component={RoomNavigation} />
      {/* <LessorNavigator.Screen name="Contract" component={ContractNavigation} /> */}
      <LessorNavigator.Screen
        name="CheckPayment"
        component={PaymentNavigation}
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
      <LessorNavigator.Screen
        name="Room Status"
        component={ContractNavigation}
      />
      <LessorNavigator.Screen
        name="RecordMeter"
        component={RecordMeter}
        options={({ route, navigation }) => {
          return {
            title: "Room Meter",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer2(navigation),
            headerRight: () => logout(),
          };
        }}
      />
      <LessorNavigator.Screen
        name="ManageInvoices"
        component={ManageInvoiceNavigation}
        options={({}) => ({
          headerRight: () => logout2(),
        })}
      />
      <LessorNavigator.Screen
        name="ManageParcels"
        component={ParcelNavigation}
        options={({ route, navigation }) => ({
          // title: route.params.categoryTitle,
          title: "Manage Parcel",
          headerShown: false,
        })}
      />
      <LessorNavigator.Screen
        name="Response"
        component={Response}
        options={({ route, navigation }) => {
          return {
            title: "Response",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer2(navigation),
            headerRight: () => logout(),
          };
        }}
      />
      <LessorNavigator.Screen
        name="News"
        component={NewsNavigation}
        option={({}) => {
          return {
            headerRight: () => logout2(),
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
    alignSelf: "center",
  },
});
export default LessorNavigation;
