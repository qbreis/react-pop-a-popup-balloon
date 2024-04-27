# Chapter 12 - Fixing bugs

Testing the game, I see a small inconsistency and it seems that sometimes, even if I hit a balloon, it is not counted on the scoreboard.

To find out where this is coming from I decide to slow down the whole game interaction first.

In `src/utils/constants.js`:

```js
const constants = {
    gameDuration: 1000000, // 10, // seconds
    gameCells: 6,
    gameTimeDelay: 10, // milliseconds
    balloonTogglingRandomnessLimits: { 
        upper: 4000, // 3000, // milliseconds
        lower: 4000, // 1000, // milliseconds
    },
    balloonToggleTransition: 2000, // 350, // milliseconds
    balloonPoppingTransition: 2000, // 350, // milliseconds
    coinCounterDelay: 1000, // 700,
};

export default constants;
```

Now I can see what is happening, when balloons are toggling, `activeBalloons` are updated and then transition effect starts for the balloon to swipe down and dissapear, when I clck the balloon meanwhile the transition, the balloon index is not anymore in `activeBalloons` and thus it does not score.

My idea is, first, setting one state variable to know if this transition is happening and secondly, setting another state variable to have one copy of the active balloons before they change.

Later on, when one balloon is popped, in order to know if it has to score or not, I will want to check if the index of the balloon is in any of the active balloons or either in any of the previous active balloons which they are possibly transitioning before they completely disappear.

So first in `src/components/Game/Game.jsx`:

```js
[...]
export default function Game({
    numberOfBalloons,
    gameDuration
}) {
    const [gameState, setGameState] = useState({
        gameStarted: false,
        coverScreenTransition: false,
        coverScreenTopPosition: false,
        gameScreenStartTransition: false,
        timeRemaining: 0,
        activeBalloons: [],
        score: 0,

        transitioning: false, // state variable to know if the toggle balloons transition is happening
        transitionalActiveBalloons: [], // state variable to have one copy of the active balloons before they change
    });
[...]
    useEffect(() => {
        if (gameState.gameStarted) { // only while game is on
            intervalIdsRef.current = [];
            const generateRandomBalloon = () => {
                setGameState(prevState => {
                    const randomBalloonId = Math.floor(Math.random() * numberOfBalloons);
                    const newActiveBalloons = prevState.activeBalloons.includes(randomBalloonId)
                        ? prevState.activeBalloons.filter(activeId => activeId !== randomBalloonId)
                        : [...prevState.activeBalloons, randomBalloonId];
                    return {
                        ...prevState,
                        activeBalloons: newActiveBalloons,
                        transitioning: true, // Flag to indicate toggle balloons transition is on
                    };
                });
            };
[...]
            const transitionTimeout = setTimeout(() => {
                setGameState(prevState => ({
                    ...prevState,
                    transitioning: false,
                    transitionalActiveBalloons: prevState.activeBalloons, // Save copy of the active balloons before they will change
                }));
            }, Constants.balloonToggleTransition);
            const transitionTimeout = setTimeout(
                () => {
                    //clearIntervals(); // Clear old intervals
                    setGameState(prevState => ({
                        ...prevState,
                        transitioning: false,
                        transitionalActiveBalloons: prevState.activeBalloons, // Save copy of the active balloons before they will change
                    }));
                }, 
                Constants.balloonToggleTransition // wait as long as balloonToggleTransition milliseconds
            );
            return () => {
                clearIntervals(); 
                clearTimeout(transitionTimeout); // clear transitionTimeout
            };
        }
    }, [
        numberOfBalloons, 
        gameState.gameStarted, 
        gameState.activeBalloons, // I add activeBalloons as a dependency of useEffect
    ]);
[...]
    const handleGameToggle = useCallback(function(start) {
[...]
        transitionAuxiliarTimerRef.current = setTimeout(
            function() {
                if (start) {
[...]
                } else {
                    setGameState(function(prevState) {
                        clearIntervals();
                        return {
                            ...prevState,
                            coverScreenTopPosition: false,
                            activeBalloons: [],
                            transitionalActiveBalloons: [], // reset transitionalActiveBalloons
                            transitioning: false // reset transitioning
                        }
                    });
                }
            }, 100
        );
[...]
            <div style={{
                position: 'fixed',
                bottom: 0,
                padding: '1em',
                backgroundColor: 'rgba(255, 255, 255, .8)',
                zIndex: 1,
                fontSize: '0.7em',
                color: '#000000'
                }}>
[...]
                score: {gameState.score.toString()}<br />
                transitionalActiveBalloons: {gameState.transitionalActiveBalloons.toString()}<br />
                transitioning: {gameState.transitioning.toString()}<br />
            </div>
[...]
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #12 - Fixing bugs](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-12) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.