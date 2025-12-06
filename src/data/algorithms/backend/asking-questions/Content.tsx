import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Quiz } from "@/components/Quiz";
import { HelpCircle, Target, Shield, Gauge, AlertTriangle, FileCode, Database, Lock, Settings, Rocket } from "lucide-react";

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mb-8 ${className}`}>{children}</section>
);

const SectionHeader = ({ icon: Icon, title, number }: { icon: React.ElementType; title: string; number: number }) => (
  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-bold">{number}</span>
    <Icon className="w-5 h-5 text-primary" />
    {title}
  </h2>
);

const QuestionCard = ({ question, context }: { question: string; context?: string }) => (
  <div className="p-3 bg-muted/30 border border-border rounded-lg mb-2">
    <p className="text-foreground font-medium">"{question}"</p>
    {context && <p className="text-sm text-muted-foreground mt-1 italic">{context}</p>}
  </div>
);

const TipCard = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
    <p className="text-sm text-blue-400">{children}</p>
  </div>
);

const CategoryGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-3">{children}</div>
);

const PracticeScenario = ({ 
  title, 
  prompt, 
  keyQuestions 
}: { 
  title: string; 
  prompt: string; 
  keyQuestions: string[];
}) => {
  const [showQuestions, setShowQuestions] = useState(false);
  
  return (
    <div className="mb-4 p-4 border border-border rounded-lg bg-card">
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-muted-foreground text-sm mb-3 italic">"{prompt}"</p>
      <button
        onClick={() => setShowQuestions(!showQuestions)}
        className="text-sm text-primary hover:underline"
      >
        {showQuestions ? "Hide key questions" : "Reveal key questions →"}
      </button>
      {showQuestions && (
        <ul className="mt-3 space-y-1">
          {keyQuestions.map((q, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary">•</span>
              {q}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

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
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg mb-6">
            <p className="text-foreground">
              <strong>Why ask questions first?</strong> Jumping into design without clarifying requirements is a common mistake. 
              Spending 5-10 minutes on questions shows maturity, uncovers hidden constraints, and ensures you solve the right problem.
            </p>
          </div>

          {/* 1. Product / Functional */}
          <Section>
            <SectionHeader icon={Target} title="Product & Functional Requirements" number={1} />
            <CategoryGrid>
              <QuestionCard 
                question="What is the core job of this system in one sentence?"
                context="Forces clarity on the primary goal before diving into details"
              />
              <QuestionCard 
                question="What are the main actions? Create? Update? Query? Cancel?"
                context="Identifies the core operations / API surface"
              />
              <QuestionCard 
                question="Who calls this? Other services, external partners, mobile apps, batch jobs?"
                context="Understanding clients shapes API design and auth requirements"
              />
              <QuestionCard 
                question="Is this real-time/online traffic, or more batch/offline?"
                context="Drives latency requirements and architecture choices"
              />
            </CategoryGrid>
          </Section>

          {/* 2. Correctness & Guarantees */}
          <Section>
            <SectionHeader icon={Shield} title="Correctness & Guarantees" number={2} />
            <CategoryGrid>
              <QuestionCard 
                question="Do we need strong consistency or is eventual consistency OK?"
              />
              <QuestionCard 
                question="What is the worst thing that can happen from a user's POV?"
                context="e.g. 'double-charging' vs 'seeing a slightly stale balance'"
              />
              <QuestionCard 
                question="Can upstream send duplicates? How should we handle retries?"
                context="Drives idempotency requirements"
              />
              <QuestionCard 
                question="Is there any notion of ordering that must be preserved? Per user, per account, globally?"
              />
            </CategoryGrid>
            <TipCard>
              💡 For financial systems, always clarify: "If we return success, can we ever lose that transaction?" (Answer should be NO)
            </TipCard>
          </Section>

          {/* 3. Scale & Performance */}
          <Section>
            <SectionHeader icon={Gauge} title="Scale & Performance" number={3} />
            <CategoryGrid>
              <QuestionCard 
                question="What is the expected QPS/TPS now, and what is 'success' in 1-2 years?"
                context="Helps size the system and identify scaling needs"
              />
              <QuestionCard 
                question="Roughly how many records, and how fast do they grow?"
                context="Drives storage and partitioning decisions"
              />
              <QuestionCard 
                question="What is acceptable latency for writes? For reads?"
              />
              <QuestionCard 
                question="Is this user-facing 'must feel snappy', or backend batch?"
                context="User-facing typically means p99 < 200ms; batch can be seconds/minutes"
              />
            </CategoryGrid>
          </Section>

          {/* 4. Availability & Durability */}
          <Section>
            <SectionHeader icon={AlertTriangle} title="Availability, Failure & Durability" number={4} />
            <CategoryGrid>
              <QuestionCard 
                question="Any SLO/SLAs? Are we aiming for 99.9%, 99.99%?"
                context="99.9% = ~8.7 hours downtime/year; 99.99% = ~52 minutes/year"
              />
              <QuestionCard 
                question="If a dependency goes down, should we fail closed (block) or degrade gracefully?"
              />
              <QuestionCard 
                question="Once we acknowledge a write, how durable must it be? Is losing an acknowledged write ever acceptable?"
              />
            </CategoryGrid>
            <TipCard>
              💡 For financial/transaction systems: "Once we return success, we must never lose that transaction."
            </TipCard>
          </Section>

          {/* 5. Interfaces & Contract */}
          <Section>
            <SectionHeader icon={FileCode} title="Interfaces & Contract" number={5} />
            <CategoryGrid>
              <QuestionCard 
                question="Are we designing HTTP/JSON, gRPC, events, or all of the above?"
              />
              <QuestionCard 
                question="Does the caller need the result immediately, or is 'accepted and processed later' OK?"
                context="Sync vs async - affects architecture significantly"
              />
              <QuestionCard 
                question="How tolerant do clients need to be to API changes? Do we need explicit versioning?"
              />
            </CategoryGrid>
          </Section>

          {/* 6. Data Model & Lifecycle */}
          <Section>
            <SectionHeader icon={Database} title="Data Model & Lifecycle" number={6} />
            <CategoryGrid>
              <QuestionCard 
                question="What are the main entities? e.g. transaction, ledger entry, user, account?"
              />
              <QuestionCard 
                question="Are records immutable (append-only) or can they be updated in place?"
              />
              <QuestionCard 
                question="Do we ever delete data, or is it soft-delete / archive-only?"
              />
            </CategoryGrid>
            <TipCard>
              💡 For money systems: "I would prefer append-only, journal-style records for auditability."
            </TipCard>
          </Section>

          {/* 7. Security & Compliance */}
          <Section>
            <SectionHeader icon={Lock} title="Security, Privacy & Compliance" number={7} />
            <CategoryGrid>
              <QuestionCard 
                question="Who is allowed to do what? Do we need fine-grained permissions?"
              />
              <QuestionCard 
                question="Is any of this data regulated (financial, PII, PCI, GDPR)?"
              />
              <QuestionCard 
                question="Do we need full audit logs of who did what and when?"
              />
            </CategoryGrid>
            <TipCard>
              💡 For financial systems, this is a great place to shine—mention PCI-DSS, audit trails, encryption at rest.
            </TipCard>
          </Section>

          {/* 8. Operational */}
          <Section>
            <SectionHeader icon={Settings} title="Operational Concerns" number={8} />
            <CategoryGrid>
              <QuestionCard 
                question="Single region or multi-region? Any geo constraints?"
              />
              <QuestionCard 
                question="What are the key metrics and alerts for this service?"
              />
              <QuestionCard 
                question="Will we have to migrate existing data or backfill from another system?"
              />
            </CategoryGrid>
          </Section>

          {/* 9. Evolution */}
          <Section>
            <SectionHeader icon={Rocket} title="Evolution & Future Features" number={9} />
            <CategoryGrid>
              <QuestionCard 
                question="What future features should we keep in mind? For example, multi-currency, multi-region, or new transaction types?"
                context="Shows senior thinking—designing for extensibility without over-engineering"
              />
            </CategoryGrid>
            <TipCard>
              💡 Nice "senior" touch at the end—shows you think about maintainability and evolution.
            </TipCard>
          </Section>

          {/* Quick Reference */}
          <Section>
            <h2 className="text-xl font-bold text-foreground mb-4">Quick Reference Checklist</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 border-b border-border">Category</th>
                    <th className="text-left p-3 border-b border-border">Key Question</th>
                    <th className="text-left p-3 border-b border-border">Why It Matters</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">Functional</td>
                    <td className="p-3 text-muted-foreground">Core job in one sentence?</td>
                    <td className="p-3 text-muted-foreground">Prevents scope creep</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">Correctness</td>
                    <td className="p-3 text-muted-foreground">Strong vs eventual consistency?</td>
                    <td className="p-3 text-muted-foreground">Drives DB and architecture choices</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">Scale</td>
                    <td className="p-3 text-muted-foreground">Expected QPS now and in 2 years?</td>
                    <td className="p-3 text-muted-foreground">Sizes the system appropriately</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">Availability</td>
                    <td className="p-3 text-muted-foreground">Target SLA (99.9% vs 99.99%)?</td>
                    <td className="p-3 text-muted-foreground">Determines redundancy needs</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">Interface</td>
                    <td className="p-3 text-muted-foreground">Sync or async response needed?</td>
                    <td className="p-3 text-muted-foreground">Shapes API and processing model</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">Data</td>
                    <td className="p-3 text-muted-foreground">Append-only or mutable?</td>
                    <td className="p-3 text-muted-foreground">Impacts auditability and schema</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">Security</td>
                    <td className="p-3 text-muted-foreground">Any regulated data (PCI, GDPR)?</td>
                    <td className="p-3 text-muted-foreground">Adds encryption/compliance requirements</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">Ops</td>
                    <td className="p-3 text-muted-foreground">Single or multi-region?</td>
                    <td className="p-3 text-muted-foreground">Affects latency and DR strategy</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-foreground font-medium">Evolution</td>
                    <td className="p-3 text-muted-foreground">Future features to anticipate?</td>
                    <td className="p-3 text-muted-foreground">Avoid painting into corners</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* Interview Flow */}
          <Section>
            <h2 className="text-xl font-bold text-foreground mb-4">Interview Flow</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">1</span>
                <div>
                  <p className="font-medium text-foreground">Clarify (5-10 min)</p>
                  <p className="text-sm text-muted-foreground">Ask questions from each category. Write down constraints.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">2</span>
                <div>
                  <p className="font-medium text-foreground">Scope (2-3 min)</p>
                  <p className="text-sm text-muted-foreground">Agree on what you will and will not cover in this session.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">3</span>
                <div>
                  <p className="font-medium text-foreground">High-Level Design (15-20 min)</p>
                  <p className="text-sm text-muted-foreground">Draw components, APIs, data flow. Reference your constraints.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">4</span>
                <div>
                  <p className="font-medium text-foreground">Deep Dive (10-15 min)</p>
                  <p className="text-sm text-muted-foreground">Pick 1-2 areas to go deep. Schema, consistency, failure handling.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">5</span>
                <div>
                  <p className="font-medium text-foreground">Wrap Up (5 min)</p>
                  <p className="text-sm text-muted-foreground">Summarize tradeoffs, mention what you would do with more time.</p>
                </div>
              </div>
            </div>
          </Section>

          {/* Practice Scenarios */}
          <Section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Practice Scenarios
            </h2>
            <p className="text-muted-foreground mb-4">
              For each prompt, identify the key questions you would ask before designing.
            </p>

            <PracticeScenario
              title="Design a Payment Processing System"
              prompt="Build a system that processes credit card payments for an e-commerce platform."
              keyQuestions={[
                "Strong consistency required? (likely yes - money)",
                "Expected TPS now and in 2 years?",
                "Do we need to handle refunds, chargebacks?",
                "PCI-DSS compliance required?",
                "Sync response (card approved/declined) or async?",
                "Multi-currency support needed?",
                "What PSPs/gateways do we integrate with?"
              ]}
            />

            <PracticeScenario
              title="Design a Real-Time Chat System"
              prompt="Build a messaging system like Slack or WhatsApp for a company."
              keyQuestions={[
                "How many concurrent users? (scale)",
                "Message delivery guarantees - at-least-once? exactly-once?",
                "Do we need message history/search?",
                "Group chats? Max group size?",
                "Presence (online/offline status)?",
                "End-to-end encryption required?",
                "Mobile push notifications?"
              ]}
            />

            <PracticeScenario
              title="Design a URL Shortener"
              prompt="Build a service like bit.ly that shortens URLs."
              keyQuestions={[
                "Expected URLs created per day?",
                "Read:write ratio? (likely high reads)",
                "URL expiration? Custom aliases?",
                "Analytics (click counts, referrers)?",
                "Latency requirements for redirects?",
                "Geographic distribution of users?",
                "Rate limiting per user?"
              ]}
            />

            <PracticeScenario
              title="Design a Stock Trading Platform"
              prompt="Build a system for placing and executing stock trades."
              keyQuestions={[
                "Strong consistency for order matching? (yes - money)",
                "Latency requirements? (likely < 10ms for matching)",
                "Order types supported? (limit, market, stop-loss)",
                "Pre-market/after-hours trading?",
                "Real-time price feeds?",
                "Regulatory/audit requirements?",
                "Position and P&L calculations real-time?"
              ]}
            />

            <PracticeScenario
              title="Design a Notification Service"
              prompt="Build a system that sends push, email, and SMS notifications."
              keyQuestions={[
                "Volume - notifications per day?",
                "Latency - real-time or batch OK?",
                "Delivery guarantees - at-least-once? retry policy?",
                "User preferences (opt-out, quiet hours)?",
                "Rate limiting per user to avoid spam?",
                "Multi-channel (push + email) per event?",
                "Tracking (delivered, opened, clicked)?"
              ]}
            />

            <PracticeScenario
              title="Design a Rate Limiter"
              prompt="Build a distributed rate limiting service for an API gateway."
              keyQuestions={[
                "Rate limit by what? (user, IP, API key)",
                "Limits - per second, minute, hour?",
                "Hard limit (block) or soft (degrade)?",
                "Distributed across multiple servers?",
                "Latency budget? (must be very fast)",
                "Different tiers/plans with different limits?",
                "Burst allowance or strict?"
              ]}
            />

            <PracticeScenario
              title="Design a Search Autocomplete"
              prompt="Build a typeahead search suggestion system like Google search."
              keyQuestions={[
                "Latency requirement? (< 100ms for good UX)",
                "Personalized suggestions or global?",
                "How often do suggestions update?",
                "Support typo correction?",
                "Multi-language?",
                "Offensive content filtering?",
                "Expected QPS?"
              ]}
            />

            <PracticeScenario
              title="Design a Ride-Sharing Service"
              prompt="Build the backend for matching riders with drivers like Uber."
              keyQuestions={[
                "Real-time location updates - how often?",
                "Matching algorithm criteria? (distance, rating, ETA)",
                "Surge pricing?",
                "Strong consistency for ride state?",
                "Payment integration?",
                "Driver/rider ratings?",
                "Geographic coverage - single city or global?"
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="quiz">
          <AskingQuestionsQuiz />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const quizQuestions = [
  {
    question: "Why should you spend 5-10 minutes asking clarifying questions at the start of a system design interview?",
    options: [
      "To waste time",
      "To show maturity, uncover constraints, and ensure you solve the right problem",
      "To avoid drawing diagrams",
      "Interviewers expect exactly 10 questions"
    ],
    correctIndex: 1,
    explanation: "Clarifying questions demonstrate senior thinking, surface hidden requirements, and prevent designing the wrong system. It's a critical first step."
  },
  {
    question: "What question helps identify if you need strong consistency vs eventual consistency?",
    options: [
      "How many users do we have?",
      "What is the worst thing that can happen from a user's POV?",
      "What language should we use?",
      "How many servers do we need?"
    ],
    correctIndex: 1,
    explanation: "Understanding the worst-case scenario (e.g., double-charging vs stale data) reveals whether eventual consistency is acceptable or if strong consistency is required."
  },
  {
    question: "Why ask about expected QPS/TPS now AND in 1-2 years?",
    options: [
      "To impress the interviewer with math",
      "To size the system appropriately and plan for scaling",
      "To avoid building anything",
      "QPS does not matter for system design"
    ],
    correctIndex: 1,
    explanation: "Knowing current and future scale helps you design appropriately—avoiding over-engineering for small scale or under-engineering for growth."
  },
  {
    question: "What does asking 'sync or async response?' determine?",
    options: [
      "The programming language to use",
      "Whether the caller needs immediate results or can accept 'accepted, processed later'",
      "Database choice",
      "Number of servers"
    ],
    correctIndex: 1,
    explanation: "This shapes the entire architecture—sync requires blocking calls and lower latency; async allows queues, eventual processing, and better throughput."
  },
  {
    question: "Why ask about append-only vs mutable records for financial systems?",
    options: [
      "Append-only uses less storage",
      "Append-only provides auditability and history reconstruction",
      "Mutable is always better",
      "It does not matter"
    ],
    correctIndex: 1,
    explanation: "Append-only (journal-style) records create an immutable audit trail—critical for financial systems where you must prove what happened and when."
  },
  {
    question: "What availability does 99.9% SLA roughly translate to?",
    options: [
      "52 minutes downtime per year",
      "8.7 hours downtime per year",
      "No downtime ever",
      "1 day downtime per month"
    ],
    correctIndex: 1,
    explanation: "99.9% allows ~8.7 hours of downtime per year. 99.99% is ~52 minutes. Understanding this helps set realistic expectations and redundancy requirements."
  },
  {
    question: "Why ask 'Can upstream send duplicates? How should we handle retries?'",
    options: [
      "To avoid building retry logic",
      "To determine idempotency requirements",
      "Duplicates never happen",
      "To reduce code complexity"
    ],
    correctIndex: 1,
    explanation: "If duplicates can occur (network retries, client bugs), you need idempotency mechanisms (idempotency keys, deduplication) to prevent double-processing."
  },
  {
    question: "What does asking about PCI/GDPR/regulated data reveal?",
    options: [
      "Which cloud to use",
      "Additional encryption, audit, and compliance requirements",
      "Programming language choice",
      "Team size needed"
    ],
    correctIndex: 1,
    explanation: "Regulated data adds requirements like encryption at rest, audit logs, data retention policies, and access controls that must be designed in from the start."
  },
  {
    question: "Why is 'Who calls this system?' an important question?",
    options: [
      "To decide on office location",
      "To shape API design, auth requirements, and understand traffic patterns",
      "It is not important",
      "To count users"
    ],
    correctIndex: 1,
    explanation: "Different clients (mobile apps, internal services, external partners) have different auth needs, latency expectations, and API preferences."
  },
  {
    question: "What does asking about future features demonstrate?",
    options: [
      "You want to over-engineer",
      "Senior thinking—designing for extensibility without over-engineering",
      "You are avoiding the current problem",
      "You do not know what to build"
    ],
    correctIndex: 1,
    explanation: "Considering future evolution shows maturity. You can design flexible schemas and interfaces without building everything now—avoiding painting into corners."
  },
  {
    question: "Why ask 'If a dependency goes down, should we fail closed or degrade gracefully?'",
    options: [
      "To avoid building error handling",
      "To understand failure behavior and design circuit breakers/fallbacks appropriately",
      "Dependencies never fail",
      "To reduce testing"
    ],
    correctIndex: 1,
    explanation: "Some systems must fail closed (block operations) for safety; others should degrade (serve cached data). This shapes your resilience patterns."
  },
  {
    question: "What is the recommended time allocation for clarifying questions in a 45-min interview?",
    options: [
      "30 minutes",
      "5-10 minutes",
      "0 minutes—jump straight to design",
      "The entire interview"
    ],
    correctIndex: 1,
    explanation: "5-10 minutes is ideal—enough to gather requirements without eating into design time. It sets you up for a focused, relevant solution."
  },
  {
    question: "Why ask about ordering requirements (per user, per account, globally)?",
    options: [
      "To sort the database",
      "To determine partitioning strategy and event processing guarantees",
      "Ordering never matters",
      "To alphabetize records"
    ],
    correctIndex: 1,
    explanation: "If events must be processed in order per account, you partition by account_id. Global ordering is much harder. This shapes your messaging and concurrency design."
  },
  {
    question: "What should you do after asking clarifying questions?",
    options: [
      "Start coding immediately",
      "Agree on scope—what you will and will not cover in the session",
      "Ask more questions for 30 minutes",
      "End the interview"
    ],
    correctIndex: 1,
    explanation: "After clarifying, explicitly scope the design. Agree with the interviewer on what to focus on, preventing wasted time on out-of-scope areas."
  }
];

const AskingQuestionsQuiz = () => {
  return <Quiz questions={quizQuestions} />;
};

export { AskingQuestionsQuiz };
