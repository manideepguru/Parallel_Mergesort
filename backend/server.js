const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3001; // Use a different port than the React app

// Middleware Setup
app.use(cors()); // Allow requests from our React frontend
app.use(express.json()); // Allow the server to understand JSON in request bodies

/**
 * A helper function to run the C++ sorting executable.
 * It returns a Promise that resolves with the execution time or rejects with an error.
 * @param {string} executablePath - The path to the C++ executable.
 * @param {number} numElements - The number of elements to sort.
 * @returns {Promise<number>} - A promise that resolves to the sorting duration in seconds.
 */
function runSortProcess(executablePath, numElements) {
  return new Promise((resolve, reject) => {
    // Spawn the C++ process. It's crucial to use the correct relative path.
    const sortProcess = spawn(executablePath);

    let output = '';
    let errorOutput = '';

    // Capture the standard output from the C++ program
    sortProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    // Capture any errors from the C++ program
    sortProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    // Handle the process exit
    sortProcess.on('close', (code) => {
      if (code === 0) {
        // Success: The C++ program exited normally.
        // Convert the output string to a floating-point number.
        const duration = parseFloat(output);
        if (isNaN(duration)) {
          reject(new Error(`Failed to parse C++ output as a number: "${output}"`));
        } else {
          resolve(duration);
        }
      } else {
        // Error: The C++ program crashed or returned an error code.
        reject(new Error(`C++ process exited with code ${code}. Error: ${errorOutput}`));
      }
    });
    
    // This is how we send data to the C++ program's stdin.
    // We generate the random numbers here and stream them in.
    for (let i = 0; i < numElements; i++) {
        // Generate a random integer and write it to the process's stdin stream
        const randomNum = Math.floor(Math.random() * 1000000) + 1;
        sortProcess.stdin.write(`${randomNum}\n`);
    }

    // End the stdin stream to signal that we are done sending data.
    // This is what allows the `while (std::cin >> number)` loop in C++ to finish.
    sortProcess.stdin.end();
  });
}

// The main API endpoint that the frontend will call
// The main API endpoint that the frontend will call
app.post('/sort', async (req, res) => {
  const { numElements } = req.body;

  // Basic validation
  if (!numElements || numElements <= 0) {
    return res.status(400).json({ error: 'Number of elements must be a positive integer.' });
  }

  // Define paths to BOTH executables
  const parallelSortExe = path.join(__dirname, '../Mergesort_Threading/parallel_sort');
  const sequentialSortExe = path.join(__dirname, '../Mergesort_Threading/sequential_sort');

  // THIS IS THE CORRECT LOG MESSAGE
  console.log(`Starting benchmark for ${numElements} elements...`);

  try {
    // Run both sorting processes at the same time using Promise.all
    const [parallelTime, sequentialTime] = await Promise.all([
      runSortProcess(parallelSortExe, parseInt(numElements, 10)),
      runSortProcess(sequentialSortExe, parseInt(numElements, 10))
    ]);
    
    // THIS IS THE MISSING LOG MESSAGE
    console.log(`Sequential sort finished in ${sequentialTime} seconds.`);
    console.log(`Parallel sort finished in ${parallelTime} seconds.`);

    // Determine the winner
    const winner = parallelTime < sequentialTime ? 'Parallel' : 'Sequential';

    // Send the complete results back
    res.json({
      parallelTime,
      sequentialTime,
      winner
    });

  } catch (error) {
    console.error('Error running sort process:', error.message);
    res.status(500).json({ error: `Failed to execute C++ sort. Details: ${error.message}` });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});