import React, { useContext } from 'react'
import { View } from 'react-native'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Car } from '../context/car';
import { Data } from '../context/data';


const client = new W3CWebSocket('ws://localhost:4000')

const Client = (props) => {

    const {
        maxSpeed, setMaxSpeed,
        maxRpm, setMaxRpm,

        speed, setSpeed,
        rpm, setRpm,
        distance, setDistance
    } = useContext(Car);

    const {
        wsServer, setWsServer,
    } = useContext(Data)

    client.onopen = () => {
        console.log('WebSocket Client Connected');
    }

    client.onmessage = (message) => {
        var data = message.data
        data = JSON.parse(data)
        if ('car' in data) {
            setMaxSpeed(parseInt(data.car.max_speed));
            setMaxRpm(parseInt(data.car.max_rpm));
        }
        else if ('speed' in data) {
            setSpeed(parseInt(data.speed));
        } else if ('rpm' in data) {
            setRpm(parseInt(data.rpm))
        } else if ('distance' in data) {
            setDistance(parseInt(data.distance))
        }
        console.log(message)
    }

    return(
        <View style={{ flex: 1, height: '100%', width: '100%'}}>
            {props.children}
        </View>
    );
}

export default Client;