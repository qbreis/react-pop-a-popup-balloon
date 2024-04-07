# Chapter #4 - Part #2 - Transitions - Cover Screen

In this chapter I want to do transition between cover screen and balloon grid screen.

In this part I want to do Cover Screen transition.

## Adding Stop Button to the game

First I want to add a button to go back to cover screen when I am in balloon grid screen.

For this I want:

- (1) Add state-changing function to stop the game.
- (2) Pass stopGame function down as a prop to the BalloonGrid component.

I update `src/components/Game/Game.jsx`:

```js
[...]
export default function Game() {

[...]

    // (1) Add state-changing function to stop the game
    const stopGame = () => {
        setGameStarted(false);
    };

[...]

    return (
        <div className="game-container">
            {
                !gameStarted 
                ? 
                (<CoverScreen onStartGame={startGame} />) 
                : 
                // (2) Pass stopGame function down as a prop to the BalloonGrid component
                (<BalloonGrid onStopGame={stopGame} />)
            }
        </div>
    );
};
```

Now I want in order to add Stop button in `src/components/BalloonGrid/BalloonGrid.jsx`:

- (1) Importing the Button component from its location.
- (2) Accept onStopGame as a prop
- (3) Adding button to stop the game, triggering an action from the child component (BalloonGrid) to the parent component (Game).

```js
import React, { useState, useEffect } from 'react'; 
import Balloon from "../Balloon/Balloon";
// (1) Importing the Button component from its location.
import Button from "../Button/Button";
import "./BalloonGrid.css";

export default function BalloonGrid(
    {onStopGame} // (2) Aaccept onStopGame as a prop.
) {

[...]

    return (
        <div className="balloon-grid-wrapper">
            <div className="game-header">
                <p className="balloon-grid-caption">
                    Click a balloon!
                </p>
                {/* (3) Button to stop the game,
                    triggering an action from the child component (BalloonGrid)
                    to the parent component (Game). */}
                <Button onClick={onStopGame}>
                    Stop
                </Button>
            </div>
            <div className="balloon-grid">
                {balloons}
            </div>
        </div>
    );
}
```

## Animating Cover Screen

Regarding `src/components/Game/Game.jsx` I want:

- (1) To show both `CoverScreen` and `BalloonGrid` in `game-container`.
- (2) Pass state variable `gameStarted` as a class name to `CoverScreen`, I don't want to be confused here, I am not passing state variable, but depending on `gameStarted` state variable value I will pass a class name `gameStarted` or not.

```js
[...]
<div className="game-container">
    {/*
        !gameStarted 
        ? 
        (<CoverScreen onStartGame={startGame} />) 
        : 
        // Pass stopGame function down as a prop to the BalloonGrid component.
        (<BalloonGrid onStopGame={stopGame} />)
    */}
    {/* (1) Show both `CoverScreen` and `BalloonGrid` in `game-container`. */}
    <CoverScreen 
        onStartGame={startGame} 
        // (2) Pass state variable `gameStarted` as a class name
        gameStarted={gameStarted}
    />
    <BalloonGrid onStopGame={stopGame} />
</div>
[...]
```

In `src/components/CoverScreen/CoverScreen.jsx`:

- (1) Accept `gameStarted` as a prop.
- (2) Assign `gameStarted` as a class name to `intro` (or not) depending on `gameStarted` value.
- (3) Nest all `intro` div elements in a container div, thinking on parent `intro` behave as display flex.

```js
[...]
export default function CoverScreen({
    onStartGame, 
    gameStarted // (1) Pass state variable `gameStarted` as a class name
}) {
    return (
        <div className={`
            intro
            ${/* (2) Assign `gameStarted` as a class name to `intro` (or not) depending on `gameStarted` value. */}
            ${gameStarted ? 'gameStarted' : ''}
            `}>
            {/* (3) Nest all `intro` div elements in a container div, thinking on parent `intro` behave as display flex. */}
            <div>
                <h1>Pop a Balloon Game</h1>
[...]
```

And I also want to update `src/components/Game/Game.css`:

- I know I should define all these css in corresponding `src/components/CoverScreen/CoverScreen.css` but for the moment I want to have all transitions in one same place.
- For the moment I want to assign slow transitions, so I can see the behavior, as well as avoiding null opacities.

```css
.game-container {
    /*
    display: flex;
    justify-content: center;
    align-items: center;
    */
    min-height: 100vh;
}

.intro {
    background-color: rgba(255,0,0,.5); /* Transparent background for dev purpose */
    position: absolute;
    z-index: 1; /* Display over game elements */
    left: 0;        /* horizontal centering absolute div */
    right: 0;       /* horizontal centering absolute div */
    margin: 0 auto; /* horizontal centering absolute div */
    top: 0;             /* Full screen display */
    min-height: 100vh;  /* Full screen display */
    display: flex;              /* Flex behavior */
    justify-content: center;    /* Flex behavior */
    align-items: center;        /* Flex behavior */
    transition: all 3000ms; /* Slow transitions for dev purpose */
}

.intro.gameStarted {
    top: -50vh; /* I don't want to lose sight of for dev purpose */
    pointer-events: none;
    opacity: 0.2; /* Avoid null opacity for dev purpose */
}

.balloon-grid-wrapper {
    background-color: rgba(0,255,0,.5);
}
```

Now I can see when click on Start Game how Cover Screen slides up and loses opacity, in addition to becoming no longer active when you click on it when pointer events are set to none.

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #4 - Part #2 - Transitions Part #1 - Cover Screen](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-04-part-2-1) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.