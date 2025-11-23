import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import { TabParamList } from '../navigation/TabNavigator';
import { AppStackParamList } from '../navigation/AppStack';

type TabNav = BottomTabScreenProps<TabParamList, 'Message'>['navigation'];
type StackNav = NativeStackNavigationProp<AppStackParamList>;

type NavigationProps = CompositeNavigationProp<TabNav, StackNav>;

type Props = {
  navigation: NavigationProps;
};

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Message {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
}

const activities: User[] = [
  { id: '1', name: 'Alex', avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: '2', name: 'Liza', avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: '3', name: 'Sara', avatar: 'https://i.pravatar.cc/100?img=3' },
  { id: '4', name: 'Tom', avatar: 'https://i.pravatar.cc/100?img=4' },
  { id: '5', name: 'Tom', avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: '6', name: 'Tom', avatar: 'https://i.pravatar.cc/100?img=6' },
];

const messages: Message[] = [
  {
    id: '1',
    name: 'Emma Bailery',
    message: 'Hello how are you..?',
    time: '23 min',
    avatar: 'https://i.pravatar.cc/100?img=6',
  },
  {
    id: '2',
    name: 'Chad Griffin',
    message: 'You interest the pet...',
    time: '30 min',
    avatar: 'https://i.pravatar.cc/100?img=7',
  },
  {
    id: '3',
    name: 'Cara Bush',
    message: 'Thats pretty wild on...',
    time: '54 min',
    avatar: 'https://i.pravatar.cc/100?img=8',
  },
  {
    id: '4',
    name: 'Barry Oisen',
    message: 'What are your favorite...',
    time: '1 hr',
    avatar: 'https://i.pravatar.cc/100?img=9',
  },
];

export default function MessageScreen({ navigation }: Props) {
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
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Chat</Text>
          <TouchableOpacity style={styles.searchBtn}>
            <Icon name="search" size={20} color="#6A4DE5" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Activities</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={activities}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.activityItem}>
              <View style={styles.activityRing}>
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.activityImg}
                />
              </View>
            </View>
          )}
        />
        <Text style={styles.sectionTitle}>Messages</Text>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Chat', { userId: '123' })}
              key={item.id}
              style={styles.messageRow}
            >
              <Image
                source={{ uri: item.avatar }}
                style={styles.messageAvatar}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.msgName}>{item.name}</Text>
                <Text style={styles.msgText}>{item.message}</Text>
              </View>

              <View style={styles.rightCol}>
                <Text style={styles.msgTime}>{item.time}</Text>
                <View style={styles.unreadDot} />
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F3FF',
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  searchBtn: {
    height: 40,
    width: 40,
    borderRadius: 12,
    backgroundColor: '#EDE7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    marginTop: 25,
    marginBottom: 10,
    fontWeight: '600',
    color: '#000',
  },
  activityItem: {
    marginRight: 18,
  },
  activityRing: {
    height: 70,
    width: 70,
    borderRadius: 35,
    padding: 3,
    borderWidth: 2,
    borderColor: '#8A5BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityImg: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },

  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  messageAvatar: {
    height: 55,
    width: 55,
    borderRadius: 28,
    marginRight: 12,
  },
  msgName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  msgText: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  rightCol: {
    alignItems: 'flex-end',
  },
  msgTime: {
    fontSize: 12,
    color: '#555',
  },
  unreadDot: {
    height: 10,
    width: 10,
    backgroundColor: '#8A5BFF',
    borderRadius: 5,
    marginTop: 6,
  },
});
