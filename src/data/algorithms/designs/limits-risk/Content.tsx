import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section, Paragraph, Heading, Code } from "@/components/AlgorithmContent";
import { Callout } from "@/components/Callout";
import { Quiz, QuizQuestion } from "@/components/Quiz";
import limitsRiskArchitecture from "@/assets/limits-risk-architecture.png";

const quizQuestions: QuizQuestion[] = [
  {
    question: "In the pending+confirmed pattern, what happens when two concurrent £20 checks hit a £30 limit with used=0?",
    options: [
      "Both are allowed, causing an overspend",
      "First one succeeds, second fails due to atomic UPDATE",
      "Both are denied to be safe",
      "The system deadlocks"
    ],
    correctIndex: 1,
    explanation: "The atomic UPDATE with WHERE (confirmed + pending + amount) <= limit serializes the checks. First UPDATE increments pending to 20 and succeeds; second sees 0+20+20=40>30 and affects 0 rows → DENY."
  },
  {
    question: "Why does the limit check use a single UPDATE statement rather than SELECT then UPDATE?",
    options: [
      "It's faster to execute",
      "It prevents read-then-write race conditions",
      "It uses less memory",
      "It's easier to debug"
    ],
    correctIndex: 1,
    explanation: "A single atomic UPDATE with the check in the WHERE clause prevents the race where two transactions both read the same value, both see headroom, and both increment - the DB serializes the updates."
  },
  {
    question: "What happens when a TransferCompleted event is delivered twice to the Limits & Risk service?",
    options: [
      "pending_cents is decremented twice",
      "confirmed_cents is incremented twice",
      "Second delivery is ignored due to risk_inbox PK",
      "An error is thrown"
    ],
    correctIndex: 2,
    explanation: "The risk_inbox table uses event_id as primary key. First insert succeeds and processes; second insert causes PK conflict and is treated as already processed (no-op)."
  },
  {
    question: "What is the purpose of the reservations table?",
    options: [
      "To store limit configuration",
      "To track which operations have pending usage held",
      "To log all API requests",
      "To store confirmed usage history"
    ],
    correctIndex: 1,
    explanation: "The reservations table tracks individual operations that have been ALLOWed (status=PENDING), so when completion/failure events arrive, the system knows which operation's pending usage to release or confirm."
  },
  {
    question: "If a transaction is ALLOWed but never completes (no event arrives), what happens to the pending usage?",
    options: [
      "It stays forever, causing permanent headroom loss",
      "It's automatically released after a configurable TTL",
      "confirmed_cents is incremented anyway",
      "The limit is increased to compensate"
    ],
    correctIndex: 1,
    explanation: "A scheduled job scans for old PENDING reservations past a TTL and cancels them by subtracting from pending_cents. This prevents orphaned reservations from permanently blocking headroom."
  },
  {
    question: "Why does the system track both confirmed_cents and pending_cents separately?",
    options: [
      "For auditing purposes only",
      "To handle in-flight operations without blocking new checks",
      "To support different limit types",
      "For backwards compatibility"
    ],
    correctIndex: 1,
    explanation: "Pending usage holds headroom for in-flight operations. The check uses (confirmed + pending + amount) <= limit, so new operations correctly see already-reserved amounts without waiting for async confirmation."
  },
  {
    question: "What does the Limits & Risk service return on a successful limit check?",
    options: [
      "The remaining headroom",
      "ALLOW with the operation_id stored",
      "A reservation token to pass to other services",
      "The updated balance"
    ],
    correctIndex: 1,
    explanation: "POST /check returns ALLOW after atomically incrementing pending_cents and inserting a reservations row. The operation_id links the reservation to later completion/failure events."
  },
  {
    question: "In the async flow, what triggers moving usage from pending to confirmed?",
    options: [
      "A scheduled batch job",
      "The client calling a confirm endpoint",
      "A TransferCompleted/TradeExecuted event via the broker",
      "Automatic timeout"
    ],
    correctIndex: 2,
    explanation: "The Transaction Service emits completion events via its outbox. The broker delivers these to Limits & Risk, which processes them idempotently to move pending → confirmed."
  },
  {
    question: "What happens if a limit check arrives while a completion event is being processed for the same account?",
    options: [
      "The check must wait for the event to complete",
      "The check sees a consistent (confirmed + pending) due to row-level atomicity",
      "The check always fails during event processing",
      "A distributed lock prevents this scenario"
    ],
    correctIndex: 1,
    explanation: "Each operation (check or event handling) does an atomic UPDATE on the same limits_state row. The DB serializes these; the check sees whatever committed state exists, and the sum is consistent."
  },
  {
    question: "Why is operation_id important in the reservations table?",
    options: [
      "To generate unique IDs for events",
      "To link the initial reservation to later completion/failure events",
      "To partition data across shards",
      "To order events chronologically"
    ],
    correctIndex: 1,
    explanation: "When TransferCompleted or TransferFailed arrives with an operation_id, the system looks up the matching reservation to know which pending amount to move to confirmed or release."
  },
  {
    question: "What should happen if POST /check is called with the same operation_id twice?",
    options: [
      "Return DENY on the second call",
      "Increment pending_cents again",
      "Return the result of the first check (idempotent)",
      "Create a new reservation with a different ID"
    ],
    correctIndex: 2,
    explanation: "If (account_id, operation_id) already exists in reservations, the check should return the existing result rather than creating a duplicate reservation. This makes the API idempotent for retries."
  },
  {
    question: "What is the 'single source of truth' for limit enforcement?",
    options: [
      "The Transaction Service's local cache",
      "The limits_state row in the Limits & Risk DB",
      "The broker's event log",
      "The client's request payload"
    ],
    correctIndex: 1,
    explanation: "The limits_state row holds confirmed_cents and pending_cents. All checks and updates go through atomic operations on this row, making it the authoritative source for whether an operation should be allowed."
  }
];

