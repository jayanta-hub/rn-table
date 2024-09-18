import { StyleSheet } from 'react-native';
import { scale } from '../utility/screenUitility';

export const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
    },
    titleCell: {
      backgroundColor: 'lightgray',
      width: '35%',
      borderWidth: scale(1),
      borderColor: 'black',
      flexDirection: 'row',
    },
    valueContainer: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
    },
    headerRow: {
      flexDirection: 'row',
      paddingLeft: '25%',
      justifyContent: 'space-around',
      backgroundColor: 'lightgray',
      borderWidth: scale(1),
      borderColor: 'black',
    },
    headerCell: {
      padding: scale(10),
      fontSize: scale(14),
      fontFamily: 'Roboto',
    },
    cell: {
      padding: scale(10),
      fontSize: scale(14),
      fontFamily: 'Roboto',
    },
    inputCell: {
      flex: 1,
      fontSize: scale(14),
      fontFamily: 'Roboto',
      borderWidth: scale(1),
      borderColor: 'black',
    },
  });
