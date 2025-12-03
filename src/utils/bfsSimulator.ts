import { GraphData, VisualizationStep, NodeState } from "@/types/visualizer";

export const generateBFSSteps = (
  graph: Record<string, string[]>,
  start: string,
  end: string
): VisualizationStep[] => {
  const steps: VisualizationStep[] = [];
  const visited = new Set<string>();
  const queue: string[] = [start];
  visited.add(start);

  // Initial state
  steps.push({
    line: 0,
    description: `Starting BFS from node ${start} to find ${end}`,
    currentNode: null,
    queue: [...queue],
    visited: new Set(visited),
    nodeStates: { [start]: "queued" },
    variables: { start, end },
  });

  // Check if start equals end
  steps.push({
    line: 1,
    description: `Check if start (${start}) equals end (${end})`,
    currentNode: start,
    queue: [...queue],
    visited: new Set(visited),
    nodeStates: { [start]: "current" },
    variables: { start, end },
  });

  if (start === end) {
    steps.push({
      line: 2,
      description: `Start equals end, return true`,
      currentNode: start,
      queue: [...queue],
      visited: new Set(visited),
      nodeStates: { [start]: "current" },
      variables: { start, end },
    });
    return steps;
  }

  // Initialize visited map and queue
  steps.push({
    line: 4,
    description: `Initialize visited map and queue with start node`,
    currentNode: null,
    queue: [...queue],
    visited: new Set(visited),
    nodeStates: { [start]: "queued" },
    variables: { start, end, visited: `{${start}: true}` },
  });

  // Main BFS loop
  while (queue.length > 0) {
    steps.push({
      line: 6,
      description: `Queue has ${queue.length} node(s), continue loop`,
      currentNode: null,
      queue: [...queue],
      visited: new Set(visited),
      nodeStates: createNodeStates(visited, queue, null),
      variables: { queue: `[${queue.join(", ")}]`, queueLength: queue.length },
    });

    const current = queue[0];
    queue.shift();

    steps.push({
      line: 7,
      description: `Dequeue node: ${current}`,
      currentNode: current,
      queue: [...queue],
      visited: new Set(visited),
      nodeStates: createNodeStates(visited, queue, current),
      variables: { current, queue: `[${queue.join(", ")}]` },
    });

    // Check neighbors
    const neighbors = graph[current] || [];
    
    steps.push({
      line: 9,
      description: `Checking neighbors of ${current}: [${neighbors.join(", ")}]`,
      currentNode: current,
      queue: [...queue],
      visited: new Set(visited),
      nodeStates: createNodeStates(visited, queue, current),
      variables: { current, neighbors: `[${neighbors.join(", ")}]` },
    });

    for (const neighbor of neighbors) {
      steps.push({
        line: 10,
        description: `Check neighbor: ${neighbor}`,
        currentNode: current,
        queue: [...queue],
        visited: new Set(visited),
        nodeStates: createNodeStates(visited, queue, current),
        variables: { current, neighbor },
        highlightEdge: { from: current, to: neighbor },
      });

      if (neighbor === end) {
        steps.push({
          line: 11,
          description: `Found target node ${end}! Return true`,
          currentNode: neighbor,
          queue: [...queue],
          visited: new Set(visited),
          nodeStates: { ...createNodeStates(visited, queue, current), [neighbor]: "current" },
          variables: { neighbor, end },
          highlightEdge: { from: current, to: neighbor },
        });
        return steps;
      }

      if (!visited.has(neighbor)) {
        steps.push({
          line: 14,
          description: `${neighbor} not visited, mark as visited and enqueue`,
          currentNode: current,
          queue: [...queue],
          visited: new Set(visited),
          nodeStates: createNodeStates(visited, queue, current),
          variables: { neighbor, visited: `{..., ${neighbor}: true}` },
          highlightEdge: { from: current, to: neighbor },
        });

        visited.add(neighbor);
        queue.push(neighbor);

        steps.push({
          line: 16,
          description: `Added ${neighbor} to queue`,
          currentNode: current,
          queue: [...queue],
          visited: new Set(visited),
          nodeStates: createNodeStates(visited, queue, current),
          variables: { queue: `[${queue.join(", ")}]` },
        });
      } else {
        steps.push({
          line: 14,
          description: `${neighbor} already visited, skip`,
          currentNode: current,
          queue: [...queue],
          visited: new Set(visited),
          nodeStates: createNodeStates(visited, queue, current),
          variables: { neighbor },
          highlightEdge: { from: current, to: neighbor },
        });
      }
    }
  }

  // Not found
  steps.push({
    line: 20,
    description: `Queue empty, path not found. Return false`,
    currentNode: null,
    queue: [],
    visited: new Set(visited),
    nodeStates: createNodeStates(visited, [], null),
    variables: {},
  });

  return steps;
};

const createNodeStates = (
  visited: Set<string>,
  queue: string[],
  current: string | null
): Record<string, NodeState> => {
  const states: Record<string, NodeState> = {};
  
  visited.forEach((node) => {
    states[node] = "visited";
  });
  
  queue.forEach((node) => {
    if (!visited.has(node)) {
      states[node] = "queued";
    }
  });
  
  if (current) {
    states[current] = "current";
  }
  
  return states;
};

// Create graph layout for visualization
export const createGraphLayout = (graph: Record<string, string[]>): GraphData => {
  const nodes = Object.keys(graph);
  const centerX = 400;
  const centerY = 300;
  const radius = 180;
  
  const graphNodes = nodes.map((id, index) => {
    const angle = (index / nodes.length) * 2 * Math.PI - Math.PI / 2;
    return {
      id,
      label: id,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });
  
  const edges = [];
  for (const [from, neighbors] of Object.entries(graph)) {
    for (const to of neighbors) {
      edges.push({ from, to });
    }
  }
  
  return { nodes: graphNodes, edges };
};
