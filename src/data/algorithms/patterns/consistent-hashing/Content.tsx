import { Paragraph, Callout, List, ListItem, Heading, Code } from "@/components/AlgorithmContent";
import hashSpaceRing from "@/assets/hash-space-ring.png";
import consistentHashingRing from "@/assets/consistent-hashing-ring.png";

export const ConsistentHashingContent = () => (
  <div className="space-y-8">
    {/* Formula */}
    <p className="text-center font-mono text-primary text-sm">
      serverIndex = hash(key) % N where N is the size of the server pool
    </p>

    {/* Goal Box */}
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 space-y-1 text-sm">
      <p><strong>Goal:</strong> Achieve even distribution of requests</p>
      <p className="text-green-700 dark:text-green-400">
        <strong>Works well when:</strong> the size of the server pool is fixed and the data distribution is even
      </p>
      <p className="text-red-700 dark:text-red-400">
        <strong>The problem:</strong> when a server goes down and N changes from 4 to 3, most cache clients will connect to the wrong servers to fetch data
      </p>
    </div>

    {/* Main Content */}
    <section>
      <h2 className="text-xl font-bold text-center border-b border-border pb-3 mb-6">
        Achieving Consistent Hashing
      </h2>

      {/* Definitions Row */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Callout type="definition" title="Consistent Hashing">
          <Paragraph>
            A special kind of hashing such that when a hash table is re-sized only <strong>k/n</strong> keys need to be remapped, where k is the number of keys and n is the number of slots.
          </Paragraph>
        </Callout>

        <Callout type="definition" title="The Hash Space">
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <Paragraph>
                The output range of a hash function f. In crypto, SHA-1's hash space is 0 (x₀) to 2¹⁶⁰ - 1 (xₙ). Connect these endpoints to form a ring.
              </Paragraph>
            </div>
            <img src={hashSpaceRing} alt="Hash ring" className="w-24 h-24 object-contain bg-white rounded" />
          </div>
        </Callout>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        <div>
          <Heading>Step 1: Hash Servers</Heading>
          <Paragraph>Use hash function f to map servers based on server IP or name onto the ring.</Paragraph>
        </div>

        <div>
          <Heading>Step 2: Hash Keys</Heading>
          <Paragraph>Use the same function f to map cache keys onto the ring.</Paragraph>
        </div>

        <div>
          <Heading>Step 3a: Server Lookup</Heading>
          <Paragraph>To determine which server a key is stored on, take the hash of the key and go <strong>clockwise</strong> until a server is found.</Paragraph>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 space-y-4">
            <div>
              <Heading>Step 3b: Server Addition</Heading>
              <Paragraph>
                Adding a new server means keys anticlockwise of it (but clockwise of the previous server) need to be remapped. The upper bound is the distance between two servers.
              </Paragraph>
            </div>
            <div>
              <Heading>Step 3c: Server Removal</Heading>
              <Paragraph>
                Similarly, removing a server requires remapping keys to the next clockwise server. Upper bound is the distance between alternating nodes.
              </Paragraph>
            </div>
          </div>
          <img 
            src={consistentHashingRing} 
            alt="Hash ring with servers and keys" 
            className="w-48 md:w-56 bg-white rounded-lg border border-border"
          />
        </div>
      </div>
    </section>

    {/* Problems & Solution */}
    <section className="grid md:grid-cols-2 gap-6">
      <Callout type="warning" title="Two Problems">
        <List>
          <ListItem>
            <strong>Uneven partitions:</strong> Impossible to keep equal partition sizes. Some servers get more keys.
          </ListItem>
          <ListItem>
            <strong>Non-uniform distribution:</strong> Keys may cluster, leaving some servers overloaded and others empty.
          </ListItem>
        </List>
      </Callout>

      <Callout type="tip" title="Solution: Virtual Nodes">
        <Paragraph>
          Give each server <strong>multiple virtual nodes</strong> on the ring. To find a key's server, go clockwise to the nearest virtual node.
        </Paragraph>
        <Paragraph>
          <strong>100-200 virtual nodes → ~5% standard deviation</strong> in partition sizes.
        </Paragraph>
      </Callout>
    </section>

    {/* Add/Remove with Virtual Nodes */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <p className="text-sm">
          <strong className="text-green-700 dark:text-green-400">If ADDED:</strong> Move anticlockwise until you find the previous server, then migrate all keys in that range to the new server.
        </p>
      </div>
      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-sm">
          <strong className="text-red-700 dark:text-red-400">If REMOVED:</strong> Move anticlockwise from the removed server until you find the previous, then migrate those keys to the next clockwise server.
        </p>
      </div>
    </div>

    {/* Celebrity Problem */}
    <section className="border-t border-border pt-6">
      <h3 className="font-bold text-lg text-center mb-4">The Celebrity Problem</h3>
      
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
        <Paragraph>
          At the <strong>data layer (cache/DB)</strong>, hashing → same key maps to the same server → <strong>the celebrity problem appears.</strong>
        </Paragraph>
      </div>

      <div className="text-sm space-y-2">
        <p><strong>Consistent hashing:</strong></p>
        <List>
          <ListItem>✅ Makes it cheap to add more servers and rebalance nodes</ListItem>
          <ListItem>❌ A single hot key will still cause issues unless you split/replicate it</ListItem>
        </List>
        
        <p className="mt-4"><strong>Solutions for hot keys:</strong></p>
        <List>
          <ListItem>
            <strong>Split the key:</strong> <code className="text-xs bg-muted px-1 rounded">"celebrity123:feed:0"</code>, <code className="text-xs bg-muted px-1 rounded">"celebrity123:feed:1"</code> — hashes to different nodes
          </ListItem>
          <ListItem>
            <strong>Replicate across shards</strong> and choose at random
          </ListItem>
        </List>
      </div>
    </section>
  </div>
);
