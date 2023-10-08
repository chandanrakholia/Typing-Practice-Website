import { useState,useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../style.css"
function KeyboardNpm() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };
  return (
    <div className="KeyboardNpm center">
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layoutName={layout}
        physicalKeyboardHighlight={true}
      />
    </div>
  );
}

export default KeyboardNpm;
