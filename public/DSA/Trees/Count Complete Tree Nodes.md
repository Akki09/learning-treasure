# Q : [Count Complete Tree Nodes](https://leetcode.com/problems/count-complete-tree-nodes/description/?source=submission-ac)
Given the root of a complete binary tree, return the number of the nodes in the tree.

According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

Design an algorithm that runs in less than O(n) time complexity.

# TestCases

- **Example 1:**
Input: root = [1,2,3,4,5,6]
Output: 6

- **Example 2:**
Input: root = []
Output: 0

- **Example 3:**
Input: root = [1]
Output: 1


# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->

# Code
```java []
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int countNodes(TreeNode root) {
        return noOfNodes(root);
    }

    private int noOfNodes(TreeNode root) {
        
        //base case
        if(root == null) {
            return 0;
        }

        // for leaf node return 1;
        if(root.left == null && root.right == null) {
            return 1;
        }

        // current node + (nodes on left) + (nodes on right)
        return 1 + noOfNodes(root.left) + noOfNodes(root.right);
    }
}
```
