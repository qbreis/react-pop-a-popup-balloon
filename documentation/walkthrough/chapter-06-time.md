# Chapter #6 - Adding Time to Game

In this chapter I want to add time counter to game.

## Constants in a separate file

Now I want to add game duration into this game, I also add number of balloons, to do this I will add `src/utils/constants.js`:

```js
const constants = {
    gameDuration: 10, // seconds
    gameCells: 6,
    gameTimeDelay: 10 // milliseconds
};

export default constants;
```

Now I can add game duration and number of balloons in `src/App.js`:

```js
import './App.css';
import Game from './components/Game/Game';
// import new Constants from './utils/constants';
import Constants from "./utils/constants";

export default function App() {
    return (
        <div className="App">
            <Game 
                numberOfBalloons={Constants.gameCells}
                gameDuration={
                    (
                        Constants.gameDuration // seconds
                        * 
                        1000 // 1 second is 1000 miliseconds
                    ) 
                    / 
                    10 // I will decrease 10 miliseconds each time
                }
            />
        </div>
    );
}
```

And accordingly in `src/components/Game/Game.jsx`:

```js
[...]
export default function Game(
    // Pass numberOfBalloons and gameDuration parameters into Game compoennt as props
    {
        numberOfBalloons,
        gameDuration
    }
) {
    const [gameState, setGameState] = useState({
        gameStarted: false,
        coverScreenTransition: false,
        coverScreenTopPosition: false,
        gameScreenStartTransition: false,
        // New game state for remaining time
        timeRemaining: 0 // milliseconds
    });
[...]
    const handleGameToggle = function(start) {
        setGameState(function(prevState) {
            return {
                ...prevState,
                gameStarted: start,
                coverScreenTransition: start,
                gameScreenStartTransition: true,
                coverScreenTopPosition: !start,
                // Updates timeRemaining
                timeRemaining: start ? gameDuration : 0
            };
        });
[...]
    }

    return (
[...]
            {(gameState.gameStarted || gameState.gameScreenStartTransition) ?
                <BalloonGrid 
                    onStopGame={function() {handleGameToggle(false)}} 
                    gameStarted={gameState.gameStarted} 
                    gameScreenStartTransition={gameState.gameScreenStartTransition}
                    // Add numberOfBalloons and timeRemaining
                    numberOfBalloons={numberOfBalloons}
                    timeRemaining={gameState.timeRemaining}
                />
            :''}
            {/* Next is only for development prupose */}
            <div style={{
                position: 'fixed',
                top: 0,
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
            </div>
[...]
```

I still want to Pass `numberOfBalloons` parameter as prop in `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
[...]
export default function BalloonGrid(
    {
        onStopGame,
        gameStarted ,
        gameScreenStartTransition,

        // Pass numberOfBalloons and timeRemaining parameters as props
        numberOfBalloons,
        timeRemaining
    }
) {
    const [activeBalloons, setActiveBalloons] = useState([]);
    useEffect(() => {
        const toggleBalloons = () => {
            const randomActiveBalloons = Array.from(
                { 
                    // numberOfBalloons parameter
                    length: numberOfBalloons
                }, 
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
            setActiveBalloons(randomActiveBalloons);
        };
        toggleBalloons();
        const intervalId = setInterval(toggleBalloons, 1000);
        return () => clearInterval(intervalId);
    }, [numberOfBalloons]);

    const balloons = [];

    // numberOfBalloons parameter
    for (let i = 0; i < numberOfBalloons; i++) {
        balloons.push(
            <Balloon
            key={i}
            color="#9980FA"
            isActive={activeBalloons.includes(i)}
            />
        );
    }
[...]
```

Now I can see in "State Vars", when I click "Start Game", `timeRemaining` is set to `1000`.

Now I will set the delay for this `timeRemaining`, still in `src/components/Game/Game.jsx`:

```js
import React, { useState, useEffect, useRef } from "react";
import CoverScreen from '../CoverScreen/CoverScreen';
import BalloonGrid from '../BalloonGrid/BalloonGrid';
// import new Constants from './utils/constants';
import Constants from "../../utils/constants";
import "./Game.css";
[...]
useEffect(function() {
    const transitionTimerRefValue = transitionTimerRef.current;
    const transitionAuxiliarTimerRefValue = transitionAuxiliarTimerRef.current;
    // Check if the game has started before setting up the interval
    if (gameState.gameStarted) {
        // Start interval to decrement timeRemaining every 10 milliseconds
        const gameTimeInterval = setInterval(
            function() {
                if(gameState.timeRemaining > 0) {
                    setGameState(function(prevState) {
                        return {
                            ...prevState,
                            timeRemaining: prevState.timeRemaining - 1
                        };
                    });
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

}, [gameState.gameStarted, gameState.timeRemaining]);
[...]
```

Now when "Start Game" I can see in "State Vars", `timeRemaining` is set to `1000` and starts to decrease by 1 every 10 milliseconds until it reaches `0`.

If I click "Stop" before reaching `0`, `timeRemaining` is set to `0` and we go back to cover screen.

## Time score component

Now I want to set new component to see the remaining time in `src/components/GameScore/GameScore.js`:

```js
import calculateSeconds from "../../utils/calculateSeconds";

export default function GameScore({time, delay}) {
    return (
        <div className="game-score">
            {
            calculateSeconds(time, delay)
            }s remaining
        </div>
    );
};
```

And I also need new `src/utils/calculateSeconds`:

