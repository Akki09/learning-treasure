# Q : [Path Sum II](https://leetcode.com/problems/path-sum-ii/description/)
Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where the sum of the node values in the path equals targetSum. Each path should be returned as a list of the node values, not node references.

A root-to-leaf path is a path starting from the root and ending at any leaf node. A leaf is a node with no children.

# TestCases

- **Example 1:**
- Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
- Output: [[5,4,11,2],[5,8,4,5]]
- Explanation: There are two paths whose sum equals targetSum:
5 + 4 + 11 + 2 = 22
5 + 8 + 4 + 5 = 22

- **Example 2:**
- Input: root = [1,2,3], targetSum = 5
- Output: []

- **Example 3:**
- Input: root = [1,2], targetSum = 0
- Output: []

# Constraints:
- The number of nodes in the tree is in the range [0, 5000].
- -1000 <= Node.val <= 1000
- -1000 <= targetSum <= 1000


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
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {

        List<List<Integer>> result = new ArrayList<>();
        List<Integer> rootToLeafPath = new ArrayList<>();

        findPathSum(root, targetSum, 0, rootToLeafPath, result);
        return result;
    }

    private void findPathSum(TreeNode root, int targetSum, int currSum, List<Integer> rootToLeafPath, List<List<Integer>> result) {
        // base case
        if(root == null) {
            return;
        }

        // adding the current path
        rootToLeafPath.add(root.val);
        

        // if we reach leaf node then check did we get the currSum == targetSum
        if(root.left == null && root.right == null) {
            if(currSum + root.val == targetSum) {
                // if yes then add the path in result array
                result.add(new ArrayList(rootToLeafPath));
            }
        } else {
            // else check for non leaf node on left and right side
            findPathSum(root.left, targetSum, currSum + root.val, rootToLeafPath, result);
            findPathSum(root.right, targetSum, currSum + root.val, rootToLeafPath, result);
        }

        // remove the current path as we have already traversed
        rootToLeafPath.remove(rootToLeafPath.size() -1);
    }
}
```