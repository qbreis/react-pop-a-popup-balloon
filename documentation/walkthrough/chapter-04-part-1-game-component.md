# Chapter #4 - Part #1 - Game Component

In this chapter I want to set up the main component responsible for controlling the overall game logic and rendering the game interface.

So I create new `src/components/Game/Game.jsx`:

```js
import BalloonGrid from '../BalloonGrid/BalloonGrid';

export default function Game() {
    return (
        <div className="game-container">
            <BalloonGrid />
        </div>
    );
};
```

And I also want to update `src/App.js`:

```js
import './App.css';
import Game from './components/Game/Game';

export default function App() {
    return (
        <div className="App">
            <Game />
        </div>
    );
}
```

## Cover Screen Component

Now I want a Cover Screen to manage screens preceding the Balloon Grid.

For this I create new `src/components/CoverScreen/CoverScreen.jsx`:

```js
import Button from "../Button/Button";

export default function CoverScreen({onStartGame}) {
    return (
        <div className="intro">
            <h1>Pop a Balloon Game</h1>
            <p className="description">
                A basic balloon game built with React.<br />
                Source code and content are available on <a href="https://github.com/qbreis/react-pop-a-popup-balloon">Github</a>.
            </p>
            <Button onClick={onStartGame}>
                Start Game
            </Button>
        </div>
    );
}
```