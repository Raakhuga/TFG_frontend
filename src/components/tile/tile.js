import React, { useContext } from 'react'
import styles from './tile.style'
import { View } from 'react-native'
import { Data } from '../../context/data'

const Tile = (props) => {
    const { mode } = useContext(Data)

    const viewStyle = {
        width: String(props.width) + '%', 
        height: String(props.height) + '%'
    }

    if (typeof(props.marginTop) !== 'undefined') {
        viewStyle['marginTop'] = props.marginTop;
    }
    if (typeof(props.marginLeft) !== 'undefined') {
        viewStyle['marginLeft'] = String(props.marginLeft) + '%';
    }
    
    return(
        <View style={[styles.tile, viewStyle]}>
            <View style={[styles.view, {borderWidth: (mode === 'edit' || mode === 'editting') ? 1 : 0}]}>
                {props.children}
            </View>
        </View>
    );
}

export default Tile;