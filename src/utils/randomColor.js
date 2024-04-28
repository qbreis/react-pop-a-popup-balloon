const getRandomColor = (colors) => {
    return colors[
        Math.floor(Math.random() * colors.length)
    ];
};
  
export default getRandomColor;