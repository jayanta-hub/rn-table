/* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   SafeAreaView,
//   TextInput,
// } from 'react-native';

// // const { width } = Dimensions.get('window');

// const StickyFlatListTable = ({
//   data = [
//     {
//       id: 1,
//       name: 'John',
//       age: 28,
//       city: 'New York',
//     },
//     {id: 2, name: 'Jane', age: 22, city: 'San Francisco'},
//     {id: 3, name: 'Peter', age: 32, city: 'Chicago'},
//     {id: 4, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 5, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 6, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 7, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 8, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 9, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 10, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 11, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 12, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 13, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 14, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 15, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 16, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 17, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 18, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 19, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 20, name: 'Alice', age: 25, city: 'Los Angeles'},
//     {id: 21, name: 'Alice', age: 25, city: 'Los Angeles'},
//     // Add more rows as needed
//   ],
// }) => {
//   if (!data || data.length === 0) {
//     return <Text>No Data Available</Text>;
//   }

//   // Extract column headers dynamically from the keys of the first object
//   const headers = Object.keys(data[0]);
//   console.log(headers);

//   // Render Header (Sticky)
//   const renderHeader = () => {
//     return (
//       <>
//         <View
//           style={{
//             ...styles.row,
//             // height: 200,
//             // backgroundColor: 'red',
//           }}>
//           {headers.map((header, index) => (
//             <Text key={index} style={styles.headerCell}>
//               {header.toUpperCase()}
//             </Text>
//           ))}
//         </View>
//       </>
//     );
//   };

//   const onChangeNumber = () => {};

//   // Render each row
//   const renderRow = ({item, index}) => {
//     console.log('item', item?.id);
//     return (
//       <View style={styles.row} key={index}>
//         {headers.map((header, colIndex) => {
//           return (
//             <View style={{borderWidth: 1, borderColor: '#ccc'}}>
//               <TextInput
//                 key={colIndex}
//                 style={styles.cell}
//                 onChangeText={onChangeNumber}
//                 value={item[header]}
//                 placeholder="useless placeholder"
//               />
//             </View>
//           );
//         })}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         {/* Sticky Header */}
//         {/*renderHeader()*/}
//         {/* Scrollable Table Body */}
//         <FlatList
//           data={data}
//           renderItem={renderRow}
//           keyExtractor={item => item.id}
//           ListHeaderComponent={renderHeader} // Header rendered separately
//           style={styles.flatList}
//           stickyHeaderIndices={[0]}
//           // horizontal
//           // contentContainerStyle={{ paddingTop: 60 }} // Space for sticky header
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   flatList: {
//     flexGrow: 1,
//   },
//   row: {
//     // flex: 1,
//     // padding: 10,
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   // header: {
//   //   position: 'absolute', // Make header sticky
//   //   top: 0,
//   //   left: 0,
//   //   right: 0,
//   //   backgroundColor: '#f4f4f4', // Background color to cover content when scrolling
//   //   zIndex: 1, // Ensure it's on top of the scrollable content
//   //   paddingVertical: 10,
//   // },
//   headerCell: {
//     flex: 1,
//     fontWeight: 'bold',
//     padding: 10,
//     backgroundColor: '#f4f4f4',
//   },
//   cell: {
//     flex: 1,
//     padding: 10,
//   },
// });

// export default StickyFlatListTable;

import React from 'react';
import {View} from 'react-native';
import TableComponent from './src/component/TableComponent';
export default function App() {
  const tableData = {
    rows: [
      // {
      //   id: 1,
      //   title: 'Gassing Test',
      //   isTitleDisale: true,
      //   values: [
      //     {id: 1, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 2, value: '1', elementType: 'numeric', isEditable: true},
      //     {id: 3, value: '2', elementType: 'numeric', isEditable: true},
      //     {id: 4, value: '3', elementType: 'numeric', isEditable: true},
      //     {id: 5, value: '4', elementType: 'numeric', isEditable: true},
      //     {id: 6, value: '5', elementType: 'numeric', isEditable: true},
      //     {id: 7, value: '6', elementType: 'numeric', isEditable: true},
      //     {id: 8, value: '7', elementType: 'numeric', isEditable: true},
      //     {id: 9, value: '8', elementType: 'numeric', isEditable: true},
      //   ],
      // },
      // {
      //   id: 2,
      //   title: 'Product',
      //   isTitleDisale: true,
      //   values: [
      //     {id: 1, value: 'TS60GA', elementType: 'default', isEditable: true},
      //     {id: 2, value: '1', elementType: 'numeric', isEditable: true},
      //     {id: 3, value: '2', elementType: 'numeric', isEditable: true},
      //     {id: 4, value: '3', elementType: 'numeric', isEditable: true},
      //     {id: 5, value: '4', elementType: 'numeric', isEditable: true},
      //     {id: 6, value: '5', elementType: 'numeric', isEditable: true},
      //     {id: 7, value: '6', elementType: 'numeric', isEditable: true},
      //     {id: 8, value: '7', elementType: 'numeric', isEditable: true},
      //     {id: 9, value: '8', elementType: 'numeric', isEditable: true},
      //   ],
      // },
      // {
      //   id: 3,
      //   title: 'Target Density (g/cc)',
      //   isTitleDisale: true,
      //   values: [
      //     {id: 1, value: '0', elementType: 'numeric', isEditable: true},
      //     {id: 2, value: '0', elementType: 'numeric', isEditable: true},
      //     {id: 3, value: '0', elementType: 'numeric', isEditable: true},
      //     {id: 4, value: '0', elementType: 'numeric', isEditable: true},
      //     {id: 5, value: '0', elementType: 'numeric', isEditable: true},
      //     {id: 6, value: '0', elementType: 'numeric', isEditable: true},
      //     {id: 7, value: '0', elementType: 'numeric', isEditable: true},
      //     {id: 8, value: '0', elementType: 'numeric', isEditable: true},
      //     {id: 9, value: '0', elementType: 'numeric', isEditable: true},
      //   ],
      // },
      // {
      //   id: 4,
      //   title: 'Cup Type (g)',
      //   isTitleDisale: true,
      //   values: [
      //     {id: 1, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 2, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 3, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 4, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 5, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 6, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 7, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 8, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 9, value: '', elementType: 'numeric', isEditable: true},
      //   ],
      // },
      // {
      //   id: 5,
      //   title: 'Hole Number',
      //   isTitleDisale: true,
      //   values: [
      //     {id: 1, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 2, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 3, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 4, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 5, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 6, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 7, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 8, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 9, value: '', elementType: 'numeric', isEditable: true},
      //   ],
      // },
      {
        id: 6,
        title: 'Dischage Rate (km/min)',
        row: [
          {
            id: 1,
            colunm: [
              {
                id: 1,
                isTitleDisale: true,
                values: [
                  {id: 1, value: '1', elementType: 'numeric', isEditable: true},
                  {id: 2, value: '2', elementType: 'numeric', isEditable: true},
                  {id: 3, value: '3', elementType: 'numeric', isEditable: true},
                  {id: 4, value: '4', elementType: 'numeric', isEditable: true},
                  {id: 5, value: '5', elementType: 'numeric', isEditable: true},
                  {id: 6, value: '6', elementType: 'numeric', isEditable: true},
                  {id: 7, value: '7', elementType: 'numeric', isEditable: true},
                  {id: 8, value: '8', elementType: 'numeric', isEditable: true},
                  {id: 9, value: '9', elementType: 'numeric', isEditable: true},
                ],
              },
            ],
          },
        ],
        isTitleDisale: true,
      },
      // {
      //   id: 7,
      //   title: 'Dischage Rate (km/min)',
      //   row: [
      //     {
      //       id: 1,
      //       colunm: [
      //         {id: 1, title: 'Emulsion %', isTitleDisale: true},
      //         {
      //           id: 2,
      //           title: 'ANFO %',
      //           isTitleDisale: true,
      //         },
      //       ],
      //     },
      //   ],
      //   isTitleDisale: true,
      //   values: [
      //     {id: 1, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 2, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 3, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 4, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 5, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 6, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 7, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 8, value: '', elementType: 'numeric', isEditable: true},
      //     {id: 9, value: '', elementType: 'numeric', isEditable: true},
      //   ],
      // },
    ],
  };
  return (
    <View style={{flex: 1, padding: 5}}>
      <TableComponent data={tableData} />
    </View>
  );
}
