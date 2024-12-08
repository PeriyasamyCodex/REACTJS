import { useEffect, useState } from "react"

export default function ProgressBar({ timer }) {
    const [remainingTime, setRemainingTime] = useState(timer);
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevRemTime) => prevRemTime - 10);
            console.log('remaining time ->' + remainingTime);
        }, 10);


        return () => clearInterval(interval);
    }, []);

    return <progress value={remainingTime} max={timer}></progress>
}