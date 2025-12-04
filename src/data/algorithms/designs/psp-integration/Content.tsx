import { useState } from "react";
import { Section, Paragraph } from "@/components/AlgorithmContent";
import { Quiz } from "@/components/Quiz";
import { 
  CreditCard, Server, Database, ArrowRight, Shield, RefreshCw, 
  CheckCircle, AlertTriangle, Zap, FileText, Link, Clock
} from "lucide-react";
import pspArchitecture from "@/assets/psp-integration-architecture.png";
import paymentServiceSchema from "@/assets/payment-service-schema.png";
import ledgerServiceSchema from "@/assets/ledger-service-schema.png";

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

type FlowTab = "architecture" | "schema" | "make-payment" | "get-status" | "reconciliation" | "properties" | "concepts";

export const Content = () => {
  const [activeTab, setActiveTab] = useState<"learn" | "quiz">("learn");
  const [activeFlow, setActiveFlow] = useState<FlowTab>("architecture");

  const flowTabs: { id: FlowTab; label: string }[] = [
    { id: "architecture", label: "Architecture" },
    { id: "schema", label: "Schema" },
    { id: "make-payment", label: "Make Payment" },
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
              Design a service that charges a card and handles retries, webhooks, and idempotency. 
              We expose a simple API: <code className="bg-muted px-1 rounded text-sm">POST /payments</code> with 
              an Idempotency-Key and <code className="bg-muted px-1 rounded text-sm">GET /payments/{"{id}"}</code>.
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
                  src={pspArchitecture} 
                  alt="PSP Integration Architecture" 
                  className="w-full rounded-lg border border-border bg-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <ConceptCard title="API Gateway" icon={Shield} variant="blue">
                  <BulletList items={[
                    "Terminates TLS and handles rate limiting",
                    "Validates JWTs / auth",
                    <>Routes: <code className="bg-muted px-1 rounded text-xs">/payments</code> → Payment Service</>
                  ]} />
                </ConceptCard>

                <ConceptCard title="Payment Service" icon={CreditCard} variant="green">
                  <BulletList items={[
                    <>Exposes <code className="bg-muted px-1 rounded text-xs">POST /payments</code> and <code className="bg-muted px-1 rounded text-xs">GET /payments/{"{id}"}</code></>,
                    "Enforces client idempotency via payment_idempotency_keys",
                    "Owns Payment state machine (INITIATED → SETTLED → REFUNDED)",
                    "Calls PSP for auth/capture/refund",
                    "Handles PSP webhooks via inbox pattern"
                  ]} />
                </ConceptCard>

                <ConceptCard title="Outbox Worker" icon={RefreshCw} variant="orange">
                  <BulletList items={[
                    "Polls outbox_events where status = PENDING",
                    "Publishes events (PaymentSettled, PaymentRefunded) to broker",
                    "Marks outbox_events.status = SENT",
                    "Safe to retry – outbox rows are durable"
                  ]} />
                </ConceptCard>

                <ConceptCard title="Ledger Service" icon={FileText} variant="purple">
                  <BulletList items={[
                    "Subscribes to payment events from broker",
                    "Inserts into ledger_events (inbox) keyed by event_id",
                    "Writes append-only ledger_entries (debits/credits)",
                    "Source of truth for merchant balances & revenue"
                  ]} />
                </ConceptCard>

                <ConceptCard title="External PSP" icon={Server} variant="red">
                  <BulletList items={[
                    "Handles card network integration and 3DS/SCA",
                    "Owns card data (PCI boundary) – you only see tokens",
                    "APIs: create payment / auth / capture / refund",
                    "Webhooks: AUTHORIZED, CAPTURED, REFUNDED, CHARGEBACK"
                  ]} />
                </ConceptCard>

                <ConceptCard title="Reconciliation Job" icon={Clock} variant="default">
                  <BulletList items={[
                    "Runs on schedule (e.g. nightly)",
                    "Pulls PSP/bank settlement reports",
                    "Compares external vs payments state & ledger_entries",
                    "Creates corrections or flags discrepancies"
                  ]} />
                </ConceptCard>
              </div>
            </div>
          )}

          {/* Schema Tab */}
          {activeFlow === "schema" && (
            <div className="space-y-6">
              <SectionHeader>Database Schema</SectionHeader>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-center">Payment Service DB</h4>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <img 
                      src={paymentServiceSchema} 
                      alt="Payment Service Schema" 
                      className="w-full rounded-lg border border-border bg-white"
                    />
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <h5 className="font-semibold mb-2">payments</h5>
                      <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                        <li>• id (uuid) PK</li>
                        <li>• merchant_id (uuid)</li>
                        <li>• amount_cents (bigint)</li>
                        <li>• currency (char 3)</li>
                        <li>• state (varchar) — INITIATED, AUTHORIZED, SETTLED...</li>
                        <li>• psp_payment_id (varchar) — external ref</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <h5 className="font-semibold mb-2">payment_idempotency_keys</h5>
                      <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                        <li>• merchant_id (uuid) PK</li>
                        <li>• idempotency_key (varchar) PK</li>
                        <li>• payment_id (uuid) FK → payments</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <h5 className="font-semibold mb-2">outbox_events</h5>
                      <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                        <li>• id (uuid) PK</li>
                        <li>• aggregate_id (uuid) FK → payments</li>
                        <li>• event_type (varchar) — PaymentSettled, etc.</li>
                        <li>• status (varchar) — PENDING, SENT</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <h5 className="font-semibold mb-2">psp_webhook_events</h5>
                      <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                        <li>• id (uuid) PK</li>
                        <li>• psp_event_id (varchar) UNIQUE — dedup key</li>
                        <li>• psp_payment_id (varchar) FK</li>
                        <li>• event_type (varchar) — CAPTURED, REFUNDED...</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-center">Ledger Service DB</h4>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <img 
                      src={ledgerServiceSchema} 
                      alt="Ledger Service Schema" 
                      className="w-full rounded-lg border border-border bg-white"
                    />
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <h5 className="font-semibold mb-2">ledger_entries</h5>
                      <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                        <li>• id (bigserial) PK</li>
                        <li>• event_id (uuid) FK → ledger_events</li>
                        <li>• account_id (uuid) FK → accounts</li>
                        <li>• amount_cents (bigint)</li>
                        <li>• direction (char 1) — D/C</li>
                        <li>• currency (char 3)</li>
                        <li>• payment_id (uuid) — ref back to payment</li>
                        <li>• entry_type (varchar) — PENDING, POSTED</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <h5 className="font-semibold mb-2">ledger_events (inbox)</h5>
                      <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                        <li>• event_id (uuid) PK — dedup key</li>
                        <li>• event_type (varchar)</li>
                        <li>• status (varchar) — RECEIVED, PROCESSED</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <h5 className="font-semibold mb-2">accounts</h5>
                      <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                        <li>• id (uuid) PK</li>
                        <li>• account_type (varchar) — MERCHANT, PLATFORM, etc.</li>
                        <li>• external_ref (varchar) — link to merchant/user</li>
                        <li>• currency (char 3)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mt-6">
                <h4 className="font-semibold mb-2">Key Design Choices</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Composite PK</strong> on idempotency_keys (merchant_id + key) ensures per-merchant uniqueness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>psp_event_id UNIQUE</strong> on webhook_events enables idempotent webhook processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>event_id as PK</strong> in ledger_events is the inbox dedup key</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>bigserial</strong> for ledger_entries.id provides append-only ordering</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Make Payment Flow Tab */}
          {activeFlow === "make-payment" && (
            <div className="space-y-6">
              <SectionHeader>Flow 1: Client → Payment Service</SectionHeader>
              
              <div className="rounded-lg border border-border bg-card p-4 mb-6">
                <img 
                  src={pspArchitecture} 
                  alt="PSP Integration Architecture" 
                  className="w-full rounded-lg border border-border bg-white"
                />
              </div>

              <div className="space-y-6">
                <FlowStep number={1} title="Client sends POST /payments">
                  <BulletList items={[
                    "Includes Idempotency-Key header",
                    "Body: amount, currency, merchant_id, return_url"
                  ]} />
                </FlowStep>

                <FlowStep number={2} title="Payment Service handles idempotency">
                  <BulletList items={[
                    "Looks up (merchant_id, Idempotency-Key) in payment_idempotency_keys",
                    "If exists → return existing payment",
                    "If not → start DB transaction"
                  ]} />
                  <div className="mt-2 bg-muted/50 rounded p-3 text-xs">
                    <p className="font-semibold mb-1">Within transaction:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Create payments row: state = INITIATED</li>
                      <li>Insert payment_idempotency_keys row</li>
                      <li>Commit</li>
                    </ol>
                  </div>
                </FlowStep>

                <FlowStep number={3} title="Payment Service calls PSP">
                  <BulletList items={[
                    "Sends amount, currency, return_url",
                    "Sends PSP idempotency key (for retry safety)",
                    "PSP responds with 3DS info if required"
                  ]} />
                </FlowStep>

                <FlowStep number={4} title="Handle 3DS redirect">
                  <BulletList items={[
                    "If '3DS required': PSP returns psp_payment_id + redirect_url",
                    "Update payments: psp_payment_id = ..., state = PENDING_3DS",
                    "Return response to client with payment_id + redirect_url",
                    "Client redirects user to PSP's 3DS page"
                  ]} />
                </FlowStep>
              </div>

              <SectionHeader>Flow 2: PSP Webhooks</SectionHeader>

              <div className="space-y-6">
                <FlowStep number={5} title="User completes 3DS">
                  <p>User completes 3DS on PSP page; PSP processes auth + capture.</p>
                </FlowStep>

                <FlowStep number={6} title="PSP sends AUTHORIZED webhook">
                  <div className="bg-muted/50 rounded p-3 text-xs space-y-2">
                    <p className="font-semibold">Webhook handler:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Validate signature</li>
                      <li>Insert row into psp_webhook_events with psp_event_id</li>
                      <li>If duplicate → ignore (idempotent)</li>
                      <li>Load payment by psp_payment_id</li>
                      <li>Update payments.state = AUTHORIZED</li>
                    </ol>
                  </div>
                </FlowStep>

                <FlowStep number={7} title="PSP sends CAPTURED/SETTLED webhook">
                  <div className="bg-muted/50 rounded p-3 text-xs space-y-2">
                    <p className="font-semibold">Webhook handler:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Insert into psp_webhook_events (dedupe via psp_event_id)</li>
                      <li>Load payment</li>
                      <li>Update payments.state = SETTLED</li>
                      <li className="font-semibold text-green-600 dark:text-green-400">In same DB tx: Insert outbox_events row</li>
                    </ol>
                  </div>
                  <div className="mt-2 bg-green-500/10 border border-green-500/20 rounded p-3 text-xs">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Outbox event payload:</p>
                    <code>event_type = PaymentSettled, aggregate_id = payment_id, payload = {"{"}payment_id, amount, currency, merchant_id{"}"}</code>
                  </div>
                </FlowStep>
              </div>

              <SectionHeader>Flow 3: Outbox → Broker → Ledger</SectionHeader>

              <div className="space-y-6">
                <FlowStep number={8} title="Outbox worker polls">
                  <BulletList items={[
                    "Polls outbox_events WHERE status = PENDING",
                    "Publishes PaymentSettled to Broker",
                    "Marks outbox_events.status = SENT"
                  ]} />
                </FlowStep>

                <FlowStep number={9} title="Ledger Service consumes">
                  <div className="bg-muted/50 rounded p-3 text-xs space-y-2">
                    <p className="font-semibold">Consumer logic (in DB transaction):</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Receives PaymentSettled with event_id</li>
                      <li>Insert ledger_events row (event_id, event_type = PaymentSettled, status = RECEIVED)</li>
                      <li>If event_id conflict → already processed → exit</li>
                      <li>Insert ledger_entries debits/credits for merchant, card-clearing, fees</li>
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
              <SectionHeader>Get Payment Status</SectionHeader>
              <div className="rounded-lg border border-border bg-card p-4">
                <BulletList items={[
                  <>Client calls <code className="bg-muted px-1 rounded text-xs">GET /payments/{"{id}"}</code></>,
                  "API Gateway → Payment Service",
                  "Payment Service reads from payments table: state, amounts, PSP refs, timestamps",
                  "Returns current status + maybe 'settled_at'",
                  <><strong>Note:</strong> For payment status we read from Payment DB; ledger is for financial facts</>
                ]} />
              </div>

              <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Why not hit the Ledger?</h4>
                <p className="text-sm text-muted-foreground">
                  Payment status (INITIATED, AUTHORIZED, SETTLED) lives with the payment aggregate in Payment DB. 
                  Ledger is for financial facts (balances, money movement). They serve different purposes.
                </p>
              </div>
            </div>
          )}

          {/* Reconciliation Tab */}
          {activeFlow === "reconciliation" && (
            <div className="space-y-6">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
                <p className="text-sm italic text-muted-foreground">
                  "Balances are a cache; the ledger is the truth. We reconcile the two regularly."
                </p>
              </div>

              <SectionHeader>External Reconciliation (PSP/Bank vs Us)</SectionHeader>

              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="font-semibold mb-3">Process</h4>
                  <BulletList items={[
                    "Recon job pulls PSP/bank settlement report for day D",
                    "For each row, try to match against our payments/ledger_entries",
                    <>Match by reference (PSP id, auth id, card token) or by <code className="bg-muted px-1 rounded text-xs">amount + time window + merchant + card fingerprint</code></>
                  ]} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">MATCHED</h4>
                    <p className="text-sm text-muted-foreground">Record exists in both PSP and our ledger with matching amounts</p>
                  </div>
                  <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
                    <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">ONLY_EXTERNAL</h4>
                    <p className="text-sm text-muted-foreground">In PSP report, not in our ledger</p>
                  </div>
                  <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">ONLY_INTERNAL</h4>
                    <p className="text-sm text-muted-foreground">In our ledger, not in PSP report</p>
                  </div>
                  <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">MISMATCH</h4>
                    <p className="text-sm text-muted-foreground">Both exist but amounts/status differ</p>
                  </div>
                </div>

                <SectionHeader>Handling Mismatches</SectionHeader>

                <div className="grid gap-4">
                  <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
                    <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Bank shows a transaction you don't</h4>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Reason:</strong> Possible data loss, PSP webhook missed, import lag</p>
                    <p className="text-sm text-muted-foreground"><strong>Action:</strong> Create a special reconciliation ledger entry. Investigate.</p>
                  </div>
                  <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">You show a transaction bank doesn't</h4>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Reason:</strong> You think money moved but it didn't</p>
                    <p className="text-sm text-muted-foreground"><strong>Action:</strong> Add compensating entries in the ledger. Fix the bug/path that assumed success without confirmation.</p>
                  </div>
                  <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Amount mismatch</h4>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Example:</strong> Your ledger shows £100, but bank shows £99 (fees, FX, partial captures)</p>
                    <p className="text-sm text-muted-foreground"><strong>Action:</strong> Confirm rules (e.g. fees from PSP). Model fees explicitly (extra entry to a "fees" account). Update logic.</p>
                  </div>
                </div>
              </div>

              <SectionHeader>Internal Reconciliation (Balances vs Ledger)</SectionHeader>

              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Source of truth:</strong> ledger entries (append only, double entry)<br/>
                  <strong>Derived view:</strong> balances table (materialised for fast reads)
                </p>
                <BulletList items={[
                  "Periodically recompute balances from ledger_entries for sample/all accounts",
                  "Compare recomputed values vs balances table",
                  "If mismatch → either fix the view or mark as needing correction"
                ]} />
              </div>

              <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Avoid Missing/Duplicating Money</h4>
                <BulletList items={[
                  "Keep an append-only, double-entry ledger as the system of record",
                  "Keep balances as derived and regularly reconcile",
                  "Reconcile the ledger against external PSP/bank reports",
                  "Model corrections as new entries, never mutate old ones"
                ]} variant="green" />
              </div>
            </div>
          )}

          {/* Properties Tab */}
          {activeFlow === "properties" && (
            <div className="space-y-6">
              <SectionHeader>System Properties & Guarantees</SectionHeader>

              <div className="grid gap-4">
                <PropertyCard 
                  title="1. Client can safely retry POST /payments"
                  how={
                    <BulletList items={[
                      <>Table: <code className="bg-muted px-1 rounded">payment_idempotency_keys</code></>,
                      "Key: (merchant_id, idempotency_key) PK → payment_id, stored response",
                      "On conflict → load existing row, return stored response"
                    ]} />
                  }
                >
                  <p>Idempotency ensures repeated requests don't create duplicate payments</p>
                </PropertyCard>

                <PropertyCard 
                  title="2. PSP webhooks are handled at-least-once, delayed, out of order"
                  how={
                    <BulletList items={[
                      <>Table: <code className="bg-muted px-1 rounded">psp_webhook_events</code> with psp_event_id UNIQUE</>,
                      "On INSERT conflict → event already processed → ack & exit",
                      "State machine guarantees only valid forward transitions"
                    ]} />
                  }
                >
                  <p>Webhook handler is idempotent and handles out-of-order delivery safely</p>
                </PropertyCard>

                <PropertyCard 
                  title="3. Payment Service can retry PSP calls without double-charging"
                  how={
                    <BulletList items={[
                      "Generate PSP idempotency key per logical operation",
                      <>e.g. <code className="bg-muted px-1 rounded">psp_idem = hash(payment_id + operation + attempt_group)</code></>,
                      "On retry, re-use same key → PSP dedupes"
                    ]} />
                  }
                >
                  <p>PSP-side idempotency prevents duplicate auth/capture/refund operations</p>
                </PropertyCard>

                <PropertyCard 
                  title="4. Eventual consistency between Payments & Ledger"
                  how={
                    <BulletList items={[
                      "Outbox pattern: Write event atomically with state update",
                      "Worker publishes to broker, marks SENT",
                      "Ledger consumes asynchronously",
                      "Payments commit first; ledger catches up via events"
                    ]} />
                  }
                >
                  <p>Read payment status from Payment DB; read money state from Ledger</p>
                </PropertyCard>

                <PropertyCard 
                  title="5. PCI boundary & source of truth"
                  how={
                    <BulletList items={[
                      "User redirected to PSP for card entry → you never see PAN/CVV",
                      "You only ever see tokens / PSP IDs",
                      "PSP/bank settlement reports are source of truth",
                      "Recon job compares reports vs your DB"
                    ]} />
                  }
                >
                  <p>PCI scope lives at PSP. Final say on settlements comes from PSP/bank.</p>
                </PropertyCard>

                <PropertyCard 
                  title="6. Each settled payment is booked once in ledger"
                  how={
                    <BulletList items={[
                      "outbox_events row written atomically with payments.state = SETTLED",
                      <>Ledger: <code className="bg-muted px-1 rounded">ledger_events(event_id PK)</code> - event_id from outbox</>,
                      "On PK conflict → event already processed → ignore"
                    ]} />
                  }
                >
                  <p>No matter how many retries, each PaymentSettled leads to one set of ledger rows</p>
                </PropertyCard>

                <PropertyCard 
                  title="7. Strong auditability with no lost history"
                  how={
                    <BulletList items={[
                      "Append-only ledger_entries: No UPDATE / DELETE",
                      "Corrections modelled as new entries (REFUND, CHARGEBACK, RECON_ADJUSTMENT)",
                      "Balances computed by summing entries, not reading mutable field"
                    ]} />
                  }
                >
                  <p>Full trace: Replay entries in time order to see exactly what happened</p>
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
                    "Creating payment + idempotency row",
                    "Processing webhook + updating state + writing outbox event"
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
                    Why you have <code className="bg-muted px-1 rounded text-xs">version</code> on payments
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
                    "Boundary: Payment DB ↔ Ledger DB",
                    "Payments commit first; ledger catches up via events",
                    "Read payment status from Payment DB; read money state from Ledger"
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
                    "Idempotency keys for client API and PSP calls",
                    "Dedupe via psp_event_id and event_id PKs (webhooks & ledger)"
                  ]} />
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    CAP / Availability
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    If ledger or broker is down: Payment state still moves to SETTLED (availability preserved). 
                    Ledger catches up later (eventual consistency + recon).
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-cyan-500" />
                    Pending vs Posted
                  </h4>
                  <BulletList items={[
                    <><strong>Pending:</strong> Holds/auths not yet settled. Used for "available to spend" checks.</>,
                    <><strong>Posted:</strong> Settled transactions. Used for statements, reconciliation, interest.</>,
                    <>Available balance ≈ posted + pending_credits - pending_debits</>
                  ]} />
                </div>

                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 md:col-span-2">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    Sequence Numbers for Per-Account Ordering
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Each account maintains a <code className="bg-muted px-1 rounded text-xs">last_seq_no</code>. Events carry a <code className="bg-muted px-1 rounded text-xs">seq_no</code>:
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                      <code className="text-green-600 dark:text-green-400">seq_no == last_seq_no + 1</code>
                      <p className="mt-1 text-muted-foreground">→ Apply event</p>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded p-2">
                      <code className="text-orange-600 dark:text-orange-400">seq_no &lt;= last_seq_no</code>
                      <p className="mt-1 text-muted-foreground">→ Duplicate, ignore</p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded p-2">
                      <code className="text-red-600 dark:text-red-400">seq_no &gt; last_seq_no + 1</code>
                      <p className="mt-1 text-muted-foreground">→ Gap, pause/replay</p>
                    </div>
                  </div>
                </div>
              </div>

              <SectionHeader>Bonus Topics (If Asked)</SectionHeader>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">Observability</h4>
                  <BulletList items={[
                    <>Metrics: <code className="text-xs">payment_created</code>, <code className="text-xs">payment_settled</code>, <code className="text-xs">payment_failed</code></>,
                    "Webhook success/fail rate",
                    "Outbox backlog size",
                    "Ledger lag (events pending)",
                    "Logs with payment_id, psp_payment_id, event_id",
                    "Tracing a single payment end-to-end"
                  ]} />
                </div>

                <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">Risk / Limits</h4>
                  <p className="text-sm text-muted-foreground mb-2">Before creating a payment:</p>
                  <BulletList items={[
                    "Basic risk checks",
                    "Per-day limits",
                    "Velocity checks",
                    "Blacklisted cards/merchants"
                  ]} />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <PSPIntegrationQuiz />
      )}
    </div>
  );
};

