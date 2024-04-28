// import React from 'react';
// import { View, FlatList, Button } from 'react-native';

// const Test = ({ numbers }) => {

//   const renderItem = ({ item }) => (
//     <Button
//       title={`Button ${item}`}
//       onPress={() => console.log(`Button ${item} clicked`)}
//     />
//   );

//   return (
//     <FlatList
//       data={numbers}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.toString()}
//     />
//   );
// }

// // Usage
// const numbers = [1, 2, 3, 4, 5];
// const App = () => {
//   return (
//     <View>
//       <NumberButtonList numbers={numbers} />
//     </View>
//   );
// };

// export default Test;