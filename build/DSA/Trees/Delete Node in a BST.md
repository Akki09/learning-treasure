# Q : [Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/description/)
Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:

1. Search for a node to remove.
2. If the node is found, delete the node.

# TestCases

- **Example 1:**
- Input: root = [5,3,6,2,4,null,7], key = 3
- Output: [5,4,6,2,null,null,7]
- Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.

- **Example 2:**
- Input: root = [5,3,6,2,4,null,7], key = 0
- Output: [5,3,6,2,4,null,7]
- Explanation: The tree does not contain a node with value = 0.

- **Example 3:**
- Input: root = [], key = 0
- Output: []

# Constraints:
- The number of nodes in the tree is in the range [0, 104].
- -10^5 <= Node.val <= 10^5
- Each node has a unique value.
- root is a valid binary search tree.
- -10^5 <= key <= 10^5


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
    public TreeNode deleteNode(TreeNode root, int key) {
       return deleteNodeWithKey(root, key);
    }

    private TreeNode deleteNodeWithKey(TreeNode root, int target){
        //base case 
        if(root == null) {
            return null;
        }

        // if target found
        if(root.val == target) {
            // if target is leaf node
            if(root.left == null && root.right == null) {
                return null;
            }

            // if one of the child is null(Single child case)
            if(root.left == null || root.right == null) {
                return root.left == null ? root.right : root.left;
            }

            // if both child present
            // find the left max or right min 
            int leftMax = findMax(root.left);

            // replace with current node value
            root.val = leftMax;

            // now delete the leftMax from left side of current node as we have replaced with current node
            root.left = deleteNodeWithKey(root.left, leftMax);
        }

        // check for target for left child
        root.left = deleteNodeWithKey(root.left, target);
        // check for target for right child
        root.right = deleteNodeWithKey(root.right, target);

        return root;
    }

    // find the max value for current node
    private int findMax(TreeNode root) {
        while(root.right != null) {
            root = root.right;
        }

        return root.val;
    }
}
```