import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Car } from '../../context/car.js';
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


    const paintLines = (speed) => {
        let distance = maxSpeed / numberOfLines;
        setLightedLines(speed / distance);
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
    
    const getSizes = (event) => {
        frame.height = event.nativeEvent.layout.height
        frame.width = event.nativeEvent.layout.width
        resizeSpedometer();
    }
    
    const { 
        maxSpeed, 
        speed 
    } = useContext(Car)

    useEffect(() => {
        paintLines(speed)
    }, [speed])

    constructSpedometer();
    return (
        <View onLayout={getSizes} style={styles.container}>
            {lines}
            <Text style={[styles.text, { fontSize: textSize }]}> {"Velocity\n" + String(speed) } </Text>
        </View>
    );
}

export default SpeedViewer;