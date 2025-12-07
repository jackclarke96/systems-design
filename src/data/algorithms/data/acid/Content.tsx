import { useState } from "react";
import { Callout } from "@/components/Callout";
import { Quiz, QuizQuestion } from "@/components/Quiz";
import acidWalFlow from "@/assets/acid-wal-flow.png";
import acidMvcc from "@/assets/acid-mvcc.png";
import acid2pc from "@/assets/acid-2pc.png";

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h4 className="font-semibold text-foreground mb-2">{children}</h4>
);

const quizQuestions: QuizQuestion[] = [
  {
    question: "What does the 'A' in ACID stand for, and what does it guarantee?",
    options: [
      "Availability - the database is always accessible",
      "Atomicity - all operations succeed or none do",
      "Asynchronous - operations happen in the background",
      "Authentication - users are verified before access",
    ],
    correctIndex: 1,
    explanation: "Atomicity ensures that all operations in a transaction either complete successfully together, or none of them take effect. There are no partial side-effects.",
  },
  {
    question: "Which isolation level allows dirty reads?",
    options: [
      "Serializable",
      "Repeatable Read",
      "Read Committed",
      "Read Uncommitted",
    ],
    correctIndex: 3,
    explanation: "Read Uncommitted is the lowest isolation level and allows dirty reads - reading data that another transaction has written but not yet committed.",
  },
  {
    question: "What is a 'phantom read'?",
    options: [
      "Reading data that was never written",
      "A transaction reads a row, another modifies it, first transaction re-reads and sees different values",
      "A transaction runs a query, another inserts matching rows, first transaction re-runs and sees extra rows",
      "Reading from a database that doesn't exist",
    ],
    correctIndex: 2,
    explanation: "A phantom read occurs when a transaction runs a query, another transaction inserts new rows that match the query, and the first transaction re-runs the query and sees the new 'phantom' rows.",
  },
  {
    question: "How does MVCC (Multi-Version Concurrency Control) handle isolation?",
    options: [
      "By locking the entire database during writes",
      "By creating a new version of the row on each write, letting reads use snapshots",
      "By queuing all transactions sequentially",
      "By rejecting concurrent transactions",
    ],
    correctIndex: 1,
    explanation: "MVCC creates a new version of each row on write. Readers access a consistent snapshot without blocking writers, and writers don't block readers.",
  },
  {
    question: "What is the key difference between Two-Phase Commit (2PC) and Sagas?",
    options: [
      "2PC is faster than Sagas",
      "Sagas provide strong consistency, 2PC provides eventual consistency",
      "2PC guarantees atomicity with blocking, Sagas use compensating transactions for eventual consistency",
      "2PC works with microservices, Sagas only work with monoliths",
    ],
    correctIndex: 2,
    explanation: "2PC provides strong atomicity but can block participants if the coordinator fails. Sagas achieve eventual consistency through compensating transactions (undo steps) when failures occur.",
  },
  {
    question: "Which anomaly occurs when T1 reads data written by T2 before T2 commits, and T2 then rolls back?",
    options: [
      "Phantom Read",
      "Non-repeatable Read",
      "Dirty Read",
      "Lost Update",
    ],
    correctIndex: 2,
    explanation: "A dirty read occurs when a transaction reads uncommitted data from another transaction. If that transaction rolls back, the first transaction has read invalid data.",
  },
  {
    question: "What does Durability guarantee?",
    options: [
      "Data is replicated across multiple servers",
      "Once a transaction is committed, it persists even after system failures",
      "The database can handle high load",
      "Transactions complete within a time limit",
    ],
    correctIndex: 1,
    explanation: "Durability ensures that once a transaction is committed, it remains committed even if the system crashes. This is typically achieved by flushing to disk and using write-ahead logs.",
  },
  {
    question: "What is the Write-Ahead Log (WAL) used for?",
    options: [
      "Caching frequently accessed data",
      "Recording changes before applying them, enabling recovery after crashes",
      "Encrypting data at rest",
      "Balancing load across servers",
    ],
    correctIndex: 1,
    explanation: "WAL writes changes to a log before applying them to data files. After a crash, the database replays the log to recover committed transactions.",
  },
  {
    question: "What is the difference between Read Committed and Repeatable Read?",
    options: [
      "Read Committed is faster",
      "Repeatable Read prevents non-repeatable reads by keeping a consistent snapshot",
      "Read Committed provides stronger guarantees",
      "There is no difference",
    ],
    correctIndex: 1,
    explanation: "Read Committed only sees committed data but may see different values if re-reading. Repeatable Read keeps a snapshot so re-reads return the same data.",
  },
  {
    question: "What problem do Sagas solve in microservices?",
    options: [
      "Network latency",
      "Maintaining consistency across multiple services without distributed locks",
      "Data encryption",
      "Load balancing",
    ],
    correctIndex: 1,
    explanation: "Sagas split a distributed transaction into local transactions with compensating actions. If one fails, previous steps are undone via compensation.",
  },
  {
    question: "What is 'write skew' anomaly?",
    options: [
      "When two transactions write to the same row simultaneously",
      "When two transactions read overlapping data and make decisions that conflict",
      "When writes are slower than reads",
      "When the database runs out of disk space",
    ],
    correctIndex: 1,
    explanation: "Write skew occurs when two transactions read the same data, make non-conflicting writes based on that read, but together violate a constraint.",
  },
  {
    question: "Which isolation level prevents all anomalies including phantom reads?",
    options: [
      "Read Uncommitted",
      "Read Committed",
      "Repeatable Read",
      "Serializable",
    ],
    correctIndex: 3,
    explanation: "Serializable is the strictest level, preventing dirty reads, non-repeatable reads, and phantom reads by ensuring transactions appear to execute serially.",
  },
];

