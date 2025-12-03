import { DiagramWrapper, GraphDiagram } from "@/components/AlgorithmContent";

const BASE_GRAPH = Object.freeze({
  nodes: [
    { id: "S", label: "S", x: 100, y: 100 },
    { id: "A", label: "A", x: 200, y: 100 },
    { id: "B", label: "B", x: 300, y: 100 },
    { id: "C", label: "C", x: 100, y: 200 },
    { id: "D", label: "D", x: 200, y: 200 },
    { id: "E", label: "E", x: 300, y: 200 },
  ],
  edges: [
    { from: "S", to: "A" },
    { from: "A", to: "B" },
    { from: "S", to: "C" },
    { from: "C", to: "A" },
    { from: "A", to: "D" },
    { from: "B", to: "E" },
    { from: "D", to: "C" },
  ],
});

export const Problem = () => (
  <>
    Given a directed graph and two nodes (S and E), determine if there exists a route from S to E.
    <div className="grid lg:grid-cols-3 gap-4 lg:items-stretch">
      <div className="space-y-2 flex flex-col">
        <h4 className="text-sm font-semibold text-muted-foreground">Visualization</h4>
        <DiagramWrapper title={``} compact className="flex-1">
          <GraphDiagram
            graphData={BASE_GRAPH}
            nodeStates={{ S: "current", E: "current" }}
            highlightEdges={[
              { from: "S", to: "A" },
              { from: "A", to: "B" },
              { from: "B", to: "E" }
            ]}
            width={300}
            height={200}
            contentOffset={{ y: -50, x: -50 }}
          />
        </DiagramWrapper>
      </div>
    </div>
  </>
);
