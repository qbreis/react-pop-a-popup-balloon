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
        
        // Iterating through a loop 6 times, 
        // generating a random balloon ID in each iteration, 
        // and toggling the state of the balloons based on these random IDs.
        /*
        for (let index = 0; index < 6; index++) {
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
        }
        */

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
            return Math.random() < 0.5;
        })
        // Map each boolean value to either the index of the balloon (if true) or null (if false)
        .map(function(isActive, index) {
            return isActive ? index : null;
        })
        // Filter out the null values, keeping only the indices of active balloons
        .filter(function(index) {
            return index !== null;
        });

        setActiveBalloons(randomActiveBalloons);
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