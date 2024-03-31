# Chapter #3 - Part #2 - Toggle Balloons

In this chapter I want the balloons to make a party, showing up randomly.

For this I want to do, in `src/components/Balloon/Balloon.jsx`:

- Add `isActive` as a parameter (1).
- For this (1) I won't need to declare state variable `isActive` anymore (2).
- I won't neither need declaring a `useEffect` hook which sets up an interval to toggle the value of isActive every second (3).

```js
[...]

// (1) Add isActive as a parameter
export default function Balloon({ color, isActive }) {

    const [isPopped, setIsPopped] = useState(false); 

    // (2) I won't need to declare state variable `isActive` anymore.
    // const [isActive, setIsActive] = useState(false);

    const isMoving = true;

    /*
    (3) I won't neither need declaring a `useEffect` hook which sets up an interval to toggle the value of isActive every second.

    useEffect(() => {
        const activeInterval = setInterval(() => {
            setIsActive((prevIsTrue) => !prevIsTrue);
        }, 1000);
        return () => {
            clearInterval(activeInterval);
        };
    }, []);
    */

[...]
```

Consequently, in `src/components/BalloonGrid/BalloonGrid.jsx` I want:

- Adding state variable `activeBalloons` to keep track of activation state for each balloon div (1).
- For this I need to add the React Hook useState (2).
- Adding one button to emulate Balloon Toggling (3).
- Adding function to toggle activation state of balloon divs (4).
- Adding for each balloon div the `isActive` as an attribute with corresponding state (5).

```js
// (2) import the React Hook useState
import React, { useState } from 'react'; 
import Balloon from "../Balloon/Balloon";
import "./BalloonGrid.css";

export default function BalloonGrid() {

    // (1) Adding state variable `activeBalloons` to keep track of activation state for each balloon div
    const [activeBalloons, setActiveBalloons] = useState([]);

    // (4) Adding function to toggle activation state of balloon divs
    const toggleBalloons = () => {
        const randomBalloonId = Math.floor(Math.random() * 6);

        setActiveBalloons((prevActiveBalloons) => {
            if (prevActiveBalloons.includes(randomBalloonId)) {
                return prevActiveBalloons.filter(
                (activeId) => activeId !== randomBalloonId
                );
            } else {
                return [...prevActiveBalloons, randomBalloonId];
            }
        });
        
    };

    const balloons = [];

    for (let i = 0; i < 6; i++) {
        // (5) Adding for each balloon div the `isActive` as an attribute with corresponding state
        balloons.push(
            <Balloon
            key={i}
            color="#9980FA"
            isActive={activeBalloons.includes(i)}
            />
        );
    }

    return (
        <div className="balloon-grid-wrapper">
            <p className="balloon-grid-caption">Click a balloon!</p>
            <div className="balloon-grid">
                {balloons}
            </div>
            {/* (3) Adding one button to emulate Balloon Toggling */}
            <button onClick={toggleBalloons}>Toggle Balloon</button>
        </div>
    );
}
```

## Helper component to render buttons

After adding (Button Component)[https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-03-part-2/src/components/Button] i update `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
[...]

{/* (3) Adding one button to emulate Balloon Toggling */}
<button onClick={toggleBalloons}>Toggle Balloon</button>

[...]
```

## Understanding the logic

State variable `activeBalloons` is an array, each element indicating the index of the balloon being activated, starting with empty array.

When I click 'Toggle Balloon' first time, `toggleBalloons` function picks `randomBalloonId`, a random number up to 6, which is the number of inactive balloons and toggles its value in `activeBalloons` array.

- Let's say I click 'Toggle Balloon' and I pick as `randomBalloonId` 2, then `activeBalloons` will be `[2]`.
- I click again 'Toggle Balloon' and let's say I pick 4, `activeBalloons` will be `[2, 4]`.
- If next time I click 'Toggle Balloon' I pick 2, `activeBalloons` will be `[4]`, and so on.

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #3 - Part #2 - Toggle Balloons](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-03-part-2) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.