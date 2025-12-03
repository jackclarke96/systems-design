import { Section, Paragraph } from "@/components/AlgorithmContent";
import { Quiz } from "@/components/Quiz";
import { RefreshCw, AlertTriangle, Inbox, CheckCircle, XCircle, Clock, Shuffle } from "lucide-react";

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

export const Content = () => {
  return (
    <div className="space-y-8">
      <Section>
        <Paragraph>
          Transient failures are inevitable in distributed systems. Retries with proper backoff handle temporary issues, 
          while Dead Letter Queues (DLQs) capture messages that repeatedly fail, ensuring nothing is silently lost.
        </Paragraph>
      </Section>

      <SectionHeader>Retry Strategies</SectionHeader>

      <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-orange-500" />
          <h3 className="font-bold text-lg">Before Adding Retries: Make It Idempotent!</h3>
        </div>
        <Paragraph>
          An operation is <strong>idempotent</strong> if doing it multiple times has the same effect as doing it once. 
          Without idempotency, retries can cause duplicate charges, double bookings, or corrupted data.
        </Paragraph>
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <div className="bg-background/50 rounded p-3">
            <p className="font-semibold text-green-600 dark:text-green-400 text-sm mb-1">Idempotent ✓</p>
            <p className="text-xs text-muted-foreground">SET balance = 100</p>
            <p className="text-xs text-muted-foreground">DELETE WHERE id = X</p>
            <p className="text-xs text-muted-foreground">PUT /users/123 {`{name: "John"}`}</p>
          </div>
          <div className="bg-background/50 rounded p-3">
            <p className="font-semibold text-red-600 dark:text-red-400 text-sm mb-1">Not Idempotent ✗</p>
            <p className="text-xs text-muted-foreground">balance = balance + 100</p>
            <p className="text-xs text-muted-foreground">INSERT INTO orders...</p>
            <p className="text-xs text-muted-foreground">POST /payments (without idempotency key)</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <ConceptCard title="Exponential Backoff" icon={Clock} variant="blue">
          <BulletList items={[
            "Wait longer between each retry",
            "1s → 2s → 4s → 8s → ...",
            "Gives failing service time to recover",
            "Prevents hammering struggling dependencies"
          ]} />
        </ConceptCard>

        <ConceptCard title="Jitter" icon={Shuffle} variant="green">
          <BulletList items={[
            "Add randomness to retry delays",
            "Prevents thundering herd",
            "Without jitter: all clients retry at same time",
            "Full jitter: random between 0 and backoff"
          ]} />
        </ConceptCard>

        <ConceptCard title="Max Retries" icon={RefreshCw} variant="orange">
          <BulletList items={[
            "Limit total retry attempts",
            "Typically 3-5 retries",
            "After max: fail or send to DLQ",
            "Prevents infinite retry loops"
          ]} />
        </ConceptCard>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 mt-6">
        <h4 className="font-semibold mb-3">When to Retry</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Retry These (Transient)</p>
            <BulletList items={[
              "503 Service Unavailable",
              "429 Too Many Requests",
              "Connection timeouts",
              "Network errors"
            ]} />
          </div>
          <div>
            <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Don't Retry (Permanent)</p>
            <BulletList items={[
              "400 Bad Request",
              "401/403 Authentication errors",
              "404 Not Found",
              "Validation errors"
            ]} />
          </div>
        </div>
      </div>

      <SectionHeader>Dead Letter Queues (DLQ)</SectionHeader>

      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Inbox className="w-6 h-6 text-red-500" />
          <h3 className="font-bold text-lg">Poison Messages</h3>
        </div>
        <Paragraph>
          Some messages will <strong>always fail</strong> — malformed data, bug in processing code, 
          invalid state. These "poison messages" would block the queue forever if retried indefinitely.
        </Paragraph>
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">1</div>
          <div>
            <h4 className="font-semibold mb-1">Message Processing Fails</h4>
            <p className="text-sm text-muted-foreground">Consumer attempts to process message, encounters an error.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">2</div>
          <div>
            <h4 className="font-semibold mb-1">Retry with Backoff</h4>
            <p className="text-sm text-muted-foreground">Message is retried N times with exponential backoff.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">3</div>
          <div>
            <h4 className="font-semibold mb-1">Move to DLQ</h4>
            <p className="text-sm text-muted-foreground">After max retries exhausted, message moves to Dead Letter Queue.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">4</div>
          <div>
            <h4 className="font-semibold mb-1">Inspect & Remediate</h4>
            <p className="text-sm text-muted-foreground">Operators inspect failed messages, fix data or deploy bug fix, then replay.</p>
          </div>
        </div>
      </div>

      <SectionHeader>DLQ Benefits</SectionHeader>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
          <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Why Use DLQs
          </h4>
          <BulletList items={[
            <><strong>No silent data loss</strong> — failed messages are preserved</>,
            <><strong>Unblock the queue</strong> — poison messages don't hold up others</>,
            <><strong>Debugging</strong> — inspect failures to find bugs</>,
            <><strong>Replay after fix</strong> — reprocess once issue is resolved</>,
            <><strong>Audit trail</strong> — see what failed and why</>
          ]} />
        </div>

        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
          <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> DLQ Best Practices
          </h4>
          <BulletList items={[
            "Alert when messages land in DLQ",
            "Include original message + error details",
            "Set retention policy (don't keep forever)",
            "Build tooling to inspect and replay",
            "Track DLQ depth as a metric"
          ]} />
        </div>
      </div>

      <SectionHeader>Fintech Example: Payment Processing</SectionHeader>

      <div className="rounded-lg border border-border bg-card p-5">
        <p className="text-sm mb-4">
          A payment processing system uses DLQs to ensure <strong>no payment is silently lost</strong>:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-green-500">✓</span>
            <p className="text-sm">Payment message received, processing attempted</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-orange-500">↻</span>
            <p className="text-sm">PSP timeout — retry with backoff (1s, 2s, 4s)</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-500">✗</span>
            <p className="text-sm">All retries failed — move to payments-dlq</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-500">🔔</span>
            <p className="text-sm">Alert fires, ops team investigates</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500">✓</span>
            <p className="text-sm">Issue found (PSP outage), replayed after recovery</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded">
          <p className="text-sm text-green-600 dark:text-green-400">
            <strong>Result:</strong> Customer payment was delayed but not lost. Full audit trail preserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export const RetriesDlqQuiz = () => {
  const questions = [
    {
      question: "Why must operations be idempotent before adding retries?",
      options: [
        "To make code faster",
        "To prevent duplicate side effects (double charges, etc.)",
        "To reduce memory usage",
        "To simplify logging"
      ],
      correctIndex: 1,
      explanation: "Without idempotency, retrying a failed request might cause duplicates — charging a customer twice, for example."
    },
    {
      question: "What is exponential backoff?",
      options: [
        "Retrying immediately",
        "Waiting the same amount between each retry",
        "Waiting progressively longer between retries (1s, 2s, 4s...)",
        "Retrying only once"
      ],
      correctIndex: 2,
      explanation: "Exponential backoff increases the wait time exponentially, giving struggling services time to recover."
    },
    {
      question: "What is 'jitter' in retry strategies?",
      options: [
        "A type of error",
        "Random variation added to retry delays",
        "A monitoring metric",
        "A queue type"
      ],
      correctIndex: 1,
      explanation: "Jitter adds randomness to prevent all clients from retrying at the exact same moment (thundering herd)."
    },
    {
      question: "What is a 'poison message'?",
      options: [
        "A message with malware",
        "A message that will always fail processing",
        "An encrypted message",
        "A very large message"
      ],
      correctIndex: 1,
      explanation: "Poison messages always fail — due to malformed data, bugs, or invalid state — and would block the queue if retried forever."
    },
    {
      question: "What happens to a message after max retries are exhausted?",
      options: [
        "It's deleted",
        "It's retried forever",
        "It's moved to a Dead Letter Queue",
        "It's sent back to the producer"
      ],
      correctIndex: 2,
      explanation: "After exhausting retries, messages go to a DLQ for inspection and manual remediation."
    },
    {
      question: "Which error types should typically NOT be retried?",
      options: [
        "503 Service Unavailable",
        "Connection timeouts",
        "400 Bad Request (validation errors)",
        "Network errors"
      ],
      correctIndex: 2,
      explanation: "Client errors like 400 Bad Request indicate the request itself is invalid — retrying won't help."
    },
    {
      question: "Why is alerting on DLQ important?",
      options: [
        "To reduce costs",
        "To be notified of failures that need manual intervention",
        "To improve performance",
        "To encrypt messages"
      ],
      correctIndex: 1,
      explanation: "DLQ alerts ensure operators are notified when messages fail and need investigation."
    }
  ];

  return <Quiz questions={questions} />;
};
