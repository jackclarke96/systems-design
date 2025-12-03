import { 
  Callout, 
  Paragraph,
  Section, 
  LinkedListDiagram,
} from "@/components/AlgorithmContent";
import { VisualizationStep } from "@/components/algorithm-content/VisualizationStepThreeDSLayout";

export const Improvements = () => (
  <>
    <Callout type="tip">
      The question asks us whether we can do this without creating any extra data structures in memory i.e. we cannot create the `seen` map
    </Callout>

    <Callout type="algorithm" title="No Extra Space Approach">
      <Paragraph>
        To do this, upon arrival at a node, rather than add to the map and continue, we would have to traverse the entire remainder of the list and remove dupes on the way.
      </Paragraph>
      <Paragraph>
       We would then move onto the next node and repeat, meaning that we traversed the entire remainder of the list at each step in the algorithm.
      </Paragraph>
    </Callout>

    <Section title="Visualizing the Quadratic Behavior">
      <Paragraph>
        Each node must compare itself against all remaining nodes, creating nested iteration:
      </Paragraph>
      
      <VisualizationStep
        title="Step 1: First node checks n-1 remaining nodes"
        description="Starting at node 1, we must check all 4 remaining nodes (2→5→1→3). This is 4 comparisons."
        dataStructures={[
          {
            type: 'linkedList',
            label: '4 comparisons from first node',
            data: {
              nodes: [
                { value: 1, state: 'current' },
                { value: 2, state: 'highlighted' },
                { value: 5, state: 'highlighted' },
                { value: 1, state: 'highlighted' },
                { value: 3, state: 'highlighted' }
              ],
              customArrows: [
                { from: 0, to: 1, label: '1', color: 'primary' },
                { from: 0, to: 2, label: '2', color: 'primary' },
                { from: 0, to: 3, label: '3', color: 'primary' },
                { from: 0, to: 4, label: '4', color: 'primary' }
              ]
            }
          }
        ]}
      />

      <VisualizationStep
        title="Step 2: Second node checks n-2 remaining nodes"
        description="At node 2, we check the 3 remaining nodes (5→1→3). This is 3 comparisons."
        dataStructures={[
          {
            type: 'linkedList',
            label: '3 comparisons from second node',
            data: {
              nodes: [
                { value: 1, state: 'visited' },
                { value: 2, state: 'current' },
                { value: 5, state: 'highlighted' },
                { value: 1, state: 'highlighted' },
                { value: 3, state: 'highlighted' }
              ],
              customArrows: [
                { from: 1, to: 2, label: '1', color: 'primary' },
                { from: 1, to: 3, label: '2', color: 'primary' },
                { from: 1, to: 4, label: '3', color: 'primary' }
              ]
            }
          }
        ]}
      />

      <VisualizationStep
        title="Step 3: Third node checks n-3 remaining nodes"
        description="At node 5, we check the 2 remaining nodes (1→3). This is 2 comparisons."
        dataStructures={[
          {
            type: 'linkedList',
            label: '2 comparisons from third node',
            data: {
              nodes: [
                { value: 1, state: 'visited' },
                { value: 2, state: 'visited' },
                { value: 5, state: 'current' },
                { value: 1, state: 'highlighted' },
                { value: 3, state: 'highlighted' }
              ],
              customArrows: [
                { from: 2, to: 3, label: '1', color: 'primary' },
                { from: 2, to: 4, label: '2', color: 'primary' }
              ]
            }
          }
        ]}
      />

      <VisualizationStep
        title="Step 4: Fourth node checks n-4 remaining node"
        description="At the duplicate node 1, we check the 1 remaining node (3). This is 1 comparison, and we remove this node."
        dataStructures={[
          {
            type: 'linkedList',
            label: '1 comparison from fourth node',
            data: {
              nodes: [
                { value: 1, state: 'visited' },
                { value: 2, state: 'visited' },
                { value: 5, state: 'visited' },
                { value: 1, state: 'current', inMemory: false },
                { value: 3, state: 'highlighted' }
              ],
              brokenLinks: [{ afterIndex: 2 }],
              customArrows: [
                { from: 3, to: 4, label: '1', color: 'primary' },
                { from: 2, to: 4, label: 'rewire', color: 'secondary', style: 'dashed' }
              ]
            }
          }
        ]}
      />

      <Paragraph>
        **Total comparisons**: 4 + 3 + 2 + 1 = 10 comparisons for a list of 5 nodes. This follows the formula: `n × (n - 1) / 2 = O(n²)`
      </Paragraph>
    </Section>
      <Section title="Time & Space Complexity">
      <Paragraph>
        <strong>Time Complexity:</strong>  At best, when every node's value is a duplicate of the first, we traverse the list once — O(n).
  At worst (no duplicates), the first node is compared against n–1 others, the second against n–2, the third against n–3, and so on, 
  until the last node. This gives us a total of 
  Σ<sub>i=1</sub><sup>n</sup> i steps, which simplifies to (n × (n + 1)) / 2 = O(n²).
      </Paragraph>
      <Paragraph>
        <strong>Space Complexity:</strong> O(1) — We use memory to store a pointer to `curr` and that's about it. O(1).
      </Paragraph>
    </Section>
  </>
);
