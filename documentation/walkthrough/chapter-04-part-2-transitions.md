# Chapter #4 - Part #2 - Transitions

In this chapter I want to do transition between cover screen and balloon grid screen.

## Adding Stop Button to the game

First I want to add a button to go back to cover screen and for this I want:

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

## Transitions

For this i compare github online branch `main-chapter-04-part-2-b-1` and updates the local branch `main-chapter-04-part-2`.

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #4 - Part #2 - Transitions](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-04-part-2) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.