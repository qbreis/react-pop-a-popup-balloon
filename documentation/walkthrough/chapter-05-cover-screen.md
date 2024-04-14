# Chapter #5 - Adding Balloon to Cover Screen

In this chapter I will add a Balloon to Cover Screen.

In `src/components/CoverScreen/CoverScreen.jsx`:

```js
import "./CoverScreen.css";
import Button from "../Button/Button";
// Import Balloon component into Cover Screen component
import Balloon from "../Balloon/Balloon";
[...]
            {/* Add inline CSS directly to the HTML element to set z-index property */}
            <div style={{zIndex: 1}}>
                <h1>Pop a Balloon Game</h1>
[...]
            {/* Add Balloon component */}
            <Balloon color="#9980FA" isActive="true" />
        </div>
    );
}
```

And the I add corresponding CSS styles in `src/components/CoverScreen/CoverScreen.css`:

```css
.intro {
    text-align: center;
    padding: 1em;
}

.intro .balloon-cell {
    position: absolute;
    height: 100vh;
    width: 100vw;
    max-width: 100%;
    z-index: 0;
    pointer-events: none;
}

.intro .balloon-wrapper {
    max-height: 100vh;
    height: 100vh;
    left: 0;
    right: 0;
    background-color: transparent;
}

.intro .balloon-wrapper .balloon {
    opacity: 0.7;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1em;
}

@media only screen and (min-width: 1400px) {
    .intro .balloon-wrapper .balloon{
        max-width: 400px;
    }
}
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #5 - Adding Balloon to Cover Screen](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-05) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.