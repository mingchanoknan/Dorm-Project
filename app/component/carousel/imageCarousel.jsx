import * as React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const RoomImageCarousel = (props) => {
  const progressValue = useSharedValue(0);
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop={false}
        width={props.width}
        height={props.height}
        // autoPlay={true}
        data={[...props.image]}
        scrollAnimationDuration={1000}
        pagingEnabled={true}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: props.width / 7,
        }}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={({ index }) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Image
                source={{uri:props.image[index]}}
                resizeMode="cover"
                style={{ width: null, height: null, flex: 1, borderRadius: 20 }}
              />
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: 100,
          alignSelf: "center",
        }}
      >
        {props.image.map((backgroundColor, index) => {
          return (
            <PaginationItem
              backgroundColor={props.paginationColor}
              animValue={progressValue}
              index={index}
              key={index}
              isRotate={false}
              length={props.image.length}
            />
          );
        })}
      </View>
    </View>
  );
};

const PaginationItem = (props) => {
  const { animValue, index, length, backgroundColor, isRotate } = props;
  const width = 8;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  const hexToRgb = () => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      backgroundColor
    );
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const stringRgb = () => {
    return "rgba(" + hexToRgb().r + "," + hexToRgb().g +"," +hexToRgb().b +",0.2)"
    ;
  };
  return (
    <View
      style={{
        backgroundColor: stringRgb(),
        width,
        height: width,
        borderRadius: 50,
        overflow: "hidden",
        transform: [
          {
            rotateZ: isRotate ? "90deg" : "0deg",
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor: backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default RoomImageCarousel;
