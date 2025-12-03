import { Callout, List, ListItem, Heading } from "@/components/AlgorithmContent";
import hashSpaceRing from "@/assets/hash-space-ring.png";
import consistentHashingRing from "@/assets/consistent-hashing-ring.png";

export const ConsistentHashingContent = () => (
  <div className="space-y-10">
    {/* Formula */}
    <div className="text-center">
      <code className="text-sm bg-muted px-4 py-2 rounded-lg text-primary font-medium">
        serverIndex = hash(key) % N
      </code>
      <p className="text-xs text-muted-foreground mt-2">where N is the size of the server pool</p>
    </div>

    {/* Goal Box */}
    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-5 space-y-3">
      <div className="flex items-start gap-3">
        <span className="text-lg">🎯</span>
        <div>
          <p className="font-medium text-foreground">Goal</p>
          <p className="text-sm text-muted-foreground">Achieve even distribution of requests across servers</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <span className="text-lg">✅</span>
        <div>
          <p className="font-medium text-green-700 dark:text-green-400">Works well when</p>
          <p className="text-sm text-muted-foreground">The server pool size is fixed and data distribution is even</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <span className="text-lg">⚠️</span>
        <div>
          <p className="font-medium text-red-700 dark:text-red-400">The problem</p>
          <p className="text-sm text-muted-foreground">When a server goes down (N: 4→3), most cache clients connect to wrong servers</p>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <section>
      <h2 className="text-2xl font-bold text-center mb-8">
        Achieving Consistent Hashing
      </h2>

      {/* Definitions */}
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        <Callout type="definition" title="Consistent Hashing">
          <p className="text-sm leading-relaxed">
            A special kind of hashing where when a hash table is resized, only <strong>k/n</strong> keys need remapping (k = keys, n = slots).
          </p>
        </Callout>

        <Callout type="definition" title="The Hash Space">
          <div className="flex gap-4 items-center">
            <p className="text-sm leading-relaxed flex-1">
              The output range of hash function f. SHA-1: 0 to 2¹⁶⁰-1. Connect endpoints to form a ring.
            </p>
            <img src={hashSpaceRing} alt="Hash ring" className="w-20 h-20 object-contain bg-white rounded-lg shadow-sm" />
          </div>
        </Callout>
      </div>

      {/* Steps with Image */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <Heading>Step 1: Hash Servers</Heading>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use hash function f to map servers based on IP or name onto the ring.
            </p>
          </div>

          <div className="space-y-4">
            <Heading>Step 2: Hash Keys</Heading>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use the same function f to map cache keys onto the ring.
            </p>
          </div>

          <div className="space-y-4">
            <Heading>Step 3a: Server Lookup</Heading>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To find a key's server: hash the key, go <strong className="text-foreground">clockwise</strong> until you hit a server.
            </p>
          </div>

          <div className="space-y-4">
            <Heading>Step 3b: Server Addition</Heading>
            <p className="text-sm text-muted-foreground leading-relaxed">
              New server → remap keys anticlockwise of it (up to previous server). Upper bound: distance between servers.
            </p>
          </div>

          <div className="space-y-4">
            <Heading>Step 3c: Server Removal</Heading>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Removed server → remap its keys to next clockwise server. Upper bound: distance between alternating nodes.
            </p>
          </div>
        </div>

        <div className="lg:w-64 flex-shrink-0">
          <img 
            src={consistentHashingRing} 
            alt="Hash ring with servers and keys" 
            className="w-full bg-white rounded-xl border border-border shadow-sm"
          />
          <p className="text-xs text-center text-muted-foreground mt-2">
            Servers (s0-s3) and keys (k0-k3) on the ring
          </p>
        </div>
      </div>
    </section>

    {/* Problems & Solution */}
    <section className="grid md:grid-cols-2 gap-5">
      <Callout type="warning" title="Two Problems">
        <List>
          <ListItem>
            <strong>Uneven partitions:</strong> Can't keep equal sizes. Some servers get more keys.
          </ListItem>
          <ListItem>
            <strong>Non-uniform distribution:</strong> Keys may cluster, overloading some servers.
          </ListItem>
        </List>
      </Callout>

      <Callout type="tip" title="Solution: Virtual Nodes">
        <p className="text-sm leading-relaxed mb-2">
          Give each server <strong>multiple virtual nodes</strong>. Find key's server by going clockwise to nearest virtual node.
        </p>
        <p className="text-sm font-medium text-callout-tip-text">
          100-200 virtual nodes → ~5% std deviation
        </p>
      </Callout>
    </section>

    {/* Add/Remove */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-xl p-5">
        <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">When adding a node:</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          From the new node, move anticlockwise until you find the previous server. All keys in that range now belong to the new node—migrate them over.
        </p>
      </div>
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl p-5">
        <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">When removing a node:</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          From the removed node, move anticlockwise to find the previous server. Migrate all keys in that range to the next clockwise server.
        </p>
      </div>
    </div>

    {/* Celebrity Problem */}
    <section className="border-t border-border pt-8">
      <h3 className="font-bold text-lg text-center mb-6">The Celebrity Problem</h3>
      
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-5 mb-6">
        <p className="text-sm text-center">
          At the <strong>data layer</strong>: same key → same server → <strong className="text-amber-700 dark:text-amber-400">celebrity problem</strong>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium mb-3">Consistent hashing trade-offs:</p>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              Cheap to add servers & rebalance
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">✗</span>
              Single hot key still causes issues
            </li>
          </ul>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-3">Solutions for hot keys:</p>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">→</span>
              <span><strong className="text-foreground">Split:</strong> <code className="text-xs bg-muted px-1.5 py-0.5 rounded">celebrity:feed:0</code>, <code className="text-xs bg-muted px-1.5 py-0.5 rounded">:1</code>, <code className="text-xs bg-muted px-1.5 py-0.5 rounded">:2</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">→</span>
              <span><strong className="text-foreground">Replicate</strong> across shards, pick randomly</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);
