# Q : [Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/description/)
You are given the root of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.

# TestCases

- **Example 1:**
- Input: root = [1,3,null,null,2]
- Output: [3,1,null,null,2]
- Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.

- **Example 2:**
- Input: root = [3,1,4,null,null,2]
- Output: [2,1,4,null,null,3]
- Explanation: 2 cannot be in the right subtree of 3 because 2 < 3. Swapping 2 and 3 makes the BST valid.

# Constraints:
- The number of nodes in the tree is in the range [2, 1000].
- -2^31 <= Node.val <= 2^31 - 1


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
    // as we are not chaning the structure so creting obj so we can just swap the values
    private TreeNode first;
    private TreeNode middle;
    private TreeNode last;
    private TreeNode prev;

    public void recoverTree(TreeNode root) {
        
        // as node value can be in any range so taking prev as null
        first = middle = last = prev = null;

        // doing in order traversal
        doInorderTraversal(root);

        // if two extreem values are interchanged
        if(first != null && last != null) {
            int temp = first.val;
            first.val = last.val;
            last.val = temp;
        } else {
            // if adjacent values are interchanged
            int temp = first.val;
            first.val = middle.val;
            middle.val = temp;
        }
    }

    public void doInorderTraversal(TreeNode root) {
        
        // base case
        if(root == null) {
            return;
        }
        
        // do left traversal
        doInorderTraversal(root.left);

        // logic to recover BST
        if(prev != null && prev.val > root.val) {
            // if we are encountering the first mismatached order while doing inOrder traversal
            // possiblites nearby value are interchanged
            if(first == null) {
                first = prev;
                middle = root;
            } else {
                // if we encounter 2nd time mismatched value while doing inOrder traversal
                // this means extreem ends values are interchanged
                last = root;
            }
        }

        // V.IMP step
        prev = root;

        // do right traversal
        doInorderTraversal(root.right);
    }
}
```