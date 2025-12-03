import { useState } from "react";
import { Callout, List, ListItem, Heading } from "@/components/AlgorithmContent";
import { Quiz, QuizQuestion } from "@/components/Quiz";
import hashSpaceRing from "@/assets/hash-space-ring.png";
import consistentHashingRing from "@/assets/consistent-hashing-ring.png";

const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the main problem with traditional hash-based distribution (key % N)?",
    options: [
      "It's too slow to compute",
      "When N changes, almost all keys remap to different servers",
      "It doesn't work with string keys",
      "It requires too much memory"
    ],
    correctIndex: 1,
    explanation: "When a server is added or removed, N changes, causing hash(key) % N to produce different results for most keys. This leads to a flood of cache misses as clients connect to the wrong servers."
  },
  {
    question: "In consistent hashing, how do you find which server owns a key?",
    options: [
      "Calculate key % number_of_servers",
      "Look it up in a routing table",
      "Hash the key and walk clockwise on the ring until you hit a server",
      "The key's first character determines the server"
    ],
    correctIndex: 2,
    explanation: "You hash the key to find its position on the ring, then walk clockwise until you encounter a server. That server owns the key."
  },
  {
    question: "When a new server is added to a consistent hash ring, which keys need to be remapped?",
    options: [
      "All keys in the system",
      "Only keys between the new server and the next server clockwise",
      "Only keys between the new server and the previous server (anticlockwise)",
      "A random subset of keys"
    ],
    correctIndex: 2,
    explanation: "Only keys that fall between the new server's position and the previous server (going anticlockwise) need to move. These keys were previously owned by the next clockwise server."
  },
  {
    question: "What problem do virtual nodes solve?",
    options: [
      "They make hashing faster",
      "They reduce memory usage",
      "They improve load distribution by giving each server multiple positions on the ring",
      "They encrypt the data"
    ],
    correctIndex: 2,
    explanation: "Virtual nodes spread each server across multiple positions on the ring. This smooths out the distribution, preventing scenarios where one server gets a disproportionate share of keys."
  },
  {
    question: "With 100-200 virtual nodes per server, what is the typical standard deviation in load distribution?",
    options: [
      "About 25%",
      "About 15%",
      "About 5%",
      "About 1%"
    ],
    correctIndex: 2,
    explanation: "With 100-200 virtual nodes, the standard deviation of partition sizes drops to approximately 5%, meaning servers will have roughly equal load."
  },
  {
    question: "What is the 'celebrity problem' in consistent hashing?",
    options: [
      "Famous people's data is hard to hash",
      "A hot key always maps to the same server, potentially overloading it",
      "Too many servers on the ring",
      "Virtual nodes conflict with each other"
    ],
    correctIndex: 1,
    explanation: "Even with perfect distribution, a single extremely popular key (like a viral post) always hashes to the same server, which can overwhelm it regardless of how well other keys are distributed."
  },
  {
    question: "How can you mitigate the celebrity problem?",
    options: [
      "Use more virtual nodes",
      "Remove the hot key from the cache",
      "Split the key into shards or replicate across servers",
      "Use a different hash function"
    ],
    correctIndex: 2,
    explanation: "You can split a hot key into multiple shards (e.g., user:123:feed:0, :1, :2) that hash to different servers, or replicate the data across multiple servers and route requests randomly."
  }
];

