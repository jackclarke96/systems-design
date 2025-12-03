import { Quiz } from "@/components/Quiz";
import { Scale, Database, Search, AlertTriangle, CheckCircle, FileText, RefreshCw, Shield } from "lucide-react";

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

export const Content = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm italic text-center">
          "Balances are a cache; the ledger is the truth. We reconcile the two regularly."
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        Reconciliation is the process of comparing different sources of financial data to ensure they agree. 
        It's critical for detecting bugs, missed events, and preventing money from being lost or duplicated.
      </p>

      <SectionHeader>Internal Reconciliation</SectionHeader>
      
      <ConceptCard 
        title="Internal Reconciliation" 
        icon={Database} 
        variant="blue"
        subtitle="Detects bugs, missed events, and partial failures"
      >
        <div className="space-y-3">
          <div>
            <p className="font-medium text-foreground">Source of truth:</p>
            <p>Ledger entries (append-only, double entry)</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Derived view:</p>
            <p>Balances table</p>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="font-medium text-foreground mb-2">The job:</p>
            <BulletList 
              items={[
                "Periodically recompute balances from ledger_entries for a sample or all accounts",
                "Compare recomputed values vs balances table",
                "If mismatch, either fix or mark as needing correction"
              ]}
              bulletColor="text-blue-500"
            />
          </div>
        </div>
      </ConceptCard>

      <SectionHeader>External Reconciliation</SectionHeader>
      
      <ConceptCard 
        title="External Reconciliation" 
        icon={FileText} 
        variant="amber"
        subtitle="Compare your ledger with external statements e.g. PSP, bank"
      >
        <div className="space-y-3">
          <div>
            <p className="font-medium text-foreground">Source of truth:</p>
            <p>Imported statement from PSP/bank</p>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="font-medium text-foreground mb-2">The job - Match each external record with internal ledger entries:</p>
            <BulletList 
              items={[
                "By reference (PSP id, auth id, card token, etc.)",
                "By amount + time window + merchant + card fingerprint"
              ]}
              bulletColor="text-amber-500"
            />
          </div>
        </div>
      </ConceptCard>

      <SectionHeader>Recon States & Reports</SectionHeader>
      
      <p className="text-sm text-muted-foreground mb-4">
        For each transaction or batch, you can end up in one of these states:
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status="MATCHED" color="bg-green-500/20 text-green-600" />
          </div>
          <p className="text-sm text-muted-foreground">Internal and external agree</p>
        </div>

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status="ONLY_INTERNAL" color="bg-amber-500/20 text-amber-600" />
          </div>
          <p className="text-sm text-muted-foreground">Exists in ledger, not in external statement</p>
        </div>

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status="ONLY_EXTERNAL" color="bg-blue-500/20 text-blue-600" />
          </div>
          <p className="text-sm text-muted-foreground">Exists in external statement, not in ledger</p>
        </div>

        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status="MISMATCH" color="bg-red-500/20 text-red-600" />
          </div>
          <p className="text-sm text-muted-foreground">Both exist but amounts/statuses/dates don't line up</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4 mt-4">
        <p className="text-sm">
          <strong>Output:</strong> You typically produce a recon report and alerts when mismatches exceed a threshold.
        </p>
      </div>

      <SectionHeader>Handling Mismatches</SectionHeader>

      <div className="space-y-4">
        <ConceptCard title="Bank shows a transaction you don't" icon={AlertTriangle} variant="red">
          <div className="space-y-2">
            <div>
              <p className="font-medium text-foreground">Reason:</p>
              <p>Possible data loss, PSP webhook missed, import lag</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Action:</p>
              <p>Create a special reconciliation ledger entry. Investigate.</p>
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
              <BulletList 
                items={[
                  "Confirm rules e.g. fees from PSP",
                  "Model fees explicitly (extra entry to a 'fees' account)",
                  "Update logic"
                ]}
                bulletColor="text-blue-500"
              />
            </div>
          </div>
        </ConceptCard>
      </div>

      <SectionHeader>Avoiding Missing/Duplicating Money</SectionHeader>
      
      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Keep an <strong>append-only, double-entry ledger</strong> as the system of record</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Keep <strong>balances as derived</strong> and regularly reconcile</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span><strong>Reconcile</strong> the ledger against <strong>external PSP/bank reports</strong></span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Model <strong>corrections as new entries, never mutate old ones</strong></span>
          </li>
        </ul>
      </div>

      <SectionHeader>Quick Reference</SectionHeader>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 border-b border-border">Type</th>
              <th className="text-left p-3 border-b border-border">Source of Truth</th>
              <th className="text-left p-3 border-b border-border">Compare Against</th>
              <th className="text-left p-3 border-b border-border">Detects</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">Internal</td>
              <td className="p-3 text-muted-foreground">Ledger entries</td>
              <td className="p-3 text-muted-foreground">Balances table</td>
              <td className="p-3 text-muted-foreground">Bugs, missed events, calculation errors</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">External</td>
              <td className="p-3 text-muted-foreground">PSP/Bank statement</td>
              <td className="p-3 text-muted-foreground">Your ledger</td>
              <td className="p-3 text-muted-foreground">Missing transactions, amount discrepancies</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mt-6">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          The Golden Rule
        </h4>
        <p className="text-sm">
          Reconciliation isn't just about finding problems—it's about <strong>building confidence</strong> that 
          your system is correctly tracking money. Run it regularly, alert on anomalies, and investigate quickly.
        </p>
      </div>
    </div>
  );
};

