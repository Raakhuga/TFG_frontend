import React, { createContext, useContext } from 'react'
import { View } from 'react-native'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Car } from './car';
import { Data } from './data';

export const Client = createContext();

const ws_client = new W3CWebSocket('ws://192.168.100.1:4000')

const ClientProvider = (props) => {

    const {
        maxSpeed, setMaxSpeed,
        maxRpm, setMaxRpm,

        speed, setSpeed,
        rpm, setRpm,
        distance, setDistance,
        setTooClose
    } = useContext(Car);

    const {
        configJsonToElems,
        setDashboards
    } = useContext(Data)

    ws_client.onopen = () => {
        console.log('WebSocket Client Connected');
    }

    ws_client.onmessage = (message) => {
        var data = message.data
        data = JSON.parse(data)
        console.log(data)
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
        } else if ('dashboards' in data) {
            let defaultDashboard = data.dashboards.default
            setDashboards(data.dashboards);
            configJsonToElems(JSON.stringify(data.dashboards.dashboards[defaultDashboard]));
        } else if ('tooClose' in data) {
            setTooClose(data.tooClose)
        }
    }

    const saveConfig = (config) => {
        ws_client.send(config)
    } 

    return(
        <Client.Provider value={{
            saveConfig
        }}>
            {props.children}
        </Client.Provider>
    );
}

export default ClientProvider;