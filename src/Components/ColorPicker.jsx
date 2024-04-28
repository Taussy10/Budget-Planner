import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const ColorPicker = ({ selectedColor , setSelectedColor }) => {
  return (
    <View       style={{backgroundColor:'red', height: responsiveHeight(10), }}    >
      <FlatList
        horizontal
        data={Colors.COLOR_LIST}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              height: verticalScale(40),
              width: scale(40),
              borderRadius: moderateScale(20),
              marginHorizontal: 5,
              marginTop: 10,
              marginLeft: 20,
              backgroundColor: selectedColor === item ?  item  : item ,
            //   backgroundColor: 'red' ,
            }}
            onPress={() => setSelectedColor(item) }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({});
