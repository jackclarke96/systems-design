import { 
  Paragraph, 
  Heading, 
  Callout,
  List,
  ListItem 
} from "@/components/AlgorithmContent";

export const Solution = () => (
  <>
    <Heading>Two Problems with Basic Consistent Hashing</Heading>
    
    <List>
      <ListItem>
        <strong>Uneven partitions:</strong> It is impossible to keep the same size of partitions (hash space between adjacent servers) on the ring for all servers. This means some servers will have more keys.
      </ListItem>
      <ListItem>
        <strong>Non-uniform key distribution:</strong> It is possible to have a non-uniform key distribution on the ring. This means again that some servers will have more keys, and some none.
      </ListItem>
    </List>

    <Callout type="tip" title="Solution: Virtual Nodes">
      <Paragraph>
        We give each server multiple virtual nodes on the ring. To find which server a key is on, we go clockwise until we find a virtual node, then map to its real server.
      </Paragraph>
      <Paragraph>
        The distribution of keys becomes more balanced as the standard deviation of partition size decreases. With <strong>100-200 virtual nodes</strong>, standard deviation drops to ~5%.
      </Paragraph>
    </Callout>

    <Heading>Adding/Removing Servers with Virtual Nodes</Heading>
    
    <Callout type="algorithm" title="Server Added">
      <Paragraph>
        Move anticlockwise from each virtual node until you find the previous server, then migrate all keys in that range to the new server.
      </Paragraph>
    </Callout>

    <Callout type="algorithm" title="Server Removed">
      <Paragraph>
        Move anticlockwise from the removed server's virtual nodes until you find the previous node, then migrate those keys to the next clockwise server.
      </Paragraph>
    </Callout>
  </>
);
