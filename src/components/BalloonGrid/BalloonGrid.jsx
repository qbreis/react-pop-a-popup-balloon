import React, { useState, useEffect } from 'react'; 
import Balloon from "../Balloon/Balloon";
import Button from "../Button/Button";

// Import GameScore component
import GameScore from "../GameScore/GameScore";

import "./BalloonGrid.css";

export default function BalloonGrid(
    {
        onStopGame,
        gameStarted ,
        gameScreenStartTransition,

        numberOfBalloons,
        timeRemaining,

        // Pass gameTimeDelay parameter as prop
        gameTimeDelay

    }
) {
    const [activeBalloons, setActiveBalloons] = useState([]);
    
    useEffect(() => {
        const toggleBalloons = () => {
        
            const randomActiveBalloons = Array.from(
                {length: numberOfBalloons}, 
                function() {
                    return Math.random() < 0.5;
                }
            )
            .map(function(isActive, index) {
                return isActive ? index : null;
            })
            .filter(function(index) {
                return index !== null;
            });
            setActiveBalloons(randomActiveBalloons);
        };
    
        toggleBalloons();
        const intervalId = setInterval(toggleBalloons, 1000);
        return () => clearInterval(intervalId);
    }, [numberOfBalloons]);
    const balloons = [];
    for (let i = 0; i < numberOfBalloons; i++) {
        balloons.push(
            <Balloon
            key={i}
            color="#9980FA"
            isActive={activeBalloons.includes(i)}
            />
        );
    }
    return (
        <div className={`
            balloon-grid-wrapper
            ${gameStarted ? 'gameStarted' : ''}
            ${gameScreenStartTransition ? 'gameScreenStartTransition' : ''}
            `}>
            <div className="game-header">
                <p className="balloon-grid-caption">
                    Click a balloon!
                </p>

                {/* New GameScore component */}
                <GameScore time={timeRemaining} delay={gameTimeDelay} />

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