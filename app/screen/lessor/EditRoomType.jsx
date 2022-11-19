import { useEffect, useState } from "react"
import RoomFormEdit from "../../component/form/RoomFormEdit"
import {baseUrl} from "@env"
import axios from "axios"
const EditRoomType = ({ route, navigation }) => {
    const [data, setData] = useState("")
    const { id } = route.params;
    useEffect(() => {
        axios
        .get(`${baseUrl}/room/getbyid`, {
          params: {
            id : id
        } })
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },[])
    return (
        <RoomFormEdit navigation={navigation} route={route} data={data} />
    )
}
export default EditRoomType