export const ConsistentHashingContent = () => {
  const [activeTab, setActiveTab] = useState<"learn" | "quiz">("learn");

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("learn")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "learn" 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Learn
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "quiz" 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Quiz
        </button>
      </div>

      {activeTab === "learn" ? (
        <div className="space-y-10">
          {/* Problem Setup */}
          <section className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">Traditional approach</p>
              <code className="text-sm bg-muted px-4 py-2 rounded-lg text-primary font-medium">
                serverIndex = hash(key) % N
              </code>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-5 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-lg">🎯</span>
                <div>
                  <p className="font-medium text-foreground">Goal</p>
                  <p className="text-sm text-muted-foreground">Distribute requests evenly across a pool of servers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">✅</span>
                <div>
                  <p className="font-medium text-green-700 dark:text-green-400">This works when</p>
                  <p className="text-sm text-muted-foreground">The number of servers is fixed and keys are evenly distributed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-400">But there is a problem</p>
                  <p className="text-sm text-muted-foreground">
                    If a server goes down (N changes from 4 to 3), <strong>almost every key</strong> maps to a different server. 
                    Cache clients suddenly connect to the wrong servers, causing a flood of cache misses.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Solution: Consistent Hashing */}
          <section>
            <h2 className="text-2xl font-bold text-center mb-8">
              The Solution: Consistent Hashing
            </h2>

            {/* Key Concepts */}
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              <Callout type="definition" title="What is Consistent Hashing?">
                <p className="text-sm leading-relaxed">
                  A hashing technique where adding or removing a server only requires remapping <strong>k/n</strong> keys on average—where k is the total number of keys and n is the number of servers. Far better than remapping everything.
                </p>
              </Callout>

              <Callout type="definition" title="The Hash Ring">
                <div className="flex gap-4 items-center">
                  <p className="text-sm leading-relaxed flex-1">
                    Imagine the hash output space (e.g., 0 to 2¹⁶⁰-1 for SHA-1) arranged in a circle. Both servers and keys are placed on this ring based on their hash values.
                  </p>
                  <img src={hashSpaceRing} alt="Hash ring" className="w-20 h-20 object-contain bg-white rounded-lg shadow-sm" />
                </div>
              </Callout>
            </div>

            {/* How it Works */}
            <h3 className="font-semibold text-lg mb-6">How It Works</h3>
            
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1 space-y-6">
                <div>
                  <Heading>1. Place servers on the ring</Heading>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Hash each server (by IP or name) to get its position on the ring.
                  </p>
                </div>

                <div>
                  <Heading>2. Place keys on the ring</Heading>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Hash each cache key using the same function to find its position.
                  </p>
                </div>

                <div>
                  <Heading>3. Find a key's server</Heading>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Starting from the key's position, walk <strong className="text-foreground">clockwise</strong> until you hit a server. That server owns the key.
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <Heading>4. Adding or removing servers</Heading>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    When the ring changes, only keys between the affected server and its predecessor need to move. Everything else stays put.
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
                  Green = servers (s0-s3), Blue = keys (k0-k3)
                </p>
              </div>
            </div>
          </section>

          {/* Server Changes */}
          <section>
            <h3 className="font-semibold text-lg mb-4">When Servers Change</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-xl p-5">
                <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">Adding a server</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The new server takes ownership of keys that fall between itself and the previous server (going anticlockwise). Only those keys need to be migrated.
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl p-5">
                <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">Removing a server</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The removed server's keys are handed off to the next server clockwise. Again, only that slice of keys moves.
                </p>
              </div>
            </div>
          </section>

          {/* Problems & Virtual Nodes */}
          <section>
            <h3 className="font-semibold text-lg mb-4">Improving Distribution with Virtual Nodes</h3>
            
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <Callout type="warning" title="The Problem with Basic Rings">
                <List>
                  <ListItem>
                    <strong>Uneven partitions:</strong> Servers rarely hash to evenly-spaced positions, so some end up responsible for more keys than others.
                  </ListItem>
                  <ListItem>
                    <strong>Clustered keys:</strong> If keys cluster in one region of the ring, a single server gets overwhelmed.
                  </ListItem>
                </List>
              </Callout>

              <Callout type="tip" title="The Fix: Virtual Nodes">
                <p className="text-sm leading-relaxed mb-3">
                  Instead of one position per server, give each server <strong>multiple virtual nodes</strong> spread around the ring. A key's server is determined by the nearest virtual node clockwise.
                </p>
                <p className="text-sm font-medium text-callout-tip-text">
                  With 100-200 virtual nodes per server, load variance drops to ~5%.
                </p>
              </Callout>
            </div>
          </section>

          {/* Celebrity Problem */}
          <section className="border-t border-border pt-8">
            <h3 className="font-semibold text-lg text-center mb-6">The Celebrity Problem</h3>
            
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-5 mb-6">
              <p className="text-sm text-center leading-relaxed">
                Even with perfect distribution, a <strong>single hot key</strong> (like a viral post) always maps to the same server—potentially overloading it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium mb-3">Consistent hashing helps with:</p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Adding/removing servers without mass remapping
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Spreading keys across servers evenly
                  </li>
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-3">But for hot keys, you still need to:</p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong className="text-foreground">Split the key</strong> into shards: <code className="text-xs bg-muted px-1.5 py-0.5 rounded">user:123:feed:0</code>, <code className="text-xs bg-muted px-1.5 py-0.5 rounded">:1</code>, <code className="text-xs bg-muted px-1.5 py-0.5 rounded">:2</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span><strong className="text-foreground">Replicate</strong> the data across multiple servers and route requests randomly</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <Quiz questions={quizQuestions} title="Consistent Hashing Quiz" />
      )}
    </div>
  );
};
