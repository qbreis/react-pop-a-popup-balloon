
# Chapter #2 - Part #3 - Swinging Balloon appearing from below

In this chapter I want the swinging balloon to appear from below.

I want to add to the `balloon` class property some translation plus opacity 0 and then I will add new class `balloon--active` to make the balloon appear from below, in `src/components/Balloon/Balloon.css`:

```css
.balloon {
    max-width: 300px;
    transition: all .35s;
    margin: 0 auto;
    translate: 0% 100%;
    transform-origin: center;
    opacity: 0;
}

.balloon--active {
    opacity: 1;
    translate: 0% 0%;
    transform-origin: 50% 300%;
}
```

Next I want to do an emulation to display the appearing-disappearing animation every one second, in `src/components/Balloon/Balloon.jsx`:

```js
import "./Balloon.css";

// import the React Hooks useState and useEffect
import React, { useState, useEffect } from 'react'; 

export default function Balloon({ color }) {

    // Declare state variable isActive, with initial value set to false, 
    // and function setIsActive to update its value.
    const [isActive, setIsActive] = useState(false); 

    // Declares isMoving as a constant variable, always true.
    // Unlike isActive, which is a state variable managed by useState, 
    // isMoving is a regular constant variable and does not trigger re-renders when its value changes. 
    // It's just a regular JavaScript variable holding a boolean value.
    const isMoving = true;

    // declares a useEffect hook which sets up an interval to toggle the value of isActive every second, 
    // and it clears the interval when the component unmounts. 
    // This effectively creates a blinking effect where the isActive state alternates between true and false every second.
    useEffect(() => {
        const activeInterval = setInterval(() => {
            // This interval function toggles the value of isActive every 1000 milliseconds (1 second).
            // It uses the functional update form of setIsActive, 
            // which receives the previous state (prevIsTrue) and toggles it.
            setIsActive((prevIsTrue) => !prevIsTrue);
        }, 1000);
    
        // This is the cleanup function for the effect. 
        // It's called when the component unmounts or when a new effect is triggered. 
        // In this case, it clears the interval set up by setInterval to avoid memory leaks
        return () => {
            clearInterval(activeInterval);
        };
    }, []);

    // Dynamically constructs a string of CSS class names based on the values of isMoving and isActive variables.
    const classNames = `
        balloon 
        ${isMoving ? 'balloon--moving' : ''} 
        ${isActive ? 'balloon--active' : ''}
    `;

    const balloonWidth = 200;
    const balloonHeight = balloonWidth * 1.17;
    const threadHeight = 150;
    const threadWidth = 10;
    const threadColor = '#ffffff';
    
    return (
        <div className="balloon-cell">
            <div className="balloon-wrapper">
                <div 
                    className={classNames}
                    style={{ color: color }} 
                    >
[... rest of the code stays the same...]
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #2 - Part #3 - Swinging Balloon appearing from below](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-02-part-3) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.
