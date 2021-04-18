import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, FlatList, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import uuid from 'react-native-uuid'
import { Data } from '../../../context/data';
import styles from './rightMenu.style';
import { AntDesign } from '@expo/vector-icons';
import { Car } from '../../../context/car';
import { Client } from '../../../context/client';


const RightMenu = (props) => {

    
    const {
        screenFrame,
        
        dashboards, setDashboards, refDashboards,
        editIndex, setEditIndex,
        mode, setMode,
        elems, setElems,
        
        addElem, moveElem, delElem,
        
        configJsonToElems,
        saveDashboard
    } = useContext(Data)
    
    const pos = useRef(new Animated.Value(screenFrame.width)).current

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

    const [newDashboard, setNewDashboard] = useState(false);

    const newDashboardName = useRef('');

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
            configuration: {
                maxRpm: maxRpm,
                maxSpeed: maxSpeed,
                dashboards: refDashboards.current
            }
        };
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
                            <AntDesign name={'caretup'} size={screenFrame.width*0.02} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={ () => deleteComponent(i) }>
                            <AntDesign name={'minuscircle'} size={screenFrame.width*0.02} />
                        </TouchableOpacity> 
                        <TouchableOpacity style={styles.button} onPress={ () => pressDown(i, i+1) }>
                            <AntDesign name={'caretdown'} size={screenFrame.width*0.02} />
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

    const newDasbhoardPress = () => {
        setNewDashboard(true);
    }

    const closePopup = () => {
        newDashboardName.current = '';
        setNewDashboard(false);
    }

    const createDashboard = () => {
        let aux = refDashboards.current;
        aux['dashboards'][newDashboardName.current] = [];
        aux['default'] = newDashboardName.current;
        setDashboards({...aux});
        configJsonToElems(JSON.stringify(aux['dashboards'][newDashboardName.current]));
        newDashboardName.current = '';
        setNewDashboard(false);
    }

    const deleteDashboard = (name) => {
        let aux = refDashboards.current;
        if (aux['dashboards'].hasOwnProperty(name)) delete aux['dashboards'][name];
        if (aux['default'] == name) {
            let keys = Object.keys(aux['dashboards'])
            aux['default'] = keys.length > 0 ? keys[0] : ''
            if (aux['default'] != '') configJsonToElems(JSON.stringify(aux['dashboards'][aux['default']]));
            else {
                aux['default'] = 'default'
                aux['dashboards']['default'] = []
                configJsonToElems(JSON.stringify(aux['dashboards']['default']));
            }
        }
        setDashboards({...aux});
    }

    const content = (configMode) 
        ?
            <View style={styles.configurationMenu}>
                <Text style={[styles.configItemTxt,{
                    fontSize: screenFrame.height*0.02
                }]}>Max Vel</Text>
                <TextInput style={[styles.configInputTxt, {
                    height: screenFrame.height*0.03,
                    fontSize: screenFrame.height*0.02,
                }]} placeholder={String(maxSpeed)} onChangeText={(text) => setMaxSpeed(parseInt(text))} keyboardType={'numeric'}/>
                <Text style={[styles.configItemTxt,{
                    fontSize: screenFrame.height*0.02
                }]}>Max RPM</Text>
                <TextInput style={[styles.configInputTxt, {
                    height: screenFrame.height*0.03,
                    fontSize: screenFrame.height*0.02,
                }]} placeholder={String(maxRpm)} onChangeText={(text) => setMaxRpm(parseInt(text))} keyboardType={'numeric'}/>
                <View style={[styles.configItemTxt,{
                    fontSize: screenFrame.height*0.02
                }]}>
                    <Text style={[styles.dashboardTitle, {
                        fontSize: screenFrame.height*0.02
                    }]}>Dashboards</Text>
                    <TouchableOpacity style={styles.plusButton} onPress={() => newDasbhoardPress()}>
                        <AntDesign style={styles.plusButton} name={'plus'} size={screenFrame.width*0.02} />
                    </TouchableOpacity>
                </View>
                <View style={styles.dashboardContainer}>
                    <FlatList
                        data={Object.keys(dashboards['dashboards'])}
                        renderItem={({item}) => (
                            <TouchableOpacity style={[styles.dashboardRow, {
                                backgroundColor: (dashboards['default'] === item) ? '#ddd' : 'transparent'
                            }]} onPress={() => setDefault(item)}>
                                <Text style={[styles.dashboardTxt, {
                                    color: (dashboards['default'] === item) ? '#aaa' : '#eee',
                                    fontSize: screenFrame.height*0.02,
                                }]}>{item}</Text>
                                <TouchableOpacity style={styles.dashboardButton} onPress={() => deleteDashboard(item)}>
                                    <AntDesign style={{color: (dashboards['default'] === item) ? '#aaa' : '#eee'}} name={'close'} size={screenFrame.width*0.02} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                {newDashboard ? 
                    <View style={styles.dimmBackground}>
                        <View style={styles.newDashboardView}>
                            <Text style={[styles.configItemTxt, {
                                fontSize: screenFrame.height*0.02,
                                paddingLeft: 10
                            }]}>New dashboard</Text>
                            <TextInput style={[styles.configInputTxt, {
                                height: screenFrame.height*0.03,
                                fontSize: screenFrame.height*0.02,
                                margin: 10
                            }]} placeholder={'enter name'} onChangeText={(text) => {
                                newDashboardName.current = text;
                            } } />
                            <View style={styles.popupButtons}>
                                <TouchableOpacity onPress={() => createDashboard()}>
                                    <AntDesign name={'check'} size={screenFrame.width*0.02} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => closePopup()}>
                                    <AntDesign name={'close'} size={screenFrame.width*0.02} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                :
                    null}
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
                toValue: (mode == 'menu') ? screenFrame.width*0.8 : screenFrame.width,
                duration: 500,
                useNativeDriver: true
            }
            ).start();
    }, [mode, screenFrame])
    
    useEffect(() => {
        setComponentList(updateComponentList(elems));
    }, [elems])

    return(
        <Animated.View style={[
            styles.menu,
            { transform: [{ translateX: pos } ] }
        ]}>
            <Text style={[styles.title, {
                height: screenFrame.height*0.075,
                fontSize: screenFrame.height*0.05,
            }]}>{configMode ? 'Configuration' : 'Layers' }</Text>
            {content}
            <View style={[styles.bottomMenu, {
                height: screenFrame.height*0.075,
            }]}>
                <TouchableOpacity onPress={() => openConfig()}>
                    <AntDesign name={configMode ? 'ellipsis1' : 'setting' } size={screenFrame.width*0.02} />
                </TouchableOpacity>
                {configMode ?
                    <TouchableOpacity onPress={() => saveConfigBtn()}>
                        <AntDesign name={'save'} size={screenFrame.width*0.02} />
                    </TouchableOpacity> : null
                }
            </View>


        </Animated.View>
    );
}

export default RightMenu