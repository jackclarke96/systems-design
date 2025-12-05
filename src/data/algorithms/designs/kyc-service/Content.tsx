import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section, Paragraph, Heading, Code, Callout } from "@/components/AlgorithmContent";
import { Quiz } from "@/components/Quiz";
import kycArchitecture from "@/assets/kyc-service-architecture.png";

const quizQuestions = [
  {
    question: "What is the primary purpose of the provider_webhook_inbox table?",
    options: [
      "To store KYC application data",
      "To deduplicate provider webhooks using event_id as primary key",
      "To cache provider API responses",
      "To store user documents"
    ],
    correctIndex: 1,
    explanation: "The provider_webhook_inbox uses provider_event_id as PK. On insert, if there's a PK conflict, we know it's a duplicate and ignore it. This ensures at-least-once delivery from providers doesn't corrupt state."
  },
  {
    question: "How does the KYC Service determine the overall application state when a check completes?",
    options: [
      "It always uses the latest check result",
      "It averages all check scores",
      "Any FAIL → REJECTED; any NEEDS_REVIEW → IN_REVIEW; all required PASS → APPROVED",
      "The user manually approves"
    ],
    correctIndex: 2,
    explanation: "The state machine follows a deterministic rule: any single FAIL causes REJECTED, any NEEDS_REVIEW keeps it IN_REVIEW for manual intervention, and only when all required checks PASS does the application become APPROVED."
  },
  {
    question: "Why do downstream services (wallet, trading) maintain a local user_kyc_state table?",
    options: [
      "To avoid calling the KYC Service API on every request",
      "To override KYC decisions",
      "To store additional user data",
      "To handle KYC appeals"
    ],
    correctIndex: 0,
    explanation: "By consuming KYC events and maintaining local state, downstream services can check KYC status synchronously without making an API call for every risky operation. This improves latency and reduces coupling."
  },
  {
    question: "What events does the KYC Service emit via the outbox pattern?",
    options: [
      "Only KycApproved",
      "KycApproved, KycRejected, KycNeedsReview, KycExpired",
      "ProviderWebhookReceived only",
      "CheckCompleted for each check"
    ],
    correctIndex: 1,
    explanation: "The KYC Service emits domain events for all significant state changes: KycApproved, KycRejected, KycNeedsReview, and KycExpired. These events drive downstream enforcement and compliance workflows."
  },
  {
    question: "How does the system handle KYC expiry?",
    options: [
      "Users must manually renew",
      "KYC never expires",
      "A scheduled job scans for old applications and emits KycExpired events",
      "Providers automatically trigger re-verification"
    ],
    correctIndex: 2,
    explanation: "A scheduled job in KYC Service scans for applications older than X months or users moved to higher risk segments. It updates state to EXPIRED and emits KycExpired via outbox, causing downstream services to restrict access."
  },
  {
    question: "What check types might a KYC application include?",
    options: [
      "Only ID document verification",
      "ID document, sanctions screening, PEP check, address verification",
      "Only credit score check",
      "Only email verification"
    ],
    correctIndex: 1,
    explanation: "Comprehensive KYC includes multiple check types: ID_DOCUMENT (passport/license), SANCTIONS (watchlist screening), PEP (politically exposed persons), ADDRESS (proof of address). Each is tracked separately in kyc_checks."
  },
  {
    question: "What happens if a provider webhook is delivered twice?",
    options: [
      "The check is processed twice, potentially corrupting state",
      "Insert into provider_webhook_inbox fails on PK conflict → duplicate ignored",
      "The system crashes",
      "The user is notified to resubmit"
    ],
    correctIndex: 1,
    explanation: "The provider_webhook_inbox uses provider_event_id as PK. The first delivery inserts successfully and processes. Subsequent deliveries hit a PK conflict and are safely ignored, ensuring idempotency."
  },
  {
    question: "Why is there a separate kyc_checks table rather than storing all checks in kyc_applications?",
    options: [
      "Database limitation",
      "To track each check type independently with its own state, provider IDs, and timestamps",
      "For performance only",
      "To support multiple users per application"
    ],
    correctIndex: 1,
    explanation: "Separate kyc_checks rows allow tracking each verification independently: which provider handled it, what the result was, when it completed. This supports auditing and allows re-running individual checks without affecting others."
  },
  {
    question: "How do downstream services ensure consistent KYC enforcement?",
    options: [
      "Each service implements its own KYC logic",
      "Users self-certify their KYC status",
      "All services consume the same KYC events or call the same status API",
      "KYC is only checked at signup"
    ],
    correctIndex: 2,
    explanation: "Consistent enforcement is achieved by having a single KYC Service as source of truth. All downstream systems (wallet, trading, compliance) either subscribe to the same KYC events or call the same GET /kyc/status endpoint."
  },
  {
    question: "What is the state machine for kyc_applications?",
    options: [
      "PENDING → APPROVED",
      "PENDING → IN_REVIEW → APPROVED / REJECTED / EXPIRED",
      "SUBMITTED → VERIFIED",
      "NEW → COMPLETE"
    ],
    correctIndex: 1,
    explanation: "The explicit state machine is: PENDING (submitted, awaiting checks) → IN_REVIEW (checks in progress or needs manual review) → APPROVED / REJECTED / EXPIRED (terminal states based on check outcomes or time)."
  },
  {
    question: "What does the Compliance UI subscribe to?",
    options: [
      "Only KycApproved events",
      "KycNeedsReview and KycExpired events for manual review queues",
      "Raw provider webhooks",
      "Database change streams"
    ],
    correctIndex: 1,
    explanation: "The Compliance UI subscribes to KycNeedsReview (for manual adjudication queues) and KycExpired (for re-verification campaigns). KycApproved/Rejected are informational but don't require compliance action."
  },
  {
    question: "Why does the KYC Service store the raw provider payload in the webhook inbox?",
    options: [
      "For debugging only",
      "To audit what the provider actually said and reconstruct decisions",
      "Providers require it",
      "To reduce API calls"
    ],
    correctIndex: 1,
    explanation: "Storing raw payloads enables full auditability: you can reconstruct exactly what information the provider returned, when, and how the system interpreted it. This is crucial for regulatory inquiries and dispute resolution."
  }
];

