import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [scenario, setScenario] = useState("A");
  const [values, setValues] = useState({
    sales: "",
    purchases: "",
    vatPayable: "",
    vatRate: 12, // Default VAT rate
  });
  const [result, setResult] = useState(null);

  // Reset values for fields that are disabled
  useEffect(() => {
    if (scenario === "A") {
      setValues((prevValues) => ({ ...prevValues, vatPayable: "" }));
    } else if (scenario === "B") {
      setValues((prevValues) => ({ ...prevValues, purchases: "" }));
    } else if (scenario === "C") {
      setValues((prevValues) => ({ ...prevValues, sales: "" }));
    }
  }, [scenario]);

  // Handle input changes
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handle form submission and API call
  const handleCalculate = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/calculate", {
        sales: scenario !== "C" ? parseFloat(values.sales) || 0 : 0,
        purchases: scenario !== "B" ? parseFloat(values.purchases) || 0 : 0,
        vatPayable: scenario !== "A" ? parseFloat(values.vatPayable) || 0 : null,
        vatRate: parseFloat(values.vatRate) || 0,
      });

      setResult(response.data); // Set the result to display
    } catch (error) {
      console.error("Error calculating VAT:", error);
      alert("An error occurred while calculating VAT.");
    }
  };

  return (
    <div className="container">
      <h2>VAT Calculator</h2>

      <div className="form-group">
        <label>Scenario</label>
        <select
          className="form-control"
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
        >
          <option value="A">A. VAT Payable is unknown</option>
          <option value="B">B. VAT Payable and Sales are known</option>
          <option value="C">C. VAT Payable and Purchases are known</option>
        </select>
      </div>

      <div className="form-group">
        <label>Sales</label>
        <input
          type="number"
          className="form-control"
          name="sales"
          value={values.sales}
          onChange={handleChange}
          disabled={scenario === "C"}
          style={{
            backgroundColor: scenario === "C" ? "#f5f5f5" : "white",
          }} // Grey out disabled field
        />
      </div>

      <div className="form-group">
        <label>Purchases</label>
        <input
          type="number"
          className="form-control"
          name="purchases"
          value={values.purchases}
          onChange={handleChange}
          disabled={scenario === "B"}
          style={{
            backgroundColor: scenario === "B" ? "#f5f5f5" : "white",
          }} // Grey out disabled field
        />
      </div>

      <div className="form-group">
        <label>VAT Payable</label>
        <input
          type="number"
          className="form-control"
          name="vatPayable"
          value={values.vatPayable}
          onChange={handleChange}
          disabled={scenario === "A"}
          style={{
            backgroundColor: scenario === "A" ? "#f5f5f5" : "white",
          }} // Grey out disabled field
        />
      </div>

      <div className="form-group">
        <label>VAT Rate (%)</label>
        <input
          type="number"
          className="form-control"
          name="vatRate"
          value={values.vatRate}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary" onClick={handleCalculate}>
        Calculate
      </button>

      {result && (
        <div className="mt-4">
          <h4>Results:</h4>
          <p>Sales: {result.sales}</p>
          <p>Purchases: {result.purchases}</p>
          <p>Output VAT: {result.outputVAT}</p>
          <p>Input VAT: {result.inputVAT}</p>
          <p>VAT Payable: {result.vatPayable}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