export const LimitsRiskContent = () => {
  return (
    <Tabs defaultValue="architecture" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="architecture">Architecture</TabsTrigger>
        <TabsTrigger value="flows">Flows</TabsTrigger>
        <TabsTrigger value="races">Race Conditions</TabsTrigger>
        <TabsTrigger value="quiz">Quiz</TabsTrigger>
      </TabsList>

      <TabsContent value="architecture" className="space-y-6">
        <Section>
          <Paragraph>
            The Limits & Risk Service enforces per-account limits (credit, volume, per-asset) using a **pending + confirmed** pattern. It provides synchronous ALLOW/DENY decisions while handling async completion events to finalize usage.
          </Paragraph>
        </Section>

        <div className="my-6">
          <img 
            src={limitsRiskArchitecture} 
            alt="Limits & Risk Service Architecture" 
            className="w-full rounded-lg border border-border"
          />
        </div>

        <Section title="Core Components">
          <div className="grid gap-4">
            <Callout type="info" title="Limits & Risk Service">
              Stores per-account limits config and current usage state. Exposes sync `POST /check` API returning ALLOW/DENY. Consumes completion/failure events to move pending → confirmed.
            </Callout>
            <Callout type="info" title="Transaction Service">
              Wallet, payment, or order service. Calls Limits & Risk before proceeding. Emits completion events via outbox → broker.
            </Callout>
            <Callout type="info" title="Broker">
              Carries events (TransferCompleted, TradeExecuted, etc.) from Transaction Service to Limits & Risk with at-least-once delivery.
            </Callout>
          </div>
        </Section>

        <Section title="Data Model">
          <Code language="sql">{`-- Limit configuration per account/product
limits_config(
  account_id, product, limit_cents, ...
)

-- Current usage state (the key row for enforcement)
limits_state(
  account_id, product, business_date,
  confirmed_cents, pending_cents, version
)

-- Idempotent event processing
risk_inbox(
  event_id PK, event_type, payload, status, ...
)

-- Track individual operations
reservations(
  operation_id PK, account_id, product,
  amount_cents, status  -- PENDING | CONFIRMED | CANCELLED
)`}</Code>
        </Section>

        <Callout type="tip" title="Key Insight">
          The limits_state row is the single source of truth. Concurrency is handled by the DB via atomic UPDATE, not by multiple services guessing.
        </Callout>
      </TabsContent>

      <TabsContent value="flows" className="space-y-6">
        <Section title="Flow 1: Sync Limit Check (Reserve Pending)">
          <Paragraph>
            Transaction Service receives a request (transfer/payment/order) with `operation_id`, `account_id`, `product`, `amount_cents`.
          </Paragraph>
          
          <Heading>Transaction Service → Limits & Risk: POST /check</Heading>
          <Paragraph>Payload includes operation_id.</Paragraph>

          <Heading>Atomic Reservation (Single DB Transaction)</Heading>
          <Code language="sql">{`-- Read limit config
SELECT limit_cents FROM limits_config
WHERE account_id = :account_id AND product = :product;

-- Atomic check + increment pending
UPDATE limits_state
SET
  pending_cents = pending_cents + :amount,
  version       = version + 1
WHERE
  account_id = :account_id
  AND product = :product
  AND business_date = :today
  AND (confirmed_cents + pending_cents + :amount) <= :limit;

-- If rows_affected = 1:
--   Insert reservations(operation_id, ..., status='PENDING')
--   Return ALLOW
-- If rows_affected = 0:
--   Return DENY`}</Code>

          <Callout type="warning" title="Key Point">
            The limit check + increment of pending_cents is one atomic UPDATE. That's where you kill the "two checks race".
          </Callout>

          <Paragraph>
            If DENY → reject request. If ALLOW → proceed to create the transaction and go through outbox → broker → ledger flow.
          </Paragraph>
        </Section>

        <Section title="Flow 2: Transaction Completes → Confirmed Usage">
          <Paragraph>
            Transaction Service completes the operation and emits an event via its outbox (e.g., `TransferCompleted` or `TradeExecuted`) with the original operation_id and amount_cents.
          </Paragraph>

          <Heading>Broker → Limits & Risk</Heading>
          <Code language="sql">{`-- In single DB transaction:

-- Idempotent insert
INSERT INTO risk_inbox(event_id, ...)
-- If PK conflict → duplicate → ignore

-- Find matching reservation
SELECT * FROM reservations WHERE operation_id = :operation_id;

-- If reservation exists and status='PENDING':
UPDATE limits_state
SET
  pending_cents = pending_cents - :amount,
  confirmed_cents = confirmed_cents + :amount
WHERE account_id = :account_id AND product = :product;

UPDATE reservations SET status = 'CONFIRMED'
WHERE operation_id = :operation_id;

COMMIT;`}</Code>

          <Callout type="tip" title="Result">
            Usage is now in confirmed_cents. pending_cents only reflects other in-flight operations.
          </Callout>
        </Section>

        <Section title="Flow 3: Failure / Cancellation">
          <Paragraph>
            If the operation fails after being ALLOWed, or is later reversed, Transaction Service emits a `TransferFailed` / `OrderRejected` / `ReversalCompleted` event with the same operation_id.
          </Paragraph>

          <Code language="sql">{`-- Risk consumes event:
INSERT INTO risk_inbox(event_id, ...) -- dedupe

-- Look up reservation
SELECT * FROM reservations WHERE operation_id = :operation_id;

-- If still PENDING:
UPDATE limits_state
SET pending_cents = pending_cents - :amount
WHERE account_id = :account_id AND product = :product;

UPDATE reservations SET status = 'CANCELLED'
WHERE operation_id = :operation_id;`}</Code>

          <Callout type="info" title="Expiry Job">
            A periodic job scans for old PENDING reservations past a TTL and cancels them. This handles cases where no completion event ever arrives.
          </Callout>
        </Section>
      </TabsContent>

      <TabsContent value="races" className="space-y-6">
        <Callout type="warning" title="Interview Focus">
          These are the exact scenarios interviewers push on. Have crisp answers ready.
        </Callout>

        <Section title="Race 1: Two Concurrent Checks (Same Account)">
          <Paragraph>
            **Scenario**: Two transfers of £20 each hit at the same time, with a £30 limit and used=0. How do you stop both being allowed?
          </Paragraph>

          <Heading>Answer</Heading>
          <div className="space-y-2">
            <Paragraph>Both requests hit `POST /check`. Limits & Risk uses the single UPDATE with `WHERE confirmed + pending + amount {'<='} limit`.</Paragraph>
            <Paragraph>The DB serializes those:</Paragraph>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
              <li>First one acquires the row, updates pending_cents 0→20, succeeds</li>
              <li>Second then evaluates: 0 + 20 + 20 = 40 {'>'} 30, UPDATE affects 0 rows</li>
            </ul>
            <Paragraph>First call returns ALLOW, second returns DENY.</Paragraph>
          </div>

          <Callout type="tip" title="Key Quote">
            "The row in limits_state is the single source of truth; concurrency is handled by the DB, not by multiple services guessing."
          </Callout>
        </Section>

        <Section title="Race 2: Event Arrives While New Check Happens">
          <Paragraph>
            **Scenario**: One operation just completed and is being confirmed via event; another new operation is being checked at the same time. Could you under- or over-count?
          </Paragraph>

          <Heading>Answer</Heading>
          <div className="space-y-2">
            <Paragraph>We're always using both confirmed_cents and pending_cents in the same row.</Paragraph>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
              <li>Event handler moves some amount from pending→confirmed</li>
              <li>New POST /check sees whatever (confirmed + pending) is committed at the moment of its UPDATE</li>
              <li>Because check does `confirmed + pending + amount {'<='} limit` in a single UPDATE, it doesn't matter whether confirmation happens just before or after</li>
            </ul>
          </div>

          <Callout type="info" title="Properties">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>No overshoot</strong>: atomic UPDATE guards the sum</li>
              <li><strong>Monotonic</strong>: pending decreases exactly once, confirmed increases exactly once (idempotent by event_id and operation_id)</li>
            </ul>
          </Callout>
        </Section>

        <Section title="Race 3: Duplicate / Retried Events">
          <Paragraph>
            **Scenario**: What if the same TransferCompleted event is delivered twice?
          </Paragraph>

          <Heading>Answer</Heading>
          <Paragraph>
            It goes through `risk_inbox(event_id PK)`:
          </Paragraph>
          <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
            <li>First time → insert, process, move pending→confirmed</li>
            <li>Second time → PK conflict → already processed, do nothing</li>
          </ul>
          <Paragraph>
            Even without risk_inbox, you can dedupe on operation_id by checking reservation status is already CONFIRMED.
          </Paragraph>
        </Section>

        <Section title="Race 4: Reservation But Transaction Never Completes">
          <Paragraph>
            **Scenario**: What if you ALLOW, increment pending, but the transaction fails and no event ever arrives?
          </Paragraph>

          <Heading>Answer</Heading>
          <div className="space-y-2">
            <Paragraph>Reservation stays PENDING, so it still "holds" headroom.</Paragraph>
            <Paragraph>A scheduled job:</Paragraph>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
              <li>Scans for old PENDING reservations</li>
              <li>Checks with source system (optional) or assumes dead after TTL</li>
              <li>Cancels them by subtracting from pending_cents</li>
            </ul>
          </div>

          <Callout type="tip" title="Key Quote">
            "In practice we'd pick an expiry window that matches the max time we expect a transaction to complete; anything older is released. If you want stronger guarantees you can call back into Risk explicitly on failure."
          </Callout>
        </Section>
      </TabsContent>

      <TabsContent value="quiz" className="space-y-6">
        <Quiz questions={quizQuestions} title="Limits & Risk Service Quiz" />
      </TabsContent>
    </Tabs>
  );
};
