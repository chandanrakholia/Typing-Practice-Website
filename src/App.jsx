import React, { useState, useRef } from "react";
import KeyboardNpm from "./component/KeyboardNpm";
import Header from "./component/Header";
import Navbar from "./component/Navbar";
import Timer from "./component/Timer";
import getCloud from "./component/Data";
import Word from "./component/word";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
const MemoizedWord = React.memo(Word);

function App() {
  const [userInput, setUserInput] = useState("");
  const cloud = useRef(getCloud());
  const [startCounting, setStartCounting] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  function processInput(value) {
    if (activeWordIndex === cloud.current.length) {
      return;
    }
    if (startCounting === false) {
      setStartCounting(true);
    }
    if (value.endsWith(" ")) {
      if (activeWordIndex === cloud.current.length - 1) {
        setStartCounting(false);
        setUserInput("completed");
      } else {
        setUserInput("");
      }
      setActiveWordIndex((index) => index + 1);
      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  }
  return (
    <div>
      <Navbar />
      <Timer
        startCounting={startCounting}
        correctWord={correctWordArray.filter(Boolean).length}
      />
      <p className="wordCloud" style={{ marginLeft: "10vh" }}>
        {cloud.current.map((word, index) => {
          return (
            <MemoizedWord
              key={index}
              text={word}
              active={index === activeWordIndex}
              correct={correctWordArray[index]}
            />
          );
        })}
      </p>
      <div className="cloud">
        <input
          type="text"
          value={userInput}
          onChange={(e) => processInput(e.target.value)}
          placeholder={"Click to start"}
        ></input>
      </div>
      <KeyboardNpm />
    </div>
  );
}

export default App;
