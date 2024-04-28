import AsyncStorage from '@react-native-async-storage/async-storage';

// For storing data
const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };


  // For getting data
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  export default {storeData , getData}