import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
              headerTintColor: '#47C5FC',
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
    <LessorNavigator.Navigator initialRouteName="Contract"
      screenOptions={({ route, navigation }) => {
        return {
          headerShown: false,
        };
      }}
      initialRouteName="Response"
    >
      <LessorNavigator.Screen name="Room" component={RoomNavigation} />
      {/* <LessorNavigator.Screen name="Contract" component={ContractNavigation} /> */}
      <LessorNavigator.Screen
        name="CancelContract"
        component={CancelContract}
        options={({ route, navigation }) => {
          return {
            title: "Contract",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer2(navigation),
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
      <LessorNavigator.Screen name="Manage Invoice" component={ManageInvoiceNavigation} 
       
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

export default LessorNavigation;
