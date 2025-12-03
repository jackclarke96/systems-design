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
              <strong>Validate inputs</strong> — Early returns for edge cases:
              <List>
                <ListItem>Return if the linked list is nil</ListItem>
                <ListItem>Return if the head is nil</ListItem>
                <ListItem>Return if there's only one node</ListItem>
              </List>
            </li>

            <li className="text-foreground">
              <strong>Initialize data structures:</strong>
              <List>
                <ListItem><strong>seen:</strong> A map to track values we've encountered, initialized with the head's value</ListItem>
                <ListItem><strong>prev:</strong> Points to the head (last node we're keeping)</ListItem>
                <ListItem><strong>curr:</strong> Points to head.next (node we're examining)</ListItem>
              </List>
            </li>
            
            <li className="text-foreground">
              <div className="inline-flex items-center gap-2 -mt-0.5">
                <IterationCw className="h-4 w-4 text-primary flex-shrink-0" />
                <strong>Loop while curr is not nil</strong>
              </div>
              <List>
                <ListItem>Store curr.next in a `next` variable (since we might remove curr)</ListItem>
                <ListItem>If curr.value has been seen before:</ListItem>
                <List>
                  <ListItem>Rewire: prev.next = next (skip curr)</ListItem>
                  <ListItem>Don't advance prev (it still points to the last kept node)</ListItem>
                </List>
                <ListItem>If curr.value is new:</ListItem>
                 <List>
                  <ListItem>Add curr.value to seen map</ListItem>
                  <ListItem>Advance prev to curr (this node is now the last kept node)</ListItem>
                </List>
                <ListItem>Advance curr to next</ListItem>
              </List>
            </li>
          </ol>
        </Callout>
    </Section>

    <Section title="Choosing Data Structures">
      <Paragraph>
        We use a `map[int]bool` to track which values we've seen. This gives us O(1) lookup to check if a value is a duplicate.
      </Paragraph>
      <Paragraph>
        We also maintain two pointers: `prev` (the last node we're keeping) and `curr` (the node we're examining). This allows us to rewire the list when we find duplicates.
      </Paragraph>
    </Section>

    <Section title="Code">
      <Code language="go">
{`func (l *linkedList) removeDupes() {
	if l == nil || l.head == nil || l.head.next == nil {
		return
	}

	prev := l.head
	curr := l.head.next

	seen := map[int]bool{prev.value: true}
	for curr != nil {

		next := curr.next
		if seen[curr.value] {
			prev.next = next
		} else {
			seen[curr.value] = true
			// only move prev forwards if curr was not removed
			prev = curr
		}
		curr = next
	}
}`}
      </Code>
    </Section>
     <Section title="Time & Space Complexity">
      <Paragraph>
        <strong>Time Complexity:</strong> O(n) — We visit each node exactly once. As the linked list grows, our time grows linearly.
      </Paragraph>
      <Paragraph>
        <strong>Space Complexity:</strong> O(n) — The extra space for prev, vurr and next pointers is constant O(1), but the hash map can grow up to n entries in the worst case (when all node values are unique).
      </Paragraph>
    </Section>
  </>
);
