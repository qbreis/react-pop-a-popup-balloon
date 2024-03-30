import React, { useState, useEffect } from 'react'; 
import Balloon from "../Balloon/Balloon";
import "./BalloonGrid.css";

export default function BalloonGrid() {

    // State to keep track of activation state of each div
    const [activeBalloons, setActiveBalloons] = useState([]);

    /*
    const generateRandomBalloon = () => {
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

    */
    








    // Function to toggle activation state of all divs
    const toggleBalloons = () => {
        //for (let i = 0; i < 6; i++) {


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
        //}

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
            <p className="balloon-grid-caption">Grid of balloons</p>
            <div className="balloon-grid">
                {balloons}
            </div>
            <button onClick={toggleBalloons}>Toggle Balloons</button>
        </div>
    );
}