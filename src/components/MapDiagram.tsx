import { cn } from "@/lib/utils";

export type MapEntryState = "unvisited" | "current" | "visited" | "highlighted";

export interface MapEntry {
  key: string | number;
  value: string | number;
  state?: MapEntryState;
}

interface MapDiagramProps {
  entries: MapEntry[];
  width?: number;
  height?: number;
  showLegend?: boolean;
  title?: string;
}

const entryStateColors = {
  unvisited: "fill-card stroke-border",
  current: "fill-primary stroke-primary",
  visited: "fill-accent stroke-accent-foreground",
  highlighted: "fill-green-600/30 stroke-green-600",
};

const entryStateTextColors = {
  unvisited: "fill-foreground",
  current: "fill-primary-foreground font-bold",
  visited: "fill-accent-foreground",
  highlighted: "fill-foreground",
};

export const MapDiagram = ({
  entries,
  width = 600,
  height = 300,
  showLegend = false,
  title = "Map",
}: MapDiagramProps) => {
  const entryHeight = 40;
  const entryWidth = 140;
  const gap = 10;
  const cols = 2;
  const startX = 50;
  const startY = 50;

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4 my-4">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Title */}
        <text x={width / 2} y={25} textAnchor="middle" className="text-sm font-semibold fill-foreground">
          {title}
        </text>

        <g>
          {entries.map((entry, idx) => {
            const col = idx % cols;
            const row = Math.floor(idx / cols);
            const x = startX + col * (entryWidth + gap);
            const y = startY + row * (entryHeight + gap);
            const state = entry.state || "unvisited";
            const colorClass = entryStateColors[state];
            const textColorClass = entryStateTextColors[state];

            return (
              <g key={`entry-${idx}`}>
                {/* Background */}
                <rect
                  x={x}
                  y={y}
                  width={entryWidth}
                  height={entryHeight}
                  rx="4"
                  className={cn(colorClass, "stroke-[2.5] transition-all duration-300")}
                />
                
                {/* Divider line */}
                <line
                  x1={x + entryWidth / 2}
                  y1={y}
                  x2={x + entryWidth / 2}
                  y2={y + entryHeight}
                  className="stroke-border stroke-[1.5]"
                />

                {/* Key */}
                <text
                  x={x + entryWidth / 4}
                  y={y + entryHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn(textColorClass, "text-sm font-semibold transition-all duration-300")}
                >
                  {entry.key}
                </text>

                {/* Value */}
                <text
                  x={x + (3 * entryWidth) / 4}
                  y={y + entryHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn(textColorClass, "text-sm transition-all duration-300")}
                >
                  {entry.value}
                </text>

                {/* Labels */}
                {idx === 0 && (
                  <>
                    <text
                      x={x + entryWidth / 4}
                      y={y - 5}
                      textAnchor="middle"
                      className="text-xs fill-muted-foreground"
                    >
                      key
                    </text>
                    <text
                      x={x + (3 * entryWidth) / 4}
                      y={y - 5}
                      textAnchor="middle"
                      className="text-xs fill-muted-foreground"
                    >
                      value
                    </text>
                  </>
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
