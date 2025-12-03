import { 
  Callout, 
  Paragraph, 
} from "@/components/AlgorithmContent";

export const Improvements = () => (
  <>
    <Callout type="tip">
      Consider using a bidirectional BFS for improved performance on large graphs. 
      This searches from both start and end simultaneously, reducing the search space.
    </Callout>

    <Callout type="algorithm" title="Queue Implementation Recommendations">
      <Paragraph>
        <strong>For Small to Medium Graphs</strong> (hundreds / low thousands of nodes)
        → Slices win (simpler, faster, cache-friendly)
      </Paragraph>
      <Paragraph>
        <strong>For Huge Graphs</strong> (millions of nodes)
        → Ring buffer or container/list for stable O(1) operations
      </Paragraph>
    </Callout>
  </>
);
