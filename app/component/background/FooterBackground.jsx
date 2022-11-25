import { Image, StyleSheet, View } from "react-native";

const FooterBackground = () => {
  return (
    <View style={styles.background}>
          <Image source={require("../../assets/bg_payment.png")}style={{ width: "100%", resizeMode: "stretch"}} />
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    width: "100%",
    zIndex: -101,
    position: "absolute",
        bottom: 0,
  },
});
export default FooterBackground;