export const KycServiceContent = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="flows">Flows</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="space-y-6">
          <Section>
            <img 
              src={kycArchitecture} 
              alt="KYC Service Architecture" 
              className="w-full rounded-lg border border-border mb-6"
            />
          </Section>

          <Section title="Core Components">
            <div className="grid gap-4 md:grid-cols-2">
              <Callout type="info" title="KYC Service">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Exposes POST /kyc/applications, GET /kyc/status</li>
                  <li>Maintains KYC state machine</li>
                  <li>Orchestrates checks with third-party providers</li>
                  <li>Stores applications, checks, provider results in KYC DB</li>
                  <li>Emits KYC events via outbox (KycApproved, KycRejected, KycNeedsReview, KycExpired)</li>
                </ul>
              </Callout>
              <Callout type="info" title="3rd Party KYC Providers">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Document / selfie / liveliness checks</li>
                  <li>Sanctions / PEP screening</li>
                  <li>Address & fraud checks</li>
                  <li>Async APIs + webhooks (at-least-once delivery)</li>
                </ul>
              </Callout>
              <Callout type="info" title="Downstream Services">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Wallet Service (transactions/payments)</li>
                  <li>Order Service (trading)</li>
                  <li>Subscribe to KycApproved/KycRejected events</li>
                  <li>Gate risky operations on KYC state</li>
                </ul>
              </Callout>
              <Callout type="info" title="Compliance UI">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Subscribes to KycNeedsReview / KycExpired</li>
                  <li>Manual review queues for edge cases</li>
                  <li>Override capabilities for compliance officers</li>
                </ul>
              </Callout>
            </div>
          </Section>

          <Section title="Data Model">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-muted rounded-lg">
                <Heading>kyc_applications</Heading>
                <Code language="sql">{`-- One per user
user_id         UUID PK
state           ENUM(PENDING, IN_REVIEW, 
                     APPROVED, REJECTED, EXPIRED)
submitted_at    TIMESTAMP
updated_at      TIMESTAMP
-- personal data, address, etc.`}</Code>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <Heading>kyc_checks</Heading>
                <Code language="sql">{`application_id  UUID FK
check_type      ENUM(ID_DOCUMENT, SANCTIONS, 
                     PEP, ADDRESS, ...)
state           ENUM(PENDING, COMPLETED_PASS, 
                     COMPLETED_FAIL, NEEDS_REVIEW)
provider_check_id  VARCHAR
result_payload  JSONB
completed_at    TIMESTAMP`}</Code>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <Heading>provider_webhook_inbox</Heading>
                <Code language="sql">{`provider_event_id  VARCHAR PK  -- dedupe key
provider_check_id  VARCHAR
result             ENUM(PASS, FAIL, MANUAL_REVIEW)
raw_payload        JSONB
status             ENUM(RECEIVED, PROCESSED)
received_at        TIMESTAMP`}</Code>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <Heading>outbox_events</Heading>
                <Code language="sql">{`event_id        UUID PK
event_type      VARCHAR  -- KycApproved, KycRejected, etc.
aggregate_id    UUID     -- user_id or application_id
payload         JSONB
created_at      TIMESTAMP
published_at    TIMESTAMP NULL`}</Code>
              </div>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="flows" className="space-y-6">
          <Section title="Flow 1: Submit / Update KYC">
            <Callout type="info" title="Client → API Gateway → KYC Service">
              <Paragraph>POST /kyc/applications (or PUT /kyc/applications/{`{id}`}) with personal data, address, document images, selfie, etc.</Paragraph>
            </Callout>
            
            <Heading>KYC Service – Create/Update Records</Heading>
            <Code language="sql">{`-- In a single DB transaction:
INSERT INTO kyc_applications (user_id, state, submitted_at)
VALUES (:user_id, 'PENDING', NOW())
ON CONFLICT (user_id) DO UPDATE SET state = 'IN_REVIEW', updated_at = NOW();

-- Create check rows for each verification type
INSERT INTO kyc_checks (application_id, check_type, state)
VALUES 
  (:app_id, 'ID_DOCUMENT', 'PENDING'),
  (:app_id, 'SANCTIONS', 'PENDING'),
  (:app_id, 'PEP', 'PENDING'),
  (:app_id, 'ADDRESS', 'PENDING');`}</Code>

            <Heading>Fan Out to Providers</Heading>
            <Paragraph>For each check type, call the appropriate 3rd Party KYC Provider API with check_id/kyc_application_id. Store provider correlation ID on the kyc_checks row. Optionally emit KycSubmitted/KycInReview event into outbox_events for Compliance UI.</Paragraph>
          </Section>

          <Section title="Flow 2: Provider Results via Webhooks">
            <Callout type="warning" title="Provider → KYC Service Webhook">
              <Paragraph>Provider calls webhook with: provider_event_id (unique), provider_check_id, result (PASS/FAIL/MANUAL_REVIEW), raw payload.</Paragraph>
            </Callout>

            <Heading>Webhook Inbox & Dedupe</Heading>
            <Code language="sql">{`-- Start DB txn
INSERT INTO provider_webhook_inbox (provider_event_id, provider_check_id, result, raw_payload, status)
VALUES (:event_id, :check_id, :result, :payload, 'RECEIVED');
-- If PK conflict → duplicate → ignore and return 200

-- Find and update the check
UPDATE kyc_checks 
SET state = CASE 
    WHEN :result = 'PASS' THEN 'COMPLETED_PASS'
    WHEN :result = 'FAIL' THEN 'COMPLETED_FAIL'
    ELSE 'NEEDS_REVIEW'
  END,
  result_payload = :payload,
  completed_at = NOW()
WHERE provider_check_id = :check_id;`}</Code>

            <Heading>Recompute Application State</Heading>
            <Code language="go">{`// Determine overall application state from all checks
func computeApplicationState(checks []KycCheck) ApplicationState {
    for _, c := range checks {
        if c.State == "COMPLETED_FAIL" {
            return REJECTED  // Any fail → reject
        }
    }
    for _, c := range checks {
        if c.State == "NEEDS_REVIEW" || c.State == "PENDING" {
            return IN_REVIEW  // Any pending/review → still in review
        }
    }
    return APPROVED  // All required checks passed
}`}</Code>

            <Heading>Emit Domain Event via Outbox</Heading>
            <Paragraph>In the same transaction where state changes, insert into outbox_events (KycApproved | KycRejected | KycNeedsReview). Mark inbox row status = PROCESSED. Commit. Outbox worker publishes to broker → consumers.</Paragraph>
          </Section>

          <Section title="Flow 3: Enforcing KYC in Wallet/Trading">
            <Callout type="tip" title="Event-Driven Enforcement">
              <Paragraph>Wallet/Trading Service subscribes to KycApproved/KycRejected/KycExpired and maintains a local user_kyc_state(user_id, state) table.</Paragraph>
            </Callout>

            <Code language="go">{`// When handling risky operations (open wallet, trade, withdraw)
func (s *WalletService) HandleWithdraw(ctx context.Context, req WithdrawRequest) error {
    kycState, err := s.userKycRepo.GetState(ctx, req.UserID)
    if err != nil {
        return err
    }
    
    if kycState != KycApproved {
        return ErrKycRequired  // or ErrKycExpired
    }
    
    // Proceed with withdrawal...
    return s.processWithdraw(ctx, req)
}`}</Code>

            <Paragraph>Compliance UI subscribes to KycNeedsReview/KycRejected/KycExpired to show queues for manual review.</Paragraph>
          </Section>

          <Section title="Flow 4: Expiry / Periodic Review">
            <Callout type="warning" title="Scheduled Job">
              <Paragraph>KYC Service scans kyc_applications for: KYC older than X months, or users moved to higher risk segment.</Paragraph>
            </Callout>

            <Code language="go">{`// Periodic expiry job
func (j *ExpiryJob) Run(ctx context.Context) error {
    // Find applications older than expiry threshold
    expired, err := j.repo.FindExpiredApplications(ctx, j.expiryMonths)
    if err != nil {
        return err
    }
    
    for _, app := range expired {
        // Update state and emit event in single tx
        err := j.repo.WithTx(ctx, func(tx Tx) error {
            tx.UpdateState(app.ID, "EXPIRED")
            tx.InsertOutboxEvent("KycExpired", app.UserID, map[string]any{
                "application_id": app.ID,
                "reason": "periodic_expiry",
            })
            return nil
        })
        if err != nil {
            log.Error("Failed to expire KYC", "app_id", app.ID, "err", err)
        }
    }
    return nil
}`}</Code>
          </Section>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <Section title="Key Properties & How They're Achieved">
            <div className="space-y-6">
              <Callout type="tip" title="1. Only KYC-approved users can use core features">
                <Paragraph><strong>Achieved by:</strong></Paragraph>
                <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                  <li>Wallet/trading services gate risky APIs (funding, trading, withdrawals) on KYC state</li>
                  <li>Either by local user_kyc_state maintained from KycApproved/KycRejected/KycExpired events</li>
                  <li>Or by calling GET /kyc/status on KYC Service</li>
                  <li>If state ≠ APPROVED, operations are rejected or restricted</li>
                </ul>
              </Callout>

              <Callout type="tip" title="2. Reliable, idempotent provider integration">
                <Paragraph><strong>Achieved by:</strong></Paragraph>
                <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                  <li>All provider webhooks go through provider_webhook_inbox(provider_event_id PK, status, payload, ...)</li>
                  <li>Insert-first pattern: first time → row inserted, KYC state updated</li>
                  <li>Retries/duplicates → PK conflict → ignored</li>
                  <li>Updates to kyc_checks are idempotent: new status is pure function of (old_status, provider_result)</li>
                  <li><strong>Result:</strong> Providers can retry webhooks at-least-once without corrupting state</li>
                </ul>
              </Callout>

              <Callout type="tip" title="3. Clear, auditable KYC lifecycle">
                <Paragraph><strong>Achieved by:</strong></Paragraph>
                <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                  <li>Explicit state machine on kyc_applications: PENDING → IN_REVIEW → APPROVED / REJECTED / EXPIRED</li>
                  <li>Separate kyc_checks table records each check type, provider IDs, results, timestamps</li>
                  <li>Webhook inbox keeps raw provider payloads</li>
                  <li>Outbox events (KycApproved/Rej/NeedsReview/Expired) are stored and timestamped</li>
                  <li><strong>Anyone can reconstruct:</strong> which checks were run, which provider said what, why the final decision was made</li>
                </ul>
              </Callout>

              <Callout type="tip" title="4. Consistent enforcement across services">
                <Paragraph><strong>Achieved by:</strong></Paragraph>
                <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                  <li>Single KYC Service as source of truth for KYC state</li>
                  <li>All downstream systems (wallet, trading, compliance) listen to the same KYC events or call the same status API</li>
                  <li>Consumers use their own inbox pattern (event_id PK) so duplicate KYC events don't flip state back and forth</li>
                  <li><strong>Prevents:</strong> "trading lets you in but wallet doesn't" scenarios</li>
                </ul>
              </Callout>
            </div>
          </Section>

          <Section title="State Machine">
            <div className="p-4 bg-muted rounded-lg">
              <Code language="text">{`┌─────────┐
│ PENDING │ ─── checks submitted, awaiting provider results
└────┬────┘
     │
     ▼
┌───────────┐
│ IN_REVIEW │ ─── checks in progress, or NEEDS_REVIEW from provider
└─────┬─────┘
      │
      ├──────────────┬──────────────┐
      ▼              ▼              ▼
┌──────────┐  ┌──────────┐  ┌─────────┐
│ APPROVED │  │ REJECTED │  │ EXPIRED │
└──────────┘  └──────────┘  └─────────┘
     │
     │ (after X months)
     ▼
┌─────────┐
│ EXPIRED │
└─────────┘`}</Code>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-6">
          <Quiz questions={quizQuestions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
