import * as React from "react";
import { Dimensions, Image, ImageBackground, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const RoomImageCarousel = () => {
  const image = [
    {
      src: require("../../assets/1.jpg"),
    },
    {
      src: require("../../assets/2.jpg"),
    },
    {
      src: require("../../assets/3.jpg"),
    },
  ];
  const width = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width - 50}
        height={width / 2}
        // autoPlay={true}
        data={[...image]}
        scrollAnimationDuration={1000}
        renderItem={({ index }) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                borderRadius: 20
              }}
              >
                  <Image source={image[index].src} resizeMode="cover" style={{width: null, height: null, flex: 1, borderRadius: 20}} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default RoomImageCarousel;
