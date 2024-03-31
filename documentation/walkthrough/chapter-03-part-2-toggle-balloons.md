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

After adding [Button Component](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-03-part-2/src/components/Button) i update `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
[...]

{/* (3) Adding one button to emulate Balloon Toggling */}
<button onClick={toggleBalloons}>Toggle Balloon</button>

[...]
```

## Understanding the logic

State variable `activeBalloons` is an array, each element indicating the index of the balloon being activated, starting with empty array.

When I click 'Toggle Balloon' first time, `toggleBalloons` function picks `randomBalloonId`, a random number up to 6, which is the number of inactive balloons and toggles its value in `activeBalloons` array.

- Let's say I click, first time, 'Toggle Balloon' and I pick as `randomBalloonId` 2, then `activeBalloons` will be `[2]`.
- I click again 'Toggle Balloon' and let's say I pick 4, `activeBalloons` will be `[2, 4]`.
- If next time I click 'Toggle Balloon' I pick 2, `activeBalloons` will be `[4]`, and so on.

## Toggling all at once

Now I want, every time I click 'Toggle Balloon', to toggle all ballons, for this I can try updateing `src/components/BalloonGrid/BalloonGrid.jsx`:

```js
const toggleBalloons = () => {
        
    // Iterating through a loop 6 times, 
    // generating a random balloon ID in each iteration, 
    // and toggling the state of the balloons based on these random IDs.
    for (let index = 0; index < 6; index++) {
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
    }
};
```

But with this approach I can see it has not much sense to iterate 6 times, meaning I could also iterate 12 or 24 times trying to shuffle active states, and this is weird.

Instead, I want the `toggleBalloons` function to generate a new array `randomActiveBalloons` of the same length as the number of balloons (6 in this case), where each element is either the index of a balloon if it's active (with a probability of 0.5) or `null` if it's inactive.

Then, it filters out the `null` values to get the indices of active balloons.

Finally, it sets the state of activeBalloons to this new array.

This will effectively toggle the state of all balloons randomly on each click.

```js
const toggleBalloons = () => {
    // Step 1: Create an array of random values representing balloon states (active or inactive)
    // e.g. [ false, false, true, true, true, true ]
    const randomBalloonStates = Array.from({ length: 6 }, function() {
        return Math.random() < 0.5;
    });

    // Step 2: Map the random values to balloon IDs or null
    // e.g. [ null, null, 2, 3, 4, 5 ]
    const balloonIdsOrNull = randomBalloonStates.map(function(isActive, index) {
        return isActive ? index : null;
    });

    // Step 3: Filter out the null values to get only the active balloon IDs
    // e.g. [ 2, 3, 4, 5 ]
    const randomActiveBalloons = balloonIdsOrNull.filter(function(index) {
        return index !== null;
    });

    // Finally, it sets the state of activeBalloons to this new array randomActiveBalloons
    setActiveBalloons(randomActiveBalloons);
};
```

Now I can refactor to get something like this:

```js
const toggleBalloons = () => {

    /*
    Arrow Function Syntax for brevity and conciseness (First Approach):
    const randomActiveBalloons = Array.from({ length: 6 }, () =>
        Math.random() < 0.5
    ).map((isActive, index) => isActive ? index : null).filter(index => index !== null);
    */

    // Traditional Function Syntax for each step (Second Approach):

    // Create an array with 6 elements
    const randomActiveBalloons = Array.from({ length: 6 }, function() {
        // For each element, generate a random boolean value (true or false)
        // e.g. [ false, false, true, true, true, true ]
        return Math.random() < 0.5;
    })
    // Map each boolean value to either the index of the balloon (if true) or null (if false)
    // e.g. [ null, null, 2, 3, 4, 5 ]
    .map(function(isActive, index) {
        return isActive ? index : null;
    })
    // Filter out the null values, keeping only the indices of active balloons
    // e.g. [ 2, 3, 4, 5 ]
    .filter(function(index) {
        return index !== null;
    });

    // Finally, it sets the state of activeBalloons to this new array randomActiveBalloons
    setActiveBalloons(randomActiveBalloons);
};
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #3 - Part #2 - Toggle Balloons](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-03-part-2) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.