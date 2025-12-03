import { 
  Paragraph,
  GraphDiagram,
  QueueDiagram 
} from "@/components/AlgorithmContent";

export const Problem = () => (
  <>
    <Paragraph>
      Given a directed graph and two nodes (S and E), determine if there exists a route from S to E.
    </Paragraph>
    
    <div className="grid md:grid-cols-2 gap-4 my-4">
      <div>
        <GraphDiagram
          graphData={{
            nodes: [
              { id: "A", label: "A", x: 100, y: 80 },
              { id: "B", label: "B", x: 220, y: 40 },
              { id: "C", label: "C", x: 220, y: 120 },
              { id: "D", label: "D", x: 340, y: 80 },
            ],
            edges: [
              { from: "A", to: "B" },
              { from: "A", to: "C" },
              { from: "B", to: "D" },
              { from: "C", to: "D" },
            ],
          }}
          nodeStates={{
            A: "visited",
            B: "current",
            C: "queued",
            D: "unvisited",
          }}
          highlightEdge={{ from: "B", to: "D" }}
          width={400}
          height={200}
        />
      </div>
      <div>
        <QueueDiagram
          items={[
            { value: "C", state: "unvisited" },
            { value: "D", state: "highlighted" },
          ]}
          title="BFS Queue"
          width={400}
          height={200}
        />
      </div>
    </div>
    
    <Paragraph>
      In this example, we're exploring node B (current). Node A has been visited, C is in the queue, 
      and we're about to add D to the queue.
    </Paragraph>
  </>
);
