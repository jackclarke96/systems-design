import { useState } from "react";
import { Quiz } from "@/components/Quiz";
import { CreditCard, BookOpen, ArrowRight, AlertTriangle, CheckCircle, RefreshCw, Clock, DollarSign } from "lucide-react";
import paymentLifecycleStates from "@/assets/payment-lifecycle-states.png";

const ConceptCard = ({ 
  title, 
  icon: Icon, 
  children, 
  variant = "default" 
}: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
  variant?: "default" | "green" | "red" | "blue" | "amber";
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

const BulletList = ({ items, bulletColor = "text-primary" }: { items: string[]; bulletColor?: string }) => (
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
  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${color}`}>
    {status}
  </span>
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
        <div className="space-y-6">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm">
          Understanding how card payments flow through a system is essential for fintech engineering. 
          This covers the complete lifecycle from initiation to settlement, including ledger entries, 
          domain events, and handling refunds/chargebacks.
        </p>
      </div>

      <SectionHeader>Payment Lifecycle Stages</SectionHeader>
      
      <div className="space-y-4">
        <ConceptCard title="1. Initiated" icon={CreditCard} variant="blue">
          <p>User submits payment request. The journey begins.</p>
          <p className="mt-2"><strong>What happens:</strong> Payment request created, awaiting authorization</p>
        </ConceptCard>

        <ConceptCard title="2. Authorised" icon={Clock} variant="amber">
          <p>PSP/bank reserves funds on card. Money is "held" but not moved yet.</p>
          <p className="mt-2"><strong>What happens:</strong> Hold placed on customer's available balance</p>
        </ConceptCard>

        <ConceptCard title="3. Captured/Settled" icon={CheckCircle} variant="green">
          <p>You capture the auth, funds actually move, transaction becomes final.</p>
          <p className="mt-2"><strong>What happens:</strong> Money transfers from customer to merchant</p>
        </ConceptCard>

        <ConceptCard title="4. Failed/Expired" icon={AlertTriangle} variant="red">
          <p>Auth denied or not captured in time; hold released.</p>
          <BulletList 
            items={[
              "Card problems / Funds limits",
              "Risk / fraud detection",
              "Technical issues",
              "Auth expired before capture"
            ]}
            bulletColor="text-red-500"
          />
        </ConceptCard>

        <ConceptCard title="5. Refunded/Reversed" icon={RefreshCw} variant="default">
          <p>Money moved back to customer (full or partial).</p>
          <p className="mt-2"><strong>Key principle:</strong> Never mutate the original sale - create new entries</p>
        </ConceptCard>
      </div>

      <SectionHeader>Payment State Machine</SectionHeader>
      
      <div className="rounded-lg border border-border bg-card p-4">
        <img 
          src={paymentLifecycleStates} 
          alt="Payment lifecycle state machine showing transitions from INITIATED through AUTHORIZED, SETTLED, and various end states including REFUNDED, CHARGEBACK states" 
          className="w-full rounded-lg border border-border bg-white"
        />
        <p className="text-xs text-muted-foreground text-center mt-2">
          State transitions with ledger entry operations shown for each path
        </p>
      </div>

      <SectionHeader>Pending vs Posted Balances</SectionHeader>
      
      <div className="grid md:grid-cols-2 gap-4">
        <ConceptCard title="Pending Balance" icon={Clock} variant="amber">
          <BulletList 
            items={[
              "Includes holds/authorizations not yet settled",
              "Used for 'available to spend' checks",
              "Changes frequently as auths come and go"
            ]}
            bulletColor="text-amber-500"
          />
        </ConceptCard>

        <ConceptCard title="Posted Balance" icon={CheckCircle} variant="green">
          <BulletList 
            items={[
              "Only includes settled transactions",
              "Used for official statements",
              "Used for reconciliation, interest calculations"
            ]}
            bulletColor="text-green-500"
          />
        </ConceptCard>
      </div>

      <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4 mt-4">
        <p className="text-sm font-medium">
          <strong>Practical Rule:</strong> Available balance ≈ posted + pending_credits - pending_debits
        </p>
      </div>

      <SectionHeader>Ledger Entries Per Stage</SectionHeader>
      
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <StatusBadge status="INITIATED" color="bg-blue-500/20 text-blue-600" />
          </h4>
          <p className="text-sm text-muted-foreground">Optionally log a <code className="bg-muted px-1 rounded">PaymentInitiated</code> event (no ledger entry yet)</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <StatusBadge status="AUTHORIZED" color="bg-amber-500/20 text-amber-600" />
          </h4>
          <p className="text-sm text-muted-foreground mb-2">Represent hold as a pending ledger entry:</p>
          <div className="bg-muted/50 rounded p-3 text-sm font-mono">
            <p>Debit: <span className="text-red-500">customer_pending + amount</span></p>
            <p>Credit: <span className="text-green-500">merchant_pending + amount</span></p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Status: PENDING_AUTHORIZED</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <StatusBadge status="CAPTURED/SETTLED" color="bg-green-500/20 text-green-600" />
          </h4>
          <p className="text-sm text-muted-foreground mb-2">Two operations:</p>
          <div className="space-y-2">
            <div className="bg-muted/50 rounded p-3 text-sm">
              <p className="font-medium mb-1">1. Reverse the pending entries:</p>
              <p className="font-mono">Debit: customer_pending - amount</p>
              <p className="font-mono">Credit: merchant_pending - amount</p>
            </div>
            <div className="bg-muted/50 rounded p-3 text-sm">
              <p className="font-medium mb-1">2. Create the posted entries:</p>
              <p className="font-mono">Debit: <span className="text-red-500">customer_posted + amount</span></p>
              <p className="font-mono">Credit: <span className="text-green-500">merchant_posted + amount</span></p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <StatusBadge status="FAILED/EXPIRED" color="bg-red-500/20 text-red-600" />
          </h4>
          <p className="text-sm text-muted-foreground mb-2">Just reverse the pending entries:</p>
          <div className="bg-muted/50 rounded p-3 text-sm font-mono">
            <p>Debit: customer_pending - amount</p>
            <p>Credit: merchant_pending - amount</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <StatusBadge status="REFUND" color="bg-purple-500/20 text-purple-600" />
            <span className="text-sm text-muted-foreground">(Full or Partial)</span>
          </h4>
          <p className="text-sm text-muted-foreground mb-2">New entries, never mutating the original sale:</p>
          <div className="bg-muted/50 rounded p-3 text-sm font-mono">
            <p>Debit: <span className="text-red-500">merchant_posted - refundAmount</span></p>
            <p>Credit: <span className="text-green-500">customer_posted - refundAmount</span></p>
          </div>
        </div>
      </div>

      <SectionHeader>Domain Events Per Stage</SectionHeader>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 border-b border-border">Event</th>
              <th className="text-left p-3 border-b border-border">Payload</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">PaymentInitiated</td>
              <td className="p-3 text-muted-foreground">payment_id, user_id, amount, currency, merchant, timestamp</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">PaymentAuthorized</td>
              <td className="p-3 text-muted-foreground">auth_id, payment_id, expiry, PSP reference</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">PaymentAuthorizationFailed</td>
              <td className="p-3 text-muted-foreground">payment_id, failure_reason</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">PaymentCaptured/Settled</td>
              <td className="p-3 text-muted-foreground">settlement_id, payment_id, final_amount, fees</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">PaymentRefunded</td>
              <td className="p-3 text-muted-foreground">refund_id, original_payment_id, amount, reason, type (full/partial)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeader>Refunds & Chargebacks</SectionHeader>
      
      <div className="grid md:grid-cols-2 gap-4">
        <ConceptCard title="Refund" icon={RefreshCw} variant="blue">
          <BulletList 
            items={[
              "New transaction linked to original payment",
              "Ledger: new debit/credit pair in reverse direction",
              "Status on original: REFUNDED",
              "Can be full or partial"
            ]}
            bulletColor="text-blue-500"
          />
        </ConceptCard>

        <ConceptCard title="Chargeback / Dispute" icon={AlertTriangle} variant="red">
          <BulletList 
            items={[
              "Model as separate events (ChargebackOpened, ChargebackWon, ChargebackLost)",
              "Each outcome → ledger entry",
              "Never overwrite original payment",
              "Customer may win or lose the dispute"
            ]}
            bulletColor="text-red-500"
          />
        </ConceptCard>
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 mt-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Chargeback Outcomes
        </h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium">CHARGEBACK_OPEN</p>
            <p className="text-muted-foreground">Dispute initiated</p>
          </div>
          <div>
            <p className="font-medium text-green-600">CHARGEBACK_WON</p>
            <p className="text-muted-foreground">Merchant wins, keeps funds</p>
          </div>
          <div>
            <p className="font-medium text-red-600">CHARGEBACK_LOST</p>
            <p className="text-muted-foreground">Customer wins, funds returned</p>
          </div>
        </div>
      </div>

      <SectionHeader>Key Principles</SectionHeader>
      
      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
            <span><strong>Append-only ledger:</strong> Never mutate existing entries</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
            <span><strong>Double-entry:</strong> Every debit has a matching credit</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
            <span><strong>Corrections as new entries:</strong> Refunds/reversals create new records</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
            <span><strong>Separate pending/posted:</strong> Track authorization vs settlement separately</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
            <span><strong>Rich domain events:</strong> Enable audit trails and downstream processing</span>
          </li>
        </ul>
      </div>
        </div>
      ) : (
        <PaymentLifecycleQuiz />
      )}
    </div>
  );
};

export const PaymentLifecycleQuiz = () => {
  const questions = [
    {
      question: "What is the correct order of a successful card payment lifecycle?",
      options: [
        "Initiated → Captured → Authorized → Settled",
        "Authorized → Initiated → Settled → Captured",
        "Initiated → Authorized → Captured/Settled",
        "Captured → Authorized → Initiated → Settled"
      ],
      correctIndex: 2,
      explanation: "A card payment follows: Initiated (request created) → Authorized (funds reserved) → Captured/Settled (funds actually move)."
    },
    {
      question: "What happens to ledger entries when a payment is authorized but not yet settled?",
      options: [
        "Posted entries are created immediately",
        "Pending entries are created (debit customer_pending, credit merchant_pending)",
        "No ledger entries are created until settlement",
        "Only a single debit entry is created"
      ],
      correctIndex: 1,
      explanation: "Authorization creates pending entries to represent the hold. These are reversed and replaced with posted entries upon settlement."
    },
    {
      question: "Which balance type should be used to check if a customer can make a purchase?",
      options: [
        "Posted balance only",
        "Pending balance only",
        "Available balance (posted + pending_credits - pending_debits)",
        "The higher of posted or pending"
      ],
      correctIndex: 2,
      explanation: "Available balance accounts for both settled transactions and pending holds to give an accurate 'can spend' figure."
    },
    {
      question: "How should refunds be handled in a double-entry ledger system?",
      options: [
        "Delete the original payment entries",
        "Modify the original entries to show the refunded amount",
        "Create new entries in the reverse direction, never mutating originals",
        "Mark the original entries as 'void'"
      ],
      correctIndex: 2,
      explanation: "Append-only ledgers never mutate or delete entries. Refunds are modeled as new debit/credit pairs in the reverse direction."
    },
    {
      question: "What is the difference between a refund and a chargeback?",
      options: [
        "Refunds are initiated by the merchant, chargebacks by the customer through their bank",
        "Refunds are always full amount, chargebacks can be partial",
        "Chargebacks are faster to process",
        "There is no difference"
      ],
      correctIndex: 0,
      explanation: "Refunds are voluntary merchant actions. Chargebacks are disputes initiated by customers through their bank, which can be won or lost."
    },
    {
      question: "When an authorization expires without capture, what ledger operation occurs?",
      options: [
        "Posted entries are created for the expired amount",
        "The pending entries are reversed (releasing the hold)",
        "No operation needed - entries automatically expire",
        "A special 'expired' entry type is created"
      ],
      correctIndex: 1,
      explanation: "When auth expires, the pending entries must be reversed to release the hold on the customer's available balance."
    },
    {
      question: "Which domain event should include fees information?",
      options: [
        "PaymentInitiated",
        "PaymentAuthorized",
        "PaymentCaptured/PaymentSettled",
        "PaymentRefunded"
      ],
      correctIndex: 2,
      explanation: "Fees are typically known at settlement time when the PSP confirms the final amount, so PaymentCaptured/Settled includes fee information."
    },
    {
      question: "What are the possible outcomes of a chargeback dispute?",
      options: [
        "Only CHARGEBACK_WON (merchant always wins)",
        "CHARGEBACK_OPEN, CHARGEBACK_WON, CHARGEBACK_LOST",
        "REFUNDED or CANCELLED",
        "DISPUTED or RESOLVED"
      ],
      correctIndex: 1,
      explanation: "Chargebacks go through stages: OPEN (dispute initiated), then either WON (merchant keeps funds) or LOST (customer gets refund)."
    }
  ];

  return <Quiz questions={questions} title="Payment Lifecycle Quiz" />;
};
