import { Input, Text } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"

const MeterForm = (props) => {
    return (
        <View>
            {props.type === "water" &&
                <View>
                    <View style={styles.inputContainer}>
                        <Text>รหัสห้อง</Text>
                        <Input value={props.room} onChangeText={text => props.onChangeRoom(text)}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>เลขมิเตอร์น้ำ</Text>
                        <Input value={props.meter} onChangeText={text => props.onChangeMeter(text)}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>รอบของเดือน</Text>
                        <Input value={props.monthly} onChangeText={text => props.onChangeMonthly(text)}/>
                    </View>
                </View>
            }
            {props.type === "elec" &&
                <View>
                    <View style={styles.inputContainer}>
                        <Text>รหัสห้อง</Text>
                        <Input value={props.room} onChangeText={text => props.onChangeRoom(text)}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>เลขมิเตอร์ไฟฟ้า</Text>
                        <Input value={props.meter} onChangeText={text => props.onChangeMeter(text)}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>รอบของเดือน</Text>
                        <Input value={props.monthly} onChangeText={text => props.onChangeMonthly(text)}/>
                    </View>
                </View>
            }
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingVertical: 10
    }
})
export default MeterForm