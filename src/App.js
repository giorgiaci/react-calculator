import { useState } from "react";

function App() {

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const operators = ['/', '*', '+', '-', '.'];

  const updateCalc = value => {
    if(
      (operators.includes(value) && calc === '') ||
      (operators.includes(value) && operators.includes(calc.slice(-1))) 
      ){
        return
    }
    setCalc(calc + value);

    if(!operators.includes(value)){
      setResult(eval(calc+value).toString());
    }
  }

  const calculate = () =>{      
    if(operators.includes(calc.slice(-1))){
      return;
    }
    setCalc(eval(calc).toString()); 
    
  }

  const createDigits = () =>{
    const digits = [];
    for(let i = 1; i<10; i++){
      digits.push(<button key={i} onClick={()=> updateCalc(i.toString())}>{i}</button>);
    }
    return digits;
  }

  const AC = () => {
    setCalc("");
    setResult("");
  } 

  const delLastDigits = () => {     
    
    const value = calc.slice(0, -1); 

    if(calc === ''){
      return;
    }
    
    setCalc( operators.includes(calc.slice(-1)) ? value : value.slice(0, -1));      
    setResult(eval(operators.includes(calc.slice(-1)) ? value : value.slice(0, -1)));        
  } 

  return (
    <div className="wrap">
    <div className="ggHeader">
      <h1>Giorgia's calculator</h1>
    </div>
    <div className="App">

     
      <div className="calculator">
        
        <div className="display">
          { result ? <span>({result})</span> : ''}&nbsp; { calc || "0"}
        </div>
      
        <div className="erase">
          <button onClick={ AC }>AC</button>         
          <button onClick={ delLastDigits }>DEL</button>
        </div>
              
      <div className="flex-container">
        <div className="digits">
          {createDigits( )}
          <button>0</button>
          <button>.</button>
          <button  onClick={ () => calculate() }>=</button>
        </div>
        
        <div className="operators">
          <button onClick={ () => updateCalc('/')}>/</button>
          <button onClick={ () => updateCalc('*')}>*</button>
          <button onClick={ () => updateCalc('+')}>+</button>
          <button onClick={ () => updateCalc('-')}>-</button>        
        </div>   
      </div>
        
      </div>
    </div>
    </div>
    
  );
}

export default App;
