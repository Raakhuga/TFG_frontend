import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Car } from '../../context/car.js';
import styles from './rpmViewer.style.js'



const RpmViewer = (props) => {
    
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

    const paintLines = (rpm) => {
        let distance = maxRpm / numberOfLines;
        setLightedLines(rpm / distance);
    }

    const constructRpmViewer = () => {
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
                    }, numberOfLines - i < lightedLines ? styles.lineHighlighted : styles.lineDimmed
                ]}/>
                lines.push(line);
            }
        }
    }

    const resizeRpmViewer = () => {
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

    const {
        maxRpm,
        rpm
    } = useContext(Car)

    useEffect(() => {
        paintLines(rpm);
    })
    
    const getSizes = (event) => {
        frame.height = event.nativeEvent.layout.height
        frame.width = event.nativeEvent.layout.width
        resizeRpmViewer();
    }
    
    constructRpmViewer();

    return (
        <View onLayout={getSizes} style={styles.container}>
            {lines}
            <Text style={[styles.text, { fontSize: textSize }]}> {"RPM\n" + String(rpm) } </Text>
        </View>
    );
}

export default RpmViewer;