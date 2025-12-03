import { cn } from "@/lib/utils";

export type ListNodeState = "unvisited" | "current" | "visited" | "highlighted" | "garbage";

export interface ListNode {
  value: string | number;
  state?: ListNodeState;
  inMemory?: boolean;
}

export interface CustomArrow {
  from: number; // node index
  to: number;   // node index
  label?: string;
  color?: "primary" | "success" | "warning" | "error";
  style?: "solid" | "dashed";
}

export interface BrokenLink {
  afterNode: number; // show broken link after this node index
}

interface LinkedListDiagramProps {
  nodes: ListNode[];
  width?: number;
  height?: number;
  showLegend?: boolean;
  doublyLinked?: boolean;
  customArrows?: CustomArrow[];
  brokenLinks?: BrokenLink[];
}

const nodeStateColors = {
  unvisited: "fill-card stroke-border",
  current: "fill-primary stroke-primary",
  visited: "fill-accent stroke-accent-foreground",
  highlighted: "fill-info/30 stroke-info",
  garbage: "fill-destructive/20 stroke-destructive opacity-50",
};

const arrowColors = {
  primary: "stroke-primary",
  success: "stroke-green-500",
  warning: "stroke-yellow-500",
  error: "stroke-destructive",
};

const nodeStateTextColors = {
  unvisited: "fill-foreground",
  current: "fill-primary-foreground font-bold",
  visited: "fill-accent-foreground",
  highlighted: "fill-foreground",
  garbage: "fill-destructive line-through",
};

export const LinkedListDiagram = ({
  nodes,
  width = 600,
  height = 150,
  showLegend = false,
  doublyLinked = false,
  customArrows = [],
  brokenLinks = [],
}: LinkedListDiagramProps) => {
  const nodeWidth = 30;
  const nodeHeight = 30;
  const gap = 30;
  const startX = 50;
  const centerY = height / 2;

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4 my-4">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <marker
            id="arrowhead-list"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="2.5"
            orient="auto"
            className="fill-border"
          >
            <polygon points="0 0, 8 2.5, 0 5" />
          </marker>
          <marker
            id="arrowhead-list-back"
            markerWidth="8"
            markerHeight="8"
            refX="1"
            refY="2.5"
            orient="auto"
            className="fill-border"
          >
            <polygon points="8 0, 0 2.5, 8 5" />
          </marker>
          <marker
            id="arrowhead-custom"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="2.5"
            orient="auto"
            className="fill-primary"
          >
            <polygon points="0 0, 8 2.5, 0 5" />
          </marker>
        </defs>

        {/* Draw arrows between nodes */}
        <g>
          {nodes.map((_, idx) => {
            if (idx === nodes.length - 1) return null;
            
            // Check if this link is broken
            const isBroken = brokenLinks.some(bl => bl.afterNode === idx);
            
            const x1 = startX + idx * (nodeWidth + gap) + nodeWidth;
            const x2 = startX + (idx + 1) * (nodeWidth + gap);

            return (
              <g key={`arrow-${idx}`}>
                {isBroken ? (
                  // Broken link visualization
                  <>
                    <line
                      x1={x1}
                      y1={centerY}
                      x2={x1 + 10}
                      y2={centerY}
                      className="stroke-destructive stroke-[2]"
                    />
                    <text
                      x={x1 + 15}
                      y={centerY}
                      className="fill-destructive text-xs"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      ✕
                    </text>
                    <line
                      x1={x2 - 10}
                      y1={centerY}
                      x2={x2}
                      y2={centerY}
                      className="stroke-border stroke-[2] opacity-30"
                      strokeDasharray="4 2"
                    />
                  </>
                ) : (
                  <>
                    {/* Forward arrow */}
                    <line
                      x1={x1}
                      y1={centerY}
                      x2={x2}
                      y2={centerY}
                      className="stroke-border stroke-[2]"
                      markerEnd="url(#arrowhead-list)"
                    />
                    {/* Backward arrow for doubly linked list */}
                    {doublyLinked && (
                      <line
                        x1={x2}
                        y1={centerY + 8}
                        x2={x1}
                        y2={centerY + 8}
                        className="stroke-border stroke-[1.5]"
                        markerEnd="url(#arrowhead-list-back)"
                      />
                    )}
                  </>
                )}
              </g>
            );
          })}
        </g>

        {/* Draw custom arrows */}
        <g>
          {customArrows.map((arrow, idx) => {
            const fromX = startX + arrow.from * (nodeWidth + gap) + nodeWidth / 2;
            const toX = startX + arrow.to * (nodeWidth + gap) + nodeWidth / 2;
            const arcHeight = 40;
            const midX = (fromX + toX) / 2;
            const controlY = centerY - arcHeight;
            
            const colorClass = arrowColors[arrow.color || "primary"];
            const strokeDash = arrow.style === "dashed" ? "4 2" : "none";

            return (
              <g key={`custom-arrow-${idx}`}>
                <path
                  d={`M ${fromX} ${centerY - nodeHeight/2} Q ${midX} ${controlY} ${toX} ${centerY - nodeHeight/2}`}
                  fill="none"
                  className={cn(colorClass, "stroke-[2.5]")}
                  strokeDasharray={strokeDash}
                  markerEnd="url(#arrowhead-custom)"
                />
                {arrow.label && (
                  <text
                    x={midX}
                    y={controlY - 5}
                    textAnchor="middle"
                    className="text-xs fill-foreground font-semibold"
                  >
                    {arrow.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Draw nodes */}
        <g>
          {nodes.map((node, idx) => {
            const x = startX + idx * (nodeWidth + gap);
            const state = node.state || "unvisited";
            const colorClass = nodeStateColors[state];
            const textColorClass = nodeStateTextColors[state];
            const inMemory = node.inMemory !== false;

            return (
              <g key={`node-${idx}`}>
                <rect
                  x={x}
                  y={centerY - nodeHeight / 2}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="4"
                  className={cn(colorClass, "stroke-[2.5] transition-all duration-300")}
                />
                <text
                  x={x + nodeWidth / 2}
                  y={centerY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn(textColorClass, "text-sm font-semibold transition-all duration-300")}
                >
                  {node.value}
                </text>
                {!inMemory && (
                  <text
                    x={x + nodeWidth / 2}
                    y={centerY + nodeHeight / 2 + 12}
                    textAnchor="middle"
                    className="text-[10px] fill-muted-foreground italic"
                  >
                    (GC)
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {showLegend && (
        <div className="flex gap-4 justify-center mt-3 text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-card border-2 border-border" />
            <span>Unvisited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-info/30 border-2 border-info" />
            <span>Highlighted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-primary border-2 border-primary" />
            <span>Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-accent border-2 border-accent-foreground" />
            <span>Visited</span>
          </div>
        </div>
      )}
    </div>
  );
};
