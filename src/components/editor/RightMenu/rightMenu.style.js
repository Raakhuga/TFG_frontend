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
            width: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    element: {
        width: '100%',
        height: '20%',
        flexDirection: 'row', 
        borderRadius: 10, 
        backgroundColor: '#bbb',
        padding: 10,
        margin: 5
    },
    component: {
        flex: 3,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    buttonsView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    button: {
        flex: 1,
        justifyContent: 'center'
    },
    list: {
        flex: 1,
        width: '80%',
        height: '10%',
    },
    listContainer: {
        justifyContent: 'flex-start',
        paddingTop: 10,
        alignItems: 'center',
        flex: 1,
        width: '100%',
        height: '10%',
    },
    title: {
        backgroundColor: '#aaa',
        width: '100%',
        fontWeight: 'bold',
        color: '#ddd',
        textAlignVertical: 'center',
        textAlign: 'center'
    }, 
    bottomMenu: {
        width: '80%',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
        
    },
    configurationMenu: {
        flex: 1,
        width: '80%',
        alignContent: 'flex-end'
    },
    configItemTxt: {
        flex: 2,
        color: '#eee',
        fontWeight: 'bold',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    configInputTxt: {
        flex: 2,
        backgroundColor: '#bbb',
        fontWeight: 'bold',
        borderRadius: 10,
        padding: 5,
        color: '#fff',
    },
    dashboardContainer: {
        flex: 30,
        backgroundColor: '#bbb',
        borderRadius: 10,
        overflow: 'hidden'
    },
    dashboardRow: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 5,
        borderRadius: 10,
    },
    dashboardTxt: {
        flex: 5,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    dasboardButton: {
        flex: 1, 
        color: '#eee'
    },
    plusButton: {
        color: '#eee'
    },
    dashboardTitle: {
        color: '#eee',
        fontWeight: 'bold',
        height: '100%',
        alignSelf: 'center'
    },
    dimmBackground: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    newDashboardView: {
        height: '30%',
        width: '90%',
        backgroundColor: '#ccc',   
        borderRadius: 10
    },
    popupButtons: {
        flex: 1,
        margin: 10,
        marginBottom: 20,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },

  });

export default styles;