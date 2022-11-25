import DatePicker from "react-native-modern-datepicker";
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  View,
  ScrollView,
} from "react-native";
import SearchBar from "../../component/search/SearchBar";
import {
  Button,
  Divider,
  Layout,
  Modal,
  Popover,
  Text,
  Icon,
  Drawer,
  DrawerGroup,
  DrawerItem,
  Tooltip,
} from "@ui-kitten/components";
import axios from "axios";
import { baseUrl } from "@env";
import Spinner from 'react-native-loading-spinner-overlay';
const MeterDisplay = (props) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  const [date, setDate] = useState("2022");
  const [visible, setVisible] = React.useState(false);
  const [allInfo, setAllInfo] = useState([]);
  const [lastest, setLastest] = useState(false);
  const [listBy, setListBy] = useState("All Meter Data");
  const [infoBySelect, setInfoBySelect] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getInfoMeter = async () => {
      let info = await axios.get(`${baseUrl}/meter/getbytype/${props.type}`);
      // console.log(info.data)
      setInfoBySelect(info.data)
      setLists(info.data)
      setLoading(false)
    };
    getInfoMeter();
  }, []);

  useEffect(() => {
    setLoading(true)
    const changeList = async() => {
      if (listBy == "All Meter Data") {
        const res = await axios.get(`${baseUrl}/meter/getbytype/${props.type}`);
        setLists(res.data)
        setInfoBySelect(res.data)
      }
      else {
        const res = await axios.get(`${baseUrl}/meter/getbymonthandyear/${listBy}/${props.type}`)
        setInfoBySelect(res.data)
        setLists(res.data)
      }
      setLoading(false)
    }
    changeList()
    setSearchPhrase("")
  }, [listBy])

  useEffect(() => {
    

    const checkSearh = (item) => {
      if (searchPhrase.toUpperCase().trim().replace(/\s/g, "") == "") {
        return lists;
      }
      else {
        return item.room_number.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
      }
    }
    let t = lists.filter((item) => {
      return checkSearh(item)
    })
setInfoBySelect(t)
    
  },[searchPhrase])

  const formatedDate = (yearAndMonth) => {
    let array = yearAndMonth.split(" ");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setDate(array[0] + "/" + array[1] + "/01");
    setListBy(months[parseInt(array[1]) - 1] + " " + array[0]);
  };

  const Home = (props) => <Icon {...props} name="home-outline" />;

  const [selectedIndex, setSelectedIndex] = React.useState(null);
  return (
    <View style={{ flex: 1 }}>
      <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <View style={{ flex: 1, width: 350, height: 350 }}>
          <DatePicker
            style={{ borderRadius: "30%" }}
            mode="monthYear"
            selectorStartingYear={2000}
            current={date}
            onMonthYearChange={(selectedDate) => {
              formatedDate(selectedDate);
              setVisible(false);
            }}
          />
        </View>
      </Modal>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "2%",
        }}
      >
        <View style={{ marginHorizontal: "3%" }}>
          <Button
            style={styles.btn}
            onPress={() => setVisible(true)}
            size="small"
          >
            Select Month
          </Button>
        </View>
        <View style={{ marginHorizontal: "3%" }}>
          <Button
            appearance="outline"
            style={styles.btn}
            size="small"
            onPress={() => {
              setDate("2022");
              setListBy("All Meter Data");
            }}
          >
            All Meter Data
          </Button>
        </View>
      </View>
      <Divider
        style={{ backgroundColor: "#777777", marginVertical: 15, height: 1.5 }}
      />
      <View style={{ display: "flex" }}>
        <Text style={{ textAlign: "right", marginRight: "5%" }} category="h6">
          {listBy}
        </Text>
      </View>
      <Drawer
        style={{
          borderColor: "#C3DCE3",
          borderRadius: "30%",
          padding: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,

          elevation: 8,
          marginBottom: "4%",
        }}
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          let temp = { ...index };
          if (temp.section != undefined) {
            temp.row = temp.section;
          }
          temp.section = undefined;
          setSelectedIndex(temp);
        }}
      >
        {infoBySelect.map((info,index) => (
          <DrawerGroup key={index}
          title={(evaProps) => (
            <View {...evaProps}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ display: "flex" }}>
                  <Text category="label">{info.room_number}</Text>
                </View>
                <View style={{ display: "flex" }}>
                  <Text category="label">TOTAL {info.sum} THB</Text>
                </View>
              </View>
            </View>
          )}
          accessoryLeft={Home}
        >
          <DrawerItem title={`จำนวนหน่อยที่ใช้ ${info.used_unit} unit`} />
          <DrawerItem title={`ราคาต่อหน่วย ${info.consumption} THB`} />
        </DrawerGroup>
        ))}
        
      </Drawer>
    </View>
  );
};

export default MeterDisplay;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
  picker: {
    flex: 1,
    margin: 2,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0,0.8)",
  },
  btn: {
    marginHorizontal: "7%",
  },
});
