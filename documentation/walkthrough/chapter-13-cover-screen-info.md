# Chapter 13 - Cover screen info

In this chapter I want to add some game info depending on score.

I want to add score as a prop in `src/components/Game/Game.jsx`:

```js
[...]
<CoverScreen 
    onStartGame={function() {handleGameToggle(true)}} 
    gameStarted={gameState.gameStarted}
    coverScreenTopPosition={gameState.coverScreenTopPosition}
    score={gameState.score}
/>
[...]
```

And in `src/components/CoverScreen/CoverScreen.jsx`:

```js
[...]
export default function CoverScreen({
    onStartGame, 
    gameStarted, 
    score, // add score
    coverScreenTransition,
    coverScreenTopPosition
}) {
    return (
[...]
            <div style={{zIndex: 1}}>
                <h1>
                    {score ? 'Game over' : 'Pop a Balloon Game'}
                </h1>
                {score > 0 && (
                    <p>
                        You popped {score} {score > 1 ? 'balloons' : 'balloon'}.
                    </p>
                )}
                <p>
                    A basic balloon game built with React.
                </p>
                <Button onClick={onStartGame}>
                    {score > 0 ? 'Play again' : 'Start Game'}
                </Button>
[...]
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #13 - Cover screen info](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-13) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.