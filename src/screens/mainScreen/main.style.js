import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    half_right: {
        flex: 1,
        flexDirection: "row",
        // flexDirection: "row", // horizontal
        //justifyContent: "center", // main
        alignItems: "center", // secondary
        // flexWrap: "wrap", 
        width: '100%',
        backgroundColor: '#0000FF'
    },
    container: {
        flex: 1,
        backgroundColor: '#eee',
      },
      grid: {
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap'
      },
      layer: {
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          width: '100%',
          height: '100%',
          position: 'absolute'
      },
      red: {
          backgroundColor: '#F00',
          width: '100%',
          height: '100%',
      },
      green: {
          backgroundColor: '#0F0',
          width: '100%',
          height: '100%',
      },
      blue: {
          backgroundColor: '#00F',
          width: '100%',
          height: '100%',
      },
});
