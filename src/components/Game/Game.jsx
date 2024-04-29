import React, { useState, useEffect, useRef, useCallback } from "react";
import CoverScreen from '../CoverScreen/CoverScreen';
import BalloonGrid from '../BalloonGrid/BalloonGrid';
import Constants from "../../utils/constants";
import getRandomNumber from "../../utils/randomNumber";

import "./Game.css";

function generateRandomColorsArray() {
    return Array.from({ length: Constants.gameCells }, () => {
        const randomIndex = Math.floor(Math.random() * Constants.colors.length);
        return Constants.colors[randomIndex];
    });
}

function calculateForbiddenColorPositions(colorsArray) {
    const indexesOfForbiddenColors = [];
    colorsArray.forEach((color, index) => {
        if (Constants.forbiddenColors.includes(color)) {
            indexesOfForbiddenColors.push(index);
        }
    });
    return indexesOfForbiddenColors;
}

export default function Game({ numberOfBalloons, gameDuration }) {

    const [gameState, setGameState] = useState({
        gameStarted: false,
        coverScreenTransition: false,
        coverScreenTopPosition: false,
        gameScreenStartTransition: false,
        timeRemaining: 0, // milliseconds
        activeBalloons: [],
        score: 0,
        transitioning: false,
        transitionalActiveBalloons: [],
        balloonColors: generateRandomColorsArray(),

        forbiddenColorPositions: []
    });

    const intervalIdsRef = useRef([]);
    useEffect(() => {
        if (gameState.gameStarted) {
            intervalIdsRef.current = [];
            const generateRandomBalloon = () => {
                setGameState(prevState => {
                    const randomBalloonId = Math.floor(Math.random() * numberOfBalloons);
                    const newActiveBalloons = prevState.activeBalloons.includes(randomBalloonId)
                        ? prevState.activeBalloons.filter(activeId => activeId !== randomBalloonId)
                        : [...prevState.activeBalloons, randomBalloonId];
                    return {
                        ...prevState,
                        activeBalloons: newActiveBalloons,
                        transitioning: true,
                    };
                });
            };
            
            for (let i = 0; i < numberOfBalloons; i++) {
                const intervalId = setInterval(
                    generateRandomBalloon,
                    getRandomNumber(
                        Constants.balloonTogglingRandomnessLimits.lower,
                        Constants.balloonTogglingRandomnessLimits.upper
                    )
                );
                intervalIdsRef.current.push(intervalId);
            }

            const transitionTimeout = setTimeout(
                () => {
                    setGameState(prevState => {
                        const allIndexes = Array.from({ length: Constants.gameCells }, (_, index) => index);
                        const indexesNotInActiveBalloons = allIndexes.filter(
                            index => !gameState.activeBalloons.includes(index)
                        );
                        const newColors = prevState.balloonColors.map((color, index) => {
                            if (indexesNotInActiveBalloons.includes(index)) {
                                return Constants.colors[Math.floor(Math.random() * Constants.colors.length)];
                            }
                            return color;
                        });
                        return {
                            ...prevState,
                            balloonColors: newColors,
                            forbiddenColorPositions: calculateForbiddenColorPositions(newColors)
                        }
                    });

                    setGameState(prevState => ({
                        ...prevState,
                        transitioning: false,
                        transitionalActiveBalloons: prevState.activeBalloons,
                    }));
                }, 
                Constants.balloonToggleTransition
            );

            return () => {
                clearIntervals(); 
                clearTimeout(transitionTimeout);
            };
        }
    }, [
        numberOfBalloons, 
        gameState.gameStarted, 
        gameState.activeBalloons,
        gameState.colors,
        gameState.transitionalActiveBalloons,
    ]);

    const transitionTimerRef = useRef(null);
    const transitionAuxiliarTimerRef = useRef(null);

    const handleBalloonClick = (index) => {
        if (gameState.forbiddenColorPositions.includes(index)) {
            setGameState(function(prevState) {
                return {
                    ...prevState,
                    timeRemaining: 0,
                    // forbiddenColorPositions: [666] // Number of the beast!
                };
            });
        } else if (
            gameState.activeBalloons.includes(index)
            ||
            gameState.transitionalActiveBalloons.includes(index)
        ) {
            const newActiveBalloons = gameState.activeBalloons.filter(balloonIndex => balloonIndex !== index);
            setGameState(prevState => ({
                ...prevState,
                activeBalloons: newActiveBalloons,
                score: prevState.score + 1
            }));
        }
    };

    const clearIntervals = () => {
        intervalIdsRef.current.forEach((intervalId) => clearInterval(intervalId));
    };

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
                        gameScreenStartTransition: false
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
                            score: 0,
                            // forbiddenColorPositions: [] // clear forbiddenColorPositions
                        }
                    });

                } else {
                    setGameState(function(prevState) {
                        clearIntervals();
                        return {
                            ...prevState,
                            coverScreenTopPosition: false,
                            activeBalloons: [],
                            transitionalActiveBalloons: [],
                            transitioning: false
                        }
                    });
                }
            }, 100
        );
    }, [gameDuration]);

    useEffect(function() {
        const transitionTimerRefValue = transitionTimerRef.current;
        const transitionAuxiliarTimerRefValue = transitionAuxiliarTimerRef.current;
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
            };
        }
    }, [gameState.gameStarted, gameState.timeRemaining, handleGameToggle]);

    return (
        <div className="game-container">
            {(gameState.coverScreenTransition || !gameState.gameStarted) ?
                <CoverScreen 
                    onStartGame={function() {handleGameToggle(true)}} 
                    gameStarted={gameState.gameStarted}
                    coverScreenTopPosition={gameState.coverScreenTopPosition}
                    score={gameState.score}
                    // fatality={gameState.forbiddenColorPositions.includes(666)}
                />
            :''}

            {(gameState.gameStarted || gameState.gameScreenStartTransition) ?
                <BalloonGrid 
                    activeBalloons={gameState.activeBalloons}
                    onStopGame={function() {handleGameToggle(false)}} 
                    gameStarted={gameState.gameStarted} 
                    gameScreenStartTransition={gameState.gameScreenStartTransition}
                    numberOfBalloons={numberOfBalloons}
                    timeRemaining={gameState.timeRemaining}
                    gameTimeDelay={Constants.gameTimeDelay}
                    gameDuration={gameDuration}
                    onBalloonClick={handleBalloonClick}
                    score={gameState.score}
                    balloonToggleTransition={Constants.balloonToggleTransition}
                    balloonPoppingTransition={Constants.balloonPoppingTransition}
                    coinCounterDelay={Constants.coinCounterDelay}
                    balloonColors={gameState.balloonColors}
                />
            :''}
            {/*
            <div style={{
                position: 'fixed',
                bottom: 0,
                padding: '1em',
                backgroundColor: 'rgba(255, 255, 255, .8)',
                zIndex: 1,
                fontSize: '0.7em',
                color: '#000000',
                }}>
                <h3>State Vars</h3>
                gameStarted: {gameState.gameStarted.toString()}<br />
                coverScreenTransition: {gameState.coverScreenTransition.toString()}<br />
                coverScreenTopPosition: {gameState.coverScreenTopPosition.toString()}<br />
                gameScreenStartTransition: {gameState.gameScreenStartTransition.toString()}<br />
                timeRemaining: {gameState.timeRemaining.toString()}<br />
                activeBalloons: {gameState.activeBalloons.toString()}<br />
                score: {gameState.score.toString()}<br />
                transitionalActiveBalloons: {gameState.transitionalActiveBalloons.toString()}<br />
                transitioning: {gameState.transitioning.toString()}<br />
                balloonColors: {gameState.balloonColors.toString()}<br />
                forbiddenColorPositions: {gameState.forbiddenColorPositions.toString()}<br />
            </div>
            */}
            {/*
            <div>
                {Constants.colors.map((color, index) => (
                <div
                    key={index}
                    style={{
                    backgroundColor: color,
                    padding: '5px',
                    margin: '5px',
                    borderRadius: '5px'
                    }}
                >
                    {color}
                </div>
                ))}
            </div>
            */}
        </div>
    );
};