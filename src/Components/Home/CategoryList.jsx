import { StyleSheet, Text, View , Image, FlatList, Pressable, TouchableHighlight, TouchableOpacity} from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
// ()
const CategoryList = ({ categoryData , navigation  }) => {
  console.log(categoryData, "hello");
  return (
    <View style={{ flex: 1 }}>
   <Text style={{fontSize: 25 , marginBottom: 10 , fontWeight: 'bold' }}>Latest Budget</Text>
      {categoryData.map((category, index) => {
        return (
          <TouchableOpacity
          key={index}
          onPress={ () => navigation.navigate("CategoryDetails", {
            name:category.name,
            color:category.color,
            icon:category.icon,
            assigned_budget: category.assigned_budget,
             items: category.CategoryItems ,
            id: category.id })}  
          >
          <View  style={styles.container} >

            <View style={{flexDirection:'row', }} >
              <View style={{  backgroundColor:category.color ,...styles.iconContainer}}>
            <Text style={{fontSize:moderateScale(30) }} >{category.icon}</Text>
            </View>

            <View style={{ marginLeft: scale(20) }}>
            <Text style={{fontFamily: 'Outfit-Bold' , fontSize: 20}}>{category.name}</Text>
            <Text style={{fontFamily: 'Outfit-Regular' , fontSize:15,}}>{category?.CategoryItems?.length} Items</Text>
            </View>
            </View>

            <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
            <Feather name="dollar-sign" size={24} color="black" />
            <Text style={{fontSize: moderateScale(20) , fontFamily: 'Outfit-Bold' , fontSize:30,}}>{category.assigned_budget}</Text>
            </View>
            

          </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CategoryList

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    borderRadius: moderateScale(20), 
    justifyContent:'space-between',
    // alignItems:'center',
    flexDirection:'row',
    // marginRight: 10,
    padding:moderateScale(15),
    elevation: 1,

    
  },
  iconContainer:{
    height: verticalScale(60),
    width: scale(60),
    padding:moderateScale(5),
    borderRadius: moderateScale(10),
    justifyContent:'center',
    alignItems:'center'
  }
})

