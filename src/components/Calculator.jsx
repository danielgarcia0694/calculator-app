import React, { useState } from 'react';
import Button from './Button';

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState('');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleButtonClick = (value) => {
    if (typeof value === 'number' || value === '.') {
      setCurrentValue(currentValue + value.toString());
    } else if (value === 'C') {
      setCurrentValue('');
      setPrevValue(null);
      setOperator(null);
    } else if (value === '=') {
      if (operator && prevValue !== null) {
        const computeResult = (a, b, op) => {
          switch (op) {
            case '+':
              return a + b;
            case '-':
              return a - b;
            case '*':
              return a * b;
            case '/':
              return a / b;
            default:
              return b;
          }
        };
        const result = computeResult(parseFloat(prevValue), parseFloat(currentValue), operator);
        setCurrentValue(result.toString());
        setPrevValue(null);
        setOperator(null);
      }
    } else {
      setOperator(value);
      setPrevValue(currentValue);
      setCurrentValue('');
    }
  };

  const buttonValues = [
    7, 8, 9, '/', 
    4, 5, 6, '*', 
    1, 2, 3, '-', 
    0, '.', '=', '+',
    'C'
  ];

  return (
    <div className="calculator">
      <input type="text" value={currentValue} readOnly />
      <div className="buttons">
        {buttonValues.map((val) => (
          <Button key={val} value={val} onClick={handleButtonClick} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
