# Q : [Sum of Nodes with Even-Valued Grandparent](https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent/description/)
Given the root of a binary tree, return the sum of values of nodes with an even-valued grandparent. If there are no nodes with an even-valued grandparent, return 0.

A grandparent of a node is the parent of its parent if it exists.

# TestCases

- **Example 1:**
- Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
- Output: 18
- Explanation: The red nodes are the nodes with even-value grandparent while the blue nodes are the even-value grandparents.

- **Example 2:**
- Input: root = [1]
- Output: 0

# Constraints:
- The number of nodes in the tree is in the range [1, 104].
- 1 <= Node.val <= 100

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
 * int val;
 * TreeNode left;
 * TreeNode right;
 * TreeNode() {}
 * TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) {
 * this.val = val;
 * this.left = left;
 * this.right = right;
 * }
 * }
 */
class Solution {
    public int sumEvenGrandparent(TreeNode root) {
        // Find the Root to Leaf path then for each i value check for i-2 is even or not
        ArrayList<Integer> rootToNodePath = new ArrayList<>();
        return doSumOfNodeWithEvenGrandparent(root, rootToNodePath);
    }

    private int doSumOfNodeWithEvenGrandparent(TreeNode root, ArrayList<Integer> rootToNodePath) {
        int sum = 0;
        // base case
        if (root == null) {
            return 0;
        }

        // add the current node from path
        rootToNodePath.add(root.val);

        // calculate the sum for the current node, if grandparent is even add current node in sum
        if (rootToNodePath.size() -1 - 2 >= 0) {
            // checking if grandparent is even?
            if(rootToNodePath.get(rootToNodePath.size() -1 - 2) % 2 == 0) {
                // if Yes, adding current node
                sum+= rootToNodePath.get(rootToNodePath.size() - 1);
            }
        }

        // in case of leaf node just return the sum after removing the latest node from path
        if (root.left == null && root.right == null) {
            rootToNodePath.remove(rootToNodePath.size() - 1);
            return sum;
        }

        // calculate for left child of current node
        int leftSum = doSumOfNodeWithEvenGrandparent(root.left, rootToNodePath);

        // calculate for right child of current node
        int rightSum = doSumOfNodeWithEvenGrandparent(root.right, rootToNodePath);

        // remove the current node from path
        rootToNodePath.remove(rootToNodePath.size() - 1);

        // return leftSum + rightSum and current node sum
        return leftSum + rightSum + sum;
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
    public int sumEvenGrandparent(TreeNode root) {

        // initially for root node no one is parent and no one is grandparent
        return doSumOfNodeWithEvenGrandparent(root, -1, -1);
    }

    private int doSumOfNodeWithEvenGrandparent(TreeNode root, int parent, int grandparent) {
        // base case
        if(root == null) {
            return 0;
        }

        // check if grandparent is even then add current node value else 0
        int sum = grandparent % 2 == 0 ? root.val : 0;

        // call for left child,
        // here current node becomes parent for left child 
        // and current node's parent become grandparent for it.
        int left = doSumOfNodeWithEvenGrandparent(root.left, root.val, parent);
        
        // call for right child,
        // here current node becomes parent for right child 
        // and current node's parent become grandparent for it.
        int right = doSumOfNodeWithEvenGrandparent(root.right, root.val, parent);


        // return all the current node sum + left child sum and right child sum
        return left + right + sum;
    }
}
```