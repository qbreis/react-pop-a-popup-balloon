import Balloon from "../Balloon/Balloon";
import "./BalloonGrid.css";

export default function BalloonGrid() {

    const balloons = [];

    for (let i = 0; i < 6; i++) {
        balloons.push(
            <Balloon
            key={i}
            color="#9980FA"
            />
        );
    }

    return (
        <div className="balloon-grid-wrapper">
            <p className="balloon-grid-caption">Grid of balloons</p>
            <div className="balloon-grid">
                {balloons}
            </div>
        </div>
    );
}