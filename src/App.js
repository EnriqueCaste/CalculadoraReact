import { useState } from 'react'
import { evaluate } from 'mathjs';
import './App.css'


function Button ({ children, onClick, id}){
    return (
    <button id={id} onClick={onClick}>
      {children}
    </button>
  );  
}

export default function App() {
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState([])
  const [error, setError] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMode, setShowMode] = useState(false);


  const calculate = () => {
    try {
    const result = evaluate(display);
    setDisplay(result.toString());
    setError(false);

    const newEntry = { expression: display, result: result.toString() };

    setHistory((prev) => {
      const last = prev[prev.length - 1];

      if (last && last.expression === newEntry.expression && last.result === newEntry.result) {
        return prev;
      }

      const updated = [...prev, newEntry];
      if (updated.length > 10) updated.shift(); 

      return updated;
    });

    } catch (e) {
      setDisplay("Error");
      setError(true);
      console.log(e);
    }
  };

  const appendToDisplay = (value) => {
    if (error) {
      setDisplay(value);
      setError(false);
    } else {
      setDisplay(display + value);
    }
  }

  const clearHistory = () => {
    setHistory([])
  }

    return (
    <div className={`main ${showTheme ? "light-mode" : "dark-mode"}`}>
      <div className="sidebar">
        <Button id="toggle-theme" onClick={() => setShowTheme(!showTheme)}>Theme</Button>
        <Button id="toggle-history" onClick={() => setShowHistory(!showHistory)}>History</Button>
        <Button id="toggle-panel" onClick={() => setShowMode(!showMode)}>Mode</Button>
      </div>

      <div className="calculator">
        <input type="text" value={display} disabled />
        <div className="buttons">
          <Button onClick={() => appendToDisplay("7")}>7</Button>
          <Button onClick={() => appendToDisplay("8")}>8</Button>
          <Button onClick={() => appendToDisplay("9")}>9</Button>
          <Button onClick={calculate} id="equals" >=</Button>

          <Button onClick={() => appendToDisplay("4")} >4</Button>
          <Button onClick={() => appendToDisplay("5")} >5</Button>
          <Button onClick={() => appendToDisplay("6")}>6</Button>
          <Button onClick={() => appendToDisplay("*")}>*</Button>

          <Button onClick={() => appendToDisplay("1")} >1</Button>
          <Button onClick={() => appendToDisplay("2")}>2</Button>
          <Button onClick={() => appendToDisplay("3")}>3</Button>
          <Button onClick={() => appendToDisplay("/")} >/</Button>

          <Button onClick={() => appendToDisplay("0")} >0</Button>
          <Button onClick={() => appendToDisplay(".")}>.</Button>
          <Button onClick={() => appendToDisplay("+")}>+</Button>
          <Button onClick={() => appendToDisplay("-")}>-</Button>

          <Button onClick={() => appendToDisplay("(")} id="open-paren">(</Button>
          <Button onClick={() => appendToDisplay(")")} id="close-paren">)</Button>
          <Button onClick={() => setDisplay(display.slice(0, -1))} id="back">←</Button>

          <Button onClick={() => setDisplay("")} id="clear">C</Button>        
        </div>
        </div>
        <div id="panel" className={showMode ? "panel-visible" : "panel-hidden"}>

            <Button onClick={() => appendToDisplay("sin(")}>sin</Button>
            <Button onClick={() => appendToDisplay("log10(")}>log</Button>
            <Button onClick={() => appendToDisplay("tan(")}>tan</Button>

            <Button onClick={() => appendToDisplay("^2")}>x²</Button>
            <Button onClick={() => appendToDisplay("sqrt(")}>√x</Button>
            <Button onClick={() => appendToDisplay("^")}>x^y</Button>

            <Button onClick={() => appendToDisplay("log(")}>log(x)</Button>
            <Button onClick={() => appendToDisplay("ln(")}>ln(x)</Button>
            <Button onClick={() => appendToDisplay("exp(")}>e^x</Button>

            <Button onClick={() => appendToDisplay("pi")}>π</Button>
            <Button onClick={() => appendToDisplay("e")}>e</Button>

            <Button onClick={() => appendToDisplay("1/(")}>1/x</Button>
            <Button onClick={() => appendToDisplay("abs(")}>|x|</Button>
            <Button onClick={() => appendToDisplay("!")}>!</Button>      
        </div>
         
         <div id="history" className={showHistory ? "history-visible" : "history-hidden"}>
          <div className="history-header">
            <h3>Historial</h3>
            <Button id="clear-history" data-ignore="true" onClick={clearHistory}>
              🗑️
            </Button>
          </div>

          <ul id="history-list">
            {history.length === 0 && <li>No hay operaciones</li>}
            {history.map((item, index) => (
              <li key={index}>
                <code>{item.expression} = {item.result}</code>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );

  
}
