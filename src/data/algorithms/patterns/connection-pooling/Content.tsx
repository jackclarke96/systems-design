import { useState } from "react";
import { Callout } from "@/components/Callout";
import { Quiz, QuizQuestion } from "@/components/Quiz";

const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the main benefit of connection pooling?",
    options: [
      "It makes queries run faster",
      "It avoids repeated handshake/auth costs by reusing open connections",
      "It encrypts database connections",
      "It automatically scales the database",
    ],
    correctIndex: 1,
    explanation: "Connection pooling keeps a set of open connections ready to reuse, avoiding the expensive TCP handshake, TLS negotiation, and DB authentication on every request.",
  },
  {
    question: "What happens when all connections in a pool are in use?",
    options: [
      "The database crashes",
      "New connections are created without limit",
      "New requests wait in a queue until a connection is freed (or timeout)",
      "Requests are automatically rejected",
    ],
    correctIndex: 2,
    explanation: "When the pool is exhausted, new requests queue up waiting for a connection to be returned. If they wait too long, they may timeout or be rejected. This implements back pressure.",
  },
  {
    question: "Why is max_lifetime important in pool configuration?",
    options: [
      "To make connections faster",
      "To avoid badly behaving long-lived connections that may have stale state",
      "To increase the pool size",
      "To encrypt connections",
    ],
    correctIndex: 1,
    explanation: "max_lifetime closes connections after a certain duration to avoid issues with stale connections, connection state drift, or load balancer timeouts on long-lived connections.",
  },
  {
    question: "If you have 20 app instances each with a pool size of 50, how many DB connections might you need?",
    options: [
      "50",
      "70",
      "500",
      "1000",
    ],
    correctIndex: 3,
    explanation: "Total connections = num_instances × pool_size = 20 × 50 = 1000. This can overwhelm a database if not planned for. Use PgBouncer or similar proxies if you need more instances.",
  },
  {
    question: "What is 'pool starvation'?",
    options: [
      "When the database runs out of disk space",
      "When connections are grabbed but not returned (leaks, long transactions), blocking new requests",
      "When the pool has too many connections",
      "When the network is slow",
    ],
    correctIndex: 1,
    explanation: "Pool starvation happens when connections are held too long (leaks, long-running queries) and the pool empties. New requests block and timeout. Fix with short transactions and acquire timeouts.",
  },
  {
    question: "How does gRPC handle connection pooling differently from HTTP/1.1?",
    options: [
      "gRPC doesn't use pooling",
      "gRPC uses one connection per request",
      "gRPC uses long-lived HTTP/2 connections with multiple streams sharing one connection",
      "gRPC always creates new connections",
    ],
    correctIndex: 2,
    explanation: "gRPC uses HTTP/2 which supports multiplexing - multiple RPCs can share a single long-lived connection using different streams, making it very efficient.",
  },
  {
    question: "Why should you avoid sharing one connection across concurrent requests?",
    options: [
      "It's slower",
      "SQL statements from different requests could interleave, causing corruption",
      "It uses more memory",
      "The database doesn't allow it",
    ],
    correctIndex: 1,
    explanation: "One connection should handle one request at a time. Multiple goroutines/threads doing interleaved SQL on one connection leads to unpredictable, corrupted results.",
  },
];

