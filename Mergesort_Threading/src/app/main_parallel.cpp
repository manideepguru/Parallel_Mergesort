#include <iostream>
#include <vector>
#include <string>
#include <chrono>
#include "sorting/parallelMergeSort.hpp"

int main(int argc, char *argv[]) {
    // We will now read from standard input (cin) instead of command-line arguments (argv).
    // This allows us to handle an unlimited number of inputs.
    
    std::vector<int> nums;
    int number;

    // This loop reads numbers from standard input until there are no more numbers to read.
    while (std::cin >> number) {
        nums.push_back(number);
    }

    if (nums.empty()) {
        std::cerr << "Error: No numbers provided to sort." << std::endl;
        return 1;
    }

    // The sorting logic remains the same.
    ParallelMergeSort sorter(nums);

    auto start = std::chrono::high_resolution_clock::now();
    sorter.sort();
    auto end = std::chrono::high_resolution_clock::now();

    std::chrono::duration<double> duration = end - start;

    // Output only the time.
    std::cout << duration.count();

    return 0;
}