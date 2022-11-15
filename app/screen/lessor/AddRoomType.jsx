import RoomForm from "../../component/form/RoomForm";

const AddRoomType = ({ route, navigation }) => {
    return (
        <RoomForm navigation={navigation} screen={"add"} route={route} />
    )
}
export default AddRoomType;