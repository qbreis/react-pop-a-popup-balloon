import React, { useState } from 'react'; 
import Balloon from "../Balloon/Balloon";
import Button from "../Button/Button";
import "./BalloonGrid.css";

export default function BalloonGrid() {
    const [activeBalloons, setActiveBalloons] = useState([]);
    const toggleBalloons = () => {
        
        /*
        Arrow Function Syntax for brevity and conciseness (First Approach):
        const randomActiveBalloons = Array.from({ length: 6 }, () =>
            Math.random() < 0.5
        ).map((isActive, index) => isActive ? index : null).filter(index => index !== null);
        */

        // Traditional Function Syntax for each step (Second Approach):

        // Create an array with 6 elements
        const randomActiveBalloons = Array.from({ length: 6 }, function() {
            // For each element, generate a random boolean value (true or false)
            // e.g. [ false, false, true, true, true, true ]
            return Math.random() < 0.5;
        })
        // Map each boolean value to either the index of the balloon (if true) or null (if false)
        // e.g. [ null, null, 2, 3, 4, 5 ]
        .map(function(isActive, index) {
            return isActive ? index : null;
        })
        // Filter out the null values, keeping only the indices of active balloons
        // e.g. [ 2, 3, 4, 5 ]
        .filter(function(index) {
            return index !== null;
        });

        // Finally, it sets the state of activeBalloons to this new array randomActiveBalloons
        setActiveBalloons(randomActiveBalloons);
    };

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
            <p className="balloon-grid-caption">Click a balloon!</p>
            <div className="balloon-grid">
                {balloons}
            </div>
            <Button onClick={toggleBalloons}>
                Toggle Balloon
            </Button>
        </div>
    );
}