import React, { useState } from 'react';
import './App.css';

function App() {
    const [selectedOption, setSelectedOption] = useState(null); 
    const [result, setResult] = useState(""); // Calculator result
    const [amount, setAmount] = useState(""); // Currency converter input
    const [sourceCurrency, setSourceCurrency] = useState("EUR");
    const [targetCurrency, setTargetCurrency] = useState("USD");
    const [convertedAmount, setConvertedAmount] = useState("");

    const exchangeRates = {
        USD: 1.06, EUR: 1, GBP: 0.87, MAD: 11.00, CAD: 1.42,
        AUD: 1.65, JPY: 159.50, INR: 88.34, CNY: 7.10, BRL: 5.32,
        MXN: 18.90, CHF: 0.96, SEK: 11.45, NOK: 11.20, RUB: 99.15,
        ZAR: 18.60, KRW: 1390.50, HKD: 8.30, SGD: 1.40, NZD: 1.78
    };

    // Calculator Functions
    const handleCalculatorClick = (e) => setResult(result.concat(e.target.name));
    const clearCalculator = () => setResult("");
    const backspaceCalculator = () => setResult(result.slice(0, -1));
    const calculateResult = () => {
        try {
            setResult(eval(result).toString());
        } catch {
            setResult("Error");
        }
    };

    // Currency Converter Function
    const convertCurrency = () => {
        const rate = exchangeRates[targetCurrency] / exchangeRates[sourceCurrency];
        setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
    };

    return (
        <div className="container">
            {!selectedOption ? (
                <div className="intro">
                    <h1 className="title">Choose an Option</h1>
                    <p className="description">
                        Use the <strong>Simple Calculator</strong> for arithmetic operations, 
                        or the <strong>Currency Converter</strong> to convert between 20+ currencies.
                    </p>
                    <button className="option-button" onClick={() => setSelectedOption("calculator")}>
                        Simple Calculator
                    </button>
                    <button className="option-button" onClick={() => setSelectedOption("converter")}>
                        Currency Converter
                    </button>
                </div>
            ) : (
                <>
                    <button className="back-button" onClick={() => setSelectedOption(null)}>Back</button>

                    {selectedOption === "calculator" ? (
                        <div className="app">
                            <form>
                                <input type="text" value={result} readOnly />
                            </form>
                            <div className="keypad">
                                <button onClick={clearCalculator} id="clear">Clear</button>
                                <button onClick={backspaceCalculator}>C</button>
                                <button name="/" onClick={handleCalculatorClick}>&divide;</button>
                                <button name="7" onClick={handleCalculatorClick}>7</button>
                                <button name="8" onClick={handleCalculatorClick}>8</button>
                                <button name="9" onClick={handleCalculatorClick}>9</button>
                                <button name="*" onClick={handleCalculatorClick}>&times;</button>
                                <button name="4" onClick={handleCalculatorClick}>4</button>
                                <button name="5" onClick={handleCalculatorClick}>5</button>
                                <button name="6" onClick={handleCalculatorClick}>6</button>
                                <button name="-" onClick={handleCalculatorClick}>&ndash;</button>
                                <button name="1" onClick={handleCalculatorClick}>1</button>
                                <button name="2" onClick={handleCalculatorClick}>2</button>
                                <button name="3" onClick={handleCalculatorClick}>3</button>
                                <button name="+" onClick={handleCalculatorClick}>+</button>
                                <button name="0" onClick={handleCalculatorClick}>0</button>
                                <button name="." onClick={handleCalculatorClick}>.</button>
                                <button onClick={calculateResult} id="result">=</button>
                            </div>
                        </div>
                    ) : (
                        <div className="currency-converter">
                            <h2>Currency Converter</h2>
                            <div className="converter-inputs">
                                <select 
                                    className="currency-select" 
                                    value={sourceCurrency} 
                                    onChange={(e) => setSourceCurrency(e.target.value)}
                                >
                                    {Object.keys(exchangeRates).map((currency) => (
                                        <option key={currency} value={currency}>{currency}</option>
                                    ))}
                                </select>
                                <input
                                    className="input-field"
                                    type="number"
                                    placeholder={`${sourceCurrency}`}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="converter-inputs">
                                <select 
                                    className="currency-select" 
                                    value={targetCurrency} 
                                    onChange={(e) => setTargetCurrency(e.target.value)}
                                >
                                    {Object.keys(exchangeRates).map((currency) => (
                                        <option key={currency} value={currency}>{currency}</option>
                                    ))}
                                </select>
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder={`to ${targetCurrency}`}
                                    value={convertedAmount}
                                    readOnly
                                />
                            </div>
                            <button className="convert-button" onClick={convertCurrency}>Convert</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
