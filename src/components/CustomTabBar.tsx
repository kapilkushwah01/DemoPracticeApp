import { Key } from 'react';
import { View, TouchableOpacity, StyleSheet,Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabBar}>
        {state.routes.map(
          (
            route: { key: string | number; name: any },
            index: Key | null | undefined,
          ) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              navigation.navigate(route.name);
            };

            const icon = options.tabBarIcon
              ? options.tabBarIcon({
                  color: isFocused ? '#4D60F5' : '#777',
                  size: 28,
                  focused: isFocused,
                })
              : null;

            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={styles.tabButton}
              >
                {icon}
                <Text
                  style={[styles.tabLabel, isFocused && styles.tabLabelActive]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          },
        )}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-between',

    // shadow for floating effect
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabLabel: {
  fontSize: 12,
  color: '#777',
  marginTop: 4,
  textAlign: 'center',
},
tabLabelActive: {
  color: '#4D60F5',
  fontWeight: '600',
},

});
