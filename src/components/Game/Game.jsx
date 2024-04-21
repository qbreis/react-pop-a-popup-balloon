import React, { useState, useEffect, useRef,
    useCallback // Adding useCallback hook from React
} from "react";
import CoverScreen from '../CoverScreen/CoverScreen';
import BalloonGrid from '../BalloonGrid/BalloonGrid';
import Constants from "../../utils/constants";
import "./Game.css";

export default function Game({
    numberOfBalloons,
    gameDuration
}) {
    const [gameState, setGameState] = useState({
        gameStarted: false,
        coverScreenTransition: false,
        coverScreenTopPosition: false,
        gameScreenStartTransition: false,
        timeRemaining: 0, // milliseconds
        activeBalloons: [],
        // Add score game state variable
        score: 0
    });

    useEffect(() => {
        const toggleBalloons = () => {
            // Only toggle balloons if gameStarted is true
            if (gameState.gameStarted) {
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

                // Update the gameState with the new activeBalloons
                setGameState(function(prevState) {
                    return {
                        ...prevState,
                        activeBalloons: randomActiveBalloons,
                    };
                });
            }
        };
    
        toggleBalloons();
        const intervalId = setInterval(toggleBalloons, 1000);
        return () => clearInterval(intervalId);
    }, [numberOfBalloons, gameState.gameStarted]);

    const transitionTimerRef = useRef(null);
    const transitionAuxiliarTimerRef = useRef(null);


    const handleBalloonClick = (index) => {
        if (gameState.activeBalloons.includes(index)) {
            console.log(`balloon ${index} clicked!!!`);

            // Remove the clicked balloon from the activeBalloons array
            const newActiveBalloons = gameState.activeBalloons.filter(balloonIndex => balloonIndex !== index);
            
            setGameState(prevState => ({
                ...prevState,
                activeBalloons: newActiveBalloons, // Update the gameState with the new activeBalloons array
                score: prevState.score + 1 // updates score game state variable
            }));

        } else {
            console.log('FAIL');
        }
    };

    const handleGameToggle = useCallback(function(start) {
        setGameState(function(prevState) {
            return {
                ...prevState,
                gameStarted: start,
                coverScreenTransition: start,
                gameScreenStartTransition: true,
                coverScreenTopPosition: !start,
                timeRemaining: start ? gameDuration : 0
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
                        }
                    });

                } else {
                    setGameState(function(prevState) {
                        return {
                            ...prevState,
                            coverScreenTopPosition: false,
                            // Reset activeBalloons
                            activeBalloons: [],
                            // Reset game score
                            score: 0
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
                Constants.gameTimeDelay // milliseconds
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
    }, [gameState.gameStarted, gameState.timeRemaining, 
        handleGameToggle // adding handleGameToggle
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
                    activeBalloons={gameState.activeBalloons}
                    onStopGame={function() {handleGameToggle(false)}} 
                    gameStarted={gameState.gameStarted} 
                    gameScreenStartTransition={gameState.gameScreenStartTransition}
                    numberOfBalloons={numberOfBalloons}
                    timeRemaining={gameState.timeRemaining}
                    gameTimeDelay={Constants.gameTimeDelay}
                    gameDuration={gameDuration}
                    onBalloonClick={handleBalloonClick}

                    // Pass score to game screen in BalloonGrid component
                    score={gameState.score}
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
                activeBalloons: {gameState.activeBalloons.toString()}<br />

                {/* Add score game state variable to visual */}
                score: {gameState.score.toString()}<br />
            </div>
        </div>
    );
};