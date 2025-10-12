#include "mergeSort.hpp"
#include <algorithm> // For std::inplace_merge

MergeSort::MergeSort(std::vector<int>& nums) : nums(nums) {}

MergeSort::~MergeSort() {}

void MergeSort::recursiveSort(int left, int right) {
    if (left >= right) {
        return;
    }
    int mid = left + (right - left) / 2;
    recursiveSort(left, mid);
    recursiveSort(mid + 1, right);

    // Use the efficient standard library merge function
    std::inplace_merge(nums.begin() + left, nums.begin() + mid + 1, nums.begin() + right + 1);
}

void MergeSort::sort() {
    if (nums.size() == 0) {
        return;
    }
    recursiveSort(0, (nums.size() - 1));
}