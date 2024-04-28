const constants = {
    gameDuration: 1000000,//10, // seconds
    gameCells: 6,
    gameTimeDelay: 10, // milliseconds
    balloonTogglingRandomnessLimits: { 
        upper: 4000,//700, // milliseconds
        lower: 4000,//200, // milliseconds
    },
    balloonToggleTransition: 2000,//350, // milliseconds
    balloonPoppingTransition: 2000,//350, // milliseconds
    coinCounterDelay: 700, // milliseconds

    //colors: [ '#9980FA', '#ff0000', '#00ffcc' ]
    colors: [ '#9980FA', '#de76e7', '#ff6670', '#ffc73c', '#00ffcc', '#6cade5']
};

export default constants;