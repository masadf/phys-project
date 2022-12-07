import {useEffect, useState} from "react";
import {calculateTensionInPoint, res, vectorGrid} from "./calculating/electrics";
import {Button, FormControlLabel, Popover, Switch} from "@mui/material";
import {Charge} from "./components/Charge";

const App = () => {
    const [points, setPoints] = useState([{x: 100, y: 230, charge: 100}]);
    const [isNeedToUpdate, setNeedToUpdate] = useState(false);
    const [isNeedToUpdatePoints, setNeedToUpdatePoints] = useState(false);
    const [tensionMode, setTensionMode] = useState(false);
    const [anchor, setAnchor] = useState({
        view: null,
        x: null,
        y: null
    });
    const openPopover = (e) => {
        let chargeWindow = document.getElementById("chargeWindow");
        setAnchor({
            view: e.currentTarget,
            x: e.clientX - chargeWindow.getBoundingClientRect().x,
            y: e.clientY - chargeWindow.getBoundingClientRect().y
        });
    };

    function drawLines(points) {
        const [gridX, gridY] = vectorGrid("chargeWindow", points)
        let chargeWindow = document.getElementById("chargeWindow");
        let height = chargeWindow.getBoundingClientRect().height;
        let width = chargeWindow.getBoundingClientRect().width;
        let canvas = document.getElementById('cnvs');
        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height)
        for (let i = 0; i < 4000; i++) {
            ctx.beginPath();
            let x = Math.random() * width;
            let xf = Math.floor(x / (res));
            let y = Math.random() * height;
            let yf = Math.floor(y / (res));

            ctx.moveTo(x, y)
            ctx.lineTo(x + gridX[yf][xf], y + gridY[yf][xf]);
            ctx.closePath()
            ctx.stroke()
        }
    }

    useEffect(() => {
        drawLines(points);
        setNeedToUpdate(false);
        setNeedToUpdatePoints(false);
    }, [isNeedToUpdate, points])

    return (
        <div className="wrapper">
            <div className="charge-values">
                <h1>Параметры взаимодействия</h1>
            </div>
            <div className="charge-options">
                <FormControlLabel label={"Режим подсчёта напряжённости"}
                                  control={<Switch checked={tensionMode}
                                                   onChange={() => setTensionMode(!tensionMode)}/>}/>
                <Button variant="contained" onClick={() => {
                    if (tensionMode || isNeedToUpdate) return;
                    points.push({x: 50, y: 50, charge: 100});
                    setNeedToUpdate(true);
                }}>Добавить заряд</Button>
            </div>
            <div className="charge-window" id={"chargeWindow"}
                 style={isNeedToUpdate ? {pointerEvents: "none"} : {pointerEvents: "all"}}
                 onClick={(e) => tensionMode && !anchor?.view && openPopover(e)}>
                <Popover anchorEl={anchor?.view} open={Boolean(anchor?.view)}
                         onClose={() => setAnchor(null)}>
                    <div className="popover">
                        Напряженность: {calculateTensionInPoint(points, anchor?.x, anchor?.y)} Н/Кл
                    </div>
                </Popover>
                <canvas id="cnvs"></canvas>
                {anchor?.view &&
                    <div className="last-clicked-dot" style={{top: anchor.y, left: anchor.x}}></div>
                }
                {!isNeedToUpdatePoints && points.map((el, index) => {
                    return <Charge key={index}
                                   index={index}
                                   isNeedToUpdate={isNeedToUpdate}
                                   tensionMode={tensionMode}
                                   setCharge={(charge) => {
                                       if (isNeedToUpdate) return;
                                       points[index] = {"x": el.x, "y": el.y, "charge": charge};
                                       setNeedToUpdate(true);
                                   }}
                                   setCoordinates={(x, y) => {
                                       if (isNeedToUpdate) return;
                                       points[index] = {"x": x, "y": y, "charge": el.charge};
                                       setNeedToUpdate(true);
                                   }}
                                   deleteMe={() => {
                                       if (isNeedToUpdate) return;
                                       setPoints(points.filter((val, i) => index !== i))
                                       setNeedToUpdate(true);
                                       setNeedToUpdatePoints(true);
                                   }}
                                   point={el}/>
                })}
            </div>
        </div>
    );
}

export default App;
