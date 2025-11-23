import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { TabParamList } from '../navigation/TabNavigator';
export default function HomeScreen() {
  const [selected, setSelected] = useState('All');
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Row */}
        <View style={styles.topRow}>
          <View style={styles.locationRow}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
              style={styles.profileImg}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.locationText}>Location</Text>
              <Text style={styles.mainLocation}>New York, USA</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.notificationBtn}>
            <Icon name="notifications-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Box */}
        <View style={styles.searchBox}>
          <Icon name="search" size={20} color="#999" />
          <TextInput placeholder="Search..." style={styles.searchInput} />
          <TouchableOpacity>
            <Icon name="options-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Filter Row */}
        {/* Category Tabs */}
        <View style={styles.tabsRow}>
          {['All', 'Apartment', 'House'].map((item, index) => {
            const isActive = selected === item;

            const scaleAnim = new Animated.Value(isActive ? 1 : 0.9);
            const bgAnim = new Animated.Value(isActive ? 1 : 0);
            const textAnim = new Animated.Value(isActive ? 1 : 0);

            const onPress = () => {
              setSelected(item);

              // Animate active tab
              Animated.parallel([
                Animated.spring(scaleAnim, {
                  toValue: 1,
                  useNativeDriver: true,
                }),
                Animated.timing(bgAnim, {
                  toValue: 1,
                  duration: 200,
                  useNativeDriver: true,
                }),
                Animated.timing(textAnim, {
                  toValue: 1,
                  duration: 150,
                  useNativeDriver: true,
                }),
              ]).start();
            };

            const backgroundColor = bgAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['#eee', '#FFD700'], // inactive → active
            });

            const textColor = textAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['#444', '#000'],
            });

            return (
              <AnimatedTouchable
                key={index}
                onPress={onPress}
                style={[
                  styles.tabBtn,
                  {
                    transform: [{ scale: scaleAnim }],
                    backgroundColor,
                  },
                ]}
              >
                <Animated.Text style={[styles.tabText, { color: textColor }]}>
                  {item}
                </Animated.Text>
              </AnimatedTouchable>
            );
          })}
        </View>

        {/* Property Card */}
        <View style={styles.card}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1501183638710-841dd1904471',
            }}
            style={styles.cardImg}
          />

          <TouchableOpacity style={styles.heartBtn}>
            <Icon name="heart-outline" size={20} color="#000" />
          </TouchableOpacity>

          <View style={styles.cardContent}>
            <Text style={styles.badge}>Apartment</Text>

            <View style={styles.rowBetween}>
              <Text style={styles.title}>Lakeshore Blvd West</Text>
              <Text style={styles.price}>$797,500</Text>
            </View>

            <Text style={styles.address}>
              70 Washington Square South, New York, NY
            </Text>

            {/* Features Row */}
            <View style={styles.features}>
              <View style={styles.featureItem}>
                <Icon name="bed-outline" size={16} />
                <Text style={styles.featureText}>2 Beds</Text>
              </View>

              <View style={styles.featureItem}>
                <Icon name="water-outline" size={16} />
                <Text style={styles.featureText}>2 Baths</Text>
              </View>

              <View style={styles.featureItem}>
                <Icon name="resize-outline" size={16} />
                <Text style={styles.featureText}>2000 sqft</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
  },

  /* Top Row */
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  locationText: {
    fontSize: 12,
    color: '#777',
  },
  mainLocation: {
    fontSize: 16,
    fontWeight: '600',
  },
  notificationBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    elevation: 3,
  },

  /* Search */
  searchBox: {
    marginTop: 22,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },

  /* Filters */
  filterRow: {
    flexDirection: 'row',
    marginTop: 25,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#EDEDED',
  },
  filterText: {
    fontSize: 14,
    color: '#555',
  },
  activeFilter: {
    backgroundColor: '#FFD54F',
  },
  activeFilterText: {
    color: '#000',
    fontWeight: '600',
  },

  /* Card */
  card: {
    backgroundColor: '#fff',
    marginTop: 25,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImg: {
    width: '100%',
    height: 180,
  },
  heartBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
  },

  cardContent: {
    padding: 15,
  },
  badge: {
    backgroundColor: '#000',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    borderRadius: 6,
    marginBottom: 8,
    fontSize: 12,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4CAF50',
  },
  address: {
    marginTop: 4,
    color: '#777',
    fontSize: 13,
  },

  features: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    marginLeft: 5,
    color: '#555',
  },
  tabText: { fontSize: 14, color: '#444' },
  tabsRow: { flexDirection: 'row', marginTop: 20 },
  tabBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
  },
});
