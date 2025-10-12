#include "parallelMergeSort.hpp"
#include <algorithm> // Required for std::inplace_merge
#include <iostream>

// Use an initializer list to initialize the reference member 'nums'
ParallelMergeSort::ParallelMergeSort(std::vector<int>& nums) : nums(nums) {}

// The definition for the destructor (can be empty if no cleanup is needed)
ParallelMergeSort::~ParallelMergeSort() {}

void ParallelMergeSort::recursiveSort(int left, int right, int depth) {
    if (left >= right) {
        return;
    }

    // Set a threshold for switching to a simple sort for small segments
    const int THRESHOLD = 5000;
    if (right - left < THRESHOLD) {
        std::sort(nums.begin() + left, nums.begin() + right + 1);
        return;
    }

    int mid = left + (right - left) / 2;

    // Limit the number of threads to avoid performance loss.
    // std::thread::hardware_concurrency() is often used to guide this. Let's use a simple depth limit.
    const int MAX_DEPTH = 3; // This will create up to 2^3 = 8 threads

    if (depth < MAX_DEPTH) {
        // Create a new thread for the left half
        std::thread left_thread(&ParallelMergeSort::recursiveSort, this, left, mid, depth + 1);
        // Sort the right half in the current thread
        this->recursiveSort(mid + 1, right, depth + 1);
        // Wait for the left half's thread to finish
        left_thread.join();
    } else {
        // Once we reach the depth limit, continue sorting sequentially
        this->recursiveSort(left, mid, depth + 1);
        this->recursiveSort(mid + 1, right, depth + 1);
    }

    // Merge the two sorted halves efficiently using the standard library
    std::inplace_merge(nums.begin() + left, nums.begin() + mid + 1, nums.begin() + right + 1);
}

void ParallelMergeSort::sort() {
    if (nums.empty()) {
        return;
    }
    // Start the recursive sort with an initial depth of 0
    recursiveSort(0, nums.size() - 1, 0);
}