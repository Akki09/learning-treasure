# Q : [Binary Tree Tilt](https://leetcode.com/problems/binary-tree-tilt/description/)
Given the root of a binary tree, return the sum of every tree node's tilt.

The tilt of a tree node is the absolute difference between the sum of all left subtree node values and all right subtree node values. If a node does not have a left child, then the sum of the left subtree node values is treated as 0. The rule is similar if the node does not have a right child.

# TestCases

- **Example 1:**
Input: root = [1,2,3]
Output: 1
Explanation: 
Tilt of node 2 : |0-0| = 0 (no children)
Tilt of node 3 : |0-0| = 0 (no children)
Tilt of node 1 : |2-3| = 1 (left subtree is just left child, so sum is 2; right subtree is just right child, so sum is 3)
Sum of every tilt : 0 + 0 + 1 = 1


- **Example 2:**
Input: root = [4,2,9,3,5,null,7]
Output: 15
Explanation: 
Tilt of node 3 : |0-0| = 0 (no children)
Tilt of node 5 : |0-0| = 0 (no children)
Tilt of node 7 : |0-0| = 0 (no children)
Tilt of node 2 : |3-5| = 2 (left subtree is just left child, so sum is 3; right subtree is just right child, so sum is 5)
Tilt of node 9 : |0-7| = 7 (no left child, so sum is 0; right subtree is just right child, so sum is 7)
Tilt of node 4 : |(3+5+2)-(9+7)| = |10-16| = 6 (left subtree values are 3, 5, and 2, which sums to 10; right subtree values are 9 and 7, which sums to 16)
Sum of every tilt : 0 + 0 + 0 + 2 + 7 + 6 = 15

- **Example 3:**
Input: root = [21,7,14,1,1,2,2,3,3]
Output: 9


# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->

# Optimized Code
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
    int sum = 0;
    public int findTilt(TreeNode root) {
        findTiltSum(root);
        return sum;
    }

    private int findTiltSum(TreeNode root) {
        // base case
        if(root == null) {
            return 0;
        }

        // for the leaf node
        if(root.left == null && root.right == null) {
            // here for leaf node we don't need to add tilt sum as
            // for leaf node left is 0 and right is 0 so abs diff = 0;
            return root.val;
        }

        // explore the left side for left child values
        int leftSum = findTiltSum(root.left);
        // explore the right side for left child values
        int rightSum = findTiltSum(root.right);

        // store the tilt sum in global variable
        sum += Math.abs(leftSum - rightSum);

        // but we need to return left side and right side sum to every node
        // so they can calculate the their tilt sum
        return root.val + leftSum + rightSum;
    }
}
```