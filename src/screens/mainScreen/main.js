import React from 'react';
import { View } from 'react-native';
import DistanceViewer from '../../components/distanceViewer/distanceViewer.js';
import RpmViewer from '../../components/rpmViewer/rpmViewer.js';
import SpeedViewer from '../../components/speedViewer/speedViewer.js';
import Tile from '../../components/tile/tile'
import styles from './main.style.js'

const MainScreen = (props) => {

    const rows = 8;
    const cols = 14;

    const t_width = 1/cols;
    const t_height = 1/rows;

    const printLayer = (elem) => {
        let x_size = elem.x_f - elem.x_o + 1;
        let y_size = elem.y_f - elem.y_o + 1;
        let width = t_width * x_size;
        let height = t_height * y_size;
        let s_width = t_width * elem.x_o;
        let s_height = t_height * elem.y_o;

        var array = new Array();
        array.push(
            <Tile marginLeft={s_width*100} marginTop={s_height*100} width={width * 100} height={height * 100} key={2}>
                {elem.elem}
            </Tile>
        )

        return(
            <View style={[styles.layer, {zIndex: elem.z_pos}]}>  
                {array}
            </View>
        );
    }

    const printAllElems = (elems) => {
        var array = new Array();
        elems.forEach(elem => {
            array.push(printLayer(elem));
        })
        return array;
    }

    var elems = new Array();

    elems.push({
        elem: <SpeedViewer/>,
        x_o: 2,
        x_f: 11,
        y_o: 0,
        y_f: 7,
        z_pos: 2
    })
    elems.push({
        elem: <RpmViewer/>,
        x_o: 9,
        x_f: 11,
        y_o: 1,
        y_f: 2,
        z_pos: 3
    })
    elems.push({
        elem: <View style={styles.green}/>,
        x_o: 9,
        x_f: 11,
        y_o: 3,
        y_f: 4,
        z_pos: 4
    })

    var grid = new Array();
    for (var i = 0; i < rows; i++)
        for (var j = 0; j < cols; j++) {
            let key = (i*cols)+j
            grid.push(
                <Tile key={key} width={t_width * 100} height={t_height * 100}/>
            );
        }

    /*
    return (
        <View style={styles.half_right}>
            <SpeedViewer/>
            <RpmViewer/>
        </View>
    );
    */
    return (
        <View style={styles.container}> 
            <View style={styles.grid}> 
                {grid}
            </View>
            {printAllElems(elems)}
        </View>
    );
}

export default MainScreen;