import { Divider, IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import ReportCard from "../../component/card/ReportCard";
import { REPORT } from "../../dummy/REPORT";
import {baseUrl} from "@env"
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from "react-redux";
// let username ="Admin"
const Response = () => {
  const user = useSelector((state) => state.user)
  const [selectItem, setSelectItem] = useState(new IndexPath(0));
  const [loading, setLoading] = useState(false);
  const [allReport, setAllReport] = useState([]);
  const [listBySelect, setListBySelect] = useState([]);
  const [selectStatus, setSelectStatus] = useState("all");
  const [commentInput, setCommentInput] = useState("");
  const [selectPost, setSelectPost] = useState(0);
  
  useEffect(() => {
    console.log(user)
    setLoading(true);
    const getReport = async() => {
      const reports = await axios.get(`${baseUrl}/report/getall/`)
      let sortDate = reports.data
      console.log(sortDate)
      sortDate.sort((a, b) => {
        function convertDate(text) {
          const date = text.replace(",", "")
          const arr = date.split(" ")
          const arrDate = arr[0].split("/")
          const arrTime = arr[1].split(":")
          return new Date(arrDate[2], arrDate[1], arrDate[0], arrTime[0], arrTime[1], arrTime[2])
        }

        return convertDate(b.date) - convertDate(a.date)
      }
      );
      console.log(reports.data)
      setLoading(false);
      setAllReport(sortDate)
      setListBySelect(sortDate)
    }
   getReport()
  }, [])
 
  useEffect(() => {
    const queryByStatus = async () => {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/report/status/`, { params: { status: selectStatus } })
      
      let sortDate = response.data
      console.log(sortDate)
      sortDate.sort((a, b) => {
        function convertDate(text) {
          const date = text.replace(",", "")
          const arr = date.split(" ")
          const arrDate = arr[0].split("/")
          const arrTime = arr[1].split(":")
          return new Date(arrDate[2], arrDate[1], arrDate[0], arrTime[0], arrTime[1], arrTime[2])
        }

        return convertDate(b.date) - convertDate(a.date)
      }
      );
      setLoading(false);
      setListBySelect(sortDate)
    }
    if (selectStatus == "all") {
      setListBySelect(allReport)
    }
    else {
      queryByStatus();
    }
  }, [selectStatus])
  const getallReport = async() => {
    const reports = await axios.get(`${baseUrl}/report/getall/`)
    let sortDate = reports.data
    sortDate.sort((a, b) => {
      function convertDate(text) {
        const date = text.replace(",", "")
        const arr = date.split(" ")
        const arrDate = arr[0].split("/")
        const arrTime = arr[1].split(":")
        return new Date(arrDate[2], arrDate[1], arrDate[0], arrTime[0], arrTime[1], arrTime[2])
      }

      return convertDate(b.date) - convertDate(a.date)
    }
      );
    setAllReport(sortDate)
    setListBySelect(sortDate)
  }
  const changeStatus = async (rep) => {
    setLoading(true);
    
  rep.status =true
    const res = await axios.put(`${baseUrl}/report/update/`,rep);
    setLoading(false);
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../../assets/bg-respone.png')} resizeMode="cover" style={styles.image}>
      <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
      <View
        style={{
          flex: 1,
          marginTop: "15%",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          paddingTop: "5%",
          borderTopLeftRadius: '60%',
          borderTopRightRadius: '60%',
        }}
      >
        <View style={styles.filter}>
          <Text category="h6">รายการแจ้งทั้งหมด</Text>

          <Select
            value={
              selectItem.row === 0
                ? "ทั้งหมด"
                : selectItem.row === 1
                ? "ยังไม่ซ่อม"
                : "ซ่อมแล้ว"
            }
            style={{ width: 150 }}
            selectedIndex={selectItem}
              onSelect={(index) => {
                console.log(index)
              setSelectItem(index);
              if (index.row == 0) {
                setSelectStatus("all")
              } else if (index.row == 1) {
                setSelectStatus(false)
              } else {
                setSelectStatus(true)
              }
            }}
            placeholder={"ทั้งหมด"}
          >
            <SelectItem title="ทั้งหมด" />

            <SelectItem title="ยังไม่ซ่อม" />
            <SelectItem title="ซ่อมแล้ว" />
          </Select>
        </View>
        <Divider
          style={{
            marginTop: 20,
            marginHorizontal: "5%",
            marginBottom: 2,
            backgroundColor: "#777777",
            height: 2,
          }}
        ></Divider>
          <ReportCard data={listBySelect} page={"response"} updateStatus={changeStatus} name={user.username}/>
        </View>
        </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  formControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  roomName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    // marginTop: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
  },

  filter: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: "8%",
    alignItems: "flex-end",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});
export default Response;
