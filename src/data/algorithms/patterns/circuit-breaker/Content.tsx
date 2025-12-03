import { Section, Paragraph } from "@/components/AlgorithmContent";
import { Quiz } from "@/components/Quiz";
import { Zap, CheckCircle, XCircle, Clock, Activity, AlertTriangle } from "lucide-react";

const StateCard = ({ 
  title, 
  icon: Icon,
  description,
  behavior,
  variant
}: { 
  title: string; 
  icon: React.ElementType;
  description: string;
  behavior: string;
  variant: "green" | "red" | "orange";
}) => {
  const variants = {
    green: "from-green-500/10 to-green-500/5 border-green-500/20",
    red: "from-red-500/10 to-red-500/5 border-red-500/20",
    orange: "from-orange-500/10 to-orange-500/5 border-orange-500/20",
  };

  const iconVariants = {
    green: "text-green-500",
    red: "text-red-500",
    orange: "text-orange-500",
  };

  return (
    <div className={`rounded-xl border bg-gradient-to-br ${variants[variant]} p-5`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg bg-background/80 ${iconVariants[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-foreground/80 mb-2">{description}</p>
      <p className="text-xs text-muted-foreground italic">{behavior}</p>
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
        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
        <span className="text-sm">{item}</span>
      </li>
    ))}
  </ul>
);

export const Content = () => {
  return (
    <div className="space-y-8">
      <Section>
        <Paragraph>
          The Circuit Breaker pattern prevents cascading failures by detecting when a dependency is struggling 
          and failing fast instead of waiting for timeouts. Named after electrical circuit breakers that 
          prevent damage from electrical overloads.
        </Paragraph>
      </Section>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-primary" />
          <h3 className="font-bold text-lg">The Problem</h3>
        </div>
        <Paragraph>
          When a downstream service is slow or failing, each request ties up resources waiting for timeouts. 
          This can exhaust thread pools, connection pools, and memory — causing your service to fail too. 
          The failure cascades through the system.
        </Paragraph>
      </div>

      <SectionHeader>Circuit Breaker States</SectionHeader>

      <div className="grid md:grid-cols-3 gap-4">
        <StateCard
          title="Closed"
          icon={CheckCircle}
          description="Normal operation. Requests flow through to the dependency."
          behavior="Tracks failure rate. Opens if threshold exceeded."
          variant="green"
        />
        <StateCard
          title="Open"
          icon={XCircle}
          description="Failing fast. Returns errors immediately without calling dependency."
          behavior="After timeout, transitions to Half-Open."
          variant="red"
        />
        <StateCard
          title="Half-Open"
          icon={Clock}
          description="Testing recovery. Allows a limited number of test requests."
          behavior="Success → Closed. Failure → Open again."
          variant="orange"
        />
      </div>

      <SectionHeader>How It Works</SectionHeader>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">1</div>
          <div>
            <h4 className="font-semibold mb-1">Monitor Calls</h4>
            <p className="text-sm text-muted-foreground">Track success/failure rate and latency of calls to the dependency.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">2</div>
          <div>
            <h4 className="font-semibold mb-1">Trip on Threshold</h4>
            <p className="text-sm text-muted-foreground">If error rate exceeds threshold (e.g., 50% failures in last 10 calls), open the circuit.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">3</div>
          <div>
            <h4 className="font-semibold mb-1">Fail Fast</h4>
            <p className="text-sm text-muted-foreground">While open, immediately return errors without attempting the call. No waiting for timeouts.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">4</div>
          <div>
            <h4 className="font-semibold mb-1">Probe for Recovery</h4>
            <p className="text-sm text-muted-foreground">After a cooldown period, allow test requests. If they succeed, close the circuit.</p>
          </div>
        </div>
      </div>

      <SectionHeader>Configuration Parameters</SectionHeader>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-semibold">Parameter</th>
              <th className="text-left p-3 font-semibold">Description</th>
              <th className="text-left p-3 font-semibold">Example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Failure Threshold</td>
              <td className="p-3 text-muted-foreground">% of failures to trigger open state</td>
              <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">50%</code></td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Request Volume</td>
              <td className="p-3 text-muted-foreground">Min requests before evaluating threshold</td>
              <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">10 requests</code></td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Timeout Duration</td>
              <td className="p-3 text-muted-foreground">How long to stay open before half-open</td>
              <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">30 seconds</code></td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Half-Open Requests</td>
              <td className="p-3 text-muted-foreground">Number of test requests in half-open</td>
              <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">3 requests</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeader>Benefits & Considerations</SectionHeader>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
          <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Benefits
          </h4>
          <BulletList items={[
            "Prevents cascade failures",
            "Gives failing services time to recover",
            "Frees up resources (threads, connections)",
            "Provides fast feedback to callers",
            "Enables graceful degradation"
          ]} />
        </div>

        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
          <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Considerations
          </h4>
          <BulletList items={[
            "Need fallback behavior when open",
            "Tuning thresholds requires monitoring",
            "May need different breakers per endpoint",
            "Can mask underlying issues if not alerted",
            "Distributed systems need shared state or per-instance breakers"
          ]} />
        </div>
      </div>

      <SectionHeader>Common Libraries</SectionHeader>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <p className="font-semibold">Go</p>
          <code className="text-xs text-muted-foreground">sony/gobreaker</code>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <p className="font-semibold">Java</p>
          <code className="text-xs text-muted-foreground">resilience4j</code>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <p className="font-semibold">Node.js</p>
          <code className="text-xs text-muted-foreground">opossum</code>
        </div>
      </div>
    </div>
  );
};

export const CircuitBreakerQuiz = () => {
  const questions = [
    {
      question: "What problem does the Circuit Breaker pattern solve?",
      options: [
        "Slow database queries",
        "Cascading failures when dependencies are slow/failing",
        "Memory leaks",
        "Network latency"
      ],
      correctIndex: 1,
      explanation: "Circuit breakers prevent cascading failures by failing fast when dependencies are struggling."
    },
    {
      question: "What happens when a circuit breaker is in the 'Open' state?",
      options: [
        "All requests are retried",
        "Requests are queued",
        "Requests fail immediately without calling the dependency",
        "Requests are load balanced to other services"
      ],
      correctIndex: 2,
      explanation: "In Open state, the breaker fails fast - returning errors immediately without attempting the call."
    },
    {
      question: "What is the purpose of the 'Half-Open' state?",
      options: [
        "To process requests at half speed",
        "To test if the dependency has recovered",
        "To queue requests",
        "To log errors"
      ],
      correctIndex: 1,
      explanation: "Half-Open allows a few test requests to probe if the dependency has recovered."
    },
    {
      question: "What triggers a circuit breaker to open?",
      options: [
        "A single failed request",
        "Manual intervention",
        "Failure rate exceeding a threshold",
        "Time of day"
      ],
      correctIndex: 2,
      explanation: "The breaker opens when the failure rate exceeds a configured threshold (e.g., 50% of recent requests)."
    },
    {
      question: "Why is 'failing fast' important?",
      options: [
        "It makes the code simpler",
        "It frees up resources and prevents timeout waits",
        "It reduces logging",
        "It improves security"
      ],
      correctIndex: 1,
      explanation: "Failing fast prevents resources (threads, connections) from being tied up waiting for timeouts."
    }
  ];

  return <Quiz questions={questions} />;
};
