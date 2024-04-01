# Chapter #4 - Part #1 - Game Component

In this chapter I want to set up the main component responsible for controlling the overall game logic and rendering the game interface.

So I create new `src/components/Game/Game.jsx`:

```js
import BalloonGrid from '../BalloonGrid/BalloonGrid';
import "./Game.css";

export default function Game() {
    return (
        <div className="game-container">
            <BalloonGrid />
        </div>
    );
};
```

And corresponding `src/components/Game/Game.css`:

```css
.game-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
```

And I also want to update `src/App.js`:

```js
import './App.css';
// import BalloonGrid from './components/BalloonGrid/BalloonGrid';
import Game from './components/Game/Game';

export default function App() {
    return (
        <div className="App">
            {/*
            <BalloonGrid />
            */}
            <Game />
        </div>
    );
}
```

## Cover Screen Component

Now I want a Cover Screen to manage screens preceding the Balloon Grid.

For this I create new `src/components/CoverScreen/CoverScreen.jsx`:

```js
import "./CoverScreen.css";
import Button from "../Button/Button";

export default function CoverScreen({onStartGame}) {
    return (
        <div className="intro">
            <h1>Pop a Balloon Game</h1>
            <p>
                A basic balloon game built with React.
            </p>
            <Button onClick={onStartGame}>
                Start Game
            </Button>
            <p>
                Source code and content are available on&nbsp;
                <a 
                    href="https://github.com/qbreis/react-pop-a-popup-balloon" 
                    rel="noreferrer" 
                    target="_blank"
                    >Github</a>
                .
            </p>
        </div>
    );
}
```

And corresponding `src/components/CoverScreen/CoverScreen.css`:

```css
.intro {
    text-align: center;
    padding: 1em;
}
```

And then I want to update `src/components/Game/Game.jsx`:

```js
import React, { useState } from "react";
import CoverScreen from '../CoverScreen/CoverScreen';
import BalloonGrid from '../BalloonGrid/BalloonGrid';
import "./Game.css";

export default function Game() {
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        setGameStarted(true);
    };

    return (
        <div className="game-container">
            {/*
            <BalloonGrid />
            */}
            {
            // Conditionally render BalloonGrid or a cover screen based on gameStarted
            }
            {
                !gameStarted 
                ? 
                (<CoverScreen onStartGame={startGame} />) : ( <BalloonGrid /> )
            }
        </div>
    );
};
```