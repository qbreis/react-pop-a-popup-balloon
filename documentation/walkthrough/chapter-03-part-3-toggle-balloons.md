# Chapter #3 - Part #3 - Toggle Balloons

In this chapter I want the balloons to make a party, showing up randomly.

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
- [Chapter #3 - Part #3 - Toggle Balloons](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-03-part-3) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.
