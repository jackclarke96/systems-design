export interface TreeNode {
  id: string;
  value: number;
  x: number;
  y: number;
  left?: TreeNode;
  right?: TreeNode;
}

export interface TreeData {
  root: TreeNode;
  nodes: TreeNode[];
}

export type TreeNodeState = "unvisited" | "current" | "in-stack" | "completed" | "path-highlight";

export interface CallStackFrame {
  nodeId: string;
  cumulative: number;
  phase: "entering" | "processing" | "returning";
}

export interface TreeVisualizationStep {
  line: number;
  description: string;
  currentNode: string | null;
  callStack: CallStackFrame[];
  frequencyMap: Record<number, number>;
  cumulative: number;
  pathCount: number;
  nodeStates: Record<string, TreeNodeState>;
  highlightPaths?: string[][];
  targetSum: number;
  checkingValue?: number;
}

export interface TreeAlgorithmVisualization {
  code: string;
  language: string;
  steps: TreeVisualizationStep[];
  treeData: TreeData;
}
