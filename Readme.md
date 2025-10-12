# Full-Stack C++ Sorting Benchmark

This project is a full-stack web application designed to benchmark and visualize the performance difference between a standard sequential Merge Sort and a multi-threaded Parallel Merge Sort implemented in C++.

The backend is powered by Node.js, which executes the compiled C++ programs, while the frontend is a modern and responsive React application that allows users to interactively run the benchmark and see the results in real-time.

---

## 📸 Screenshot

![Application Screenshot](C:\Users\Manideep Guru\Pictures\Screenshots)



---

## ⚙️ Tech Stack

-   **C++ Core (`Mergesort_Threading`):**
    -   **C++17:** For modern language features.
    -   **`std::thread`:** For multi-threaded parallelism.
    -   **`std::chrono`:** For high-precision time measurement.
-   **Backend (`Backend`):**
    -   **Node.js:** As the server runtime.
    -   **Express.js:** As the web server framework.
    -   **Child Process (`spawn`):** To execute and communicate with the C++ programs.
-   **Frontend (`Frontend`):**
    -   **React.js:** For building the interactive user interface.
    -   **`fetch` API:** For asynchronous communication with the backend.
    -   **CSS3:** For modern styling.

---

## 🚀 Features

-   🧠 **Clean C++ Implementations:** Both sequential and parallel merge sort algorithms in a class-based architecture.
-   ⚡ **True Parallelism:** Utilizes `std::thread` to divide and conquer the sorting task across multiple CPU cores.
-   🌐 **Full-Stack Architecture:** A decoupled frontend, backend, and C++ core for a robust and scalable design.
-   📊 **Interactive UI:** A user-friendly React interface to trigger benchmarks and view real-time results.
-   🖥️ **Efficient Backend:** A Node.js server that efficiently manages C++ child processes and streams large datasets via `stdin`.
-   ⏱️ **Accurate Benchmarking:** Compares the execution time of both algorithms on user-defined dataset sizes.

---

## 🛠️ How to Run This Project Locally

Follow these steps to set up and run the project on your local machine.

### **Prerequisites**

-   [Git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/en/) (which includes npm)
-   A C++ compiler with C++17 support (like g++ or Clang)

### **Step 1: Clone the Repository**

```bash
git clone <YOUR_REPOSITORY_URL>
cd PARALLEL_SORT
# Navigate to the C++ project folder
cd Mergesort_Threading

# Compile the sequential version
g++ -std=c++17 -O2 src/app/main_sequential.cpp src/app/sorting/mergeSort.cpp -o sequential_sort

# Compile the parallel version (with the -pthread flag)
g++ -std=c++17 -O2 -pthread src/app/main_parallel.cpp src/app/sorting/parallelMergeSort.cpp -o parallel_sort

# Go back to the root directory
cd ..
# Navigate to the Backend folder
cd Backend

# Install dependencies
npm install

# Run the server (using nodemon for auto-restarts)
nodemon server.js
# Navigate to the Frontend folder
cd Frontend

# Install dependencies
npm install

# Start the React development server
npm start
