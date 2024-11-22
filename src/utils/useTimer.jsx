import { useState, useEffect } from "react";

const useTimer = (startDate, endDate) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            let targetDate = null;

            if (startDate > now) {
                targetDate = startDate;
            } else if (endDate > now) {
                targetDate = endDate;
            } else {
                setTimeLeft("00:00:00");
                return;
            }

            const difference = targetDate - now;

            if (difference > 0) {
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft(
                    `${hours.toString().padStart(2, "0")}:${minutes
                        .toString()
                        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
                );
            } else {
                setTimeLeft("00:00:00");
            }
        };

        calculateTimeLeft();
        const timerInterval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timerInterval); // Cleanup interval on unmount
    }, []);

    return timeLeft;
};

export default useTimer;
