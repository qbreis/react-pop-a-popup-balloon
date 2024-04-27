# Chapter 10 - Time Transition Props

In this chapter I want to pass down the necessary time transition props explicitly from the game parent component down to the child component that needs it.

## Balloon Transition Time

I will start with the `balloonToggleTransition` in ``:

```js
const constants = {
    gameDuration: 10, // seconds
    gameCells: 6,
    gameTimeDelay: 10, // milliseconds
    balloonTogglingRandomnessLimits: { upper: 3000, lower: 1000 }, // milliseconds

    balloonToggleTransition: 0.35 // milliseconds
    balloonPoppingTransition: 0.35 // milliseconds
};

export default constants;
```

In `src/components/Game/Game.jsx`:

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
    score={gameState.score}

    balloonToggleTransition={Constants.balloonToggleTransition}
/>
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
        activeBalloons,
        score,

        balloonToggleTransition,
        balloonPoppingTransition
    }
) {
[...]
balloons.push(
    <Balloon
        key={i}
        color="#9980FA"
        isActive={activeBalloons.includes(i)}
        onClick={() => handleBalloonClick(i)}

        balloonToggleTransition={balloonToggleTransition}
        balloonPoppingTransition={balloonPoppingTransition}
    />
);
[...]
```

In `src/components/Balloon/Balloon.jsx`:

```js
import "./Balloon.css";
import React, { useState } from 'react';
export default function Balloon({ 
    color, 

    balloonToggleTransition, 
    balloonPoppingTransition, 

    isActive, 
    onClick 
}) {
[...]
// Define inline styles
const balloonStyles = {
    transitionDuration: `${balloonPoppingTransition}ms` // Use inline style with dynamic value
};

return (
[...]
<div 
    className={isPopped ? 'balloon--popping' : ''}
    onClick={clickHandler}
    style={balloonStyles} // Apply inline styles here
    >
    <div 
        className={classNames}
        style={{ 
            color: color, 
            transitionDuration: `${balloonToggleTransition}ms` // Use inline style with dynamic value
        }}
        >
[...]
```

And finally in `src/components/Balloon/Balloon.css`:

```css
[...]
.balloon {
    max-width: 300px;
    /*transition: all .35s;*/
    transition-property: all;
    margin: 0 auto;
    translate: 0% 100%;
    transform-origin: center;
    opacity: 0;
}
[...]
.balloon--popping {
    transform: scale(2);
    transform-origin: 50% 20%;
    opacity: 0;
    /*transition: all .2s;*/
    transition-property: all;
}
[...]
```

## Stop game and remove all active balloons

I want to remove all active balloons on stop the game, for this i will clear all balloon intervals on stop the game, in `src/components/Game/Game.jsx`:

```js
setGameState(function(prevState) {
    // Clear all balloon intervals on stop the game
    intervalIdsRef.current.forEach((intervalId) => clearInterval(intervalId));

    return {
        ...prevState,
        coverScreenTopPosition: false,
        // Reset activeBalloons
        activeBalloons: [],
    }
});
```

To avoid repeating this code, I want to extract it into a separate function and then call that function when needed, in `src/components/Game/Game.jsx`:

```js
[...]
    const clearIntervals = () => {
        intervalIdsRef.current.forEach((intervalId) => clearInterval(intervalId));
    };
[...]
    const intervalIdsRef = useRef([]);
    useEffect(() => {
        intervalIdsRef.current = [];
[...]
        return () => {
            
            // intervalIdsRef.current.forEach((intervalId) => clearInterval(intervalId));

            clearIntervals();
            
        };
    }, [numberOfBalloons]);
[...]
    const handleGameToggle = useCallback(function(start) {
[...]
        transitionAuxiliarTimerRef.current = setTimeout(
            function() {
                if (start) {
[...]
                } else {
                    setGameState(function(prevState) {

                        // intervalIdsRef.current.forEach((intervalId) => clearInterval(intervalId));

                        clearIntervals();
[...]
                    });
                }
            }, 100
        );
    }, [gameDuration]);
[...]
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #10 - Time Transition Props](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-10) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.