export const quizQuestions = [
  {
    question: "What is the purpose of the Idempotency-Key header in POST /payments?",
    options: [
      "To encrypt the payment data",
      "To ensure duplicate requests don't create multiple payments",
      "To authenticate the merchant",
      "To specify the payment currency"
    ],
    correctIndex: 1,
    explanation: "The Idempotency-Key ensures that if a client retries a request (e.g., due to timeout), the same payment is returned rather than creating a duplicate."
  },
  {
    question: "Why is the outbox event written in the same transaction as the payment state update?",
    options: [
      "To improve performance",
      "To reduce database connections",
      "To ensure atomicity - either both happen or neither",
      "To encrypt the event payload"
    ],
    correctIndex: 2,
    explanation: "Writing both atomically ensures that if the payment is marked SETTLED, the event is guaranteed to be published. If the transaction fails, neither change persists."
  },
  {
    question: "How does the ledger service achieve exactly-once processing of payment events?",
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
    question: "What is the PCI boundary in this architecture?",
    options: [
      "The API Gateway",
      "The Payment Service",
      "The External PSP",
      "The Ledger Service"
    ],
    correctIndex: 2,
    explanation: "The PSP handles all card data. Users enter card details on PSP's hosted page, and your system only sees tokens/IDs, never actual card numbers."
  },
  {
    question: "What happens if the webhook handler receives the same PSP event twice?",
    options: [
      "It processes it again, creating duplicate entries",
      "It throws an error and alerts ops",
      "It ignores the duplicate via psp_event_id uniqueness check",
      "It queues it for later processing"
    ],
    correctIndex: 2,
    explanation: "The psp_webhook_events table has psp_event_id as UNIQUE. Duplicate inserts conflict and are ignored, making the handler idempotent."
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
      "To speed up payment processing",
      "To compare PSP/bank settlements with internal records and find discrepancies",
      "To send notifications to merchants",
      "To rotate encryption keys"
    ],
    correctIndex: 1,
    explanation: "Recon compares external settlement reports against payments and ledger entries, identifying mismatches that need investigation or correction."
  },
  {
    question: "How does the Payment Service handle PSP call retries without double-charging?",
    options: [
      "By waiting for PSP confirmation before each retry",
      "By sending a unique PSP idempotency key with each request",
      "By limiting retries to one attempt",
      "By storing all PSP responses locally"
    ],
    correctIndex: 1,
    explanation: "The Payment Service generates a PSP idempotency key (e.g., hash of payment_id + operation). On retry with the same key, the PSP dedupes and doesn't execute twice."
  },
  {
    question: "In the eventual consistency model, which database is the source of truth for payment status?",
    options: [
      "Ledger DB",
      "Payment DB",
      "Both equally",
      "The message broker"
    ],
    correctIndex: 1,
    explanation: "Payment status (INITIATED, AUTHORIZED, SETTLED) is read from Payment DB. Ledger DB is the source of truth for financial facts (balances, money movement)."
  },
  {
    question: "What pattern is used to reliably publish events from Payment Service to the message broker?",
    options: [
      "Direct publish with retries",
      "Two-phase commit",
      "Outbox pattern",
      "Saga pattern"
    ],
    correctIndex: 2,
    explanation: "The outbox pattern writes events to an outbox_events table atomically with the payment update. A worker polls and publishes to the broker, ensuring reliable delivery."
  },
  {
    question: "Why is optimistic locking (version column) used on the payments table?",
    options: [
      "To encrypt payment data",
      "To prevent lost updates when concurrent processes modify the same payment",
      "To speed up queries",
      "To reduce storage size"
    ],
    correctIndex: 1,
    explanation: "Optimistic locking with UPDATE WHERE version = N ensures that if two processes try to update the same payment, one will fail and can retry with fresh data."
  },
  {
    question: "If the ledger service is down, what happens to payments?",
    options: [
      "Payments fail completely",
      "Payments succeed, and ledger catches up later via events",
      "Payments are queued until ledger is back",
      "The system switches to synchronous mode"
    ],
    correctIndex: 1,
    explanation: "The system prioritizes availability. Payments commit to Payment DB, events go to outbox, and ledger processes them asynchronously when it recovers."
  }
];

export const PSPIntegrationQuiz = () => {
  return <Quiz questions={quizQuestions} title="PSP Integration Quiz" />;
};
