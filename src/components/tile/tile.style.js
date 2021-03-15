import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    tile: {
        position: 'relative',
        padding: '5px',
    },
    view: {
        width: '100%',
        height: '100%',
        borderColor: '#222',
        borderWidth: '3px',
        borderRadius: '10px',
        borderStyle: 'dashed',
        overflow: 'hidden',
        zIndex: 1
    },
  });

export default styles;