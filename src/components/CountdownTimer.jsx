/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const CountdownTimer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = new Date(endDate).getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div>
      <div className="deals__countdown">
        <div className="deals__countdown__card">
          <h4>Days</h4>
          <p>{timeLeft.days}</p>
        </div>
        <div className="deals__countdown__card">
          <h4>Hours</h4>
          <p>{timeLeft.hours}</p>
        </div>
        <div className="deals__countdown__card">
          <h4>Mins</h4>
          <p>{timeLeft.minutes}</p>
        </div>
        <div className="deals__countdown__card">
          <h4>Secs</h4>
          <p>{timeLeft.seconds}</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
