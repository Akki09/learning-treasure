# Q : [Sum of Root To Leaf Binary Numbers](https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/description/)
You are given the root of a binary tree where each node has a value 0 or 1. Each root-to-leaf path represents a binary number starting with the most significant bit.

For example, if the path is 0 -> 1 -> 1 -> 0 -> 1, then this could represent 01101 in binary, which is 13.
For all leaves in the tree, consider the numbers represented by the path from the root to that leaf. Return the sum of these numbers.

The test cases are generated so that the answer fits in a 32-bits integer.

# TestCases

- **Example 1:**
Input: root = [1,0,1,0,1,0,1]
Output: 22
Explanation: (100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22

- **Example 2:**
Input: root = [0]
Output: 0

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
    public int sumRootToLeaf(TreeNode root) {
        
        return binarySum(root, "");
    }

    private int binarySum(TreeNode root, String rootToLeafPath) {

            if(root == null) {
                return 0;
            }
            if(root.left == null && root.right == null) {
                return generateDecimal(rootToLeafPath + root.val);
            }

        return binarySum(root.left, rootToLeafPath + root.val) + binarySum(root.right, rootToLeafPath + root.val);
    }

    private int generateDecimal(String path) {

        int ans = 0;
        int pow = 0;
        for(int i = path.length() - 1; i >= 0; i--) {
            ans += (path.charAt(i) - '0') * (int) Math.pow(2, pow);
            pow++;
        }

        return ans;
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
    public int sumRootToLeaf(TreeNode root) {
        
        return dorootToLeafSum(root, 0);
    }

    private int dorootToLeafSum(TreeNode root, int currSum) {

            if(root == null) {
                return 0;
            }
            
            // Root Middle Leaf
            // 101 => 2^2 * 1 + 2^1 * 0 + 2^0 * 1 =>5
            // this will multiply 1st step prevCurrValue(i.e 0) with 2 and add root.val(1)
            // in next step prevCurrVal (1) will get multiply with 2 and added curr roo.val(0)
            // in next step prevCurrVal(1) will get multiply with 2(effectively got multiply with 2^2) and root.val(1) is added
            // final ans is 5
            currSum = (currSum) * 2 + root.val;

            if(root.left == null && root.right == null) {
                return currSum;
            }

        return dorootToLeafSum(root.left, currSum) + dorootToLeafSum(root.right, currSum);
    }
}
```