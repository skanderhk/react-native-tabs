import React, { useState } from "react";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const Tab = ({ children, visible }) => {
  return <View display={!visible ? "none" : undefined}>{children}</View>;
};

const TabButton = ({ title, active }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: active ? "white" : undefined,
        paddingHorizontal: 1,
        margin: 1,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
    >
      <Text>{title}</Text>
    </View>
  );
};

function Tabs({ initialIndex, children, items }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex || 0);
  const translationX = useSharedValue(0);

  const styles = useAnimatedStyle(() => ({
    height,
    width: items.length * width,
    display: "flex",
    flexDirection: "row",
    flex: 1,
    transform: [{ translateX: withTiming(translationX.value) }],
  }));

  const handleTabClick = (index) => {
    setActiveIndex(index);
    translationX.value = -index * width;
  };

  return (
    <View style={{ height: "100% " }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 5,
        }}
      >
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{ flex: 1 }}
            onPress={() => handleTabClick(index)}
          >
            <TabButton title={item.title} active={activeIndex == index} />
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View style={styles}>
        {children.map((child, indx) => (
          <View style={{ width: width }} key={indx}>
            {child}
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

export default Tabs;
