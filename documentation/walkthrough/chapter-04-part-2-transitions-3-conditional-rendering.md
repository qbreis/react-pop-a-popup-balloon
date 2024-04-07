# Chapter #4 - Part #2 - Transitions - Conditional Rendering

I want elements to be removed from the DOM when they are not needed. I want to conditionally render them based on the state. I can achieve this by using conditional rendering in React.

## Back to dev purpose view

I want to go back to my devvelopment css, so in `src/components/Game/Game.css`:

```css
[...]
.intro {
    background-color: rgba(255,0,0,.5);/* Transparent background for dev purpose */
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
    transition: all 3000ms;/* Slow transitions for dev purpose */
    /* transition: all 300ms; */
}

.intro.gameStarted {
    top: -50vh;/* I don't want to lose sight of for dev purpose */
    /* top: -100vh; */
    pointer-events: none;
    opacity: 0.2;
}

.balloon-grid-wrapper {
    background-color: rgba(0, 255, 0, .5);/* Transparent background for dev purpose */
    opacity: 0.2;/* Avoid null opacity for dev purpose */
    /*opacity: 0;*/
    pointer-events: none;
    transition: all 3000ms;/* Slow transitions for dev purpose */
    /*transition: all 300ms;*/
}
[...]
```

And still in `src/components/Game/Game.jsx` i want:

- (1) Add variable state `transition`, on mount set to false, to keep tracking of cover screen transition state.
- (2) Setting variable state `transition` to true when click on start game.
- (3) I want to set variable state `transition` to false after some msecs to give time to the transitional effect for cover screen.
- (4) At this point, I also want visual variable states at all times for dev purpose in same DOM.

```js
[...]
export default function Game() {
    const [gameStarted, setGameStarted] = useState(false);
    // (1) I want to add variable state `transition`, on mount set to false
    const [transition, setTransition] = useState(false);

    const startGame = () => {
        setGameStarted(true);
        // (2) Setting variable state transition to true when click on start game
        setTransition(true);

        // (3) I want to set variable state transition to false after some msecs to give time to the transitional effect
        const timer = setTimeout(
            () => {
                setTransition(false);
            }, 
            // Slow transitions for dev purpose
            3000
        );
    };
[...]
    return (
        <div className="game-container">
            <CoverScreen 
                onStartGame={startGame} 
                gameStarted={gameStarted}
            />
            <BalloonGrid 
                onStopGame={stopGame} 
                gameStarted={gameStarted} 
            />
            ${/* (4) Visual variable states at all times for dev purpose */}
            <div style={{
                position: 'fixed',
                top: 0,
                padding: '1em',
                backgroundColor: 'rgba(255, 255, 255, .2)',
                zIndex: 1,
                fontSize: '0.7em'
                }}>
                <h3>Variable states</h3>
                gameStarted: {gameStarted.toString()}<br />
                transition: {transition.toString()}<br />
            </div>
        </div>
    );
};
```

## Clearing timer


chapter-04-part-2-transitions-3-conditional-rendering.md

For this i compare github online branch `main-chapter-04-part-2-b-1` and updates the corresponding local branch `main-chapter-04-part-2-2`.



## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #4 - Part #2 - Transitions Part #2 - Game Screen](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-04-part-2-2) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.

## External links

- [Document Object Model](https://en.wikipedia.org/wiki/Document_Object_Model) - The Wikipedia article on DOM.