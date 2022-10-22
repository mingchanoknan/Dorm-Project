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
import { FontAwesome } from "@expo/vector-icons";
const LessorNavigation = () => {
  const LessorNavigator = createDrawerNavigator();

  const RoomNavigator = createNativeStackNavigator();
  const ContractNavigator = createNativeStackNavigator();
  const ParcelNavigator = createNativeStackNavigator();

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

  const ContractNavigation = () => {
    return (
      <ContractNavigator.Navigator>
        <ContractNavigator.Screen
          name="LeaseContract"
          component={LeaseContract}
          options={({ route, navigation }) => {
            return {
              title: "Lease Contract",
              headerLeft: () => listIconToOpenDrawer(navigation),
            };
          }}
        />
        <ContractNavigator.Screen
          name="CancelContract"
          component={CancelContract}
          options={({ route, navigation }) => {
            return {
              title: "Cancel Contract",
              headerLeft: () => listIconToOpenDrawer(navigation),
            };
          }}
        />
      </ContractNavigator.Navigator>
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
    <LessorNavigator.Navigator
      screenOptions={({ route, navigation }) => {
        return {
          headerShown: false,
        };
      }}
    >
      <LessorNavigator.Screen name="Room" component={RoomNavigation} />
      <LessorNavigator.Screen name="Contract" component={ContractNavigation} />
      <LessorNavigator.Screen
        name="CancelContract"
        component={CancelContract}
        options={({ route, navigation }) => {
          return {
            title: "Cancel Contract",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer2(navigation),
          };
        }}
      />
      <LessorNavigator.Screen
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
      <LessorNavigator.Screen name="Parcel" component={ParcelNavigation} />
      <LessorNavigator.Screen
        name="Response"
        component={Response}
        options={({ route, navigation }) => {
          return {
            title: "Room Status",
            headerShown: true,
            headerLeft: () => listIconToOpenDrawer2(navigation),
          };
        }}
      />
    </LessorNavigator.Navigator>
  );
};

export default LessorNavigation;
