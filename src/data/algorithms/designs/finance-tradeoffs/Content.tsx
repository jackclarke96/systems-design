import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Quiz } from "@/components/Quiz";
import { Check, X, Server, Database, Zap, Lock, Shield, Layers, GitBranch, MessageSquare, Clock, Cpu } from "lucide-react";

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mb-8 ${className}`}>{children}</section>
);

const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
    <Icon className="w-5 h-5 text-primary" />
    {title}
  </h2>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
    {children}
  </div>
);

const OptionCard = ({ 
  title, 
  pros, 
  cons,
  recommended = false 
}: { 
  title: string; 
  pros: string[]; 
  cons: string[];
  recommended?: boolean;
}) => (
  <div className={`p-4 rounded-lg border ${recommended ? 'border-primary/50 bg-primary/5' : 'border-border bg-card'}`}>
    <div className="flex items-center gap-2 mb-3">
      <h4 className="font-semibold text-foreground">{title}</h4>
      {recommended && (
        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Recommended</span>
      )}
    </div>
    <div className="space-y-2">
      {pros.map((pro, i) => (
        <div key={`pro-${i}`} className="flex items-start gap-2 text-sm">
          <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
          <span className="text-muted-foreground">{pro}</span>
        </div>
      ))}
      {cons.map((con, i) => (
        <div key={`con-${i}`} className="flex items-start gap-2 text-sm">
          <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <span className="text-muted-foreground">{con}</span>
        </div>
      ))}
    </div>
  </div>
);

const TwoColumnGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const InterviewTip = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
    <p className="text-sm text-blue-400 italic">💡 Interview tip: {children}</p>
  </div>
);

export const Content = () => {
  const [activeTab, setActiveTab] = useState("learn");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="learn">Learn</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="learn" className="space-y-6">
          {/* 1. Service & Data Boundaries */}
          <Section>
            <SectionHeader icon={Server} title="1. Service & Data Boundaries" />
            
            <SubSection title="1.1 One Service vs Multiple Services">
              <TwoColumnGrid>
                <OptionCard
                  title="Option A: Single Transaction+Ledger Service"
                  recommended
                  pros={[
                    "Simple mental model: one place owns 'POSTED tx ⇒ ledger updated'",
                    "Strong consistency via one DB transaction",
                    "Easier to debug and reason about"
                  ]}
                  cons={[
                    "Less 'microservice-y'; some might call it monolithic",
                    "Harder to scale parts independently (though reads can scale separately)"
                  ]}
                />
                <OptionCard
                  title="Option B: TransactionService + LedgerService"
                  pros={[
                    "Clear ownership boundaries, independent scaling",
                    "Can evolve ledger independently (different schemas, reporting DB)"
                  ]}
                  cons={[
                    "Lose automatic strong consistency—need eventual consistency or 2PC/sagas",
                    "More operational complexity (2 schemas, migrations)"
                  ]}
                />
              </TwoColumnGrid>
              <InterviewTip>
                "For financial systems, I'd start with a single service for writes to get strong consistency, then split if scaling demands it."
              </InterviewTip>
            </SubSection>
          </Section>

          {/* 2. Sync vs Async Ledger Updates */}
          <Section>
            <SectionHeader icon={Zap} title="2. Sync vs Async Ledger Updates" />
            
            <SubSection title="2.1 Synchronous Ledger Update">
              <TwoColumnGrid>
                <OptionCard
                  title="Synchronous (Strong Consistency)"
                  recommended
                  pros={[
                    "Once COMMIT returns, transaction and ledger are in sync",
                    "No race between 'tx POSTED' and 'ledger catches up'",
                    "No distributed transactions needed"
                  ]}
                  cons={[
                    "Tighter coupling between transaction and ledger models",
                    "Slightly higher latency on write path"
                  ]}
                />
                <OptionCard
                  title="Asynchronous (Eventual Consistency)"
                  pros={[
                    "Services are decoupled",
                    "Ledger can have its own optimised schema",
                    "Can handle very high throughput via Kafka"
                  ]}
                  cons={[
                    "Window where transaction state and ledger are temporarily inconsistent",
                    "Must implement idempotent consumer + applied_events table",
                    "Harder to reason about 'is system fully consistent now?'"
                  ]}
                />
              </TwoColumnGrid>
            </SubSection>
          </Section>

          {/* 3. Events & Outbox */}
          <Section>
            <SectionHeader icon={MessageSquare} title="3. Events & Outbox" />
            
            <SubSection title="3.1 Outbox vs Direct Publish">
              <TwoColumnGrid>
                <OptionCard
                  title="Outbox Table + Relay"
                  recommended
                  pros={[
                    "Avoids 'DB write succeeds, event publish fails' problem",
                    "Guaranteed: if transaction stored, event also stored",
                    "Can replay from outbox"
                  ]}
                  cons={[
                    "Extra table and background process",
                    "Slightly more moving parts"
                  ]}
                />
                <OptionCard
                  title="Direct Publish to Kafka/RabbitMQ"
                  pros={[
                    "Simpler code initially"
                  ]}
                  cons={[
                    "If crash after DB write but before publish → event lost",
                    "Must add custom retry logic & compensation"
                  ]}
                />
              </TwoColumnGrid>
            </SubSection>

            <SubSection title="3.2 Kafka vs Other Brokers">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <OptionCard
                  title="Kafka"
                  recommended
                  pros={[
                    "Partitioning, high throughput, replay, durable log",
                    "Per-key ordering (by account_id or symbol)"
                  ]}
                  cons={[
                    "Operationally heavier",
                    "More concepts (partitions, consumer groups, offsets)"
                  ]}
                />
                <OptionCard
                  title="Simple Queue (SQS, RabbitMQ)"
                  pros={[
                    "Easier to operate",
                    "Good enough for many systems"
                  ]}
                  cons={[
                    "Weaker replay / partitioning than Kafka",
                    "Harder to do per-key strict ordering at scale"
                  ]}
                />
                <OptionCard
                  title="No Broker (Sync Only)"
                  pros={[
                    "Very simple"
                  ]}
                  cons={[
                    "Lose async decoupling and backpressure",
                    "Harder to scale for spikes / high volume"
                  ]}
                />
              </div>
            </SubSection>
          </Section>

          {/* 4. Partitioning & Per-Key Ordering */}
          <Section>
            <SectionHeader icon={Layers} title="4. Partitioning & Per-Key Ordering" />
            
            <TwoColumnGrid>
              <OptionCard
                title="Partition Key = account_id / symbol"
                recommended
                pros={[
                  "All events for account/symbol go to same partition",
                  "One consumer per partition → no races per account",
                  "Simple: 'single-threaded per account/symbol'"
                ]}
                cons={[
                  "Hot keys (very busy accounts) can become bottlenecks"
                ]}
              />
              <OptionCard
                title="Random / No Meaningful Key"
                pros={[
                  "Spreads load evenly"
                ]}
                cons={[
                  "Orders for same account on different partitions → races on balances",
                  "Must manually coordinate or lock at DB level"
                ]}
              />
            </TwoColumnGrid>
            <InterviewTip>
              "We partition by account_id so each account's events are processed in order by a single consumer—avoiding balance races."
            </InterviewTip>
          </Section>

          {/* 5. DB Design & Consistency */}
          <Section>
            <SectionHeader icon={Database} title="5. DB Design & Consistency" />
            
            <SubSection title="5.1 Database Technology">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <OptionCard
                  title="Relational (Postgres/MySQL)"
                  recommended
                  pros={[
                    "ACID, transactions—great for ledger & money",
                    "Mature tooling, constraints, queries",
                    "WAL-based durability"
                  ]}
                  cons={[
                    "Vertical scaling limits (but can go far with good design)"
                  ]}
                />
                <OptionCard
                  title="NoSQL for Core Ledger"
                  pros={[
                    "Horizontal scaling, flexible schema"
                  ]}
                  cons={[
                    "Weaker transactional guarantees (per-partition only)",
                    "Audits and complex queries painful",
                    "Harder to model double-entry correctly"
                  ]}
                />
                <OptionCard
                  title="Distributed SQL (CockroachDB, Yugabyte)"
                  pros={[
                    "SQL + ACID + horizontal scaling"
                  ]}
                  cons={[
                    "Operationally more complex than single-node Postgres",
                    "Some features/edge cases differ from classic RDBMS"
                  ]}
                />
              </div>
            </SubSection>

            <SubSection title="5.2 Append-Only vs Mutable Balances">
              <TwoColumnGrid>
                <OptionCard
                  title="Append-Only Ledger + Computed Balances"
                  recommended
                  pros={[
                    "Strong audit trail",
                    "Easy to reconstruct history",
                    "Natural fit for events and double-entry"
                  ]}
                  cons={[
                    "Balances must be computed/aggregated (need indexes/caches/read models)"
                  ]}
                />
                <OptionCard
                  title="Mutable Balances with Limited History"
                  pros={[
                    "Faster point lookups (just read accounts.balance)"
                  ]}
                  cons={[
                    "Harder to audit / debug errors",
                    "Bug in update logic can permanently corrupt balances"
                  ]}
                />
              </TwoColumnGrid>
            </SubSection>
          </Section>

          {/* 6. Isolation, Locking & Concurrency */}
          <Section>
            <SectionHeader icon={Lock} title="6. Isolation, Locking & Concurrency" />
            
            <TwoColumnGrid>
              <OptionCard
                title="Row-Level Locking (SELECT ... FOR UPDATE)"
                recommended
                pros={[
                  "Simple: lock account row, update balance, commit",
                  "Avoids lost updates"
                ]}
                cons={[
                  "Can cause contention on same account",
                  "Need to think about deadlocks"
                ]}
              />
              <OptionCard
                title="Optimistic Concurrency (Version/ETag)"
                pros={[
                  "Fewer locks; can scale with retries"
                ]}
                cons={[
                  "Must handle and retry on concurrent modifications",
                  "More complex logic for invariants like 'no negative balance'"
                ]}
              />
            </TwoColumnGrid>
          </Section>

          {/* 7. Processing Guarantees */}
          <Section>
            <SectionHeader icon={GitBranch} title="7. Processing Guarantees" />
            
            <TwoColumnGrid>
              <OptionCard
                title="At-Least-Once + Idempotency"
                recommended
                pros={[
                  "Use applied_events / unique keys to ensure same tx only applied once",
                  "Simpler than real 'exactly-once' infra"
                ]}
                cons={[
                  "Must get idempotency right in DB logic"
                ]}
              />
              <OptionCard
                title="Exactly-Once (Transactional Consumer)"
                pros={[
                  "Kafka can give exactly-once semantics in the pipeline"
                ]}
                cons={[
                  "Much more complex",
                  "Still need idempotency at DB boundary in practice",
                  "Usually overkill—interviewers happy with 'at-least-once + idempotent'"
                ]}
              />
            </TwoColumnGrid>
            <InterviewTip>
              "We use at-least-once delivery with idempotent consumers—each event has a unique ID, and we check applied_events before processing."
            </InterviewTip>
          </Section>

          {/* 8. Webhook / Notification Handling */}
          <Section>
            <SectionHeader icon={MessageSquare} title="8. Webhook / Notification Handling" />
            
            <TwoColumnGrid>
              <OptionCard
                title="Process Webhook Fully in Handler"
                pros={[
                  "Simpler flow: receive → process → respond",
                  "PSP gets success only after we've updated transaction + ledger"
                ]}
                cons={[
                  "If DB slow, webhook latency increases; PSP might timeout"
                ]}
              />
              <OptionCard
                title="Persist + Hand Off to Background Worker"
                recommended
                pros={[
                  "Handler validates + stores + enqueues → responds fast",
                  "Background worker does heavier DB work"
                ]}
                cons={[
                  "PSP thinks success as long as event stored (need retries/DLQ)",
                  "Need idempotency so replayed webhooks don't double-apply"
                ]}
              />
            </TwoColumnGrid>
          </Section>

          {/* 9. Security / Transport */}
          <Section>
            <SectionHeader icon={Shield} title="9. Security / Transport" />
            
            <TwoColumnGrid>
              <OptionCard
                title="TLS Everywhere (External + Internal + DB)"
                recommended
                pros={[
                  "Modern 'zero trust' best practice",
                  "Protects against internal snooping/misconfig",
                  "Good interview answer"
                ]}
                cons={[
                  "Slight operational overhead (certs, service mesh)"
                ]}
              />
              <OptionCard
                title="Only External TLS, Internal Plain"
                pros={[
                  "Simpler in small on-prem/internal-only setups"
                ]}
                cons={[
                  "Weakens story if anything internal gets compromised",
                  "Not ideal for fintech systems"
                ]}
              />
            </TwoColumnGrid>
          </Section>

          {/* 10. Concurrency & Goroutines */}
          <Section>
            <SectionHeader icon={Cpu} title="10. Concurrency & Worker Pools" />
            
            <TwoColumnGrid>
              <OptionCard
                title="Unbounded Goroutines / Threads"
                pros={[
                  "Easy to write"
                ]}
                cons={[
                  "Can exhaust memory, DB connections, file descriptors",
                  "Hard to control backpressure"
                ]}
              />
              <OptionCard
                title="Bounded Worker Pool"
                recommended
                pros={[
                  "Concurrency is controlled (N workers)",
                  "Easier to tune (increase/decrease via config)",
                  "Matches DB/PSP limits (max open conns, rate limits)"
                ]}
                cons={[
                  "Slightly more plumbing (channels, WaitGroups)"
                ]}
              />
            </TwoColumnGrid>
          </Section>

          {/* 11. Durability vs Latency */}
          <Section>
            <SectionHeader icon={Clock} title="11. Durability vs Latency" />
            
            <SubSection title="11.1 DB Durability">
              <TwoColumnGrid>
                <OptionCard
                  title="Synchronous WAL fsync on Commit"
                  recommended
                  pros={[
                    "Once commit returns, data very unlikely to be lost",
                    "Correct choice for money"
                  ]}
                  cons={[
                    "Slightly higher latency per transaction"
                  ]}
                />
                <OptionCard
                  title="Relaxed / Async Commit"
                  pros={[
                    "Lower latency"
                  ]}
                  cons={[
                    "Recent commits may be lost on crash/power loss",
                    "Bad for financial correctness"
                  ]}
                />
              </TwoColumnGrid>
            </SubSection>

            <SubSection title="11.2 Kafka Acks / Replication">
              <TwoColumnGrid>
                <OptionCard
                  title="acks=all, RF≥3, min.insync.replicas"
                  recommended
                  pros={[
                    "High durability for events once acknowledged"
                  ]}
                  cons={[
                    "Slightly higher latency, need healthy cluster"
                  ]}
                />
                <OptionCard
                  title="acks=1, RF=1"
                  pros={[
                    "Lower latency"
                  ]}
                  cons={[
                    "Ack doesn't mean much; leader crash can lose data"
                  ]}
                />
              </TwoColumnGrid>
            </SubSection>
          </Section>

          {/* Quick Reference */}
          <Section>
            <h2 className="text-xl font-bold text-foreground mb-4">Quick Reference: Recommended Defaults</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 border-b border-border">Decision</th>
                    <th className="text-left p-3 border-b border-border">Recommended</th>
                    <th className="text-left p-3 border-b border-border">Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Service Boundaries</td>
                    <td className="p-3 text-foreground">Single write service</td>
                    <td className="p-3 text-muted-foreground">Strong consistency, simpler</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Ledger Updates</td>
                    <td className="p-3 text-foreground">Synchronous</td>
                    <td className="p-3 text-muted-foreground">No consistency window</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Event Publishing</td>
                    <td className="p-3 text-foreground">Outbox + Relay</td>
                    <td className="p-3 text-muted-foreground">Atomic with DB write</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Message Broker</td>
                    <td className="p-3 text-foreground">Kafka</td>
                    <td className="p-3 text-muted-foreground">Partitioning, replay, ordering</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Partition Key</td>
                    <td className="p-3 text-foreground">account_id / symbol</td>
                    <td className="p-3 text-muted-foreground">Per-account ordering</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Database</td>
                    <td className="p-3 text-foreground">Postgres</td>
                    <td className="p-3 text-muted-foreground">ACID, mature, ledger-friendly</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Ledger Model</td>
                    <td className="p-3 text-foreground">Append-only</td>
                    <td className="p-3 text-muted-foreground">Audit trail, history</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Concurrency</td>
                    <td className="p-3 text-foreground">Row-level locking</td>
                    <td className="p-3 text-muted-foreground">Simple, avoids lost updates</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Processing</td>
                    <td className="p-3 text-foreground">At-least-once + idempotent</td>
                    <td className="p-3 text-muted-foreground">Simpler than exactly-once</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Security</td>
                    <td className="p-3 text-foreground">TLS everywhere</td>
                    <td className="p-3 text-muted-foreground">Zero trust</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-muted-foreground">Durability</td>
                    <td className="p-3 text-foreground">Sync WAL, acks=all</td>
                    <td className="p-3 text-muted-foreground">Money can't be lost</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="quiz">
          <FinanceTradeoffsQuiz />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const quizQuestions = [
  {
    question: "Why is a single Transaction+Ledger service often preferred over separate services for fintech?",
    options: [
      "It's more 'microservice-y'",
      "Strong consistency via one DB transaction—no distributed coordination needed",
      "It scales better horizontally",
      "It requires less code"
    ],
    correctIndex: 1,
    explanation: "A single service can update transaction and ledger in one DB transaction, guaranteeing strong consistency without needing 2PC or eventual consistency patterns."
  },
  {
    question: "What is the main risk of publishing events directly to Kafka instead of using an outbox table?",
    options: [
      "Kafka is slower than direct DB writes",
      "If crash after DB write but before publish, the event is lost",
      "Kafka doesn't support ordering",
      "It uses more memory"
    ],
    correctIndex: 1,
    explanation: "Without an outbox, if the service crashes after committing to DB but before publishing to Kafka, the event is lost and downstream systems miss the update."
  },
  {
    question: "Why partition Kafka topics by account_id or symbol?",
    options: [
      "It makes Kafka faster",
      "All events for an account go to one partition, processed by one consumer—no races",
      "It reduces storage costs",
      "It's required by Kafka"
    ],
    correctIndex: 1,
    explanation: "Partitioning by account ensures all events for that account are processed in order by a single consumer, preventing race conditions on balances."
  },
  {
    question: "What's the downside of partitioning by account_id?",
    options: [
      "Events arrive out of order",
      "Hot keys (very active accounts) can become bottlenecks",
      "It doesn't work with Kafka",
      "You can't use consumer groups"
    ],
    correctIndex: 1,
    explanation: "If one account has much higher traffic than others, its partition becomes a hot spot, potentially slowing down processing for that account."
  },
  {
    question: "Why is an append-only ledger preferred over mutable balances?",
    options: [
      "It's faster for reads",
      "It uses less storage",
      "It provides a strong audit trail and allows reconstructing history",
      "It doesn't require indexes"
    ],
    correctIndex: 2,
    explanation: "Append-only ledgers never modify past entries, making it easy to audit, debug, and reconstruct any point-in-time balance."
  },
  {
    question: "What's the main drawback of optimistic concurrency vs row-level locking?",
    options: [
      "It's slower",
      "You must handle and retry on concurrent modifications",
      "It doesn't work with Postgres",
      "It requires more storage"
    ],
    correctIndex: 1,
    explanation: "With optimistic concurrency, if another transaction modifies the row, you must detect the conflict (via version mismatch) and retry, adding complexity."
  },
  {
    question: "Why is 'at-least-once + idempotency' preferred over 'exactly-once' processing?",
    options: [
      "Exactly-once is impossible",
      "At-least-once is simpler; exactly-once requires complex infra and you still need DB-level idempotency",
      "Exactly-once is slower",
      "Kafka doesn't support exactly-once"
    ],
    correctIndex: 1,
    explanation: "Exactly-once semantics require transactional producers/consumers and are complex. In practice, at-least-once with idempotent consumers (checking applied_events) is simpler and sufficient."
  },
  {
    question: "Why use a background worker for webhook processing instead of handling fully in the request?",
    options: [
      "Webhooks can't be processed synchronously",
      "Handler responds fast; heavy DB work happens async without timing out the PSP",
      "It uses less memory",
      "PSPs require async processing"
    ],
    correctIndex: 1,
    explanation: "By quickly storing the webhook payload and responding, you avoid the PSP timing out. The background worker then processes at its own pace."
  },
  {
    question: "Why is 'TLS everywhere' (external + internal + DB) recommended for fintech?",
    options: [
      "It's required by law",
      "Internal networks are always secure",
      "It follows zero-trust principles—protects against internal compromise",
      "It's easier to configure"
    ],
    correctIndex: 2,
    explanation: "Zero-trust assumes any network segment could be compromised. TLS everywhere protects data even if an internal service or network is breached."
  },
  {
    question: "Why use a bounded worker pool instead of spawning unlimited goroutines?",
    options: [
      "Goroutines are slow",
      "Controlled concurrency prevents exhausting memory, DB connections, and enables backpressure",
      "It's required by Go",
      "Unbounded pools are harder to write"
    ],
    correctIndex: 1,
    explanation: "Bounded pools let you tune concurrency to match downstream limits (DB connections, API rate limits) and prevent resource exhaustion."
  },
  {
    question: "Why choose synchronous WAL fsync over async commit for financial data?",
    options: [
      "Async is always faster",
      "Once commit returns, data is durable—money can't be lost on crash",
      "Sync is simpler to configure",
      "Postgres doesn't support async"
    ],
    correctIndex: 1,
    explanation: "Synchronous fsync ensures committed transactions survive crashes. For financial data, the slight latency cost is worth the durability guarantee."
  },
  {
    question: "What does acks=all with RF≥3 achieve in Kafka?",
    options: [
      "Lower latency",
      "Less storage usage",
      "High durability—event acknowledged only after replicated to all in-sync replicas",
      "Faster consumer processing"
    ],
    correctIndex: 2,
    explanation: "acks=all means the producer waits for all in-sync replicas to acknowledge. With RF=3, the event survives even if some brokers fail."
  },
  {
    question: "What problem does the outbox relay pattern solve?",
    options: [
      "It makes Kafka faster",
      "It ensures DB write and event publish are atomic—no lost events on crash",
      "It reduces database load",
      "It enables exactly-once semantics"
    ],
    correctIndex: 1,
    explanation: "The outbox table is written in the same DB transaction as the main data. A separate relay reads from outbox and publishes to Kafka, ensuring no events are lost."
  },
  {
    question: "When would you choose separate TransactionService and LedgerService?",
    options: [
      "When you want simpler debugging",
      "When you need independent scaling and can accept eventual consistency",
      "When you want strong consistency",
      "When you have a small team"
    ],
    correctIndex: 1,
    explanation: "Separate services allow independent scaling and evolution, but require eventual consistency patterns (outbox + events) or complex distributed transactions."
  },
  {
    question: "What is the 'applied_events' table used for in event consumers?",
    options: [
      "Storing all events for replay",
      "Tracking which events have been processed to ensure idempotency",
      "Caching event payloads",
      "Logging errors"
    ],
    correctIndex: 1,
    explanation: "The applied_events table records processed event IDs. Before processing, the consumer checks if the event was already applied, preventing duplicate processing."
  },
  {
    question: "Why might you choose RabbitMQ over Kafka for a smaller system?",
    options: [
      "RabbitMQ has better durability",
      "RabbitMQ is easier to operate and good enough for many workloads",
      "RabbitMQ has better partitioning",
      "RabbitMQ is faster"
    ],
    correctIndex: 1,
    explanation: "RabbitMQ is operationally simpler than Kafka. For systems that don't need Kafka's partitioning, replay, or extreme throughput, RabbitMQ is often sufficient."
  },
  {
    question: "What's the risk of random partitioning in Kafka for financial events?",
    options: [
      "Events are delivered slower",
      "Events for the same account can be processed in parallel, causing race conditions",
      "Kafka rejects random keys",
      "It uses more storage"
    ],
    correctIndex: 1,
    explanation: "Random partitioning spreads events across partitions. Two events for the same account might be processed concurrently by different consumers, racing on balance updates."
  },
  {
    question: "Why is Postgres often preferred over NoSQL for financial ledgers?",
    options: [
      "It's faster for writes",
      "It has better horizontal scaling",
      "ACID transactions and strong consistency are critical for money",
      "It uses less storage"
    ],
    correctIndex: 2,
    explanation: "Financial systems need ACID guarantees to ensure money is never lost or duplicated. Postgres provides strong transactional semantics that are harder to achieve in NoSQL."
  },
  {
    question: "What's the main advantage of mutable balances over append-only ledgers?",
    options: [
      "Better audit trail",
      "Faster point lookups—just read the balance field",
      "Easier to debug",
      "Works better with events"
    ],
    correctIndex: 1,
    explanation: "With mutable balances, reading the current balance is a simple field lookup. Append-only requires aggregating entries, though this is often mitigated with caches or materialized views."
  },
  {
    question: "What does SELECT ... FOR UPDATE achieve?",
    options: [
      "It makes queries faster",
      "It locks the selected rows until the transaction commits, preventing concurrent modifications",
      "It updates rows automatically",
      "It enables optimistic concurrency"
    ],
    correctIndex: 1,
    explanation: "SELECT FOR UPDATE acquires a row-level lock. Other transactions trying to update the same row must wait, preventing lost updates and ensuring serialized access."
  },
  {
    question: "How does optimistic concurrency detect conflicts?",
    options: [
      "By locking rows",
      "By checking a version/ETag field—if it changed since read, retry the operation",
      "By using distributed locks",
      "By queuing updates"
    ],
    correctIndex: 1,
    explanation: "Optimistic concurrency reads a version number with the row. On update, it checks the version hasn't changed. If it has, another transaction modified the row, and you must retry."
  },
  {
    question: "Why might webhooks time out if processed synchronously?",
    options: [
      "Webhooks have no timeout",
      "If DB operations are slow, the response takes too long and the PSP times out",
      "Synchronous processing is not allowed",
      "The network is too slow"
    ],
    correctIndex: 1,
    explanation: "PSPs expect quick responses (often < 30s). If your handler does heavy DB work before responding, slow operations can cause timeouts, leading to retries and duplicate webhooks."
  },
  {
    question: "What's a dead-letter queue (DLQ) used for in webhook processing?",
    options: [
      "Storing successful events",
      "Holding failed events for later inspection and retry",
      "Speeding up processing",
      "Encrypting payloads"
    ],
    correctIndex: 1,
    explanation: "When processing fails after retries, events go to a DLQ. This prevents blocking the main queue while allowing investigation and manual/automated reprocessing."
  },
  {
    question: "Why tune worker pool size to match DB connection limits?",
    options: [
      "More workers are always better",
      "If workers exceed DB connections, they block waiting for connections, wasting resources",
      "It's required by the database",
      "It reduces memory usage"
    ],
    correctIndex: 1,
    explanation: "If you have 100 workers but only 20 DB connections, 80 workers sit idle waiting. Matching pool size to downstream limits ensures efficient resource utilization."
  },
  {
    question: "What happens with async DB commits on power loss?",
    options: [
      "All data is safe",
      "Recently committed transactions may be lost",
      "The database corrupts",
      "Nothing—it auto-recovers"
    ],
    correctIndex: 1,
    explanation: "Async commit returns success before data is flushed to disk. If power is lost before the flush, those transactions are lost. For financial data, this is unacceptable."
  },
  {
    question: "What does min.insync.replicas control in Kafka?",
    options: [
      "Maximum number of consumers",
      "Minimum replicas that must acknowledge a write before it's considered committed",
      "Partition count",
      "Consumer lag threshold"
    ],
    correctIndex: 1,
    explanation: "min.insync.replicas sets how many replicas must be in sync for acks=all to succeed. With RF=3 and min.insync=2, writes succeed even if one replica is down."
  }
];

const FinanceTradeoffsQuiz = () => {
  return <Quiz questions={quizQuestions} />;
};

export { FinanceTradeoffsQuiz };
