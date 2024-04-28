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
        forbiddenColorsPositions: indexesOfForbiddenColors
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
                            forbiddenColorsPositions: indexesOfForbiddenColors
                        }
                    });
[...]
            <div style={{
[...]
                forbiddenColorsPositions: {gameState.forbiddenColorsPositions.toString()}<br />
            </div>
[...]
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #15 - Do not pop red balloon](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-15) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.
