import { Dimensions, Image, StyleSheet, View } from "react-native";
const height = Dimensions.get("window").height;
const HeaderBackground = () => {
  return (
    <View style={styles.background}>
      <Image
        source={require("../../assets/bg_invoice.png")}
        style={{ width: "100%", resizeMode: "stretch", maxHeight:height/3.5, }}
      ></Image>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    width: "100%",

    zIndex: -100,
    position: "absolute"
  },
});
export default HeaderBackground;