```js
/*
This code calculates the remaining time in seconds based on the time remaining in milliseconds and a specified game time delay also in milliseconds.
*/
export default function calculateSeconds(time, delay) {
    return Math.ceil(
        time // in millisenonds
        / 
        (
            1000 // 1 second is 1000 milliseconds
            / 
            delay // I will decrease 10 miliseconds each time
        )
    );
};
```

Now I can import `GameScore` component into `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
import React, { useState, useEffect } from 'react'; 
import Balloon from "../Balloon/Balloon";
import Button from "../Button/Button";

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

        // Pass gameTimeDelay parameter as prop
        gameTimeDelay

    }
) {
[...]
    return (
        <div className={`
            balloon-grid-wrapper
            ${gameStarted ? 'gameStarted' : ''}
            ${gameScreenStartTransition ? 'gameScreenStartTransition' : ''}
            `}>
            <div className="game-header">
                <p className="balloon-grid-caption">
                    Click a balloon!
                </p>

                {/* New GameScore component */}
                <GameScore time={timeRemaining} delay={gameTimeDelay} />
[...]
```

And finally in `src/components/Game/Game.jsx`:

```js
[...]
<BalloonGrid 
    onStopGame={function() {handleGameToggle(false)}} 
    gameStarted={gameState.gameStarted} 
    gameScreenStartTransition={gameState.gameScreenStartTransition}

    numberOfBalloons={numberOfBalloons}
    timeRemaining={gameState.timeRemaining}

    // Add gameTimeDelay
    gameTimeDelay={Constants.gameTimeDelay}
/>
[...]
```

Now when I click "Start Game", I can see in "State Vars" milliseconds decreasing as I also can see on the top the remaining seconds until reaching `0`.

Next I want to go back to cover screen on reaching `0`.

In `src/components/Game/Game.jsx`:

```js
import React, { useState, useEffect, useRef,
    useCallback // Adding useCallback hook from React
} from "react";
[...]
    // Transition from a regular function to a useCallback hook to optimize performance in React components by memoizing the function.
    // const handleGameToggle = function(start) {
    const handleGameToggle = useCallback(function(start) {
[...]
    }, [gameDuration]);

    useEffect(function() {
[...]
        if (gameState.gameStarted) {
            const gameTimeInterval = setInterval(
                function() {
[...]
                    } else {
                        handleGameToggle(false);
                    }
                }, 
[...]
            );
[...]
    }, [gameState.gameStarted, gameState.timeRemaining, 
        handleGameToggle // adding handleGameToggle
    ]);
[...]
```

Now when I click "Start Game" time starts decreasing and when reaching `0` it returns to cover screen.

## Adding progress bar for remaining time

I do new in `ProgressBar` component in `src/components/ProgressBar/ProgressBar.js`:

```js
import calculateSeconds from "../../utils/calculateSeconds";
import "./ProgressBar.css";

export default function ProgressBar({time, delay, gameDuration}) {
    const percentageRemaining = (time / gameDuration) * 100;
    const className = getClassName(percentageRemaining);

    return (
        <div className={className}>
            <div className="remaining-time" style={{
                width: `calc( 
                    (100% * ${time})
                    /
                    ${gameDuration}
                )`
            }}></div>
            <div className="remaining-time-in-seconds">
                {
                calculateSeconds(time, delay)
                }s ({percentageRemaining.toFixed(0)}%) remaining 
            </div>
            
        </div>
    );
};

function getClassName(percentageRemaining) {
    let className = "progress-bar";
    if (percentageRemaining < 50) {
        className += " less-than-half";
    }
    if (percentageRemaining < 20) {
        className += " less-than-20-percent";
    }
    if (percentageRemaining < 10) {
        className += " less-than-10-percent";
    }
    return className;
}
```

I also want to do new [src/components/ProgressBar/ProgressBar.css](https://github.com/qbreis/react-pop-a-popup-balloon/blob/main-chapter-06/src/components/ProgressBar/ProgressBar.css).

In `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
import React, { useState, useEffect } from 'react'; 
import Balloon from "../Balloon/Balloon";
import Button from "../Button/Button";
// import GameScore from "../GameScore/GameScore";

// Import ProgressBar component
import ProgressBar from "../ProgressBar/ProgressBar";

import "./BalloonGrid.css";

export default function BalloonGrid(
    {
        onStopGame,
        gameStarted ,
        gameScreenStartTransition,
        numberOfBalloons,
        timeRemaining,
        gameTimeDelay,

        // I will need gameDuration to calculate remaining time percentage in new ProgressBar component
        gameDuration
    }
) {
[...]
{/* New ProgressBar component */}
<ProgressBar time={timeRemaining} delay={gameTimeDelay} gameDuration={gameDuration} />

{/*<GameScore time={timeRemaining} delay={gameTimeDelay} />*/}
```

And finally in `src/components/Game/Game.jsx`:

```js
[...]
<BalloonGrid 
    onStopGame={function() {handleGameToggle(false)}} 
    gameStarted={gameState.gameStarted} 
    gameScreenStartTransition={gameState.gameScreenStartTransition}
    numberOfBalloons={numberOfBalloons}
    timeRemaining={gameState.timeRemaining}
    gameTimeDelay={Constants.gameTimeDelay}
    // I will need gameDuration to calculate remaining time percentage
    gameDuration={gameDuration}
/>
[...]
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #6 - Adding Time](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-06) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.