export const ConnectionPoolingContent = () => {
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
    {/* What & Why */}
    <section>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-foreground">What is it?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Keeping a small set of <strong>reusable open connections</strong> to something expensive (usually a DB, sometimes HTTP/gRPC services).
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A <strong>pool</strong> of N connections. Each incoming request <strong>borrows</strong> a connection, runs its query/transaction, and <strong>returns</strong> it to the pool.
          </p>
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            No need for handshake/auth cost every time.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-foreground">Why?</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span className="text-red-600 dark:text-red-400">No need for TCP 3-way handshake</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span className="text-red-600 dark:text-red-400">Possibly TLS handshake</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span className="text-red-600 dark:text-red-400">DB auth (username/password, SCRAM)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span className="text-red-600 dark:text-red-400">Allocating + DB-side resources</span>
            </li>
          </ul>
          <p className="text-xs text-muted-foreground pt-2 border-t border-border">
            Without pooling, DB often dies under context switching or "too many connections"
          </p>
        </div>
      </div>
    </section>

    {/* Hard Limits & Behavior */}
    <section>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-foreground">Hard Limits</h3>
          <p className="text-sm text-muted-foreground">Both sides have caps:</p>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• <strong className="text-foreground">Your process:</strong> Max file descriptors → max sockets</li>
            <li>• <strong className="text-foreground">DB:</strong> <code className="text-xs bg-muted px-1 rounded">max_connections</code></li>
            <li>• <strong className="text-foreground">LB / middle boxes:</strong> connection limits</li>
          </ul>
          <p className="text-sm font-medium text-green-600 dark:text-green-400 pt-2">
            Pooling keeps connection count bounded and reuses them efficiently.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-foreground">How it Behaves</h3>
          <p className="text-sm text-muted-foreground">If pool size = N:</p>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• First N requests grab a connection, do work, return it</li>
            <li>• Request N+1 <strong className="text-foreground">waits in a queue</strong> until a connection is free</li>
            <li>• If they wait too long → timeout or rejection</li>
          </ul>
          <p className="text-sm font-medium text-green-600 dark:text-green-400 pt-2">
            The pool implements back pressure and stops stampeding.
          </p>
        </div>
      </div>
    </section>

    {/* Pool Config */}
    <section>
      <h2 className="text-xl font-bold text-center mb-6">
        Pool Configuration
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-blue-700 dark:text-blue-400">DB Pool Config</h3>
          <p className="text-sm text-muted-foreground">
            Each app has its own pool to Postgres/MySQL. You tune:
          </p>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">max_open</code>
              <span>Maximum open connections</span>
            </li>
            <li className="flex items-start gap-2">
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">max_idle</code>
              <span>Connections to keep ready when idle</span>
            </li>
            <li className="flex items-start gap-2">
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">max_lifetime</code>
              <span>Close connections after this duration to avoid stale state</span>
            </li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-purple-700 dark:text-purple-400">HTTP / gRPC Pools</h3>
          <ul className="text-sm space-y-3 text-muted-foreground">
            <li>
              <strong className="text-foreground">HTTP client:</strong> Keeps a pool of keep-alive connections to a given host
            </li>
            <li>
              <strong className="text-foreground">gRPC:</strong> Uses long-lived HTTP/2 connections that multiple RPCs share (one connection, many streams)
            </li>
          </ul>
        </div>
      </div>
    </section>

    {/* Gotchas */}
    <section className="border-t border-border pt-8">
      <h2 className="text-xl font-bold text-center mb-6">
        Gotchas
      </h2>

      <div className="space-y-4">
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl p-5 space-y-2">
          <h4 className="font-bold text-red-700 dark:text-red-400">Exhausting the pool</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• If every request grabs a connection and doesn't return it (leaks, long transactions), the pool empties</li>
            <li>• New requests block then timeout</li>
            <li>• <strong className="text-foreground">Fix:</strong> Set timeouts on acquiring connections, keep transactions short, investigate long-running queries</li>
          </ul>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-5 space-y-2">
          <h4 className="font-bold text-amber-700 dark:text-amber-400">DB overload</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• If <strong>all</strong> app instances have pools of 50 and you scale to 20 instances, you've "promised" the DB up to 1000 connections</li>
            <li>• Size each pool so that <code className="text-xs bg-muted px-1 rounded">num_instances × pool_size</code> stays within DB's safe connection limit</li>
            <li>• Consider <strong className="text-foreground">PgBouncer</strong> or similar proxy if you need more instances</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-5 space-y-2">
          <h4 className="font-bold text-blue-700 dark:text-blue-400">One connection per request, not shared concurrently</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• For concurrency you want <strong className="text-foreground">many connections</strong>, not many goroutines on one connection doing interleaved SQL</li>
            <li>• Libraries usually enforce this</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);
