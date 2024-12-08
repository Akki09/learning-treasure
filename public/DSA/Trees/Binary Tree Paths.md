# Q : [Binary Tree Paths](https://leetcode.com/problems/binary-tree-paths/description/)
Given the root of a binary tree, return all root-to-leaf paths in any order.

A leaf is a node with no children.

# TestCases

- **Example 1:**<br>
Input: root = [1,2,3,null,5]<br>
Output: ["1->2->5","1->3"]

- **Example 2:**<br>
Input: root = [1]<br>
Output: ["1"]

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
    public List<String> binaryTreePaths(TreeNode root) {

        List<String> result = new ArrayList<>();
        findPath(root, "", result);
        return result;
    }

    private void findPath(TreeNode root, String str, List<String> result) {
        if(root == null) {
            return;
        }

        // for leaf node we don't add ->
        if(root.left == null && root.right == null){
            result.add(currentPath + root.val);
        }
        // add root.val + -> to the prev ans. We don't need to backtrack this as string is immutable
        binaryTreeTraverse(root.left, currentPath + root.val + "->");
        // add root.val + -> to the prev ans. We don't need to backtrack this as string is 
        binaryTreeTraverse(root.right, currentPath + root.val + "->");
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
    public List<String> binaryTreePaths(TreeNode root) {

        List<String> result = new ArrayList<>();
        findPath(root, new StringBuilder(), result);
        return result;
    }

    private void findPath(TreeNode root, StringBuilder str, List<String> result) {
        if(root == null) {
            return;
        }
        // remember the length as will help us before returning
        int length = str.length();

        // adding the root value
        str.append(root.val);

        // in case of leaf node we will not add ->
        if(root.left == null && root.right == null) {
            result.add(str.toString());
        } else{
            // append -> and call for left and right child
            str.append("->");
            // before left call status of str will be x->y->
            findPath(root.left, str, result); // inside left side status will be x->y->z
            // if we don't reset the size (as we are doing in last line)then
            // str status before right call will be  x->y->z which is wrong
            // now before right call again status of str will be x->y-> which is correct
            findPath(root.right, str, result);
        }

        // As StringBuilder is mutable so 
        // discarding the changes done during this call so it wont affect other result
        // kind of backtracking
        str.setLength(length);
    }
}
```