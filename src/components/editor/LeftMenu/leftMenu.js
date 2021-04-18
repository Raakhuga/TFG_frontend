import React, { useContext, useEffect, useRef } from 'react'
import { Animated, Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import uuid from 'react-native-uuid'
import { Data } from '../../../context/data';
import styles from './leftMenu.style';

const LeftMenu = (props) => {

    
    const {
        screenFrame,
        
        elems, refElems,
        setEditIndex,
        mode, setMode,
        availableComponents,
        
        addElem, moveElem, delElem,
        saveDashboard
    } = useContext(Data)
    
    const pos = useRef(new Animated.Value(-screenFrame.width * 0.20)).current
    

    useEffect(() => {
        Animated.timing(
            pos,
            {
                toValue: (mode == 'menu') ? 0 : - screenFrame.width * 0.20,
                duration: 500,
                useNativeDriver: true
            }
            ).start();
    }, [mode, screenFrame])
    
    const componentList = new Array();
    
    
    const selectElement = (element) => {
        let index = 0
        addElem(element);
        setEditIndex(index);
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
            <Text style={[styles.title, {
                height: screenFrame.height*0.075,
                fontSize: screenFrame.height*0.05,
            }]}>Components</Text>
            <ScrollView style={styles.list} contentContainerStyle={styles.listContainer}>
                {
                    componentList
                }
            </ScrollView>
            
        </Animated.View>
    );
}

export default LeftMenu;