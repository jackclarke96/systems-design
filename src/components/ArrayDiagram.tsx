import { cn } from "@/lib/utils";

export type ArrayCellState = "unvisited" | "current" | "visited" | "highlighted" | "sorted";

export interface ArrayCell {
  value: string | number;
  state?: ArrayCellState;
  index?: number;
}

export interface ArrayPointer {
  index: number;
  label: string;
  color?: string;
}

interface ArrayDiagramProps {
  cells: readonly ArrayCell[];
  width?: number;
  height?: number;
  showLegend?: boolean;
  showIndices?: boolean;
  pointers?: ArrayPointer[];
}

const cellStateColors = {
  unvisited: "fill-accent stroke-accent-foreground",
  current: "fill-primary stroke-primary",
  visited: "fill-card stroke-border",
  highlighted: "fill-info/30 stroke-info",
  sorted: "fill-green-500/20 stroke-green-500",
};

const cellStateTextColors = {
  unvisited: "fill-accent-foreground",
  current: "fill-primary-foreground font-bold",
  visited: "fill-foreground",
  highlighted: "fill-foreground",
  sorted: "fill-green-700 dark:fill-green-300",
};

export const ArrayDiagram = ({
  cells,
  width = 600,
  height = 150,
  showLegend = false,
  showIndices = true,
  pointers = [],
}: ArrayDiagramProps) => {
  const cellWidth = 50;
  const cellHeight = 50;
  const gap = 4;
  const totalWidth = cells.length * (cellWidth + gap) - gap;
  const startX = (width - totalWidth) / 2;
  const centerY = height / 2;
  const pointerOffset = showIndices ? 45 : 30;

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4 my-4">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <g>
          {cells.map((cell, idx) => {
            const x = startX + idx * (cellWidth + gap);
            const state = cell.state || "unvisited";
            const colorClass = cellStateColors[state];
            const textColorClass = cellStateTextColors[state];

            return (
              <g key={`cell-${idx}`}>
                <rect
                  x={x}
                  y={centerY - cellHeight / 2}
                  width={cellWidth}
                  height={cellHeight}
                  rx="4"
                  className={cn(colorClass, "stroke-[2.5] transition-all duration-300")}
                />
                <text
                  x={x + cellWidth / 2}
                  y={centerY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn(textColorClass, "text-sm font-semibold transition-all duration-300")}
                >
                  {cell.value}
                </text>
                {showIndices && (
                  <text
                    x={x + cellWidth / 2}
                    y={centerY + cellHeight / 2 + 15}
                    textAnchor="middle"
                    className="text-xs fill-muted-foreground"
                  >
                    {cell.index ?? idx}
                  </text>
                )}
              </g>
            );
          })}
          
          {pointers.map((pointer, idx) => {
            const x = startX + pointer.index * (cellWidth + gap);
            const arrowY = centerY + cellHeight / 2 + pointerOffset;
            
            return (
              <g key={`pointer-${idx}`}>
                {/* Arrow line */}
                <line
                  x1={x + cellWidth / 2}
                  y1={arrowY - 15}
                  x2={x + cellWidth / 2}
                  y2={centerY + cellHeight / 2 + 8}
                  stroke="hsl(var(--foreground))"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                {/* Arrow label */}
                <text
                  x={x + cellWidth / 2}
                  y={arrowY}
                  textAnchor="middle"
                  className="text-base font-bold fill-foreground"
                >
                  {pointer.label}
                </text>
              </g>
            );
          })}
        </g>
        
        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 5, 0 10"
              fill="hsl(var(--foreground))"
            />
          </marker>
        </defs>
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
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-500/20 border-2 border-green-500" />
            <span>Sorted</span>
          </div>
        </div>
      )}
    </div>
  );
};
