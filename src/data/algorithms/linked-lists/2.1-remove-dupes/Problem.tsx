import { DiagramWrapper, LinkedListDiagram } from "@/components/AlgorithmContent";
import { ListNode } from "@/components/LinkedListDiagram";

const BASE_LIST: ListNode[] = [
  { value: 1, state: "visited" },
  { value: 1, state: "visited" },
  { value: 1, state: "visited" },
  { value: 4, state: "visited" },
  { value: 5, state: "visited" },
  { value: 5, state: "visited" },
  { value: 6, state: "visited" },
  { value: 7, state: "visited" },
  { value: 7, state: "visited" },
] as const;

const DEDUP_LIST: ListNode[] = [
  { value: 1, state: "visited" },
  { value: 4, state: "visited" },
  { value: 5, state: "visited" },
  { value: 6, state: "visited" },
  { value: 7, state: "visited" },
];

export const Problem = () => (
  <>
    Write code to remove duplicates from a linked list
    <div className="grid lg:grid-cols-2 gap-4 lg:items-stretch">
      <div className="space-y-2 flex flex-col">
        <DiagramWrapper title={`Before`} compact className="flex-1">
         <LinkedListDiagram nodes={BASE_LIST} />
        </DiagramWrapper>
      </div>
      <div className="space-y-2 flex flex-col">
        <DiagramWrapper title={`After`} compact className="flex-1">
         <LinkedListDiagram nodes={DEDUP_LIST} />
        </DiagramWrapper>
      </div>
    </div>
  </>
);
