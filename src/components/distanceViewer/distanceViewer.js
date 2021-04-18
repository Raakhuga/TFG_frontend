import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './distanceViewer.style.js';
import { Car } from '../../context/car.js';
import { AntDesign } from '@expo/vector-icons';


//const 


const DistanceViewer = (props) => {

    const {
        distance,
        tooClose
    } = useContext(Car)

    const [frame, setFrame] = useState({
        height: 0,
        width: 0
    })

    const minSize = () => {
        return frame.height <= frame.width ? frame.height : frame.width;
    }

    const getSizes = (event) => {
        setFrame({
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width
        })
    }

    return (
        <View onLayout={getSizes} style={styles.container}>
            <Text style={[styles.text, {fontSize: minSize()*0.1}]}>Distance: {distance} m</Text>
            {
                tooClose ?
                <View style={styles.icon}>
                    <AntDesign name={'exclamationcircle'} size={minSize()*0.1}/>
                </View> : null
            }
        </View>
    );
}

export default DistanceViewer;