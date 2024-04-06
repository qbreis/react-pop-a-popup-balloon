import React, { useState, useEffect } from 'react'; 
import Balloon from "../Balloon/Balloon";
// (1) Importing the Button component from its location.
import Button from "../Button/Button";
import "./BalloonGrid.css";

export default function BalloonGrid(
    {onStopGame} // (2) Aaccept onStopGame as a prop.
) {
    const [activeBalloons, setActiveBalloons] = useState([]);
    
    const toggleBalloons = () => {
        
        const randomActiveBalloons = Array.from({ length: 6 }, function() {
            return Math.random() < 0.5;
        })
        .map(function(isActive, index) {
            return isActive ? index : null;
        })
        .filter(function(index) {
            return index !== null;
        });
        setActiveBalloons(randomActiveBalloons);
    };

    useEffect(() => {
        toggleBalloons();
        const intervalId = setInterval(toggleBalloons, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const balloons = [];

    for (let i = 0; i < 6; i++) {
        balloons.push(
            <Balloon
            key={i}
            color="#9980FA"
            isActive={activeBalloons.includes(i)}
            />
        );
    }

    return (
        <div className="balloon-grid-wrapper">
            <div className="game-header">
                <p className="balloon-grid-caption">
                    Click a balloon!
                </p>
                {/* (3) Button to stop the game,
                    triggering an action from the child component (BalloonGrid)
                    to the parent component (Game). */}
                <Button onClick={onStopGame}>
                    Stop
                </Button>
            </div>
            <div className="balloon-grid">
                {balloons}
            </div>
        </div>
    );
}