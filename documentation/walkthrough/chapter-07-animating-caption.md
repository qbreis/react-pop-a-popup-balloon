# Chapter #7 - Animating Balloon Screen Caption

In this chapter I want a small animation for game screen caption "Click a balloon" appearing from right to left.

I want to update `src/components/BalloonGrid/BalloonGrid.css`:

```css
[...]
.balloon-grid-caption {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
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
    animation: fadeInOut 4s forwards;
}

@keyframes fadeInOut {
    0% {
        left: 100vw;
        opacity: .2;
    }
    40% {
        left: 0;
        right: 0;
        opacity: 1;
    }
    60% {
        left: 0;
        right: 0;
        opacity: 1;
    }
    100% {
        left: -100vw;
        opacity: .2;
    }
}

.balloon-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
[...]
```

And I also want to do small update in `src/App.css`:

```css
[...]
body {
    font-size: calc(10px + 2vmin);
    background-color: var(--background-color);
    color: var(--color-1);
    margin: 0;
    width: 100vw;/* Full view width */
    height: 100vh;/* Full view height */
    overflow: hidden;/* Avoid scroll bars when absolute positioning with elements that extend beyond the viewport boundaries */
}
[...]
```

