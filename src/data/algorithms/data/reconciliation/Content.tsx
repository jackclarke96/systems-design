import { useState } from "react";
import { Quiz } from "@/components/Quiz";
import { 
  Scale, Database, Search, AlertTriangle, CheckCircle, FileText, 
  RefreshCw, Shield, ArrowRight, Download, GitCompare, BarChart3, 
  Clock, Zap
} from "lucide-react";
import reconciliationArchitecture from "@/assets/reconciliation-architecture.png";

const ConceptCard = ({ 
  title, 
  icon: Icon, 
  children, 
  variant = "default",
  subtitle
}: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
  variant?: "default" | "green" | "red" | "blue" | "amber";
  subtitle?: string;
}) => {
  const variants = {
    default: "border-border bg-card",
    green: "border-green-500/30 bg-green-500/5",
    red: "border-red-500/30 bg-red-500/5",
    blue: "border-blue-500/30 bg-blue-500/5",
    amber: "border-amber-500/30 bg-amber-500/5",
  };
  
  const iconVariants = {
    default: "text-primary",
    green: "text-green-500",
    red: "text-red-500",
    blue: "text-blue-500",
    amber: "text-amber-500",
  };

  return (
    <div className={`rounded-lg border p-4 ${variants[variant]}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`h-5 w-5 ${iconVariants[variant]}`} />
        <h4 className="font-semibold">{title}</h4>
      </div>
      {subtitle && <p className="text-xs text-muted-foreground italic mb-3">{subtitle}</p>}
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

const StatusBadge = ({ status, color }: { status: string; color: string }) => (
  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${color}`}>
    {status}
  </span>
);

const FlowStep = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <div className="flex-1">
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  </div>
);

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="bg-muted/50 rounded-lg p-3 text-xs overflow-x-auto font-mono">
    {children}
  </pre>
);

