import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, FlatList, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import uuid from 'react-native-uuid'
import { Data } from '../../../context/data';
import styles from './rightMenu.style';
import { AntDesign } from '@expo/vector-icons';
import { Car } from '../../../context/car';
import { Client } from '../../../context/client';


const RightMenu = (props) => {

    const pos = useRef(new Animated.Value(Dimensions.get('window').width)).current
 
    const {
        dashboards, setDashboards, refDashboards,
        editIndex, setEditIndex,
        mode, setMode,
        elems, setElems,

        addElem, moveElem, delElem,

        configJsonToElems,
        saveDashboard
    } = useContext(Data)

    const {
        maxSpeed, setMaxSpeed,
        maxRpm, setMaxRpm,

        speed, setSpeed,
        rpm, setRpm,
        distance, setDistance
    } = useContext(Car)

    const { saveConfig } = useContext(Client)

    const [componentList, setComponentList] = useState(new Array());

    const [configMode, setConfigMode] = useState(false);

    const pressComponent = (index) => {
        setEditIndex(index);
        setMode('edit');
    } 

    const pressUp = (from, to) => {
        if (to >= 0)
            moveElem(from, to);
    }

    const pressDown = (from, to) => {
        if (to < elems.length)
            moveElem(from, to);
    }

    const deleteComponent = (index) => {
        delElem(index);
        saveDashboard();
    }

    const openConfig = () => {
        setConfigMode(!configMode);
    }

    const saveConfigBtn = () => {
        let config = {
            maxRpm: maxRpm,
            maxSpeed: maxSpeed,
            dashboards: refDashboards.current
        };
        console.log(config)
        saveConfig(JSON.stringify(config));
    }

    const updateComponentList = (elems) => {
        var auxArray = new Array();
        elems.forEach((element, i) => {
            auxArray.push(
                <View key={uuid.v4()} style={styles.element}>
                    <TouchableOpacity style={styles.component} onPress={ () => pressComponent(i) }>
                        {element.elem}
                    </TouchableOpacity>
                    <View style={styles.buttonsView}>
                        <TouchableOpacity style={styles.button} onPress={ () => pressUp(i, i-1) }>
                            <AntDesign name={'caretup'} size={Dimensions.get('window').width*0.02} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={ () => deleteComponent(i) }>
                            <AntDesign name={'minuscircle'} size={Dimensions.get('window').width*0.02} />
                        </TouchableOpacity> 
                        <TouchableOpacity style={styles.button} onPress={ () => pressDown(i, i+1) }>
                            <AntDesign name={'caretdown'} size={Dimensions.get('window').width*0.02} />
                        </TouchableOpacity>  
                    </View>
                </View>
            )
        });
        return auxArray;
    }

    const setDefault = (string) => {
        let aux = refDashboards.current;
        aux['default'] = string;
        setDashboards({...aux});
        configJsonToElems(JSON.stringify(aux['dashboards'][string]));
    }

    const content = (configMode) 
        ?
            <View style={styles.configurationMenu}>
                <Text style={styles.configItemTxt}>Max Vel</Text>
                <TextInput style={styles.configInputTxt} placeholder={String(maxSpeed)} onChangeText={(text) => setMaxSpeed(parseInt(text))} keyboardType={'numeric'}/>
                <Text style={styles.configItemTxt}>Max RPM</Text>
                <TextInput style={styles.configInputTxt} placeholder={String(maxRpm)} onChangeText={(text) => setMaxRpm(parseInt(text))} keyboardType={'numeric'}/>
                <Text style={styles.configItemTxt}>Dashboards</Text>
                <View style={styles.dashboardContainer}>
                    <FlatList
                        data={Object.keys(dashboards['dashboards'])}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => setDefault(item)}>
                                <Text style={[styles.dashboardTxt, {
                                    backgroundColor: (dashboards['default'] === item) ? '#ddd' : 'transparent',
                                    color: (dashboards['default'] === item) ? '#aaa' : '#eee'
                                }]}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        :
            <ScrollView style={styles.list} contentContainerStyle={styles.listContainer}>
            {
                componentList
            }
            </ScrollView>
           
    useEffect(() => {
        Animated.timing(
            pos,
            {
                toValue: (mode == 'menu') ? Dimensions.get('window').width*0.8 : Dimensions.get('window').width,
                duration: 500,
                useNativeDriver: true
            }
            ).start();
    }, [mode])
    
    useEffect(() => {
        setComponentList(updateComponentList(elems));
    }, [elems])

    return(
        <Animated.View style={[
            styles.menu,
            { transform: [{ translateX: pos } ] }
        ]}>
            <Text style={styles.title}>{configMode ? 'Configuration' : 'Layers' }</Text>
            {content}
            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => openConfig()}>
                    <AntDesign name={'setting'} size={Dimensions.get('window').width*0.02} />
                </TouchableOpacity>
                {configMode ?
                    <TouchableOpacity style={styles.bottomButton} onPress={() => saveConfigBtn()}>
                        <AntDesign name={'save'} size={Dimensions.get('window').width*0.02} />
                    </TouchableOpacity> : null
                }
            </View>


        </Animated.View>
    );
}

export default RightMenu