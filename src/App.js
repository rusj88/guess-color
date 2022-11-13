import { useEffect, useState, useCallback } from "react";
import "./App.css";

function App() {
  const [colors, setColors] = useState([]);
  const [background, setBackground] = useState("none");
  const [result, setResult] = useState("");
  const [answers, setAnswers] = useState({ correct: 0, incorrect: 0 });

  const init = useCallback(() => {
    setColors(new Array(3).fill("").map((color) => getHexColor()));
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    setBackground(colors[Math.floor(Math.random() * 3)]);
  }, [colors]);

  const getHexColor = (base = 16, length = 6) => {
    const max = Math.pow(base, length);
    const decimal = Math.floor(Math.random() * max);
    const hexString = decimal.toString(base).padStart(length, "0");

    return ("#" + hexString).toUpperCase();
  };

  const handleClick = (color) => {
    if (color === background) {
      setResult("Correct");
      setAnswers({ ...answers, correct: answers.correct + 1 });
      init();
    } else {
      setResult("Incorrect");
      setAnswers({ ...answers, incorrect: answers.incorrect + 1 });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="box" style={{ backgroundColor: background }}></div>
        <div className="buttons">
          {colors.map((ele, id) => {
            return (
              <button key={id} onClick={() => handleClick(ele)}>
                {ele}
              </button>
            );
          })}
        </div>
        {result && <div>{result}</div>}
        <div className="answers">
          <span>Your answers</span>
          <span>Right: {answers.correct}</span>
          <span>Wrong: {answers.incorrect}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
