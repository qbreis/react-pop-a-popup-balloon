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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox={`0 0 ${balloonWidth} ${balloonHeight + threadHeight}`}
                    >
                        <rect
                            x={balloonWidth / 2 - threadWidth / 2}
                            y={balloonHeight}
                            width={threadWidth}
                            height={threadHeight}
                            fill={threadColor}
                            rx={threadWidth / 2}
                        />
                        <polygon
                            points={`${balloonWidth / 2},${balloonHeight - 3} ${
                            balloonWidth / 2 + 12
                            },${balloonHeight + 22} ${balloonWidth / 2 - 12},${
                            balloonHeight + 22
                            }`}
                            fill="currentColor"
                        />
                        <ellipse
                            cx={balloonWidth / 2}
                            cy={balloonHeight / 2}
                            rx={balloonWidth / 2}
                            ry={balloonHeight / 2}
                            fill="currentColor"
                        />
                        <rect
                            x={balloonWidth / 2 - (threadWidth + 18) / 2}
                            y={balloonHeight - 1}
                            width={threadWidth + 18}
                            height={threadWidth}
                            fill={threadColor}
                            rx={threadWidth / 2}
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}