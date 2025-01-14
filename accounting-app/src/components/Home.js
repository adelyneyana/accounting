import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState({ sales: '', purchases: '', vatRate: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/calculate', data);
      navigate('/results', { state: { results: response.data } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Sales"
        value={data.sales}
        onChange={(e) => setData({ ...data, sales: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Purchases"
        value={data.purchases}
        onChange={(e) => setData({ ...data, purchases: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="VAT Rate (%)"
        value={data.vatRate}
        onChange={(e) => setData({ ...data, vatRate: e.target.value })}
        required
      />
      <button type="submit">Calculate</button>
    </form>
  );
};

export default Home;