import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || {};

  if (!results) {
    return <h4>No results to display!</h4>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">VAT Calculation Results</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Category</th>
            <th>Value (₱)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sales</td>
            <td>{results.sales}</td>
          </tr>
          <tr>
            <td>Purchases</td>
            <td>{results.purchases}</td>
          </tr>
          <tr>
            <td>Output VAT</td>
            <td>{results.outputVAT}</td>
          </tr>
          <tr>
            <td>Input VAT</td>
            <td>{results.inputVAT}</td>
          </tr>
          <tr>
            <td>VAT Payable</td>
            <td>{results.vatPayable}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-secondary" onClick={() => navigate('/')}>
        Back to Calculator
      </button>
    </div>
  );
};

export default Results;
