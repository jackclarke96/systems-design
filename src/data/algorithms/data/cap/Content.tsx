import { useState } from "react";
import { Callout } from "@/components/Callout";
import { Quiz, QuizQuestion } from "@/components/Quiz";
import capNodes from "@/assets/cap-nodes.png";
import capHashRing from "@/assets/cap-hash-ring.png";
import capQuorumWrite from "@/assets/cap-quorum-write.png";
import capMerkleTree from "@/assets/cap-merkle-tree.png";

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h4 className="font-semibold text-foreground mb-2">{children}</h4>
);

const quizQuestions: QuizQuestion[] = [
  {
    question: "According to the CAP theorem, which property must a distributed system always handle?",
    options: [
      "Consistency - it's the most important",
      "Availability - users expect responses",
      "Partition tolerance - network failures are inevitable",
      "All three equally",
    ],
    correctIndex: 2,
    explanation: "Partition tolerance is mandatory because network partitions are inevitable in distributed systems. The real choice is between consistency and availability during a partition.",
  },
  {
    question: "In a quorum-based system with N=5 replicas, what values of W and R guarantee strong consistency?",
    options: [
      "W=1, R=1",
      "W=2, R=2",
      "W=3, R=3",
      "W=5, R=5",
    ],
    correctIndex: 2,
    explanation: "Strong consistency requires W + R > N. With N=5, W=3 and R=3 means 3+3=6 > 5, so at least one node will have the latest write when reading.",
  },
  {
    question: "What is the purpose of virtual nodes in partitioning?",
    options: [
      "To reduce network latency",
      "To achieve more even data distribution across servers",
      "To encrypt data at rest",
      "To speed up write operations",
    ],
    correctIndex: 1,
    explanation: "Virtual nodes give each physical server multiple positions on the hash ring, leading to more even distribution of data and better load balancing when servers are added or removed.",
  },
  {
    question: "How do vector clocks detect concurrent writes?",
    options: [
      "By using timestamps from a central clock",
      "By comparing version numbers - if neither vector dominates the other, writes are concurrent",
      "By locking data during writes",
      "By rejecting all concurrent operations",
    ],
    correctIndex: 1,
    explanation: "Vector clocks track [server, version] pairs. If all counts in one vector are >= the other, it's newer. If neither dominates (some higher, some lower), the writes are concurrent and need conflict resolution.",
  },
  {
    question: "What is 'hinted handoff' used for?",
    options: [
      "Permanently removing failed nodes",
      "Temporarily storing writes for unavailable nodes to replay when they recover",
      "Encrypting data between nodes",
      "Load balancing read requests",
    ],
    correctIndex: 1,
    explanation: "Hinted handoff maintains availability during temporary failures. Writes intended for an unavailable node are stored elsewhere with a 'hint' and pushed to the target node when it comes back online.",
  },
  {
    question: "What problem does the Gossip protocol solve?",
    options: [
      "Data encryption",
      "Query optimization",
      "Failure detection without a single point of failure",
      "Transaction isolation",
    ],
    correctIndex: 2,
    explanation: "Gossip protocol allows decentralized failure detection. Each node maintains heartbeat counters and shares them periodically. If a node's counter stops incrementing, it's considered offline.",
  },
  {
    question: "How do Merkle trees help with replica synchronization?",
    options: [
      "They encrypt data during transfer",
      "They identify differing data buckets efficiently by comparing root hashes",
      "They compress data for faster transfer",
      "They order transactions chronologically",
    ],
    correctIndex: 1,
    explanation: "Merkle trees hash data buckets hierarchically. If root hashes differ, you traverse down to find exactly which buckets differ, minimizing the data needed to compare and synchronize.",
  },
];

export const CAPContent = () => {
  const [activeTab, setActiveTab] = useState<"learn" | "quiz">("learn");

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("learn")}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === "learn"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Learn
          {activeTab === "learn" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === "quiz"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Quiz
          {activeTab === "quiz" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {activeTab === "learn" ? <LearnContent /> : <Quiz questions={quizQuestions} />}
    </div>
  );
};

