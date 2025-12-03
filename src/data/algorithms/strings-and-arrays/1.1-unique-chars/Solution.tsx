import { 
  Section, 
  Paragraph, 
  List, 
  ListItem, 
  Code, 
  Callout, 
  Heading 
} from "@/components/AlgorithmContent";
import { IterationCw } from "lucide-react";
import { DeepDiveModal } from "@/components/DeepDiveModal";

export const Solution = () => (
  <>
    <Section title="Algorithm Overview">
      <Callout type="algorithm">
          <Heading>Algorithm Steps</Heading>
          <ol className="space-y-4 list-decimal list-inside marker:font-semibold marker:text-primary">
            <li className="text-foreground">
              <strong>Validate inputs</strong> — Early returns for edge cases:
              <List>
                <ListItem>Return false if start node doesn't exist in graph</ListItem>
                <ListItem>Return false if end node doesn't exist in graph</ListItem>
                <ListItem>Return true if start and end are the same node</ListItem>
              </List>
            </li>
            
            <li className="text-foreground">
              <strong>Initialize data structures:</strong>
              <List>
                <ListItem><strong>Queue:</strong> Track nodes to explore (start with S)</ListItem>
                <ListItem><strong>Visited map:</strong> Avoid re-exploring nodes (mark S as visited)</ListItem>
              </List>
            </li>
            
            <li className="text-foreground">
              <div className="inline-flex items-center gap-2 -mt-0.5">
                <IterationCw className="h-4 w-4 text-primary flex-shrink-0" />
                <strong>Loop while queue is not empty:</strong>
              </div>
              <List>
                <ListItem>Dequeue the current node</ListItem>
                <ListItem>
                  <span className="inline-flex items-center gap-2 -mt-0.5">
                    <IterationCw className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    <strong>Loop for each neighbor of current node:</strong>
                  </span>
                  <List>
                    <ListItem>If neighbor is the target node E → return true</ListItem>
                    <ListItem>If neighbor hasn't been visited → add to queue and mark as visited</ListItem>
                  </List>
                </ListItem>
              </List>
            </li>
            
            <li className="text-foreground">
              <strong>Return false</strong> — No path exists (queue exhausted without finding target)
            </li>
          </ol>
        </Callout>
    </Section>
    <Section title="Choosing Data Structures">
      <Paragraph>
      We choose a slice of pointers to the{" "}
      <DeepDiveModal 
        trigger="graph's nodes" 
        title="Directed Graph Structure"
        content={
          <>
            <Heading>Directed Graph Structure</Heading>
            <Paragraph>
              The directed graph is implemented using two Go structs that work together:
            </Paragraph>
            
            <Section title="nodeDirectedGraph">
              <Paragraph>
                Represents a single node in the graph with two fields:
              </Paragraph>
              <List>
                <ListItem><strong>name</strong>: A string identifier for the node</ListItem>
                <ListItem><strong>neighbours</strong>: A slice of pointers to other nodes this node connects to</ListItem>
              </List>
              <Code>
                {`type nodeDirectedGraph struct {
	name       string
	neighbours []*nodeDirectedGraph
}
`}
              </Code>
            </Section>

            <Section title="directedGraph">
              <Paragraph>
                The main graph structure that contains:
              </Paragraph>
              <List>
                <ListItem><strong>nodes</strong>: A map from node names (strings) to node pointers, allowing O(1) node lookup</ListItem>
              </List>
                            <Code>
                {`type directedGraph struct {
	nodes map[string]*nodeDirectedGraph
}
`}
              </Code>
            </Section>

            <Section title="helper methods">
              <Paragraph>
                Then, some helper functions to help build out the graphs in a consistent way
              </Paragraph>
                            <Code>
                {`func newDirectedGraph() *directedGraph {
	return &directedGraph{nodes: make(map[string]*nodeDirectedGraph)}
}

func (d *directedGraph) getOrCreate(name string) *nodeDirectedGraph {
	if d.nodes == nil {
		d.nodes = make(map[string]*nodeDirectedGraph)
	}
	if n, ok := d.nodes[name]; ok {
		return n
	}
	n := &nodeDirectedGraph{name: name}
	d.nodes[name] = n
	return n
}

func (d *directedGraph) CreateNode(name string) *nodeDirectedGraph {
	return d.getOrCreate(name)
}

// AddEdge creates nodes if absent and adds a single edge from -> to.
// Returns true if the edge was newly added, false if it already existed.
func (d *directedGraph) AddEdge(from, to string) bool {
	u := d.getOrCreate(from)
	v := d.getOrCreate(to)

	// dedupe: check existing neighbour pointers
	for _, nb := range u.neighbours {
		if nb == v {
			return false
		}
	}
	u.neighbours = append(u.neighbours, v)
	return true
}
`}
              </Code>
            </Section>

            <Section title="Why Pointers?">
              <Paragraph>
                Using pointers (<code>*nodeDirectedGraph</code>) provides several benefits:
              </Paragraph>
              <List>
                <ListItem><strong>Shared State</strong> - we want all functions to operate directly on a shared state. Updates to a node (e.g., adding neighbors) are visible everywhere it’s referenced.</ListItem>
                <ListItem><strong>Fast equality comparison</strong> - we can compare pointer addresses directly. This is O(1)</ListItem>
                <ListItem><strong>Memory efficiency</strong> - nodes aren't duplicated when referenced multiple times</ListItem>
                <ListItem><strong>Easy navigation</strong> - following neighbours is just dereferencing a pointer</ListItem>
              </List>
            </Section>

             <Section title="Why Pointers?">
              <Paragraph>
                What if we didn't use pointers?
              </Paragraph>
              <List>
                <ListItem><strong>No map/set for visited</strong> - In Go, any type containing a slice is not comparable, so you can’t use nodeDirectedGraph as a map key or in a set.</ListItem>
                <ListItem><strong>Identity vs copies (aliasing)</strong> - Storing by value means every time you append a “neighbor,” you copy the whole node value. Those copies are different instances, so mutating a node somewhere won’t update all the copies stored elsewhere. You lose a single canonical instance per node, which breaks graph invariants.</ListItem>
                <ListItem><strong>Updates don’t propagate</strong> - Add a neighbor to a node “A” after you already copied “A” into someone else’s neighbours and the other places won’t see the change. Your graph representation silently diverges.</ListItem>
              </List>
            </Section>
          </>
        }
      />
 <Code>
{`queue := []*nodeDirectedGraph{}`}
</Code>
      </Paragraph>
            <Paragraph>
      We also choose a map of pointers to the graph's nodes to `bool`. This allows for O(1) lookup of whether a node has been visited
 <Code>
{`visited := map[*nodeDirectedGraph]bool`}
</Code>
      </Paragraph>       
    </Section>

    <Section title="Code">
      <Code language="go">
{`func (d *directedGraph) routeBetweenNodes(startNode, endNode *nodeDirectedGraph) bool {

  // 1: Validate inputs — Early returns for edge cases:
  if startNode == endNode {
    return true
  }
  if _, found := d.nodes[startNode.name]; !found {
    return false
  }
  if _, found := d.nodes[endNode.name]; !found {
    return false
  }

  // 2: Initialize data structures:
  queue := []*nodeDirectedGraph{startNode}
  visited := map[*nodeDirectedGraph]bool{startNode: true}

  // 3: Loop while queue is not empty
  for len(queue) > 0 {
    // dequeue the first element
    current := queue[0]
    queue = queue[1:]

    // explore neighbours of first node in queue
    for _, n := range current.neighbours {
      // if we have found the end node we are done
      if n == endNode {
        return true
      }
      // otherwise, if we have not seen the neighbour before, add it to the queue
      if !visited[n] {
        queue = append(queue, n)
        visited[n] = true
      }
    }
  }
  return false
}
`}
      </Code>
    </Section>
  </>
);
