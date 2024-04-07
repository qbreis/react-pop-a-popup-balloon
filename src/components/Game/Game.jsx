import React, { useState } from "react";
import CoverScreen from '../CoverScreen/CoverScreen';
import BalloonGrid from '../BalloonGrid/BalloonGrid';
import "./Game.css";

export default function Game() {
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        setGameStarted(true);
    };

    // Add state-changing function to stop the game
    const stopGame = () => {
        setGameStarted(false);
    };

    return (
        <div className="game-container">
            <CoverScreen 
                onStartGame={startGame} 
                gameStarted={gameStarted}
            />
            <BalloonGrid 
                onStopGame={stopGame} 
                // (2) Pass state variable `gameStarted` as a class name
                gameStarted={gameStarted} 
            />
        </div>
    );
};