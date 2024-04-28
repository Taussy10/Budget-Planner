// understand the code and add activiity indicator 

import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView , Button, ToastAndroid, ActivityIndicator} from 'react-native'
import React,{useState, useEffect} from 'react'
import { scale, moderateScale, verticalScale } from 'react-native-size-matters'
import Colors from '../utils/Colors'
import Input from '../Components/Input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo ,FontAwesome ,MaterialIcons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { PrivateValueStore } from '@react-navigation/native';
import { supabase } from '../utils/SupabaseConfig';
// impport supabase
// for supbse uploding file
// we have to install it
import { decode } from 'base64-arraybuffer'


// it should be defined here not below usestate otherwise you won't able to use it
const placeholder = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='

const AddNewItem = ({route, navigation}) => {

  const { categoryId  } = route.params;
  // console.log(categoryId, "Id");

  const [image, setImage] = useState(placeholder)
  const [previewImage, setPreviewImage] = useState(placeholder)
// How to store anything in a input tag
const [name, setName] = useState()
const [url, setUrl] = useState()
const [cost, setCost] = useState()
const [note, setNote] = useState()

// for loader
const [loading, setloading] = useState(false)


  // for the picking image
  //  // No permissions request is necessary for launching the image library
  const onImagePick = async () =>{
 let result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsEditing: true,
  // aspect: [4, 3],
  quality: 0.7,
  // For creating URL: When the base64 option is truthy, it is a Base64-encoded string of  
  // the selected image's JPEG data, otherwise null.  If you prepend this with 'data:image/jpeg;base64,'
  //  to create a data URI, you can use it as the source of an Image element; for example:

  base64:true
});

  // Function to handle image pick
  // const onImagePick = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     quality: 1,
  //     base64: true, // Retrieve base64-encoded image data
  //   });



// console.log(result);

if (!result.canceled) {
  setPreviewImage(result.assets[0].uri);
  setImage(result.assets[0].base64);
}
};

  // Check if image selection was not cancelled
//   if (!result.cancelled) {
//     // Update preview image
//     setPreviewImage(result.uri);
//     // Upload the image to Supabase
//     uploadfile(result.base64);
//   }
// };


// Uploding base64 file into supabase

const uploadfile= async () =>{
  // when user clicks on boutton then loading starts  
  setloading(true);

  const fileName = Date.now();
let { data:data , error } = await supabase
  .storage
  .from('images')
  .upload(` ${fileName}.png`, decode(image), {
    contentType: 'image/png'
  })
  if (data) {
    const fileURL = `https://omhvglyticiqjqawurpx.supabase.co/storage/v1/object/public/images/${data.path}`
  // console.log(fileURL);



  // we are sending image{specially} cause we stored image in storage to categoryItems data 
  const { data:insertedRows, error } = await supabase
  .from('CategoryItems')
  .insert([
    { name: name ,
      cost: cost,
      url: url,
      image: fileURL,
      note:note,
      category_id: categoryId,
       

  } 
  ])
  .select()
  setloading(true)
  ToastAndroid.show("New Item Added ",ToastAndroid.SHORT) 
  // when data sent
          console.log(insertedRows, error, "Rows r inserrted");
             

  }

  console.log(data, error,"got image" );

}

// modify uploadfile function to directly use the base64 string for uploading
// In react Native you have Upload to file using ArrayBuffer from base64 file data instead
  // Function to upload file to Supabase
  // const uploadfile = async (base64) => {
  //   const fileName = Date.now();
  //   // Upload image to Supabase storage
  //   let { data, error } = await supabase.storage
  //     .from('images')
  //     .upload(` ${expression}.png`, base64, {
  //       contentType: 'image/png',
  //     });
  //   // Log upload response
  //   console.log(data, error, "uploaded image");
  // };

  const deleteFiles = async () => {
   
let { data: deletionResult, error } = await supabase
.storage
.from('images')
.remove('*')
console.log(deletionResult, error , "deleted Files");
  }
 
 
  return (

    // it helps to scroll screen even keyboard open
    <KeyboardAvoidingView>

    <ScrollView>

    <SafeAreaView  style={styles.container}>

<Pressable onPress={()=> onImagePick() }>

 <Image source={{uri: previewImage}}
 style={styles.placeholderImg}
 />
</Pressable>


 <View style={{ flexDirection:'column', gap:moderateScale(20)}}>
<View style={{alignItems:'center' , ...styles.inputView}}>
      <MaterialIcons name="label" size={24} color={Colors.GREY} />  
          <TextInput
          placeholder='Item Name'
          keyboardType= 'default'
       onChangeText={ (text) => setName(text) }
          style={ styles.input }
        /> 
        </View>

      <View style={{alignItems:'center' , ...styles.inputView}}>
        <Feather name="dollar-sign" size={24} color={Colors.GREY} />
      <TextInput
          placeholder='Cost'
          keyboardType= 'numeric'
          onChangeText={ (text) => setCost(text) }

          style={ styles.input }
        /> 
        </View>

     
      <View style={{alignItems:'center' , ...styles.inputView}}>
      <Entypo name="link" size={24} color={Colors.GREY} />
        <TextInput
          placeholder='Url'
          keyboardType= 'default'
          onChangeText={ (text) => setUrl(text) }

          style={ styles.input }
        /> 
        </View>

{/* , height: verticalScale(90) */}
      <View style={{alignItems:'center',height: verticalScale(90),  ...styles.inputView}}>
      <FontAwesome name="pencil" size={24} color={Colors.GREY} />
      <TextInput
          placeholder='Note'
          keyboardType= 'default'
          // numberOfLines={10}
          onChangeText={ (text) => setNote(text) }

          style={ styles.input }
        /> 
        </View>
        </View>

{/* */}

{/*  // when data has been send
        
        // This will go back to screen first screen  without any problem{use that time otherwise not}
        // use goBack to goBack previous screen
         */}

         


<TouchableOpacity 
onPress={() => { navigation.goBack() ,uploadfile(); }}
style={styles.btn}
// if both are false then it's disable 
// this how we disable the button with conditions
disabled={loading} >
  {/* !name||!cost|| */}
{
  loading ? (<ActivityIndicator color={Colors.WHITE} />):
  (
  <Text style={{color: Colors.WHITE, fontSize:moderateScale(22), fontWeight:'bold' }} >Create</Text>
  )}

</TouchableOpacity >









{/* make sure you know about CSS specififity property  */}
        <TouchableOpacity  onPress={()=>deleteFiles()}  style={{ ...styles.btn ,backgroundColor: Colors.RED}}

// if both are false then it's disable 
// this how we disable the button with conditions
// disabled={!name||!cost}
// onPress={() => {insertData()  } }
>
  <Text style={{color: Colors.WHITE, fontSize:moderateScale(22),fontWeight:'bold' }} >Delete</Text>
</TouchableOpacity >







        {/* <Input iconName="dollar-sign"  /> */}
    </SafeAreaView>
    </ScrollView>

    </KeyboardAvoidingView>


  )
}

export default AddNewItem

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    paddingBottom: moderateScale(15),
    // backgroundColor:'red'
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
placeholderImg:{
  height: verticalScale(150),
  width: scale(150),
  borderRadius: moderateScale(15),
 marginBottom:moderateScale(15),
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
  marginTop:moderateScale(20),
},
})