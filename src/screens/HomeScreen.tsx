import { StyleSheet, Text, View,SafeAreaView,FlatList, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { getPost } from '../services/postService'
import { Posts } from '../types/Post';

const HomeScreen = () => {
    const [data,setData] =useState<Posts[]>([])
    useEffect(()=>{
       const fetchPosts = async()=>{
        try{
            const data = await getPost();
             console.log("datataaa",data)
             setData(data)
        } catch(err){
            console.log(err)
        }
       }
       fetchPosts();
    },[])
  const  deleteItem =(value?: number)=>{
    console.log('userIDDD',value)
    const filterData = data.filter(ele=>ele.id !== value);
    console.log('filterDatafilterData',filterData)
    setData(filterData)
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item)=>item.id.toString()}
        initialNumToRender={10}
        renderItem={({item})=>(
          <View style={styles.bodyview}>
            <View style={{width:"80%",marginBottom:2,padding:10}}>
                <Text style={styles.bodytext}>{item.body}</Text>
            </View>
            <TouchableOpacity onPress={()=>deleteItem(item.id)} style={styles.buttonView}>
              <Text style={styles.deletetext}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
         margin:10,
      // padding:10,
        // backgroundColor:"white"
    },
    bodyview:{
     
      backgroundColor:"#F54927",
      flexDirection:"row",
      marginBottom:20,
      borderRadius:10
    },
    bodytext:{
      textAlign:"justify",
      color:"white"
    },
    buttonView:{
      backgroundColor:"#A9F27E",
      height:50,
      padding:10,
      top:40,
      borderRadius:10,
      left:10
    },
    deletetext:{
      fontWeight:"700",
      top:5
      // color:"white"
    }
})