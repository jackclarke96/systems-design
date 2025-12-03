import { 
  Callout, 
  Section, 
  List, 
  ListItem,
  Code 
} from "@/components/AlgorithmContent";

export const Solution = () => (
  <>
    <Section title="Things to Watch Out For:">
      <Callout type="warning">
        Must mark nodes visited → prevent infinite loops on cycles.
      </Callout>
      <Callout type="warning">
        If using slices as queues, can 'leak forward' memory.
      </Callout>
    </Section>

    <Section title="Data Structures:">
      <Callout type="definition">
        <Code language="go">
{`Graph: map[string][]string
Queue: slice or ring buffer
Visited: map[string]bool`}
        </Code>
      </Callout>
    </Section>

    <Section title="Steps:">
      <List>
        <ListItem>Add start to a queue</ListItem>
        <ListItem>While queue not empty: take first element</ListItem>
        <ListItem>If neighbor is E → return true</ListItem>
        <ListItem>Else enqueue unvisited neighbors</ListItem>
        <ListItem>If queue empties without finding → return false</ListItem>
      </List>
    </Section>
  </>
);
