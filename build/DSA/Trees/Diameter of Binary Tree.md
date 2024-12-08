# Q : [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/description/)
Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

# TestCases

- **Example 1:**
- Input: root = [1,2,3,4,5]
- Output: 3
- Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].

- **Example 2:**
- Input: root = [1,2]
- Output: 1

# Constraints:
- The number of nodes in the tree is in the range [1, 104].
- 100 <= Node.val <= 100


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
    
    public int diameterOfBinaryTree(TreeNode root) {
        
        // without global variable
        return calDiameter(root);
    }

    private int calDiameter(TreeNode root) {
        // for diameter we are adding + 2(Edges) to connect to left and right child to the node
        // so in case of null -2
        if(root == null) {
            return -2;
        }
        // get the height of current node
        int left = calHeight(root.left);
        int right = calHeight(root.right);

        // check if diameter of left child or right child or current node is greater
        return Math.max(Math.max(calDiameter(root.left), calDiameter(root.right)), left + right + 2);

    }

    private int calHeight(TreeNode root) {
        // if left or right is null then return -1 height
        // as we are calculating the height in terms of EDGES
        if(root == null) {
            return -1;
        }

        // we are calculating the left and right hegiht of the node
        int left = calHeight(root.left);
        int right = calHeight(root.right);

        // return the height;
        return 1 + Math.max(left, right);
    }
}
```

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
    int dia = 0;
    
    public int diameterOfBinaryTree(TreeNode root) {
        
        calHeight(root);
        return dia;
    }

    private int calHeight(TreeNode root) {
        // if left or right is null then return -1 height
        // as we are calculating the height in terms of EDGES
        if(root == null) {
            return -1;
        }

        // we are calculating the left and right hegiht of the node
        int left = calHeight(root.left);
        int right = calHeight(root.right);

        // Cal diameter for each node
        // left height + right height + 2(1-1 edge to connect left and right child)
        dia = Math.max(dia, left + right + 2);

        // return the height;
        return 1 + Math.max(left, right);
    }
}
```