import "./charge.scss"
import Draggable from "react-draggable";
import {Button, Slider, TextField} from "@mui/material";
import {useState} from "react";

export const Charge = ({
                           index,
                           setCoordinates,
                           deleteMe,
                           setCharge,
                           point,
                           tensionMode,
                           isNeedToUpdate,
                           changeMode
                       }) => {
    const onDrag = (e) => {
        let chargeWindow = document.getElementById("chargeWindow");
        setCoordinates(e.target.getBoundingClientRect().x - chargeWindow.getBoundingClientRect().x, e.target.getBoundingClientRect().y - chargeWindow.getBoundingClientRect().y);
    }

    const [modal, setModal] = useState(false);

    return (
        <div className="draggable-wrapper" style={tensionMode ? {pointerEvents: "none"} : {pointerEvents: "all"}}
             onClick={() => changeMode && !modal && setModal(true)}>
            <Draggable tyle={{
                top: point.y,
                left: point.x
            }} disabled={changeMode} onStop={(e) => onDrag(e)}
                       defaultPosition={{x: point.x, y: point.y}}>
                <div className={"charge-wrapper"}>
                    <div className="charge"
                         style={point.charge > 0 ? {background: "red"} : !point.charge ? {background: "gray"} : {background: "blue"}}></div>
                </div>
            </Draggable>
            <div className="modal-screen" onClick={() => setModal(false)}
                 style={modal ? {display: "grid"} : {display: "none"}}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                    <h1>Информация о заряде</h1>
                    <div className="charge-params">
                        <div className="charge-param-block">
                            <span className="param-name">Заряд(нКл)</span>
                            <Slider
                                key={index}
                                onChange={e => {
                                    if (isNeedToUpdate) return;
                                    setCharge(e.target.value);
                                }}
                                defaultValue={point.charge}
                                step={100}
                                min={-1000}
                                max={1000}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className="charge-param-block">
                            <span className="param-name">X(метры)</span>
                            <TextField aria-readonly="true" value={point.x} variant="outlined"/>
                        </div>
                        <div className="charge-param-block">
                            <span className="param-name">Y(метры)</span>
                            <TextField aria-readonly="true" value={point.y} variant="outlined"/>
                        </div>
                        <div className="charge-param-block">
                            <Button onClick={deleteMe} color="error" variant="contained">Удалить</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
