import React, { useState } from 'react';
import './App.css';

function App() {
  const [numElements, setNumElements] = useState(100000);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // This is the updated function that connects to the backend
  const handleSort = async () => {
    // 1. Reset previous results and errors, and set loading state
    setIsLoading(true);
    setResults(null);
    setError('');

    try {
      // 2. Make a POST request to our backend server
      const response = await fetch('http://localhost:3001/sort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numElements: parseInt(numElements, 10) }),
      });

      // 3. Check if the server responded with an error status (like 400 or 500)
      if (!response.ok) {
        // Try to get the error message from the response body, or use a default
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong on the server.');
      }

      // 4. Parse the successful JSON response from the backend
      const data = await response.json();
      setResults(data); // Store the results in our state

    } catch (err) {
      // 5. Catch any errors (network issues or errors thrown above)
      setError(err.message);
    } finally {
      // 6. This block runs whether the request succeeded or failed
      setIsLoading(false); // Stop the loading indicator
    }
  };

  return (
    <div className="App">
      <h1>C++ Sorting Benchmark</h1>
      <div className="controls">
        <label htmlFor="numElements">Number of Elements:</label>
        <input
          type="number"
          id="numElements"
          value={numElements}
          onChange={(e) => setNumElements(e.target.value)}
          disabled={isLoading}
        />
        <button onClick={handleSort} disabled={isLoading}>
          {/* Change button text while loading */}
          {isLoading ? 'Sorting...' : 'Run Sort'}
        </button>
      </div>

      {isLoading && <div className="loading">Sorting in progress... Please wait.</div>}
      {error && <div className="error">{error}</div>}
      
      {results && (
        <div className="results-container">
          <h2>Results</h2>
          {/* Note: The sequentialTime is currently hardcoded to 0 on the backend.
              We will update this in the next bonus step. */}
          <div className="result-item">
            <span>Sequential Merge Sort:</span>
            <strong>{results.sequentialTime.toFixed(4)} seconds</strong>
          </div>
          <div className="result-item">
            <span>Parallel Merge Sort:</span>
            <strong>{results.parallelTime.toFixed(4)} seconds</strong>
          </div>
          <div className="winner">
            {results.winner} was faster!
          </div>
        </div>
      )}
    </div>
  );
}

export default App;