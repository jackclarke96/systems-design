import { TreeNode, TreeData, TreeVisualizationStep, CallStackFrame, TreeNodeState } from "@/types/treeVisualizer";

// Create a sample tree for visualization
export const createSampleTree = (): TreeData => {
  const root: TreeNode = {
    id: "1",
    value: 10,
    x: 400,
    y: 80,
  };

  const node2: TreeNode = {
    id: "2",
    value: 5,
    x: 250,
    y: 180,
  };

  const node3: TreeNode = {
    id: "3",
    value: -3,
    x: 550,
    y: 180,
  };

  const node4: TreeNode = {
    id: "4",
    value: 3,
    x: 150,
    y: 280,
  };

  const node5: TreeNode = {
    id: "5",
    value: 2,
    x: 350,
    y: 280,
  };

  const node6: TreeNode = {
    id: "6",
    value: 11,
    x: 650,
    y: 280,
  };

  const node7: TreeNode = {
    id: "7",
    value: 3,
    x: 100,
    y: 380,
  };

  const node8: TreeNode = {
    id: "8",
    value: -2,
    x: 200,
    y: 380,
  };

  const node9: TreeNode = {
    id: "9",
    value: 1,
    x: 300,
    y: 380,
  };

  root.left = node2;
  root.right = node3;
  node2.left = node4;
  node2.right = node5;
  node3.right = node6;
  node4.left = node7;
  node4.right = node8;
  node5.right = node9;

  return {
    root,
    nodes: [root, node2, node3, node4, node5, node6, node7, node8, node9],
  };
};

