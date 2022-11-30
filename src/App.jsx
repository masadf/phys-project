import {Charge} from "./components/Charge";
import {useEffect, useState} from "react";
import {res, vectorGrid} from "./calculating/electrics";

const App = () => {
    const [points, setPoints] = useState([{x: 100, y: 230, charge: 100}]);
    const [isNeedToUpdate, setNeedToUpdate] = useState(false);

    function drawLines(points) {
        const [gridX, gridY] = vectorGrid("chargeWindow", points)
        let chargeWindow = document.getElementById("chargeWindow");
        let height = chargeWindow.getBoundingClientRect().height;
        let width = chargeWindow.getBoundingClientRect().width;
        var canvas = document.getElementById('cnvs');
        var ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height)
        for (let i = 0; i < 3000; i++) {
            ctx.beginPath();
            let x = Math.random() * width;
            let xf = Math.floor(x / (res));
            let y = Math.random() * height;
            var yf = Math.floor(y / (res));

            ctx.moveTo(x, y)
            ctx.lineTo(x + gridX[yf][xf], y + gridY[yf][xf]);
            ctx.closePath()
            ctx.stroke()
        }

    }

    useEffect(() => {
        drawLines(points);
        setNeedToUpdate(false);
    }, [isNeedToUpdate, points])

    return (
        <div className="wrapper">
            <div className="add-charge">
                <a href="#" onClick={() => {
                    debugger
                    points.push({x: 10, y: 10, charge: 100});
                    setNeedToUpdate(true);
                }}>Добавить заряд</a>
            </div>
            <div className="charge-values">
                <h1>Параметры взаимодействия</h1>
            </div>
            <div className="charge-window" id={"chargeWindow"}>
                <canvas id="cnvs"></canvas>
                {points.map((el, index) => {
                    return <Charge key={index}
                                   setCharge={(charge) => {
                                       points[index] = {"x": el.x, "y": el.y, "charge": charge};
                                       setNeedToUpdate(true);
                                   }}
                                   setCoordinates={(x, y) => {
                                       points[index] = {"x": x, "y": y, "charge": el.charge};
                                       setNeedToUpdate(true);
                                   }}
                                   deleteMe={() => setPoints(points.filter((val, i) => index !== i))}
                                   point={el}/>
                })}
            </div>
        </div>
    );
}

export default App;
