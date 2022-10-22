import { createDrawerNavigator } from "@react-navigation/drawer"
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

const LessorNavigation = () => {
    const LessorNavigator = createDrawerNavigator();

    const RoomNavigator = createNativeStackNavigator();
    const ContractNavigator = createNativeStackNavigator();
    const ParcelNavigator = createNativeStackNavigator();

    const RoomNavigation = () => {
        return (
            <RoomNavigator.Navigator>
                <RoomNavigator.Screen name="CheckRoomPrice" component={CheckRoomPrice} />
                <RoomNavigator.Screen name="CheckRoomDetail" component={CheckRoomDetail} />
            </RoomNavigator.Navigator>
        )
    }

    const ContractNavigation = () => {
        return (
            <ContractNavigator.Navigator>
                <ContractNavigator.Screen name="LeaseContract" component={LeaseContract} />
                <ContractNavigator.Screen name="CancelContract" component={CancelContract} />
            </ContractNavigator.Navigator>
        )
    }
    
    const ParcelNavigation = () => {
        return (
            <ParcelNavigator.Navigator>
                <ParcelNavigator.Screen name="ManageParcel" component={ManageParcel} />
                <ParcelNavigator.Screen name="AddParcel" component={AddParcel} />
            </ParcelNavigator.Navigator>
        )
    }

    return (
        <LessorNavigator.Navigator>
            <LessorNavigator.Screen name="Room" component={RoomNavigation} />
            <LessorNavigator.Screen name="Contract" component={ContractNavigation} />
            <LessorNavigator.Screen name="CancelContract" component={CancelContract} />
            <LessorNavigator.Screen name="CheckRoomsStatus" component={CheckRoomsStatus} />
            <LessorNavigator.Screen name="RecordMeter" component={RecordMeter} />
            <LessorNavigator.Screen name="Parcel" component={ParcelNavigation} />
            <LessorNavigator.Screen name="Response" component={Response} />
        </LessorNavigator.Navigator>
    )

}

export default LessorNavigation