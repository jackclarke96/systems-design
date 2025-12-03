import { 
  Callout, 
  Paragraph,
  Code,
  Section,
  List,
  ListItem
} from "@/components/AlgorithmContent";

export const Improvements = () => (
  <>
    <Callout type="tip">
      The algorithm naturally creates a balanced tree because we always choose the middle element. 
      The height is guaranteed to be O(log n).
    </Callout>

    <Section title="Alternative: Iterative Approach">
      <Paragraph>
        While recursion is elegant, you can also build the tree iteratively using a queue to track subarrays and parent nodes:
      </Paragraph>
      <Code language="go">
{`func minimalTreeIterative(arr []int) *TreeNode {
  if len(arr) == 0 {
    return nil
  }
  
  mid := len(arr) / 2
  root := &TreeNode{Val: arr[mid]}
  
  type task struct {
    node        *TreeNode
    left, right int
    isLeft      bool
  }
  
  queue := []task{
    {root, 0, mid - 1, true},
    {root, mid + 1, len(arr) - 1, false},
  }
  
  for len(queue) > 0 {
    t := queue[0]
    queue = queue[1:]
    
    if t.left > t.right {
      continue
    }
    
    mid := (t.left + t.right) / 2
    newNode := &TreeNode{Val: arr[mid]}
    
    if t.isLeft {
      t.node.Left = newNode
    } else {
      t.node.Right = newNode
    }
    
    queue = append(queue, 
      task{newNode, t.left, mid - 1, true},
      task{newNode, mid + 1, t.right, false},
    )
  }
  
  return root
}`}
      </Code>
    </Section>

    <Section title="Why This Works">
      <List>
        <ListItem><strong>Minimal height:</strong> By always choosing the middle element, we ensure the tree is as balanced as possible</ListItem>
        <ListItem><strong>BST property maintained:</strong> The sorted array guarantees all elements to the left are smaller and all to the right are larger</ListItem>
        <ListItem><strong>Optimal time:</strong> We must visit every element at least once, so O(n) is optimal</ListItem>
      </List>
    </Section>
  </>
);
