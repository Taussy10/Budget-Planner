import { FlatList, StyleSheet, Text, View, Image,  TouchableOpacity, Alert, ScrollView, RefreshControl} from 'react-native'
import React,{useEffect, useState , useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '../../utils/SupabaseConfig'
import { moderateScale , scale , verticalScale } from 'react-native-size-matters'
import { Feather } from '@expo/vector-icons';
import Colors from '../../utils/Colors'
// ()
// {data}



const ItemList = ({items}) => {

  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = () => {
    items&&setRefreshing(true); 
   } 




// console.log(items , "Cost items");



  return (

    <SafeAreaView style={styles.container}>
    <ScrollView
        // contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >

      { items &&  items.length > 0? 
      <FlatList 
      // ItemSeparatorComponent={}
      data={items}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
       
        let itemId = item.id;
        // console.log(itemId , "IDd");
        const deleteItems = async () => {
          const { error } = await supabase
          .from('CategoryItems')
          .delete()
          .eq('id', itemId )
          console.log(error, "Error aa raha hai ");
        // work only on one row after using .in method 
     
        } 


        const onDeleteItem = () => {
            deleteItems();
            Alert.alert("Item has been deleted")

          }
        return(


<TouchableOpacity onPress={() => { onDeleteItem()}}>

      <View  style={styles.subContainer} >
{/* for the flex direction */}

      <View style={{flexDirection:'row', gap:(20) , alignItems:'center' }} >

      <View style={{ marginLeft: scale(20) ,  }}>
      {/* <Text style={{fontFamily: 'Outfit-Regular' , fontSize:15,}}>{item?.item?.length} Items</Text> */}
      <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <Text style={{fontFamily: 'Outfit-Bold' , fontSize: 20}}>{item?.name}</Text>

      </View>

      <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
      <Feather name="dollar-sign" size={24} color="black" />
      <Text style={{fontSize: moderateScale(25) ,  fontFamily: 'Outfit-Medium', }}>{item.cost}</Text>

      </View>
 

    </View> 
    </TouchableOpacity>
  )
}
    }
      />
    : <Text style={{textAlign:'center', fontSize: 50, fontFamily:'Outfit-Medium', color:'grey'}}>Add Items</Text>}

     </ScrollView>

    </SafeAreaView>
  )
}

export default ItemList

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#EEEEEE'
    },
    subContainer: {
      backgroundColor:'white',
      borderRadius: moderateScale(20), 
      justifyContent: 'space-between',
      // alignItems:'center',
      flexDirection:'row',
      // marginRight: 10,
      paddingTop:moderateScale(15),
      paddingRight:moderateScale(15),
      paddingBottom:moderateScale(15),
      elevation: 1,
      marginBottom: 20,
    }
    ,
  iconContainer:{
    height: verticalScale(60),
    width: scale(60),
    padding:moderateScale(5),
    borderRadius: moderateScale(10)
  },
  image:{
    width: scale(100),
    height: verticalScale(100),
  }
})