import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import Editor from '../../components/editor/editor.js';
import Tile from '../../components/tile/tile'
import { Data } from '../../context/data.js';
import styles from './main.style.js'
import uuid from 'react-native-uuid'
import LeftMenu from '../../components/editor/LeftMenu/leftMenu.js';
import RightMenu from '../../components/editor/RightMenu/rightMenu.js';

const MainScreen = (props) => {

    const {
        screenFrame, setScreenFrame,

        editRect, setEditRect,
        elems, setElems,
        getConfigJson
    } = useContext(Data)

    const rows = 8;
    const cols = 14;

    const t_width = 1/cols;
    const t_height = 1/rows;

    const getSizes = (event) => {
        setScreenFrame({
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width
        });
    }

    const printLayer = (elem, z_pos) => {
        let x_size = elem.x_f - elem.x_o + 1;
        let y_size = elem.y_f - elem.y_o + 1;
        let width = t_width * x_size;
        let height = t_height * y_size;
        let s_width = t_width * elem.x_o;
        let s_height = t_height * elem.y_o;

        return(
            <View key={uuid.v4()} style={[styles.layer, {zIndex: z_pos}]}>  
                <Tile marginLeft={s_width*100} marginTop={s_height*screenFrame.height} width={width * 100} height={height * 100} key={uuid.v4()}>
                    {elem.elem}
                </Tile>
            </View>
        );
    }

    const printAllElems = (elems) => {
        var array = new Array();
        elems.forEach((elem, i) => {
            array.push(printLayer(elem, elems.length-i));
        })
        return array;
    }

    const [elemsToPrint, setElemsToPrint] = useState(new Array());// = printAllElems(elems)

    const updateViews = () => {
        if (screenFrame.height > 0 && screenFrame.width > 0) {
            setElemsToPrint(printAllElems(elems))
        }
    }

    useEffect(() => {
        updateViews()
    }, [screenFrame])

    useEffect(() => {
        updateViews()
    }, [elems])

    var grid = new Array();
    for (var i = 0; i < rows; i++)
        for (var j = 0; j < cols; j++) {
            let key = (i*cols)+j
            grid.push(
                <Tile key={uuid.v4()} width={t_width * 100} height={t_height * 100}/>
            );
        }

    return (
        <View onLayout={getSizes} style={styles.container}>
            <LeftMenu />
            <Editor rows={rows} cols={cols}>
                <View style={styles.grid}> 
                    {grid}
                </View>
                {elemsToPrint}
            </Editor>
            <RightMenu />
        </View>
    );
}

export default MainScreen;