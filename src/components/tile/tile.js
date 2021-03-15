import React, { Children } from 'react'
import styles from './tile.style'
import { View } from 'react-native'

const Tile = (props) => {
    return(
        <View style={[styles.tile, {width: String(props.width) + '%', height: String(props.height) + '%', top: String(props.marginTop) + '%', marginLeft: String(props.marginLeft) + '%'}]}>
            <View style={styles.view}>
                {props.children}
            </View>
        </View>
    );
}

export default Tile;