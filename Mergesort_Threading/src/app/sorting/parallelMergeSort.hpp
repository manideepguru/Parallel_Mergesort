#ifndef PARALLELMERGESORT_H
#define PARALLELMERGESORT_H

#include <vector>
#include <thread>

class ParallelMergeSort {
private:
    std::vector<int>& nums; // Changed from pointer to reference for safety
    void recursiveSort(int left, int right, int depth);

public:
    // Constructor takes a reference now
    ParallelMergeSort(std::vector<int>& nums);
    
    // Declaration for the destructor (This fixes your compilation error)
    ~ParallelMergeSort();
    
    // Public sort function to start the process
    void sort();
};

#endif