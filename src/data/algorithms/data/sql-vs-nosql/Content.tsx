import { useState } from "react";
import { Callout } from "@/components/Callout";
import { Quiz, QuizQuestion } from "@/components/Quiz";

const quizQuestions: QuizQuestion[] = [
  {
    question: "When should you prefer SQL over NoSQL?",
    options: [
      "When you need flexible schema and horizontal scaling",
      "When you need strong consistency, ACID transactions, and complex joins",
      "When your data is mostly key-value lookups",
      "When you have extremely high write throughput requirements",
    ],
    correctIndex: 1,
    explanation: "SQL databases excel at strong consistency, ACID transactions, complex joins, and aggregations. They're ideal when your schema is well-understood and you need relational integrity.",
  },
  {
    question: "Which query pattern is best suited for a graph database?",
    options: [
      "Join orders with customers and filter by date",
      "Get user by ID and update a few fields",
      "Find all friends-of-friends within 3 hops",
      "Aggregate sales stats across dimensions",
    ],
    correctIndex: 2,
    explanation: "Graph databases are optimized for traversing relationships. Finding friends-of-friends or anything 'connected to this node within N hops' is where they shine.",
  },
  {
    question: "What does a hybrid SQL + NoSQL approach typically look like?",
    options: [
      "Use NoSQL for everything to simplify architecture",
      "Use SQL for core transactional data, NoSQL for logs/analytics/caching",
      "Migrate everything to SQL for consistency",
      "Use whichever is cheaper",
    ],
    correctIndex: 1,
    explanation: "A hybrid approach uses SQL as the source of truth for core transactional data (orders, accounts) while using NoSQL for high-volume, less structured data like logs, analytics, caching, and search.",
  },
  {
    question: "When does horizontal scaling with sharded SQL or NoSQL become necessary?",
    options: [
      "When you have more than 100 users",
      "When you need ACID transactions",
      "When data exceeds a few TBs or QPS reaches hundreds of thousands",
      "When you want faster development",
    ],
    correctIndex: 2,
    explanation: "For data up to a few TBs and tens of thousands of QPS, a single relational DB (with read replicas) often suffices. Beyond that, you need sharded SQL or NoSQL designed for horizontal scale.",
  },
  {
    question: "Which scenario requires multi-row/table transactions?",
    options: [
      "Appending an event to a user's activity log",
      "Fetching a user profile by ID",
      "Transferring money: debit account A and credit account B atomically",
      "Storing session data in a cache",
    ],
    correctIndex: 2,
    explanation: "Financial operations like transfers require atomicity across multiple rows/tables. If one operation fails, both must roll back. This is where SQL's transaction support is essential.",
  },
  {
    question: "When is a document/NoSQL database a better fit than SQL?",
    options: [
      "When you have a stable, well-defined schema",
      "When you need complex multi-table joins",
      "When your schema is fluid and you access data mostly by key with simple filters",
      "When you need strong consistency guarantees",
    ],
    correctIndex: 2,
    explanation: "Document databases shine when schema is flexible/evolving and access patterns are primarily by key or simple filters—not complex relational queries.",
  },
  {
    question: "What's the recommended approach when unsure between SQL and NoSQL?",
    options: [
      "Always start with NoSQL for flexibility",
      "Start with SQL until you hit clear scaling/flexibility limits",
      "Use both from the beginning",
      "Choose based on what's trending",
    ],
    correctIndex: 1,
    explanation: "Starting with SQL is generally safer—it provides ACID guarantees and mature tooling. Only move to NoSQL when you have clear evidence of scaling or flexibility limitations.",
  },
  {
    question: "What is 'sharding' in databases?",
    options: [
      "Replicating data across servers",
      "Partitioning data across multiple servers based on a key",
      "Compressing data for storage",
      "Encrypting sensitive data",
    ],
    correctIndex: 1,
    explanation: "Sharding splits data across servers based on a shard key. Each shard holds a subset of data, enabling horizontal scaling.",
  },
  {
    question: "When would you use a wide-column store like Cassandra?",
    options: [
      "For complex multi-table joins",
      "For high write throughput with simple query patterns",
      "For ACID transactions across tables",
      "For storing small amounts of data",
    ],
    correctIndex: 1,
    explanation: "Wide-column stores excel at high write throughput and time-series data with predictable query patterns, not complex relational queries.",
  },
  {
    question: "What is 'denormalization' and why use it in NoSQL?",
    options: [
      "Removing all duplicate data",
      "Duplicating data to avoid joins and improve read performance",
      "Encrypting data",
      "Compressing data",
    ],
    correctIndex: 1,
    explanation: "Denormalization stores redundant data to serve reads without joins. NoSQL databases often require this since they lack efficient join operations.",
  },
  {
    question: "What does 'polyglot persistence' mean?",
    options: [
      "Using only one database type",
      "Using multiple database technologies, each suited to specific needs",
      "Translating queries between databases",
      "Migrating between database vendors",
    ],
    correctIndex: 1,
    explanation: "Polyglot persistence uses the right database for each use case: SQL for transactions, document DB for flexible schema, graph DB for relationships, etc.",
  },
];

