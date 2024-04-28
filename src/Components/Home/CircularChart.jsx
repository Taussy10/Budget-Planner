// import { StyleSheet, Text, View } from 'react-native'
import { StyleSheet,  Text, View, ViewBase } from 'react-native'

import React,{useState} from 'react'
import PieChart from 'react-native-pie-chart'
import Colors from '../../utils/Colors'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import Circle from '../Circle'
import { FontAwesome } from '@expo/vector-icons';
// import {useFonts} from 'expo-font' 
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'



const CircularChart = () => {
 const [values, setvalues] = useState([1])
const [sliceColor, setsliceColor] = useState([Colors.LIGHTGREY])



    // widthAndHeight of  the chArt 
    const widthAndHeight = 150

  return (
   
    <View style={styles.container}>



        <View style={styles.subContainer}>
        <Text style={{fontSize: moderateScale(20), fontFamily:'Outfit-Regular'}}>Total Estimate: <Text style={{fontFamily:'Outfit-Bold'}}>$0</Text>  </Text>
<View style={styles.calcContainer}>

      <PieChart
        widthAndHeight={widthAndHeight}
        series={values}
        sliceColor={sliceColor}
        // // circle in the  centre of the chart
        coverRadius={0.75}
        // for color in the centre of the chart
        coverFill={'#FFF'}
      />



<View style={{flexDirection:'row', alignItems:'center' , gap:moderateScale(3) }}>
{/* living room nd bathroom */}
<FontAwesome name="circle" size={33} color= {Colors.LIGHTGREY} />
<Text>Living Room</Text>
</View>

</View>
    </View>
   
    </View>
  )
}

export default CircularChart

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      subContainer:{
         backgroundColor: Colors.WHITE,
        // padding:moderateScale(3),
        paddingBottom: moderateScale(20),
        borderRadius: moderateScale(10),
        // // wht is this 
        elevation: 1,
        marginTop: verticalScale(20),
  

      },
      calcContainer:{  
        marginTop: verticalScale(20),
        flexDirection:'row', 
        gap:moderateScale(40),
        // height: responsiveHeight(2),
         }
      
})