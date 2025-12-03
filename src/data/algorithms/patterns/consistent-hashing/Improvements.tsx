import { 
  Callout, 
  Paragraph,
  Heading,
  List,
  ListItem,
  Code
} from "@/components/AlgorithmContent";

export const Improvements = () => (
  <>
    <Callout type="warning" title="The Celebrity Problem">
      <Paragraph>
        At the data layer (cache/DB), hashing maps the same key to the same server. This creates the <strong>celebrity problem</strong> — hot keys overload a single server.
      </Paragraph>
    </Callout>

    <Heading>Consistent Hashing Trade-offs</Heading>
    
    <List>
      <ListItem>
        ✅ Makes it cheap to add more servers and rebalance nodes
      </ListItem>
      <ListItem>
        ❌ A single hot key will still cause issues unless you split/replicate it
      </ListItem>
    </List>

    <Heading>Solutions for Hot Keys</Heading>

    <Callout type="tip" title="Option 1: Split the Key">
      <Paragraph>
        Partition the celebrity key into multiple sub-keys that hash to potentially different nodes:
      </Paragraph>
      <Code language="text">
{`"celebrity123:feed:0"
"celebrity123:feed:1"
"celebrity123:feed:2"`}
      </Code>
    </Callout>

    <Callout type="tip" title="Option 2: Replicate Across Shards">
      <Paragraph>
        Replicate the hot data across multiple shards and choose one at random for each request. This spreads the load evenly.
      </Paragraph>
    </Callout>
  </>
);
