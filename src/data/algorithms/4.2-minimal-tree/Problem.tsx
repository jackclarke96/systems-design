import { ArrayDiagram, DiagramWrapper, GraphDiagram, TreeDiagram } from "@/components/AlgorithmContent";

const TREE_DATA = {
  value: 10,
  state: "visited",
  left: {
    value: 5,
    state: "visited",
    left: { value: 2, state: "visited" },
    right: { value: 6, state: "visited" },
  },
  right: {
    value: 21,
    state: "visited",
    left: { value: 13, state: "visited" },
    right: { value: 24, state: "visited" },
  },
} as const;

const ARR_DATA = [
  { value: 2, state: "visited" },
  { value: 5, state: "visited" },
  { value: 6, state: "visited" },
  { value: 10, state: "visited" },
  { value: 13, state: "visited" },
  { value: 21, state: "visited" },
  { value: 24, state: "visited" },
] as const;


export const Problem = () => (
  <>
    Given a sorted array with unique integer elements, write an algorithm to create a binary search with minimal height
    <div className="grid lg:grid-cols-2 gap-4 lg:items-stretch">
      <div className="space-y-2 flex flex-col">
        <DiagramWrapper title={``} compact className="flex-1">
          <ArrayDiagram
            cells={ARR_DATA}
            showIndices={true}
          />
        </DiagramWrapper>
      </div>
      <div className="space-y-2 flex flex-col">
        <DiagramWrapper title={``} compact className="flex-1">
          <TreeDiagram root={{...TREE_DATA}}/>
        </DiagramWrapper>
      </div>
    </div>
  </>
);
