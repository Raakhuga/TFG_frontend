import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#eee',
    },
    icon: {
        flex: 1,
    },
    text: {
        flex: 7,
        justifyContent: 'center',
        alignContent: 'center',
        color: '#333333FF',
        backgroundColor: '#00000000',
        textAlign: "center",
        fontWeight: 'bold'
    }
});
