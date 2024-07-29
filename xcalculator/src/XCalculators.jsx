
import React, { useState } from 'react';
import './styles.css';

const XCalculators = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleInput = value => {
    setExpression(prevExpression => prevExpression + value);
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      if (expression.trim() === '') {
        setResult('Error');
      } else {
        setResult(calculate(expression));
      }
    } catch (error) {
      setResult('Error');
    }
  };

  const calculate = expression => {
    const operators = ['*', '/', '+', '-'];
    let currentNumber = '';
    let operator = null;
    let result = 0;

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      if (operators.includes(char)) {
        if (currentNumber !== '') {
          result = applyOperator(result, currentNumber, operator);
          currentNumber = '';
        }
        operator = char;
      } else {
        currentNumber += char;
      }
    }

    if (currentNumber !== '') {
      result = applyOperator(result, currentNumber, operator);
    }

    return result;
  };

  const applyOperator = (result, currentNumber, operator) => {
    switch (operator) {
      case '*':
        return result !== '' ? result * Number(currentNumber) : Number(currentNumber);
      case '/':
        return result !== '' ? result / Number(currentNumber) : Number(currentNumber);
      case '+':
        return result !== '' ? result + Number(currentNumber) : Number(currentNumber);
      case '-':
        return result !== '' ? result - Number(currentNumber) : Number(currentNumber);
      default:
        return Number(currentNumber);
    }
  };
  

  return (
    <div className="calculator">
      <h1>React Calculator</h1>
      <input type="text" value={expression} readOnly /><br/>
      <div className="result">{result}</div>
      <div>
        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button onClick={() => handleInput('+')}>+</button><br/>
        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button onClick={() => handleInput('-')}>-</button><br/>
        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button onClick={() => handleInput('*')}>*</button><br/>
        <button onClick={handleClear}>C</button>
        <button onClick={() => handleInput('0')}>0</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={() => handleInput('/')}>/</button>
      </div>
    </div>
  );
}

export default XCalculators;