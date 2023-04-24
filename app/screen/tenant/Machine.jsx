import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "@env";
import axios from "axios";
import BoxMachine from "../../component/machine/boxMacine";
import Search from "../../component/machine/searchBar";
import { useFocusEffect } from "@react-navigation/native";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";

const Machine = ({ route, navigation }) => {
  const user = useSelector((state) => state.user)

  const [data, setData] = useState(null);
  const [select, setSelect] = useState("washing");
  const [room_number, setRoom_number] = useState(user.room_number);
  const [url, setUrl] = useState(`${baseUrl}/getParcelNum/${room_number}`);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const build = ["ตึก", "ตึกที่ A", "ตึกที่ B", "ตึกที่ E"];
  const [selectedBuild, setSelectedBuild] = React.useState(new IndexPath(0));
  const displayBuild = build[selectedBuild.row];

  useFocusEffect(
    useCallback(() => {
      if(select == 'washing'){
        setRoom_number(user.room_number)
        setUrl(`${baseUrl}/getMachineByType/${select}`)
        // console.log("p")
      }else{
        setUrl(`${baseUrl}/getMachineByType/${select}`)
        // console.log("Hello")
      }

      const fetchUsers = async () => {
        try {
          const response = await axios.get(url);
          if (response.status === 200) {
            setData(response.data);
           
            return;
          } else {
            throw new Error("Failed to fetch parcel");
          }
        } catch (error) {
          console.log("Data fetching cancelled parcel");
        }
      };
      fetchUsers();
    }, [data])
  );

  const renderGridItem = (itemData) => {
    // console.log(itemData);
    
    return(
   <>
    {(displayBuild === "ตึก" || displayBuild.slice(7, 8) === itemData.item.build) && (
    <BoxMachine item={itemData} user={user.room_number}  width={"90%"} numberOfLines={2} />
    )}
    </>
    )
  };

  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/bg_cancle.png")}
        style={styles.background}
      ></Image>

      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            top: 2,
          }}
        >
        <View style={styles.searchHead}>
          
          <Select
            style={{ width: 98, borderRadius: "50%"}}
            placeholder="รอบบิล"
            value={displayBuild}
            selectedFloor={selectedBuild}
            onSelect={(index) => setSelectedBuild(index)}
          >
            {build.map((title, index) => (
              <SelectItem key={index} title={title} />
            ))}
          </Select>


        <Search
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        </View>
        <View style={styles.segment}>
          <TouchableOpacity style={[styles.btnSelect, { marginRight:5}, select == 'washing' ? { backgroundColor: "#B1E5F3"} : ""]} onPress={() => setSelect('washing')}>
            <Text style={{fontSize: "12px", fontWeight: "bold",}}>เครื่องซักผ้า</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btnSelect, { marginLeft:5}, select == 'dryer' ? { backgroundColor: "#B1E5F3"} : ""]} onPress={() => setSelect('dryer')}>
            <Text style={{fontSize: "12px", fontWeight: "bold"}}>เครื่องอบผ้า</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={{ flex: 3 }}>
         
          <FlatList
            data={data}
            renderItem={renderGridItem}
            numColumns={2}
            keyExtractor={(item) => item._id}
            navigation={navigation}
          />
            
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  text: {
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center",
  },
  background: {
    top: -100,
    width: "100%",
    height: "30%",
    borderRadius: "50%",
    position: "absolute",
  },
  btnAdd: {
    flexDirection: "row",
    backgroundColor: "#FFB085",
    width: "50%",
    padding: 10,
    justifyContent: "center",
    borderRadius: "50%",
    alignItems: "center",
  },
  btnShow: {
    backgroundColor: "white",
    width: "33%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#86becf",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  segment: {
    backgroundColor: 'white', 
    width: '70%',
    top: "8%",
    height: 50, 
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnSelect: {
    width: "45%", 
    color: "white",
    borderRadius: 50, 
    height: "80%", 
    justifyContent: "center", 
    alignItems: "center",
  },
  searchHead: {
    width: "80%",
    flexDirection: 'row',
    alignSelf: "center",
    alignItems: "center"
  }
});

export default Machine;
