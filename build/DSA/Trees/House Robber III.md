# Q : [House Robber III](https://leetcode.com/problems/house-robber-iii/description/)
The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.

Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.

Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.

# TestCases

- **Example 1:**
- Input: root = [3,2,3,null,3,null,1]
- Output: 7
- Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.

- **Example 2:**
- Input: root = [3,4,5,1,3,null,1]
- Output: 9
- Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.

# Constraints:
- The number of nodes in the tree is in the range [1, 10^4].
- 0 <= Node.val <= 10^4

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
    public int rob(TreeNode root) {
        // robberyResult[0] Rob this current house
        // robberyResult[1] Skip Robbery at this house
        int[] robberyResult = doRobbery(root);
        
        // return max of rob and not rob at root node, as we have started building result from leaf node
        return Math.max(robberyResult[0], robberyResult[1]);
    }

    private int[] doRobbery(TreeNode root) {
        // base case
        if(root == null) {
            // return an array of size 2 with default value 0 as we can't rob at this place
            return new int[2];
        }

        int[] leftResult = doRobbery(root.left);
        int[] rightResult = doRobbery(root.right);

        // go till end and try to build this from leaf node
        int[] robberResult = new int[2];

        // if I rob current node I can pick the amount which I get by nor robbing my child node
        robberResult[0] = root.val + leftResult[1] + rightResult[1];

        // if I choose to skip robbery at current Node, 
        // I can pick max result of rob or not rob from leftResult along with
        // max result of rob or not rob rightResult
        robberResult[1] = Math.max(leftResult[0], leftResult[1]) + Math.max(rightResult[0], rightResult[1]);

        return robberResult;
        
    }
}
```