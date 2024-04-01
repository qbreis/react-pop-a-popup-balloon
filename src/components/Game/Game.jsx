import React, { useState } from "react";
import CoverScreen from '../CoverScreen/CoverScreen';
import BalloonGrid from '../BalloonGrid/BalloonGrid';
import "./Game.css";

export default function Game() {
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        setGameStarted(true);
    };

    return (
        <div className="game-container">
            {/*
            <BalloonGrid />
            */}
            {
            // Conditionally render BalloonGrid or a cover screen based on gameStarted
            }
            {
                !gameStarted 
                ? 
                (<CoverScreen onStartGame={startGame} />) : ( <BalloonGrid /> )
            }
        </div>
    );
};