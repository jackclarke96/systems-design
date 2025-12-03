import { Paragraph, Callout, DiagramWrapper, GraphDiagram, QueueDiagram, MapDiagram } from "@/components/AlgorithmContent";
import { QueueItemState } from "../QueueDiagram";
import { MapEntry } from "../MapDiagram";
import { NodeState } from "@/types/visualizer";
import { LinkedListDiagram, ListNode, CustomArrow, BrokenLink } from "../LinkedListDiagram";

interface QueueItem {
  value: string;
  state: QueueItemState;
}

interface DataStructure {
  type: 'graph' | 'linkedList' | 'queue' | 'stack' | 'array' | 'map';
  label: string;
  data: any;
}

export interface VisualizationStepProps {
  title: string;
  description: React.ReactNode;
  dataStructures?: DataStructure[];
  // Legacy props for backward compatibility
  graph?: {
    data: any;
    nodeStates: Record<string, NodeState>;
    width?: number;
    height?: number;
  };
  linkedList?: ListNode[];
  customArrows?: CustomArrow[];
  brokenLinks?: BrokenLink[];
  queue?: QueueItem[];
  stack?: { value: string; state: string }[];
  array?: { value: string; state: string }[];
  map?: MapEntry[];
  textOnRight?: boolean;
}

export function VisualizationStep({
  title,
  description,
  dataStructures,
  graph,
  linkedList,
  customArrows,
  brokenLinks,
  queue,
  map,
  textOnRight = false,
}: VisualizationStepProps) {
  // Build data structures array from legacy props if dataStructures not provided
  const structures = dataStructures || [
    ...(graph ? [{ type: 'graph' as const, label: 'Visualization', data: graph }] : []),
    ...(linkedList ? [{ type: 'linkedList' as const, label: 'Linked List', data: linkedList }] : []),
    ...(queue ? [{ type: 'queue' as const, label: 'Queue', data: queue }] : []),
    ...(map ? [{ type: 'map' as const, label: 'Visited Map', data: map }] : []),
  ];

  const renderDataStructure = (ds: DataStructure) => {
    switch (ds.type) {
      case 'graph':
        return (
          <GraphDiagram
            graphData={ds.data.data}
            nodeStates={ds.data.nodeStates}
            width={ds.data.width ?? 300}
            height={ds.data.height ?? 200}
            contentOffset={{ y: -50, x: -50 }}
          />
        );
      case 'linkedList':
        return (
          <LinkedListDiagram 
            nodes={Array.isArray(ds.data) ? ds.data : ds.data.nodes}
            customArrows={ds.data.customArrows || customArrows}
            brokenLinks={ds.data.brokenLinks || brokenLinks}
          />
        );
      case 'queue':
        return <QueueDiagram items={ds.data} width={400} height={200} />;
      case 'map':
        return <MapDiagram entries={ds.data} width={400} height={200} />;
      default:
        return null;
    }
  };

  return (
    <div className="border border-border rounded-lg p-6 my-8 bg-accent/30 space-y-4">
      {/* Row 1: Text Description - Full Width */}
      <div>
        <Paragraph>
          <strong>{title}</strong>
        </Paragraph>
        {description}
      </div>

      {/* Row 2: Data Structures Side by Side */}
      <div className={`grid gap-4 lg:items-stretch ${
        structures.length === 1 ? 'lg:grid-cols-1' : 
        structures.length === 2 ? 'lg:grid-cols-2' : 
        'lg:grid-cols-3'
      }`}>
        {structures.map((ds, idx) => (
          <div key={idx} className="space-y-2 flex flex-col">
            <h4 className="text-sm font-semibold text-muted-foreground">{ds.label}</h4>
            <DiagramWrapper title={ds.label} compact className="flex-1">
              {renderDataStructure(ds)}
            </DiagramWrapper>
          </div>
        ))}
      </div>
    </div>
  );
}
