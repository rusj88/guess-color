import { useEffect, useState, useCallback } from "react";
import "./App.css";

function App() {
  const [colors, setColors] = useState([]);
  const [background, setBackground] = useState("none");
  const [result, setResult] = useState("");

  const init = useCallback(() => {
    setColors([getHexColor(), getHexColor(), getHexColor()]);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    setBackground(colors[Math.floor(Math.random() * 3)]);
  }, [colors]);

  const getHexColor = () => {
    const getRandomHex = () => Math.floor(Math.random() * 255).toString(16);
    return (
      "#" +
      getRandomHex() +
      getRandomHex() +
      getRandomHex()
    ).toUpperCase();
  };

  const handleClick = (color) => {
    if (color === background) {
      setResult("Correct");
      init();
    } else {
      setResult("Incorrect");
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
      </div>
    </div>
  );
}

export default App;