export const ReconciliationQuiz = () => {
  const questions = [
    {
      question: "What is the source of truth for internal reconciliation?",
      options: [
        "The balances table",
        "The ledger entries (append-only, double entry)",
        "The PSP/bank statement",
        "The user's account summary"
      ],
      correctIndex: 1,
      explanation: "The ledger entries are the source of truth. The balances table is a derived view that should match the recomputed values from ledger entries."
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
      question: "If you find you have a transaction the bank doesn't show, what is the most likely cause?",
      options: [
        "The bank lost the transaction",
        "Your system recorded success without actual confirmation",
        "Normal reconciliation timing delay",
        "Currency conversion issue"
      ],
      correctIndex: 1,
      explanation: "This typically indicates a bug where your system assumed a transaction succeeded without proper confirmation from the PSP/bank."
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
      explanation: "In an append-only ledger, you never mutate or delete entries. Corrections are made by adding new compensating entries."
    },
    {
      question: "What is the main purpose of external reconciliation?",
      options: [
        "To verify your database is working correctly",
        "To compare your internal records against PSP/bank statements",
        "To calculate user balances",
        "To generate financial reports"
      ],
      correctIndex: 1,
      explanation: "External reconciliation compares your ledger against external sources (PSP, bank statements) to ensure you're not missing transactions or have discrepancies."
    },
    {
      question: "How do you match external records with internal ledger entries?",
      options: [
        "Only by exact amount",
        "Only by timestamp",
        "By reference (PSP id, auth id) or by amount + time window + merchant + card fingerprint",
        "Only by customer ID"
      ],
      correctIndex: 2,
      explanation: "Matching uses references like PSP id or auth id when available, or falls back to fuzzy matching on amount + time window + merchant + card fingerprint."
    },
    {
      question: "Why are balances considered 'derived' rather than 'source of truth'?",
      options: [
        "Balances are calculated from ledger entries and can be recomputed",
        "Balances are stored in a different database",
        "Balances are only used for display purposes",
        "Balances change too frequently to be trusted"
      ],
      correctIndex: 0,
      explanation: "Balances are derived/computed from ledger entries. The ledger is the source of truth, and balances should always match what the ledger says."
    },
    {
      question: "When should reconciliation reports trigger alerts?",
      options: [
        "Every time any mismatch is found",
        "Only when MATCHED state is reached",
        "When mismatches exceed a defined threshold",
        "Only at end of month"
      ],
      correctIndex: 2,
      explanation: "Alert thresholds prevent alert fatigue while ensuring significant issues are caught. Minor timing differences might be acceptable, but patterns of mismatches need investigation."
    }
  ];

  return <Quiz questions={questions} title="Reconciliation Patterns Quiz" />;
};
