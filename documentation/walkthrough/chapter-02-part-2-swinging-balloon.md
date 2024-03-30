# Chapter #2 - Part #2 - Swinging Balloon

In this chapter I make the balloon swing.

I will add to `src/components/Balloon/Balloon.css`:

```css
.balloon--moving {
    animation: balloon-moving 5s ease-in-out 1s infinite alternate;
    transform-origin: 50% 200%;
}
  
@keyframes balloon-moving {
    25% {
        transform: rotate(-2deg);
    }
    75% {
        transform: rotate(2deg);
    }
}
```

And then I add class `balloon--moving` to the balloon div in `src/components/Balloon/Balloon.jsx`:

```js
<div 
    className="balloon balloon--moving"
    style={{ color: color }} 
    >
```

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #2 - Part #2 - Swinging Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main-chapter-02-part-2) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to all Chapters.


