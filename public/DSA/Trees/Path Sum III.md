# Q : [Path Sum III](https://leetcode.com/problems/path-sum-iii/description/)
Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

# TestCases

- **Example 1:**
- Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
- Output: 3
- Explanation: The paths that sum to 8 are shown.

- **Example 2:**
- Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
- Output: 3

# Constraints:
- The number of nodes in the tree is in the range [0, 1000].
- -10^9 <= Node.val <= 10^9
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
    public int pathSum(TreeNode root, int targetSum) {

        int ans = 0;

        //early check
        if(root == null) {
            return 0;
        }

        // Create a queue of the Treenode and for each node check how many path can be created
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while(!queue.isEmpty()) {
            // 1. Remove from queue
            TreeNode polled = queue.poll();

            // 2. Do work
            ans += isPathSumPossible(polled, targetSum);

            // 3. Add childrens
            if(polled.left != null) {
                queue.offer(polled.left);
            }

            if(polled.right != null) {
                queue.offer(polled.right);
            }
        }

        return ans;
    }

    private long isPathSumPossible(TreeNode root, long targetSum) {
        long ans = 0;
        
        // base case
        if(root == null) {
            return ans;
        }

        // if we found the targetSum still continue as we have negative value also present
        // if we are looking for 8 this condition got satisfied
        // what if 1 and -1 also present after this node? so that path is also potential ans
        if(root.val == targetSum) {
            ans++;
        }

        // check pathsum for left child
        ans += isPathSumPossible(root.left, targetSum - root.val);

        // check pathsum for right child
        ans += isPathSumPossible(root.right, targetSum - root.val);

        return ans;
    }
}
```