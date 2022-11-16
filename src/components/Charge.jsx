import "./charge.scss"
import Draggable from "react-draggable";

export const Charge = ({setCoordinates, charge}) => {
    const onDrag = (e) => {

        let coordinatesPack = e.target.getBoundingClientRect();

        console.log()
        setCoordinates({x: coordinatesPack.x, y: coordinatesPack.y});
    }

    return (
        <Draggable onDrag={(e) => onDrag(e)}>
            <div className={"charge-wrapper"}>
                <div className="charge"
                     style={charge > 0 ? {background: "red"} : !charge ? {background: "gray"} : {background: "blue"}}></div>
            </div>
        </Draggable>
    )
}
