# Chapter 11 - Coin Counter

In this chapter I want to add "coin counter" effect every time I pop a balloon.

I do new coin counter component in `src/components/CoinCounter/CoinCounter.js`:

```js
import "./CoinCounter.css";

export default function CoinCounter() {
    return (<div className="CoinCounter">1 pop</div>);
};
```

Corresponding `src/components/CoinCounter/CoinCounter.css`:

```css
.CoinCounter {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100px;
    top: 30%;
    text-align: center;
    z-index: 1;
    pointer-events: none;
    font-weight: bold;
    animation-name: element-moving;
    animation-duration: 700ms;
    animation-timing-function: ease-in-out;
    animation-delay: 0s; /* I can adjust this value if needed */
    animation-fill-mode: forwards;
}
@keyframes element-moving {
    0% { 
        top: 30%;
        opacity: 1; 
    }
    100% {
        top: 0;
        opacity: 0;
    }
}
```

Add new Coin Counter into `src/components/Balloon/Balloon.jsx`:

```js
import "./Balloon.css";
import React, { useState, useEffect } from 'react';
import CoinCounter from '../../components/CoinCounter/CoinCounter';
export default function Balloon({ color, isActive, onClick }) {
[...]
    return (
        <div className="balloon-cell">
            {(isPopped && !isActive) ?
                <CoinCounter />
            :''}
            <div className="balloon-wrapper">
[...]
```

Now I want to parametrize coin counter delay as I did with balloon transitions, in `src/components/CoinCounter/CoinCounter.js`:

```js
import "./CoinCounter.css";

export default function CoinCounter({ coinCounterDelay }) {
    return (
        <div 
            className="CoinCounter" 
            style={{
                animationDuration: `${coinCounterDelay}ms`
            }}
        >
    );
};
```

In `src/components/CoinCounter/CoinCounter.css`:

```css
.CoinCounter {
[...]
    /*animation-duration: 700ms;*/
[...]
}
```

In `src/components/Balloon/Balloon.jsx`:

```js
[...]
import "./Balloon.css";
import React, { useState, useEffect } from 'react';
import CoinCounter from '../../components/CoinCounter/CoinCounter';
export default function Balloon({ 
    color, 
    balloonToggleTransition,
    balloonPoppingTransition, 
    isActive, 
    onClick,

    coinCounterDelay
}) {
[...]
            const id = setTimeout(
                () => 
                {
                    setIsPopped(false);
                }, 
                // balloonPoppingTransition
                coinCounterDelay
            );
[...]
    return (
        <div className="balloon-cell">
            {(isPopped && !isActive) ?
                <CoinCounter coinCounterDelay={coinCounterDelay} />
            :''}
[...]
```

In `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
[...]
export default function BalloonGrid(
    {
[...]
        coinCounterDelay
    }
) {
[...]
    const balloons = [];
    for (let i = 0; i < numberOfBalloons; i++) {
        balloons.push(
            <Balloon
                key={i}
                color="#9980FA"
                isActive={activeBalloons.includes(i)}
                onClick={() => handleBalloonClick(i)}
                balloonToggleTransition={balloonToggleTransition}
                balloonPoppingTransition={balloonPoppingTransition}

                coinCounterDelay={coinCounterDelay}
            />
        );
    }
[...]
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
    balloonPoppingTransition={Constants.balloonPoppingTransition}

    coinCounterDelay={Constants.coinCounterDelay}
/>
[...]
```

And finally in `src/utils/constants.js`:

```js
const constants = {
    gameDuration: 10, // seconds
    gameCells: 6,
    gameTimeDelay: 10, // milliseconds
    balloonTogglingRandomnessLimits: { 
        upper: 3000, // milliseconds
        lower: 1000, // milliseconds
    },
    balloonToggleTransition: 350, // milliseconds
    balloonPoppingTransition: 350, // milliseconds

    coinCounterDelay: 700,
};

export default constants;
```

## Fixing small bug

Now I see small bug, when I stop the game and then start over, no ballons are coming!

The `useEffect` in `src/components/Game/Game.jsx` sets up intervals that periodically call generateRandomBalloon to add or remove random balloons from the game state, and it ensures that these intervals are cleaned up when the component unmounts or when certain dependencies change.

The `useEffect` hook takes an optional second argument, which is an array of dependencies. These dependencies specify when the effect should be re-run.

In this case, the `useEffect` hook has `[numberOfBalloons]` as its dependency array. This means that the effect will re-run if `numberOfBalloons` changes between renders.

And that is why no ballons are coming when I start over the game, as long as `numberOfBalloons` did not change. To solve this small bug I just add here another dependency, `[numberOfBalloons, gameState.gameStarted]`, to re-run this effect when either `numberOfBalloons` or `gameState.gameStarted` changes between renders.

In `src/components/Game/Game.jsx`:

```js
[...]
useEffect(() => {
    intervalIdsRef.current = [];
[...]
}, [numberOfBalloons, gameState.gameStarted]);
[...]
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #11 - Time Transition Props](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-11) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.