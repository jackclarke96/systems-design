import { 
  SinglePageContent,
  TwoColumn,
  Column,
  SectionTitle,
  SubTitle,
  StepTitle,
  GoalBox,
  DefinitionBox,
  ProblemTitle,
  SolutionTitle,
  FooterBox,
  ImageWithText,
  HighlightBox
} from "@/components/SinglePageContent";
import { Paragraph, List, ListItem, Code } from "@/components/AlgorithmContent";
import hashSpaceRing from "@/assets/hash-space-ring.png";
import consistentHashingRing from "@/assets/consistent-hashing-ring.png";

export const ConsistentHashingContent = () => (
  <SinglePageContent>
    <SubTitle className="font-mono text-primary">
      serverIndex = hash(key) % N where n is the size of the server pool
    </SubTitle>

    <GoalBox
      goal="Achieve even distribution of requests"
      worksWellWhen="the size of the server pool is fixed and the data distribution is even"
      problem="when a server goes down and N changes from 4 to 3, most cache clients will connect to the wrong servers to fetch data"
    />

    <SectionTitle>Achieving Consistent Hashing</SectionTitle>

    <TwoColumn>
      <Column>
        <DefinitionBox title="Definition: Consistent Hashing">
          <Paragraph>
            A special kind of hashing such that when a hash table is re-sized only <strong>k/n</strong> keys need to be remapped, where k is the number of keys and n is the number of slots.
          </Paragraph>
        </DefinitionBox>

        <StepTitle>Step 1: Hash Servers</StepTitle>
        <Paragraph>
          Use hash function f to map servers based on server IP or name
        </Paragraph>

        <StepTitle>Step 2: Hash Keys</StepTitle>
        <Paragraph>
          Use the same function f to map cache keys onto the ring
        </Paragraph>

        <StepTitle>Step 3a: Server Lookup</StepTitle>
        <Paragraph>
          To determine which cache server a key is stored on, take the hash of the key, and go clockwise until a server is found
        </Paragraph>

        <StepTitle>Step 3b: Server Addition</StepTitle>
        <ImageWithText src={consistentHashingRing} alt="Hash ring with servers and keys" imagePosition="right">
          <Paragraph>
            Assuming server hashes are evenly distributed, adding a new server means that keys anticlockwise of it but before previous but clockwise of the previous server need to be remapped. The upper bound is the distance between two servers.
          </Paragraph>
        </ImageWithText>

        <StepTitle>Step 3c: Server Removal</StepTitle>
        <Paragraph>
          In the same way, the upper bound when removing a server is the distance between alternating nodes
        </Paragraph>
      </Column>

      <Column>
        <DefinitionBox 
          title="Definition: The Hash Space"
          image={<img src={hashSpaceRing} alt="Hash ring" className="w-32 bg-white/90 rounded" />}
        >
          <Paragraph>
            The output range of a hash function f. In crypto, SHA-1's hash space is 0 (x<sub>0</sub>) to 2<sup>160</sup> - 1 (x<sub>n</sub>). Connect these to get a ring.
          </Paragraph>
        </DefinitionBox>

        <ProblemTitle>Two Problems with this</ProblemTitle>
        <List>
          <ListItem>
            It is impossible to keep the same size of <em>partitions</em> (hash space between adjacent servers) on the ring for all servers. <strong>This means some servers will have more keys</strong>
          </ListItem>
          <ListItem>
            It is possible to have a non-uniform key distribution on the ring. This means again that some servers will have more keys, and some none
          </ListItem>
        </List>

        <SolutionTitle>Solution: Virtual Nodes</SolutionTitle>
        <Paragraph>
          We give server 0 and server 1 <strong>multiple nodes each</strong>. To find which server a key is on, we go clockwise until we find a virtual node.
        </Paragraph>
        <Paragraph>
          The distribution of keys becomes more balanced as the standard deviation of partition size decreases. <strong>100-200 nodes → standard deviation ~ 5%</strong>
        </Paragraph>
        <Paragraph>
          When a server is added or removed, move anticlockwise.
        </Paragraph>
        <HighlightBox variant="green">
          <Paragraph>
            If <strong>ADDED</strong>, move anticlockwise until find the previous server and add all keys between to the new one.
          </Paragraph>
        </HighlightBox>
        <HighlightBox variant="red">
          <Paragraph>
            If <strong>REMOVED</strong>, move anticlockwise from the removed server until find previous and map to the next clockwise server
          </Paragraph>
        </HighlightBox>
      </Column>
    </TwoColumn>

    <FooterBox title="The Celebrity Problem">
      <HighlightBox variant="yellow">
        <Paragraph>
          At the <strong>data layer (cache/DB)</strong>, hashing → same key map to the same server → <strong>the celebrity problem appears.</strong>
        </Paragraph>
      </HighlightBox>

      <div className="space-y-2 text-sm mt-4">
        <p><strong>Consistent hashing:</strong></p>
        <List>
          <ListItem>Makes it cheap to add more servers and rebalance nodes</ListItem>
          <ListItem><strong>BUT</strong> a single hot key will still cause issues, unless you split/replicate it</ListItem>
          <ListItem><strong>EITHER</strong> split the celebrity key <code>"celebrity123:feed:0"</code>, <code>"celebrity123:feed:1"</code>, which hashes to potentially different nodes</ListItem>
          <ListItem><strong>OR</strong> just replicate across shards and choose at random</ListItem>
        </List>
      </div>
    </FooterBox>
  </SinglePageContent>
);
