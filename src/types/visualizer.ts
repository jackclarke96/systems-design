export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export type NodeState = "unvisited" | "current" | "visited" | "queued" | "newlyQueued";

export interface VisualizationStep {
  line: number;
  description: string;
  currentNode: string | null;
  queue: string[];
  visited: Set<string>;
  nodeStates: Record<string, NodeState>;
  variables: Record<string, any>;
  highlightEdge?: { from: string; to: string };
}

export interface AlgorithmVisualization {
  code: string;
  language: string;
  steps: VisualizationStep[];
  graphData: GraphData;
}
