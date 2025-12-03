import { Section, Paragraph } from "@/components/AlgorithmContent";
import { Quiz } from "@/components/Quiz";
import { Shield, Server, Gauge, Clock, Database, AlertTriangle, CheckCircle, HelpCircle, Zap } from "lucide-react";

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

const AlgorithmCard = ({ 
  title, 
  pros, 
  cons 
}: { 
  title: string; 
  pros: string[];
  cons: string[];
}) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <h4 className="font-bold text-sm mb-3">{title}</h4>
    <div className="space-y-2">
      {pros.map((pro, i) => (
        <p key={i} className="text-xs flex items-start gap-1">
          <span className="text-green-500 flex-shrink-0">•</span>
          <span className="text-green-600 dark:text-green-400">{pro}</span>
        </p>
      ))}
      {cons.map((con, i) => (
        <p key={i} className="text-xs flex items-start gap-1">
          <span className="text-red-500 flex-shrink-0">•</span>
          <span className="text-red-600 dark:text-red-400">{con}</span>
        </p>
      ))}
    </div>
  </div>
);

export const Content = () => {
  return (
    <div className="space-y-8">
      <Section>
        <Paragraph>
          A rate limiter controls the rate of traffic sent by a client or service. It's essential for 
          preventing abuse, ensuring fair usage, and protecting backend services from overload.
        </Paragraph>
      </Section>

      <SectionHeader>Clarifying Questions</SectionHeader>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-primary" />
            Questions to Ask
          </h4>
          <BulletList items={[
            "Throttle by what? (user ID, IP, API key, endpoint)",
            "What scale? (requests per second)",
            "Distributed or single server?",
            "Separate service or in code?"
          ]} />
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Server className="w-4 h-4 text-primary" />
            Design Options
          </h4>
          <BulletList items={[
            <><strong>Server side:</strong> as part of API servers</>,
            <><strong>API Gateway:</strong> middleware handling SSL, auth, rate limiting</>,
            <><strong>Third party:</strong> commercial API gateway (Kong, AWS API GW)</>
          ]} />
        </div>
      </div>

      <SectionHeader>Algorithm Choices</SectionHeader>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AlgorithmCard
          title="Token Bucket"
          pros={[
            "Top up bucket at fixed rate up to max",
            "Simple, memory efficient, allows bursts",
            "Fine tuning possible"
          ]}
          cons={[]}
        />
        <AlgorithmCard
          title="Leaking Bucket"
          pros={[
            "Requests picked from capped queue at fixed rate",
            "Simple, memory efficient, stable outflow"
          ]}
          cons={[
            "Not great for traffic bursts",
            "Fine tuning needed"
          ]}
        />
        <AlgorithmCard
          title="Sliding Window Log"
          pros={[
            "Keep timestamps of requests to look back",
            "Very accurate"
          ]}
          cons={[
            "Consumes a lot of memory"
          ]}
        />
        <AlgorithmCard
          title="Fixed Window Counter"
          pros={[
            "Split timeline into windows, assign counters",
            "Simple, memory efficient, good for polling"
          ]}
          cons={[
            "Clustering near boundaries (2x burst possible)"
          ]}
        />
        <AlgorithmCard
          title="Sliding Window Counter"
          pros={[
            "Requests in current + (prev window × overlap %)",
            "Smooths based on prev window rate",
            "Only ~0.0003% error rate"
          ]}
          cons={[
            "More complex than fixed window"
          ]}
        />
      </div>

      <SectionHeader>Deep Dive: Implementation</SectionHeader>

      <div className="grid md:grid-cols-2 gap-4">
        <ConceptCard title="Rules, Files, Headers & HTTP" icon={Shield} variant="blue">
          <BulletList items={[
            <>Use a <strong>rules file</strong> on disk for rate limit config</>,
            <>Return <strong>429 Too Many Requests</strong> error code if limited</>,
            <>Include headers: <code className="bg-muted px-1 rounded text-xs">X-Ratelimit-Remaining</code>, <code className="bg-muted px-1 rounded text-xs">Limit</code>, <code className="bg-muted px-1 rounded text-xs">Retry-After</code></>
          ]} />
        </ConceptCard>

        <ConceptCard title="Data Storage" icon={Database} variant="green">
          <BulletList items={[
            "Rate limiter itself is stateless",
            "Keep authoritative rules in central in-memory cache",
            "Background workers update cache from rules file",
            "Each instance reads from cache → horizontally scalable",
            <>Redis INCR and EXPIRE work perfectly for counters</>
          ]} />
        </ConceptCard>
      </div>

      <SectionHeader>Distributed Challenges</SectionHeader>

      <div className="space-y-4">
        <ConceptCard title="Race Conditions" icon={AlertTriangle} variant="orange">
          <Paragraph>
            <strong>Problem:</strong> After reading counter but before incrementing, another request arrives.
          </Paragraph>
          <div className="mt-3 space-y-2">
            <p className="text-sm"><strong>Solutions:</strong></p>
            <BulletList items={[
              "Locks (slow, avoid if possible)",
              "Redis Lua scripts or sorted sets",
              <><strong>Redis is atomic</strong> — single Redis instance keeps counters in sync</>
            ]} />
          </div>
        </ConceptCard>

        <ConceptCard title="Synchronisation Across Instances" icon={Zap} variant="purple">
          <Paragraph>
            <strong>Problem:</strong> For millions of users, you need multiple rate limiters. Without sync, they don't know about each other's counts.
          </Paragraph>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">Bad Solution</p>
              <p className="text-xs text-muted-foreground">Sticky sessions — not scalable</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">Good Solution</p>
              <p className="text-xs text-muted-foreground">Centralised Redis — HA, low latency, in-memory</p>
            </div>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            <p>Since not storing critical durable state, can just block or allow too many requests temporarily during Redis issues.</p>
          </div>
        </ConceptCard>
      </div>

      <SectionHeader>Performance Optimisation</SectionHeader>

      <div className="rounded-lg border border-border bg-card p-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Multi-data Centre</h4>
            <p className="text-sm text-muted-foreground">Traffic can be routed to closest edge. Eventual consistency synchronisation between DCs.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Performance Monitoring</h4>
            <p className="text-sm text-muted-foreground">Is algorithm effective? E.g., for flash sales, are we losing too many valid requests?</p>
          </div>
        </div>
      </div>

      <SectionHeader>Extras & Best Practices</SectionHeader>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
          <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Best Practices
          </h4>
          <BulletList items={[
            "Client cache to reduce API calls",
            "Sufficient backoff time in retry logic",
            "Catch and handle rate limit errors gracefully",
            "Different limits for different endpoints/users"
          ]} />
        </div>

        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
          <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Additional Considerations
          </h4>
          <BulletList items={[
            <><strong>Hard vs Soft:</strong> Hard = strict cutoff, Soft = allow some overflow</>,
            <><strong>OSI Levels:</strong> Can rate limit at layer 3 (IP), 4 (TCP), or 7 (HTTP)</>,
            "Consider different rules for authenticated vs anonymous users"
          ]} />
        </div>
      </div>

      <SectionHeader>Quick Reference</SectionHeader>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-semibold">Algorithm</th>
              <th className="text-left p-3 font-semibold">Burst Handling</th>
              <th className="text-left p-3 font-semibold">Memory</th>
              <th className="text-left p-3 font-semibold">Accuracy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Token Bucket</td>
              <td className="p-3 text-green-600 dark:text-green-400">Allows bursts</td>
              <td className="p-3">O(1)</td>
              <td className="p-3">Good</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Leaking Bucket</td>
              <td className="p-3 text-orange-600 dark:text-orange-400">Smooths bursts</td>
              <td className="p-3">O(1)</td>
              <td className="p-3">Good</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Sliding Window Log</td>
              <td className="p-3">Accurate</td>
              <td className="p-3 text-red-600 dark:text-red-400">O(n)</td>
              <td className="p-3 text-green-600 dark:text-green-400">Very High</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Fixed Window</td>
              <td className="p-3 text-red-600 dark:text-red-400">Edge burst issue</td>
              <td className="p-3">O(1)</td>
              <td className="p-3">Low</td>
            </tr>
            <tr className="hover:bg-muted/30">
              <td className="p-3 font-medium">Sliding Window Counter</td>
              <td className="p-3 text-green-600 dark:text-green-400">Smooth</td>
              <td className="p-3">O(1)</td>
              <td className="p-3 text-green-600 dark:text-green-400">High (~0.0003% error)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const RateLimiterQuiz = () => {
  const questions = [
    {
      question: "What HTTP status code should be returned when a client is rate limited?",
      options: [
        "400 Bad Request",
        "403 Forbidden",
        "429 Too Many Requests",
        "503 Service Unavailable"
      ],
      correctIndex: 2,
      explanation: "429 Too Many Requests is the standard response for rate limiting."
    },
    {
      question: "What is the main advantage of Token Bucket over Leaking Bucket?",
      options: [
        "Uses less memory",
        "Allows traffic bursts while maintaining average rate",
        "More accurate counting",
        "Simpler to implement"
      ],
      correctIndex: 1,
      explanation: "Token Bucket allows bursts up to bucket capacity, while Leaking Bucket smooths to constant rate."
    },
    {
      question: "What is the 'edge burst' problem with Fixed Window Counter?",
      options: [
        "It uses too much memory",
        "Requests at window boundaries can allow 2x the intended rate",
        "It's too slow",
        "It doesn't work with Redis"
      ],
      correctIndex: 1,
      explanation: "A client can make max requests at end of one window and start of next, temporarily doubling the rate."
    },
    {
      question: "Why is Redis commonly used for distributed rate limiting?",
      options: [
        "It's the cheapest option",
        "It's the only database that works",
        "It provides atomic operations (INCR/EXPIRE) and low latency",
        "It has better security"
      ],
      correctIndex: 2,
      explanation: "Redis INCR is atomic and EXPIRE handles TTL, making it perfect for rate limit counters."
    },
    {
      question: "What headers should a rate limiter return to help clients?",
      options: [
        "Content-Type only",
        "X-Ratelimit-Remaining, Limit, and Retry-After",
        "Authorization headers",
        "Cache-Control only"
      ],
      correctIndex: 1,
      explanation: "These headers tell clients their remaining quota, the limit, and when to retry."
    },
    {
      question: "Why is sticky sessions a 'bad solution' for distributed rate limiting?",
      options: [
        "It's too expensive",
        "It's not scalable and creates hotspots",
        "It doesn't work with HTTP",
        "It requires too much memory"
      ],
      correctIndex: 1,
      explanation: "Sticky sessions tie users to specific servers, preventing horizontal scaling."
    },
    {
      question: "What makes Sliding Window Counter more accurate than Fixed Window?",
      options: [
        "It uses more memory",
        "It weights the previous window by overlap percentage",
        "It's faster",
        "It uses a different data structure"
      ],
      correctIndex: 1,
      explanation: "Sliding window calculates: current requests + (previous window × overlap %), smoothing the rate."
    },
    {
      question: "What is 'soft' rate limiting?",
      options: [
        "Rate limiting that uses software only",
        "Allowing some overflow beyond the strict limit",
        "Rate limiting at the application layer",
        "Rate limiting with longer windows"
      ],
      correctIndex: 1,
      explanation: "Soft rate limiting allows some requests beyond the limit, unlike hard limits which strictly cut off."
    }
  ];

  return <Quiz questions={questions} />;
};