export const Content = () => {
  const [activeTab, setActiveTab] = useState<"architecture" | "flows" | "properties" | "quiz">("architecture");

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit flex-wrap">
        {(["architecture", "flows", "properties", "quiz"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all capitalize ${
              activeTab === tab 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "architecture" && <ArchitectureTab />}
      {activeTab === "flows" && <FlowsTab />}
      {activeTab === "properties" && <PropertiesTab />}
      {activeTab === "quiz" && <ReconciliationQuiz />}
    </div>
  );
};

const ArchitectureTab = () => (
  <div className="space-y-6">
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
      <p className="text-sm italic text-center">
        "External rails are the source of truth for real money movement. Reconciliation ensures our ledger matches reality."
      </p>
    </div>

    <div className="rounded-lg border border-border overflow-hidden">
      <img 
        src={reconciliationArchitecture} 
        alt="Reconciliation architecture diagram showing Recon & ETL Service, Data Lake, and reporting components"
        className="w-full"
      />
    </div>

    <SectionHeader>Core Components</SectionHeader>

    <div className="grid md:grid-cols-2 gap-4">
      <ConceptCard title="Recon & ETL Service" icon={GitCompare} variant="blue">
        <BulletList 
          items={[
            "Ingests external statements (SFTP/API/object storage)",
            "Normalises into external_transactions table",
            "Joins vs internal ledger data",
            "Writes recon_results and adjustment_events"
          ]}
          bulletColor="text-blue-500"
        />
      </ConceptCard>

      <ConceptCard title="External System (Bank/Scheme/Partner)" icon={Database} variant="amber">
        <BulletList 
          items={[
            "Owns card/bank details and executes real money movement",
            "Provides settlement/statement reports for reconciliation",
            "Source of truth for whether money actually moved"
          ]}
          bulletColor="text-amber-500"
        />
      </ConceptCard>

      <ConceptCard title="Data Lake / Warehouse" icon={BarChart3} variant="green">
        <BulletList 
          items={[
            "Raw zone: files, external_transactions, ledger entries",
            "Derived reporting tables (silver layer)",
            "Powers BI, alerts, and regulatory reports"
          ]}
          bulletColor="text-green-500"
        />
      </ConceptCard>

      <ConceptCard title="Ledger Service" icon={FileText} variant="default">
        <BulletList 
          items={[
            "Subscribes to wallet events from Broker",
            "Writes append-only ledger_entries",
            "Receives adjustment postings from Recon"
          ]}
        />
      </ConceptCard>
    </div>

    <SectionHeader>Data Model</SectionHeader>

    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <h4 className="font-semibold mb-2 font-mono text-sm">external_transactions</h4>
        <p className="text-xs text-muted-foreground mb-2">Canonical view of "what the bank says happened"</p>
        <CodeBlock>{`external_id       -- unique per rail, from bank/scheme
source            -- bank name / PSP / scheme
amount, currency
value_date, booking_date
our_reference     -- PSP id, payment id, account (if present)
raw_payload       -- original file/response for audit`}</CodeBlock>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <h4 className="font-semibold mb-2 font-mono text-sm">recon_results</h4>
        <p className="text-xs text-muted-foreground mb-2">Outcome of matching external vs internal</p>
        <CodeBlock>{`source, business_date
external_id, internal_ref
status            -- MATCHED, ONLY_EXTERNAL, ONLY_INTERNAL, MISMATCH
reason_code
amount_diff, date_diff`}</CodeBlock>
      </div>
    </div>

    <SectionHeader>Recon States</SectionHeader>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
        <StatusBadge status="MATCHED" color="bg-green-500/20 text-green-600" />
        <p className="text-sm text-muted-foreground mt-2">Internal + external agree</p>
      </div>

      <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
        <StatusBadge status="ONLY_EXTERNAL" color="bg-blue-500/20 text-blue-600" />
        <p className="text-sm text-muted-foreground mt-2">Exists in statement, not in ledger</p>
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <StatusBadge status="ONLY_INTERNAL" color="bg-amber-500/20 text-amber-600" />
        <p className="text-sm text-muted-foreground mt-2">Exists in ledger, not in statement</p>
      </div>

      <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
        <StatusBadge status="MISMATCH" color="bg-red-500/20 text-red-600" />
        <p className="text-sm text-muted-foreground mt-2">Both exist but amounts/dates/status don't line up</p>
      </div>
    </div>
  </div>
);

const FlowsTab = () => (
  <div className="space-y-6">
    <SectionHeader>Flow 1 – Import External Statements</SectionHeader>
    <p className="text-sm text-muted-foreground mb-4">
      <strong>Goal:</strong> Get bank/scheme reality into our system in a structured way.
    </p>

    <div className="space-y-4">
      <FlowStep number={1} title="External system → Recon & ETL Service">
        <p>On a schedule (e.g. nightly for business_date D), Recon:</p>
        <BulletList items={[
          "Pulls files (SFTP/API) or calls a statement endpoint, or",
          "Reads settlement reports dropped into object storage by the bank/scheme"
        ]} />
      </FlowStep>

      <FlowStep number={2} title="Recon & ETL: raw → external_transactions">
        <p>For each file/response:</p>
        <BulletList items={[
          "Store file metadata: source, business_date, checksum",
          "Parse each record and write into external_transactions",
          "Store raw payload for audit"
        ]} />
      </FlowStep>
    </div>

    <SectionHeader>Flow 2 – Match vs Internal Ledger</SectionHeader>
    <p className="text-sm text-muted-foreground mb-4">
      <strong>Goal:</strong> Decide if every external record has a matching internal record and vice versa.
    </p>

    <div className="space-y-4">
      <FlowStep number={1} title="Recon reads internal data">
        <p>Reads from:</p>
        <BulletList items={[
          "Ledger DB (ledger_entries, accounts)",
          "Optionally Transaction DB (payments/transfers) for extra context"
        ]} />
      </FlowStep>

      <FlowStep number={2} title="Recon match step">
        <p>For each external_transactions row, try to match by:</p>
        <BulletList items={[
          "Direct reference (our payment id, PSP id, etc.), or",
          "(amount, currency, account, time window) heuristics"
        ]} />
      </FlowStep>

      <FlowStep number={3} title="Write recon_results">
        <p>For each external row (and any unmatched internal rows), create a recon_results record with status:</p>
        <BulletList items={[
          <><StatusBadge status="MATCHED" color="bg-green-500/20 text-green-600" /> – internal + external agree</>,
          <><StatusBadge status="ONLY_EXTERNAL" color="bg-blue-500/20 text-blue-600" /> – exists in statement, not in ledger</>,
          <><StatusBadge status="ONLY_INTERNAL" color="bg-amber-500/20 text-amber-600" /> – exists in ledger, not in statement</>,
          <><StatusBadge status="MISMATCH" color="bg-red-500/20 text-red-600" /> – both exist but don't line up</>
        ]} />
      </FlowStep>
    </div>

    <SectionHeader>Flow 3 – Generate Adjustments / Corrections</SectionHeader>
    <p className="text-sm text-muted-foreground mb-4">
      <strong>Goal:</strong> Make our ledger line up with external reality, without breaking auditability.
    </p>

    <div className="space-y-4">
      <FlowStep number={1} title="Recon inspects recon_results">
        <div className="space-y-2">
          <p>For <strong>MATCHED</strong> — nothing to do.</p>
          <p>For <strong>ONLY_EXTERNAL / MISMATCH / some ONLY_INTERNAL</strong>, decide if:</p>
          <BulletList items={[
            "We missed an event (e.g. lost webhook)",
            "There are fees/FX we didn't model",
            "We tried to pay but bank rejected"
          ]} />
        </div>
      </FlowStep>

      <FlowStep number={2} title="Recon & ETL → Ledger Service">
        <p>For each case needing a financial correction, Recon emits an adjustment:</p>
        <BulletList items={[
          "Either calls a Ledger API, or",
          "Produces ReconAdjustmentCreated events to the Broker"
        ]} />
        <p className="mt-2">Ledger Service then:</p>
        <BulletList items={[
          "Writes new ledger_entries (never mutates old ones)",
          "Uses a distinct entry_type = 'RECON_ADJUSTMENT'"
        ]} />
      </FlowStep>

      <FlowStep number={3} title="Recon re-runs">
        <p>After adjustments settle, recon can be rerun for the same day and should now mark more rows as MATCHED.</p>
      </FlowStep>
    </div>

    <SectionHeader>Flow 4 – Data Warehouse & Reporting</SectionHeader>
    <p className="text-sm text-muted-foreground mb-4">
      <strong>Goal:</strong> Build a durable data platform for finance / risk / regulators.
    </p>

    <div className="space-y-4">
      <FlowStep number={1} title="Recon & ETL → Data Lake / Warehouse">
        <p>Writes or streams:</p>
        <BulletList items={[
          "external_transactions",
          "recon_results",
          "ledger_entries snapshots"
        ]} />
        <p className="mt-2">Stored in raw/bronze and derived/silver tables.</p>
      </FlowStep>

      <FlowStep number={2} title="Warehouse → Alerts / BI / Reporting">
        <p>Jobs/queries compute:</p>
        <BulletList items={[
          "Daily P&L, balances",
          "Recon summary (counts & amounts per status)",
          "Regulatory reports (full transaction logs, large payments)"
        ]} />
        <p className="mt-2">Results surface in Alerts/BI/Reporting: dashboards for ops, scheduled reports for finance, feeds for regulators.</p>
      </FlowStep>
    </div>

    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mt-6">
      <h4 className="font-semibold mb-2 flex items-center gap-2">
        <Zap className="h-4 w-4 text-primary" />
        Interview Summary
      </h4>
      <p className="text-sm">
        "On the right, external rails send us statements → Recon imports them, normalises into external_transactions, 
        and joins vs our ledger. Every record is classified MATCHED or some mismatch state so we don't have silent 
        discrepancies. For genuine differences we emit adjustment postings back into the ledger, always as new entries, 
        and everything flows into a data warehouse that powers BI and regulatory reporting. Recon runs are idempotent, 
        keyed by source+date, so we can rerun them safely."
      </p>
    </div>
  </div>
);

const PropertiesTab = () => (
  <div className="space-y-6">
    <SectionHeader>Property 1 – External Rails Boundary & Source of Truth</SectionHeader>
    
    <ConceptCard title="External system is the final say" icon={Shield} variant="green">
      <p className="font-medium text-foreground mb-2">Achieved by:</p>
      <BulletList items={[
        "Treating bank/scheme statements as the final say on whether money moved",
        "Importing them into external_transactions unchanged (raw payload stored for audit)",
        "Recon uses these as the primary reference when resolving mismatches",
        "When in doubt, we add compensating entries so our ledger matches external cash"
      ]} bulletColor="text-green-500" />
    </ConceptCard>

    <SectionHeader>Property 2 – No Silent Mismatches</SectionHeader>

    <ConceptCard title="Every discrepancy is visible" icon={AlertTriangle} variant="green">
      <p className="font-medium text-foreground mb-2">Achieved by:</p>
      <BulletList items={[
        "Every external record ends up in recon_results with one of: MATCHED, ONLY_EXTERNAL, ONLY_INTERNAL, MISMATCH",
        "Any internal ledger entry we expect to hit the bank but doesn't also shows up as ONLY_INTERNAL",
        "Dashboards/alerts are driven off recon_results, so if there's a difference, it's explicitly visible—nothing quietly disappears"
      ]} bulletColor="text-green-500" />
    </ConceptCard>

    <SectionHeader>Property 3 – Idempotent Recon Runs (Safe to Rerun)</SectionHeader>

    <ConceptCard title="Rerun without side effects" icon={RefreshCw} variant="green">
      <p className="font-medium text-foreground mb-2">Achieved by:</p>
      <BulletList items={[
        "Recon runs are keyed by (source, business_date) (and a run_id)",
        <>external_transactions unique on <code className="text-xs bg-muted px-1 rounded">(source, external_id)</code> or <code className="text-xs bg-muted px-1 rounded">(source, business_date, line_no)</code>, so re-importing doesn't duplicate</>,
        "recon_results for a given (source, business_date) can be safely overwritten or upserted",
        "Adjustment postings are either generated only once per mismatch (using IDs in an 'adjustments' table), or idempotent via unique reference keys on the ledger side"
      ]} bulletColor="text-green-500" />
      <div className="mt-3 p-3 bg-muted/50 rounded text-sm">
        <strong>Result:</strong> If a job crashes or logic changes, you can rerun recon for a day without double-booking money.
      </div>
    </ConceptCard>

    <SectionHeader>Property 4 – Ledger Preserves Audit Trail</SectionHeader>

    <ConceptCard title="Append-only corrections" icon={FileText} variant="green">
      <p className="font-medium text-foreground mb-2">Achieved by:</p>
      <BulletList items={[
        "Ledger is append-only: recon never edits old rows; it adds new adjustment entries",
        "Each adjustment links back to: recon_result_id, external transaction (external_id), original internal transaction (if any)",
        "You can reconstruct: original state, mismatch, adjustment that fixed it"
      ]} bulletColor="text-green-500" />
      <div className="mt-3 p-3 bg-muted/50 rounded text-sm">
        <strong>Result:</strong> Strong auditability even when corrections are made.
      </div>
    </ConceptCard>

    <SectionHeader>Property 5 – Reporting Built on Consistent, Append-Only Data</SectionHeader>

    <ConceptCard title="Reliable regulatory & finance reporting" icon={BarChart3} variant="green">
      <p className="font-medium text-foreground mb-2">Achieved by:</p>
      <BulletList items={[
        "Data Lake stores raw external and internal data as append-only",
        "Derived reporting tables are rebuilt or incrementally updated from that raw zone",
        "ETL jobs are tracked with etl_runs / watermarks so they can be restarted without duplicating rows",
        "Regulatory/finance reports come from this consistent warehouse, not ad-hoc queries on live OLTP DBs"
      ]} bulletColor="text-green-500" />
    </ConceptCard>

    <SectionHeader>Quick Reference: Handling Mismatches</SectionHeader>

    <div className="space-y-4">
      <ConceptCard title="Bank shows a transaction you don't" icon={AlertTriangle} variant="red">
        <div className="space-y-2">
          <div>
            <p className="font-medium text-foreground">Reason:</p>
            <p>Possible data loss, PSP webhook missed, import lag</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Action:</p>
            <p>Create a reconciliation adjustment ledger entry. Investigate root cause.</p>
          </div>
        </div>
      </ConceptCard>

      <ConceptCard title="You show a transaction bank doesn't" icon={Search} variant="amber">
        <div className="space-y-2">
          <div>
            <p className="font-medium text-foreground">Reason:</p>
            <p>You think money moved but it didn't</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Action:</p>
            <p>Add compensating entries in the ledger. Fix the bug/path that assumed success without confirmation.</p>
          </div>
        </div>
      </ConceptCard>

      <ConceptCard title="Amount mismatch" icon={Scale} variant="blue">
        <div className="space-y-2">
          <div>
            <p className="font-medium text-foreground">Example:</p>
            <p>Your ledger shows £100, but bank shows £99 (fees, fx, partial captures)</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Action:</p>
            <BulletList items={[
              "Confirm rules e.g. fees from PSP",
              "Model fees explicitly (extra entry to a 'fees' account)",
              "Update logic going forward"
            ]} bulletColor="text-blue-500" />
          </div>
        </div>
      </ConceptCard>
    </div>
  </div>
);

export const ReconciliationQuiz = () => {
  const questions = [
    {
      question: "What is the source of truth for external reconciliation?",
      options: [
        "Your internal ledger entries",
        "The balances table",
        "Bank/scheme statements (external_transactions)",
        "The user's account summary"
      ],
      correctIndex: 2,
      explanation: "Bank/scheme statements are the source of truth for whether money actually moved. When in doubt, we adjust our ledger to match external reality."
    },
    {
      question: "What does the ONLY_EXTERNAL recon state indicate?",
      options: [
        "A transaction exists in both your ledger and the bank statement",
        "A transaction exists only in your internal ledger",
        "A transaction exists in the external statement but not in your ledger",
        "Amounts don't match between internal and external records"
      ],
      correctIndex: 2,
      explanation: "ONLY_EXTERNAL means the PSP/bank has a record of a transaction that your system doesn't have—possibly due to a missed webhook or data loss."
    },
    {
      question: "How does Recon ensure idempotent runs (safe to rerun)?",
      options: [
        "By locking the database during recon",
        "By using unique keys on (source, external_id) and keying runs by (source, business_date)",
        "By deleting all previous results before each run",
        "By only running once per day"
      ],
      correctIndex: 1,
      explanation: "Recon runs are keyed by (source, business_date) and external_transactions has unique constraints, so re-importing doesn't duplicate and results can be safely upserted."
    },
    {
      question: "How should reconciliation mismatches be corrected in the ledger?",
      options: [
        "Update the original ledger entries with correct amounts",
        "Delete the incorrect entries and create new ones",
        "Add compensating entries, never mutate original entries",
        "Mark entries as 'void' and ignore them"
      ],
      correctIndex: 2,
      explanation: "In an append-only ledger, you never mutate or delete entries. Corrections are made by adding new adjustment entries with entry_type = 'RECON_ADJUSTMENT'."
    },
    {
      question: "What happens when Recon finds a MATCHED state?",
      options: [
        "It creates an adjustment entry",
        "It sends an alert to ops",
        "Nothing—internal and external agree",
        "It marks the transaction for review"
      ],
      correctIndex: 2,
      explanation: "MATCHED means internal and external records agree—no action is needed."
    },
    {
      question: "In Flow 1 (Import External Statements), what is stored for audit purposes?",
      options: [
        "Only the normalised transaction data",
        "A summary hash of the file",
        "The raw payload from the bank/scheme",
        "Nothing—data is transformed only"
      ],
      correctIndex: 2,
      explanation: "The raw payload is stored for audit, ensuring you can always reference exactly what the bank/scheme sent."
    },
    {
      question: "How do you match external records with internal ledger entries?",
      options: [
        "Only by exact amount",
        "Only by timestamp",
        "By direct reference (PSP id, payment id) or (amount, currency, account, time window) heuristics",
        "Only by customer ID"
      ],
      correctIndex: 2,
      explanation: "Matching uses references like PSP id when available, or falls back to fuzzy matching on amount + currency + account + time window."
    },
    {
      question: "What powers the Alerts/BI/Reporting layer?",
      options: [
        "Direct queries on the OLTP ledger database",
        "The Data Lake/Warehouse with raw and derived tables",
        "Real-time event streams only",
        "Manual exports from the Transaction Service"
      ],
      correctIndex: 1,
      explanation: "Regulatory/finance reports come from the Data Lake/Warehouse (consistent, append-only data), not ad-hoc queries on live OLTP DBs."
    },
    {
      question: "If a recon job crashes and is restarted, what prevents double-booking?",
      options: [
        "Manual operator intervention",
        "Unique keys on external_id and idempotent adjustment postings via unique reference keys",
        "Time-based lockout preventing reruns",
        "The Ledger Service rejects all duplicates automatically"
      ],
      correctIndex: 1,
      explanation: "Unique constraints on external_transactions and idempotent adjustment postings (via unique reference keys on the ledger side) ensure reruns don't double-book."
    },
    {
      question: "Why does each adjustment entry link back to recon_result_id and external_id?",
      options: [
        "For performance optimisation",
        "To enable strong auditability—you can reconstruct original state, mismatch, and the correction",
        "Because the database schema requires it",
        "To allow deletion of adjustments later"
      ],
      correctIndex: 1,
      explanation: "Linking adjustments to their source (recon_result_id, external_id, original internal ref) preserves strong auditability even when corrections are made."
    },
    {
      question: "What does 'external rails boundary' mean in reconciliation context?",
      options: [
        "The API gateway between services",
        "The physical location of bank servers",
        "The point where external systems (bank/scheme) become the source of truth for real money movement",
        "The network firewall configuration"
      ],
      correctIndex: 2,
      explanation: "External rails boundary refers to the fact that bank/scheme statements are the final say on whether money actually moved—they own the real cash movement."
    },
    {
      question: "What is the purpose of etl_runs / watermarks in the Data Lake?",
      options: [
        "To track user activity",
        "To allow ETL jobs to be restarted without duplicating rows",
        "To measure query performance",
        "To encrypt sensitive data"
      ],
      correctIndex: 1,
      explanation: "ETL jobs are tracked with etl_runs/watermarks so they can be restarted without duplicating rows, maintaining data consistency."
    }
  ];

  return <Quiz questions={questions} title="Reconciliation Patterns Quiz" />;
};
