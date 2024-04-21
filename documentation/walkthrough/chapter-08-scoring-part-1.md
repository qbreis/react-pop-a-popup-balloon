# Chapter #7 - Scoring - Part #1

In this chapter I want to score each time i pop a balloon, which was the main goal of all this, isn't it.

I start with `src/components/Balloon/Balloon.jsx`:

```js
[...]
export default function Balloon({ 
    color, 
    isActive,

    // Add an onclick event to the balloon component as a prop.
    onClick
}) {

    const [isPopped, setIsPopped] = useState(false); 
    const isMoving = true;

    const clickHandler = () => {
        if (!isPopped) {
            setIsPopped(true);

            // Call the onClick function passed as prop
            // I consider a good practice to check if the onClick prop is provided before calling it.
            if(onClick) {
                onClick();
            }

            setTimeout(() => {
                setIsPopped(false);
            }, 1000);
        }
    };
[...]
```

In `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
export default function BalloonGrid(
    {
        onStopGame,
        gameStarted ,
        gameScreenStartTransition,
        numberOfBalloons,
        timeRemaining,
        gameTimeDelay,
        gameDuration,

        // New prop to handle balloon click
        onBalloonClick
    }
) {
    const [activeBalloons, setActiveBalloons] = useState([]);

    const handleBalloonClick = (index) => {
        // Call the onBalloonClick function passed as prop.
        // I consider a good practice to check if the onClick prop is provided before calling it.
        if (onBalloonClick) {
            onBalloonClick(index);
        }
    };
[...]
    for (let index = 0; index < numberOfBalloons; index++) {
        balloons.push(
            <Balloon
            key={index}
            color="#9980FA"
            isActive={activeBalloons.includes(index)}

            // Pass index to handleBalloonClick
            onClick={() => handleBalloonClick(index)}
            />
        );
    }
[...]
```

And in `src/components/Game/Game.jsx`:

```js
[...]
export default function Game({numberOfBalloons,gameDuration}) {
[...]
    const transitionTimerRef = useRef(null);
    const transitionAuxiliarTimerRef = useRef(null);

    // Function to handle balloon click
    const handleBalloonClick = (index) => {
        console.log(`balloon ${index} clicked!!!`);
    };
[...]

    return (
[...]
            {(gameState.gameStarted || gameState.gameScreenStartTransition) ?
                <BalloonGrid 
                    onStopGame={function() {handleGameToggle(false)}} 
                    gameStarted={gameState.gameStarted} 
                    gameScreenStartTransition={gameState.gameScreenStartTransition}
                    numberOfBalloons={numberOfBalloons}
                    timeRemaining={gameState.timeRemaining}
                    gameTimeDelay={Constants.gameTimeDelay}
                    gameDuration={gameDuration}

                    // Pass handleBalloonClick
                    onBalloonClick={handleBalloonClick}
                />
            :''}
[...]
```

## Centralized State Management

Before proceeding, I want to check if all is ok, and for that I want to slow down the balloons toggling and see the `activeBalloons` state variable in `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
[...]
// const intervalId = setInterval(toggleBalloons, 1000);
const intervalId = setInterval(toggleBalloons, 6000);
[...]
    return (
        <div className={`
            balloon-grid-wrapper
            ${gameStarted ? 'gameStarted' : ''}
            ${gameScreenStartTransition ? 'gameScreenStartTransition' : ''}
            `}>
[...]
            {/* Visual state variables at all times for dev purpose */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                padding: '1em',
                backgroundColor: 'rgba(255, 255, 255, .8)',
                zIndex: 1,
                fontSize: '0.7em',
                color: '#000000'
                }}>
                <h3>State Vars</h3>
                activeBalloons: {activeBalloons.toString()}<br />
            </div>
        </div>
    );
}
```

Now I can see clearly, when I click one balloon, it blows up and after some msecs. it appears again. This is because I did not remove it from the active ballons.

I can also see `activeBalloons` array is defined as state variable in `handleBalloonClick` but I want to lift the state of `activeBalloons` up to the `Game` component and pass it down to the `BalloonGrid` component as a prop, in `src/components/Game/Game.jsx`:

