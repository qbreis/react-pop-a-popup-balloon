
# Chapter #4 - Part #2 - Transitions - Game Screen

In this part I want to do Game Screen transition.

## Animating Balloon Grid Game Screen

As I did with Cover Screen in last chapter now I want to do same thing with Game Screen in `src/components/Game/Game.jsx`:

- (1) Pass state variable `gameStarted` to `BalloonGrid`.

```js
[...]
return (
    <div className="game-container">
        <CoverScreen 
            onStartGame={startGame} 
            gameStarted={gameStarted}
        />
        <BalloonGrid 
            onStopGame={stopGame} 
            // (1) Pass state variable `gameStarted`
            gameStarted={gameStarted} 
        />
    </div>
);
[...]
```

And in `src/components/BalloonGrid/BalloonGrid.jsx`:

- (1) Accept `gameStarted` as a prop.
- (2) Assign `gameStarted` as a class name to `intro` (or not) depending on `gameStarted` value.

```js
[...]
export default function BalloonGrid(
    {
        onStopGame,
        gameStarted // (1) Accept `gameStarted` as a prop.
    }
) {
[...]
    return (
        <div className={`
            balloon-grid-wrapper
            ${
                /* (2) Assign `gameStarted` as a class name (or not) depending on `gameStarted` value. */
                gameStarted ? 'gameStarted' : ''
            }
            `}>
[...]
```

And I also want to update `src/components/Game/Game.css`:

```css
.balloon-grid-wrapper {
    background-color: rgba(0, 255, 0, .5); /* Transparent background for dev purpose */
    opacity: 0.2; /* Avoid null opacity for dev purpose */
    pointer-events: none;
    transition: all 3000ms; /* Slow transitions for dev purpose */
}

.balloon-grid-wrapper.gameStarted {
    opacity: 1;
    pointer-events: initial;
}
```

## Removing dev purpose tricks

Now I want to remove all tricks I did for dev purpose.

Basically in `src/components/Game/Game.css`:

```css
.intro {
    /*background-color: rgba(255,0,0,.5); *//* Transparent background for dev purpose */
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /*transition: all 3000ms; *//* Slow transitions for dev purpose */
    transition: all 300ms;
}

.intro.gameStarted {
    /*top: -50vh; *//* I don't want to lose sight of for dev purpose */
    top: -100vh;
    pointer-events: none;
    opacity: 0.2; /* Avoid null opacity for dev purpose */
}

.balloon-grid-wrapper {
    /*background-color: rgba(0, 255, 0, .5); *//* Transparent background for dev purpose */
    /*opacity: 0.2; *//* Avoid null opacity for dev purpose */
    opacity: 0;
    pointer-events: none;
    /*transition: all 3000ms; *//* Slow transitions for dev purpose */
    transition: all 300ms;
}

.balloon-grid-wrapper.gameStarted {
    opacity: 1;
    pointer-events: initial;
}
```

Actually I could leave it like this but as it is, both screens, cover screen and game screen, they remain in the DOM always.

I want elements to be removed from the DOM when they are not needed. In next chapter I want to conditionally render them based on the state. I can achieve this by using conditional rendering.

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #4 - Part #2 - Transitions Part #2 - Game Screen](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-04-part-2-2) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.