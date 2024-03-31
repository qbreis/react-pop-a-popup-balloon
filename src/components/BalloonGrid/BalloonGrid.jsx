// Add useEffect React Hook
import React, { useState, useEffect } from 'react'; 
import Balloon from "../Balloon/Balloon";
import Button from "../Button/Button";
import "./BalloonGrid.css";

export default function BalloonGrid() {
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
        // Call toggleBalloons once when component mounts
        toggleBalloons();

        // Set up interval to toggle balloons automatically
        const intervalId = setInterval(toggleBalloons, 1000); // Change interval as needed

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this effect runs only once on mount

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
            {/*
            <Button onClick={toggleBalloons}>
                Toggle Balloon
            </Button>
            */}
        </div>
    );
}