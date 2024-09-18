/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  VirtualizedList,
} from 'react-native';

const TableComponent = ({data}) => {
  console.log('data', data);

  const getItemCount = data => data.rows.length;

  const getItem = (data, index) => data.rows[index];
  const renderRow = ({item, index}) => {
    return (
      <View key={index} style={styles.row}>
        <View
          style={{
            // flex: 1,
            backgroundColor: 'gray',
            width: '20%',
            // height: 70,
            // flexWrap: 'wrap',
          }}>
          <Text style={styles.cell}>{item?.title}</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: item.isValueDisable ? 'gray' : 'white',
            width: '100%',
            flexDirection: 'row',
          }}>
          {item.values.map((value, idx) => (
            <TextInput
              editable={!item?.isValueDisable}
              style={{
                ...styles.inputCell,
                backgroundColor: value?.isEditable ? 'white' : 'lightgray',
              }}
              key={idx}
              defaultValue={value}
            />
          ))}
        </View>
      </View>
    );
  };
  return (
    <>
      {/* <View style={styles.row}>
        {data.headers.map(header => (
          <Text style={styles.headerCell} key={header}>
            {header}
          </Text>
        ))}
      </View> */}
      {/* <ScrollView>
        {data.rows.map((row, index) => (
          <View key={index} style={styles.row}>
            <View
              style={{
                // flex: 1,
                backgroundColor: 'gray',
                width: '20%',
                // height: 70,
                // flexWrap: 'wrap',
              }}>
              <Text style={styles.cell}>{row?.title}</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: row.isValueDisable ? 'gray' : 'white',
                width: '100%',
                flexDirection: 'row',
              }}>
              {row.values.map((value, idx) => (
                <TextInput
                  editable={!row?.isValueDisable}
                  style={styles.inputCell}
                  key={idx}
                  defaultValue={value}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView> */}
      <VirtualizedList
        data={data}
        renderItem={renderRow}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </>
  );
};
export default TableComponent;

const styles = StyleSheet.create({
  row: {
    // flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
  },
  cell: {
    padding: 10,
  },
  inputCell: {
    flexShrink: 1,
    height: 'auto',
    borderWidth: 1,
    borderColor: '#ccc',
    // padding: 10,
    minWidth: 100, // Set minimum width for the inputs
  },
});
