import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View ,_ScrollView } from 'react-native'
import React,{useEffect, useState , useCallback} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '../utils/SupabaseConfig'
import Header from '../Components/Home/Header'
import CircularChart from '../Components/Home/CircularChart'
import { moderateScale, scale } from 'react-native-size-matters'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../utils/Colors'
import CategoryList from '../Components/Home/CategoryList'




const Home = ({ navigation }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [particularCategoryDataSave, setParticularCategoryDataSave] = useState([]);

  // for refreshing functionlity
   const [loading, setloading] = useState(false)


  //  useEffect(() => {
  //   particularCategoryData()
  //  }, [])

   useEffect(() => {
    getCategoryItems()
   }, [])

   useEffect(() => {
    getCategorydata()
   }, [])




   const [refreshing, setRefreshing] = useState(false);
  
   const onRefresh = useCallback(() => {
     setRefreshing(true);
     setTimeout(() => {
       setRefreshing(false);
     }, 2000);
   }, []);

  //  useEffect(() => {
  //   filterData()
  //  }, [])
   




 

  const getCategorydata = async () => {
    try {
      let { data: Category, error } = await supabase
        .from('Category')
        .select('*')
      console.log(Category, "getCategorydata");
    } catch (error) {
      console.error('Error fetching category list:', error.message);
    }
  };

  

  const getCategoryItems  = async () => {
    try {
      let { data: Category, error } = await supabase
        .from('Category')
        .select(`*, CategoryItems(*)`)
        .eq('created_by', 'tausif00100@gmail.com');

      setCategoryData(Category);
      console.log(Category, "getCategoryData");
    } catch (error) {
      console.error('Error fetching category list:', error.message);
    }
  };






  return (
    <SafeAreaView style={styles.container }>
      <ScrollView 
        // contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >


      <Header/>
      <View style={{marginTop: moderateScale(-50) }}>

      <CircularChart />
      </View>

      
<View style={{marginTop: 10,}}>

<CategoryList categoryData={categoryData} navigation={navigation} />
</View>

<View style={styles.btnContainer}>      
      <Pressable   onPress ={ () => navigation.navigate('AddNewCategory')}> 
            <AntDesign name="pluscircle" size={64} color={Colors.PRIMARY} />
            </Pressable>
            
            </View>
            </ScrollView>
    </SafeAreaView>
  );
};

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    backgroundColor:'#EEEEEE'
  },
  btnContainer:{
    // backgroundColor:'green',
    // position: 'absolute',
    // bottom: -20,
    left:250,
    borderColor:'red',
    marginTop: 20,
  }
})