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

Now I have different random color balloons, but each color is attached to one same position or index. I would like, after one balloon disappears in one specific position, as well as when I pop a balloon in that specific position, next time one balloon appears in the same position, to have different color.

And I also want to see Constant.colors in cover screen for dev purposes only.

So in `src/components/Game/Game.jsx`:

```js
[...]
    useEffect(() => {
        if (gameState.gameStarted) {
[...]
            const transitionTimeout = setTimeout(
                () => {

                    setGameState(prevState => {
                        /*
                        Having:
                        gameState.activeBalloons = [ 1, 3 ]
                        and
                        Constants.gameCells: 6

                        I want to have [0, 2, 4, 5]
                        ... that is, all indexes until 6 which are not in activeBalloons array
                        */

                        // Generate an array of all indexes until Constants.gameCells
                        const allIndexes = Array.from({ length: Constants.gameCells }, (_, index) => index);

                        // Filter out indexes that are present in gameState.activeBalloons
                        const indexesNotInActiveBalloons = allIndexes.filter(
                            index => !gameState.activeBalloons.includes(index)
                        );

                        /*
                        Now I want to change index 0, 2, 4, 5 (in previous indexesNotInActiveBalloons array) in gameState.balloonColors
                        */
                        const newColors = prevState.balloonColors.map((color, index) => {
                            if (indexesNotInActiveBalloons.includes(index)) {
                                return Constants.colors[Math.floor(Math.random() * Constants.colors.length)];
                            }
                            return color;
                        });

                        return {
                            ...prevState,
                            balloonColors: newColors,
                        }
                    });
[...]
                }, 
                Constants.balloonToggleTransition
            );
[...]
        }
    }, [numberOfBalloons, gameState.gameStarted, gameState.activeBalloons,
        gameState.colors,
        gameState.transitionalActiveBalloons,
    ]);
[...]
            <div>
                {Constants.colors.map((color, index) => (
                <div
                    key={index}
                    style={{
                    backgroundColor: color,
                    padding: '5px',
                    margin: '5px',
                    borderRadius: '5px'
                    }}
                >
                    {color}
                </div>
                ))}
            </div>
[...]
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #14 - Color balloons](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-14) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.