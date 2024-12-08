# Q : [Delete Leaves With a Given Value](https://leetcode.com/problems/delete-leaves-with-a-given-value/description/)
Given a binary tree root and an integer target, delete all the leaf nodes with value target.

Note that once you delete a leaf node with value target, if its parent node becomes a leaf node and has the value target, it should also be deleted (you need to continue doing that until you cannot).


# TestCases

- **Example 1:**
- Input: root = [1,2,3,2,null,2,4], target = 2
- Output: [1,null,3,null,4]
- Explanation: Leaf nodes in green with value (target = 2) are removed (Picture in left). 
After removing, new nodes become leaf nodes with value (target = 2) (Picture in center).

- **Example 2:**
- Input: root = [1,3,3,3,2], target = 3
- Output: [1,3,null,null,2]

- **Example 3:**
- Input: root = [1,2,null,2,null,2], target = 2
- Output: [1]
- Explanation: Leaf nodes in green with value (target = 2) are removed at each step.

# Constraints:
- The number of nodes in the tree is in the range [1, 3000].
- 1 <= Node.val, target <= 1000

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
    public TreeNode removeLeafNodes(TreeNode root, int target) {
        return reomoveLeafNodeWithTargetK(root, target);
    }

    private TreeNode reomoveLeafNodeWithTargetK(TreeNode root, int target) {
        // base case
        if(root == null) {
            return root;
        }
        
        // if it's leaf node check for target value
        if(root.left == null && root.right == null) {
            if(root.val == target) {
                return null;
            }
            return root;
        }

        // check for left child's leaf node
        root.left = reomoveLeafNodeWithTargetK(root.left, target);
        // check for right child's leaf node
        root.right = reomoveLeafNodeWithTargetK(root.right, target);


        // if both left and right child are null means our current node becomes leaf node
        // If current node value is equal to target then return null else current node
        if(root.left == null && root.right == null && root.val == target) {
            return null;
        }
        
        return root;
    }
}
```