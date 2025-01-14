import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const results = location.state.results;

  return (
    <div>
      <h2>Results</h2>
      <p>Output VAT: {results.outputVAT}</p>
      <p>Input VAT: {results.inputVAT}</p>
      <p>VAT Payable: {results.vatPayable}</p>
    </div>
  );
};

export default Results;