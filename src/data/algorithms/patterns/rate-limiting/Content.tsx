import { Section, Paragraph } from "@/components/AlgorithmContent";
import { Quiz } from "@/components/Quiz";
import { Shield, Gauge, Layers, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const PatternCard = ({ 
  title, 
  icon: Icon,
  children,
  variant = "default"
}: { 
  title: string; 
  icon: React.ElementType;
  children: React.ReactNode;
  variant?: "default" | "green" | "blue" | "orange" | "purple";
}) => {
  const variants = {
    default: "from-primary/10 to-primary/5 border-primary/20",
    green: "from-green-500/10 to-green-500/5 border-green-500/20",
    blue: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
    orange: "from-orange-500/10 to-orange-500/5 border-orange-500/20",
    purple: "from-purple-500/10 to-purple-500/5 border-purple-500/20",
  };

  const iconVariants = {
    default: "text-primary",
    green: "text-green-500",
    blue: "text-blue-500",
    orange: "text-orange-500",
    purple: "text-purple-500",
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

const BulletList = ({ items }: { items: (string | React.ReactNode)[] }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 mt-2 flex-shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const Content = () => {
  return (
    <div className="space-y-8">
      <Section>
        <Paragraph>
          Rate limiting controls how many requests a client can make in a time window. 
          Bulkheads isolate resources so failures in one area don't affect others. 
          Together they protect systems from overload and cascading failures.
        </Paragraph>
      </Section>

      <SectionHeader>Rate Limiting Algorithms</SectionHeader>

      <div className="grid md:grid-cols-2 gap-4">
        <PatternCard title="Token Bucket" icon={Gauge} variant="blue">
          <BulletList items={[
            "Bucket holds tokens, refilled at a steady rate",
            "Each request consumes a token",
            "If bucket empty, request is rejected/queued",
            <><strong>Allows bursts</strong> up to bucket capacity</>,
            "Smooth rate limiting with burst tolerance"
          ]} />
          <div className="mt-3 p-2 bg-background/50 rounded text-xs">
            <strong>Use case:</strong> API rate limits, network traffic shaping
          </div>
        </PatternCard>

        <PatternCard title="Leaky Bucket" icon={Clock} variant="green">
          <BulletList items={[
            "Requests enter a queue (bucket)",
            "Processed at a fixed rate (leak)",
            "If bucket full, requests are dropped",
            <><strong>Smooths out bursts</strong> to constant rate</>,
            "Predictable, steady output rate"
          ]} />
          <div className="mt-3 p-2 bg-background/50 rounded text-xs">
            <strong>Use case:</strong> Traffic shaping, consistent throughput needs
          </div>
        </PatternCard>

        <PatternCard title="Fixed Window" icon={Shield} variant="orange">
          <BulletList items={[
            "Count requests in fixed time windows (e.g., per minute)",
            "Reset counter at window boundary",
            "Simple to implement",
            <><strong className="text-red-500">Problem:</strong> Burst at window edges (2x rate momentarily)</>
          ]} />
          <div className="mt-3 p-2 bg-background/50 rounded text-xs">
            <strong>Use case:</strong> Simple rate limits where edge bursts are acceptable
          </div>
        </PatternCard>

        <PatternCard title="Sliding Window" icon={Layers} variant="purple">
          <BulletList items={[
            "Combines fixed window counts with sliding calculation",
            "Weights previous window by overlap percentage",
            "Smoother than fixed window, no edge bursts",
            "Slightly more complex to implement"
          ]} />
          <div className="mt-3 p-2 bg-background/50 rounded text-xs">
            <strong>Use case:</strong> Production API rate limiting
          </div>
        </PatternCard>
      </div>

      <SectionHeader>Bulkhead Pattern</SectionHeader>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-6 h-6 text-primary" />
          <h3 className="font-bold text-lg">Isolate Critical Resources</h3>
        </div>
        <Paragraph>
          Named after ship bulkheads that contain flooding to one compartment. The goal is ensuring 
          a spike or failure in one area doesn't sink the whole system.
        </Paragraph>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="font-semibold mb-3">Thread Pool Bulkheads</h4>
          <BulletList items={[
            "Separate thread/goroutine pools per workload",
            "Critical path has dedicated workers",
            "Slow operations can't starve fast ones"
          ]} />
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="font-semibold mb-3">Connection Pool Bulkheads</h4>
          <BulletList items={[
            "Separate connection pools per dependency",
            "Database, cache, external APIs each get own pool",
            "Slow dependency can't exhaust all connections"
          ]} />
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="font-semibold mb-3">Queue Bulkheads</h4>
          <BulletList items={[
            "Separate queues (buffered channels) per workload",
            "High-volume low-priority work doesn't block critical work",
            "Can apply different rate limits per queue"
          ]} />
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="font-semibold mb-3">Service Bulkheads</h4>
          <BulletList items={[
            "Deploy critical services separately",
            "Separate infrastructure per tenant or region",
            "Noisy neighbor isolation"
          ]} />
        </div>
      </div>

      <SectionHeader>Implementation Considerations</SectionHeader>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
          <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Best Practices
          </h4>
          <BulletList items={[
            "Return 429 Too Many Requests with Retry-After header",
            "Use distributed store (Redis) for multi-instance rate limiting",
            "Different limits for different endpoints/users",
            "Monitor and alert on rate limit hits",
            "Graceful degradation when limited"
          ]} />
        </div>

        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
          <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Watch Out For
          </h4>
          <BulletList items={[
            "Race conditions in distributed counters",
            "Clock skew between servers",
            "Identifying clients (IP can be shared/spoofed)",
            "Legitimate traffic spikes vs attacks",
            "Over-restricting during incidents"
          ]} />
        </div>
      </div>

      <SectionHeader>Quick Comparison</SectionHeader>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-semibold">Algorithm</th>
              <th className="text-left p-3 font-semibold">Burst Handling</th>
              <th className="text-left p-3 font-semibold">Complexity</th>
              <th className="text-left p-3 font-semibold">Memory</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Token Bucket</td>
              <td className="p-3 text-green-600 dark:text-green-400">Allows bursts</td>
              <td className="p-3 text-muted-foreground">Low</td>
              <td className="p-3 text-muted-foreground">O(1)</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Leaky Bucket</td>
              <td className="p-3 text-orange-600 dark:text-orange-400">Smooths bursts</td>
              <td className="p-3 text-muted-foreground">Low</td>
              <td className="p-3 text-muted-foreground">O(1)</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Fixed Window</td>
              <td className="p-3 text-red-600 dark:text-red-400">Edge burst issue</td>
              <td className="p-3 text-muted-foreground">Very Low</td>
              <td className="p-3 text-muted-foreground">O(1)</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Sliding Window</td>
              <td className="p-3 text-green-600 dark:text-green-400">Smooth</td>
              <td className="p-3 text-muted-foreground">Medium</td>
              <td className="p-3 text-muted-foreground">O(1) - O(n)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const RateLimitingQuiz = () => {
  const questions = [
    {
      question: "What is the main difference between Token Bucket and Leaky Bucket?",
      options: [
        "Token Bucket is faster",
        "Token Bucket allows bursts, Leaky Bucket smooths to constant rate",
        "Leaky Bucket uses more memory",
        "They are identical"
      ],
      correctIndex: 1,
      explanation: "Token Bucket allows bursts up to bucket capacity, while Leaky Bucket smooths traffic to a constant output rate."
    },
    {
      question: "What is the 'edge burst' problem with Fixed Window rate limiting?",
      options: [
        "It uses too much memory",
        "Requests at window boundaries can allow 2x the intended rate",
        "It's too slow",
        "It doesn't work with distributed systems"
      ],
      correctIndex: 1,
      explanation: "A client can send max requests at end of one window and start of next, getting 2x rate momentarily."
    },
    {
      question: "What HTTP status code should be returned when rate limited?",
      options: [
        "400 Bad Request",
        "403 Forbidden",
        "429 Too Many Requests",
        "503 Service Unavailable"
      ],
      correctIndex: 2,
      explanation: "429 Too Many Requests is the standard response, ideally with a Retry-After header."
    },
    {
      question: "What is the purpose of the Bulkhead pattern?",
      options: [
        "To encrypt data",
        "To isolate resources so failures don't cascade",
        "To compress requests",
        "To cache responses"
      ],
      correctIndex: 1,
      explanation: "Bulkheads isolate resources (threads, connections, queues) so problems in one area don't affect others."
    },
    {
      question: "Why use separate connection pools per dependency?",
      options: [
        "To reduce memory usage",
        "So a slow dependency can't exhaust connections needed by others",
        "To improve security",
        "To simplify code"
      ],
      correctIndex: 1,
      explanation: "If one dependency is slow and ties up connections, other dependencies can still function with their dedicated pool."
    },
    {
      question: "For distributed rate limiting across multiple servers, what's commonly used?",
      options: [
        "Local memory only",
        "File system",
        "Redis or similar distributed store",
        "Environment variables"
      ],
      correctIndex: 2,
      explanation: "Redis provides atomic operations and shared state needed for consistent rate limiting across instances."
    },
    {
      question: "What HTTP header should accompany a 429 response?",
      options: [
        "X-Rate-Limit-Reset",
        "Retry-After",
        "Cache-Control",
        "Content-Length"
      ],
      correctIndex: 1,
      explanation: "Retry-After tells the client when they can retry. Additional headers like X-RateLimit-Remaining are also helpful."
    },
    {
      question: "Which rate limiting algorithm is best for APIs that need to handle legitimate traffic bursts?",
      options: [
        "Leaky Bucket",
        "Fixed Window",
        "Token Bucket",
        "Sliding Window Log"
      ],
      correctIndex: 2,
      explanation: "Token Bucket allows bursts up to the bucket capacity while maintaining a long-term average rate."
    },
    {
      question: "What is a 'race condition' in distributed rate limiting?",
      options: [
        "When two servers process the same request",
        "When multiple requests check and increment the counter non-atomically, allowing more than the limit",
        "When the rate limit is too high",
        "When requests are processed out of order"
      ],
      correctIndex: 1,
      explanation: "Without atomic operations (like Redis INCR), multiple servers might read the same count and all allow a request, exceeding the limit."
    },
    {
      question: "What is the Sliding Window Counter algorithm?",
      options: [
        "A combination of fixed windows with weighted averaging",
        "A queue-based algorithm",
        "A token-based algorithm",
        "A hash-based algorithm"
      ],
      correctIndex: 0,
      explanation: "Sliding Window Counter combines the current and previous window counts with a weighted average based on position in the current window."
    },
    {
      question: "Why might you implement different rate limits for different API endpoints?",
      options: [
        "To make the code more complex",
        "Because some operations are more expensive or sensitive than others",
        "To confuse attackers",
        "It's not recommended"
      ],
      correctIndex: 1,
      explanation: "Write operations, expensive queries, or sensitive endpoints (like login) may need stricter limits than simple read operations."
    }
  ];

  return <Quiz questions={questions} />;
};
