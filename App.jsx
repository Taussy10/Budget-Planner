import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes/Routes';
import { useFonts } from 'expo-font';

export default function App() {
 // Fonts
 const [fontsLoaded, fontError] = useFonts({
  'Outfit-Bold':require('./assets/Fonts/Outfit-Bold.ttf'),
  'Outfit-Medium':require('./assets/Fonts/Outfit-Medium.ttf'),
  'Outfit-Regular':require('./assets/Fonts/Outfit-Regular.ttf'),
})
//  const [fontsLoaded, fontError] = useFonts({
//   'Outfit-Bold':require('../../assets/Fonts/Outfit-Bold.ttf'),
//   'Outfit-Medium':require('../../assets/Fonts/Outfit-Medium.ttf'),
//   'Outfit-Regular':require('../../assets/Fonts/Outfit-Regular.ttf'),
// })
  return (
   <NavigationContainer>
    <Routes />
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//  // ,{
      //   "fonts": ["./assets/Fonts/Outfit-Bold.ttf","./assets/Fonts/Outfit-Medium.ttf","./assets/Fonts/Outfit-Regular.ttf" ]
      // }