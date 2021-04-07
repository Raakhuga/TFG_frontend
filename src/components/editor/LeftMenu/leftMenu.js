import React, { useContext, useEffect, useRef } from 'react'
import { Animated, Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import uuid from 'react-native-uuid'
import { Data } from '../../../context/data';
import styles from './leftMenu.style';

const LeftMenu = (props) => {

    const pos = useRef(new Animated.Value(-Dimensions.get('window').width * 0.20)).current

    const {
        elems, refElems,
        setEditIndex,
        mode, setMode,
        availableComponents,
        
        addElem, moveElem, delElem,
        saveDashboard
    } = useContext(Data)

    useEffect(() => {
        Animated.timing(
            pos,
            {
                toValue: (mode == 'menu') ? 0 : - Dimensions.get('window').width * 0.20,
                duration: 500,
                useNativeDriver: true
            }
            ).start();
    }, [mode])
    
    const componentList = new Array();
    
    
    const selectElement = (element) => {
        let index = 0
        addElem(element);
        console.log(index);
        setEditIndex(index);
        saveDashboard();
        setMode('edit');
    }
    
    availableComponents.forEach((element) => {
        componentList.push(
            <TouchableOpacity key={uuid.v4()} style={styles.element} onPress={() => selectElement(element)}>
                {element.elem}
            </TouchableOpacity>,
        )
    })

    return(
        <Animated.View style={[
            styles.menu,
            { transform: [{ translateX: pos } ] }
        ]}>
            <Text style={styles.title}>Components</Text>
            <ScrollView style={styles.list} contentContainerStyle={styles.listContainer}>
                {
                    componentList
                }
            </ScrollView>
            
        </Animated.View>
    );
}

export default LeftMenu;