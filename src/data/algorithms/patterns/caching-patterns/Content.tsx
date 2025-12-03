import { SinglePageContent, SectionTitle } from "@/components/SinglePageContent";
import { Callout } from "@/components/AlgorithmContent";
import { Quiz } from "@/components/Quiz";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Zap, RefreshCw, Server, Clock, AlertTriangle } from "lucide-react";

interface PatternCardProps {
  title: string;
  icon: React.ReactNode;
  description?: string;
  mechanics: { label: string; text: string }[];
  pros: string[];
  cons: string[];
  useWhen: string[];
}

const PatternCard = ({ title, icon, description, mechanics, pros, cons, useWhen }: PatternCardProps) => (
  <div className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors">
    {/* Header */}
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-5 py-4 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="font-bold text-lg text-foreground">{title}</h3>
      </div>
    </div>
    
    {/* Content */}
    <div className="p-5 space-y-4">
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      
      {/* Mechanics */}
      <div className="space-y-2">
        {mechanics.map((m, i) => (
          <div key={i} className="flex gap-2 text-sm">
            <span className="font-semibold text-foreground whitespace-nowrap">{m.label}:</span>
            <span className="text-muted-foreground">{m.text}</span>
          </div>
        ))}
      </div>
      
      {/* Pros */}
      <div className="space-y-1.5">
        {pros.map((pro, i) => (
          <div key={i} className="flex gap-2 text-sm">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span className="text-green-600 dark:text-green-400">{pro}</span>
          </div>
        ))}
      </div>
      
      {/* Cons */}
      <div className="space-y-1.5">
        {cons.map((con, i) => (
          <div key={i} className="flex gap-2 text-sm">
            <span className="text-red-500 flex-shrink-0">✗</span>
            <span className="text-red-600 dark:text-red-400">{con}</span>
          </div>
        ))}
      </div>
      
      {/* Use when */}
      <div className="pt-3 border-t border-border/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Use when</p>
        <ul className="space-y-1">
          {useWhen.map((use, i) => (
            <li key={i} className="text-sm text-muted-foreground flex gap-2">
              <span className="text-primary">→</span>
              {use}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const LocationCard = () => (
  <div className="rounded-xl border border-border bg-card overflow-hidden">
    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-5 py-4 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
          <Server className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg text-foreground">Cache Location</h3>
      </div>
    </div>
    
    <div className="p-5">
      <div className="space-y-4">
        {[
          { layer: "Client-side / browser", examples: "HTTP caching, localStorage, in-memory", color: "bg-blue-500" },
          { layer: "CDN / edge", examples: "Static assets, API responses via Cache-Control & ETag", color: "bg-purple-500" },
          { layer: "App-layer cache", examples: "In-process (Go map + LRU), Redis/Memcached for shared", color: "bg-green-500" },
          { layer: "DB-level", examples: "Database's own buffer cache", color: "bg-orange-500" },
        ].map((loc, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className={`w-2 h-2 rounded-full ${loc.color} mt-2 flex-shrink-0`} />
            <div>
              <p className="font-medium text-sm text-foreground">{loc.layer}</p>
              <p className="text-sm text-muted-foreground">{loc.examples}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LearnContent = () => (
  <SinglePageContent>
    <SectionTitle>Caching Patterns</SectionTitle>

    {/* Main patterns grid */}
    <div className="grid md:grid-cols-2 gap-5 mb-8">
      <PatternCard
        title="Cache Aside (Lazy Load)"
        icon={<Database className="w-5 h-5" />}
        mechanics={[
          { label: "Read", text: "Check cache → miss → read DB → populate cache → return" },
          { label: "Write", text: "Write to DB → invalidate or update cache" },
        ]}
        pros={[
          "Simple, widely known, easy to implement",
          "Cache only filled for actually-used keys",
          "DB is source of truth — cache can be cleared safely",
        ]}
        cons={[
          "Stale data if you forget to invalidate on write",
          "First read after invalidation is slower (cache miss)",
          "No built-in consistency — you decide when to invalidate",
        ]}
        useWhen={[
          "Reads >> writes",
          "Stale data is acceptable briefly",
          "You want explicit, app-level control",
        ]}
      />
      
      <PatternCard
        title="Read Through"
        icon={<Zap className="w-5 h-5" />}
        mechanics={[
          { label: "Read", text: "Cache auto-calls your loader on miss → stores & returns" },
          { label: "Write", text: "Usually: write DB → invalidate cache" },
        ]}
        pros={[
          "Same benefits as cache-aside for reads",
          "Cache logic centralised in library/infra",
          "Less boilerplate, reusable loaders across services",
        ]}
        cons={[
          'More "magic" — harder to reason about if abused',
          "Still must handle writes carefully (invalidations)",
          "If loader is slow/throws, cache performance tanks",
        ]}
        useWhen={[
          "Using a caching library that supports it (Go, Spring)",
          "You want consistent loading across call sites",
        ]}
      />
      
      <PatternCard
        title="Write-through"
        icon={<Clock className="w-5 h-5" />}
        mechanics={[
          { label: "Write", text: "App writes cache → cache synchronously writes DB" },
          { label: "Read", text: "Always from cache (or read-through)" },
        ]}
        pros={[
          "Cache and DB always in sync",
          'Good for KV where cache is "front", DB is "backing store"',
        ]}
        cons={[
          "Write latency (synchronous DB write)",
          "If DB is down, writes fail (no buffering)",
          "Not great for multi-row updates/transactions",
        ]}
        useWhen={[
          "Reads are very hot, must always be in cache",
          "You're ok paying extra cost on writes",
        ]}
      />
      
      <PatternCard
        title="Write-behind / Write-back"
        icon={<RefreshCw className="w-5 h-5" />}
        mechanics={[
          { label: "Write", text: "Write to cache → ack success → flush to DB async" },
          { label: "Read", text: "Always from cache (or read-through)" },
        ]}
        pros={[
          "Very fast writes — DB latency hidden",
          "Can batch DB operations",
          "Great when data tolerates lag before persisting",
        ]}
        cons={[
          "Data loss if cache dies before flushing",
          "Harder failure modes — DB & cache can diverge",
          "Complexity in retry/batch logic, ordering issues",
        ]}
        useWhen={[
          "Metrics / analytics buffers",
          "Non-critical counters, logs, temporary stats",
        ]}
      />
    </div>

    {/* Bottom row */}
    <div className="grid md:grid-cols-2 gap-5 mb-8">
      <PatternCard
        title="Refresh-ahead / Background"
        icon={<AlertTriangle className="w-5 h-5" />}
        description="Cache-aside or read-through, but a background job proactively refreshes values before they expire."
        mechanics={[]}
        pros={[
          "Reduces user-facing cache misses for hot keys",
          "Keeps data fresher with fewer stale-window gaps",
        ]}
        cons={[
          "Extra complexity — need to track hot keys",
          "Can waste work refreshing unused keys",
          "Can cause burst DB traffic if done naively",
        ]}
        useWhen={[
          "Expensive-to-compute, frequently-read data",
          "Want to avoid spikes of cache misses",
        ]}
      />
      
      <LocationCard />
    </div>

    {/* Summary comparison */}
    <Callout type="info" title="Quick Comparison">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2.5 pr-4 font-semibold">Pattern</th>
              <th className="text-left py-2.5 pr-4 font-semibold">Read Logic</th>
              <th className="text-left py-2.5 pr-4 font-semibold">Write Logic</th>
              <th className="text-left py-2.5 font-semibold">Consistency</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-2.5 pr-4 font-medium text-foreground">Cache Aside</td>
              <td className="py-2.5 pr-4">App checks cache → DB</td>
              <td className="py-2.5 pr-4">App writes DB, invalidates cache</td>
              <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs">Eventual</span></td>
            </tr>
            <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-2.5 pr-4 font-medium text-foreground">Read Through</td>
              <td className="py-2.5 pr-4">Cache auto-loads from DB</td>
              <td className="py-2.5 pr-4">App writes DB, invalidates cache</td>
              <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs">Eventual</span></td>
            </tr>
            <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-2.5 pr-4 font-medium text-foreground">Write Through</td>
              <td className="py-2.5 pr-4">From cache</td>
              <td className="py-2.5 pr-4">Cache writes to DB sync</td>
              <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs">Strong</span></td>
            </tr>
            <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-2.5 pr-4 font-medium text-foreground">Write Behind</td>
              <td className="py-2.5 pr-4">From cache</td>
              <td className="py-2.5 pr-4">Cache writes to DB async</td>
              <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs">Eventual + risk</span></td>
            </tr>
            <tr className="hover:bg-muted/30 transition-colors">
              <td className="py-2.5 pr-4 font-medium text-foreground">Refresh Ahead</td>
              <td className="py-2.5 pr-4">From cache (pre-warmed)</td>
              <td className="py-2.5 pr-4">Background refresh</td>
              <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs">Eventual</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Callout>
  </SinglePageContent>
);

const quizQuestions = [
  {
    question: "In cache-aside, where does the cache logic live?",
    options: [
      "In the cache library",
      "In the application code",
      "In the database",
      "In a separate service"
    ],
    correctIndex: 1,
    explanation: "Cache-aside logic is in the app code. The application explicitly checks the cache, fetches from DB on miss, and updates the cache."
  },
  {
    question: "What's the main advantage of read-through over cache-aside?",
    options: [
      "Better performance",
      "Stronger consistency",
      "Centralised cache logic in the library",
      "Lower memory usage"
    ],
    correctIndex: 2,
    explanation: "Read-through centralises cache logic in the cache library/infra, reducing boilerplate in app code and allowing reuse of loader logic across services."
  },
  {
    question: "Which caching pattern has the highest risk of data loss?",
    options: [
      "Cache aside",
      "Write-through",
      "Write-behind/write-back",
      "Read-through"
    ],
    correctIndex: 2,
    explanation: "Write-behind has risk of data loss if the cache node dies before flushing changes to the database asynchronously."
  },
  {
    question: "When should you use write-through caching?",
    options: [
      "When write latency is critical",
      "When you need cache and DB always in sync",
      "When you want to batch writes",
      "When data loss is acceptable"
    ],
    correctIndex: 1,
    explanation: "Write-through keeps cache and DB always in sync by writing synchronously to both. Use it when consistency is more important than write latency."
  },
  {
    question: "What problem does refresh-ahead solve?",
    options: [
      "Write amplification",
      "Cache misses for hot keys",
      "Memory pressure",
      "Network partitions"
    ],
    correctIndex: 1,
    explanation: "Refresh-ahead proactively refreshes cached values before they expire, reducing user-facing cache misses for frequently accessed (hot) keys."
  },
  {
    question: "Which is NOT a typical cache location?",
    options: [
      "Client-side / browser",
      "CDN / edge",
      "Load balancer",
      "App-layer (Redis/Memcached)"
    ],
    correctIndex: 2,
    explanation: "Load balancers distribute traffic but don't typically cache data. Common cache locations are client-side, CDN/edge, app-layer (Redis/Memcached), and DB-level buffer cache."
  },
  {
    question: "In write-behind caching, what happens when you write data?",
    options: [
      "Data is written to DB synchronously, then cache",
      "Data is written to cache, DB write happens asynchronously",
      "Data is written to both cache and DB in parallel",
      "Data is only written to cache, never to DB"
    ],
    correctIndex: 1,
    explanation: "Write-behind (write-back) writes to cache and immediately acknowledges success. The cache then flushes changes to the DB asynchronously."
  },
  {
    question: "What's a key disadvantage of cache-aside?",
    options: [
      "Complex implementation",
      "High memory usage",
      "Stale data risk if you forget to invalidate on write",
      "Requires special cache library"
    ],
    correctIndex: 2,
    explanation: "Cache-aside has stale data risk if you forget to invalidate or update the cache when writing to the database. There's no built-in consistency mechanism."
  }
];

const QuizContent = () => (
  <Quiz questions={quizQuestions} />
);

export const CachingPatternsContent = () => (
  <Tabs defaultValue="learn" className="w-full">
    <TabsList className="grid w-full grid-cols-2 mb-6">
      <TabsTrigger value="learn">Learn</TabsTrigger>
      <TabsTrigger value="quiz">Quiz</TabsTrigger>
    </TabsList>
    <TabsContent value="learn">
      <LearnContent />
    </TabsContent>
    <TabsContent value="quiz">
      <QuizContent />
    </TabsContent>
  </Tabs>
);
