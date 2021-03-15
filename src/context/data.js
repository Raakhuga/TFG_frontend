import React, { createContext, useState } from "react";

export const Data = createContext();

const DataProvider = (props) => {
    
    // Editor Info
    const [editRect, setEditRect] = useState({x_o: 0, x_f: 0, y_o: 0, y_f: 0})
    const [elems, setElems] = useState(new Array())


    return (
        <Data.Provider value = {{
            editRect, setEditRect,
            elems, setElems
        }}>
            {props.children}
        </Data.Provider>
    );
}

export default DataProvider;