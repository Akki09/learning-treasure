# Q : [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/)
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

# TestCases

- **Example 1:**
- Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
- Output: 3
- Explanation: The LCA of nodes 5 and 1 is 3.

- **Example 2:**
- Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
- Output: 5
- Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.

- **Example 3:**
- Input: root = [1,2], p = 1, q = 2
- Output: 1

# Constraints:
- The number of nodes in the tree is in the range [2, 105].
- -10^9 <= Node.val <= 10^9
- All Node.val are unique.
- p != q
- p and q will exist in the tree.


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
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        
        return findLowestCommonAncestor(root, p, q);
    }

    private TreeNode findLowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {

        // base case
        if(root == null) {
            return null;
        }

        // if root equals one of the target value i.e p,q then return root
        if(root.val == p.val || root.val == q.val) {
            return root;
        }

        TreeNode left = findLowestCommonAncestor(root.left, p, q);
        TreeNode right = findLowestCommonAncestor(root.right, p, q);

        // from both side we are not getting the null retsult then return root(cuurent node)
        // means one node is on left and one node is right of the current node
        // and the current node is lowest ancistor
        if(left != null && right != null) {
            return root;
        }

        // if one of the left or right is returning the null then return the other value
        return left == null ? right : left;
    }
}
```