import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

type Props = {
  state: any;
  descriptors: any;
  navigation: any;
};

export default function AnimatedTabBar({ state, descriptors, navigation }: Props) {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;
        const iconName = options.tabBarIconName || "home";

        const isFocused = state.index === index;

        const animatedIconStyle = useAnimatedStyle(() => ({
          transform: [
            { scale: withSpring(isFocused ? 1.3 : 1) },
            { translateY: withTiming(isFocused ? -10 : 0) },
          ],
        }));

        const animatedDotStyle = useAnimatedStyle(() => ({
          opacity: withTiming(isFocused ? 1 : 0),
          transform: [{ scale: withTiming(isFocused ? 1 : 0.5) }],
        }));

        const onPress = () => navigation.navigate(route.name);

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={1}
          >
            <Animated.View style={animatedIconStyle}>
              <Icon
                name={iconName}
                size={28}
                color={isFocused ? "#4A90E2" : "#999"}
              />
            </Animated.View>

            <Text style={[styles.label, isFocused && { color: "#4A90E2" }]}>
              {label}
            </Text>

            {/* Active dot indicator */}
            <Animated.View style={[styles.dot, animatedDotStyle]} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: "#999",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4A90E2",
    marginTop: 3,
  },
});
