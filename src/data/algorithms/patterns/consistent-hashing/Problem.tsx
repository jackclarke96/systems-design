import { Paragraph, Callout, List, ListItem } from "@/components/AlgorithmContent";

export const Problem = () => (
  <>
    <Paragraph>
      <strong>Goal:</strong> Achieve even distribution of requests across servers.
    </Paragraph>

    <Callout type="info" title="When it works well">
      <Paragraph>
        When the size of the server pool is fixed and the data distribution is even.
      </Paragraph>
    </Callout>

    <Callout type="warning" title="The Problem">
      <Paragraph>
        When a server goes down and N changes from 4 to 3, most cache clients will connect to the wrong servers to fetch data. Traditional hashing (key % N) requires remapping almost all keys.
      </Paragraph>
    </Callout>
  </>
);
