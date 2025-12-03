import { useState } from "react";
import { Quiz } from "@/components/Quiz";
import { Wallet, Database, Send, Shield, RefreshCw, Search, Layers, Clock, CheckCircle, Key, List } from "lucide-react";

const ConceptCard = ({ 
  title, 
  icon: Icon, 
  children, 
  variant = "default" 
}: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
  variant?: "default" | "green" | "red" | "blue" | "amber" | "purple";
}) => {
  const variants = {
    default: "border-border bg-card",
    green: "border-green-500/30 bg-green-500/5",
    red: "border-red-500/30 bg-red-500/5",
    blue: "border-blue-500/30 bg-blue-500/5",
    amber: "border-amber-500/30 bg-amber-500/5",
    purple: "border-purple-500/30 bg-purple-500/5",
  };
  
  const iconVariants = {
    default: "text-primary",
    green: "text-green-500",
    red: "text-red-500",
    blue: "text-blue-500",
    amber: "text-amber-500",
    purple: "text-purple-500",
  };

  return (
    <div className={`rounded-lg border p-4 ${variants[variant]}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`h-5 w-5 ${iconVariants[variant]}`} />
        <h4 className="font-semibold">{title}</h4>
      </div>
      <div className="text-sm text-muted-foreground space-y-2">
        {children}
      </div>
    </div>
  );
};

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-bold mt-8 mb-4 pb-2 border-b border-border">
    {children}
  </h3>
);

const BulletList = ({ items, bulletColor = "text-primary" }: { items: (string | React.ReactNode)[]; bulletColor?: string }) => (
  <ul className="space-y-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2">
        <span className={`${bulletColor} mt-1`}>•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const DataModelCard = ({ title, fields }: { title: string; fields: string[] }) => (
  <div className="rounded-lg border border-border bg-card p-3">
    <h5 className="font-semibold text-sm mb-2">{title}</h5>
    <ul className="text-xs text-muted-foreground space-y-0.5">
      {fields.map((field, i) => (
        <li key={i} className="font-mono">• {field}</li>
      ))}
    </ul>
  </div>
);

export const Content = () => {
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
        <div className="space-y-6">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm">
          A wallet/ledger service is the core of any fintech platform—it records all money movements 
          in an append-only, double-entry ledger, exposes APIs for transfers/balance queries, and emits 
          events so other services can react.
        </p>
      </div>

      <SectionHeader>High-Level Responsibilities</SectionHeader>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Database className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium">Record all money movements</p>
            <p className="text-sm text-muted-foreground">Append-only, double-entry ledger</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Send className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium">Expose APIs</p>
            <p className="text-sm text-muted-foreground font-mono">POST /transfer, /topup, /withdraw • GET /balance, /transactions</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium">Emit Events</p>
            <p className="text-sm text-muted-foreground">So other services can react (notifications, analytics, risk)</p>
          </div>
        </div>
      </div>

      <SectionHeader>Data Model</SectionHeader>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <DataModelCard 
          title="Accounts" 
          fields={["account_id", "owner_id (user/org)", "currency", "status (active, closed, frozen)"]}
        />
        <DataModelCard 
          title="ledger_entries" 
          fields={["entry_id", "transaction_id", "account_id", "amount (signed)", "type (TRANSFER, TOPUP...)", "created_at", "updated_at"]}
        />
        <DataModelCard 
          title="Outbox" 
          fields={["outbox_id", "event_type", "aggregate_id", "payload", "created_at", "sent_at"]}
        />
        <DataModelCard 
          title="Balances (materialised)" 
          fields={["account_id", "available", "posted", "updated_at"]}
        />
      </div>

      <SectionHeader>Write Path: POST /transfer</SectionHeader>
      
      <div className="space-y-4">
        <ConceptCard title="1. Validate & Pre-checks" icon={Shield} variant="amber">
          <BulletList 
            items={[
              "Auth & Authz (is caller allowed to move from account A?)",
              "Check limits (per-day caps, risk rules)",
              "Check available_balance(A) >= amount"
            ]}
            bulletColor="text-amber-500"
          />
        </ConceptCard>

        <ConceptCard title="2. Single SQL Transaction (ACID)" icon={Database} variant="blue">
          <div className="space-y-2">
            <p className="font-medium text-foreground">All in one atomic operation:</p>
            <div className="bg-muted/50 rounded p-3 font-mono text-xs space-y-1">
              <p>-- Insert ledger entries</p>
              <p>INSERT ledger_entries: A: -50, B: +50</p>
              <p></p>
              <p>-- Update balances</p>
              <p>UPDATE balances SET available = available - 50 WHERE account_id = A</p>
              <p>UPDATE balances SET available = available + 50 WHERE account_id = B</p>
              <p></p>
              <p>-- Insert outbox event</p>
              <p>INSERT outbox (event_type='TransferCompleted', payload=...)</p>
              <p></p>
              <p>COMMIT</p>
            </div>
          </div>
        </ConceptCard>

        <ConceptCard title="3. Outbox Worker" icon={RefreshCw} variant="green">
          <BulletList 
            items={[
              "Polls outbox where sent_at IS NULL",
              "Publishes to ledger-events topic",
              "Sets sent_at = now()"
            ]}
            bulletColor="text-green-500"
          />
          <p className="mt-2 text-xs italic">This is the Transactional Outbox pattern—guarantees at-least-once delivery.</p>
        </ConceptCard>
      </div>

      <SectionHeader>Idempotency & Exactly Once</SectionHeader>
      
      <div className="grid md:grid-cols-2 gap-4">
        <ConceptCard title="Idempotency & Dedup" icon={Key} variant="purple">
          <p className="mb-2">Client supplies <strong>idempotency key</strong> for each transfer request.</p>
          <p className="font-medium text-foreground mb-1">Wallet service keeps a table:</p>
          <ul className="text-xs font-mono space-y-0.5">
            <li>• idempotency_key</li>
            <li>• request_hash</li>
            <li>• transaction_id</li>
            <li>• status</li>
            <li>• response_payload</li>
          </ul>
        </ConceptCard>

        <ConceptCard title="Request Flow" icon={CheckCircle} variant="green">
          <p className="font-medium text-foreground mb-2">On POST /transfer:</p>
          <BulletList 
            items={[
              "If key seen → return stored response (don't create new entries)",
              "If new → perform transfer in one DB tx, store result"
            ]}
            bulletColor="text-green-500"
          />
        </ConceptCard>
      </div>

      <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4 mt-4">
        <h4 className="font-semibold mb-2">Message Level Guarantees</h4>
        <BulletList 
          items={[
            <span><strong>Outbox → topic:</strong> at-least-once</span>,
            <span><strong>Consumers:</strong> use inbox table keyed by message_id/event_id</span>,
            <span><strong>Net effect:</strong> at-least-once transport + idempotent handlers → <em>effectively exactly-once</em> from business perspective</span>
          ]}
          bulletColor="text-blue-500"
        />
      </div>

      <SectionHeader>Read Path & Projections</SectionHeader>
      
      <div className="space-y-4">
        <ConceptCard title="Balance Lookup (GET /balance)" icon={Search} variant="default">
          <BulletList 
            items={[
              "Reads from balances table (fast, indexed)",
              "If needed, can rebuild from ledger_entries for reconciliation"
            ]}
          />
        </ConceptCard>

        <ConceptCard title="Transaction History (GET /transactions)" icon={List} variant="default">
          <BulletList 
            items={[
              <span>Query <code className="bg-muted px-1 rounded">ledger_entries</code> / transactions by account_id, time range, type</span>,
              <span>Or read from a <strong>projection DB</strong> built from ledger-events topic</span>
            ]}
          />
        </ConceptCard>

        <ConceptCard title="Downstream Projections" icon={Layers} variant="amber">
          <p className="font-medium text-foreground mb-2">Other services that consume ledger-events:</p>
          <BulletList 
            items={[
              "Reporting / analytics DB",
              "Statements / invoices service",
              "Risk / monitoring stream"
            ]}
            bulletColor="text-amber-500"
          />
          <p className="mt-2 text-xs">Each consumes events, uses an <strong>inbox table</strong> to dedup, builds its own read-optimised schema.</p>
        </ConceptCard>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-sm">
          <strong>Pattern call-out:</strong> This is <strong>CQRS-ish</strong> — write model = ledger; read models = projections, 
          inbox + idempotent consumers.
        </p>
      </div>

      <SectionHeader>Sequence Numbers for Per-Account Ordering</SectionHeader>
      
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm mb-4">
          To ensure events are processed in order per account, use sequence numbers:
        </p>
        <div className="space-y-3 font-mono text-sm">
          <div className="flex items-start gap-3">
            <span className="text-green-500">✓</span>
            <span>If <code>seq_no == last_seq_no + 1</code> → apply</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-500">⊘</span>
            <span>If <code>seq_no &lt;= last_seq_no</code> → duplicate, ignore</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-500">!</span>
            <span>If <code>seq_no &gt; last_seq_no + 1</code> → gap → pause / trigger replay</span>
          </div>
        </div>
      </div>

      <SectionHeader>Quick Reference</SectionHeader>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 border-b border-border">Concern</th>
              <th className="text-left p-3 border-b border-border">Solution</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">Atomicity</td>
              <td className="p-3 text-muted-foreground">Single SQL transaction (ledger + balance + outbox)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">Event delivery</td>
              <td className="p-3 text-muted-foreground">Transactional outbox → at-least-once</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">Client retries</td>
              <td className="p-3 text-muted-foreground">Idempotency key table</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">Consumer dedup</td>
              <td className="p-3 text-muted-foreground">Inbox table keyed by event_id</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">Ordering</td>
              <td className="p-3 text-muted-foreground">Per-account sequence numbers</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">Read scalability</td>
              <td className="p-3 text-muted-foreground">Projections / CQRS pattern</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4 mt-6">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          Key Takeaways
        </h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span>The ledger is the source of truth—balances are derived/cached</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span>Use transactional outbox for reliable event publishing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span>Idempotency + inbox tables give you exactly-once semantics</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span>CQRS pattern separates write path (ledger) from read path (projections)</span>
          </li>
        </ul>
      </div>
        </div>
      ) : (
        <WalletLedgerQuiz />
      )}
    </div>
  );
};

export const WalletLedgerQuiz = () => {
  const questions = [
    {
      question: "Why is the transactional outbox pattern used in a wallet service?",
      options: [
        "To improve query performance",
        "To guarantee at-least-once event delivery without distributed transactions",
        "To store user credentials securely",
        "To compress ledger entries"
      ],
      correctIndex: 1,
      explanation: "The transactional outbox pattern writes events to an outbox table in the same transaction as the business data, then a worker publishes them. This guarantees at-least-once delivery without needing distributed transactions."
    },
    {
      question: "What should happen when a client retries a transfer with the same idempotency key?",
      options: [
        "Create a new transfer with a duplicate warning",
        "Return an error indicating duplicate request",
        "Return the stored response from the original request without creating new entries",
        "Queue the request for manual review"
      ],
      correctIndex: 2,
      explanation: "With idempotency, if the key was already seen, return the stored response. This makes retries safe and prevents duplicate transfers."
    },
    {
      question: "In the data model, why is 'balances' described as a 'materialised view'?",
      options: [
        "Because it's stored in a separate database",
        "Because it's derived/computed from ledger_entries and can be rebuilt",
        "Because it uses a different currency",
        "Because it's read-only"
      ],
      correctIndex: 1,
      explanation: "Balances are derived from ledger_entries. The ledger is the source of truth; balances are a cache/materialised view that can be recomputed if needed."
    },
    {
      question: "What operations happen in a single SQL transaction for POST /transfer?",
      options: [
        "Only insert ledger entries",
        "Insert ledger entries, update balances, and insert outbox event",
        "Update balances and send HTTP notification",
        "Insert ledger entries and publish to message queue"
      ],
      correctIndex: 1,
      explanation: "All three operations (ledger entries, balance updates, outbox event) must be in one atomic transaction. The outbox worker handles async publishing separately."
    },
    {
      question: "How do consumers achieve exactly-once processing despite at-least-once delivery?",
      options: [
        "By using TCP which guarantees exactly-once",
        "By processing messages in parallel",
        "By using an inbox table to track processed event_ids and ignoring duplicates",
        "By requesting confirmation from the sender"
      ],
      correctIndex: 2,
      explanation: "Consumers keep an inbox table keyed by event_id. If they've already processed an event, they skip it. Combined with idempotent handlers, this achieves effectively exactly-once semantics."
    },
    {
      question: "What should a consumer do if it receives seq_no = 5 but last_seq_no = 3?",
      options: [
        "Process it normally",
        "Ignore it as a duplicate",
        "Pause processing and trigger a replay (there's a gap)",
        "Update last_seq_no to 5"
      ],
      correctIndex: 2,
      explanation: "A gap (seq_no > last_seq_no + 1) means event 4 was missed. The consumer should pause and request a replay to maintain ordering guarantees."
    },
    {
      question: "What is the CQRS-ish pattern mentioned in the context of wallet services?",
      options: [
        "Command and Query Response Sync",
        "Write model (ledger) is separate from read models (projections)",
        "All reads and writes go through the same service",
        "Queries are cached for 24 hours"
      ],
      correctIndex: 1,
      explanation: "CQRS (Command Query Responsibility Segregation) separates the write model (ledger/source of truth) from read models (projections optimised for specific queries)."
    },
    {
      question: "Why should validation checks happen BEFORE the SQL transaction in POST /transfer?",
      options: [
        "To make the code cleaner",
        "To fail fast and avoid unnecessary database work if validation fails",
        "Because SQL doesn't support validation",
        "To improve read performance"
      ],
      correctIndex: 1,
      explanation: "Pre-checks (auth, limits, balance) should fail fast before starting a transaction. This avoids acquiring locks and doing work that will be rolled back."
    }
  ];

  return <Quiz questions={questions} title="Wallet/Ledger Service Quiz" />;
};
