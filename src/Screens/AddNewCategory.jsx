import { KeyboardAvoidingView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View , Platform, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Colors from '../utils/Colors';
import ColorPicker from '../Components/ColorPicker';
import { MaterialIcons ,Feather } from '@expo/vector-icons';
import { supabase } from '../utils/SupabaseConfig';



const AddNewCategory = ({navigation}) => {
  const [selectedIcon, setSelectedIcon] = useState('IC');
  const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY);
  const [categoryName, setCategoryName] = useState()
  const [totalBudget, setTotalBudget] = useState()

// useEffect(() => {
//   insertData()
// }, [])


  // const onCreateCategory = async () => {
// 
const insertData = async () => {
  try {
    let{data:insertedData ,   } = await supabase
    .from('Category')
    // these are the things will be present in one row
    .insert([
     { name: categoryName ,
      assigned_budget: totalBudget ,
      icon: selectedIcon ,
      color: selectedColor ,
      created_by: 'tausif00100@gmail.com' },
    ]).select()
  console.log(insertedData, "insertData");

  // for showing that it added
  if (insertedData) {
    ToastAndroid.show('Category Created', ToastAndroid.SHORT)
    navigation.replace('CategoryDetails', {
      name: categoryName,
      color : selectedColor,
      icon: selectedIcon,
      assigned_budget: totalBudget 
      
    })
    console.log(navigation);
  }
  } catch (error) {
    console.error('Error fetching category list:', error.message);
  }
}





  return (
    <KeyboardAvoidingView      
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       >
    <ScrollView >

    <SafeAreaView style={styles.container} >




      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <TextInput
          // placeholder='Search'
          // this for sving
          onChangeText={(value)=> setSelectedIcon(value) }
          maxLength={2}
          style={{ backgroundColor: selectedColor, ...styles.iconInput }}
        >
          {selectedIcon}
        </TextInput>
       
      
       

        <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      
       
      </View>

      {/* Add category name and Total Budget Section */}
      <View style={{display:'flex', gap: moderateScale(20), marginTop:moderateScale(30),}}>

   <View style={{alignItems:'flex-end' , ...styles.inputView}}>
<MaterialIcons name="label" size={25} color="grey" style={{ bottom:10}}  />


<TextInput
          placeholder='Category Name'
         keyboardType= 'default'
         onChangeText={(value) => setCategoryName(value)}
          style={ styles.input }
          />
           </View>
       <View style={{alignItems:'center' , ...styles.inputView}}>

        <Feather name="dollar-sign" size={24} color="grey" />

      <TextInput
          placeholder='Total Budget'
          keyboardType= 'numeric'
          onChangeText={(value) => setTotalBudget(value)}

          style={ styles.input }
        /> 


        </View>
        <TouchableOpacity style={styles.btn}
        // if both are false then it's disable 
        disabled={!categoryName||!totalBudget}
        onPress={() => {insertData()  } }
        >
          <Text style={{color: Colors.WHITE, fontSize:moderateScale(22),fontWeight:'bold' }} >Create</Text>
        </TouchableOpacity>
        </View>

        </SafeAreaView>
        </ScrollView>

       </KeyboardAvoidingView>
    
  );
};

export default AddNewCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10),
    marginTop: moderateScale(50),
  },
  iconInput: {
    width: scale(100),
    textAlign: 'center',
    fontSize: moderateScale(50),
    height: verticalScale(100),
    borderRadius: moderateScale(50),
    color: Colors.WHITE,
  },
  input: {
    width: scale(330),
    fontSize: moderateScale(16),
    height: verticalScale(50),
    color: Colors.BLACK,
 
  },
  inputView:{flexDirection:'row',  
  gap: moderateScale(5), 
  borderRadius: moderateScale(12),  
  borderColor:'grey',
   borderWidth:moderateScale(1.5),
},
  btn: {
    width: scale(330),
    height: verticalScale(55),
    borderRadius: moderateScale(15),
    // color: Colors.WHITE,
    // backgroundColor:'green',
    // borderColor:'grey',
    // borderWidth: moderateScale(1.5), 
    backgroundColor: Colors.PRIMARY,
    justifyContent:'center',
    alignItems:'center',
    // padding:moderateScale(14),
  },
});
