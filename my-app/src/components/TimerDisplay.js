export default function TimerDisplay(props) {
    const {currentTime, timeSize} = props;
    function doubleDigits(time) {
        if (time < 10) {
            return ("0" + time)
        }
        return time
    }

    return (
        <div style={{fontFamily:"fantasy",fontSize:timeSize}}>
            {doubleDigits(currentTime.hours)}{" : "}{doubleDigits(currentTime.minutes)}{" : "}{doubleDigits(currentTime.seconds)}
        </div>
    );
}