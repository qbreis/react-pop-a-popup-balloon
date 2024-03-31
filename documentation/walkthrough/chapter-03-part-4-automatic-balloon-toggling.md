# Chapter #3 - Part #4 - Automatic Balloon Toggling

In this chapter I want all Balloons toggling, appearing and disappearing, automatically on mount without any button or click interaction, every let's say one second.

For this I can make use of the `useEffect` hook in ``:

```js
// Add useEffect React Hook
import React, { useState, useEffect } from 'react'; 

[...]

export default function BalloonGrid() {

[...]

    useEffect(() => {
        // Call toggleBalloons once when component mounts
        toggleBalloons();

        // Set up interval to toggle balloons automatically
        const intervalId = setInterval(toggleBalloons, 1000); // Change interval as needed

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this effect runs only once on mount

[...]

return (
        <div className="balloon-grid-wrapper">
            <p className="balloon-grid-caption">Click a balloon!</p>
            <div className="balloon-grid">
                {balloons}
            </div>
            {/*
            I don't want this button anymore
            <Button onClick={toggleBalloons}>
                Toggle Balloon
            </Button>
            */}
        </div>
    );
}
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #3 - Part #4 - Automatic Balloon Toggling](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-03-part-4) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.
