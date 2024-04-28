import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { verticalScale, moderateScale ,scale } from 'react-native-size-matters'

const Circle = ({color}) => {
  return (
    // this is how you can use props for styles and use both inline and external style
    <View style={{ backgroundColor: color , ...styles.container}}>
      
    </View>
  )
}

export default Circle

const styles = StyleSheet.create({
    container:{
        height: verticalScale(25),
        width: scale(25),
        borderRadius: moderateScale(25),
        
        
    }
})