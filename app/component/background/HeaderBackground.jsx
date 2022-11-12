import { Dimensions, Image, StyleSheet, View } from "react-native";
const height = Dimensions.get("window").height;
const HeaderBackground = (props) => {
  return (
    <View style={styles.background}>
      <Image
        source={props.image}
        style={{ width: "100%", resizeMode: "cover", height:height/4,borderBottomLeftRadius:'50%',borderBottomRightRadius:'50%' }}
      ></Image>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    width: "100%",
    // paddingHorizontal:'5%',
    zIndex: -100,
    position: "absolute",
    
  },
});
export default HeaderBackground;