export const ACIDContent = () => {
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
    {/* ACID Overview */}
    <section className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        ACID properties are the foundation of reliable database transactions. They guarantee that database operations are processed reliably, even when things go wrong.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl p-5">
          <p className="font-bold text-red-700 dark:text-red-400 mb-2">Atomicity</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            All operations in a transaction succeed or none do. No partial side-effects.
          </p>
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">How:</strong> Write-Ahead Log (WAL) with commit or rollback
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-xl p-5">
          <p className="font-bold text-green-700 dark:text-green-400 mb-2">Consistency</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            The database stays in a valid state. You define rules that must always hold.
          </p>
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Examples:</strong> Primary keys, unique constraints, foreign keys, check constraints
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-5">
          <p className="font-bold text-blue-700 dark:text-blue-400 mb-2">Isolation</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Concurrent transactions don't interfere with each other. Each sees a consistent view.
          </p>
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">How:</strong> Locks (shared for read, exclusive for write) or MVCC
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 rounded-xl p-5">
          <p className="font-bold text-purple-700 dark:text-purple-400 mb-2">Durability</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Once committed, data stays committed—even after crashes or power loss.
          </p>
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">How:</strong> Flush to disk before confirming commit, replay WAL on restart
          </p>
        </div>
      </div>

      {/* WAL Diagram */}
      <div className="bg-card border border-border rounded-xl p-5">
        <p className="text-sm font-medium text-foreground mb-3">Write-Ahead Log (WAL) Flow</p>
        <div className="flex justify-center">
          <img 
            src={acidWalFlow} 
            alt="Write-Ahead Log flow diagram" 
            className="max-w-md w-full rounded-lg"
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          1. Write to log first → 2. Confirm to client → 3. Apply to database. On crash, replay the log.
        </p>
      </div>

      {/* Three Places Your Change Lives */}
      <Callout type="info" title="Three Places Your Change Lives">
        <p className="text-sm text-muted-foreground mb-3">When you do an UPDATE, the change exists in three different places:</p>
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 border border-blue-200 dark:border-blue-900/50">
            <p className="font-medium text-sm text-blue-700 dark:text-blue-400 mb-1">1. In-Memory (Buffer Cache)</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The row is changed here <strong>first</strong>. This is what normal reads use. Fast, but volatile—lost on crash.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
            <p className="font-medium text-sm text-green-700 dark:text-green-400 mb-1">2. WAL on Disk</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Append-only log of "what changed". Used for <strong>crash recovery</strong> and replication. Written immediately.
            </p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3 border border-amber-200 dark:border-amber-900/50">
            <p className="font-medium text-sm text-amber-700 dark:text-amber-400 mb-1">3. Data Files on Disk</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The on-disk copy of tables & indexes. Updated <strong>later, in the background</strong> (checkpointing).
            </p>
          </div>
        </div>
      </Callout>

      {/* WAL vs Data Pages Explanation */}
      <Callout type="info" title="WAL is Append-Only, Data Pages Are Not">
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">
            Say you run: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">UPDATE accounts SET balance = balance - 10 WHERE id = 123</code>
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-medium text-sm text-green-700 dark:text-green-400 mb-1">WAL (Append-Only)</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Appends a new log record: <em>"Set row 123's balance to 90"</em>. Old records stay forever. You can replay the entire history from the beginning to reconstruct any past state.
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3 border border-amber-200 dark:border-amber-900/50">
              <p className="font-medium text-sm text-amber-700 dark:text-amber-400 mb-1">Data Page (In-Place Update)</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Overwrites the balance field from 100 → 90 directly in the page. The old value (100) is gone—no history preserved in the data file itself.
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <strong>Key insight:</strong> WAL is the history; data pages are just the current state. If you need to recover or audit, you replay WAL. If you just need the current balance, you read the data page.
          </p>
        </div>
      </Callout>
    </section>

    {/* MVCC Callout */}
    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
      <Callout type="definition" title="MVCC (Multi-Version Concurrency Control)">
        <p className="text-sm leading-relaxed">
          Instead of locking rows, each write creates a <strong>new version</strong> of the row. 
          Readers access a snapshot without blocking writers. This avoids deadlocks and improves 
          concurrency, but uses more storage for version history.
        </p>
      </Callout>
      <div className="flex justify-center">
        <img 
          src={acidMvcc} 
          alt="MVCC snapshot diagram" 
          className="max-w-sm w-full rounded-lg"
        />
      </div>
      <p className="text-xs text-muted-foreground text-center">
        T1 reads old version while T2 writes new version—no blocking.
      </p>
    </div>

    {/* Isolation Levels & Anomalies */}
    <section>
      <h2 className="text-xl font-bold text-center mb-6">
        Isolation Levels & Anomalies
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Isolation Levels */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg mb-4">Transaction Isolation Levels</h3>
          
          <div className="space-y-2">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="font-medium text-sm text-foreground">Read Uncommitted</p>
              <p className="text-xs text-muted-foreground">Allows dirty reads. Lowest isolation.</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="font-medium text-sm text-foreground">Read Committed</p>
              <p className="text-xs text-muted-foreground">No dirty reads, but allows non-repeatable reads.</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="font-medium text-sm text-foreground">Repeatable Read</p>
              <p className="text-xs text-muted-foreground">No dirty or non-repeatable reads, but allows phantom reads.</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="font-medium text-sm text-foreground">Serializable</p>
              <p className="text-xs text-muted-foreground">Transactions behave as if run sequentially. Highest isolation.</p>
            </div>
          </div>
        </div>

        {/* Common Anomalies */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg mb-4">Common Anomalies</h3>
          
          <div className="space-y-3">
            <div className="border-l-4 border-red-400 pl-3">
              <p className="font-medium text-sm text-foreground">Dirty Read</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                T1 reads data written by T2 before T2 commits. If T2 rolls back, T1 saw invalid data.
              </p>
            </div>
            <div className="border-l-4 border-amber-400 pl-3">
              <p className="font-medium text-sm text-foreground">Non-repeatable Read</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                T1 reads row R twice. T2 modifies R in between. T1 sees different values on each read.
              </p>
            </div>
            <div className="border-l-4 border-blue-400 pl-3">
              <p className="font-medium text-sm text-foreground">Phantom Read</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                T1 runs a query, T2 inserts new rows that match. T1 re-runs the query and sees extra rows.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Isolation Level Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-2 font-medium">Isolation Level</th>
              <th className="text-center p-2 font-medium">Dirty Read</th>
              <th className="text-center p-2 font-medium">Non-repeatable</th>
              <th className="text-center p-2 font-medium">Phantom</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="p-2">Read Uncommitted</td>
              <td className="text-center p-2 text-red-500">✓</td>
              <td className="text-center p-2 text-red-500">✓</td>
              <td className="text-center p-2 text-red-500">✓</td>
            </tr>
            <tr className="border-t border-border bg-muted/30">
              <td className="p-2">Read Committed</td>
              <td className="text-center p-2 text-green-500">✗</td>
              <td className="text-center p-2 text-red-500">✓</td>
              <td className="text-center p-2 text-red-500">✓</td>
            </tr>
            <tr className="border-t border-border">
              <td className="p-2">Repeatable Read</td>
              <td className="text-center p-2 text-green-500">✗</td>
              <td className="text-center p-2 text-green-500">✗</td>
              <td className="text-center p-2 text-red-500">✓</td>
            </tr>
            <tr className="border-t border-border bg-muted/30">
              <td className="p-2">Serializable</td>
              <td className="text-center p-2 text-green-500">✗</td>
              <td className="text-center p-2 text-green-500">✗</td>
              <td className="text-center p-2 text-green-500">✗</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          ✓ = possible, ✗ = prevented
        </p>
      </div>
    </section>

    {/* Distributed Transactions */}
    <section className="border-t border-border pt-8">
      <h2 className="text-xl font-bold text-center mb-6">
        Distributed Transactions
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        When a transaction spans multiple services or databases, how do we maintain atomicity?
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Two-Phase Commit */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-amber-700 dark:text-amber-400">Two-Phase Commit (2PC)</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Guarantees <strong>strong atomicity</strong> across services/DBs. A coordinator asks all participants to prepare, then commits or aborts based on responses.
          </p>
          <div className="flex justify-center py-2">
            <img 
              src={acid2pc} 
              alt="Two-Phase Commit flow" 
              className="w-full max-w-xs rounded-lg"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">Phase 1: Prepare → Phase 2: Commit/Abort</p>
          <div className="space-y-2 text-xs border-t border-amber-200 dark:border-amber-900/50 pt-3">
            <div className="flex items-start gap-2">
              <span className="text-red-500">⚠</span>
              <span className="text-muted-foreground">Slow, coordinator is single point of failure</span>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Use when:</p>
              <p className="text-muted-foreground">Few participants, must have cross-resource atomicity</p>
            </div>
          </div>
        </div>

        {/* Sagas */}
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-green-700 dark:text-green-400">Sagas</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Works in microservices. <strong>Resilient</strong>, no global lock, but provides <strong>eventual consistency</strong>. Must design compensating transactions carefully.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="text-amber-500">⚠</span>
              <span className="text-muted-foreground">Eventual consistency, compensation logic can be complex</span>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Use when:</p>
              <p className="text-muted-foreground">Business flows span multiple services and can tolerate eventual consistency</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Example:</p>
              <p className="text-muted-foreground">E-commerce: charge card → reserve stock → create shipment. If shipment fails, refund card and release stock.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);
