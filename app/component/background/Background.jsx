import { useWindowDimensions, View } from "react-native"

const Background = () => {
    const size = useWindowDimensions()
    const height = size.height
    return (
        <View style={{position: "relative"}}>
            <View style={{height: height / 4, width: "100%", backgroundColor: "#8BFDCF", position: "absolute", zIndex: -100, borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>
            <View style={{height: height / 4 + 100, width: height / 4 + 100, borderRadius: 150, backgroundColor: "#4291FF", zIndex: -100, position: "absolute", top: -150, left: -50}}></View>
            </View>
        </View>
    )
}

export default Background;