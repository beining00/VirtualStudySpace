export default function TimerDisplay({currentTime}) {

    function doubleDigits(time) {
        if (time < 10) {
            return ("0" + time)
        }
        return time
    }

    return (
        <div style={{fontFamily:"fantasy"}}>
            {doubleDigits(currentTime.hours)}{" : "}{doubleDigits(currentTime.minutes)}{" : "}{doubleDigits(currentTime.seconds)}
        </div>
    );
}