const LearnContent = () => (
  <div className="space-y-10">
    {/* CAP Theorem */}
    <section className="space-y-4">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            In a distributed system, you can only guarantee <strong>two out of three</strong> properties at any time.
          </p>

          <div className="grid gap-3">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400 mb-1">Consistency</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All nodes see the same data at the same time. Every read receives the most recent write.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-xl p-4">
              <p className="font-bold text-green-700 dark:text-green-400 mb-1">Availability</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every request gets a response (even if it's not the most up-to-date data).
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 rounded-xl p-4">
              <p className="font-bold text-purple-700 dark:text-purple-400 mb-1">Partition Tolerance</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The system continues to function even if network communication between nodes fails.
              </p>
            </div>
          </div>
        </div>

        <div className="w-48 flex-shrink-0">
          <img 
            src={capNodes} 
            alt="Three distributed nodes connected" 
            className="w-full bg-white rounded-xl border border-border p-2"
          />
          <p className="text-xs text-center text-muted-foreground mt-2">Distributed nodes (n1, n2, n3)</p>
        </div>
      </div>

      <Callout type="warning" title="The Real Trade-off">
        <p className="text-sm leading-relaxed">
          Network partitions <strong>will happen</strong>, so partition tolerance is mandatory. The real choice is: 
          during a partition, do you prioritize <strong>Consistency</strong> (block until nodes sync) or <strong>Availability</strong> (respond with potentially stale data)?
        </p>
      </Callout>
    </section>

    {/* Partitioning & Replication */}
    <section>
      <h2 className="text-xl font-bold text-center mb-6">
        Partitioning & Replication
      </h2>

      <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
        <div className="flex-1 grid gap-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-bold text-foreground">Data Partitioning (Sharding)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A single server can't hold everything. We <strong>split data into partitions</strong> stored across multiple servers.
            </p>
            <div className="text-xs space-y-1 text-muted-foreground">
              <p><strong className="text-foreground">Key-based:</strong> Hash the key to determine partition</p>
              <p><strong className="text-foreground">Range-based:</strong> Split by key ranges (A-M, N-Z)</p>
              <p><strong className="text-foreground">Virtual nodes:</strong> Each server has multiple positions on the ring for better distribution</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-bold text-foreground">Data Replication</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For high availability and reliability, data must be replicated asynchronously across multiple servers.
            </p>
            <div className="text-xs space-y-1 text-muted-foreground">
              <p><strong className="text-foreground">Strategy:</strong> Map key to ring, store on the first <strong>N</strong> unique clockwise servers</p>
              <p><strong className="text-foreground">Geo-distribution:</strong> Place replicas in <strong>distinct data centers</strong> for disaster recovery</p>
            </div>
          </div>
        </div>

        <div className="w-56 flex-shrink-0">
          <img 
            src={capHashRing} 
            alt="Hash ring with servers and keys" 
            className="w-full bg-white rounded-xl border border-border p-2"
          />
          <p className="text-xs text-center text-muted-foreground mt-2">Keys (k) map to servers (s) clockwise</p>
        </div>
      </div>
    </section>

    {/* Quorum Consensus */}
    <section>
      <h3 className="font-semibold text-lg mb-4">Quorum Consensus</h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-muted/50 rounded-xl p-5 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            A <strong>coordinator</strong> sits between clients and replica nodes. It ensures enough nodes acknowledge operations.
          </p>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-background rounded-lg p-3">
              <p className="text-2xl font-bold text-primary">N</p>
              <p className="text-xs text-muted-foreground">Number of replicas</p>
            </div>
            <div className="bg-background rounded-lg p-3">
              <p className="text-2xl font-bold text-green-500">W</p>
              <p className="text-xs text-muted-foreground">Write quorum size</p>
            </div>
            <div className="bg-background rounded-lg p-3">
              <p className="text-2xl font-bold text-blue-500">R</p>
              <p className="text-xs text-muted-foreground">Read quorum size</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              <strong className="text-foreground">Write succeeds</strong> when coordinator receives <strong>W</strong> ACKs
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Read succeeds</strong> when coordinator receives <strong>R</strong> responses
            </p>
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <p className="text-sm font-medium text-foreground">Common configurations:</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-background rounded-lg p-3">
                <p className="font-medium text-foreground mb-1">Fast writes: R=1, W=N</p>
                <p className="text-muted-foreground">Writes go to all nodes, reads from any one</p>
              </div>
              <div className="bg-background rounded-lg p-3">
                <p className="font-medium text-foreground mb-1">Fast reads: R=N, W=1</p>
                <p className="text-muted-foreground">Writes to one node, reads check all</p>
              </div>
            </div>
            <Callout type="tip" title="Strong Consistency Rule">
              <p className="text-sm">
                If <strong>R + W &gt; N</strong>, you guarantee strong consistency because read and write sets must overlap.
              </p>
            </Callout>
          </div>
        </div>

        <div className="w-64 flex-shrink-0">
          <img 
            src={capQuorumWrite} 
            alt="Coordinator sending writes to replicas" 
            className="w-full bg-white rounded-xl border border-border p-2"
          />
          <p className="text-xs text-center text-muted-foreground mt-2">Coordinator sends put() and waits for ACKs</p>
        </div>
      </div>
    </section>

    {/* Consistency Models */}
    <section>
      <h3 className="font-semibold text-lg mb-4">Consistency Models</h3>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border-l-4 border-blue-500 bg-muted/30 rounded-r-lg p-4">
          <p className="font-medium text-foreground mb-1">Strong Consistency</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Any read returns the most recent write. Must block until all replicas sync. Highest latency.
          </p>
        </div>
        <div className="border-l-4 border-amber-500 bg-muted/30 rounded-r-lg p-4">
          <p className="font-medium text-foreground mb-1">Weak Consistency</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Reads may not see the most recent write. No guarantees on when data will converge.
          </p>
        </div>
        <div className="border-l-4 border-green-500 bg-muted/30 rounded-r-lg p-4">
          <p className="font-medium text-foreground mb-1">Eventual Consistency</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Given enough time without new writes, all replicas converge to the same value.
          </p>
        </div>
      </div>
    </section>

    {/* Vector Clocks */}
    <section>
      <h3 className="font-semibold text-lg mb-4">Conflict Detection: Vector Clocks</h3>
      
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          A vector clock is a list of <strong>[server, version]</strong> pairs. On each write, increment the writing server's version.
        </p>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-xs font-medium text-foreground mb-2">Finding the newest version:</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Compare vectors—if <strong>all counts</strong> in one vector are ≥ the other, it's the newer version.
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg p-4">
          <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">Detecting conflicts:</p>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            If neither vector dominates (each has some counts higher), the writes are <strong>concurrent</strong>.
          </p>
          <code className="text-xs bg-muted px-2 py-1 rounded block">
            [Sx:3, Sy:1, Sz:1] vs [Sx:2, Sy:2, Sz:1] → Conflict! Client must resolve.
          </code>
        </div>
      </div>
    </section>

    {/* Failure Handling */}
    <section className="border-t border-border pt-8">
      <h2 className="text-xl font-bold text-center mb-6">
        Failure Detection & Handling
      </h2>

      {/* Gossip Protocol */}
      <div className="mb-6">
        <Callout type="definition" title="Gossip Protocol (Failure Detection)">
          <p className="text-sm leading-relaxed mb-2">
            Decentralized failure detection—no single point of failure. Each node maintains a <strong>membership list</strong> with heartbeat counters.
          </p>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Each node increments its own heartbeat counter periodically</li>
            <li>• Nodes randomly share their membership lists with neighbors</li>
            <li>• If a node's heartbeat doesn't increase for a set period, it's marked offline</li>
            <li>• Requires ≥2 independent sources to confirm a node is down</li>
          </ul>
        </Callout>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-6">
        {/* Temporary Failures */}
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-green-700 dark:text-green-400">Temporary Failures</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Use a <strong>sloppy quorum</strong>: maintain W and R requirements even when some servers are down by using available nodes.
          </p>
          <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
            <p className="text-xs font-medium text-foreground mb-1">Hinted Handoff</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If server A is down, another server temporarily handles its writes with a "hint." When A recovers, the data is pushed back to achieve consistency.
            </p>
          </div>
        </div>

        {/* Permanent Failures */}
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-red-700 dark:text-red-400">Permanent Failures</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Use <strong>anti-entropy protocols</strong> to keep replicas synchronized by comparing and updating to the newest versions.
          </p>
          <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
            <p className="text-xs font-medium text-foreground mb-1">Merkle Trees</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Hash data in buckets hierarchically. Compare root hashes between replicas—if different, traverse down to find exactly which buckets differ.
            </p>
          </div>
        </div>
      </div>

      {/* Merkle Tree Diagram */}
      <div className="bg-card border border-border rounded-xl p-5">
        <p className="text-sm font-medium text-foreground mb-3 text-center">Merkle Tree Comparison</p>
        <img 
          src={capMerkleTree} 
          alt="Merkle trees comparing data buckets between servers" 
          className="w-full max-w-2xl mx-auto rounded-lg"
        />
        <p className="text-xs text-center text-muted-foreground mt-3">
          Red nodes indicate hash differences. Traverse down to find mismatched buckets. Only sync the differing keys.
        </p>
      </div>
    </section>
  </div>
);
