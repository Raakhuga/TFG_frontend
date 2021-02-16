import React from 'react';
import { Text, View } from 'react-native';
import styles from './speedViewer.style.js'

var lines = [];
var content;

const constructSpedometer = () => {
    const numberOfLines = 24;
    const startingDeg = 0;
    const finalDeg = 360;
    const step = (finalDeg - startingDeg)/numberOfLines
    const cuadrantSteps = numberOfLines / 4


    for (var i = 1; i < numberOfLines-1; i++) {
        if (i < cuadrantSteps) {
            let line = <View style={[styles.line, { 
                transform: [{
                    rotate: String(startingDeg + (i * step) ) + "deg",
                    translateX: String( () ) + "deg",
                    translateY: String() + "deg"
                }]
             }]}/>
        } else if (i < cuadrantSteps * 2) {
            let line = <View style={[styles.line, { 
                transform: [{
                    rotate: String(startingDeg + (i * step) ) + "deg",
                    translateX: String() + "deg",
                    translateY: String() + "deg"
                }]
             }]}/>
        } else if (i < cuadrantSteps * 3) {
            let line = <View style={[styles.line, { 
                transform: [{
                    rotate: String(startingDeg + (i * step) ) + "deg",
                    translateX: String() + "deg",
                    translateY: String() + "deg"
                }]
             }]}/>
        } else {
            let line = <View style={[styles.line, { 
                transform: [{
                    rotate: String(startingDeg + (i * step) ) + "deg",
                    translateX: String() + "deg",
                    translateY: String() + "deg"
                }]
             }]}/>
        }

        lines.push(line);
    }
}

const SpeedViewer = (props) => {
    constructSpedometer();
    return (
        <View style={styles.container}>
            {lines}
        </View>
    );
}

export default SpeedViewer;