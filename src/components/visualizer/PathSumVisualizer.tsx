import { useState, useEffect, useCallback } from "react";
import { TreeVisualizer } from "./TreeVisualizer";
import { CodeViewer } from "./CodeViewer";
import { VisualizerControls } from "./VisualizerControls";
import { createSampleTree, generatePathSumSteps } from "@/utils/pathSumSimulator";
import { TreeAlgorithmVisualization } from "@/types/treeVisualizer";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const PATH_SUM_CODE = `func numberOfPathsSummingToS(root *binaryTreeNode, S int) int {
    var dfs func(n *binaryTreeNode, cumulative int)
    pathCount := 0
    frequencyMap := map[int]int{0: 1}
    dfs = func(n *binaryTreeNode, cumulative int) {
        if n == nil {
            return
        }
        cumulative += n.value
        if count, ok := frequencyMap[cumulative-S]; ok {
            pathCount += count
        }

        frequencyMap[cumulative]++
        dfs(n.left, cumulative)
        dfs(n.right, cumulative)
        frequencyMap[cumulative]--
    }
    dfs(root, 0)
    return pathCount
}`;

export const PathSumVisualizer = () => {
  const [visualization, setVisualization] = useState<TreeAlgorithmVisualization | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  // Initialize visualization
  useEffect(() => {
    const treeData = createSampleTree();
    const targetSum = 8;
    const steps = generatePathSumSteps(treeData, targetSum);
    
    setVisualization({
      code: PATH_SUM_CODE,
      language: "go",
      steps,
      treeData,
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

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);
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
        <h2 className="text-2xl font-bold mb-2">Path Sum Visualizer</h2>
        <p className="text-muted-foreground">
          Watch how this algorithm finds all paths that sum to target value {currentStepData.targetSum} using 
          cumulative sums and a frequency map
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Tree Visualization */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Tree Traversal</h3>
          <TreeVisualizer
            treeData={visualization.treeData}
            nodeStates={currentStepData.nodeStates}
          />
          
          {/* State Display */}
          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Target Sum:</span>
              <Badge variant="default" className="text-base">{currentStepData.targetSum}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Cumulative:</span>
              <Badge variant="secondary" className="text-base">{currentStepData.cumulative}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Paths Found:</span>
              <Badge variant="outline" className="text-base font-bold">{currentStepData.pathCount}</Badge>
            </div>
            {currentStepData.checkingValue !== undefined && (
              <div className="flex items-center justify-between">
                <span className="font-semibold">Checking:</span>
                <Badge className="text-base">
                  cumulative - target = {currentStepData.checkingValue}
                </Badge>
              </div>
            )}
          </Card>

          {/* Frequency Map */}
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Frequency Map:</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(currentStepData.frequencyMap).length > 0 ? (
                Object.entries(currentStepData.frequencyMap).map(([key, value]) => (
                  <Badge key={key} variant="secondary" className="font-mono">
                    {key}: {value}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground text-sm">Empty</span>
              )}
            </div>
          </Card>

          {/* Call Stack */}
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Call Stack:</h4>
            <div className="space-y-2">
              {currentStepData.callStack.length > 0 ? (
                currentStepData.callStack.map((frame, idx) => (
                  <div
                    key={`${frame.nodeId}-${idx}`}
                    className={cn(
                      "p-2 rounded border text-sm font-mono",
                      idx === currentStepData.callStack.length - 1
                        ? "bg-primary/10 border-primary"
                        : "bg-muted border-border"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span>Node {frame.nodeId}</span>
                      <Badge variant="outline" className="text-xs">
                        sum: {frame.cumulative}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <span className="text-muted-foreground text-sm">Empty</span>
              )}
            </div>
          </Card>
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
          "Target Sum": currentStepData.targetSum.toString(),
          "Cumulative": currentStepData.cumulative.toString(),
          "Path Count": currentStepData.pathCount.toString(),
          "Frequency Map": `{${Object.entries(currentStepData.frequencyMap).map(([k, v]) => `${k}: ${v}`).join(", ")}}`,
          "Call Stack Depth": currentStepData.callStack.length.toString(),
          ...(currentStepData.checkingValue !== undefined && {
            "Checking": `${currentStepData.cumulative} - ${currentStepData.targetSum} = ${currentStepData.checkingValue}`
          })
        }}
      />
    </div>
  );
};
