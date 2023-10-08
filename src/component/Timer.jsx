import React, { useState, useEffect } from "react";
import "../style.css";

function Timer(props) {
  const { correctWord, startCounting } = props;
  const [timeElapsed, setTimeElapsed] = useState(0);
  useEffect(() => {
    let id;
    if (startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [startCounting]);
  const minutes = timeElapsed / 60;
  return (
    <div className="classTimer" style={{marginLeft:"10vh"}}>
      <p>Time:{timeElapsed} </p>
      <p>speed:{(correctWord / minutes || 0).toFixed(2)} WPM </p>
    </div>
  );
}
export default Timer;
