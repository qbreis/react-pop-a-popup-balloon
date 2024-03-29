import "./Balloon.css";

export default function Balloon({ color }) {

    const balloonWidth = 200;
    const balloonHeight = balloonWidth * 1.17;
    const threadHeight = 150;
    const threadWidth = 10;
    const threadColor = '#ffffff';
    
    return (
        <div className="balloon-cell">
            <div className="balloon-wrapper">
                <div 
                    className="balloon balloon--moving"
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