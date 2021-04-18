import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'row',
    },
    editMenu: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        height: '5%',
        marginLeft: '80%',
        borderRadius: 10,
        backgroundColor: '#ddd',
        overflow: 'hidden',
        zIndex: 5
    },
    menu: {
        position: 'absolute',
        backgroundColor: '#ddd',
        overflow: 'hidden',
        zIndex: 99
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;