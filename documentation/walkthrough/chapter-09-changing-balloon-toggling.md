# Chapter 09 - Changing balloons toggling algorithm

Until now, all balloons are toggling randomly all at once, in this chapter I want to change this, I want instead each balloon to toggle randomly independent from the others.

## Small CSS adjustment

But first I want to do this small change which has nothing to do with this chapter purpose, in `src/components/Balloon/Balloon.css`:

```css
[...]
.balloon-cell { 
    position: relative;
    width: 50%;
    padding: 0.5em;
}
[...]
.balloon--popping .balloon {
    translate: 0% 0%;
}
```

## Randomness limits for each balloon

I want each balloon to toggle randomly and stay visible between one and three seconds, for this I will add `balloonTogglingRandomnessLimits` in `src/utils/constants.js`:

```js
const constants = {
    gameDuration: 10, // seconds
    gameCells: 6,
    gameTimeDelay: 10, // milliseconds
    balloonTogglingRandomnessLimits: { upper: 3000, lower: 1000 }, // milliseconds
};

export default constants;
```

I also want to have `src/utils/randomNumber.js`:

```js
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
  
export default getRandomNumber;
```

And now I will change in ``:

```js
import React, { useState, useEffect, useRef, useCallback } from "react";
import CoverScreen from '../CoverScreen/CoverScreen';
import BalloonGrid from '../BalloonGrid/BalloonGrid';
import Constants from "../../utils/constants";

// I import getRandomNumber from utils/randomNumber
import getRandomNumber from "../../utils/randomNumber";

[...]
    /*
    useEffect(() => {
        const toggleBalloons = () => {
            // Only toggle balloons if gameStarted is true
            if (gameState.gameStarted) {
                const randomActiveBalloons = Array.from(
                    {length: numberOfBalloons}, 
                    function() {
                        return Math.random() < 0.5;
                    }
                )
                .map(function(isActive, index) {
                    return isActive ? index : null;
                })
                .filter(function(index) {
                    return index !== null;
                });

                // Update the gameState with the new activeBalloons
                setGameState(function(prevState) {
                    return {
                        ...prevState,
                        activeBalloons: randomActiveBalloons,
                    };
                });
            }
        };
    
        toggleBalloons();
        const intervalId = setInterval(toggleBalloons, 1000);
        return () => clearInterval(intervalId);
    }, [numberOfBalloons, gameState.gameStarted]);
    */

    const intervalIdsRef = useRef([]);
    useEffect(() => {
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
                };
            });
        };

        for (let i = 0; i < numberOfBalloons; i++) {
            const intervalId = setInterval(
                generateRandomBalloon,
                getRandomNumber(
                    Constants.balloonTogglingRandomnessLimits.lower,
                    Constants.balloonTogglingRandomnessLimits.upper
                )
            );
            intervalIdsRef.current.push(intervalId);
        }

        return () => {
            intervalIdsRef.current.forEach((intervalId) => clearInterval(intervalId));
        };
    }, [numberOfBalloons]);
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #9 - Changing balloons toggling algorithm](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-09) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.