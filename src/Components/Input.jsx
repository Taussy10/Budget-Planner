import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { scale , moderateScale , verticalScale } from 'react-native-size-matters'
import Colors from '../utils/Colors'
import { Feather } from '@expo/vector-icons';

const Input = ({iconName}) => {
  return (
    <View style={{alignItems:'center' , ...styles.inputView}}>

        <Feather name = {iconName} size={24} color="grey" />

      <TextInput
          placeholder='Total Budget'
          keyboardType= 'numeric'
        //   onChangeText={(value) => setTotalBudget(value)}

          style={ styles.input }
        /> 


        </View>
  )
}

export default Input

const styles = StyleSheet.create({
    input: {
        width: scale(330),
        fontSize: moderateScale(16),
        height: verticalScale(50),
        color: Colors.BLACK,
      },

      inputView:{
      flexDirection:'row',  
      gap: moderateScale(5), 
      borderRadius: moderateScale(12),  
      borderColor:'grey',
      borderWidth:moderateScale(1.5),
    },
})