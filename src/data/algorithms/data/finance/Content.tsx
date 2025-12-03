import { Section, Paragraph } from "@/components/AlgorithmContent";
import { Quiz } from "@/components/Quiz";
import { BookOpen, Database, Layers, Shield, AlertTriangle, RefreshCw, Clock, Zap } from "lucide-react";

const ConceptCard = ({ 
  title, 
  icon: Icon,
  children,
  variant = "default"
}: { 
  title: string; 
  icon: React.ElementType;
  children: React.ReactNode;
  variant?: "default" | "green" | "blue" | "orange" | "red";
}) => {
  const variants = {
    default: "from-primary/10 to-primary/5 border-primary/20",
    green: "from-green-500/10 to-green-500/5 border-green-500/20",
    blue: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
    orange: "from-orange-500/10 to-orange-500/5 border-orange-500/20",
    red: "from-red-500/10 to-red-500/5 border-red-500/20",
  };

  const iconVariants = {
    default: "text-primary",
    green: "text-green-500",
    blue: "text-blue-500",
    orange: "text-orange-500",
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

const TwoColumnGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid md:grid-cols-2 gap-4 my-6">
    {children}
  </div>
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

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold text-center my-8 text-foreground border-b border-border pb-4">
    {children}
  </h2>
);

export const Content = () => {
  return (
    <div className="space-y-8">
      <Section>
        <Paragraph>
          Financial systems have unique requirements around auditability, correctness, and reliability. 
          These patterns are essential for building systems that handle money safely.
        </Paragraph>
      </Section>

      <SectionHeader>Data Integrity Patterns</SectionHeader>

      <TwoColumnGrid>
        <ConceptCard title="Double Entry Ledger" icon={BookOpen} variant="green">
          <BulletList items={[
            <><strong>Every movement of value is recorded as two entries:</strong> debit & credit</>,
            "The sum of all debits and credits should always balance",
            "Avoids \"money disappears\" or \"money created\" bugs",
            <><strong className="text-green-600 dark:text-green-400">Good for audit</strong> - complete paper trail</>
          ]} />
        </ConceptCard>

        <ConceptCard title="Append Only & Materialised Views" icon={Database} variant="blue">
          <BulletList items={[
            <><strong className="text-red-600 dark:text-red-400">NEVER</strong> update balances in place. Instead <strong>append entries</strong> (credits/debits)</>,
            "Full history is stored",
            <><strong className="text-blue-600 dark:text-blue-400">Materialised views</strong> are precomputed tables or caches built from the ledger</>,
            "They can be recomputed or repaired from the log"
          ]} />
        </ConceptCard>
      </TwoColumnGrid>

      <ConceptCard title="Event Sourcing and CQRS" icon={Layers} variant="orange">
        <BulletList items={[
          <><strong>Current state</strong> (balance, position) is computed by replaying events or via views</>,
          <><strong>The write model</strong> can be optimised for appending events</>,
          <><strong>The read model</strong> is optimised for queries (denormalised, caches, indexes)</>,
          "Can also build multiple read models for different use cases"
        ]} />
      </ConceptCard>

      <SectionHeader>Per-account Ordering</SectionHeader>

      <div className="rounded-xl border border-border bg-card p-6">
        <Paragraph>
          For account correctness, operations on the same account must be applied <strong>in order</strong>.
        </Paragraph>
        
        <div className="space-y-4 mt-4">
          <div className="pl-4 border-l-2 border-primary/30">
            <h4 className="font-semibold mb-2">Per-key partitioning</h4>
            <BulletList items={[
              <>Partition topics/queues by <code className="bg-muted px-1.5 py-0.5 rounded text-xs">account_id</code> or <code className="bg-muted px-1.5 py-0.5 rounded text-xs">position_id</code></>,
              "All events for one key are delivered in order to a single consumer"
            ]} />
          </div>

          <div className="pl-4 border-l-2 border-primary/30">
            <h4 className="font-semibold mb-2">Sequence numbers</h4>
            <BulletList items={[
              <>Each event carries a <code className="bg-muted px-1.5 py-0.5 rounded text-xs">seq_no</code> that increments per account</>,
              <>Consumers can detect <strong>gaps</strong> (missing events) and <strong>out-of-order</strong> deliveries</>
            ]} />
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mt-4">
            <p className="text-sm">
              <strong className="text-green-600 dark:text-green-400">Result:</strong> High concurrency (different accounts in parallel) while preserving correctness per account.
            </p>
          </div>
        </div>
      </div>

      <SectionHeader>Resilience & Reliability</SectionHeader>

      <TwoColumnGrid>
        <ConceptCard title="Limited Retries, Backoff & Jitter" icon={RefreshCw} variant="blue">
          <BulletList items={[
            <><strong>Transient failures</strong> e.g. 503s often succeed on retry</>,
            <>Always make operations <strong>idempotent</strong> before adding retries</>,
            <><strong>Use backoff (increasing)</strong> to avoid hammering a struggling dependency</>,
            <>Add <strong>jitter</strong> to backoff times to avoid all clients retrying in sync</>
          ]} />
        </ConceptCard>

        <ConceptCard title="Circuit Breakers" icon={Zap} variant="orange">
          <BulletList items={[
            "Monitor calls to a dependency",
            "If error rate or latency is too high, the breaker opens",
            "Short-circuits further calls, fails fast instead of waiting/timeouts",
            "After a cool-down, try a few test calls",
            "Gives dependencies time to recover"
          ]} />
        </ConceptCard>

        <ConceptCard title="Rate Limiting & Bulkhead" icon={Shield} variant="green">
          <div className="space-y-3">
            <p><strong>Rate Limiting:</strong> Protect services from overload</p>
            <p><strong>Bulkheads:</strong> Isolate critical resources so one noisy component doesn't sink everything</p>
            <div className="bg-background/50 rounded p-2 text-xs">
              <p className="font-medium mb-1">Examples:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Separate thread pools (goroutine worker pools)</li>
                <li>Separate connection pools (HTTP clients, SQL client)</li>
                <li>Separate queues (buffered channels) per workload</li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground italic">Goal: a spike in one area does not affect others</p>
          </div>
        </ConceptCard>

        <ConceptCard title="Dead Letter Queue (DLQ)" icon={AlertTriangle} variant="red">
          <BulletList items={[
            <><strong>Poison Messages</strong> are messages that always fail</>,
            "After N failed attempts, move the message to a DLQ instead",
            "Operators can inspect, fix data, or re-enqueue after deploying a fix",
            <><strong className="text-green-600 dark:text-green-400">This ensures no mystery loss of failed payments</strong></>
          ]} />
        </ConceptCard>
      </TwoColumnGrid>

      <ConceptCard title="Double Clicking / Duplicate Submissions" icon={Clock} variant="default">
        <p className="mb-3">Prevent users or systems from accidentally submitting the same operation twice:</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-background/50 rounded-lg p-3">
            <h5 className="font-semibold text-sm mb-2">UI Layer</h5>
            <p className="text-xs text-muted-foreground">Disable button & show spinner on click</p>
          </div>
          <div className="bg-background/50 rounded-lg p-3">
            <h5 className="font-semibold text-sm mb-2">Database Layer</h5>
            <p className="text-xs text-muted-foreground">Unique constraints on idempotency key (userID/invoiceID)</p>
          </div>
          <div className="bg-background/50 rounded-lg p-3">
            <h5 className="font-semibold text-sm mb-2">Backend Layer</h5>
            <p className="text-xs text-muted-foreground">Treat duplicate as same operation again (idempotent)</p>
          </div>
          <div className="bg-background/50 rounded-lg p-3">
            <h5 className="font-semibold text-sm mb-2">Payment Providers</h5>
            <p className="text-xs text-muted-foreground">Use idempotency feature (e.g. Stripe idempotency keys)</p>
          </div>
        </div>
      </ConceptCard>

      <SectionHeader>Quick Reference</SectionHeader>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-semibold">Pattern</th>
              <th className="text-left p-3 font-semibold">Purpose</th>
              <th className="text-left p-3 font-semibold">Key Benefit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Double Entry</td>
              <td className="p-3 text-muted-foreground">Track all value movement</td>
              <td className="p-3 text-green-600 dark:text-green-400">Audit trail</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Append Only</td>
              <td className="p-3 text-muted-foreground">Never mutate, only add</td>
              <td className="p-3 text-green-600 dark:text-green-400">Replayable history</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Event Sourcing</td>
              <td className="p-3 text-muted-foreground">State from events</td>
              <td className="p-3 text-green-600 dark:text-green-400">Flexible read models</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Per-key Ordering</td>
              <td className="p-3 text-muted-foreground">Preserve account order</td>
              <td className="p-3 text-green-600 dark:text-green-400">Correctness + concurrency</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Circuit Breaker</td>
              <td className="p-3 text-muted-foreground">Fail fast on dependency issues</td>
              <td className="p-3 text-green-600 dark:text-green-400">System stability</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">DLQ</td>
              <td className="p-3 text-muted-foreground">Capture poison messages</td>
              <td className="p-3 text-green-600 dark:text-green-400">No lost transactions</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const FinanceQuiz = () => {
  const questions = [
    {
      question: "In a double entry ledger, what must always be true?",
      options: [
        "Debits must be larger than credits",
        "The sum of debits equals the sum of credits",
        "Only one entry per transaction",
        "Credits are recorded first"
      ],
      correctIndex: 1,
      explanation: "Double entry ensures every value movement has a debit and credit that balance out."
    },
    {
      question: "Why should you NEVER update balances in place in financial systems?",
      options: [
        "It's slower than appending",
        "You lose the audit trail and can't replay history",
        "Databases don't support updates",
        "It uses more storage"
      ],
      correctIndex: 1,
      explanation: "Append-only preserves full history, enabling audit trails and the ability to recompute state from events."
    },
    {
      question: "What is the purpose of partitioning by account_id in message queues?",
      options: [
        "To reduce storage costs",
        "To ensure operations on the same account are processed in order",
        "To allow faster reads",
        "To enable cross-account transactions"
      ],
      correctIndex: 1,
      explanation: "Per-key partitioning ensures all events for one account go to the same consumer, preserving order."
    },
    {
      question: "What is 'jitter' in the context of retries?",
      options: [
        "A type of network error",
        "Random variation added to backoff times to prevent thundering herd",
        "A circuit breaker state",
        "A rate limiting algorithm"
      ],
      correctIndex: 1,
      explanation: "Jitter adds randomness to retry delays so all clients don't retry at exactly the same time."
    },
    {
      question: "When does a circuit breaker 'open'?",
      options: [
        "When all requests succeed",
        "When error rate or latency exceeds a threshold",
        "When the service starts",
        "When the DLQ is full"
      ],
      correctIndex: 1,
      explanation: "The circuit breaker opens when it detects too many failures, then fails fast to protect the system."
    },
    {
      question: "What happens to a message after N failed processing attempts?",
      options: [
        "It's deleted permanently",
        "It's retried forever",
        "It's moved to a Dead Letter Queue (DLQ)",
        "It's sent back to the producer"
      ],
      correctIndex: 2,
      explanation: "DLQs capture poison messages for manual inspection, ensuring no transactions are silently lost."
    },
    {
      question: "What is a 'bulkhead' pattern?",
      options: [
        "A type of database index",
        "Isolating resources so failures in one area don't affect others",
        "A caching strategy",
        "A message serialization format"
      ],
      correctIndex: 1,
      explanation: "Bulkheads (like on ships) isolate components so a problem in one doesn't sink the whole system."
    },
    {
      question: "How do you prevent duplicate payment submissions at the database level?",
      options: [
        "Use a faster database",
        "Add a unique constraint on an idempotency key",
        "Disable the submit button",
        "Use a smaller timeout"
      ],
      correctIndex: 1,
      explanation: "A unique constraint on idempotency key (e.g., userID + invoiceID) prevents duplicates at the DB level."
    }
  ];

  return <Quiz questions={questions} />;
};
