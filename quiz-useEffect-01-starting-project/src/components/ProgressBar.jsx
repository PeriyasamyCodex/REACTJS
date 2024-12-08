import { useEffect, useState } from "react"

export default function ProgressBar({ timer , onTimeout}) {
    const [remainingTime, setRemainingTime] = useState(timer);

    useEffect(() => {
        console.log('progressbar executed'+remainingTime);
        const interval = setInterval(() => {
            setRemainingTime((prevRemTime) => prevRemTime - 10);
        }, 10);
        
        return () => {
            clearInterval(interval);
            setRemainingTime(timer);
        };

    }, [onTimeout]);


    return <progress value={remainingTime} max={timer}></progress>
}