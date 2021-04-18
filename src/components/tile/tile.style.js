import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    tile: {
        position: 'relative',
        padding: 3,
    },
    view: {
        width: '100%',
        height: '100%',
        borderColor: '#222',
        borderRadius: 10,
        borderStyle: 'dashed',
        overflow: 'hidden',
        zIndex: 1
    },
  });

export default styles;