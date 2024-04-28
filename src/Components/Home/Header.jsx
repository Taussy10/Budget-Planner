import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
// import Profile from '../../../Screens/Profile'
// import Profile from '../../Screens/Profile'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Colors from '../../utils/Colors'

const Header = () => {
  return (
    <View style={styles.container}>
        <Text style={{fontSize: scale(30), color:'white', fontFamily:'Outfit-Regular' }}>Tausif</Text>
      {/* Image */}
  
{/*  source={require('../../../assets/Images/Login.png')} */}
      <Image source={require('../../../assets/Images/Login.png')}
   style={styles.profileImg}
      />


    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding: moderateScale(10),
        paddingBottom: moderateScale(60),
        backgroundColor: Colors.PRIMARY
    }
    ,profileImg:{
        height: verticalScale(50),
        width: scale(50),
        borderRadius: moderateScale(25),
        backgroundColor:'red'
        
    }
})