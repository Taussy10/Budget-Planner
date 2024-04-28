// import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// // import { verticalScale , moderateScale , scale } from 'react-native-size-matters'
// import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
// import {
//     responsiveHeight,
//     responsiveWidth,
//     responsiveFontSize
//   } from "react-native-responsive-dimensions";
// import Colors from '../../utils/Colors';
// const Login = ({navigation}) => {
//   return (
//     <SafeAreaView style={{flex:1}}>
//       <Image source={require('../../../assets/Images/Login.png') } style={styles.image} />

//       {/* for login nd sign up */}
//       <View style={styles.container}>
//       <Text style={{ fontSize: responsiveFontSize(3.5), fontWeight:'700', color:'white' }}>Personal Budget Planner</Text>  
//       <Text  style={{fontSize:responsiveFontSize(2.1), fontWeight:'500', color:'white', marginTop: scale(25), }}>Stay on Track , Event by Event: Your Personal</Text>  
//       <Text style={{fontSize:responsiveFontSize(2.1), fontWeight:'500', color:'white' }}>Budget Planner App</Text>  
//          <TouchableOpacity style={styles.btn}         onPress={() => navigation.navigate('Home')}
//  >
//             <Text style={{fontSize:responsiveFontSize(2.4),}} > Login/Signup</Text>
//          </TouchableOpacity  >
//          <Text style={{fontSize:responsiveFontSize(1.6), color:'lightgrey',marginTop: scale(10),}}>By login/signup you will agree in our tearms and conditions </Text>

//       </View>

//     </SafeAreaView>
//   )
// }

// export default Login

// const styles = StyleSheet.create({
//   container:{
//     backgroundColor:Colors.PRIMARY,
//     flex:1,
//     padding: scale(20),
//    alignItems:'center',
//    borderTopLeftRadius:scale(30),
//    borderTopRightRadius:scale(30),
// },
//     image:{
//         height: responsiveHeight(55),      
//     }, 
//     btn:{
//     height:verticalScale(50),
//     backgroundColor: Colors.WHITE,
//     width: responsiveWidth(85),
//     borderRadius: scale(200),
//     justifyContent:'center',
//     alignItems: 'center',
//     marginTop: scale(20),
//     },

// })


import { StyleSheet, Text, View , TextInput , Button} from 'react-native'
import {Client, Account, ID} from 'react-native-appwrite'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

let client;
let account;



client = new Client()
client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66196293bee6d7a1fd53")
    .setPlatform("com.BudgetPlanner.app")

account = new Account(client)

const Login = ({navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [userDetails, setUserDetails] = useState(null)



// create a new account in appwrite
async function createAccount() {
  await account.create(ID.unique(), email, password, name)
  console.log("Successfully created account")
}

// sign in with email and password
async function signIn() {
  await account.createEmailSession(email, password)
  setUserDetails(await account.get())
  console.log(userDetails)
  navigation.navigate("Home") 
}

// sign out
async function signOut() {
  await account.deleteSessions()
  setUserDetails(null)
  console.log("Successfully signed out")
}



  return (
    <SafeAreaView>

    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        // jab text change ho to tex setPassword me save ho jaaye
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        // onFocus={Keyboard.dismiss}
        // onChangeText={this._onHiddenTextChangeText}
        // value={this.state.hiddenInput}
        // for password hiding
        secureTextEntry={true}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Name"
      />
      <Button title="Sign In" onPress={signIn} />
      <Button title="Sign Out" onPress={signOut} />
      <Button title="Create Account" onPress={createAccount} />
    </View>

    <View>
      <Text>
        Account ID: {userDetails ? userDetails.$id : 'null'}
      </Text>
      <Text>
        Email: {email}
      </Text>
      {/* <Text>
        Password: {password}
      </Text> */}
      <Text>
        Name: {name}  
      </Text>
    </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({})