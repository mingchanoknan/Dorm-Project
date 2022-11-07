import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import RoomCard from "../../component/card/RoomCard";
import { ROOM } from "../../dummy/ROOM";

const CheckRoomPrice = ({route, navigation}) => {

    const ALL_ROOM = ROOM
    return (
        <ScrollView style={{ flex: 1,backgroundColor:'#FDF8F4' }}>
            <View >
                {ALL_ROOM.map((item, index) => (
                    <View key={index} style={{ width:'100%',alignItems:'center'}} >
                        <RoomCard data={ item } navigation={navigation}/> 
                    </View>
                ))}
            </View>
        </ScrollView>
        
    )
}

export default CheckRoomPrice;