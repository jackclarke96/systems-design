import { TreeData, TreeNode, TreeNodeState } from "@/types/treeVisualizer";
import { cn } from "@/lib/utils";

interface TreeVisualizerProps {
  treeData: TreeData;
  nodeStates: Record<string, TreeNodeState>;
}

const nodeStateColors = {
  unvisited: "fill-muted stroke-border",
  current: "fill-primary stroke-primary animate-pulse",
  "in-stack": "fill-info/50 stroke-info",
  completed: "fill-accent stroke-accent-foreground",
  "path-highlight": "fill-success stroke-success animate-pulse",
};

const nodeStateTextColors = {
  unvisited: "fill-foreground",
  current: "fill-primary-foreground font-bold",
  "in-stack": "fill-foreground",
  completed: "fill-accent-foreground",
  "path-highlight": "fill-success-foreground font-bold",
};

export const TreeVisualizer = ({ treeData, nodeStates }: TreeVisualizerProps) => {
  const getNodeState = (nodeId: string): TreeNodeState => {
    return nodeStates[nodeId] || "unvisited";
  };

  const drawEdge = (parent: TreeNode, child: TreeNode) => {
    // Adjust positions to account for node radius
    const dx = child.x - parent.x;
    const dy = child.y - parent.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / length;
    const unitY = dy / length;
    
    const startX = parent.x + unitX * 25;
    const startY = parent.y + unitY * 25;
    const endX = child.x - unitX * 25;
    const endY = child.y - unitY * 25;

    const parentState = getNodeState(parent.id);
    const childState = getNodeState(child.id);
    const isActive = parentState !== "unvisited" || childState !== "unvisited";

    return (
      <line
        key={`${parent.id}-${child.id}`}
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        className={cn(
          "transition-all duration-300",
          isActive ? "stroke-primary stroke-[2.5]" : "stroke-border stroke-[2]"
        )}
      />
    );
  };

  const renderEdges = (node: TreeNode | undefined): JSX.Element[] => {
    if (!node) return [];
    
    const edges: JSX.Element[] = [];
    
    if (node.left) {
      edges.push(drawEdge(node, node.left));
      edges.push(...renderEdges(node.left));
    }
    
    if (node.right) {
      edges.push(drawEdge(node, node.right));
      edges.push(...renderEdges(node.right));
    }
    
    return edges;
  };

  return (
    <div className="w-full bg-card border border-border rounded-lg p-6">
      <svg width="800" height="450" viewBox="0 0 800 450" className="w-full h-auto">
        {/* Draw edges */}
        <g>{renderEdges(treeData.root)}</g>

        {/* Draw nodes */}
        <g>
          {treeData.nodes.map((node) => {
            const state = getNodeState(node.id);
            const colorClass = nodeStateColors[state];
            const textColorClass = nodeStateTextColors[state];

            return (
              <g key={node.id} className="transition-all duration-300">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  className={cn(colorClass, "stroke-[2.5] transition-all duration-300")}
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn(textColorClass, "text-base font-semibold transition-all duration-300")}
                >
                  {node.value}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div className="flex gap-4 justify-center mt-4 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-muted border-2 border-border" />
          <span>Unvisited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-info/50 border-2 border-info" />
          <span>In Call Stack</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-success border-2 border-success" />
          <span>Path Found!</span>
        </div>
      </div>
    </div>
  );
};
