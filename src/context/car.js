import React, { createContext, useRef, useState } from "react";

export const Car = createContext();

const CarProvider = (props) => {
    
    // Car Info
    const [maxSpeed, setMaxSpeed] = useState(200);
    const [maxRpm, setMaxRpm] = useState(3000);

    const [speed, setSpeed] = useState(0);
    const [rpm, setRpm] = useState(0);
    const [distance, setDistance] = useState(0);

    const [tooClose, setTooClose] = useState(false);


    return (
        <Car.Provider value = {{
            maxSpeed, setMaxSpeed,
            maxRpm, setMaxRpm,

            speed, setSpeed,
            rpm, setRpm,
            distance, setDistance,

            tooClose, setTooClose
        }}>
            {props.children}
        </Car.Provider>
    );
}

export default CarProvider;