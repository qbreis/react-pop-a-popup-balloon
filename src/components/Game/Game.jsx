import React, { useState, useEffect, useRef } from "react";
import CoverScreen from '../CoverScreen/CoverScreen';
import BalloonGrid from '../BalloonGrid/BalloonGrid';
import "./Game.css";

export default function Game() {
    const [gameStarted, setGameStarted] = useState(false);
    const [coverScreenTransition, setCoverScreenTransition] = useState(false);
    const [coverScreenTopPosition, setCoverScreenTopPosition] = useState(false);
    const [gameScreenStartTransition, setGameScreenStartTransition] = useState(false);

    const timerRef = useRef(null);
    const secondTimerRef = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
            clearTimeout(secondTimerRef.current);
        };
    }, []);

    
    // I can use either arrow function syntax or regular function syntax to define a function and assign it to a constant variable in JavaScript. Both approaches are valid.
    /* 
    const handleGameToggle = ( // this is arrow function syntax
        start
    ) => { 
    */
    // function manages the game start and stop logic.
    const handleGameToggle = function( // I will use regular function syntax
        start // function takes one parameter named start which can be true or false
    ) {

    }

    const startGame = () => {
        setGameStarted(true);
        setCoverScreenTransition(true);
        timerRef.current = setTimeout(() => {
                setCoverScreenTransition(false);
            },
            3000
        );
        setGameScreenStartTransition(true);
        secondTimerRef.current = setTimeout(() => {
            setGameScreenStartTransition(false);
        }, 100);
        return () => {
            clearTimeout(timerRef.current);
            clearTimeout(secondTimerRef.current);
        };
    };

    const stopGame = () => {
        setGameStarted(false);
        setCoverScreenTopPosition(true);
        setGameScreenStartTransition(true);
        secondTimerRef.current = setTimeout(() => {
                setGameScreenStartTransition(false);
            },
            3000
        );
        timerRef.current = setTimeout(() => {
            setCoverScreenTopPosition(false);
        }, 100);
        return () => {
            clearTimeout(timerRef.current);
            clearTimeout(secondTimerRef.current);
        };
    };

    return (
        <div className="game-container">
            {(coverScreenTransition || !gameStarted  ) ?
                <CoverScreen 
                    onStartGame={startGame} 
                    gameStarted={gameStarted}
                    coverScreenTopPosition={coverScreenTopPosition}
            />
            :''}

            {(gameStarted || gameScreenStartTransition ) ?
                <BalloonGrid 
                    onStopGame={stopGame} 
                    gameStarted={gameStarted} 
                    gameScreenStartTransition={gameScreenStartTransition}
                />
            :''}

            <div style={{
                position: 'fixed',
                top: 0,
                padding: '1em',
                backgroundColor: 'rgba(255, 255, 255, .2)',
                zIndex: 1,
                fontSize: '0.7em'
                }}>
                <h3>State Vars</h3>
                gameStarted: {gameStarted.toString()}<br />
                coverScreenTransition: {coverScreenTransition.toString()}<br />
                coverScreenTopPosition: {coverScreenTopPosition.toString()}<br />
                {/* Add gameScreenStartTransition to state variables display view */}
                gameScreenStartTransition: {gameScreenStartTransition.toString()}<br />
            </div>
        </div>
    );
};