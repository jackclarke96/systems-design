import { useState, useEffect, useCallback } from "react";
import { GraphVisualizer } from "./GraphVisualizer";
import { CodeViewer } from "./CodeViewer";
import { VisualizerControls } from "./VisualizerControls";
import { generateBFSSteps, createGraphLayout } from "@/utils/bfsSimulator";
import { AlgorithmVisualization } from "@/types/visualizer";

const BFS_CODE = `func hasRoute(graph map[string][]string, start, end string) bool {
    if start == end {
        return true
    }
    
    visited := make(map[string]bool)
    queue := []string{start}
    visited[start] = true
    
    for len(queue) > 0 {
        current := queue[0]
        queue = queue[1:]
        
        for _, neighbor := range graph[current] {
            if neighbor == end {
                return true
            }
            
            if !visited[neighbor] {
                visited[neighbor] = true
                queue = append(queue, neighbor)
            }
        }
    }
    
    return false
}`;

const DEFAULT_GRAPH = {
  S: ["A", "C"],
  A: ["B", "D"],
  B: ["E"],
  C: ["A"],
  D: ["C"],
  E: [""],
};

export const AlgorithmVisualizer = () => {
  const [visualization, setVisualization] = useState<AlgorithmVisualization | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  // Initialize visualization
  useEffect(() => {
    const steps = generateBFSSteps(DEFAULT_GRAPH, "A", "E");
    const graphData = createGraphLayout(DEFAULT_GRAPH);
    
    setVisualization({
      code: BFS_CODE,
      language: "go",
      steps,
      graphData,
    });
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying || !visualization) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= visualization.steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed, visualization]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleStepForward = useCallback(() => {
    if (!visualization) return;
    setCurrentStep((prev) => Math.min(prev + 1, visualization.steps.length - 1));
  }, [visualization]);

  const handleStepBackward = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  if (!visualization) {
    return <div>Loading visualizer...</div>;
  }

  const currentStepData = visualization.steps[currentStep];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-2">Interactive BFS Visualizer</h2>
        <p className="text-muted-foreground">
          Watch how Breadth-First Search explores the graph to find a path from node A to node E
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Graph Visualization */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Graph Traversal</h3>
          <GraphVisualizer
            graphData={visualization.graphData}
            nodeStates={currentStepData.nodeStates}
            highlightEdge={currentStepData.highlightEdge}
          />
        </div>

        {/* Code View */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Code Execution</h3>
          <CodeViewer
            code={visualization.code}
            language={visualization.language}
            highlightLine={currentStepData.line}
          />
        </div>
      </div>

      {/* Controls */}
      <VisualizerControls
        isPlaying={isPlaying}
        currentStep={currentStep}
        totalSteps={visualization.steps.length}
        speed={speed}
        onPlay={handlePlay}
        onPause={handlePause}
        onStepForward={handleStepForward}
        onStepBackward={handleStepBackward}
        onReset={handleReset}
        onSpeedChange={setSpeed}
        description={currentStepData.description}
        variables={{
          "Current Node": currentStepData.currentNode || "null",
          "Queue": `[${currentStepData.queue.join(", ")}]`,
          "Visited": `{${Array.from(currentStepData.visited).join(", ")}}`,
          ...currentStepData.variables,
        }}
      />
    </div>
  );
};
