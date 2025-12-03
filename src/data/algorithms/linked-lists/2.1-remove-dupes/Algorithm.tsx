import { 
  Paragraph, 
  Heading, 
  Callout, 
  List, 
  ListItem,
  Code 
} from "@/components/AlgorithmContent";
import { ListNode } from "@/components/LinkedListDiagram";
import { VisualizationStep } from "@/components/algorithm-content/VisualizationStepThreeDSLayout";

const BASE_LIST: ListNode[] = [
  { value: 1, state: "visited" },
  { value: 1, state: "visited" },
  { value: 1, state: "visited" },
  { value: 4, state: "visited" },
  { value: 5, state: "visited" },
  { value: 5, state: "visited" },
  { value: 6, state: "visited" },
  { value: 7, state: "visited" },
  { value: 7, state: "visited" },
] as const;

export const AlgorithmSection = () => (
  <>
    <Paragraph>
      We walk the list and store node values in a hashmap. At each node, we check if we've seen its value before. The tricky part is the rewiring.
    </Paragraph>

    <Heading>Key Concept: Node Removal</Heading>

    <Callout type="definition">
      <Paragraph>
       To remove a node, link the previous node to the next node: `prev.next = curr.next`. Since there's no backwards link in a singly linked list, we must keep `prev` in memory.
      </Paragraph>
      <Code language="go">
{`prev.next = curr.next  // curr is now unreferenced and will be garbage collected`}
      </Code>
    </Callout>

    <Heading>Walkthrough</Heading>

    <VisualizationStep
      title="Step 1: Initialize"
      description={
        <>
          <Paragraph>
            Start with `prev` and `curr` pointers, plus a hashmap to track seen values.
          </Paragraph>
          <Code language="go">
{`prev := head
curr := head.next
seen := map[int]bool{head.value: true}`}
          </Code>
        </>
      }
      linkedList={[
        { value: 1, state: "current" },
        { value: 1, state: "unvisited" },
        { value: 1, state: "unvisited" },
        { value: 4, state: "unvisited" },
        { value: 5, state: "unvisited" },
        { value: 5, state: "unvisited" },
      ]}
      map={[
        { key: "1", value: "true", state: "visited" },
      ]}
    />

    <VisualizationStep
      title="Step 2: Found Duplicate"
      description={
        <>
          <Paragraph>
            `curr.value` is 1, which we've seen before. Remove this node by rewiring `prev.next` to `curr.next`.
          </Paragraph>
          <Code language="go">
{`if seen[curr.value] {
    prev.next = curr.next  // skip curr
} else {
    seen[curr.value] = true
    prev = curr
}
curr = curr.next`}
          </Code>
          <Callout type="warning">
            We don't advance `prev` when deleting. If we did, `prev` would point to the deleted node. This is the most common place to trip up.
          </Callout>
        </>
      }
      linkedList={[
        { value: 1, state: "visited" },
        { value: 1, state: "current" },
        { value: 1, state: "unvisited" },
        { value: 4, state: "unvisited" },
        { value: 5, state: "unvisited" },
        { value: 5, state: "unvisited" },
      ]}
      customArrows={[
        { from: 0, to: 2, label: "prev.next", color: "primary" }
      ]}
      map={[
        { key: "1", value: "true", state: "visited" },
      ]}
    />

    <VisualizationStep
      title="Step 3: Garbage Collection"
      description={
        <Paragraph>
          The duplicate node is unreferenced and will be garbage collected automatically. We advance `curr`.
        </Paragraph>
      }
      linkedList={[
        { value: 1, state: "visited" },
        { value: 1, state: "garbage", inMemory: false },
        { value: 1, state: "current" },
        { value: 4, state: "unvisited" },
        { value: 5, state: "unvisited" },
        { value: 5, state: "unvisited" },
      ]}
      brokenLinks={[
        { afterNode: 1 }
      ]}
      map={[
        { key: "1", value: "true", state: "visited" },
      ]}
    />

    <VisualizationStep
      title="Step 4: Another Duplicate"
      description={
        <Paragraph>
          Another 1 found. Same process - rewire around it.
        </Paragraph>
      }
      linkedList={[
        { value: 1, state: "visited" },
        { value: 1, state: "garbage", inMemory: false },
        { value: 1, state: "current" },
        { value: 4, state: "unvisited" },
        { value: 5, state: "unvisited" },
        { value: 5, state: "unvisited" },
      ]}
      customArrows={[
        { from: 0, to: 3, label: "prev.next", color: "primary" }
      ]}
      map={[
        { key: "1", value: "true", state: "visited" },
      ]}
    />

    <VisualizationStep
      title="Step 5: New Value"
      description={
        <Paragraph>
          Value 4 hasn't been seen. Add it to the map and advance `prev`.
        </Paragraph>
      }
      linkedList={[
        { value: 1, state: "visited" },
        { value: 4, state: "current" },
        { value: 5, state: "unvisited" },
        { value: 5, state: "unvisited" },
      ]}
      map={[
        { key: "1", value: "true", state: "visited" },
        { key: "4", value: "true", state: "highlighted" },
      ]}
    />

    <VisualizationStep
      title="Step 6: Complete"
      description={
        <Paragraph>
          Continue until the end, and all duplicates will be removed.
        </Paragraph>
      }
      linkedList={[
        { value: 1, state: "visited" },
        { value: 4, state: "visited" },
        { value: 5, state: "visited" },
        { value: 6, state: "visited" },
        { value: 7, state: "visited" },
      ]}
      map={[
        { key: "1", value: "true", state: "visited" },
        { key: "4", value: "true", state: "visited" },
        { key: "5", value: "true", state: "visited" },
        { key: "6", value: "true", state: "visited" },
        { key: "7", value: "true", state: "visited" },
      ]}
    />
  </>
);
