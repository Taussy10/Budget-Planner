import { StyleSheet, Text, View ,Pressable, TouchableOpacity,RefreshControl , Alert , ScrollView} from 'react-native'
import React,{useEffect, useState , useCallback} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '../utils/SupabaseConfig';
import Colors from '../utils/Colors';
import ItemList from '../Components/CategoryDetailsComp/ItemList';
import { AntDesign ,Feather } from '@expo/vector-icons';
import { scale , moderateScale , verticalScale } from 'react-native-size-matters';
// ()
const CategoryDetails = ({route, navigation}) => {
  useEffect(() => {
    getCategoryDetail()
    calculateTotalPerc()
  }, [])

  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  
  //  progresBar totoal
  const [totalCost, setTotalCost] = useState()

  // for subcategory percentage
  const [percentageTotal, setPercentageTotal] = useState(0)


  const [categoryData, setCategoryData] = useState([])

  // name,
  const { name, color,icon, assigned_budget, items , id } = route.params;
// console.log(items, "number of items");

// console.log(items[0].cost ," Items");

console.log(id , "Got id");
console.log(items , "Itemses");

const getCategoryDetail = async ()=> {
  try {
    let {data:detail , error} = await supabase
    .from('Category')
    .select('*,CategoryItems(*)')
    .eq('id', id )

    console.log("Cat" , detail);
    // because we want only data of first array
    setCategoryData(detail[0])
  } catch (error) {

  }
}

const deleteCategory = async () => {
  const { error } = await supabase
  .from('Category')
  .delete()
  .eq('id', id)
    console.log(error , "error");  
    // This is will delete only when there will be no 
    // categoryItems because Category is attached to categoryItems so you can't 
   // w/o deleting 
}

// console.log(deleteCategory() , "delete" );
const onDeleteCategory = () => {
  // for alerting
  Alert.alert("Do you really want to delete")
  deleteCategory() 

}


const calculateTotalPerc = () => {
  if (items &&  items.length > 0) {
    let total = 0;
    items.forEach(value => {
      total += value?.cost || 0;
    });
    setTotalCost(total);

    let percentage = (total / assigned_budget) * 100;
    percentage = Math.min(percentage, 100);
    setPercentageTotal(percentage);
  } else {
    console.log("No items are present");
  }
};





  return (
    
    <SafeAreaView style={styles.container}>
    {/* <ScrollView
      
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      > */}
     <View style={styles.categoryContainer} >

<View style={{flexDirection:'row', }} >
  <View style={{ backgroundColor: color ,...styles.iconContainer}}>
<Text style={{fontSize:moderateScale(30) }} >{icon}</Text>
</View>

<View style={{ marginLeft: scale(20) }}>
<Text style={{fontFamily: 'Outfit-Bold' , fontSize: 20}}>{name}</Text>
<Text style={{fontFamily: 'Outfit-Regular' , fontSize:15,}}>{items?.length} Items</Text>
</View>
</View>


 <TouchableOpacity onPress={()=> onDeleteCategory()}>
      <Feather name="trash-2" size={34} color={Colors.RED}  />
      </TouchableOpacity>

</View>

<View style={{flexDirection:'row' , justifyContent:'space-between'}}>
<View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
<Feather name="dollar-sign" size={24} color="black" />
<Text style={{ fontSize: moderateScale(20), fontFamily: 'Outfit-Medium', fontSize: 30 }}>
  {items?.reduce((total, value) => total + (value.cost || 0), 0)}
</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
<Feather name="dollar-sign" size={24} color="black" />
<Text style={{fontSize: moderateScale(20) , fontFamily: 'Outfit-Bold' , fontSize:30,}}> {assigned_budget}</Text>
</View>
</View>



      {/* ProgressBar  */}
      <View style={styles.progressBarMainContainer}>
      <View style={{ width: `${percentageTotal}%`  , ...styles.progressBarSubContainer}}>

     </View>

        </View>

        <Text style={{ fontSize: moderateScale(20), fontFamily: 'Outfit-Medium',fontSize: 30,marginTop: 10,}}>Item List</Text>
        <View style={{ flex: 1, }}>
        <ItemList items = {items}  />
        </View>

        <View style={styles.btnContainer}>
      
      <Pressable   onPress ={ () => navigation.navigate('AddNewItem',{
        categoryId:id
      })}> 
            <AntDesign name="pluscircle" size={64} color={Colors.PRIMARY} />
            </Pressable>
            
            </View>
            {/* </ScrollView> */}
    </SafeAreaView>
   

  )
}

export default CategoryDetails

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: moderateScale(10) ,
  },
 
  categoryContainer:{
    backgroundColor:'white',
    borderRadius: moderateScale(20), 
    justifyContent:'space-between',
    flexDirection:'row',
    padding:moderateScale(15),
    // elevation: 1,
  },
  iconContainer:{
    height: verticalScale(60),
    width: scale(60),
    padding:moderateScale(5),
    borderRadius: moderateScale(10),
    justifyContent:'center',
    alignItems:'center'
  },
  progressBarMainContainer:{
    width: '100%',
    height: moderateScale(20),
    backgroundColor: Colors.LIGHTGREY,
    borderRadius: moderateScale(18),
},

  progressBarSubContainer:{
    // width: '40%',
    height: moderateScale(20),
    backgroundColor: Colors.PRIMARY,
    borderRadius: moderateScale(18),
} ,
btnContainer:{
    // backgroundColor:'green',
    // position: 'absolute',
    // bottom: -20,
    left:250,
    borderColor:'red',
    // marginTop: 10,
}

})