import React, { useState, useEffect } from "react";
import { Image, Alert } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { baseUrl } from "@env";
import axios from "axios";

const BoxMachine = ({ item, width, user }) => {
  const [name, setName] = useState(item.item.name);
  const [time, setTime] = useState(item.item.time);
  const [build, setBuild] = useState(item.item.build);
  const [type, setType] = useState(item.item.type);
  const [status, setStatus] = useState(item.item.status);

  const [localTime, setLocalTime] = useState(new Date());
  const [local, setLocal] = useState(
    parseInt(localTime.toLocaleTimeString().slice(0, 2))
  );

  const [waitTime, setWaitTime] = useState(0);

  const [countdownTime, setCountdownTime] = useState(null);
  let diffHours = 0;
  let diffMin = 0;
  useEffect(() => {
    const fetchCountdownTime = async () => {
      const response = await time;
      const hours = response.slice(0, 2);
      const min = response.slice(3, 5);

      const localH = parseInt(localTime.toLocaleTimeString().slice(0, 2));
      const localM = parseInt(localTime.toLocaleTimeString().slice(3, 5));
      console.log("test");
      let check = hours - localH;
      if (hours > localH && localM > min) {
        if (check <= 1) {
          diffHours = hours - localH;
          diffMin = localM - min;
        }else {
          diffHours = 0;
          diffMin = 0;
        }
        
      } else if (hours == localH && localM >= min) {
        diffHours = 0;
        diffMin = 0;
      }else if (hours == localH && localM < min) {
        diffHours = 0;
        diffMin = min - localM;
      }
       else if (hours > localH && localM < min) {
        if (check <= 1) {
          diffHours = hours - localH;
          diffMin = min - localM;
        }else {
          diffHours = 0;
          diffMin = 0;
        }
      }else if (hours > localH && localM == min) {
        if (check <= 1) {
          diffHours = hours - localH;
          diffMin = 0;
        }else {
          diffHours = 0;
          diffMin = 0;
        }
      }
       else if (hours < localH) {
        diffHours = 0;
        diffMin = 0;
      }
      else {
        diffHours = 0;
        diffMin = 0;
      }

      setCountdownTime((diffHours * 60 * 60) + (diffMin * 60));
      console.log("time " + (diffHours) + " " + (diffMin));
      console.log("end---------");
    };

    if (status == "กำลังใช้งาน") {
      fetchCountdownTime();
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    let interval;
    if (status == "กำลังใช้งาน") {
      if (countdownTime !== null && countdownTime > 0) {
        // console.log(countdownTime)
        interval = setInterval(() => {
          setCountdownTime((prevCountdownTime) => prevCountdownTime - 1);
        }, 1000);
      }else if (countdownTime == 0) {
        setCountdownTime(0);
        console.log("end wait");
        setStatus("ว่าง");
        axios
          .post(`${baseUrl}/updateMachine`, {
            _id: item.item._id,
            name: name,
            status: "รอนำผ้าออก",
            time: "00:00",
            build: build,
            type: type,
          })
          .then((response) => {
            setTime("00:00");
            setWaitTime(1* 60);
            setStatus("รอนำผ้าออก");
            console.log("update status success");
          })
          .catch((error) => console.log("error updateStatus"));
      }
      
    }

    return () => {
      clearInterval(interval);
     
    };
  }, [countdownTime]);

  useEffect(() => {
    let  intervalId2;
      if (status == "รอนำผ้าออก") {
        if (waitTime !== null && waitTime > 0) {
      intervalId2 = setInterval(() => {
          setWaitTime((prevTime) => prevTime - 1);
        }, 1000);
      }else if (waitTime == 0 && countdownTime == 0) {
        setWaitTime(0);
        console.log("end ready");
        setStatus("ว่าง");
        axios
          .post(`${baseUrl}/updateMachine`, {
            _id: item.item._id,
            name: name,
            status: "ว่าง",
            time: "00:00",
            build: build,
            type: type,
          })
          .then((response) => {
            setTime("00:00");
            setStatus("ว่าง");
            console.log("update status success");
          })
          .catch((error) => console.log("error updateStatus"));
      }
    }
    return () =>  clearInterval(intervalId2);
  }, [waitTime, countdownTime, status]);

  useEffect(() => {
    // Update the local time every second
    const interval = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(countdownTime / 60);
  const seconds = countdownTime % 60;
  const minutes2 = Math.floor(waitTime / 60);
  const seconds2 = waitTime % 60;


  return (
    <View style={[styles.shadow]}>
      <Card
        disabled={true}
        style={[
          styles.card,
          { width },
          item.item.status == "รอนำผ้าออก"
            ? { backgroundColor: "#FFE790" }
            : item.item.status == "กำลังใช้งาน"
            ? { backgroundColor: "#f25a79" }
            : item.item.status == "เครื่องชำรุด"
            ? { backgroundColor: "#EDE5E6" }
            : { backgroundColor: "#7dd4ad" },
        ]}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
            <Text
              style={[
                styles.txt,
                { color: "black", fontSize: 15, marginRight: "40%" },
              ]}
            >
              {" "}
              {name}
            </Text>
            <Text style={[styles.txt, { color: "black", fontSize: 15 }]}>
              {" "}
              ตึก {build}{" "}
            </Text>
          </View>
          <Text>
            {/* Local time: {parseInt(localTime.toLocaleTimeString().slice(3, 5)) - parseInt(time.slice(3, 5))} */}
          </Text>
          {status == "กำลังใช้งาน" && type == "washing" && (
            <Image
              source={require("../../assets/washing.png")}
              style={{ width: "60%", height: "50%" }}
            ></Image>
          )}
          {status == "รอนำผ้าออก" && type == "washing" && (
            <Image
              source={require("../../assets/wait.png")}
              style={{ width: "60%", height: "50%" }}
            ></Image>
          )}
          {status == "เครื่องชำรุด" &&
            (type == "washing" || type == "dryer") && (
              <Image
                source={require("../../assets/broken.png")}
                style={{ width: "60%", height: "50%" }}
              ></Image>
            )}
          {status == "ว่าง" && type == "washing" && (
            <Image
              source={require("../../assets/ready.png")}
              style={{ width: "60%", height: "50%" }}
            ></Image>
          )}

          {type == "dryer" && status != "เครื่องชำรุด" && (
            <Image
              source={require("../../assets/dryer.png")}
              style={{ width: "60%", height: "50%" }}
            ></Image>
          )}

          <Text style={[styles.txt, { color: "black" }]}> {status} </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {status == "ว่าง" && (
              <Text style={[styles.txt, { color: "black", fontSize: 24 }]}>
                00:00
              </Text>
            )}
            {status == "เครื่องชำรุด" && (
              <Text style={[styles.txt, { color: "black", fontSize: 24 }]}>
                --:--
              </Text>
            )}
            {status == "กำลังใช้งาน" && (
              <Text style={[styles.txt, { color: "black", fontSize: 24 }]}>
                {countdownTime !== null && countdownTime >= 0
                  ? `${minutes.toString().padStart(2, "0")}:${seconds
                      .toString()
                      .padStart(2, "0")}`
                  : "Loading..."}
              </Text>
            )}
            {/* {(status == "กำลังใช้งาน" && remainingTime <= 0) && (
              <Text style={[styles.txt, { color: "black", fontSize: 24 }]}>
                00:00
              </Text>
            )} */}
            {status == "รอนำผ้าออก" && (
              <Text style={[styles.txt, { color: "black", fontSize: 24 }]}>
                {`${minutes2.toString().padStart(2, "0")}:${seconds2
                  .toString()
                  .padStart(2, "0")}`}
              </Text>
            )}
            <Text style={[styles.txt, { color: "black" }]}> minutes </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 5,
    marginTop: 10,
    alignSelf: "center",
    height: 200,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  shadow: {
    flex: 1,
  },
  txt: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#777777",
    marginBottom: 5,
  },
  textLabel: {
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default BoxMachine;
