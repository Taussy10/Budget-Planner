import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useFonts} from 'expo-font'
import { Entypo ,MaterialCommunityIcons  } from '@expo/vector-icons';
import Home from '../Screens/Home';
import { useEffect } from 'react';
import Login from '../Screens/Auth/Login';
import History from '../Screens/History';
import Profile from '../Screens/Profile';
import AddNewCategory from '../Screens/AddNewCategory';
import AddNewItem from '../Screens/AddNewItem';
import CategoryDetails from '../Screens/CategoryDetails';
// import Test from '../Components/Test';
import CategoryDetailsCopy from '../Screens/CategoryDetailsCopy';
const Stack = createNativeStackNavigator() 
const Tab = createBottomTabNavigator();
const Routes = () => {
    useEffect(() => {
        checkUserAuth()
       }, [])
       
      //  weather user authencitated or not
       const checkUserAuth = async () => {
        const result = await service.getData('login')
        console.log("Result" ,result);
       if (result !== 'true') {
        // for pushing/moving
        
        // console.log("Nog found");
       } else {
        
       }
       }
 
 


  return (
   <Stack.Navigator  initialRouteName='Home' screenOptions={{headerShown:false ,}}>
   <Stack.Screen name='Tab' component={MyTab} />
    <Stack.Screen name='Login' component={Login} />
    {/* <Stack.Screen name="Home" component={Home} /> */}
    <Stack.Screen name="AddNewCategory" component={AddNewCategory} 
     options={{headerShown:true, title:'Add New category'}}
    />
    <Stack.Screen name="CategoryDetails" component={CategoryDetails}/>
        <Stack.Screen name="AddNewItem" component={AddNewItem}
    options={{headerShown:true, title:'Add New Item'}}
    />
        <Stack.Screen name="CategoryDetailsCopy" component={CategoryDetailsCopy}
 
    />
    {/* <Stack.Screen name='Test' component={Test} /> */}
   </Stack.Navigator>

  )
}

const MyTab = () => {
  return (
      <Tab.Navigator screenOptions={{headerShown:false}} >
        <Tab.Screen name="Home" component={Home} 
 options={{
  tabBarLabel: 'Home',
  // tabBarIcon: ({ color, size }) => (
  //   <MaterialCommunityIcons name="home" color={color} size={size} />
  // ),
  tabBarIcon:  ({color , }) => (
    <Entypo name="home" size={24} color="black" />
  )
}}
      
      />
        <Tab.Screen name="Profile" component={Profile} 
        options={{tabBarIcon: ({color }) => 
<MaterialCommunityIcons name="account" size={24} color="black" />
        }}
        />
      </Tab.Navigator>
  )
}


export default Routes

const styles = StyleSheet.create({})