import React, { useState } from 'react';
import Loader from './components/Loader';
import PostalDetails from './components/PostalDetails';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const App = () => {
  const [pincode, setPincode] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  const handleLookup = async () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setError('Pincode must be 6 digits.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const result = await response.json();

      if (result[0].Status === 'Success') {
        setData(result[0].PostOffice);
      } else {
        setError('Invalid Pincode or no data found.');
        setData([]);
      }
    } catch (err) {
      setError('Error fetching data.');
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Pincode Lookup</h1>
      <input
        type="text"
        value={pincode}
        placeholder="Enter 6-digit Pincode"
        onChange={(e) => setPincode(e.target.value)}
      />
      <button onClick={handleLookup}>Lookup</button>

      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}

      {!loading && data.length > 0 && (
        <PostalDetails data={data} filter={filter} setFilter={setFilter} />
      )}
    </div>
  );
};

export default App;
