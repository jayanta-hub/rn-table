import React, {useState} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {scale} from '../utility/screenUitility';

const TableComponent = ({data}) => {
  let numOfColToDisplay = 4;
  const [renderData, setRenderData] = useState(data?.rows);
  const [startColumnCount, setStartColumnCount] = useState(0);
  const [endColumnCount, setEndColumnCount] = useState(numOfColToDisplay);
  const onChangeText = (newText, cId, pId) => {
    const newData = renderData.map(row => {
      if (row.id === pId) {
        const updatedValues = row.values.map(value => {
          if (value.id === cId) {
            return {...value, value: newText};
          }
          return value;
        });
        return {...row, values: updatedValues};
      }
      return row;
    });
    setRenderData(newData);
  };

  const headerComp = () => (
    <View style={styles.headerRow}>
      <TouchableOpacity
        onPress={() => {
          setStartColumnCount(
            Math.max(0, startColumnCount - numOfColToDisplay),
          );
          setEndColumnCount(
            Math.max(numOfColToDisplay, endColumnCount - numOfColToDisplay),
          );
        }}
        style={styles.headerCell}>
        <Text>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setStartColumnCount(
            Math.min(
              renderData[0].values.length - numOfColToDisplay,
              startColumnCount + numOfColToDisplay,
            ),
          );
          setEndColumnCount(
            Math.min(
              renderData[0].values.length,
              endColumnCount + numOfColToDisplay,
            ),
          );
        }}
        style={styles.headerCell}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
  const tableCell = item => {
    console.log('item', item);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          borderWidth: scale(1),
          borderColor: 'black',
        }}
        key={item?.id}>
        <Text style={styles.cell}>{item?.title}</Text>
      </View>
    );
  };
  const renderRow = ({item}) => {
    return (
      <View style={styles.row}>
        <View style={styles.titleCell} key={item?.id}>
          {item.row.map(colData => colData.colunm.map(item => tableCell(item)))}
        </View>
        <View
          style={{
            ...styles.valueContainer,
            backgroundColor: item?.isDisabled ? 'lightgray' : 'white',
          }}>
          {item.row[0].colunm[0].values
            .slice(startColumnCount, endColumnCount)
            .map(value => (
              <TextInput
                key={value?.id}
                editable={value?.isEditable}
                style={{
                  ...styles.inputCell,
                  backgroundColor: value?.isEditable ? 'white' : 'lightgray',
                }}
                value={value?.value}
                textAlign="center"
                keyboardType={value?.elementType ?? 'default'}
                onChangeText={e => onChangeText(e, value?.id, item?.id)}
              />
            ))}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={renderData}
      renderItem={renderRow}
      keyExtractor={item => item.id}
      ListHeaderComponent={headerComp}
      stickyHeaderIndices={[0]}
    />
  );
};

export default TableComponent;
