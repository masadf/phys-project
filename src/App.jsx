import {Charge} from "./components/Charge";
import {useEffect, useState} from "react";
import {Slider, TextField} from "@mui/material";

const App = () => {
    const [charge1, setCharge1] = useState(0);
    const [position1, setPosition1] = useState({x: 0, y: 0});
    const [position2, setPosition2] = useState({x: 0, y: 0});
    const [charge2, setCharge2] = useState(0);
    const [distance, setDistance] = useState(0);
    const [strength, setStrength] = useState(0);

    useEffect(() => {
        calculateDistance();
        calculateStrength();
    }, [position1, position2, charge1, charge2])

    const calculateDistance = () => {
        setDistance(Math.sqrt((position1.x - position2.x) * (position1.x - position2.x) + (position1.y - position2.y) * (position1.y - position2.y)))
    }

    const calculateStrength = () => {
        let strength = 9 * Math.pow(9, 10) * charge1 * charge2 / (distance * distance * Math.pow(10, 18));
        if (!isNaN(strength)) setStrength(strength);
    }

    return (
        <div className="wrapper">
            <div className="charge-values">
                <h1>Параметры взаимодействия</h1>
                <div className="charge-params">
                    <div className="charge-param-block">
                        <span className="param-name">Заряд 1(нКл)</span>
                        <Slider
                            onChange={e => {
                                setCharge1(e.target.value)
                            }}
                            defaultValue={charge1 ? charge1 : 0}
                            step={100}
                            min={-1000}
                            max={1000}
                            valueLabelDisplay="auto"
                        />
                    </div>
                    <div className="charge-param-block">
                        <span className="param-name">Заряд 2(нКл)</span>
                        <Slider
                            onChange={e => {
                                setCharge2(e.target.value);
                            }}
                            defaultValue={charge2 ? charge2 : 0}
                            step={100}
                            min={-1000}
                            max={1000}
                            valueLabelDisplay="auto"
                        />
                    </div>
                    <div className="charge-param-block">
                        <span className="param-name">Расстояние</span>
                        <TextField aria-readonly="true" value={distance} variant="outlined" />
                    </div>
                    <div className="charge-param-block">
                        <span className="param-name">Сила взаимодействия</span>
                        <TextField aria-readonly="true" value={strength} variant="outlined" />
                    </div>
                </div>
            </div>
            <Charge setCoordinates={setPosition1} charge={charge1}/>
            <Charge setCoordinates={setPosition2} charge={charge2}/>
        </div>
    );
}

export default App;
