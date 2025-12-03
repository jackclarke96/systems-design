import { GraphData, NodeState } from "@/types/visualizer";
import { cn } from "@/lib/utils";

interface GraphDiagramProps {
  graphData: GraphData;
  nodeStates?: Record<string, NodeState>;
  highlightEdge?: { from: string; to: string };
  highlightEdges?: { from: string; to: string }[];
  width?: number;
  height?: number;
  showLegend?: boolean;
  /** Optional SVG transform for all drawn content */
  contentTransform?: string; // e.g. "translate(0,-20)" or "translate(0,-20) scale(1.05)"
  /** Convenience numeric offset if you only need a translate */
  contentOffset?: { x?: number; y?: number }; // e.g. { y: -20 }
}


const nodeStateColors = {
  unvisited: "fill-card stroke-border",
  current: "fill-primary stroke-primary",
  visited: "fill-accent stroke-accent-foreground",
  queued: "fill-orange-500/25 stroke-orange-600",
  newlyQueued: "fill-green-500/25 stroke-green-600"
};
const nodeStateTextColors = {
  unvisited: "fill-foreground",
  current: "fill-primary-foreground font-bold",
  visited: "fill-accent-foreground",
  queued: "fill-foreground",
  newlyQueued:  "fill-foreground",
};

export const GraphDiagram = ({
  graphData,
  nodeStates = {},
  highlightEdge,
  highlightEdges,
  width = 600,
  height = 400,
  showLegend = false,
  contentTransform,
  contentOffset,
}: GraphDiagramProps) => {
  const getNodeState = (id: string): NodeState => nodeStates[id] || "unvisited";

  // Build a transform string: prefer explicit contentTransform, else from contentOffset
  const computedTransform =
    contentTransform ??
    `translate(${contentOffset?.x ?? 0}, ${contentOffset?.y ?? 0})`;

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4 my-4">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* One wrapper group to move everything */}
        <g transform={computedTransform}>
          {/* Edges */}
          <g>
            {graphData.edges.map((edge, idx) => {
              const fromNode = graphData.nodes.find(n => n.id === edge.from);
              const toNode = graphData.nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const isHighlighted = 
                (highlightEdge?.from === edge.from && highlightEdge?.to === edge.to) ||
                (highlightEdges?.some(e => e.from === edge.from && e.to === edge.to) ?? false);

              const dx = toNode.x - fromNode.x;
              const dy = toNode.y - fromNode.y;
              const length = Math.hypot(dx, dy);
              const unitX = dx / length;
              const unitY = dy / length;

              const startX = fromNode.x + unitX * 25;
              const startY = fromNode.y + unitY * 25;
              const endX = toNode.x - unitX * 30;
              const endY = toNode.y - unitY * 30;

              return (
                <line
                  key={`${edge.from}-${edge.to}-${idx}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  className={cn(
                    "transition-all duration-300",
                    isHighlighted ? "stroke-primary stroke-[3]" : "stroke-border stroke-[2]"
                  )}
                  markerEnd="url(#arrowhead-diagram)"
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {graphData.nodes.map(node => {
              const state = getNodeState(node.id);
              return (
                <g key={node.id} className="transition-all duration-300">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="25"
                    className={cn(nodeStateColors[state], "stroke-[2.5] transition-all duration-300")}
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={cn(nodeStateTextColors[state], "text-lg font-semibold transition-all duration-300")}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </g>
        </g>

        <defs>
          <marker id="arrowhead-diagram" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" className="fill-border">
            <polygon points="0 0, 10 3, 0 6" />
          </marker>
        </defs>
      </svg>
      {showLegend && (
        <div className="flex gap-4 justify-center mt-3 text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-card border-2 border-border" />
            <span>Unvisited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-info/30 border-2 border-info" />
            <span>In Queue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary" />
            <span>Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-accent border-2 border-accent-foreground" />
            <span>Visited</span>
          </div>
        </div>
      )}

    </div>
  );
};

/*

*/
