/*
This code calculates the remaining time in seconds based on the time remaining in milliseconds and a specified game time delay also in milliseconds.
*/
export default function calculateSeconds(time, delay) {
    return Math.ceil(
        time // in millisenonds
        / 
        (
            1000 // 1 second is 1000 milliseconds
            / 
            delay // I will decrease 10 miliseconds each time
        )
    );
};