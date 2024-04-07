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
            {/*
                !gameStarted 
                ? 
                (<CoverScreen onStartGame={startGame} />) 
                : 
                // Pass stopGame function down as a prop to the BalloonGrid component.
                (<BalloonGrid onStopGame={stopGame} />)
            */}
            {/* (1) Show both `CoverScreen` and `BalloonGrid` in `game-container`. */}
            <CoverScreen 
                onStartGame={startGame} 
                // (2) Pass state variable `gameStarted` as a class name
                gameStarted={gameStarted}
            />
            <BalloonGrid onStopGame={stopGame} />
        </div>
    );
};