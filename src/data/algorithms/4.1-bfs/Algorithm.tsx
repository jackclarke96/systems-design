import { 
  Paragraph, 
  Heading, 
  Callout, 
  List, 
  ListItem,
  Code 
} from "@/components/AlgorithmContent";
import { VisualizationStep } from "@/components/algorithm-content/VisualizationStepThreeDSLayout";

const BASE_GRAPH = Object.freeze({
  nodes: [
    { id: "S", label: "S", x: 100, y: 100 },
    { id: "A", label: "A", x: 200, y: 100 },
    { id: "B", label: "B", x: 300, y: 100 },
    { id: "C", label: "C", x: 100, y: 200 },
    { id: "D", label: "D", x: 200, y: 200 },
    { id: "E", label: "E", x: 300, y: 200 },
  ],
  edges: [
    { from: "S", to: "A" },
    { from: "A", to: "B" },
    { from: "S", to: "C" },
    { from: "C", to: "A" },
    { from: "A", to: "D" },
    { from: "B", to: "E" },
    { from: "D", to: "C" },
  ],
});

export const AlgorithmSection = () => (
  <>
    <Paragraph>
      To solve this problem, we need to find the shortest path (or reachability) from a starting node <strong>S</strong> to a target node <strong>D</strong> in a graph. 
      Breadth-First Search (BFS) is an ideal choice for this kind of problem because it explores the graph level by level, guaranteeing that the first time we reach the target node, we have found the shortest path.
    </Paragraph>

    <Heading>Algorithm Overview</Heading>

    <Callout type="definition">
      <Paragraph>
        <strong>Breadth-First Search (BFS)</strong> systematically explores all nodes at the current depth before moving deeper into the graph. 
        It uses a <strong>queue</strong> to track the order in which nodes are visited, ensuring that we visit every neighbor of a node before progressing to the next level.
      </Paragraph>

      <Paragraph>
        The key idea is to:
      </Paragraph>

      <List>
        <ListItem>Start from a source node and enqueue it.</ListItem>
        <ListItem>Dequeue nodes one by one and explore all their unvisited neighbors.</ListItem>
        <ListItem>Mark neighbors as visited and enqueue them for later exploration.</ListItem>
        <ListItem>Continue until the target node is found or the queue becomes empty.</ListItem>
      </List>
    </Callout>

    <Heading>Why BFS Instead of DFS?</Heading>
    <Paragraph>
      <strong>BFS</strong> and <strong>DFS</strong> (Depth-First Search) are both fundamental graph traversal algorithms, but they serve different goals:
    </Paragraph>

    <List>
      <ListItem>
        <strong>BFS</strong> explores level by level — perfect for finding the <em>shortest path</em> in an unweighted graph or determining the minimum number of steps from one node to another.
      </ListItem>
      <ListItem>
        <strong>DFS</strong> dives deep into one path before backtracking — it's more suitable for detecting cycles, topological sorting, or exploring all possible paths.
      </ListItem>
      <ListItem>
        <strong>BFS</strong> guarantees the shortest path in terms of edge count because it searches closest nodes first, while <strong>DFS</strong> does not.
      </ListItem>
      <ListItem>
        Because BFS uses a <em>queue</em> instead of recursion or a stack, it maintains predictable order and avoids deep recursion.
      </ListItem>
    </List>

    <Callout type="info">
      <Paragraph>
        In short, <strong>BFS</strong> is preferred when the goal is to reach the target in the fewest steps or to explore the graph evenly outward from a source.
      </Paragraph>
    </Callout>

    <Heading>BFS Algorithm Walkthrough</Heading>

    <VisualizationStep
      title="Step 1"
      description={
        <>
          <Paragraph>
            We initialise a queue to track the nodes we have visited.
            We start BFS from the source node <strong>S</strong>. It's marked as <em>current</em>.
            At each step, we add the neighbours of the node at the end of the queue. We also track which nodes have been visited to prevent cycles.
          </Paragraph>
          <Code>
{`Queue ← ["S"]
Visited ← { "S" }        // S marked visited (starting node)
Target ← "E"`}
          </Code>
        </>
      }
      graph={{
        data: BASE_GRAPH,
        nodeStates: { S: "current" },
      }}
      queue={[
        { value: "S", state: "current" },
      ]}
      map={[
        { key: "S", value: "true", state: "visited" },
      ]}
    />

    <VisualizationStep
      title="Step 2"
      description={
        <>
          <Paragraph>
            We explore the neighbours of node <strong>S</strong>. 
            Node <strong>S</strong>'s neighbors (<strong>A</strong> and <strong>C</strong>) are discovered and <em>queued</em>.
          </Paragraph>
          <Code>
{`current ← dequeue(Queue)    // "S"
for each neighbor in neighbors("S"):   // "A", "C"
    if neighbour is Target:
        return true
    if neighbor not in Visited:
        enqueue(neighbor)
        add neighbor to Visited

// Visited: { "S", "A", "C" }`}
          </Code>
        </>
      }
      graph={{
        data: BASE_GRAPH,
        nodeStates: { S: "current", A: "newlyQueued", C: "newlyQueued" },
      }}
      queue={[
        { value: "S", state: "current" },
        { value: "A", state: "highlighted" },
        { value: "C", state: "highlighted" },
      ]}
      map={[
        { key: "S", value: "true", state: "visited" },
        { key: "A", value: "true", state: "highlighted" },
        { key: "C", value: "true", state: "highlighted" },
      ]}
    />

    <VisualizationStep
      title="Step 3"
      description={
        <>
          <Paragraph>
            <strong>S</strong> is now visited. We process <strong>A</strong> and enqueue its unvisited neighbors.
          </Paragraph>
          <Code>
{`current ← dequeue(Queue)    // "A"
for each neighbor in neighbors("A"):   // "B", "D"
    if neighbour is Target:
        return true
    if neighbor not in Visited:
        enqueue(neighbor)
        add neighbor to Visited

// Visited: { "S", "A", "C", "B", "D" }`}
          </Code>
        </>
      }
      graph={{
        data: BASE_GRAPH,
        nodeStates: {
          S: "visited",
          A: "current",
          C: "queued",
          B: "queued",
          D: "newlyQueued",
        },
      }}
      queue={[
        { value: "A", state: "current" },
        { value: "C", state: "unvisited" },
        { value: "B", state: "unvisited" },
        { value: "D", state: "highlighted" },
      ]}
      map={[
        { key: "S", value: "true", state: "visited" },
        { key: "A", value: "true", state: "visited" },
        { key: "C", value: "true", state: "visited" },
        { key: "B", value: "true", state: "visited" },
        { key: "D", value: "true", state: "highlighted" },
      ]}
    />

    <VisualizationStep
      title="Step 4"
      description={
        <>
          <Paragraph>
            We move on to <strong>C</strong>, marking it as current. Its neighbors are already visited or queued.
          </Paragraph>
          <Callout type="warning">
            This is important. In a directed graph, if we do not avoid retraversing visited nodes, we end up with an infinite loop.
          </Callout>
          <Code>
{`current ← dequeue(Queue)    // "C"
for each neighbor in neighbors("C"):   // "A"
    if neighbour is Target:
        return true
    if neighbor not in Visited:
        enqueue(neighbor)
        add neighbor to Visited

// Visited: { "S", "A", "C", "B", "D" }   // unchanged`}
          </Code>
        </>
      }
      graph={{
        data: BASE_GRAPH,
        nodeStates: {
          S: "visited",
          A: "visited",
          C: "current",
          B: "queued",
          D: "queued",
        },
      }}
      queue={[
        { value: "C", state: "current" },
        { value: "B", state: "unvisited" },
        { value: "D", state: "unvisited" },
      ]}
      map={[
        { key: "S", value: "true", state: "visited" },
        { key: "A", value: "true", state: "visited" },
        { key: "C", value: "true", state: "visited" },
        { key: "B", value: "true", state: "visited" },
        { key: "D", value: "true", state: "visited" },
      ]}
    />

    <VisualizationStep
      title="Step 5"
      description={
        <>
          <Paragraph>
            Finally, <strong>B</strong> is processed, discovering <strong>E</strong> as newly queued.
          </Paragraph>
          <Code>
{`current ← dequeue(Queue)    // "B"
for each neighbor in neighbors("B"):   // "E"
    if neighbour is Target:
        return true         // returns true!
    if neighbor not in Visited:
        enqueue(neighbor)
        add neighbor to Visited

// Visited: { "S", "A", "C", "B", "E" } // unchanged`}
          </Code>
        </>
      }
      graph={{
        data: BASE_GRAPH,
        nodeStates: {
          S: "visited",
          A: "visited",
          C: "visited",
          B: "current",
          D: "queued",
          E: "newlyQueued",
        },
      }}
      queue={[
        { value: "B", state: "current" },
        { value: "D", state: "unvisited" },
      ]}
      map={[
        { key: "S", value: "true", state: "visited" },
        { key: "A", value: "true", state: "visited" },
        { key: "C", value: "true", state: "visited" },
        { key: "B", value: "true", state: "visited" },
        { key: "D", value: "true", state: "visited" },
      ]}
    />
  </>
);
