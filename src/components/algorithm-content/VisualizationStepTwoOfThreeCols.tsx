import { Paragraph, Callout, DiagramWrapper, GraphDiagram, QueueDiagram, MapDiagram } from "@/components/AlgorithmContent";
import { QueueItemState } from "../QueueDiagram";
import { MapEntry } from "../MapDiagram";
import { NodeState } from "@/types/visualizer";

interface QueueItem {
  value: string;
  state: QueueItemState;
}

export interface VisualizationStepProps {
  title: string;
  description: React.ReactNode;
  graph: {
    data: any;
    nodeStates: Record<string, NodeState>;
    width?: number;
    height?: number;
  };
  queue?: QueueItem[];
  stack?: { value: string; state: string }[];
  array?: { value: string; state: string }[];
  map?: MapEntry[];
}
export function VisualizationStep({
  title,
  description,
  graph,
  queue,
  map,
}: VisualizationStepProps) {
  // Count how many data structures we're showing
  const dataStructureCount = [queue, map].filter(Boolean).length;
  
  // Determine grid layout based on number of data structures
  // For 1 data structure: text + graph + data structure = 3 columns
  // For 2 data structures: text + graph + ds1 + ds2 = 4 columns
  const gridCols = dataStructureCount === 2 
    ? "grid lg:grid-cols-4 md:grid-cols-2 gap-4"
    : "grid lg:grid-cols-3 md:grid-cols-2 gap-4";

  return (
    <div className={`${gridCols} my-8`}>
      <div>
        <Paragraph>
          <strong>{title}</strong>
        </Paragraph>
        {description}
      </div>

      <DiagramWrapper title={`${title} - Graph`} compact>
        <GraphDiagram
          graphData={graph.data}
          nodeStates={graph.nodeStates}
          width={graph.width ?? 300}
          height={graph.height ?? 200}
          contentOffset={{ y: -50, x: -50 }}
        />
      </DiagramWrapper>

      {queue && (
        <DiagramWrapper title={`${title} - Queue`} compact>
          <QueueDiagram items={queue} width={400} height={200} />
        </DiagramWrapper>
      )}

      {map && (
        <DiagramWrapper title={`${title} - Map`} compact>
          <MapDiagram entries={map} width={400} height={200} />
        </DiagramWrapper>
      )}
    </div>
  );
}
