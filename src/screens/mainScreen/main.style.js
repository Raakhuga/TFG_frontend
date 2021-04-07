import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        overflow: 'hidden'
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
