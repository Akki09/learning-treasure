# Q : [Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/description/)
You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.

# TestCases

- **Example 1:**
- Input: root = [1,2,3,4,5,6,7]
- Output: [1,#,2,3,#,4,5,6,7,#]
- Explanation: Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.

- **Example 2:**
- Input: root = []
- Output: []

# Constraints:
- The number of nodes in the tree is in the range [0, 2^12 - 1].
- -1000 <= Node.val <= 1000

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
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}
    
    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};
*/

class Solution {
    public Node connect(Node root) {

        //early check
        if(root == null) {
            return null;
        }
        
        Queue<Node> queue = new LinkedList<>();
        queue.offer(root);

        doConnect(queue);

        return root;
    }

    private void doConnect(Queue<Node> queue) {

        while(!queue.isEmpty()) {
            int size = queue.size();
            // size define how many sibblings are their for current level
            for(int i = 0; i < size; i++) {
                // 1. Remove from queue
                Node polled = queue.poll();

                // 2. Do work
                if(i == size - 1) {
                    polled.next = null;
                } else {
                    polled.next = queue.peek();
                }

                // 3. Add Children
                if(polled.left != null) {
                    queue.offer(polled.left);
                }

                if(polled.right != null) {
                    queue.offer(polled.right);
                }
            }
        }
    }
}
```

# Optimized Code
```java []
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}
    
    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};
*/

class Solution {
    public Node connect(Node root) {
        // base case
        if(root == null) {
            return null;
        }
        
        // if root.left is not null then set it's next pointer to roo.right
        // if root.right is null then next pointer will point to null and i.e. requirement
        // Remember this is Perfect Binary Tree
        if(root.left != null) {
            root.left.next = root.right;
        }

        // if right child is not null then root.next(next sibbling's left child we will attached)
        // This will be always give us correct ans as this is Perfect Binary Tree
        if(root.right != null && root.next != null) {
            root.right.next = root.next.left;
        }
        // do same for left child
        connect(root.left);
        // do same for right child
        connect(root.right);
        
        return root;
    }
}
```