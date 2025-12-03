import { 
  Section, 
  Paragraph, 
  List, 
  ListItem, 
  Code, 
  Callout, 
  Heading 
} from "@/components/AlgorithmContent";
import { IterationCw } from "lucide-react";

export const Solution = () => (
  <>
    <Section title="Algorithm Overview">
      <Callout type="algorithm">
        <Heading>Algorithm Steps</Heading>
        <ol className="space-y-4 list-decimal list-inside marker:font-semibold marker:text-primary">
          <li className="text-foreground">
            <strong>Base case</strong> — Handle empty or single-element arrays:
            <List>
              <ListItem>If left pointer {">"} right pointer → return nil</ListItem>
              <ListItem>This terminates recursion for subarrays</ListItem>
            </List>
          </li>
          
          <li className="text-foreground">
            <strong>Find middle element:</strong>
            <List>
              <ListItem>Calculate middle index: mid = (left + right) / 2</ListItem>
              <ListItem>Create new tree node with arr[mid] as value</ListItem>
            </List>
          </li>
          
          <li className="text-foreground">
            <div className="inline-flex items-center gap-2 -mt-0.5">
              <IterationCw className="h-4 w-4 text-primary flex-shrink-0" />
              <strong>Recursively build subtrees:</strong>
            </div>
            <List>
              <ListItem>Left subtree: recursively process arr[left...mid-1]</ListItem>
              <ListItem>Right subtree: recursively process arr[mid+1...right]</ListItem>
            </List>
          </li>
          
          <li className="text-foreground">
            <strong>Return root</strong> — The constructed BST with minimal height
          </li>
        </ol>
      </Callout>
    </Section>

    <Section title="Code">
      <Code language="go">
{`type bstNode struct {
	left  *bstNode
	right *bstNode
	value int
}

func createBST(a []int) *bstNode {
	return build(a, 0, len(a)-1)
}

func build(a []int, lo, hi int) *bstNode {
	if lo > hi {
		return nil
	}
	mid := (lo + hi) / 2
	return &bstNode{
		value: a[mid],
		left:  build(a, lo, mid-1),
		right: build(a, mid+1, hi),
	}
}`}
      </Code>
    </Section>

    <Section title="Time & Space Complexity">
      <Paragraph>
        <strong>Time Complexity:</strong> O(n) — We visit each element exactly once to create a node
      </Paragraph>
      <Paragraph>
        <strong>Space Complexity:</strong> O(log n) — The recursion stack depth equals the tree height, which is log n for a balanced tree
      </Paragraph>
    </Section>
  </>
);
