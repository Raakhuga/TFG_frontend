import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import MAX_SPEED from '../../observables/max_speed.js';
import SPEED from '../../observables/speed.js';
import styles from './speedViewer.style.js'



const SpeedViewer = (props) => {
    
    const numberOfLines = 49;
    const startingDeg = 0;
    const finalDeg = 360;
    const step = (finalDeg - startingDeg)/numberOfLines
    
    var lines = [];
    
    var frame = {
        height: 0,
        width: 0
    }
    
    const minSize = () => {
        return frame.height <= frame.width ? frame.height : frame.width;
    }

    const updateMaxSpeed = (max_vel) => {
        setMaxVel(max_vel);
        paintLines(actualVel);
    }

    const paintLines = (vel) => {
        let distance = maxVel / numberOfLines;
        setLightedLines(vel / distance);
        setActualVel(vel)
    }

    const constructSpedometer = () => {
        if (lines.length === 0) {
            for (var i = 1; i < numberOfLines; i++) {
                let alpha = startingDeg + (i * step)
                let line;
                line = <View key={i} style={[styles.line, {
                    transform: [
                        {rotate: String(alpha) + "deg"},
                        {translateY: r}
                    ]}, {
                        height: height,
                        width: width,
                        borderRadius: borderRadius
                    }, i < lightedLines ? styles.lineHighlighted : styles.lineDimmed
                ]}/>
                lines.push(line);
            }
        }
    }

    const resizeSpedometer = () => {
        const size = minSize()
        setHeight( size*0.15 )
        setWidth( size*0.02 )
        setR( size*0.25 )
        setBorderRadius( size )
        setTextSize(size * 0.05)
    }

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [r, setR] = useState(0);
    const [borderRadius, setBorderRadius] = useState(0);
    const [textSize, setTextSize] = useState(0);
    const [lightedLines, setLightedLines] = useState(0);
    const [actualVel, setActualVel] = useState(0);
    const [maxVel, setMaxVel] = useState(0);
    
    const getSizes = (event) => {
        frame.height = event.nativeEvent.layout.height
        frame.width = event.nativeEvent.layout.width
        resizeSpedometer();
    }
    
    constructSpedometer();

    SPEED.registerObserver(paintLines)
    MAX_SPEED.registerObserver(updateMaxSpeed)

    return (
        <View onLayout={getSizes} style={styles.container}>
            {lines}
            <Text style={[styles.text, { fontSize: textSize }]}> {"Velocity\n" + String(actualVel) } </Text>
        </View>
    );
}

export default SpeedViewer;