# Chapter 13 - Color balloons

In this chapter I want to have different color balloons.

I want to add color balloons in `src/utils/constants.js`:

```js
const constants = {
[...]
    colors: [ '#9980FA', '#de76e7', '#ff6670', '#ffc73c', '#00ffcc', '#6cade5']
};
export default constants;
```

I want to have a new state variable as an array containing as many random colors as balloons.

In `src/components/Game/Game.jsx`:

```js
[...]
export default function Game({ numberOfBalloons, gameDuration }) {

    const randomColorsArray = Array.from({ length: Constants.gameCells }, () => {
        const randomIndex = Math.floor(Math.random() * Constants.colors.length);
        return Constants.colors[randomIndex];
    });

    const [gameState, setGameState] = useState({
[...]
        // state variable as an array containing as many random colors as balloons.
        balloonColors: randomColorsArray,
    });
[...]
    return (
        <div className="game-container">
[...]
            {(gameState.gameStarted || gameState.gameScreenStartTransition) ?
                <BalloonGrid 
[...]
                    balloonColors={gameState.balloonColors}
                />
            :''}
            
            <div style={{
[...]
                }}>
[...]
                balloonColors: {gameState.balloonColors.toString()}<br />
            </div>
[...]
```

And finally, in `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
[...]
export default function BalloonGrid(
    {
[...]
        balloonColors
    }
) {
[...]
    for (let i = 0; i < numberOfBalloons; i++) {
        balloons.push(
            <Balloon
                key={i}
                //color="#9980FA"
                color={balloonColors[i]}
                isActive={activeBalloons.includes(i)}
                onClick={() => handleBalloonClick(i)}
                balloonToggleTransition={balloonToggleTransition}
                balloonPoppingTransition={balloonPoppingTransition}
                coinCounterDelay={coinCounterDelay}
            />
        );
    }
[...]
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #14 - Color balloons](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-14) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.