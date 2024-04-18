import React, { useState, useEffect } from 'react'; 
import Balloon from "../Balloon/Balloon";
import Button from "../Button/Button";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./BalloonGrid.css";

export default function BalloonGrid(
    {
        onStopGame,
        gameStarted ,
        gameScreenStartTransition,
        numberOfBalloons,
        timeRemaining,
        gameTimeDelay,
        gameDuration,
        balloonGridCaptionTransition,
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
                {/* I want to use gameScreenStartTransition and balloonGridCaptionTransition state var to set this element active */}
                <p className={`
                    balloon-grid-caption
                    ${balloonGridCaptionTransition}
                    `}>
                    Click a balloon!
                </p>
                <ProgressBar time={timeRemaining} delay={gameTimeDelay} gameDuration={gameDuration} />
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