export const generatePathSumSteps = (
  treeData: TreeData,
  targetSum: number
): TreeVisualizationStep[] => {
  const steps: TreeVisualizationStep[] = [];
  const frequencyMap: Record<number, number> = { 0: 1 };
  let pathCount = 0;
  const callStack: CallStackFrame[] = [];

  // Initial state
  steps.push({
    line: 0,
    description: `Finding paths that sum to ${targetSum}. Initialize frequencyMap with {0: 1} to handle root-to-node paths`,
    currentNode: null,
    callStack: [],
    frequencyMap: { ...frequencyMap },
    cumulative: 0,
    pathCount: 0,
    nodeStates: {},
    targetSum,
  });

  const dfs = (node: TreeNode | undefined, cumulative: number, depth: number) => {
    if (!node) {
      steps.push({
        line: 5,
        description: `Node is nil, return`,
        currentNode: null,
        callStack: [...callStack],
        frequencyMap: { ...frequencyMap },
        cumulative,
        pathCount,
        nodeStates: createNodeStates(callStack),
        targetSum,
      });
      return;
    }

    // Entering node
    callStack.push({
      nodeId: node.id,
      cumulative: cumulative + node.value,
      phase: "entering",
    });

    steps.push({
      line: 8,
      description: `Enter node ${node.id} (value: ${node.value}). Add ${node.value} to cumulative sum`,
      currentNode: node.id,
      callStack: [...callStack],
      frequencyMap: { ...frequencyMap },
      cumulative: cumulative + node.value,
      pathCount,
      nodeStates: createNodeStates(callStack),
      targetSum,
    });

    const newCumulative = cumulative + node.value;
    const lookupValue = newCumulative - targetSum;

    // Update call stack phase
    callStack[callStack.length - 1].phase = "processing";

    steps.push({
      line: 9,
      description: `Check if (cumulative - targetSum) = ${lookupValue} exists in frequencyMap`,
      currentNode: node.id,
      callStack: [...callStack],
      frequencyMap: { ...frequencyMap },
      cumulative: newCumulative,
      pathCount,
      nodeStates: createNodeStates(callStack),
      targetSum,
      checkingValue: lookupValue,
    });

    if (frequencyMap[lookupValue]) {
      const foundPaths = frequencyMap[lookupValue];
      pathCount += foundPaths;
      
      steps.push({
        line: 10,
        description: `Found ${foundPaths} path(s)! frequencyMap[${lookupValue}] = ${foundPaths}. Total paths: ${pathCount}`,
        currentNode: node.id,
        callStack: [...callStack],
        frequencyMap: { ...frequencyMap },
        cumulative: newCumulative,
        pathCount,
        nodeStates: { ...createNodeStates(callStack), [node.id]: "path-highlight" },
        targetSum,
        checkingValue: lookupValue,
      });
    }

    steps.push({
      line: 13,
      description: `Increment frequencyMap[${newCumulative}] before visiting children`,
      currentNode: node.id,
      callStack: [...callStack],
      frequencyMap: { ...frequencyMap },
      cumulative: newCumulative,
      pathCount,
      nodeStates: createNodeStates(callStack),
      targetSum,
    });

    frequencyMap[newCumulative] = (frequencyMap[newCumulative] || 0) + 1;

    steps.push({
      line: 13,
      description: `frequencyMap[${newCumulative}] = ${frequencyMap[newCumulative]}`,
      currentNode: node.id,
      callStack: [...callStack],
      frequencyMap: { ...frequencyMap },
      cumulative: newCumulative,
      pathCount,
      nodeStates: createNodeStates(callStack),
      targetSum,
    });

    // Visit left child
    if (node.left) {
      steps.push({
        line: 14,
        description: `Visit left child (node ${node.left.id})`,
        currentNode: node.id,
        callStack: [...callStack],
        frequencyMap: { ...frequencyMap },
        cumulative: newCumulative,
        pathCount,
        nodeStates: createNodeStates(callStack),
        targetSum,
      });
      dfs(node.left, newCumulative, depth + 1);
    }

    // Visit right child
    if (node.right) {
      steps.push({
        line: 15,
        description: `Visit right child (node ${node.right.id})`,
        currentNode: node.id,
        callStack: [...callStack],
        frequencyMap: { ...frequencyMap },
        cumulative: newCumulative,
        pathCount,
        nodeStates: createNodeStates(callStack),
        targetSum,
      });
      dfs(node.right, newCumulative, depth + 1);
    }

    // Returning - decrement frequency
    steps.push({
      line: 16,
      description: `Backtracking from node ${node.id}. Decrement frequencyMap[${newCumulative}]`,
      currentNode: node.id,
      callStack: [...callStack],
      frequencyMap: { ...frequencyMap },
      cumulative: newCumulative,
      pathCount,
      nodeStates: createNodeStates(callStack),
      targetSum,
    });

    frequencyMap[newCumulative]--;
    if (frequencyMap[newCumulative] === 0) {
      delete frequencyMap[newCumulative];
    }

    callStack[callStack.length - 1].phase = "returning";

    steps.push({
      line: 16,
      description: `Decremented frequencyMap[${newCumulative}]. Return from node ${node.id}`,
      currentNode: node.id,
      callStack: [...callStack],
      frequencyMap: { ...frequencyMap },
      cumulative: newCumulative,
      pathCount,
      nodeStates: createNodeStates(callStack),
      targetSum,
    });

    callStack.pop();
  };

  // Start DFS
  steps.push({
    line: 4,
    description: `Call dfs(root, 0)`,
    currentNode: null,
    callStack: [],
    frequencyMap: { ...frequencyMap },
    cumulative: 0,
    pathCount: 0,
    nodeStates: {},
    targetSum,
  });

  dfs(treeData.root, 0, 0);

  // Final result
  steps.push({
    line: 18,
    description: `DFS complete! Total paths found: ${pathCount}`,
    currentNode: null,
    callStack: [],
    frequencyMap: { ...frequencyMap },
    cumulative: 0,
    pathCount,
    nodeStates: {},
    targetSum,
  });

  return steps;
};

const createNodeStates = (callStack: CallStackFrame[]): Record<string, TreeNodeState> => {
  const states: Record<string, TreeNodeState> = {};
  
  callStack.forEach((frame, index) => {
    if (index === callStack.length - 1) {
      states[frame.nodeId] = "current";
    } else {
      states[frame.nodeId] = "in-stack";
    }
  });
  
  return states;
};
