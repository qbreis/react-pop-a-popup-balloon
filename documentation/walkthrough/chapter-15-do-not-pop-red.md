# Chapter 15 - Do not pop red balloon

In `src/utils/constants.js` I set:

```js
[...]
    colors: [ '#9980FA', '#ff6670', '#e3f33e' ],
    forbiddenColors: [ '#ff6670' ]
[...]
```

In `src/components/Game/Game.jsx`:

```js
[...]
export default function Game({ numberOfBalloons, gameDuration }) {
[...]
    const indexesOfForbiddenColors = [];
    randomColorsArray.forEach((color, index) => {
        if (Constants.forbiddenColors.includes(color)) {
            indexesOfForbiddenColors.push(index);
        }
    });
[...]
    const [gameState, setGameState] = useState({
[...]
        forbiddenColorPositions: indexesOfForbiddenColors
    });
[...]
            const transitionTimeout = setTimeout(
                () => {
                    setGameState(prevState => {
[...]
                        const indexesOfForbiddenColors = [];
                        newColors.forEach((color, index) => {
                            if (Constants.forbiddenColors.includes(color)) {
                                indexesOfForbiddenColors.push(index);
                            }
                        });
                        return {
                            ...prevState,
                            balloonColors: newColors,
                            forbiddenColorPositions: indexesOfForbiddenColors
                        }
                    });
[...]
            <div style={{
[...]
                forbiddenColorPositions: {gameState.forbiddenColorPositions.toString()}<br />
            </div>
[...]
```

To avoid repeating code and improve readability, I want to extract the logic for generating random colors array and calculating indexes of forbidden colors into separate functions in `src/components/Game/Game.jsx`:

```js
[...]
function generateRandomColorsArray() {
    return Array.from({ length: Constants.gameCells }, () => {
        const randomIndex = Math.floor(Math.random() * Constants.colors.length);
        return Constants.colors[randomIndex];
    });
}

function calculateForbiddenColorPositions(colorsArray) {
    const indexesOfForbiddenColors = [];
    colorsArray.forEach((color, index) => {
        if (Constants.forbiddenColors.includes(color)) {
            indexesOfForbiddenColors.push(index);
        }
    });
    return indexesOfForbiddenColors;
}

export default function Game({ numberOfBalloons, gameDuration }) {

    const [gameState, setGameState] = useState({
[...]
        balloonColors: generateRandomColorsArray(),
        forbiddenColorPositions: []
    });
[...]
            const transitionTimeout = setTimeout(
                () => {
                    setGameState(prevState => {
                        const allIndexes = Array.from({ length: Constants.gameCells }, (_, index) => index);
                        const indexesNotInActiveBalloons = allIndexes.filter(
                            index => !gameState.activeBalloons.includes(index)
                        );
                        const newColors = prevState.balloonColors.map((color, index) => {
                            if (indexesNotInActiveBalloons.includes(index)) {
                                return Constants.colors[Math.floor(Math.random() * Constants.colors.length)];
                            }
                            return color;
                        });
                        return {
                            ...prevState,
                            balloonColors: newColors,
                            forbiddenColorPositions: calculateForbiddenColorPositions(newColors)
                        }
                    });
[...]
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #15 - Do not pop red balloon](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-15) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.
