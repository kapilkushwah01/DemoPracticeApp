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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
export default function ProfileScreen() {
  const dispatch = useDispatch();
  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      <View style={styles.profileview}>
        <Image
          source={require('../assets/boy.png')}
          style={{ height: 160, width: 160, borderRadius: 80 }}
        />
      </View>
      <Text style={styles.nametext}>Kapil Kushwah</Text>
      <View style={styles.emailbox}>
        <Text style={styles.emailtext}>KapilKushwah05@gmail.com</Text>
      </View>
      <View
        style={[
          styles.editView,
          { marginTop: 30, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
        ]}
      >
        <View style={styles.leftstyle}>
          <MaterialIcons name="edit" size={26} color="#8754fdff" />
          <Text style={styles.edittext}>Edit Profile</Text>
        </View>
        <View style={styles.rightstyle}>
          <Icon name="chevron-forward-outline" size={30} color="#8754fdff" />
        </View>
      </View>
      <View style={[styles.editView, { marginTop: 5 }]}>
        <View style={styles.leftstyle}>
          <MaterialIcons name="location-pin" size={26} color="#8754fdff" />
          <Text style={styles.edittext}>Location</Text>
        </View>
        <View style={styles.rightstyle}>
          <Icon name="chevron-forward-outline" size={30} color="#8754fdff" />
        </View>
      </View>
      <View style={[styles.editView, { marginTop: 5 }]}>
        <View style={styles.leftstyle}>
          <Icon name="settings-outline" size={26} color="#8754fdff" />
          <Text style={styles.edittext}>Setting</Text>
        </View>
        <View style={styles.rightstyle}>
          <Icon name="chevron-forward-outline" size={30} color="#8754fdff" />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => dispatch<any>(logout())}
        style={[
          styles.editView,
          {
            marginTop: 5,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          },
        ]}
      >
        <View style={styles.leftstyle}>
          <Icon name="log-out" size={30} color="#cc1d17ff" />
          <Text style={styles.edittext}>Logout</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F3FF',
    // paddingHorizontal: 20,
  },

  profileview: {
    height: 160,
    width: 160,
    borderRadius: 80,
    alignSelf: 'center',
    marginTop: 50,
    alignItems: 'center',
  },
  nametext: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 22,
    fontWeight: '700',
  },
  emailbox: {
    height: 50,
    width: '70%',
    backgroundColor: '#8754fdff',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
    paddingTop: 15,
  },
  emailtext: {
    color: 'white',
    fontSize: 16,
  },
  editView: {
    height: 60,
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  leftstyle: {
    height: 60,
    width: '80%',
    // borderWidth:1,
    flexDirection: 'row',
    padding: 13,
  },
  rightstyle: {
    height: 60,
    width: '20%',
    padding: 13,
    // borderWidth:1
  },
  edittext: {
    fontSize: 18,
    left: 8,
  },
});
