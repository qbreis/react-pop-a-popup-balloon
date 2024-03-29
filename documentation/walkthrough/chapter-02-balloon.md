## Balloon

In this chapter I want to create a Balloon compoenent.

### A Static Ballon

I create a balloon using SVG in `src/components/Balloon/Balloon.jsx`:

```js
import "./Balloon.css";

export default function Balloon({ color }) {

    const balloonWidth = 200;
    const balloonHeight = balloonWidth * 1.17;
    const threadHeight = 150;
    const threadWidth = 10;
    const threadColor = '#ffffff';
    
    return (
        <div className="balloon-cell">
            <div className="balloon-wrapper">
                <div 
                    style={{ color: color }} 
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox={`0 0 ${balloonWidth} ${balloonHeight + threadHeight}`}
                    >
                        <rect
                            x={balloonWidth / 2 - threadWidth / 2}
                            y={balloonHeight}
                            width={threadWidth}
                            height={threadHeight}
                            fill={threadColor}
                            rx={threadWidth / 2}
                        />
                        <polygon
                            points={`${balloonWidth / 2},${balloonHeight - 3} ${
                            balloonWidth / 2 + 12
                            },${balloonHeight + 22} ${balloonWidth / 2 - 12},${
                            balloonHeight + 22
                            }`}
                            fill="currentColor"
                        />
                        <ellipse
                            cx={balloonWidth / 2}
                            cy={balloonHeight / 2}
                            rx={balloonWidth / 2}
                            ry={balloonHeight / 2}
                            fill="currentColor"
                        />
                        <rect
                            x={balloonWidth / 2 - (threadWidth + 18) / 2}
                            y={balloonHeight - 1}
                            width={threadWidth + 18}
                            height={threadWidth}
                            fill={threadColor}
                            rx={threadWidth / 2}
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
```

In `src/components/Balloon/Balloon.css` I have:

```css
svg {
    width: 100%;
}

.balloon {
    max-width: 300px;
    transition: all .35s;
    margin: 0 auto;
}

.balloon-cell { width: 50%;padding: 0.5em; }

.balloon-wrapper {
    position: relative;
    padding: 3em 2em 0;
    overflow: hidden;
    border-radius: 1em;
    background-color: rgba(255, 255, 255, 0.1);
    max-height: 50vmin;
}

@media only screen and (min-width: 800px) {
    .balloon-cell { width: 33.33%;max-width: 280px;  }
    .balloon-wrapper { max-height: calc(50vmin - 5em); }
}
```

Next thing I will just change in `src/App.js` the React logo for a balloon:

```js
// import logo from './logo.svg';
import Balloon from './components/Balloon/Balloon';
import './App.css';

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/*
                <img src={logo} className="App-logo" alt="logo" />
                */}
                <Balloon color="#9980FA" />
                <p>
                    Static ballon!
                </p>
                <a
                    className="App-link"
                    href="https://github.com/qbreis/react-pop-a-popup-balloon/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    React Pop a Popup Ballon
                </a>
            </header>
        </div>
    );
}
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #2 - Part #1 Static Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/blob/main/documentation/walkthrough/chapter-01-setup.md) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.


