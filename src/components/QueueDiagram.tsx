import { cn } from "@/lib/utils";

export type QueueItemState = "unvisited" | "current" | "visited" | "highlighted";

export interface QueueItem {
  value: string | number;
  state?: QueueItemState;
}

interface QueueDiagramProps {
  items: QueueItem[];
  width?: number;
  height?: number;
  showLegend?: boolean;
  title?: string;
}

const itemStateColors = {
  unvisited: "fill-card stroke-border",
  current: "fill-primary stroke-primary",
  visited: "fill-accent stroke-accent-foreground",
  highlighted: "fill-green-600/30 stroke-green-600",
};

const itemStateTextColors = {
  unvisited: "fill-foreground",
  current: "fill-primary-foreground font-bold",
  visited: "fill-accent-foreground",
  highlighted: "fill-foreground",
};

export const QueueDiagram = ({
  items,
  width = 600,
  height = 200,
  showLegend = false,
  title = "Queue",
}: QueueDiagramProps) => {
  const itemWidth = 60;
  const itemHeight = 50;
  const gap = 4;
  const startX = 50;
  const centerY = height / 2 + 10;

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4 my-4">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Title */}
        <text x={width / 2} y={25} textAnchor="middle" className="text-sm font-semibold fill-foreground">
          {title}
        </text>

        {/* Labels */}
        <text x={startX} y={50} textAnchor="start" className="text-xs fill-muted-foreground">
          {/* Front → */}
        </text>
        <text
          x={startX + items.length * (itemWidth + gap) - gap}
          y={50}
          textAnchor="end"
          className="text-xs fill-muted-foreground"
        >
          {/* ← Rear */}
        </text>

        {/* Queue items */}
        <g>
          {items.map((item, idx) => {
            const x = startX + idx * (itemWidth + gap);
            const state = item.state || "unvisited";
            const colorClass = itemStateColors[state];
            const textColorClass = itemStateTextColors[state];

            return (
              <g key={`item-${idx}`}>
                <rect
                  x={x}
                  y={centerY - itemHeight / 2}
                  width={itemWidth}
                  height={itemHeight}
                  rx="4"
                  className={cn(colorClass, "stroke-[2.5] transition-all duration-300")}
                />
                <text
                  x={x + itemWidth / 2}
                  y={centerY}
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
