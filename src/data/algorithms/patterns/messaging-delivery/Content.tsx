import { useState } from "react";
import { Section, Paragraph } from "@/components/AlgorithmContent";
import { Quiz } from "@/components/Quiz";
import { MessageSquare, Inbox, Send, CheckCircle, AlertTriangle, Database, Layers, Key } from "lucide-react";
import outboxInboxDiagram from "@/assets/outbox-inbox-pattern.png";

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

const BulletList = ({ items }: { items: (string | React.ReactNode)[] }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 mt-2 flex-shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const ComparisonBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <h4 className="font-semibold mb-2 text-sm">{title}</h4>
    <p className="text-xs text-muted-foreground">{children}</p>
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
        <div className="space-y-8">
          <Section>
        <Paragraph>
          Message queues and event streaming are fundamental to distributed systems. Understanding delivery 
          guarantees, idempotency, and patterns like transactional outbox is crucial for building reliable systems.
        </Paragraph>
      </Section>

      <SectionHeader>What is a Queue?</SectionHeader>

      <div className="grid md:grid-cols-3 gap-4">
        <ComparisonBox title="Queue Basics">
          A <strong>queue</strong> is a buffer that stores messages in order. Messages are usually 
          <strong> read by one consumer</strong> and then removed. Used for work distribution and background jobs.
        </ComparisonBox>
        <ComparisonBox title="SNS + SQS (AWS)">
          One <strong>SNS topic</strong> with multiple <strong>SQS queues</strong> subscribing. SNS copies 
          messages into each queue. Fan-out pattern.
        </ComparisonBox>
        <ComparisonBox title="Kafka">
          One <strong>topic</strong> with multiple <strong>consumers</strong>. Each consumer reads from the 
          topic (different consumer groups get all messages).
        </ComparisonBox>
      </div>

      <SectionHeader>Queues, Topics and Fan-Out</SectionHeader>

      <div className="grid md:grid-cols-2 gap-4">
        <ConceptCard title="Queue (Work Queue)" icon={Inbox} variant="blue">
          <BulletList items={[
            "Producers push messages, consumers pull and process",
            <><strong>Competing consumers:</strong> multiple workers share the load</>,
            "Good for background jobs, async processing & back-pressure"
          ]} />
        </ConceptCard>

        <ConceptCard title="Topic / Pub-Sub" icon={Send} variant="green">
          <BulletList items={[
            "Producer publishes to a topic, multiple subscribers get a copy",
            <>Enables <strong>fan-out:</strong> same event → risk, positions, notifications, audit</>,
            "Decouples producers from consumers"
          ]} />
        </ConceptCard>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 mt-4">
        <h4 className="font-semibold mb-2">Dead-Letter Queue (DLQ)</h4>
        <BulletList items={[
          "Messages that keep failing go here instead of being dropped",
          "Lets you investigate \"poison messages\" without losing them",
          "Essential for debugging and ensuring no data loss"
        ]} />
      </div>

      <SectionHeader>Delivery Semantics</SectionHeader>

      <div className="grid md:grid-cols-3 gap-4">
        <ConceptCard title="At-most-once" icon={MessageSquare} variant="orange">
          <BulletList items={[
            "Message processed 0 or 1 times",
            "No duplicates, but messages can be lost",
            "OK for non-critical telemetry"
          ]} />
          <div className="mt-3 p-2 bg-background/50 rounded text-xs">
            <strong>Trade-off:</strong> Speed over reliability
          </div>
        </ConceptCard>

        <ConceptCard title="At-least-once" icon={MessageSquare} variant="blue">
          <BulletList items={[
            "Message processed 1 or more times",
            "No loss, but duplicates possible",
            <><strong>Most common guarantee</strong></>
          ]} />
          <div className="mt-3 p-2 bg-background/50 rounded text-xs">
            <strong>Requires:</strong> Idempotent handlers
          </div>
        </ConceptCard>

        <ConceptCard title="Exactly-once" icon={MessageSquare} variant="green">
          <BulletList items={[
            "From business POV, each message has effect once",
            "Usually built as: at-least-once + idempotent handlers + dedup"
          ]} />
          <div className="mt-3 p-2 bg-background/50 rounded text-xs">
            <strong>Built with:</strong> IDs, keys, sequence numbers
          </div>
        </ConceptCard>
      </div>

      <SectionHeader>Idempotency & Deduplication</SectionHeader>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Key className="w-6 h-6 text-primary" />
          <h3 className="font-bold text-lg">Running the same thing multiple times → same end state as once</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="font-semibold mb-3">Idempotency Keys & Dedup</h4>
          <BulletList items={[
            <>Client sends a <strong>unique key</strong> per operation (e.g., idempotency-key header)</>,
            <><strong>Server stores (key, result);</strong> on retry, returns stored result instead of redoing</>,
            "Dedup table keyed by message ID/idempotency key",
            "Consumers check before applying side-effects"
          ]} />
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="font-semibold mb-3">Sequence Numbers</h4>
          <BulletList items={[
            <><code className="bg-muted px-1.5 py-0.5 rounded text-xs">account_id, seq_no</code> to detect missing or out-of-order events</>,
            "Consumer won't process seq 43 without seq 42",
            "Enables per-account ordering with high concurrency"
          ]} />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs border border-border rounded">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-2 text-left">account_id</th>
                  <th className="p-2 text-left">seq_no</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td className="p-2">A123</td><td className="p-2">41</td><td className="p-2">CREDIT</td><td className="p-2">500</td></tr>
                <tr><td className="p-2">A123</td><td className="p-2">42</td><td className="p-2">DEBIT</td><td className="p-2">100</td></tr>
                <tr><td className="p-2">A123</td><td className="p-2">43</td><td className="p-2">DEBIT</td><td className="p-2">50</td></tr>
              </tbody>
            </table>
            <p className="text-xs text-muted-foreground mt-2 italic">Consumer will never process 43 without 42.</p>
          </div>
        </div>
      </div>

      <SectionHeader>Transactional Outbox & Inbox</SectionHeader>

      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <h3 className="font-bold text-lg">The Problem</h3>
        </div>
        <Paragraph>
          DB write succeeds but event publish fails → <strong>divergence</strong>. 
          Your database says one thing, your event stream says another. This is a consistency nightmare.
        </Paragraph>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ConceptCard title="Outbox Pattern" icon={Send} variant="blue">
          <p className="mb-3">Guarantees delivery by writing to DB atomically:</p>
          <BulletList items={[
            "In the same DB transaction: write business change AND outbox record",
            "If TX commits, both the order AND outbox row exist",
            "Separate worker reads outbox, publishes to broker, marks as sent",
            <><strong>This decouples Kafka from your DB transaction</strong></>
          ]} />
        </ConceptCard>

        <ConceptCard title="Inbox Pattern" icon={Inbox} variant="green">
          <p className="mb-3">Guarantees exactly-once processing:</p>
          <BulletList items={[
            "Try to insert message_id into inbox (in a TX)",
            "If insert succeeds → apply mutations, commit",
            <>If insert conflicts (<code className="bg-muted px-1 rounded text-xs">ON CONFLICT DO NOTHING</code>) → already processed, exit</>,
            "Combines idempotency with transactional guarantees"
          ]} />
        </ConceptCard>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-card p-4">
        <h4 className="font-semibold mb-3 text-center">Outbox + Inbox Flow</h4>
        <img 
          src={outboxInboxDiagram} 
          alt="Transactional Outbox and Inbox Pattern Flow" 
          className="w-full rounded-lg border border-border bg-white"
        />
      </div>

      <SectionHeader>Quick Reference</SectionHeader>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-semibold">Pattern</th>
              <th className="text-left p-3 font-semibold">Purpose</th>
              <th className="text-left p-3 font-semibold">Key Mechanism</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Work Queue</td>
              <td className="p-3 text-muted-foreground">Distribute work to workers</td>
              <td className="p-3">Competing consumers</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Pub-Sub</td>
              <td className="p-3 text-muted-foreground">Fan-out events to subscribers</td>
              <td className="p-3">Topic + multiple subscribers</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Idempotency</td>
              <td className="p-3 text-muted-foreground">Safe retries</td>
              <td className="p-3">Unique keys + dedup store</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Outbox</td>
              <td className="p-3 text-muted-foreground">Reliable event publishing</td>
              <td className="p-3">Atomic DB write + async publish</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Inbox</td>
              <td className="p-3 text-muted-foreground">Exactly-once consumption</td>
              <td className="p-3">Insert-or-ignore dedup</td>
            </tr>
          </tbody>
        </table>
      </div>
        </div>
      ) : (
        <MessagingQuiz />
      )}
    </div>
  );
};

