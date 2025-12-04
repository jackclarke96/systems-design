import { useState } from "react";
import { Quiz } from "@/components/Quiz";
import { 
  Wallet, Database, Send, Shield, RefreshCw, Search, Layers, Clock, 
  CheckCircle, Key, List, ArrowRight, ExternalLink, AlertTriangle, 
  CreditCard, Building2, FileText, Zap
} from "lucide-react";
import walletBasicFlow from "@/assets/wallet-basic-flow.png";
import walletExtendedFlow from "@/assets/wallet-extended-flow.png";

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

const FlowStep = ({ 
  step, 
  title, 
  children,
  variant = "default"
}: { 
  step: number; 
  title: string; 
  children: React.ReactNode;
  variant?: "default" | "green" | "blue" | "amber" | "purple";
}) => {
  const variants = {
    default: "border-border",
    green: "border-green-500/30",
    blue: "border-blue-500/30",
    amber: "border-amber-500/30",
    purple: "border-purple-500/30",
  };
  
  const bgVariants = {
    default: "bg-primary text-primary-foreground",
    green: "bg-green-500 text-white",
    blue: "bg-blue-500 text-white",
    amber: "bg-amber-500 text-white",
    purple: "bg-purple-500 text-white",
  };

  return (
    <div className={`rounded-lg border ${variants[variant]} p-4`}>
      <div className="flex items-center gap-3 mb-2">
        <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${bgVariants[variant]}`}>
          {step}
        </span>
        <h5 className="font-semibold">{title}</h5>
      </div>
      <div className="text-sm text-muted-foreground pl-9">
        {children}
      </div>
    </div>
  );
};

const PropertyCard = ({ 
  number, 
  title, 
  achievedBy 
}: { 
  number: number; 
  title: string; 
  achievedBy: (string | React.ReactNode)[];
}) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <div className="flex items-center gap-2 mb-3">
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
        {number}
      </span>
      <h4 className="font-semibold">{title}</h4>
    </div>
    <div className="text-sm text-muted-foreground">
      <p className="font-medium text-foreground mb-2">Achieved by:</p>
      <BulletList items={achievedBy} bulletColor="text-green-500" />
    </div>
  </div>
);

type FlowTab = "architecture" | "internal-flows" | "external-flows" | "properties";

export const Content = () => {
  const [activeTab, setActiveTab] = useState<"learn" | "quiz">("learn");
  const [activeFlow, setActiveFlow] = useState<FlowTab>("architecture");

  const flowTabs: { id: FlowTab; label: string }[] = [
    { id: "architecture", label: "Architecture" },
    { id: "internal-flows", label: "Internal Flows" },
    { id: "external-flows", label: "External Flows" },
    { id: "properties", label: "Properties" },
  ];

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
              events so other services can react. This section covers internal wallet flows (transfers, balances, recon) 
              and extends to external top-up/withdraw with PSP/bank integration.
            </p>
          </div>

          {/* Flow Sub-tabs */}
          <div className="flex flex-wrap gap-2">
            {flowTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFlow(tab.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeFlow === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeFlow === "architecture" && (
            <div className="space-y-6">
              <SectionHeader>System Architecture</SectionHeader>
              
              <div className="space-y-4">
                <ConceptCard title="Main Components" icon={Layers} variant="blue">
                  <BulletList 
                    items={[
                      <span><strong>API Gateway</strong> — auth, rate limiting, routes /wallet/* → Wallet Service</span>,
                      <span><strong>Wallet Service</strong> — POST /transfers, /topup, /withdraw • GET /balance</span>,
                      <span><strong>Wallet DB</strong> — wallet_transfers, wallet_idempotency_keys, outbox_events</span>,
                      <span><strong>Outbox Worker</strong> — polls outbox_events, publishes to Broker</span>,
                      <span><strong>Broker</strong> — carries TransferCompleted events (at-least-once)</span>,
                      <span><strong>Ledger Service</strong> — ledger_events (inbox), ledger_entries (double-entry), accounts</span>,
                      <span><strong>Ledger DB</strong> — accounts, ledger_entries, balances projection</span>,
                    ]}
                    bulletColor="text-blue-500"
                  />
                </ConceptCard>
              </div>

              <SectionHeader>Internal Wallet System (Basic)</SectionHeader>
              <p className="text-sm text-muted-foreground mb-4">
                No external PSP/bank — just internal transfers between wallets.
              </p>
              <div className="rounded-lg border border-border bg-card p-4">
                <img 
                  src={walletBasicFlow} 
                  alt="Wallet Basic Flow Architecture" 
                  className="w-full rounded-lg border border-border bg-white"
                />
              </div>

              <SectionHeader>Extended System (With External Rails)</SectionHeader>
              <p className="text-sm text-muted-foreground mb-4">
                Adds top-up (charge card/bank) and withdraw (payout to bank) via external PSP/bank integration.
              </p>
              <div className="rounded-lg border border-border bg-card p-4">
                <img 
                  src={walletExtendedFlow} 
                  alt="Wallet Extended Flow Architecture" 
                  className="w-full rounded-lg border border-border bg-white"
                />
              </div>

              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                <h4 className="font-semibold mb-2">Key Insight</h4>
                <p className="text-sm text-muted-foreground">
                  The extended system adds an "External System (Bank, Scheme, Partner)" box on the right side. 
                  The Wallet Service calls external APIs for top-up/withdraw, receives async notifications, 
                  and the Recon Job compares external reports vs wallet transactions + ledger.
                </p>
              </div>
            </div>
          )}

          {activeFlow === "internal-flows" && (
            <div className="space-y-6">
              <SectionHeader>Flow 1: Internal Transfer (Wallet A → Wallet B)</SectionHeader>
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Goal:</strong> Move money once, no double-spend.
              </p>

              <div className="space-y-3">
                <FlowStep step={1} title="Client → Wallet Service" variant="blue">
                  <p className="mb-2">POST /wallets/{"{A}"}/transfers with:</p>
                  <BulletList 
                    items={[
                      "Idempotency-Key header",
                      "destination_wallet_id = B",
                      "amount, currency, reference"
                    ]}
                    bulletColor="text-blue-500"
                  />
                </FlowStep>

                <FlowStep step={2} title="Idempotency Check" variant="purple">
                  <p className="mb-2">Wallet Service looks up (source_wallet_id=A, idem_key) in wallet_idempotency_keys:</p>
                  <BulletList 
                    items={[
                      <span><strong>If row exists</strong> → return stored transfer/response</span>,
                      <span><strong>If not:</strong> Start DB tx, insert wallet_transfers (state=PENDING), insert wallet_idempotency_keys, commit</span>
                    ]}
                    bulletColor="text-purple-500"
                  />
                </FlowStep>

                <FlowStep step={3} title="Balance / Limit Checks" variant="amber">
                  <p className="mb-2">Wallet Service reads balance for A (from Ledger or balances view). Checks:</p>
                  <BulletList 
                    items={[
                      "Ownership/auth",
                      "Per-day limits / risk rules",
                      "available_balance(A) ≥ amount"
                    ]}
                    bulletColor="text-amber-500"
                  />
                  <p className="mt-2 text-xs italic">If any fail → update wallet_transfers.state = FAILED, return error.</p>
                </FlowStep>

                <FlowStep step={4} title="Mark Transfer Completed + Write to Outbox" variant="green">
                  <p className="mb-2">In single DB transaction (Wallet DB):</p>
                  <BulletList 
                    items={[
                      "UPDATE wallet_transfers.state = COMPLETED",
                      "INSERT outbox_events (event_type='TransferCompleted', payload={transfer_id, A, B, amount...})"
                    ]}
                    bulletColor="text-green-500"
                  />
                </FlowStep>

                <FlowStep step={5} title="Outbox → Broker" variant="blue">
                  <BulletList 
                    items={[
                      "Outbox Worker polls outbox_events WHERE status='PENDING'",
                      "Publishes TransferCompleted to Broker (includes event_id)",
                      "Sets status='SENT'"
                    ]}
                    bulletColor="text-blue-500"
                  />
                </FlowStep>

                <FlowStep step={6} title="Broker → Ledger Service" variant="green">
                  <p className="mb-2">Ledger Service consumes TransferCompleted:</p>
                  <BulletList 
                    items={[
                      "INSERT INTO ledger_events(event_id, event_type='TransferCompleted', status='RECEIVED')",
                      "If PK conflict on event_id → already processed → exit",
                      "Lookup accounts for wallets A and B",
                      "Insert two ledger_entries: Debit A's account (D, amount), Credit B's account (C, amount)",
                      "Set ledger_events.status='PROCESSED', COMMIT"
                    ]}
                    bulletColor="text-green-500"
                  />
                </FlowStep>
              </div>

              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                <h4 className="font-semibold mb-2">End State</h4>
                <BulletList 
                  items={[
                    "wallet_transfers.state = COMPLETED",
                    "Ledger shows balanced D/C pair for the transfer",
                    "A's balance down; B's balance up"
                  ]}
                  bulletColor="text-green-500"
                />
              </div>

              <SectionHeader>Flow 2: Get Wallet Balance</SectionHeader>
              
              <div className="grid md:grid-cols-2 gap-4">
                <ConceptCard title="Option A: Direct from Ledger" icon={Database} variant="blue">
                  <p className="mb-2">GET /wallets/{"{id}"}/balance</p>
                  <BulletList 
                    items={[
                      "API GW → Wallet Service → Ledger Service",
                      "Ledger finds account_id for wallet",
                      "SELECT SUM(+C, -D) from ledger_entries for that account",
                      "Returns balance, currency, available_balance"
                    ]}
                    bulletColor="text-blue-500"
                  />
                </ConceptCard>

                <ConceptCard title="Option B: From Balances Projection" icon={Layers} variant="green">
                  <p className="mb-2">Same request, but:</p>
                  <BulletList 
                    items={[
                      "Ledger reads from balances table/materialised view",
                      "Updated as events are processed",
                      "Can always rebuild from ledger_entries for reconciliation"
                    ]}
                    bulletColor="text-green-500"
                  />
                </ConceptCard>
              </div>

              <SectionHeader>Flow 3: Internal Reconciliation</SectionHeader>
              <p className="text-sm text-muted-foreground mb-4">
                Only needed if you keep a cached balances table.
              </p>

              <div className="space-y-3">
                <FlowStep step={1} title="Scheduled Recon Job Runs" variant="amber">
                  <p>For each (or sampled) account_id:</p>
                </FlowStep>

                <FlowStep step={2} title="Recompute & Compare" variant="blue">
                  <BulletList 
                    items={[
                      "Recompute balance from ledger_entries",
                      "Compare to balances.balance"
                    ]}
                    bulletColor="text-blue-500"
                  />
                </FlowStep>

                <FlowStep step={3} title="Classify Results" variant="purple">
                  <BulletList 
                    items={[
                      <span><strong>MATCHED</strong> — all good</span>,
                      <span><strong>ONLY_IN_BALANCES / ONLY_IN_ENTRIES</strong> — bad, investigate</span>,
                      <span><strong>MISMATCH</strong> — numbers differ</span>
                    ]}
                    bulletColor="text-purple-500"
                  />
                </FlowStep>

                <FlowStep step={4} title="Handle Mismatches" variant="green">
                  <BulletList 
                    items={[
                      "Fix balances view from ledger (ledger is source of truth)",
                      "Or raise an alert to investigate bugs"
                    ]}
                    bulletColor="text-green-500"
                  />
                </FlowStep>
              </div>
            </div>
          )}

          {activeFlow === "external-flows" && (
            <div className="space-y-6">
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-amber-500" />
                  New Component: External PSP / Bank
                </h4>
                <BulletList 
                  items={[
                    "Executes real card/bank transfers",
                    "APIs for: Top-up (charge card / pull from bank), Payout (send to bank account)",
                    "Async notifications: topup_succeeded/failed, payout_succeeded/failed",
                    "Settlement / statement reports for recon"
                  ]}
                  bulletColor="text-amber-500"
                />
              </div>

              <SectionHeader>Flow 4: Top-Up (External → Wallet)</SectionHeader>
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Goal:</strong> User adds money from card/bank into wallet.
              </p>

              <div className="space-y-3">
                <FlowStep step={1} title="Client → Wallet Service" variant="blue">
                  <p>POST /wallets/{"{id}"}/topup with Idempotency-Key, amount, funding source</p>
                </FlowStep>

                <FlowStep step={2} title="Idempotency & Request Record" variant="purple">
                  <BulletList 
                    items={[
                      "Use topup_idempotency_keys keyed by (wallet_id, idem_key) → topup_id",
                      "If exists → return existing top-up",
                      "If not → create topup row (state=PENDING)"
                    ]}
                    bulletColor="text-purple-500"
                  />
                </FlowStep>

                <FlowStep step={3} title="Call External PSP / Bank" variant="amber">
                  <BulletList 
                    items={[
                      "Wallet Service calls external API",
                      "Sends amount, wallet + funding source, external idempotency key",
                      "External returns external_topup_id and initial status (e.g. PENDING)"
                    ]}
                    bulletColor="text-amber-500"
                  />
                </FlowStep>

                <FlowStep step={4} title="Async Notification: Top-up Succeeded" variant="green">
                  <p className="mb-2">External PSP/Bank sends webhook saying external_topup_id is successful:</p>
                  <BulletList 
                    items={[
                      "Insert into external_events keyed by external_event_id (dedup)",
                      "If duplicate → already processed",
                      "Find top-up by external_topup_id and wallet",
                      "If not completed: mark topup COMPLETED",
                      "Insert outbox_events: event_type='TopupCompleted', payload={wallet_id, amount...}"
                    ]}
                    bulletColor="text-green-500"
                  />
                </FlowStep>

                <FlowStep step={5} title="Outbox → Broker → Ledger" variant="green">
                  <BulletList 
                    items={[
                      "Outbox worker publishes TopupCompleted",
                      "Ledger Service consumes: INSERT ledger_events(event_id PK, ...)",
                      "Credit wallet account",
                      "Debit \"external clearing / PSP\" account"
                    ]}
                    bulletColor="text-green-500"
                  />
                </FlowStep>
              </div>

              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                <h4 className="font-semibold mb-2">End State</h4>
                <p className="text-sm">Wallet balance increased; ledger reflects incoming money from external rails.</p>
              </div>

              <SectionHeader>Flow 5: Withdraw / Payout (Wallet → Bank)</SectionHeader>
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Goal:</strong> User withdraws money from wallet to bank.
              </p>

              <div className="space-y-3">
                <FlowStep step={1} title="Client → Wallet Service" variant="blue">
                  <p>POST /wallets/{"{id}"}/withdraw with Idempotency-Key, amount, bank details</p>
                </FlowStep>

                <FlowStep step={2} title="Idempotency + Balance Check" variant="purple">
                  <BulletList 
                    items={[
                      "Use (wallet_id, idem_key) idempotency table → withdrawal_id",
                      "If new: Check wallet balance ≥ amount"
                    ]}
                    bulletColor="text-purple-500"
                  />
                </FlowStep>

                <FlowStep step={3} title="Debit Wallet in Ledger" variant="amber">
                  <p className="mb-2">Start DB tx (Wallet DB):</p>
                  <BulletList 
                    items={[
                      "Create withdrawal record (state=PENDING_EXTERNAL)",
                      "Insert outbox_events: event_type='WithdrawalRequested'",
                      "COMMIT"
                    ]}
                    bulletColor="text-amber-500"
                  />
                  <p className="mt-2 text-xs italic">Outbox worker publishes event.</p>
                </FlowStep>

                <FlowStep step={4} title="Ledger Processes WithdrawalRequested" variant="green">
                  <BulletList 
                    items={[
                      "Ledger Service consumes event",
                      "ledger_events inbox dedup as usual",
                      "Writes ledger entries: Debit wallet account, Credit payout/clearing account"
                    ]}
                    bulletColor="text-green-500"
                  />
                </FlowStep>

                <FlowStep step={5} title="Send Payout Instruction to Bank" variant="amber">
                  <BulletList 
                    items={[
                      "Wallet Service sends bank/PSP payout API after step 3",
                      "OR: dedicated Payout Service consumes WithdrawalRequested events",
                      "External returns external_payout_id"
                    ]}
                    bulletColor="text-amber-500"
                  />
                </FlowStep>

                <FlowStep step={6} title="Async Notification: Payout Succeeded/Failed" variant="green">
                  <BulletList 
                    items={[
                      "PSP/Bank sends success/failure notification",
                      "Insert into external_events keyed by external_event_id",
                      "Update withdrawal state: COMPLETED on success, or FAILED/REVERSED on failure",
                      "On hard failure after debit: emit event for compensating entries (credit wallet back)"
                    ]}
                    bulletColor="text-green-500"
                  />
                </FlowStep>

                <FlowStep step={7} title="Recon Job" variant="blue">
                  <BulletList 
                    items={[
                      "Reads bank statement / payout report",
                      "Matches rows against withdrawal records + ledger entries",
                      "Creates adjustments or alerts for mismatches"
                    ]}
                    bulletColor="text-blue-500"
                  />
                </FlowStep>
              </div>
            </div>
          )}

          {activeFlow === "properties" && (
            <div className="space-y-6">
              <SectionHeader>Internal Wallet Properties (1-5)</SectionHeader>
              
              <div className="grid md:grid-cols-2 gap-4">
                <PropertyCard 
                  number={1}
                  title="Idempotent POST /transfers"
                  achievedBy={[
                    "Table: wallet_idempotency_keys",
                    "PK: (wallet_id, idempotency_key) → transfer_id",
                    "On POST: If PK conflict → return existing result, else proceed"
                  ]}
                />

                <PropertyCard 
                  number={2}
                  title="No Double-Spend, Balance ≥ 0"
                  achievedBy={[
                    "Before marking COMPLETED: fetch A's balance",
                    "Enforce amount ≤ available_balance",
                    "Optional: single writer per wallet, or row lock / optimistic lock",
                    "Only passed transfers become ledger events"
                  ]}
                />

                <PropertyCard 
                  number={3}
                  title="Strong Consistency Inside Wallet"
                  achievedBy={[
                    "Wallet DB: state + outbox_events in same transaction",
                    "Ledger DB: both ledger entries (D + C) in one transaction",
                    "Never partial state: only A debited without B credited",
                    "Across Wallet DB ↔ Ledger DB: eventual consistency via events"
                  ]}
                />

                <PropertyCard 
                  number={4}
                  title="Exactly-Once Booking in Ledger"
                  achievedBy={[
                    "Each transfer has exactly one outbox_events row (event_id)",
                    "Outbox worker may republish (at-least-once)",
                    "Ledger uses ledger_events(event_id PK) as inbox",
                    "First insert → process; subsequent → PK conflict → no-op",
                    "Result: exactly one pair of ledger entries per transfer"
                  ]}
                />

                <PropertyCard 
                  number={5}
                  title="Strong Auditability"
                  achievedBy={[
                    "ledger_entries is append-only: no UPDATE/DELETE",
                    "Each transfer creates balanced D/C pair",
                    "Corrections are new entries (entry_type='ADJUSTMENT')",
                    "Balances, statements, history computed from entries",
                    "Can replay to understand how any balance was reached"
                  ]}
                />
              </div>

              <SectionHeader>External Flow Properties (6-8)</SectionHeader>
              
              <div className="grid md:grid-cols-2 gap-4">
                <PropertyCard 
                  number={6}
                  title="External Rails Boundary & Source of Truth"
                  achievedBy={[
                    "External PSP/Bank owns card/bank details, moves real money",
                    "Wallet/ledger only see external IDs (external_topup_id, external_payout_id)",
                    "Mirrored entries in ledger_entries",
                    "Recon job compares bank/PSP statements vs wallet + ledger",
                    "Mismatches → corrections/alerts"
                  ]}
                />

                <PropertyCard 
                  number={7}
                  title="No Missed / Duplicated Top-ups & Withdrawals"
                  achievedBy={[
                    "Idempotency at Wallet API level (POST /topup, /withdraw)",
                    "Idempotency at external API level (external idem keys)",
                    "Inbox for external notifications: external_events(external_event_id UNIQUE)",
                    "Outbox + ledger inbox: same pattern as internal",
                    "Recon catches any bank vs ledger discrepancies"
                  ]}
                />

                <PropertyCard 
                  number={8}
                  title="Wallet Balance Consistent with External Money Over Time"
                  achievedBy={[
                    "All flows (transfers, topups, withdrawals) go through ledger",
                    "wallet balance = SUM(ledger entries for account)",
                    "External reports are reconciled regularly",
                    "If external says +100 but ledger doesn't → post adjustment",
                    "If ledger says +100 but external doesn't → post compensating entries",
                    "Never mutate old rows; corrections are new entries"
                  ]}
                />
              </div>

              <SectionHeader>Quick Reference</SectionHeader>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 border-b border-border">Property</th>
                      <th className="text-left p-3 border-b border-border">Key Mechanism</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium">Idempotency</td>
                      <td className="p-3 text-muted-foreground">wallet_idempotency_keys table (wallet_id + idem_key → result)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium">No double-spend</td>
                      <td className="p-3 text-muted-foreground">Balance check before COMPLETED, optional row locks</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium">Atomicity</td>
                      <td className="p-3 text-muted-foreground">state + outbox in one tx; both ledger entries in one tx</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium">Exactly-once ledger</td>
                      <td className="p-3 text-muted-foreground">Outbox at-least-once + ledger inbox (event_id PK)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium">Auditability</td>
                      <td className="p-3 text-muted-foreground">Append-only ledger_entries, corrections as new entries</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium">External boundary</td>
                      <td className="p-3 text-muted-foreground">External IDs stored, recon job compares statements</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium">External dedup</td>
                      <td className="p-3 text-muted-foreground">external_events(external_event_id UNIQUE)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Consistency over time</td>
                      <td className="p-3 text-muted-foreground">All flows through ledger + reconciliation</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4 mt-6">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Summary
                </h4>
                <BulletList 
                  items={[
                    <span><strong>Internal wallet:</strong> 3 flows (transfer, get balance, recon) + 5 properties</span>,
                    <span><strong>External extensions:</strong> 2 flows (topup, withdraw) + 3 properties</span>,
                    "Same building blocks: idempotency keys, inbox/outbox, append-only ledger, reconciliation"
                  ]}
                  bulletColor="text-green-500"
                />
              </div>
            </div>
          )}
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
      question: "In an internal transfer flow, what is checked before marking the transfer as COMPLETED?",
      options: [
        "Only the idempotency key",
        "Only the destination wallet exists",
        "Ownership/auth, per-day limits, and available_balance >= amount",
        "The broker is available"
      ],
      correctIndex: 2,
      explanation: "Before completing a transfer, the wallet service checks ownership/auth, per-day limits/risk rules, and that available_balance(A) >= amount."
    },
    {
      question: "How does the Ledger Service achieve exactly-once processing of events?",
      options: [
        "By using TCP which guarantees exactly-once",
        "By using ledger_events table with event_id as PK for deduplication",
        "By processing messages in parallel",
        "By deleting processed messages from the broker"
      ],
      correctIndex: 1,
      explanation: "The Ledger Service uses ledger_events with event_id as PK as an inbox. First insert → process; subsequent attempts → PK conflict → no-op. This gives exactly-once semantics."
    },
    {
      question: "What entries does the Ledger Service write for an internal transfer?",
      options: [
        "One credit entry for the destination",
        "One debit entry for the source",
        "Two entries: Debit source account, Credit destination account",
        "Three entries: source, destination, and fee"
      ],
      correctIndex: 2,
      explanation: "For a transfer, the Ledger writes a balanced pair: Debit the source account (D, amount) and Credit the destination account (C, amount). This maintains double-entry bookkeeping."
    },
    {
      question: "In the top-up flow, when does the wallet balance actually increase?",
      options: [
        "When the client calls POST /topup",
        "When the external PSP sends a successful webhook notification",
        "When the topup row is created with state=PENDING",
        "When the external API returns external_topup_id"
      ],
      correctIndex: 1,
      explanation: "The balance only increases after the external PSP confirms success via webhook. The handler then emits TopupCompleted, and the Ledger Service credits the wallet account."
    },
    {
      question: "For withdrawals, what happens if the external payout fails after the wallet has already been debited in the ledger?",
      options: [
        "The user loses their money",
        "The ledger is directly updated to remove the debit",
        "Compensating entries are posted (credit wallet back, debit clearing)",
        "The withdrawal is left in PENDING_EXTERNAL forever"
      ],
      correctIndex: 2,
      explanation: "On hard failure after debit, the system emits an event so the Ledger posts compensating entries (credit wallet back, debit clearing). Old rows are never mutated."
    },
    {
      question: "What is the purpose of the Recon Job in the extended wallet system?",
      options: [
        "To speed up balance queries",
        "To compare external system reports vs wallet transactions + ledger and catch discrepancies",
        "To delete old ledger entries",
        "To publish events to the broker"
      ],
      correctIndex: 1,
      explanation: "The Recon Job reads bank statements / PSP reports and matches them against withdrawal records + ledger entries. It creates adjustments or alerts for any mismatches."
    },
    {
      question: "Why are corrections in the ledger made as new entries rather than updating old rows?",
      options: [
        "Because the database doesn't support updates",
        "To maintain strong auditability - the full history can be replayed",
        "To reduce storage costs",
        "To improve query performance"
      ],
      correctIndex: 1,
      explanation: "The ledger is append-only. Corrections are new entries (entry_type='ADJUSTMENT') so the full history is preserved and can be replayed to understand how any balance was reached."
    },
    {
      question: "How is the 'no double-spend' property achieved for internal transfers?",
      options: [
        "By using the broker to serialize all requests",
        "By checking balance before COMPLETED + optional row locks or single writer per wallet",
        "By storing all requests in external_events table",
        "By using eventual consistency"
      ],
      correctIndex: 1,
      explanation: "Before marking COMPLETED, the service fetches A's balance and enforces amount ≤ available_balance. Optional: single writer per wallet or row lock/optimistic lock for stronger guarantees."
    },
    {
      question: "What tables are used for deduplication of external notifications (webhooks)?",
      options: [
        "wallet_idempotency_keys",
        "ledger_entries",
        "external_events with external_event_id UNIQUE",
        "outbox_events"
      ],
      correctIndex: 2,
      explanation: "External notifications are deduplicated using external_events table keyed by external_event_id. First insert → process; duplicates → already processed, exit."
    },
    {
      question: "In the property 'Strong consistency inside the wallet', what does eventual consistency refer to?",
      options: [
        "Between different wallets",
        "Between Wallet DB and Ledger DB (across the two databases)",
        "Between the client and API Gateway",
        "Between the broker and external PSP"
      ],
      correctIndex: 1,
      explanation: "Within each DB, operations are atomic. But across Wallet DB ↔ Ledger DB, consistency is eventual via events. The Wallet DB transaction commits first, then the outbox worker + Ledger eventually catches up."
    }
  ];

  return <Quiz questions={questions} />;
};
