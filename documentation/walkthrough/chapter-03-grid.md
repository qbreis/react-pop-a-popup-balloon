## Grid

In this chapter I want to create a Grid compoenent.

### Balloon Grid component

I do new `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
import Balloon from "../Balloon/Balloon";
import "./BalloonGrid.css";

export default function BalloonGrid() {

    const balloons = [];

    for (let i = 0; i < 6; i++) {
        balloons.push(
            <Balloon
            key={i}
            color="#9980FA"
            />
        );
    }

    return (
        <div className="balloon-grid-wrapper">
            <p className="balloon-grid-caption">Grid of balloons</p>
            <div className="balloon-grid">
                {balloons}
            </div>
        </div>
    );
}
```

Define Css in `src/components/BalloonGrid/BalloonGrid.css`:

```css
.balloon-grid-wrapper {
    padding: 1.5em 1em;
    margin: auto;
    max-width: 960px;
}

@media only screen and (max-height: 768px) {
    .balloon-grid-wrapper { max-width: 800px; }
}

.balloon-grid-caption {
    text-align: center;
    color: var(--sec-color-light);
}
  
.balloon-grid-caption + .balloon-grid {
    margin-top: 1.5em;
}
  
.balloon-grid {
    display: flex;
    flex-wrap: wrap
}
```

I update `src/App.js`:

```js
import './App.css';
import BalloonGrid from './components/BalloonGrid/BalloonGrid';

export default function App() {
    return (
        <div className="App">
            <BalloonGrid />
        </div>
    );
}
```

I also delete `src/logo.svg` and update `src/App.css`:

```css
:root {
  --background-color: #282c34;
  --color-1: #ffffff;
  --color-2: #61dafb;

  box-sizing: border-box;
}

*,
*::before,
*::after {
box-sizing: inherit;
}

body {
font-size: calc(10px + 2vmin);
background-color: var(--background-color);
color: var(--color-1);
margin: 0;
}
```