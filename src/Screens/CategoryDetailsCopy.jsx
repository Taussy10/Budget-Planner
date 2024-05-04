import { StyleSheet, Text, View ,Pressable, TouchableOpacity,RefreshControl , Alert , ScrollView} from 'react-native'
import React,{useEffect, useState , useCallback} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '../utils/SupabaseConfig';
import { AntDesign ,Feather } from '@expo/vector-icons';
import { scale , moderateScale , verticalScale } from 'react-native-size-matters';
// Componenet
import ItemList from '../Components/CategoryDetailsComp/ItemList';
import Colors from '../utils/Colors';

// ()
const CategoryDetailsCopy = ({route, navigation}) => {
  useEffect(() => {
  getCategoryItemsDetail()

  }, [])
  useEffect(() => {
  calculateTotalPerc()

  }, [])

  const [refreshing, setRefreshing] = useState(false);
  

  
  //  progresBar totoal
  const [totalCost, setTotalCost] = useState()

  // for subcategory percentage
  const [percentageTotal, setPercentageTotal] = useState(0)


  const [categoryData, setCategoryData] = useState([])

  // name,
  const { name, color,icon, assigned_budget, items , CatId } = route.params;

const getCategoryItemsDetail = async ()=> {
let { data: CategoryItems, error } = await supabase
  .from('CategoryItems')
  .select('*')
  setCategoryData(CategoryItems)
  getCategoryItemsDetail&&setRefreshing(false) 
  console.log(CategoryItems , "getCategoryItemsDetail");}



const deleteCategory = async () => {
  const { error } = await supabase
  .from('Category')
  .delete()
  .eq('id', CatId)
    // console.log(error , "error");  
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
  // setRefreshing(true)

  if (categoryData &&  categoryData.length > 0) {
    let total = 0;
    categoryData.forEach(value => {
      total += value?.cost || 0;
    });
    setTotalCost(total);
  console.log(totalCost , "Costw");
    let percentage = (total / assigned_budget) * 100;
    percentage = Math.min(percentage, 100);
    setPercentageTotal(percentage);
  } else {
    console.log("No items are present");
  }


};



  return (
    
    <SafeAreaView style={styles.container}>
    <ScrollView
      // ()
        refreshControl={
       <RefreshControl refreshing={refreshing} onRefresh={getCategoryItemsDetail } />
    }
      >
     <View style={styles.categoryContainer} >

<View style={{flexDirection:'row', }} >
  <View style={{ backgroundColor: color ,...styles.iconContainer}}>
<Text style={{fontSize:moderateScale(30) }} >{icon}</Text>
</View>

<View style={{ marginLeft: scale(20) }}>
<Text style={{fontFamily: 'Outfit-Bold' , fontSize: 20}}>{name}</Text>
{/* <Text style={{fontFamily: 'Outfit-Bold' , fontSize: 20}}>HEllo</Text> */}
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
        <ItemList categoryData= {categoryData}  />
     
        </View>

        <View style={styles.btnContainer}>
      
      <Pressable   onPress ={ () => navigation.navigate('AddNewItem'
      ,{
        categoryId:CatId
      }
      )}> 
            <AntDesign name="pluscircle" size={64} color={Colors.PRIMARY} />
            </Pressable>
            
            </View>
            </ScrollView>
    </SafeAreaView>
   

  )
}

export default CategoryDetailsCopy

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
        height: moderateScale(20),
    backgroundColor: Colors.PRIMARY,
    borderRadius: moderateScale(18),
} ,
btnContainer:{
    left:250,
    borderColor:'red',
}

})