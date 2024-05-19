// App.js
import React, { useState } from 'react';
import './App.css';
import './components/marks.css';

function App() {
  const [M1, setM1] = useState('');
  const [M2, setM2] = useState('');
  const [winAmount, setWinAmount] = useState(2000);
  const [showWinAmountInput, setShowWinAmountInput] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);
  const [calcResults, setCalcResults] = useState({});
  const [dashRows, setDashRows] = useState([
    { spend: '', multiplier: '', result: '' },
    { spend: '', multiplier: '', result: '' },
    { spend: '', multiplier: '', result: '' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const M1_value = parseFloat(M1);
    const M2_value = parseFloat(M2);

    if (M1_value <= 0 || M2_value <= 0) {
      alert('M1 and M2 must be positive values.');
      return;
    }

    const S1_value = winAmount / M1_value;
    const S2_value = winAmount / M2_value;
    const profit = (S1_value * M1_value) + (S2_value * M2_value) - (S1_value + S2_value);
    const loss = winAmount - (S1_value + S2_value);
    
    setCalcResults({
      S2: S2_value.toFixed(2),
      S1: S1_value.toFixed(2),
      profit: profit.toFixed(2),
      loss: loss.toFixed(2),
    });
  };

  const handleDashChange = (index, field, value) => {
    const updatedRows = [...dashRows];
    updatedRows[index][field] = value;
    const spend = parseFloat(updatedRows[index].spend) || 0;
    const multiplier = parseFloat(updatedRows[index].multiplier) || 0;

    if (spend < 0 || multiplier < 0) {
      alert('Spends and Multiplier must be positive values.');
      return;
    }

    if (field === 'spend' || field === 'multiplier') {
      updatedRows[index].result = (spend * multiplier).toFixed(2);
    }
    setDashRows(updatedRows);
  };

  const addDashRow = () => {
    setDashRows([...dashRows, { spend: '', multiplier: '', result: '' }]);
  };

  return (
    <div className="App">
      <h1 className="title">Investment & Profit Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label className="input-label">
          Enter M1:
          <input className="input-field" type="number" value={M1} onChange={(e) => setM1(e.target.value)} required min="0" step="any"/>
        </label>
        <br />
        <label className="input-label">
          Enter M2:
          <input className="input-field" type="number" value={M2} onChange={(e) => setM2(e.target.value)} required min="0" step="any"/>
        </label>
        <br />
        <label className="input-label">
          Would you like to change the Win Amount value?
          <div className="button-group">
            <button type="button" className="option-button" onClick={() => setShowWinAmountInput(true)}>Yes</button>
            <button type="button" className="option-button" onClick={() => { setShowWinAmountInput(false); setWinAmount(2000); }}>No</button>
          </div>
          {showWinAmountInput && (
            <input className="input-field animated-input" type="number" onChange={(e) => setWinAmount(e.target.value)} required min="0" step="any"/>
          )}
        </label>
        <br />
        <button className="calculate-button" type="submit">Calculate</button>
      </form>
      {Object.keys(calcResults).length > 0 && (
        <div className="output-container">
          <h2 className="output-heading">Outputs:</h2>
          <p className="output-results">S2 = {calcResults.S2}</p>
          <p className="output-results">S1 = {calcResults.S1}</p>
          <p className="output-results">Profit = {calcResults.profit}</p>
          <p className="output-results">Loss = {calcResults.loss}</p>
        </div>
      )}
      <button className="calculate-button" onClick={() => setShowCalculation(!showCalculation)}>
        Show Additional Calculation
      </button>
      {showCalculation && (
        <div className="dash-container">
          <h2 className="output-heading">Additional Calculations:</h2>
          {dashRows.map((row, index) => (
            <div key={index} className="dash-row">
              <input
                className="dash-input"
                type="number"
                placeholder="Spends on Teams"
                value={row.spend}
                onChange={(e) => handleDashChange(index, 'spend', e.target.value)}
                min="0"
                step="any"
              />
              <span className="dash-multiply"> * </span>
              <input
                className="dash-input"
                type="number"
                placeholder="Multiplier on Teams"
                value={row.multiplier}
                onChange={(e) => handleDashChange(index, 'multiplier', e.target.value)}
                min="0"
                step="any"
              />
              <span className="dash-equals"> = </span>
              <input
                className="dash-input"
                type="number"
                placeholder="Win Amount on Teams"
                value={row.result}
                readOnly
              />
            </div>
          ))}
          <button className="add-row-button" onClick={addDashRow}>Add Row</button>
        </div>
      )}
    </div>
  );
}

export default App;
