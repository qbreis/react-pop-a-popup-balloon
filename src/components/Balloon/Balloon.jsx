import "./Balloon.css";
import React, { useState } from 'react';
export default function Balloon({ color, balloonTransitionTime, isActive, onClick }) {

    const [isPopped, setIsPopped] = useState(false); 
    const isMoving = true;

    const clickHandler = () => {
        if (!isPopped) {
            setIsPopped(true);

            if(onClick) {
                onClick();
            }
        
            setTimeout(() => {
                setIsPopped(false);
            }, 1000);
        }
    };

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
                    className={isPopped ? 'balloon--popping' : ''}
                    onClick={clickHandler}
                    >
                    <div 
                        className={classNames}
                        style={{ 
                            color: color, 
                            transition: `all ${balloonTransitionTime}s` // Use inline style with dynamic value
                        }}
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
        </div>
    );
}