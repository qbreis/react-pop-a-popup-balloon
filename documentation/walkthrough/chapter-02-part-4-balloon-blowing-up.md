# Chapter #2 - Part #4 - Balloon blowing up when I click

I want to do:

- Add state variable `isPopped`
- Define the callback function to make the balloon to explode when clicked
- Nest all previous balloon div structure in new div with the `balloon--popping` class name plus the onclick handler.

For this I update `src/components/Balloon/Balloon.jsx`:

```js
[... rest of the code stays the same...]

export default function Balloon({ color }) {

    // Declare state variable isPopped, with initial value set to false, 
    // and function setIsPopped to update its value.
    const [isPopped, setIsPopped] = useState(false); 

    const [isActive, setIsActive] = useState(false);
    const isMoving = true;

    useEffect(() => {
        const activeInterval = setInterval(() => {
            setIsActive((prevIsTrue) => !prevIsTrue);
        }, 1000);
        return () => {
            clearInterval(activeInterval);
        };
    }, []);

    // Add function callback to perform specific actions when a balloon is clicked
    const clickHandler = () => {
        if (!isPopped) {
            setIsPopped(true);
        
            setTimeout(() => {
                setIsPopped(false);
            }, 1000);
        }
    };

    // Dynamically constructs a string of CSS class names based on the values of isMoving and isActive variables.
    const classNames = `
        balloon 
        ${isMoving ? 'balloon--moving' : ''} 
        ${isActive ? 'balloon--active' : ''}
    `;

[... rest of the code stays the same...]

    // I will add clickHandler to the parent container of the balloon element
    return (
        <div className="balloon-cell">
            <div className="balloon-wrapper">
                <div 
                    className={isPopped ? 'balloon--popping' : ''}
                    onClick={clickHandler}
                    >
                    <div 
                        className={classNames}
                        style={{ color: color }} 
                        >

[... rest of the code stays the same...]

                    </div>
                </div>
            </div>
        </div>
    );
}
```

Finally I just add `balloon--popping` class in `src/components/Balloon/Balloon.css`:

```css
.balloon--popping {
    transform: scale(2);
    transform-origin: 50% 20%;
    opacity: 0;
    transition: all .2s;
}
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #2 - Part #4 - Balloon blowing up when I click](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-02-part-4) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.