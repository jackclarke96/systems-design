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
  </div>
);
