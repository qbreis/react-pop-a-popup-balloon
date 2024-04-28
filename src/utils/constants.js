const constants = {
    gameDuration: 100000,//10, // seconds
    gameCells: 6,
    gameTimeDelay: 10, // milliseconds
    balloonTogglingRandomnessLimits: { 
        upper: 4000,//700, // milliseconds
        lower: 4000,//200, // milliseconds
    },
    balloonToggleTransition: 1000,//350, // milliseconds
    balloonPoppingTransition: 1000,//350, // milliseconds
    coinCounterDelay: 700, // milliseconds

    //colors: [ '#9980FA', '#ff6670', '#e3f33e', '#87c369', '#77a8e4', '#222222'],
    colors: [ '#9980FA', '#ff6670', '#e3f33e' ],

    forbiddenColors: [ '#ff6670' ]
};

export default constants;