```js
[...]
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

        // lift the state of `activeBalloons` up to the `Game` component
        activeBalloons: []
    });
[...]

// Since I am lifting the state of `activeBalloons` to the `Game` component and passing it down as a prop to the `BalloonGrid` component, I don't need to call `setActiveBalloons` directly in the `BalloonGrid` component anymore. Instead, I want to handle the state manipulation in the `Game` component, as long as the `gameStarted` state variable is `true`, and pass the updated `activeBalloons` as a prop to `BalloonGrid`.
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

[...]
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
/>
[...]
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
</div>
[...]
```

In `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
[...]
export default function BalloonGrid(
    {
        onStopGame,
        gameStarted ,
        gameScreenStartTransition,
        numberOfBalloons,
        timeRemaining,
        gameTimeDelay,
        gameDuration,

        onBalloonClick,

        // pass `activeBalloons` down, from `Game` component to the `BalloonGrid` component as a prop
        activeBalloons
    }
) {
    // const [activeBalloons, setActiveBalloons] = useState([]);
[...]
    // remove the useEffect to toggleBalloons and visual state variables at all times for dev purpose
```

## Removing balloon clicked from active balloons

In `src/components/Game/Game.jsx`:

```js
[...]
const handleBalloonClick = (index) => {
    if (gameState.activeBalloons.includes(index)) {
        console.log(`balloon ${index} clicked!!!`);

        // Remove the clicked balloon from the activeBalloons array
        const newActiveBalloons = gameState.activeBalloons.filter(balloonIndex => balloonIndex !== index);
        // Update the gameState with the new activeBalloons array
        setGameState(prevState => ({
            ...prevState,
            activeBalloons: newActiveBalloons
        }));

    } else {
        console.log('FAIL');
    }
};
[...]
```

## Adding game scoring

In `src/components/Game/Game.jsx`:

```js
[...]
export default function Game({numberOfBalloons,gameDuration}) {
    const [gameState, setGameState] = useState({
        gameStarted: false,
        coverScreenTransition: false,
        coverScreenTopPosition: false,
        gameScreenStartTransition: false,
        timeRemaining: 0, // milliseconds

        // Add score game state variable
        score: 0
    });
[...]
    const handleBalloonClick = (index) => {
        if (gameState.activeBalloons.includes(index)) {
            console.log(`balloon ${index} clicked!!!`);

            // Removes the clicked balloon from the activeBalloons array
            const newActiveBalloons = gameState.activeBalloons.filter(balloonIndex => balloonIndex !== index);
            
            setGameState(prevState => ({
                ...prevState,
                activeBalloons: newActiveBalloons, // Updates the gameState with the new activeBalloons array
                score: prevState.score + 1 // Updates score game state variable
            }));

        } else {
            console.log('FAIL');
        }
    };
[...]
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
[...]
```

Now when I click a balloon I can see score increments, but when I start over score never restart. To fix that in `src/components/Game/Game.jsx`:

```js
[...]
transitionAuxiliarTimerRef.current = setTimeout(
    function() {
        if (start) {
[...]
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
[...]
```

And Finally I add `src/components/GameScore/GameScore.js`:

```js
import "./GameScore.css";
export default function GameScore({score}) {
    return (
        <div className="game-score">
            Score: {score}
        </div>
    );
};
```

In `src/components/GameScore/GameScore.css`:

```css
.game-score {
    position: fixed;
    top: 3em;
    right: 2em;
}
```

And in `src/components/Game/Game.jsx`:

```js
[...]
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
[...]
```

And consequently in `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
import React, { useState, useEffect } from 'react';
import Balloon from "../Balloon/Balloon";
import Button from "../Button/Button";
import ProgressBar from "../ProgressBar/ProgressBar";
// Import GameScore component
import GameScore from "../GameScore/GameScore";
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
        onBalloonClick,
        activeBalloons,

        // Need score
        score
    }
) {
[...]
            <div className="game-header">
                <p className="balloon-grid-caption">
                    Click a balloon!
                </p>
                
                {/* New GameScore component */}
                <GameScore score={score} />

                <ProgressBar time={timeRemaining} delay={gameTimeDelay} gameDuration={gameDuration} />
                <Button onClick={onStopGame}>
                    Stop
                </Button>
            </div>
[...]
```






## Showing game score

