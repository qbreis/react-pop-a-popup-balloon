import React, { useState } from "react";
import CoverScreen from '../CoverScreen/CoverScreen';
import BalloonGrid from '../BalloonGrid/BalloonGrid';
import "./Game.css";

export default function Game() {
    const [gameStarted, setGameStarted] = useState(false);
    // (1) I want to add variable state `transition`, on mount set to false
    const [transition, setTransition] = useState(false);

    const startGame = () => {
        setGameStarted(true);
        // (2) Setting variable state transition to true when click on start game
        setTransition(true);

        // (3) I want to set variable state transition to false after some msecs to give time to the transitional effect
        const timer = setTimeout(
            () => {
                setTransition(false);
            }, 
            // Slow transitions for dev purpose
            3000
        );
    };

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
                gameStarted={gameStarted} 
            />
            ${/* (4) Visual variable states at all times for dev purpose */}
            <div style={{
                position: 'fixed',
                top: 0,
                padding: '1em',
                backgroundColor: 'rgba(255, 255, 255, .2)',
                zIndex: 1,
                fontSize: '0.7em'
                }}>
                <h3>Variable states</h3>
                gameStarted: {gameStarted.toString()}<br />
                transition: {transition.toString()}<br />
            </div>
        </div>
    );
};