# Chapter #4 - Part #3 - Refactoring

To refactor my code, I want to consider a few improvements:

- **Consolidate similar logic**: I have similar logic for starting and stopping the game, so I can consolidate it into a single function.

- **Combine useState calls**: If multiple state variables are logically related, I can group them into a single state object.

## Consolidate similar logic

This is my refactored code in `src/components/Game/Game.jsx`:

```js
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

    useEffect(function() {
        const timerRefValue = timerRef.current;
        const secondTimerRefValue = secondTimerRef.current;
        
        return function() {
            clearTimeout(timerRefValue);
            clearTimeout(secondTimerRefValue);
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
        setGameStarted(start);
        setCoverScreenTransition(start);
        setGameScreenStartTransition(true);
        setCoverScreenTopPosition(!start);

        timerRef.current = setTimeout(
            function() {
                setCoverScreenTransition(false);
                setGameScreenStartTransition(false);
            },
            3000
        );

        timerRef.current = setTimeout(
            function() {
                if (start) {
                    setGameScreenStartTransition(false);
                } else {
                    setCoverScreenTopPosition(false);
                }
            }, 100
        );
    }

    return (
        <div className="game-container">
            {(coverScreenTransition || !gameStarted  ) ?
                <CoverScreen 
                    onStartGame={function() {handleGameToggle(true)}} 
                    gameStarted={gameStarted}
                    coverScreenTopPosition={coverScreenTopPosition}
            />
            :''}

            {(gameStarted || gameScreenStartTransition ) ?
                <BalloonGrid 
                    onStopGame={function() {handleGameToggle(false)}} 
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
```

## Combine useState calls

In same `src/components/Game/Game.jsx`:

```js
import React, { useState, useEffect, useRef } from "react";
import CoverScreen from '../CoverScreen/CoverScreen';
import BalloonGrid from '../BalloonGrid/BalloonGrid';
import "./Game.css";

export default function Game() {
    /*
    const [gameStarted, setGameStarted] = useState(false);
    const [coverScreenTransition, setCoverScreenTransition] = useState(false);
    const [coverScreenTopPosition, setCoverScreenTopPosition] = useState(false);
    const [gameScreenStartTransition, setGameScreenStartTransition] = useState(false);
    */
    const [gameState, setGameState] = useState({
        gameStarted: false,
        coverScreenTransition: false,
        coverScreenTopPosition: false,
        gameScreenStartTransition: false
    });

    const timerRef = useRef(null);
    const secondTimerRef = useRef(null);

    useEffect(function() {
        const timerRefValue = timerRef.current;
        const secondTimerRefValue = secondTimerRef.current;
        
        return function() {
            clearTimeout(timerRefValue);
            clearTimeout(secondTimerRefValue);
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
        /*
        setGameStarted(start);
        setCoverScreenTransition(start);
        setGameScreenStartTransition(true);
        setCoverScreenTopPosition(!start);
        */
        /* arrow function syntax 
        setGameState(prevState => ({
            ...prevState,
            gameStarted: start,
            coverScreenTransition: start,
            gameScreenStartTransition: true,
            coverScreenTopPosition: !start,
        }));
        */
        // regular function syntax
        setGameState(function(prevState) {
            return {
                ...prevState,
                gameStarted: start,
                coverScreenTransition: start,
                gameScreenStartTransition: true,
                coverScreenTopPosition: !start
            };
        });

        timerRef.current = setTimeout(
            function() {
                // setCoverScreenTransition(false);
                // setGameScreenStartTransition(false);
                
                /* arrow function syntax 
                setGameState(prevState => ({
                    ...prevState,
                    coverScreenTransition: false,
                    gameScreenStartTransition: false,
                }));
                */

                // regular function syntax
                setGameState(function(prevState) {
                    return {
                        ...prevState,
                        coverScreenTransition: false,
                        gameScreenStartTransition: false
                    };
                });
            },
            3000
        );

        timerRef.current = setTimeout(
            function() {
                if (start) {
                    // setGameScreenStartTransition(false);
                    /*
                    setGameState(prevState => ({
                        ...prevState,
                        gameScreenStartTransition: false,
                    }));
                    */

                    setGameState(function(prevState) {
                        return {
                            ...prevState,
                            gameScreenStartTransition: false,
                        }
                    });

                } else {
                    // setCoverScreenTopPosition(false);
                    /*
                    setGameState(prevState => ({
                        ...prevState,
                        coverScreenTopPosition: false,
                    }));
                    */

                    setGameState(function(prevState) {
                        return {
                            ...prevState,
                            coverScreenTopPosition: false,
                        }
                    });

                }
            }, 100
        );
    }

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
                gameStarted: {gameState.gameStarted.toString()}<br />
                coverScreenTransition: {gameState.coverScreenTransition.toString()}<br />
                coverScreenTopPosition: {gameState.coverScreenTopPosition.toString()}<br />
                {/* Add gameScreenStartTransition to state variables display view */}
                gameScreenStartTransition: {gameState.gameScreenStartTransition.toString()}<br />
            </div>
        </div>
    );
};
```


## Removing dev purpose tricks

Now I want to remove all tricks I did for dev purpose.

Basically in `src/components/Game/Game.css`:

```css
.game-container {
    min-height: 100vh;
}

.intro {
    /*background-color: rgba(255,0,0,.5); *//* Transparent background for dev purpose */
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /*transition: all 3000ms; *//* Slow transitions for dev purpose */
    transition: all 300ms;
}

.intro.gameStarted {
    /*top: -50vh; *//* I don't want to lose sight of for dev purpose */
    top: -100vh;
    pointer-events: none;
    /*opacity: 0.2;*//* Avoid null opacity for dev purpose */
    opacity: 0;
}

.balloon-grid-wrapper {
    /*background-color: rgba(0, 255, 0, .5);*//* Transparent background for dev purpose */
    opacity: 1;
    /*pointer-events: none;*/
    /*transition: all 3000ms; *//* Slow transitions for dev purpose */
    transition: all 300ms;
}

.balloon-grid-wrapper.gameScreenStartTransition {
    /*opacity: 0.2;*//* Avoid null opacity for dev purpose */
    opacity: 0;
}
```

And finally in `src/components/Game/Game.jsx` set timers to 300 msecs.:

```js
[...]
timerRef.current = setTimeout(
    function() {
        setGameState(function(prevState) {
            return {
                ...prevState,
                coverScreenTransition: false,
                gameScreenStartTransition: false
            };
        });
    },
    // 3000
    300
);
[...]
{/*
<div style={{
    position: 'fixed',
    top: 0,
    padding: '1em',
    backgroundColor: 'rgba(255, 255, 255, .2)',
    zIndex: 1,
    fontSize: '0.7em'
    }}>
    <h3>State Vars</h3>
    gameStarted: {gameState.gameStarted.toString()}<br />
    coverScreenTransition: {gameState.coverScreenTransition.toString()}<br />
    coverScreenTopPosition: {gameState.coverScreenTopPosition.toString()}<br />
    gameScreenStartTransition: {gameState.gameScreenStartTransition.toString()}<br />
</div>
*/}
[...]
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #4 - Part #3 - Refactoring](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-04-part-3) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.

## External links

- [Document Object Model](https://en.wikipedia.org/wiki/Document_Object_Model) - The Wikipedia article on DOM.