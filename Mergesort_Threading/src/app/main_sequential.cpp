#include <iostream>
#include <vector>
#include <string>
#include <chrono>
// Only include the sequential sort header
#include "sorting/mergeSort.hpp" 

int main(int argc, char *argv[]) {
    std::vector<int> nums;
    int number;

    while (std::cin >> number) {
        nums.push_back(number);
    }

    if (nums.empty()) {
        std::cerr << "Error: No numbers provided to sort." << std::endl;
        return 1;
    }

    // This main file now uses the SEQUENTIAL MergeSort class
    MergeSort sorter(nums);

    auto start = std::chrono::high_resolution_clock::now();
    sorter.sort();
    auto end = std::chrono::high_resolution_clock::now();

    std::chrono::duration<double> duration = end - start;

    std::cout << duration.count();

    return 0;
}