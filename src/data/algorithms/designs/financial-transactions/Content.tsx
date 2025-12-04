import { useState } from "react";
import { Section, Paragraph } from "@/components/AlgorithmContent";
import { Quiz } from "@/components/Quiz";
import { 
  ArrowLeftRight, Server, Database, ArrowRight, Shield, RefreshCw, 
  CheckCircle, AlertTriangle, Zap, FileText, Link, Clock
} from "lucide-react";
import financialTransactionsArchitecture from "@/assets/financial-transactions-architecture.png";

const ConceptCard = ({ 
  title, 
  icon: Icon,
  children,
  variant = "default"
}: { 
  title: string; 
  icon: React.ElementType;
  children: React.ReactNode;
  variant?: "default" | "green" | "blue" | "orange" | "purple" | "red";
}) => {
  const variants = {
    default: "from-primary/10 to-primary/5 border-primary/20",
    green: "from-green-500/10 to-green-500/5 border-green-500/20",
    blue: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
    orange: "from-orange-500/10 to-orange-500/5 border-orange-500/20",
    purple: "from-purple-500/10 to-purple-500/5 border-purple-500/20",
    red: "from-red-500/10 to-red-500/5 border-red-500/20",
  };

  const iconVariants = {
    default: "text-primary",
    green: "text-green-500",
    blue: "text-blue-500",
    orange: "text-orange-500",
    purple: "text-purple-500",
    red: "text-red-500",
  };

  return (
    <div className={`rounded-xl border bg-gradient-to-br ${variants[variant]} p-5`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-background/80 ${iconVariants[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg text-foreground">{title}</h3>
      </div>
      <div className="space-y-3 text-sm text-foreground/90">
        {children}
      </div>
    </div>
  );
};

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold text-center my-8 text-foreground border-b border-border pb-4">
    {children}
  </h2>
);

const BulletList = ({ items, variant = "default" }: { items: (string | React.ReactNode)[]; variant?: "default" | "green" | "red" }) => {
  const bulletColors = {
    default: "bg-foreground/60",
    green: "bg-green-500",
    red: "bg-red-500",
  };

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${bulletColors[variant]} mt-2 flex-shrink-0`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

const FlowStep = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <div className="flex-1">
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="text-sm text-muted-foreground space-y-2">{children}</div>
    </div>
  </div>
);

const PropertyCard = ({ title, children, how }: { title: string; children: React.ReactNode; how: React.ReactNode }) => (
  <div className="rounded-lg border border-border bg-card overflow-hidden">
    <div className="bg-muted/50 px-4 py-3 border-b border-border">
      <h4 className="font-semibold flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        {title}
      </h4>
    </div>
    <div className="p-4 space-y-3">
      <div className="text-sm text-muted-foreground">{children}</div>
      <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
        <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">How it's achieved:</p>
        <div className="text-xs text-muted-foreground">{how}</div>
      </div>
    </div>
  </div>
);

type FlowTab = "architecture" | "initiate-transaction" | "get-status" | "reconciliation" | "properties" | "concepts";

export const Content = () => {
  const [activeTab, setActiveTab] = useState<"learn" | "quiz">("learn");
  const [activeFlow, setActiveFlow] = useState<FlowTab>("architecture");

  const flowTabs: { id: FlowTab; label: string }[] = [
    { id: "architecture", label: "Architecture" },
    { id: "initiate-transaction", label: "Initiate Transaction" },
    { id: "get-status", label: "Get Status" },
    { id: "reconciliation", label: "Reconciliation" },
    { id: "properties", label: "Properties" },
    { id: "concepts", label: "Concepts" },
  ];

  return (
    <div className="space-y-6">
      {/* Main Tab Navigation */}
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
          <Section>
            <Paragraph>
              Design a system to receive and process financial transactions so that <strong>no transaction is missed 
              and duplicates are not double-counted</strong>. We expose a simple API: <code className="bg-muted px-1 rounded text-sm">POST /transactions</code> with 
              an Idempotency-Key and <code className="bg-muted px-1 rounded text-sm">GET /transactions/{"{id}"}</code>.
            </Paragraph>
          </Section>

          {/* Flow Tab Navigation */}
          <div className="flex flex-wrap gap-2 p-2 bg-muted/50 rounded-lg border border-border">
            {flowTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFlow(tab.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeFlow === tab.id 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-background"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Architecture Tab */}
          {activeFlow === "architecture" && (
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="font-semibold mb-3 text-center">System Architecture</h4>
                <img 
                  src={financialTransactionsArchitecture} 
                  alt="Financial Transactions Architecture" 
                  className="w-full rounded-lg border border-border bg-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <ConceptCard title="API Gateway" icon={Shield} variant="blue">
                  <BulletList items={[
                    "Terminates TLS and handles rate limiting",
                    "Validates JWTs / auth",
                    <>Routes: <code className="bg-muted px-1 rounded text-xs">/transactions</code> → Transaction Service</>
                  ]} />
                </ConceptCard>

                <ConceptCard title="Transaction Service" icon={ArrowLeftRight} variant="green">
                  <BulletList items={[
                    <>Exposes <code className="bg-muted px-1 rounded text-xs">POST /transactions</code> and <code className="bg-muted px-1 rounded text-xs">GET /transactions/{"{id}"}</code></>,
                    "Enforces client idempotency via transaction_idempotency_keys",
                    "Owns Transaction state machine (RECEIVED → VALIDATED → CONFIRMED → POSTED)",
                    "Integrates with Bank/Scheme/Partner via external APIs",
                    "Handles external notifications via inbox pattern"
                  ]} />
                </ConceptCard>

                <ConceptCard title="Outbox Worker" icon={RefreshCw} variant="orange">
                  <BulletList items={[
                    "Polls outbox_events where status = PENDING",
                    "Publishes events (TransactionPosted, TransactionReversed) to broker",
                    "Marks outbox_events.status = SENT",
                    "Safe to retry – outbox rows are durable"
                  ]} />
                </ConceptCard>

                <ConceptCard title="Ledger Service" icon={FileText} variant="purple">
                  <BulletList items={[
                    "Subscribes to transaction events from broker",
                    "Inserts into ledger_events (inbox) keyed by event_id",
                    "Writes append-only ledger_entries (debits/credits)",
                    "Source of truth for account balances & financial state"
                  ]} />
                </ConceptCard>

                <ConceptCard title="External System" icon={Server} variant="red">
                  <BulletList items={[
                    "Generic upstream: bank, scheme, ACH gateway, partner platform",
                    "Provides APIs to initiate/approve/cancel transactions",
                    "Sends async notifications (webhooks/messages/files)",
                    "Produces settlement/statement reports for reconciliation"
                  ]} />
                </ConceptCard>

                <ConceptCard title="Reconciliation Job" icon={Clock} variant="default">
                  <BulletList items={[
                    "Runs on schedule (e.g. nightly)",
                    "Pulls external system settlement reports",
                    "Compares external vs transactions state & ledger_entries",
                    "Creates corrections or flags discrepancies"
                  ]} />
                </ConceptCard>
              </div>
            </div>
          )}

          {/* Initiate Transaction Flow Tab */}
          {activeFlow === "initiate-transaction" && (
            <div className="space-y-6">
              <SectionHeader>Flow 1: Receive & Initiate Transaction</SectionHeader>
              
              <div className="rounded-lg border border-border bg-card p-4 mb-6">
                <img 
                  src={financialTransactionsArchitecture} 
                  alt="Financial Transactions Architecture" 
                  className="w-full rounded-lg border border-border bg-white"
                />
              </div>

              <div className="space-y-6">
                <FlowStep number={1} title="Client sends POST /transactions">
                  <BulletList items={[
                    "Includes Idempotency-Key header",
                    "Body: amount, currency, counterparty, etc."
                  ]} />
                </FlowStep>

                <FlowStep number={2} title="Transaction Service handles idempotency">
                  <BulletList items={[
                    "Looks up (tenant_id, Idempotency-Key) in transaction_idempotency_keys",
                    "If exists → return existing transaction",
                    "If not → start DB transaction"
                  ]} />
                  <div className="mt-2 bg-muted/50 rounded p-3 text-xs">
                    <p className="font-semibold mb-1">Within transaction:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Create transactions row: state = RECEIVED</li>
                      <li>Insert transaction_idempotency_keys row</li>
                      <li>Commit</li>
                    </ol>
                  </div>
                </FlowStep>

                <FlowStep number={3} title="Transaction Service calls External System">
                  <BulletList items={[
                    "Sends amount, parties, etc.",
                    "Sends external idempotency key (for retry safety)",
                    "External System responds with external_transaction_id and status"
                  ]} />
                </FlowStep>

                <FlowStep number={4} title="Update transaction state">
                  <BulletList items={[
                    "Update transactions: external_transaction_id = ..., state = VALIDATED / PENDING_EXTERNAL",
                    "Return response to client with transaction_id + status"
                  ]} />
                </FlowStep>
              </div>

              <SectionHeader>Flow 2: External Notifications</SectionHeader>

              <div className="space-y-6">
                <FlowStep number={5} title="External System sends notification">
                  <p>External System notifies that transaction is now CONFIRMED or SETTLED.</p>
                </FlowStep>

                <FlowStep number={6} title="Transaction Service notification handler">
                  <div className="bg-muted/50 rounded p-3 text-xs space-y-2">
                    <p className="font-semibold">Handler logic:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Validate signature/auth if webhook</li>
                      <li>Start DB tx</li>
                      <li>Insert into external_events with external_event_id</li>
                      <li>If duplicate → already processed → exit</li>
                      <li>Load transaction by external_transaction_id</li>
                      <li>Apply allowed state transition (e.g. PENDING_EXTERNAL → POSTED)</li>
                    </ol>
                  </div>
                </FlowStep>

                <FlowStep number={7} title="Write outbox event if final state">
                  <div className="bg-muted/50 rounded p-3 text-xs space-y-2">
                    <p className="font-semibold">If state becomes POSTED / REVERSED:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li className="font-semibold text-green-600 dark:text-green-400">In same DB tx: Insert outbox_events row</li>
                      <li>Commit</li>
                    </ol>
                  </div>
                  <div className="mt-2 bg-green-500/10 border border-green-500/20 rounded p-3 text-xs">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Outbox event payload:</p>
                    <code>event_type = TransactionPosted, aggregate_id = transaction_id, payload = {"{"}transaction_id, amount, currency, counterparty{"}"}</code>
                  </div>
                </FlowStep>
              </div>

              <SectionHeader>Flow 3: Outbox → Broker → Ledger</SectionHeader>

              <div className="space-y-6">
                <FlowStep number={8} title="Outbox worker polls">
                  <BulletList items={[
                    "Polls outbox_events WHERE status = PENDING",
                    "Publishes TransactionPosted to Broker",
                    "Marks outbox_events.status = SENT"
                  ]} />
                </FlowStep>

                <FlowStep number={9} title="Ledger Service consumes">
                  <div className="bg-muted/50 rounded p-3 text-xs space-y-2">
                    <p className="font-semibold">Consumer logic (in DB transaction):</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Receives TransactionPosted with event_id</li>
                      <li>Insert ledger_events row (event_id, event_type = TransactionPosted, status = RECEIVED)</li>
                      <li>If event_id conflict → already processed → exit</li>
                      <li>Insert ledger_entries debits/credits for affected accounts</li>
                      <li>Update ledger_events.status = PROCESSED</li>
                      <li>Commit</li>
                    </ol>
                  </div>
                </FlowStep>
              </div>
            </div>
          )}

          {/* Get Status Tab */}
          {activeFlow === "get-status" && (
            <div className="space-y-6">
              <SectionHeader>Get Transaction Status</SectionHeader>
              <div className="rounded-lg border border-border bg-card p-4">
                <BulletList items={[
                  <>Client calls <code className="bg-muted px-1 rounded text-xs">GET /transactions/{"{id}"}</code></>,
                  "API Gateway → Transaction Service",
                  "Transaction Service reads from transactions table: state, amounts, external refs, timestamps",
                  "Returns current status (and maybe last error, last external update)",
                  <><strong>Note:</strong> Status comes from Transaction Service; ledger shows money movements</>
                ]} />
              </div>

              <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Why not hit the Ledger?</h4>
                <p className="text-sm text-muted-foreground">
                  Transaction status (RECEIVED, VALIDATED, POSTED) lives with the transaction aggregate in Transaction DB. 
                  Ledger is for financial facts (balances, money movement). They serve different purposes.
                </p>
              </div>
            </div>
          )}

          {/* Reconciliation Tab */}
          {activeFlow === "reconciliation" && (
            <div className="space-y-6">
              <SectionHeader>External Reconciliation (External System vs Us)</SectionHeader>

              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="font-semibold mb-3">Process</h4>
                  <BulletList items={[
                    "Recon job fetches day-D report from External System (bank, scheme, clearing house)",
                    "For each external record, try to match against transactions/ledger_entries",
                    "Match by external ID or (amount + date + counterparty)"
                  ]} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">MATCHED</h4>
                    <p className="text-sm text-muted-foreground">Record exists in both external report and our ledger with matching amounts</p>
                  </div>
                  <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
                    <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">ONLY_EXTERNAL</h4>
                    <p className="text-sm text-muted-foreground">In external report, not in our ledger</p>
                  </div>
                  <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">ONLY_INTERNAL</h4>
                    <p className="text-sm text-muted-foreground">We booked it, but it's not in external report</p>
                  </div>
                  <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">MISMATCH</h4>
                    <p className="text-sm text-muted-foreground">Present in both, but amounts/status differ</p>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="font-semibold mb-2">Resolution</h4>
                  <p className="text-sm text-muted-foreground">
                    For ONLY_EXTERNAL / MISMATCH → Write compensating ledger entries or flag for manual investigation
                  </p>
                </div>
              </div>

              <SectionHeader>Internal Reconciliation (Balances vs Ledger)</SectionHeader>

              <div className="rounded-lg border border-border bg-card p-4">
                <BulletList items={[
                  "Periodically recompute balances from ledger_entries for subset/all accounts",
                  "Compare with any materialised balances view",
                  "If differences → fix projections / investigate bugs"
                ]} />
              </div>
            </div>
          )}

          {/* Properties Tab */}
          {activeFlow === "properties" && (
            <div className="space-y-6">
              <SectionHeader>System Properties & Guarantees</SectionHeader>

              <div className="grid gap-4">
                <PropertyCard 
                  title="1. Clients can safely retry POST /transactions"
                  how={
                    <BulletList items={[
                      <>Table: <code className="bg-muted px-1 rounded">transaction_idempotency_keys</code></>,
                      "Key: (tenant_id, idempotency_key) PK → transaction_id",
                      "On conflict → load existing row, return stored response"
                    ]} />
                  }
                >
                  <p>Idempotency ensures repeated requests don't create duplicate transactions</p>
                </PropertyCard>

                <PropertyCard 
                  title="2. External system can send notifications at-least-once, delayed, out of order"
                  how={
                    <BulletList items={[
                      <>Table: <code className="bg-muted px-1 rounded">external_events</code> with external_event_id UNIQUE</>,
                      "On INSERT conflict → event already processed → ack & exit",
                      "State machine guarantees only valid forward transitions"
                    ]} />
                  }
                >
                  <p>Notification handler is idempotent and handles out-of-order delivery safely</p>
                </PropertyCard>

                <PropertyCard 
                  title="3. Transaction Service can retry external calls without double-executing"
                  how={
                    <BulletList items={[
                      "Generate external idempotency key per logical operation",
                      <>e.g. <code className="bg-muted px-1 rounded">ext_idem = hash(transaction_id + operation + attempt_group)</code></>,
                      "On retry, re-use same key → external system dedupes"
                    ]} />
                  }
                >
                  <p>External-side idempotency prevents duplicate operations at bank/scheme/partner</p>
                </PropertyCard>

                <PropertyCard 
                  title="4. Eventual consistency between Transactions & Ledger"
                  how={
                    <BulletList items={[
                      "Outbox pattern: Write event atomically with state update",
                      "Worker publishes to broker, marks SENT",
                      "Ledger consumes asynchronously",
                      "Transactions commit first; ledger catches up via events"
                    ]} />
                  }
                >
                  <p>Read transaction status from Transaction DB; read financial state from Ledger</p>
                </PropertyCard>

                <PropertyCard 
                  title="5. External system owns actual money movement & account data"
                  how={
                    <BulletList items={[
                      "External system (bank/scheme/partner) executes real money movement",
                      "You receive confirmations, not raw account access",
                      "External settlement reports are source of truth",
                      "Recon job compares reports vs your DB"
                    ]} />
                  }
                >
                  <p>Final say on what actually settled comes from external system, not your DB.</p>
                </PropertyCard>

                <PropertyCard 
                  title="6. Each posted transaction is booked once in ledger"
                  how={
                    <BulletList items={[
                      "outbox_events row written atomically with transactions.state = POSTED",
                      <>Ledger: <code className="bg-muted px-1 rounded">ledger_events(event_id PK)</code> - event_id from outbox</>,
                      "On PK conflict → event already processed → ignore"
                    ]} />
                  }
                >
                  <p>No matter how many retries, each TransactionPosted leads to one set of ledger rows</p>
                </PropertyCard>

                <PropertyCard 
                  title="7. Never missed, never double-counted"
                  how={
                    <BulletList items={[
                      "Durable inbox/outbox tables",
                      "Unique keys (idempotency_key, external_event_id, event_id)",
                      "At-least-once delivery with idempotent handlers",
                      "Reconciliation catches anything that slips through"
                    ]} />
                  }
                >
                  <p>Combination of patterns ensures complete, accurate financial records</p>
                </PropertyCard>
              </div>
            </div>
          )}

          {/* Concepts Tab */}
          {activeFlow === "concepts" && (
            <div className="space-y-6">
              <SectionHeader>Relevant Concepts</SectionHeader>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    ACID Transactions
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">Used when:</p>
                  <BulletList items={[
                    "Creating transaction + idempotency row",
                    "Processing notification + updating state + writing outbox event"
                  ]} />
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Key: Atomicity is what lets inbox/outbox be correct
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    Isolation / Lost Updates
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Why you have <code className="bg-muted px-1 rounded text-xs">version</code> on transactions
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pattern: Optimistic locking → <code className="bg-muted px-1 rounded">UPDATE WHERE id = X AND version = N</code>
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-blue-500" />
                    Delivery Guarantees
                  </h4>
                  <BulletList items={[
                    <><strong>Transport</strong> (webhooks, broker) = at-least-once</>,
                    <><strong>Client API</strong> = logically at-most-once via idempotency keys</>,
                    <><strong>Ledger booking</strong> = effectively exactly-once via outbox + inbox + PKs</>
                  ]} />
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Link className="w-4 h-4 text-purple-500" />
                    Eventual Consistency
                  </h4>
                  <BulletList items={[
                    "Boundary: Transaction DB ↔ Ledger DB",
                    "Transactions commit first; ledger catches up via events",
                    "Read transaction status from Transaction DB; read money state from Ledger"
                  ]} />
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-500" />
                    Double-Entry & Derived Balances
                  </h4>
                  <BulletList items={[
                    "Ledger is double-entry, append-only",
                    "Balances are derived (SUM over entries), not stored"
                  ]} />
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-500" />
                    Idempotency vs Dedupe
                  </h4>
                  <BulletList items={[
                    "Idempotency keys for client API and external calls",
                    "Dedupe via external_event_id and event_id PKs (notifications & ledger)"
                  ]} />
                </div>

                <div className="rounded-lg border border-border bg-card p-4 md:col-span-2">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    CAP / Availability
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    If ledger or broker is down: Transaction state still moves to POSTED (availability preserved). 
                    Ledger catches up later (eventual consistency + recon).
                  </p>
                </div>
              </div>

              <SectionHeader>Bonus Topics (If Asked)</SectionHeader>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">Observability</h4>
                  <BulletList items={[
                    <>Metrics: <code className="text-xs">transaction_created</code>, <code className="text-xs">transaction_posted</code>, <code className="text-xs">transaction_failed</code></>,
                    "Notification success/fail rate",
                    "Outbox backlog size",
                    "Ledger lag (events pending)",
                    "Logs with transaction_id, external_transaction_id, event_id",
                    "Tracing a single transaction end-to-end"
                  ]} />
                </div>

                <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">Risk / Limits</h4>
                  <p className="text-sm text-muted-foreground mb-2">Before creating a transaction:</p>
                  <BulletList items={[
                    "Basic risk checks",
                    "Per-day/per-account limits",
                    "Velocity checks",
                    "Blocklisted counterparties"
                  ]} />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <FinancialTransactionsQuiz />
      )}
    </div>
  );
};

export const quizQuestions = [
  {
    question: "What is the purpose of the Idempotency-Key header in POST /transactions?",
    options: [
      "To encrypt the transaction data",
      "To ensure duplicate requests don't create multiple transactions",
      "To authenticate the tenant",
      "To specify the transaction currency"
    ],
    correctIndex: 1,
    explanation: "The Idempotency-Key ensures that if a client retries a request (e.g., due to timeout), the same transaction is returned rather than creating a duplicate."
  },
  {
    question: "Why is the outbox event written in the same transaction as the state update?",
    options: [
      "To improve performance",
      "To reduce database connections",
      "To ensure atomicity - either both happen or neither",
      "To encrypt the event payload"
    ],
    correctIndex: 2,
    explanation: "Writing both atomically ensures that if the transaction is marked POSTED, the event is guaranteed to be published. If the DB transaction fails, neither change persists."
  },
  {
    question: "How does the ledger service achieve exactly-once processing of transaction events?",
    options: [
      "By using TCP connections",
      "By keeping events in memory",
      "By using event_id as a primary key and checking for conflicts",
      "By processing events synchronously"
    ],
    correctIndex: 2,
    explanation: "The ledger_events table uses event_id as PK. If the same event arrives twice, the second INSERT fails with a conflict, and the event is skipped."
  },
  {
    question: "What is the 'source of truth' for whether a transaction actually settled?",
    options: [
      "The API Gateway",
      "The Transaction Service database",
      "The External System (bank/scheme/partner)",
      "The Ledger Service"
    ],
    correctIndex: 2,
    explanation: "The external system (bank, scheme, partner) actually executes the money movement. Their settlement reports are the authoritative source for what really happened."
  },
  {
    question: "What happens if the notification handler receives the same external event twice?",
    options: [
      "It processes it again, creating duplicate entries",
      "It throws an error and alerts ops",
      "It ignores the duplicate via external_event_id uniqueness check",
      "It queues it for later processing"
    ],
    correctIndex: 2,
    explanation: "The external_events table has external_event_id as UNIQUE. Duplicate inserts conflict and are ignored, making the handler idempotent."
  },
  {
    question: "Why are balances derived by summing ledger entries rather than stored in a mutable field?",
    options: [
      "To save storage space",
      "To ensure full auditability and prevent lost history",
      "To improve query performance",
      "To reduce database complexity"
    ],
    correctIndex: 1,
    explanation: "Append-only entries create a complete audit trail. Derived balances can be recalculated from entries, and you can trace exactly how any balance was reached."
  },
  {
    question: "What is the purpose of the reconciliation job?",
    options: [
      "To speed up transaction processing",
      "To compare external settlements with internal records and find discrepancies",
      "To send notifications to counterparties",
      "To rotate encryption keys"
    ],
    correctIndex: 1,
    explanation: "Recon compares external settlement reports against transactions and ledger entries, identifying mismatches that need investigation or correction."
  },
  {
    question: "How does the Transaction Service handle external API retries without duplicating operations?",
    options: [
      "By waiting for external confirmation before each retry",
      "By sending a unique external idempotency key with each request",
      "By limiting retries to one attempt",
      "By storing all external responses locally"
    ],
    correctIndex: 1,
    explanation: "The Transaction Service generates an external idempotency key (e.g., hash of transaction_id + operation). On retry with the same key, the external system dedupes and doesn't execute twice."
  },
  {
    question: "In the eventual consistency model, which database is the source of truth for transaction status?",
    options: [
      "Ledger DB",
      "Transaction DB",
      "Both equally",
      "The message broker"
    ],
    correctIndex: 1,
    explanation: "Transaction status (RECEIVED, VALIDATED, POSTED) is read from Transaction DB. Ledger DB is the source of truth for financial facts (balances, money movement)."
  },
  {
    question: "What classification does a reconciliation job assign when a record exists in the external report but not in your ledger?",
    options: [
      "MATCHED",
      "ONLY_EXTERNAL",
      "ONLY_INTERNAL",
      "MISMATCH"
    ],
    correctIndex: 1,
    explanation: "ONLY_EXTERNAL means the external system reports a transaction that we don't have in our ledger - possibly a missed notification or unprocessed event."
  },
  {
    question: "What does 'never missed, never double-counted' refer to?",
    options: [
      "A marketing slogan for the API",
      "The combined guarantee from idempotency, inbox/outbox, and reconciliation",
      "A database constraint type",
      "A logging format"
    ],
    correctIndex: 1,
    explanation: "This phrase captures the goal achieved by combining durable inbox/outbox tables, unique keys for deduplication, at-least-once delivery with idempotent handlers, and reconciliation as a safety net."
  },
  {
    question: "What happens to the ledger if the message broker is temporarily down?",
    options: [
      "Transactions fail immediately",
      "Transactions still complete; ledger catches up when broker recovers",
      "The system switches to synchronous mode",
      "All pending events are lost"
    ],
    correctIndex: 1,
    explanation: "Due to the outbox pattern, transaction state updates are committed to the Transaction DB first. The outbox worker will publish events once the broker recovers, and the ledger will catch up (eventual consistency)."
  }
];

export const FinancialTransactionsQuiz = () => {
  return (
    <Quiz 
      title="Financial Transactions System Quiz"
      questions={quizQuestions}
    />
  );
};
