import { cn } from "@/lib/utils";

export type StackItemState = "unvisited" | "current" | "visited" | "highlighted";

export interface StackItem {
  value: string | number;
  state?: StackItemState;
}

interface StackDiagramProps {
  items: StackItem[];
  width?: number;
  height?: number;
  showLegend?: boolean;
  title?: string;
}

const itemStateColors = {
  unvisited: "fill-card stroke-border",
  current: "fill-primary stroke-primary",
  visited: "fill-accent stroke-accent-foreground",
  highlighted: "fill-info/30 stroke-info",
};

const itemStateTextColors = {
  unvisited: "fill-foreground",
  current: "fill-primary-foreground font-bold",
  visited: "fill-accent-foreground",
  highlighted: "fill-foreground",
};

export const StackDiagram = ({
  items,
  width = 300,
  height = 400,
  showLegend = false,
  title = "Stack",
}: StackDiagramProps) => {
  const itemWidth = 150;
  const itemHeight = 40;
  const gap = 4;
  const startX = (width - itemWidth) / 2;
  const startY = height - 80; // Start from bottom

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4 my-4">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Title */}
        <text x={width / 2} y={25} textAnchor="middle" className="text-sm font-semibold fill-foreground">
          {title}
        </text>

        {/* Top label */}
        <text x={width / 2} y={50} textAnchor="middle" className="text-xs fill-muted-foreground">
          ← Top
        </text>

        {/* Stack items (bottom to top) */}
        <g>
          {items.map((item, idx) => {
            const y = startY - idx * (itemHeight + gap);
            const state = item.state || "unvisited";
            const colorClass = itemStateColors[state];
            const textColorClass = itemStateTextColors[state];

            return (
              <g key={`item-${idx}`}>
                <rect
                  x={startX}
                  y={y}
                  width={itemWidth}
                  height={itemHeight}
                  rx="4"
                  className={cn(colorClass, "stroke-[2.5] transition-all duration-300")}
                />
                <text
                  x={startX + itemWidth / 2}
                  y={y + itemHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn(textColorClass, "text-sm font-semibold transition-all duration-300")}
                >
                  {item.value}
                </text>
              </g>
            );
          })}
        </g>

        {/* Base line */}
        <line
          x1={startX - 10}
          y1={startY + itemHeight + 5}
          x2={startX + itemWidth + 10}
          y2={startY + itemHeight + 5}
          className="stroke-border stroke-[3]"
        />
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
