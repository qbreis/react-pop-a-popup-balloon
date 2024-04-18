# Chapter #7 - Animating Balloon Screen Caption

In this chapter I want a small animation for game screen caption "Click a balloon" appearing from left or right.

I want to update `src/components/BalloonGrid/BalloonGrid.css`:

```css
[...]
.balloon-grid-caption {
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    color: #ffffff;
    position: absolute;
    width: 100vw;
    bottom: calc(100vh / 2 - 4em);
    transition: all 1000ms;
    background: rgba(255, 0, 0, 0.5);
    z-index: 1;
    pointer-events: none;
    height: 4em;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 80vw;
}

.balloon-grid-caption.active {
    left: 0;
}
[...]
```

Now in `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
[...]
return (
    <div className={`
        balloon-grid-wrapper
        ${gameStarted ? 'gameStarted' : ''}
        ${gameScreenStartTransition ? 'gameScreenStartTransition' : ''}
        `}>
        <div className="game-header">
            {/* I want to use gameScreenStartTransition state var to set this element active */}
            <p className={`
                balloon-grid-caption
                ${!gameScreenStartTransition ? 'active' : ''}
                `}>
                Click a balloon!
            </p>
[...]
```

And I also want to do small update in `src/App.css`:

```css
body {
    font-size: calc(10px + 2vmin);
    background-color: var(--background-color);
    color: var(--color-1);
    margin: 0;
    width: 100vw;/* Full view width */
    height: 100vh;/* Full view height */
    overflow: hidden;/* Avoid scroll bars when absolute positioning with elements that extend beyond the viewport boundaries */
}
```

Now when I click "Start game", caption appears from right of the screen in a soft transition.

I want it to stay for a while and then go back to the right or maybe hiding to left out of viewport boundaries.

I will use a new state var `balloonGridCaptionTransition` in `src/components/Game/Game.jsx`:

```js
[...]
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
[...]
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

        // Set new state var for game caption back to false after 2 seconds
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
[...]
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

                {/* Want to see balloonGridCaptionTransition value at all times */}
                balloonGridCaptionTransition: {gameState.balloonGridCaptionTransition.toString()}<br />
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

        balloonGridCaptionTransition, // To control game screen caption transition
    }
) {
[...]
    return (
[...]
            <div className="game-header">
                {/* I want to use gameScreenStartTransition and balloonGridCaptionTransition state var to set this element active */}
                <p className={`
                    balloon-grid-caption
                    ${
                        !gameScreenStartTransition 
                        && balloonGridCaptionTransition // here comment please
                        ? 'active' : ''
                    }
                    `}>
                    Click a balloon!
                </p>
                <ProgressBar time={timeRemaining} delay={gameTimeDelay} gameDuration={gameDuration} />
                <Button onClick={onStopGame}>
                    Stop
                </Button>
            </div>
[...]
    );
}
```

Now I have what I wanted, when I click "Start game", caption appears from right of the screen in a soft transition, it stays for a while, 2 seconds and then it hides back to the right out of viewport boundaries.

## Ternary state variable

I want the cover screen caption to disappear to the left instead of back to the right. For this I will use ternary state variable, a variable representing three states using string values instead of binary state variable using boolean values.

In `src/components/Game/Game.jsx`:

```js
[...]
export default function Game({numberOfBalloons,gameDuration}) {
    const [gameState, setGameState] = useState({
        gameStarted: false,
        coverScreenTransition: false,
        coverScreenTopPosition: false,
        gameScreenStartTransition: false,

        // Initialize with empty string
        balloonGridCaptionTransition: '',

        timeRemaining: 0
    });
[...]
        transitionAuxiliarTimerRef.current = setTimeout(
            function() {
                if (start) {
                    setGameState(function(prevState) {
                        return {
                            ...prevState,
                            gameScreenStartTransition: false,

                            // Set new state var for game caption to 'active'
                            balloonGridCaptionTransition: 'active',
                        }
                    });
[...]
        // Set new state var for game caption to 'inactive' after 2 seconds
        balloonGridCaptionTransitionRef.current = setTimeout(
            function() {
                if (start) {
                    setGameState(function(prevState) {
                        return {
                            ...prevState,
                            balloonGridCaptionTransition: 'inactive',
                        }
                    });

                } 
            }, 2000
        );

    }, [gameDuration]);
[...]
```

In `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
[...]
<div className="game-header">
    {/* I want to use gameScreenStartTransition and balloonGridCaptionTransition state var to set this element active */}
    <p className={`
        balloon-grid-caption
        ${balloonGridCaptionTransition}
        `}>
        Click a balloon!
    </p>
    <ProgressBar time={timeRemaining} delay={gameTimeDelay} gameDuration={gameDuration} />
    <Button onClick={onStopGame}>
        Stop
    </Button>
</div>
[...]

And in `src/components/BalloonGrid/BalloonGrid.css`:

```css
[...]
.balloon-grid-caption {
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    color: #ffffff;
    position: absolute;
    width: 100vw;
    bottom: calc(100vh / 2 - 4em);
    z-index: 1;
    pointer-events: none;
    height: 4em;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 100vw;
}

.balloon-grid-caption.active {
    left: 0;
    transition: all 1000ms;
}

.balloon-grid-caption.inactive {
    left: -100vw;
    transition: all 1000ms;
}
[...]
```

Although after all this transition for game screen caption I won't need it anymore in the DOM, I want to keep the `balloon-grid-caption` element in the DOM and will just toggle its visibility and transition through the CSS to hide or show it based on the transition state vars.


## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #7 - Animating game screen caption](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-07) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.
