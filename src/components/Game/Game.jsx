import React, { useState
    , useEffect, useRef ////
 } from "react";
import CoverScreen from '../CoverScreen/CoverScreen';
import BalloonGrid from '../BalloonGrid/BalloonGrid';
import "./Game.css";

export default function Game() {
    const [gameStarted, setGameStarted] = useState(false);
    const [coverScreenTransition, setCoverScreenTransition] = useState(false);
    // Very short life new state variable
    const [coverScreenTopPosition, setCoverScreenTopPosition] = useState(false);

    const timerRef = useRef(null);
    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    const startGame = () => {
        setGameStarted(true);
        setCoverScreenTransition(true);
        timerRef.current = setTimeout(() => {
                setCoverScreenTransition(false);
            },
            3000
        );
        return () => clearTimeout(timerRef.current);
    };

    const stopGame = () => {
        setGameStarted(false);
        // I make cover screen to appear on top position and then I will set back to false quite fast
        setCoverScreenTopPosition(true);
        timerRef.current = setTimeout(() => {
            setCoverScreenTopPosition(false);
        }, 100);
        return () => clearTimeout(timerRef.current);
    };

    return (
        <div className="game-container">
            {(coverScreenTransition || !gameStarted  ) ?
                <CoverScreen 
                    onStartGame={startGame} 
                    gameStarted={gameStarted}
                    // I want to pass down `coverScreenTopPosition` state variable as a prop to the CoverScreen component
                    coverScreenTopPosition={coverScreenTopPosition}
            />
            :''}

            <BalloonGrid 
                onStopGame={stopGame} 
                gameStarted={gameStarted} 
            />
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
                coverScreenTransition: {coverScreenTransition.toString()}<br />
                {/* */}
                coverScreenTopPosition: {coverScreenTopPosition.toString()}<br />
            </div>
        </div>
    );
};