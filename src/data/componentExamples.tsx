import { Algorithm } from "@/types/algorithms";
import { 
  Callout, 
  Section, 
  List, 
  ListItem, 
  Paragraph, 
  Heading, 
  Code,
  GraphDiagram,
  TreeDiagram,
  LinkedListDiagram,
  ArrayDiagram,
  MapDiagram,
  StackDiagram,
  QueueDiagram,
  DiagramWrapper,
  DiagramColumn,
} from "@/components/AlgorithmContent";

/**
 * This file demonstrates how to use all available components for creating algorithm content.
 * Copy and modify these examples to create your own algorithm entries.
 */

export const componentShowcase: Algorithm = {
  id: "component-showcase",
  title: "Component Showcase - How to Use All Components",
  category: "examples",
  
  problem: (
    <>
      <Paragraph>
        This is a <strong>Paragraph</strong> component. Use it for regular text content.
        You can include <strong>bold text</strong>, <em>italics</em>, and inline code like <code>functionName()</code>.
      </Paragraph>
      
      <Paragraph>
        Multiple paragraphs automatically get proper spacing between them.
      </Paragraph>

      <Callout type="info">
        This is an <strong>info Callout</strong>. Use it for general information or helpful notes.
      </Callout>

      <Callout type="warning">
        This is a <strong>warning Callout</strong>. Use it to highlight potential pitfalls or things to watch out for.
      </Callout>

      <Callout type="tip">
        This is a <strong>tip Callout</strong>. Use it for optimization suggestions or best practices.
      </Callout>

      <Heading>Data Structure Diagrams</Heading>
      
      <Paragraph>
        <strong>GraphDiagram</strong> - Visualize directed graphs with configurable node states:
      </Paragraph>
      <GraphDiagram
        graphData={{
          nodes: [
            { id: "A", label: "A", x: 100, y: 100 },
            { id: "B", label: "B", x: 200, y: 100 },
            { id: "C", label: "C", x: 300, y: 100 },
            { id: "D", label: "D", x: 100, y: 200 },
            { id: "E", label: "E", x: 200, y: 200 },
            { id: "F", label: "F", x: 300, y: 200 },
          ],
          edges: [
            { from: "A", to: "B" },
            { from: "A", to: "D" },
            { from: "B", to: "C" },
            { from: "B", to: "E" },
            { from: "E", to: "F" },
            { from: "E", to: "D" },
          ],
        }}
        nodeStates={{
          A: "current",
          B: "queued",
          C: "visited",
          D: "unvisited",
        }}
        highlightEdge={{ from: "A", to: "B" }}
        showLegend={true}
      />

      <Heading>Combining Diagrams (Queue + Graph)</Heading>
      <Paragraph>
        Use <strong>DiagramWrapper</strong> with a grid layout to show multiple diagrams side-by-side. 
        Perfect for visualizing algorithms like BFS where you need to see both the graph state and the queue.
      </Paragraph>

      <div className="grid md:grid-cols-2 gap-4">
        <DiagramWrapper title="Graph State" compact>
          <GraphDiagram
            graphData={{
              nodes: [
                { id: "A", label: "A", x: 80, y: 80 },
                { id: "B", label: "B", x: 200, y: 40 },
                { id: "C", label: "C", x: 200, y: 120 },
                { id: "D", label: "D", x: 320, y: 80 },
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
            width={380}
            height={180}
          />
        </DiagramWrapper>

        <DiagramWrapper title="BFS Queue" compact>
          <QueueDiagram
            items={[
              { value: "C", state: "unvisited" },
              { value: "D", state: "highlighted" },
            ]}
            width={380}
            height={180}
          />
        </DiagramWrapper>
      </div>

      <Paragraph>
        The <code>compact</code> prop on DiagramWrapper reduces padding for smaller diagrams.
      </Paragraph>

      <Heading>Stacked Diagrams with Text Column</Heading>
      <Paragraph>
        Use <strong>DiagramColumn</strong> to stack diagrams vertically alongside explanatory text.
      </Paragraph>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Paragraph>
            <strong>BFS Algorithm Walkthrough</strong>
          </Paragraph>
          <Paragraph>
            Starting from node A, we explore neighbors level by level. The queue helps us keep track of nodes to visit next.
          </Paragraph>
          <Callout type="info">
            Notice how the graph state and queue update together as we process each node.
          </Callout>
          <Paragraph>
            The current node (B) is being explored, while C is queued for later processing.
          </Paragraph>
        </div>
        
        <DiagramColumn>
          <DiagramWrapper title="Step 1: Graph" compact>
            <GraphDiagram
              graphData={{
                nodes: [
                  { id: "A", label: "A", x: 80, y: 80 },
                  { id: "B", label: "B", x: 200, y: 40 },
                  { id: "C", label: "C", x: 200, y: 120 },
                  { id: "D", label: "D", x: 320, y: 80 },
                ],
                edges: [
                  { from: "A", to: "B" },
                  { from: "A", to: "C" },
                  { from: "B", to: "D" },
                ],
              }}
              nodeStates={{
                A: "visited",
                B: "current",
                C: "queued",
                D: "unvisited",
              }}
              width={380}
              height={160}
            />
          </DiagramWrapper>
          
          <DiagramWrapper title="Step 1: Queue" compact>
            <QueueDiagram
              items={[
                { value: "C", state: "unvisited" },
                { value: "D", state: "highlighted" },
              ]}
              width={380}
              height={120}
            />
          </DiagramWrapper>
        </DiagramColumn>
      </div>

      <Paragraph>
        <strong>TreeDiagram</strong> - Display binary trees with node state highlighting:
      </Paragraph>
      <TreeDiagram
        root={{
          value: 10,
          state: "visited",
          left: {
            value: 5,
            state: "current",
            left: { value: 3, state: "visited" },
            right: { value: 7, state: "unvisited" },
          },
          right: {
            value: 15,
            state: "highlighted",
            left: { value: 12, state: "unvisited" },
            right: { value: 20, state: "unvisited" },
          },
        }}
        showLegend={true}
      />

      <Paragraph>
        <strong>LinkedListDiagram</strong> - Show linked lists (singly or doubly):
      </Paragraph>
      <LinkedListDiagram
        nodes={[
          { value: 1, state: "visited" },
          { value: 2, state: "current" },
          { value: 3, state: "highlighted" },
          { value: 4, state: "unvisited" },
          { value: 5, state: "unvisited" },
        ]}
        doublyLinked={true}
        showLegend={true}
      />

      <Paragraph>
        <strong>ArrayDiagram</strong> - Visualize arrays with indices and cell states:
      </Paragraph>
      <ArrayDiagram
        cells={[
          { value: 5, state: "sorted" },
          { value: 3, state: "sorted" },
          { value: 8, state: "current" },
          { value: 1, state: "highlighted" },
          { value: 9, state: "unvisited" },
          { value: 2, state: "unvisited" },
        ]}
        showIndices={true}
        showLegend={true}
      />

      <Paragraph>
        <strong>MapDiagram</strong> - Display hash maps / dictionaries:
      </Paragraph>
      <MapDiagram
        entries={[
          { key: "name", value: "Alice", state: "visited" },
          { key: "age", value: 30, state: "current" },
          { key: "city", value: "NYC", state: "highlighted" },
          { key: "role", value: "Dev", state: "unvisited" },
        ]}
        title="User Info Map"
        showLegend={true}
      />

      <Paragraph>
        <strong>StackDiagram</strong> - Show stack data structure (LIFO):
      </Paragraph>
      <StackDiagram
        items={[
          { value: 10, state: "unvisited" },
          { value: 20, state: "visited" },
          { value: 30, state: "current" },
        ]}
        title="Call Stack"
        showLegend={true}
      />

      <Paragraph>
        <strong>QueueDiagram</strong> - Show queue data structure (FIFO):
      </Paragraph>
      <QueueDiagram
        items={[
          { value: "A", state: "visited" },
          { value: "B", state: "current" },
          { value: "C", state: "highlighted" },
          { value: "D", state: "unvisited" },
        ]}
        title="BFS Queue"
        showLegend={true}
      />
    </>
  ),
  algorithm: (
    <>
      <Callout type="algorithm">
        This is an <strong>algorithm Callout</strong>. Use it to describe the main algorithmic approach.
        Great for explaining high-level strategy.
      </Callout>

      <Callout type="definition">
        This is a <strong>definition Callout</strong>. Use it to define technical terms, data structures,
        or show type definitions.
      </Callout>

      <Heading>This is a Heading Component</Heading>
      <Paragraph>
        Use Heading components to create subsections within your content.
      </Paragraph>
    </>
  ),
  
  solution: (
    <>
      <Section title="Using the Section Component">
        <Paragraph>
          The <strong>Section</strong> component groups related content together with an optional title.
        </Paragraph>

        <List>
          <ListItem>This is a <strong>List</strong> component with <strong>ListItem</strong> children</ListItem>
          <ListItem>Use it to create bulleted lists of related information</ListItem>
          <ListItem>Each ListItem gets proper spacing and styling automatically</ListItem>
          <ListItem>You can include <strong>bold</strong>, <em>italic</em>, or <code>inline code</code> in list items</ListItem>
        </List>
      </Section>

      <Section title="Code Examples">
        <Paragraph>
          Use the <strong>Code</strong> component to display syntax-highlighted code blocks.
          Default language is Go, but you can specify any language.
        </Paragraph>

        <Code language="go">
{`func example() {
    // This is Go code (default)
    fmt.Println("Hello, World!")
}`}
        </Code>

        <Code language="javascript">
{`function example() {
  // This is JavaScript code
  console.log("Hello, World!");
}`}
        </Code>

        <Code language="python">
{`def example():
    # This is Python code
    print("Hello, World!")`}
        </Code>
      </Section>

      <Section title="Combining Components">
        <Paragraph>
          You can combine components in creative ways to structure your content effectively.
        </Paragraph>

        <Callout type="definition">
          <Heading>Data Structures</Heading>
          <Code language="go">
{`type Node struct {
    Value int
    Left  *Node
    Right *Node
}`}
          </Code>
          <Paragraph>
            You can put code blocks inside callouts for emphasis.
          </Paragraph>
        </Callout>

        <Callout type="algorithm">
          <Heading>Algorithm Steps</Heading>
          <List>
            <ListItem>Initialize data structures</ListItem>
            <ListItem>Process input and build initial state</ListItem>
            <ListItem>Execute main algorithm loop</ListItem>
            <ListItem>Return results</ListItem>
          </List>
        </Callout>
      </Section>

      <Section>
        <Paragraph>
          Sections don't need titles - you can omit the title prop for untitled sections.
        </Paragraph>
      </Section>
    </>
  ),
  
  improvements: (
    <>
      <Callout type="tip">
        <Paragraph>
          <strong>Performance Optimization</strong>: You can nest Paragraphs, Headings, Lists,
          and Code blocks inside Callouts for rich, structured content.
        </Paragraph>
      </Callout>

      <Section title="Advanced Techniques">
        <List>
          <ListItem>Use multiple Sections to organize complex solutions</ListItem>
          <ListItem>Combine Callouts of different types to highlight different aspects</ListItem>
          <ListItem>Use Code blocks with different languages as needed</ListItem>
          <ListItem>Include inline code snippets within Paragraphs using HTML <code>&lt;code&gt;</code> tags</ListItem>
        </List>
      </Section>

      <Heading>Quick Reference</Heading>
      
      <Callout type="info">
        <Paragraph>
          <strong>Available Components:</strong>
        </Paragraph>
        <List>
          <ListItem><code>&lt;Paragraph&gt;</code> - Regular text content</ListItem>
          <ListItem><code>&lt;Heading&gt;</code> - Subsection headings</ListItem>
          <ListItem><code>&lt;Section title="..."&gt;</code> - Grouped content with optional title</ListItem>
          <ListItem><code>&lt;List&gt;</code> + <code>&lt;ListItem&gt;</code> - Bulleted lists</ListItem>
          <ListItem><code>&lt;Code language="..."&gt;</code> - Syntax-highlighted code blocks</ListItem>
          <ListItem><code>&lt;Callout type="..."&gt;</code> - Special highlighted boxes (info, warning, tip, definition, algorithm)</ListItem>
        </List>
      </Callout>
    </>
  ),

  codeBlocks: [
    {
      description: <strong>Example: Full Algorithm Structure</strong>,
      code: `import { Algorithm } from "@/types/algorithms";
import { Callout, Section, List, ListItem, Paragraph, Heading, Code } from "@/components/AlgorithmContent";

export const myAlgorithm: Algorithm = {
  id: "my-algorithm",
  title: "My Algorithm Title",
  category: "graphs",
  
  problem: (
    <>
      <Paragraph>Describe the problem here...</Paragraph>
      <Callout type="info">Add helpful context</Callout>
    </>
  ),
  
  algorithm: (
    <>
      <Callout type="algorithm">
        Explain your approach here
      </Callout>
    </>
  ),
  
  solution: (
    <>
      <Section title="Steps">
        <List>
          <ListItem>Step 1</ListItem>
          <ListItem>Step 2</ListItem>
        </List>
      </Section>
    </>
  ),
  
  improvements: (
    <>
      <Callout type="tip">Optimization ideas...</Callout>
    </>
  ),
  
  codeBlocks: [
    {
      description: <strong>Implementation</strong>,
      code: \`// Your code here\`,
    },
  ],
};`,
    },
  ],

  detailedExplanations: [
    {
      trigger: "deep dive example",
      section: "solution",
      content: (
        <>
          <Heading>Deep Dive Content</Heading>
          <Paragraph>
            Detailed explanations (triggered by clicking info buttons) can use all the same components.
          </Paragraph>
          
          <Callout type="algorithm">
            This content appears in a modal when users click the "deep dive example" trigger.
          </Callout>

          <Section title="Example Section in Modal">
            <List>
              <ListItem>All components work here too</ListItem>
              <ListItem>Use them to provide detailed explanations</ListItem>
              <ListItem>Keep main content concise, put details in deep dives</ListItem>
            </List>
          </Section>
        </>
      ),
    },
  ],
};
