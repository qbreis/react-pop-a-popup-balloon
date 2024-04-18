import React, { useState, useEffect, useRef,useCallback } from "react";
import CoverScreen from '../CoverScreen/CoverScreen';
import BalloonGrid from '../BalloonGrid/BalloonGrid';
import Constants from "../../utils/constants";
import "./Game.css";

export default function Game({numberOfBalloons,gameDuration}) {
    const [gameState, setGameState] = useState({
        gameStarted: false,
        coverScreenTransition: false,
        coverScreenTopPosition: false,
        gameScreenStartTransition: false,

        // New state var for game caption to hide
        balloonGridCaptionTransition: false,

        timeRemaining: 0
    });

    const transitionTimerRef = useRef(null);
    const transitionAuxiliarTimerRef = useRef(null);

    // New ref for new state var
    const balloonGridCaptionTransitionRef = useRef(null);

    const handleGameToggle = useCallback(function(start) {
        setGameState(function(prevState) {
            return {
                ...prevState,
                gameStarted: start,
                coverScreenTransition: start,
                gameScreenStartTransition: true,
                coverScreenTopPosition: !start,
                timeRemaining: start ? gameDuration : 0,
            };
        });

        transitionTimerRef.current = setTimeout(
            function() {
                setGameState(function(prevState) {
                    return {
                        ...prevState,
                        coverScreenTransition: false,
                        gameScreenStartTransition: false,
                    };
                });
            },
            300
        );

        transitionAuxiliarTimerRef.current = setTimeout(
            function() {
                if (start) {
                    setGameState(function(prevState) {
                        return {
                            ...prevState,
                            gameScreenStartTransition: false,

                            // Set new state var for game caption to true
                            balloonGridCaptionTransition: true,
                        }
                    });

                } else {
                    setGameState(function(prevState) {
                        return {
                            ...prevState,
                            coverScreenTopPosition: false,
                        }
                    });
                }
            }, 100
        );

        // Set new state var for game caption to false after 2 seconds
        balloonGridCaptionTransitionRef.current = setTimeout(
            function() {
                if (start) {
                    setGameState(function(prevState) {
                        return {
                            ...prevState,
                            balloonGridCaptionTransition: false,
                        }
                    });

                } 
            }, 2000
        );

    }, [gameDuration]);

    useEffect(function() {
        const transitionTimerRefValue = transitionTimerRef.current;
        const transitionAuxiliarTimerRefValue = transitionAuxiliarTimerRef.current;

        // New variable to hold the timer reference
        const balloonGridCaptionTransitionRefValue = balloonGridCaptionTransitionRef.current;

        if (gameState.gameStarted) {
            const gameTimeInterval = setInterval(
                function() {
                    if(gameState.timeRemaining > 0) {
                        setGameState(function(prevState) {
                            return {
                                ...prevState,
                                timeRemaining: prevState.timeRemaining - 1
                            };
                        });
                    } else {
                        handleGameToggle(false);
                    }
                }, 
                Constants.gameTimeDelay
            );

            return function() {
                clearInterval(gameTimeInterval);
            };
        } else {
            return function() {
                clearTimeout(transitionTimerRefValue);
                clearTimeout(transitionAuxiliarTimerRefValue);

                // Clear the balloonGridCaptionTransitionRef timer
                clearTimeout(balloonGridCaptionTransitionRefValue);
            };
        }
    }, [gameState.gameStarted, gameState.timeRemaining, 
        handleGameToggle
    ]);

    return (
        <div className="game-container">
            {(gameState.coverScreenTransition || !gameState.gameStarted) ?
                <CoverScreen 
                    onStartGame={function() {handleGameToggle(true)}} 
                    gameStarted={gameState.gameStarted}
                    coverScreenTopPosition={gameState.coverScreenTopPosition}
            />
            :''}

            {(gameState.gameStarted || gameState.gameScreenStartTransition) ?
                <BalloonGrid 
                    onStopGame={function() {handleGameToggle(false)}} 
                    gameStarted={gameState.gameStarted} 
                    gameScreenStartTransition={gameState.gameScreenStartTransition}
                    numberOfBalloons={numberOfBalloons}
                    timeRemaining={gameState.timeRemaining}
                    gameTimeDelay={Constants.gameTimeDelay}
                    gameDuration={gameDuration}

                    // Add balloonGridCaptionTransition
                    balloonGridCaptionTransition={gameState.balloonGridCaptionTransition}
                />
            :''}

            <div style={{
                position: 'fixed',
                bottom: 0,
                padding: '1em',
                backgroundColor: 'rgba(255, 255, 255, .8)',
                zIndex: 1,
                fontSize: '0.7em',
                color: '#000000'
                }}>
                <h3>State Vars</h3>
                gameStarted: {gameState.gameStarted.toString()}<br />
                coverScreenTransition: {gameState.coverScreenTransition.toString()}<br />
                coverScreenTopPosition: {gameState.coverScreenTopPosition.toString()}<br />
                gameScreenStartTransition: {gameState.gameScreenStartTransition.toString()}<br />
                timeRemaining: {gameState.timeRemaining.toString()}<br />

                {/* Comment here please */}
                balloonGridCaptionTransition: {gameState.balloonGridCaptionTransition.toString()}<br />
            </div>
        </div>
    );
};