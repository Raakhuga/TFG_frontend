import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    menu: {
        width: '20%',
        height: '100%',
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        zIndex: 1,
        position: 'absolute',
        
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    element: {
        width: '100%',
        height: '30%',
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden'
    },
    list: {
        width: '80%',
        height: '10%',
    },
    listContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
        flex: 1,
        width: '100%',
        height: '10%',
    },
    title: {
        backgroundColor: '#aaa',
        width: '100%',
        height: Dimensions.get('window').height*0.075,
        fontSize: Dimensions.get('window').height*0.05,
        fontWeight: 'bold',
        color: '#ddd',
        textAlignVertical: 'center',
        textAlign: 'center'
    }   

  });

export default styles;