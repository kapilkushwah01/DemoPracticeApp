import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getPost } from '../services/postService';
import { Posts } from '../types/Post';

const HomeScreen = () => {
  const [data, setData] = useState<Posts[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filterData, setFilterData] = useState<Posts[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (pageNo: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await getPost(pageNo); // <-- pass page number

      if (res.length === 0) {
        setHasMore(false);
      } else {
        setData(prev => [...prev, ...res]); // append new data
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const deleteItem = (value?: number) => {
    console.log('value', value);
    const getData = data.filter(ele => ele.id !== value);
    setData(getData);
    const newFilterData = filterData.filter(item => item.id !== value);
    setFilterData(newFilterData);
  };
  const handleFilterData = useCallback(
    debounce((text: string, fullData: Posts[]) => {
      if (text.trim() === '') {
        setFilterData([]);
        return;
      }

      const result = fullData.filter(item =>
        item.title.toLowerCase().includes(text.toLowerCase()),
      );
      setFilterData(result);
    }, 300),
    [],
  );

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <Text style={styles.bodyText}>{text}</Text>;
    }

    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);

    return (
      <Text style={styles.bodyText}>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text
              key={index}
              style={{ backgroundColor: 'yellow', color: 'black' }}
            >
              {part}
            </Text>
          ) : (
            <Text key={index} style={styles.bodyText}>
              {part}
            </Text>
          ),
        )}
      </Text>
    );
  };

  const onSearch = (text: string) => {
    setSearchText(text);
    handleFilterData(text, data);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          placeholder="Search Item"
          style={styles.inputcontainer}
          value={searchText}
          onChangeText={onSearch}
        />
      </View>
      {searchText.length > 0 && filterData.length === 0 && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>
            No Results Found
          </Text>
        </View>
      )}
      <FlatList
        data={searchText.length > 0 ? filterData : data}
        keyExtractor={item => item.id.toString()}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <View style={styles.bodyview}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '800',
                paddingHorizontal: 10,
                marginTop: 20,
              }}
            >
              Title
            </Text>
            <View style={{ width: '100%', marginBottom: 2, padding: 10 }}>
              {/* <Text  numberOfLines={1} style={styles.bodytext}>{item.title}</Text> */}
              {highlightText(item.title, searchText)}
            </View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '800',
                paddingHorizontal: 10,
                marginTop: 20,
              }}
            >
              Discription
            </Text>
            <View style={{ width: '100%', marginBottom: 2, padding: 10 }}>
              <Text numberOfLines={3} style={styles.bodytext}>
                {item.body}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => deleteItem(item.id)}
              style={styles.buttonView}
            >
              <Text style={styles.deletetext}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        onEndReached={() => {
          if (!loading && hasMore) {
            setPage(prev => prev + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
          ) : null
        }
      />
    </SafeAreaView>
  );
};
function debounce(fn: Function, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    // padding:10,
    // backgroundColor:"white"
  },
  bodyview: {
    backgroundColor: '#7870eeff',
    // flexDirection:"row",
    marginBottom: 20,
    borderRadius: 10,
  },
  bodytext: {
    textAlign: 'justify',
    color: 'white',
    fontSize: 16,
  },
  buttonView: {
    backgroundColor: '#e66363ff',
    height: 50,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  deletetext: {
    fontWeight: '800',
    // top:5,
    color: 'white',
    fontSize: 18,
  },
  inputcontainer: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  bodyText: {
    color: 'white',
  },
});