export const SQLvsNoSQLContent = () => {
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
    {/* When to Choose */}
    <section>
      <div className="grid md:grid-cols-2 gap-5">
        {/* SQL */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-blue-700 dark:text-blue-400 text-lg">Choose SQL when</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>You need <strong className="text-foreground">strong consistency</strong> and <strong className="text-foreground">ACID</strong> transactions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Queries involve <strong className="text-foreground">joins, aggregations, reports, analytics</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Schema is <strong className="text-foreground">well-understood</strong> and you value <strong className="text-foreground">constraints</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>You want <strong className="text-foreground">mature tooling</strong>: migrations, ORMs, BI tools</span>
            </li>
          </ul>
          <div className="pt-3 border-t border-blue-200 dark:border-blue-900/50">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Examples:</strong> Financial systems, inventory, order management, internal business apps
            </p>
          </div>
        </div>

        {/* NoSQL */}
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-green-700 dark:text-green-400 text-lg">Choose NoSQL when</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span>You need <strong className="text-foreground">very high write/read throughput</strong> or <strong className="text-foreground">huge data volume</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span>Access is mostly <strong className="text-foreground">by key</strong> or <strong className="text-foreground">simple filters</strong>, not complex joins</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span>You need <strong className="text-foreground">flexible schema</strong> that evolves frequently</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span>You need <strong className="text-foreground">geo-distribution</strong> or per-operation R/W quorums</span>
            </li>
          </ul>
          <div className="pt-3 border-t border-green-200 dark:border-green-900/50">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Examples:</strong> Activity streams, user events, caching, IoT, large content feeds
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Hybrid Approach */}
    <section>
      <Callout type="tip" title="Hybrid Approach">
        <div className="space-y-2">
          <p className="text-sm leading-relaxed">
            Most real systems use <strong>both</strong>. Keep the source of truth clear per dataset.
          </p>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• <strong className="text-blue-500">SQL</strong> for core transactional data (orders, accounts, users)</li>
            <li>• <strong className="text-green-500">NoSQL</strong> for logs, analytics, caching, search, sessions</li>
          </ul>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
            Avoid premature NoSQL. Start with SQL until there are clear scaling/flexibility limits.
          </p>
        </div>
      </Callout>
    </section>

    {/* Query Patterns */}
    <section>
      <h2 className="text-xl font-bold text-center mb-6">
        What Are Your Top Queries?
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Your query patterns often determine the best database choice.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h4 className="font-bold text-blue-500">SQL (Relational)</h4>
          <ul className="text-xs space-y-2 text-muted-foreground">
            <li>• Join orders with customers and products, filter by date/region/status</li>
            <li>• Aggregated stats across many dimensions grouped by category</li>
            <li>• Complex reporting with multiple table relationships</li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h4 className="font-bold text-green-500">Key-Value / Document</h4>
          <ul className="text-xs space-y-2 text-muted-foreground">
            <li>• Get user by ID, update a couple of fields</li>
            <li>• Get all posts for a user ordered by time</li>
            <li>• Check feature flag by key</li>
            <li>• Store/retrieve session data</li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h4 className="font-bold text-purple-500">Graph</h4>
          <ul className="text-xs space-y-2 text-muted-foreground">
            <li>• Find friends-of-friends</li>
            <li>• Find everything connected to this node in 3 hops</li>
            <li>• Recommendation engines based on relationships</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Decision Factors */}
    <section>
      <h2 className="text-xl font-bold text-center mb-6">
        Key Decision Factors
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Transactions */}
        <div className="bg-muted/50 rounded-xl p-5 space-y-3">
          <h3 className="font-semibold text-foreground">Multi-row/table Transactions?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            How strong do your consistency guarantees need to be?
          </p>
          <div className="space-y-2 text-xs">
            <div className="bg-background rounded-lg p-3">
              <p className="text-muted-foreground">
                <strong className="text-blue-500">Need atomicity:</strong> Update account A minus X and account B plus X atomically → <strong className="text-foreground">SQL</strong>
              </p>
            </div>
            <div className="bg-background rounded-lg p-3">
              <p className="text-muted-foreground">
                <strong className="text-green-500">Append-only:</strong> Append an event to user's log → <strong className="text-foreground">NoSQL is fine</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Schema Stability */}
        <div className="bg-muted/50 rounded-xl p-5 space-y-3">
          <h3 className="font-semibold text-foreground">Data Model Stable?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            How often does your schema change?
          </p>
          <div className="space-y-2 text-xs">
            <div className="bg-background rounded-lg p-3">
              <p className="text-muted-foreground">
                <strong className="text-blue-500">Stable schema:</strong> Well-defined entities and relationships → <strong className="text-foreground">Normalized SQL</strong>
              </p>
            </div>
            <div className="bg-background rounded-lg p-3">
              <p className="text-muted-foreground">
                <strong className="text-green-500">Fluid schema:</strong> Per-tenant structures, evolving fields → <strong className="text-foreground">Document/NoSQL or SQL + JSONB</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Scale */}
    <section className="border-t border-border pt-8">
      <h2 className="text-xl font-bold text-center mb-6">
        How Big? (Data Size & QPS)
      </h2>

      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <p className="font-medium text-foreground mb-1">Up to a few TBs, tens of thousands of QPS</p>
              <p className="text-sm text-muted-foreground">
                A single relational database with <strong>read replicas</strong> often handles this just fine. No need to over-engineer.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚀</span>
            <div>
              <p className="font-medium text-foreground mb-1">Massive writes (100k+ QPS), multi-region, petabyte-scale</p>
              <p className="text-sm text-muted-foreground">
                <strong>Sharded SQL</strong> or <strong>NoSQL</strong> designed for horizontal scale. Consider Cassandra, DynamoDB, CockroachDB, Vitess, etc.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Callout type="warning" title="Don't Prematurely Optimize" className="mt-6">
        <p className="text-sm leading-relaxed">
          Most applications never hit the scale that requires NoSQL. Start simple, measure, and scale when you have evidence—not assumptions.
        </p>
      </Callout>
    </section>

    {/* Scaling Thresholds */}
    <section className="border-t border-border pt-8">
      <h2 className="text-xl font-bold text-center mb-6">
        Scaling Thresholds Cheat Sheet
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        When do you need concurrency, sharding, caching? Rough TPS/data thresholds.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-semibold">Scale</th>
              <th className="text-left p-3 font-semibold">Reads (QPS)</th>
              <th className="text-left p-3 font-semibold">Writes (TPS)</th>
              <th className="text-left p-3 font-semibold">Data Size</th>
              <th className="text-left p-3 font-semibold">What You Need</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium text-green-600">Small</td>
              <td className="p-3">&lt; 1K</td>
              <td className="p-3">&lt; 100</td>
              <td className="p-3">&lt; 10 GB</td>
              <td className="p-3 text-muted-foreground">Single Postgres, connection pooling</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium text-blue-600">Medium</td>
              <td className="p-3">1K – 10K</td>
              <td className="p-3">100 – 1K</td>
              <td className="p-3">10 GB – 500 GB</td>
              <td className="p-3 text-muted-foreground">Read replicas, connection pooling, indexing, query optimization</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium text-orange-600">Large</td>
              <td className="p-3">10K – 100K</td>
              <td className="p-3">1K – 10K</td>
              <td className="p-3">500 GB – 5 TB</td>
              <td className="p-3 text-muted-foreground">Caching (Redis), read replicas, async processing, partitioning</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium text-red-600">Massive</td>
              <td className="p-3">100K+</td>
              <td className="p-3">10K+</td>
              <td className="p-3">5+ TB</td>
              <td className="p-3 text-muted-foreground">Sharding, NoSQL, multi-region, CDN, specialized DBs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h4 className="font-bold text-foreground">Concurrency Patterns</h4>
          <ul className="text-xs space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Connection pooling:</strong> Always. Even at small scale (PgBouncer, HikariCP)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Async/queues:</strong> &gt;100 TPS for slow operations (emails, webhooks)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Optimistic locking:</strong> When contention is low (&lt;5% conflicts)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Pessimistic locking:</strong> When contention is high or correctness critical</span>
            </li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h4 className="font-bold text-foreground">Caching Triggers</h4>
          <ul className="text-xs space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Add Redis cache:</strong> When read QPS &gt; 5-10K or latency matters</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Cache hot paths:</strong> User sessions, feature flags, config</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Cache computed data:</strong> Dashboards, aggregations, leaderboards</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Don't cache:</strong> Frequently changing data, transactional reads</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h4 className="font-bold text-foreground">Sharding Triggers</h4>
          <ul className="text-xs space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">•</span>
              <span><strong className="text-foreground">When to shard:</strong> Single node can't handle write load or data size (&gt;1-5 TB)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Shard key:</strong> tenant_id, user_id, region — high cardinality, even distribution</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Trade-off:</strong> Cross-shard queries become expensive/impossible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Alternatives first:</strong> Partitioning, archiving old data, read replicas</span>
            </li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h4 className="font-bold text-foreground">Partitioning (within single DB)</h4>
          <ul className="text-xs space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span><strong className="text-foreground">When:</strong> Tables &gt; 100M rows or &gt; 100 GB</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Range partition:</strong> By date (logs, events, transactions)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span><strong className="text-foreground">List partition:</strong> By region, tenant, status</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Hash partition:</strong> Even distribution when no natural key</span>
            </li>
          </ul>
        </div>
      </div>

      <Callout type="tip" title="Interview Tip" className="mt-6">
        <p className="text-sm leading-relaxed">
          "At 10K QPS reads I'd add caching. At 10K TPS writes I'd consider sharding. Before sharding, I'd try partitioning, read replicas, and archiving old data. Sharding is a last resort because of the complexity it adds."
        </p>
      </Callout>
    </section>
  </div>
);
