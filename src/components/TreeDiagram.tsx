import { cn } from "@/lib/utils";

export type TreeNodeState = "unvisited" | "current" | "visited" | "highlighted";

export interface TreeNode {
  value: string | number;
  left?: TreeNode;
  right?: TreeNode;
  state?: TreeNodeState;
}

interface TreeDiagramProps {
  root: TreeNode;
  width?: number;
  height?: number;
  showLegend?: boolean;
}

const nodeStateColors = {
  unvisited: "fill-card stroke-border",
  current: "fill-primary stroke-primary",
  visited: "fill-accent stroke-accent-foreground",
  highlighted: "fill-info/30 stroke-info",
};

const nodeStateTextColors = {
  unvisited: "fill-foreground",
  current: "fill-primary-foreground font-bold",
  visited: "fill-accent-foreground",
  highlighted: "fill-foreground",
};

interface NodePosition {
  x: number;
  y: number;
  node: TreeNode;
}

const calculatePositions = (
  node: TreeNode | undefined,
  x: number,
  y: number,
  horizontalSpacing: number,
  positions: NodePosition[]
): void => {
  if (!node) return;

  positions.push({ x, y, node });

  const verticalSpacing = 80;
  const nextSpacing = horizontalSpacing / 2;

  if (node.left) {
    calculatePositions(node.left, x - horizontalSpacing, y + verticalSpacing, nextSpacing, positions);
  }
  if (node.right) {
    calculatePositions(node.right, x + horizontalSpacing, y + verticalSpacing, nextSpacing, positions);
  }
};

export const TreeDiagram = ({
  root,
  width = 600,
  height = 400,
  showLegend = false,
}: TreeDiagramProps) => {
  const positions: NodePosition[] = [];
  calculatePositions(root, width / 2, 50, width / 4, positions);

  const renderEdges = (
    node: TreeNode | undefined,
    x: number,
    y: number,
    horizontalSpacing: number,
    edges: JSX.Element[]
  ): void => {
    if (!node) return;

    const verticalSpacing = 80;
    const nextSpacing = horizontalSpacing / 2;

    if (node.left) {
      const childX = x - horizontalSpacing;
      const childY = y + verticalSpacing;
      edges.push(
        <line
          key={`edge-${x}-${y}-left`}
          x1={x}
          y1={y + 20}
          x2={childX}
          y2={childY - 20}
          className="stroke-border stroke-[2]"
        />
      );
      renderEdges(node.left, childX, childY, nextSpacing, edges);
    }

    if (node.right) {
      const childX = x + horizontalSpacing;
      const childY = y + verticalSpacing;
      edges.push(
        <line
          key={`edge-${x}-${y}-right`}
          x1={x}
          y1={y + 20}
          x2={childX}
          y2={childY - 20}
          className="stroke-border stroke-[2]"
        />
      );
      renderEdges(node.right, childX, childY, nextSpacing, edges);
    }
  };

  const edges: JSX.Element[] = [];
  renderEdges(root, width / 2, 50, width / 4, edges);

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4 my-4">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <g>{edges}</g>
        <g>
          {positions.map(({ x, y, node }, idx) => {
            const state = node.state || "unvisited";
            const colorClass = nodeStateColors[state];
            const textColorClass = nodeStateTextColors[state];

            return (
              <g key={`node-${idx}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="20"
                  className={cn(colorClass, "stroke-[2.5] transition-all duration-300")}
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn(textColorClass, "text-sm font-semibold transition-all duration-300")}
                >
                  {node.value}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {showLegend && (
        <div className="flex gap-4 justify-center mt-3 text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-card border-2 border-border" />
            <span>Unvisited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-info/30 border-2 border-info" />
            <span>Highlighted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-primary border-2 border-primary" />
            <span>Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-accent border-2 border-accent-foreground" />
            <span>Visited</span>
          </div>
        </div>
      )}
    </div>
  );
};
