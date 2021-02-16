import React from 'react';
import { View } from 'react-native';
import DistanceViewer from '../../components/distanceViewer/distanceViewer.js';
import SpeedViewer from '../../components/speedViewer/speedViewer.js';
import styles from './main.style.js'

const MainScreen = (props) => {
    return (
        <View style={styles.half_right}>
            <SpeedViewer/>
        </View>
    );
}

export default MainScreen;