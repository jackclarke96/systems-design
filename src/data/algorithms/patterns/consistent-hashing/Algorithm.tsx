import { 
  Paragraph, 
  Heading, 
  Callout, 
  Code 
} from "@/components/AlgorithmContent";
import hashSpaceRing from "@/assets/hash-space-ring.png";
import consistentHashingRing from "@/assets/consistent-hashing-ring.png";

export const AlgorithmSection = () => (
  <>
    <Callout type="definition" title="Consistent Hashing">
      <Paragraph>
        A special kind of hashing such that when a hash table is re-sized, only <strong>k/n</strong> keys need to be remapped, where k is the number of keys and n is the number of slots.
      </Paragraph>
    </Callout>

    <Callout type="definition" title="The Hash Space">
      <Paragraph>
        The output range of a hash function f. In cryptography, SHA-1's hash space is 0 (x0) to 2^160 - 1 (xn). Connect these endpoints to form a ring.
      </Paragraph>
    </Callout>

    <div className="my-6 flex justify-center">
      <img 
        src={hashSpaceRing} 
        alt="Hash space ring showing x0 and xn endpoints" 
        className="max-w-md rounded-lg border border-border bg-white/90"
      />
    </div>

    <Heading>Step 1: Hash Servers</Heading>
    <Paragraph>
      Use hash function f to map servers based on server IP or name onto the ring.
    </Paragraph>

    <Heading>Step 2: Hash Keys</Heading>
    <Paragraph>
      Use the same function f to map cache keys onto the ring.
    </Paragraph>

    <div className="my-6 flex justify-center">
      <img 
        src={consistentHashingRing} 
        alt="Consistent hashing ring with servers (s0-s3) and keys (k0-k3)" 
        className="max-w-md rounded-lg border border-border bg-white/90"
      />
    </div>

    <Heading>Step 3a: Server Lookup</Heading>
    <Paragraph>
      To determine which cache server a key is stored on, take the hash of the key, and go <strong>clockwise</strong> until a server is found.
    </Paragraph>

    <Heading>Step 3b: Server Addition</Heading>
    <Paragraph>
      Assuming server hashes are evenly distributed, adding a new server means that keys anticlockwise of it (but clockwise of the previous server) need to be remapped. The upper bound is the distance between two servers.
    </Paragraph>

    <Heading>Step 3c: Server Removal</Heading>
    <Paragraph>
      In the same way, the upper bound when removing a server is the distance between alternating nodes.
    </Paragraph>
  </>
);
