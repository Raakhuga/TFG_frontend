import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#000000FF',
        borderWidth: 1,
        borderColor: "#0000FFFF"
    },
    line: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    lineContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    lineDimmed: {
        backgroundColor: "#00FF000F"
    }, 
    lineHighlighted: {
        backgroundColor: "#00FF00FF"
    },
    text: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignContent: 'center',
        color: '#00FF00FF',
        backgroundColor: '#00000000',
        textAlign: "center"        
    }
});