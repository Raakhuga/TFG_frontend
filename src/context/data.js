import React, { createContext, useState, useRef } from "react";
import { Dimensions, View } from "react-native";
import RpmViewer from "../components/rpmViewer/rpmViewer";
import SpeedViewer from "../components/speedViewer/speedViewer";
import DistanceViewer from "../components/distanceViewer/distanceViewer"

export const Data = createContext();

const DataProvider = (props) => {
    
    // Screen Info
    const [screenFrame, setScreenFrame] = useState({
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    });

    // Dashboard Info

    const refDashboards = useRef({
        default: 'default',
        dashboards: {
            default: [
                {
                    string: 'speedViewer',
                    x_o: 2,
                    x_f: 11,
                    y_o: 0,
                    y_f: 7,
                    z_pos: 1
                },
                {
                    string: 'rpmViewer',
                    x_o: 9,
                    x_f: 11,
                    y_o: 1,
                    y_f: 2,
                    z_pos: 2
                }
            ],
        }
    });
    const [dashboards, setDataDashboards] = useState(refDashboards.current);
    
    const setDashboards = (dict) => {
        setDataDashboards(dict);
        refDashboards.current = dict;
    }

    // Editor Info
    const editIndex = useRef(1); 
    const setEditIndex = (index) => {
        editIndex.current = index;
    }
    
    const [mode, setDataMode] = useState('view');
    const refMode = useRef('view')
    const setMode = (mode) => {
        setDataMode(mode);
        refMode.current = mode;
    }

    // List of available components
    const availableComponents = [
        {elem: <SpeedViewer/>, string: 'speedViewer'},
        {elem: <RpmViewer/>, string: 'rpmViewer'},
        {elem: <DistanceViewer/>, string: 'distanceViewer'}
    ]

    const [elems, setDataElems] = useState([
        {
            //elem: <View style={{backgroundColor: '#00F', width: '100%', height: '100%'}}/>,
            elem: <SpeedViewer/>,
            string: 'speedViewer',
            x_o: 2,
            x_f: 11,
            y_o: 0,
            y_f: 7,
            z_pos: 1,
            state: 'off'
        },
        {
            elem: <RpmViewer/>,
            string: 'rpmViewer',
            x_o: 9,
            x_f: 11,
            y_o: 1,
            y_f: 2,
            z_pos: 2,
            state: 'off'
        },
    ])
    const refElems = useRef([...elems]) 
    
    const setElems = (elems) => {
        setDataElems(elems);
        refElems.current = [...elems];
    }


    const stringToComponent = (string) => {
        switch (string) {
            case 'speedViewer': 
                return <SpeedViewer/>;
            
            case 'rpmViewer':
                return <RpmViewer/>;

            case 'distanceViewer':
                return <DistanceViewer/>;
            
            default:
                return <View style={{backgroundColor: '#00F', zIndex: 30, width: '100%', height: '100%'}}/>;
        }
    }

    const getConfigJson = () => {
        var config = [];
        
        refElems.current.forEach(elem => {
            var component = {};
            component['string'] = elem.string;
            component['x_o'] = elem.x_o;
            component['x_f'] = elem.x_f;
            component['y_o'] = elem.y_o;
            component['y_f'] = elem.y_f;
            component['z_pos'] = elem.z_pos;
            config.push(component);
        });

        return JSON.stringify(config);
    }

    const getConfigElems = () => {
        var config = [];
        
        refElems.current.forEach(elem => {
            var component = {};
            component['string'] = elem.string;
            component['x_o'] = elem.x_o;
            component['x_f'] = elem.x_f;
            component['y_o'] = elem.y_o;
            component['y_f'] = elem.y_f;
            component['z_pos'] = elem.z_pos;
            config.push(component);
        });

        return config;
    }

    const configJsonToElems = (config) => {
        let dict = JSON.parse(config);

        var aux_elems = new Array();
        dict.forEach((elem) => {
            aux_elems.push({
                elem: stringToComponent(elem.string),
                string: elem.string,
                x_o: elem.x_o,
                x_f: elem.x_f,
                y_o: elem.y_o,
                y_f: elem.y_f,
                z_pos: elem.z_pos,
                state: 'off'
            });
        })
        setElems(aux_elems);
    }

    const addElem = (elem) => {
        var aux_elems = [...elems];
        var aux_elem = {
            elem: elem.elem,
            string: elem.string, 
            x_o: 0,
            x_f: 0,
            y_o: 0,
            y_f: 0,
            z_pos: 0,
            state: 'off'
        }
        aux_elems.splice(0, 0, aux_elem);
        setElems(aux_elems);
    }

    const moveElem = (from, to) => {
        var aux_elems = [...elems];
        var aux_elem = aux_elems.splice(from, 1);
        aux_elems.splice(to, 0, aux_elem[0]);
        
        setElems(aux_elems);        
    }

    const delElem = (index) => {
        var aux_elems = [...elems];
        aux_elems.splice(index, 1);
        setElems(aux_elems);
    }

    const saveDashboard = () => {
        var aux = {...refDashboards.current};
        let defaultDashboard = aux['default'];
        aux['dashboards'][defaultDashboard] = getConfigElems();
        setDashboards(aux);
    }

    return (
        <Data.Provider value = {{
            screenFrame, setScreenFrame,
            dashboards, setDashboards, refDashboards,
            editIndex, setEditIndex,
            mode, setMode, refMode,
            elems, setElems, refElems,

            availableComponents,

            stringToComponent,
            getConfigJson, getConfigElems, configJsonToElems,
            saveDashboard,

            addElem, moveElem, delElem
        }}>
            {props.children}
        </Data.Provider>
    );
}

export default DataProvider;