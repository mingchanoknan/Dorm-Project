import { Image, StyleSheet, Text, View } from "react-native";

const ConfirmRoom = (props) => {
  return (
    <View style={{ flex: 1, padding: 30 }}>
      <View style={styles.formControl}>
        <Text style={styles.text}>{"ชื่อประเภท : "}</Text>
        <Text style={styles.result}>{props.allData.typeName}</Text>
      </View>
      <View style={styles.formControl}>
        <Text style={styles.text}>{"ราคาเริ่มต้นต่อเดือน : "}</Text>
        <Text style={styles.result}>{props.allData.price}</Text>
      </View>
      <View style={styles.formControl}>
        <Text style={styles.text}>{"สีพื้นหลัง : "}</Text>
        <View
          style={{
            padding: 2,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor: props.allData.bgColor,
          }}
        >
          <Text style={styles.result}>{props.allData.bgColor}</Text>
        </View>
      </View>
      <View style={styles.formControl}>
        <Text style={styles.text}>{"สีไอคอน : "}</Text>
        <View
          style={{
            padding: 2,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor: props.allData.iconColor,
          }}
        >
          <Text style={styles.result}>{props.allData.iconColor}</Text>
        </View>
      </View>
          <View style={{ marginVertical: 10 }}>
        <Text style={styles.text}>{"คำแนะนำ : "}</Text>
        <View style={{paddingVertical: 10}}>
                  <Text>{ props.allData.suggestion}</Text>
        </View>
        
          </View>
          <View style={{ marginVertical: 10 }}>
        <Text style={styles.text}>{"Information : "}</Text>
        <View style={{paddingVertical: 10}}>
                  <Text>{ props.allData.information}</Text>
        </View>
        
          </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.text}>{"Convenience : "}</Text>
        <View style={{paddingVertical: 10}}>
          {props.allData.convenience.map((item, index) => {
            return <Text style={[styles.result, {paddingHorizontal: 20}]} key={index}>{item}</Text>;
          })}
        </View>
      </View>
      {props.screen == "add" && (
        <View style={{ marginVertical: 10,display:'flex',flexDirection:'row',alignItems:'center'}}>
        <Text style={styles.text}>{"ตึก : "}</Text>
        <Text style={[styles.text,{marginRight:10}]}>{ props.rent.build}</Text>
        <Text style={styles.text}>{"ชั้น : "}</Text>
        <Text style={[styles.text,{marginRight:10}]}>{props.rent.floor}</Text>
        <Text style={styles.text}>{"เลขห้อง : "}</Text>
        <Text style={[styles.text,{marginRight:10}]}>{props.rent.room_number}</Text>
      </View>
      )}
      
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.text}>{"Image : "}</Text>
        <View
          style={{ flex: 1 }}
        >
          {props.allData.image.length > 0 &&
            props.allData.image.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    position: "relative",
                    flexDirection: "row",
                    justifyContent: "center",
                    margin: 20,
                    padding: 5,
                    width: "80%",
                  }}
                >
                  {item.uri == undefined && (
                  <Image
                    source={{ width: "100%", height: 300, uri: item }}
                    resizeMode="cover"
                  />
                )}
                {item.uri != undefined && (
                  <Image
                    source={{ width: "100%", height: 300, uri: item.uri }}
                    resizeMode="cover"
                  />
                )}
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
    alignItems: "center",
  },
  formControl2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  text: {
      fontSize: 15,
      fontWeight: "600"
  },
  result: {
    fontSize: 15,
  },
});
export default ConfirmRoom;
