import React, { cloneElement, useContext, useEffect, useRef, useState } from 'react'
import styles from './editor.style'
import { View, PanResponder, Dimensions, TouchableOpacity } from 'react-native';
import { Data } from '../../context/data';
import { AntDesign } from '@expo/vector-icons';

const Editor = (props) => {


    const rows=props.rows
    const cols=props.cols
    const {
        dashboards, setDashboards, refDashboards,
        editIndex, setEditIndex,
        mode, setMode, refMode,
        elems, setElems, refElems,

        getConfigJson, getConfigElems, configJsonToElems,
        saveDashboard
    } = useContext(Data)

    var aux_frame = {};
    
    const getSizes = (event) => {
        aux_frame = {
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width
        }
    }

    const pointToTile = (point) => {
        let x = point.x/aux_frame.width
        let y = point.y/aux_frame.height
        let tile_x = Math.floor(x * cols)
        let tile_y = Math.floor(y * rows)
        return {x: tile_x, y: tile_y}
    } 

    const elemsCopy = (array) => {
        var retArray = new Array();

        if (typeof(array) == 'undefined') return retArray;

        array.forEach(element => {
            retArray.push({
                elem: cloneElement(element.elem),
                string: element.string,
                x_o: element.x_o,
                x_f: element.x_f,
                y_o: element.y_o,
                y_f: element.y_f,
                z_pos: element.z_pos,
                state: element.state
            })
        });
        return retArray;
    }

    //var refElems.current = elemsCopy(elems)

    const initPos = (evt, gestureState) => {
        if (refMode.current == 'edit') {
            if (typeof(refElems.current) !== 'undefined' && typeof(editIndex) !== 'undefined' ) {
            
                console.log(refElems.current)
                console.log(editIndex.current)
                let point = pointToTile({x: gestureState.x0, y: gestureState.y0})
                
                refElems.current[editIndex.current].x_o = point.x; 
                refElems.current[editIndex.current].x_f = point.x; 
                refElems.current[editIndex.current].y_o = point.y; 
                refElems.current[editIndex.current].y_f = point.y;
                refElems.current[editIndex.current].state = 'start';
            
                setElems([...refElems.current]);
                setMode('editting')
            
            }
        }               
    }

    
    const movPos = (evt, gestureState) => {
        if (refMode.current == 'editting') {
            if (typeof(refElems.current) !== 'undefined' && typeof(editIndex) !== 'undefined' ) {
                
                let point = pointToTile({x: gestureState.moveX, y: gestureState.moveY})
                if (refElems.current[editIndex.current].x_f != point.x || refElems.current[editIndex.current].y_f != point.y) {
    
                    refElems.current[editIndex.current].x_f = point.x;
                    refElems.current[editIndex.current].y_f = point.y;
                    refElems.current[editIndex.current].state = 'editting';
            
                    setElems([...refElems.current]);
                }
    
            }
        }
        
        
    }

    const editComponent = (evt, gestureState) => {
        switch (refMode.current) {
            case 'edit':
                
                break;

            case 'editting':
                if (typeof(refElems.current) !== 'undefined' && typeof(editIndex) !== 'undefined' ) {
                    
                    let point = pointToTile({x: gestureState.moveX, y: gestureState.moveY})
               
                    refElems.current[editIndex.current].x_f = point.x;
                    refElems.current[editIndex.current].y_f = point.y;
                    refElems.current[editIndex.current].state = 'off';
                
                    setElems([...refElems.current]);
        
                }
                setMode('edit')
                break;
            
            case 'view':
                break;
            
            case 'menu':
                setMode('view')
                break;
        
            default:
                break;
        }
    }    

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onStartShouldSetPanResponder: () => true,
        onPanResponderStart: initPos,
        onPanResponderGrant: movPos,
        onPanResponderMove: movPos,
        onPanResponderRelease: editComponent,
      })
    ).current;

    const pressCancel = () => {
        let aux = refDashboards.current;
        let defaultDashboard = aux['default'];
        configJsonToElems(JSON.stringify(aux['dashboards'][defaultDashboard]));
        setMode('view');
    }

    const pressSave = () => {
        saveDashboard();
        setMode('view')
    }

    const pressConfig = () => {
        setMode('menu')
    } 

    const leftButton = (mode === 'edit') 
        ? 
            <View style={[styles.menu, {
                height: Dimensions.get('window').height*0.2,
                width: Dimensions.get('window').height*0.2,
                borderRadius: Dimensions.get('window').height*0.1,
                transform: [
                    { translateX: - Dimensions.get('window').height*0.1 },
                    { translateY: Dimensions.get('window').height*0.9}
                ]
            }]}>
                <TouchableOpacity style={[styles.button, {
                    transform: [
                        { translateX: Dimensions.get('window').height*0.04 },
                        { translateY: -Dimensions.get('window').height*0.04 }
                    ]
                }]} onPress={() => pressCancel()}>
                    <AntDesign name={'closecircle'} size={Dimensions.get('window').width*0.02} />
                </TouchableOpacity>
            </View> 
        :
            null

    const rightButton = (mode === 'edit' || mode === 'view') 
        ? 
            <View style={[styles.menu, {
                height: Dimensions.get('window').height*0.2,
                width: Dimensions.get('window').height*0.2,
                borderRadius: Dimensions.get('window').height*0.1,
                transform: [
                    { translateX: Dimensions.get('window').width - Dimensions.get('window').height*0.1 },
                    { translateY: Dimensions.get('window').height*0.9}
                ]
            }]}>
                <TouchableOpacity style={[styles.button, {
                    transform: [
                        { translateX: -Dimensions.get('window').height*0.04 },
                        { translateY: -Dimensions.get('window').height*0.04 }
                    ]
                }]} onPress={() => (mode === 'edit') ? pressSave() : pressConfig()}>
                    <AntDesign name={(mode === 'edit') ? 'checkcircle' : 'ellipsis1'} size={Dimensions.get('window').width*0.02} />
                </TouchableOpacity>
            </View> 
        :
            null

    return(
        <View onLayout={getSizes} {...panResponder.panHandlers} style={styles.view}>
            <View style={{ width: '100%', height: '100%' } } >
                {props.children}
            </View>
            {leftButton}
            {rightButton}
        </View>
    );

    }


export default Editor;