export const MessagingQuiz = () => {
  const questions = [
    {
      question: "What is the difference between a queue and a topic (pub-sub)?",
      options: [
        "Queues are faster than topics",
        "In a queue, one consumer gets each message; in pub-sub, all subscribers get a copy",
        "Topics can only have one publisher",
        "Queues don't preserve order"
      ],
      correctIndex: 1,
      explanation: "Queues use competing consumers (one gets each message), while pub-sub fans out to all subscribers."
    },
    {
      question: "What does 'at-least-once' delivery guarantee mean?",
      options: [
        "Messages are never lost but duplicates are possible",
        "Messages are delivered exactly one time",
        "Messages might be lost",
        "Messages are delivered in order"
      ],
      correctIndex: 0,
      explanation: "At-least-once ensures no message loss, but the same message might be delivered multiple times."
    },
    {
      question: "Why is idempotency important for message processing?",
      options: [
        "It makes processing faster",
        "It ensures retrying a message doesn't cause duplicate side effects",
        "It reduces memory usage",
        "It improves network latency"
      ],
      correctIndex: 1,
      explanation: "Idempotency ensures that processing the same message multiple times has the same effect as processing it once."
    },
    {
      question: "What problem does the Transactional Outbox pattern solve?",
      options: [
        "Slow database queries",
        "DB write succeeds but event publish fails, causing divergence",
        "Too many consumers",
        "Message ordering"
      ],
      correctIndex: 1,
      explanation: "Outbox ensures DB state and events stay in sync by writing both atomically to the database."
    },
    {
      question: "How does the Inbox pattern achieve exactly-once processing?",
      options: [
        "By using faster networks",
        "By inserting message_id and using ON CONFLICT DO NOTHING",
        "By deleting messages after processing",
        "By using multiple consumers"
      ],
      correctIndex: 1,
      explanation: "The inbox table with unique message_id prevents processing the same message twice."
    },
    {
      question: "What is a 'poison message'?",
      options: [
        "A message with malware",
        "A message that always fails processing and would block the queue",
        "An encrypted message",
        "A very large message"
      ],
      correctIndex: 1,
      explanation: "Poison messages always fail and should go to a DLQ to avoid blocking other messages."
    },
    {
      question: "What is the purpose of sequence numbers (seq_no) per account?",
      options: [
        "To encrypt messages",
        "To detect missing or out-of-order events",
        "To compress data",
        "To route messages"
      ],
      correctIndex: 1,
      explanation: "Sequence numbers let consumers detect gaps (missing events) and maintain per-account ordering."
    },
    {
      question: "In the Outbox pattern, what does the separate worker do?",
      options: [
        "Processes business logic",
        "Reads outbox table, publishes to broker, marks as sent",
        "Validates messages",
        "Encrypts data"
      ],
      correctIndex: 1,
      explanation: "The outbox worker polls the outbox table and reliably publishes messages to the message broker."
    },
    {
      question: "What is 'at-most-once' delivery?",
      options: [
        "Each message is delivered at least once",
        "Each message is delivered exactly once",
        "Messages may be lost but never duplicated",
        "Messages are always delivered in order"
      ],
      correctIndex: 2,
      explanation: "At-most-once means fire-and-forget. Fast but messages can be lost. Used when occasional loss is acceptable."
    },
    {
      question: "Why is exactly-once delivery so hard to achieve natively?",
      options: [
        "Networks are too slow",
        "Network failures and partial failures make it impossible to guarantee both delivery and non-duplication",
        "Databases don't support it",
        "It requires too much memory"
      ],
      correctIndex: 1,
      explanation: "Network partitions mean you can't distinguish 'message lost' from 'ack lost'. You must choose between possible loss or possible duplicates."
    },
    {
      question: "What is a consumer group in Kafka?",
      options: [
        "A group of producers",
        "Multiple consumers that share work on a topic, with each partition assigned to one consumer",
        "A security feature",
        "A type of message format"
      ],
      correctIndex: 1,
      explanation: "Consumer groups enable horizontal scaling. Partitions are distributed among group members, and each message goes to one consumer in the group."
    },
    {
      question: "What should you do if you receive a message with seq_no higher than expected (gap detected)?",
      options: [
        "Process it anyway",
        "Delete it",
        "Pause and request replay of missing messages",
        "Ignore sequence numbers"
      ],
      correctIndex: 2,
      explanation: "A gap indicates missing messages. Pause processing and replay from the last known good sequence to maintain ordering guarantees."
    }
  ];

  return <Quiz questions={questions} />;
};
