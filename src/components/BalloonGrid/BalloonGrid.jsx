// (2) import the React Hook useState
import React, { useState, useEffect } from 'react'; 
import Balloon from "../Balloon/Balloon";
import Button from "../Button/Button";
import "./BalloonGrid.css";

export default function BalloonGrid() {

    // (1) Adding state variable `activeBalloons` to keep track of activation state for each balloon div
    const [activeBalloons, setActiveBalloons] = useState([]);

    // (4) Adding function to toggle activation state of balloon divs
    const toggleBalloons = () => {
        const randomBalloonId = Math.floor(Math.random() * 6);

        setActiveBalloons((prevActiveBalloons) => {
            if (prevActiveBalloons.includes(randomBalloonId)) {
                return prevActiveBalloons.filter(
                    (activeId) => activeId !== randomBalloonId
                );
            } else {
                return [...prevActiveBalloons, randomBalloonId];
            }
        });
    };

    const balloons = [];

    for (let i = 0; i < 6; i++) {
        // (5) Adding for each balloon div the `isActive` as an attribute with corresponding state
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
            <p className="balloon-grid-caption">Click a balloon!</p>
            <div className="balloon-grid">
                {balloons}
            </div>
            {/* (3) Adding one button to emulate Balloon Toggling */}
            <Button onClick={toggleBalloons}>
                Toggle Balloon
            </Button>
        </div>
    );
}