import { SinglePageContent, SectionTitle, TwoColumn, Column, HighlightBox, DefinitionBox } from "@/components/SinglePageContent";
import { Paragraph, Code, Callout } from "@/components/AlgorithmContent";
import { Quiz } from "@/components/Quiz";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LearnContent = () => (
  <SinglePageContent>
    <SectionTitle>Caching Patterns</SectionTitle>

    {/* Cache Aside & Read Through */}
    <TwoColumn>
      <Column>
        <DefinitionBox title="Cache Aside (Lazy Load)">
          <ul className="list-disc list-inside space-y-1 text-sm mb-3">
            <li><strong>Cache-aside logic is in the app code</strong></li>
            <li><strong>Read path:</strong> Look in cache. If miss, read from DB, put in cache. Return.</li>
            <li><strong>Write path:</strong> Write to DB. Invalidate or update cache.</li>
          </ul>
          
          <p className="text-green-600 dark:text-green-400 text-sm mb-2">
            ✓ Simple, widely known, easy to implement<br/>
            ✓ Cache is only filled for actually-used keys<br/>
            ✓ DB is the source of truth. Cache can be blown away without data loss.
          </p>
          
          <p className="text-red-600 dark:text-red-400 text-sm mb-3">
            ✗ Stale data risk if you forget to invalidate or update on write<br/>
            ✗ First read after invalidation is slower (cache miss - DB hit)<br/>
            ✗ No built-in consistency. You decide when/how to invalidate
          </p>
          
          <p className="text-sm font-semibold">Use when:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>Reads &gt;&gt; writes</li>
            <li>Stale data is acceptable for a short time</li>
            <li>You want explicit, app-level control</li>
          </ul>
        </DefinitionBox>
      </Column>
      
      <Column>
        <DefinitionBox title="Read Through">
          <ul className="list-disc list-inside space-y-1 text-sm mb-3">
            <li><strong>Similar to cache-aside, but logic lives in the cache layer/library</strong></li>
            <li><strong>Read path:</strong> If cache misses: Cache calls a loader you registered (e.g. a function that hits the DB). Stores and returns it.</li>
            <li><strong>Writes</strong> are still usually: app writes DB and invalidates cache (or uses write-through/write-behind)</li>
          </ul>
          
          <p className="text-green-600 dark:text-green-400 text-sm mb-2">
            ✓ Same benefits as cache-aside for reads, but…<br/>
            ✓ Cache logic is <strong>centralised</strong> in cache library/infra<br/>
            &nbsp;&nbsp;• Less boilerplate in app code<br/>
            &nbsp;&nbsp;• Can reuse same loader logic across services
          </p>
          
          <p className="text-red-600 dark:text-red-400 text-sm mb-3">
            ✗ Slightly more "magic", harder to reason about if abused<br/>
            ✗ You still must handle writes carefully (invalidations)<br/>
            ✗ If your loader is slow or throws, cache performance tanks
          </p>
          
          <p className="text-sm font-semibold">Use when:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>Using a caching library/framework that supports it nicely (e.g. Go in-process caches, Spring)</li>
            <li>You want consistent loading behaviour across many call sites</li>
          </ul>
        </DefinitionBox>
      </Column>
    </TwoColumn>

    {/* Write-through & Write-behind */}
    <TwoColumn>
      <Column>
        <DefinitionBox title="Write-through">
          <ul className="list-disc list-inside space-y-1 text-sm mb-3">
            <li><strong>On write:</strong> App writes to cache. Cache synchronously writes to DB.</li>
            <li><strong>On read:</strong> App reads from cache only (or read-through behaviour)</li>
          </ul>
          
          <p className="text-green-600 dark:text-green-400 text-sm mb-2">
            ✓ Cache and DB are always in sync<br/>
            ✓ Good for KV use cases where cache is "front" and DB is "backing store"
          </p>
          
          <p className="text-red-600 dark:text-red-400 text-sm mb-3">
            ✗ Write Latency<br/>
            ✗ If DB is down, writes fail (no buffering)<br/>
            ✗ Still not great for multi-row updates/transactions
          </p>
          
          <p className="text-sm font-semibold">Use when:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>Reads are very hot, and you want them always in cache</li>
            <li>When you're ok paying extra cost on writes</li>
          </ul>
        </DefinitionBox>
      </Column>
      
      <Column>
        <DefinitionBox title="Write-behind / Write-back">
          <ul className="list-disc list-inside space-y-1 text-sm mb-3">
            <li><strong>On write:</strong> Write to cache. Cache acknowledges success. Cache flushes changes to DB asynchronously.</li>
            <li><strong>On read:</strong> App reads from cache only (or read-through behaviour)</li>
          </ul>
          
          <p className="text-green-600 dark:text-green-400 text-sm mb-2">
            ✓ Very fast writes as DB latency hidden<br/>
            ✓ Can batch DB operations<br/>
            ✓ Great when data can tolerate a bit of lag before persisting
          </p>
          
          <p className="text-red-600 dark:text-red-400 text-sm mb-3">
            ✗ If cache node dies before flushing there is data loss<br/>
            ✗ Harder failure modes: DB & cache can diverge<br/>
            ✗ Complexity in retry/batch logic. Ordering issues<br/>
            ✗ Inconsistent reads if some writes haven't hit DB yet
          </p>
          
          <p className="text-sm font-semibold">Use when:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>Metrics / analytics buffers</li>
            <li>Non-critical counters, logs, temporary stats</li>
          </ul>
        </DefinitionBox>
      </Column>
    </TwoColumn>

    {/* Refresh-ahead & Cache Location */}
    <TwoColumn>
      <Column>
        <DefinitionBox title="Refresh-ahead / Background">
          <p className="text-sm mb-3">
            Cache-aside or read-through, but before a cached value expires, a background job proactively refreshes it.
          </p>
          
          <p className="text-green-600 dark:text-green-400 text-sm mb-2">
            ✓ Reduces user-facing cache misses for hot keys<br/>
            ✓ Keeps data fresher with fewer stale-window gaps
          </p>
          
          <p className="text-red-600 dark:text-red-400 text-sm mb-3">
            ✗ Extra complexity. Need to track hot keys<br/>
            ✗ Can waste work refreshing keys that aren't actually used<br/>
            ✗ Can cause burst traffic to DB if done naively
          </p>
          
          <p className="text-sm font-semibold">Use when:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>Expensive-to-compute, frequently-read data where occasional stale is ok</li>
            <li>But you want to avoid spikes of cache misses</li>
          </ul>
        </DefinitionBox>
      </Column>
      
      <Column>
        <DefinitionBox title="Cache Location">
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>Client-side / browser:</strong> HTTP caching, localStorage, in-memory</li>
            <li><strong>CDN / edge:</strong> static assets, some API responses via Cache-Control & ETag</li>
            <li><strong>App-layer cache:</strong>
              <ul className="list-disc list-inside ml-4 text-muted-foreground">
                <li>In-process cache (Go map + LRU, Bigtable of structs, etc.)</li>
                <li>Redis/Memcached for shared cache</li>
              </ul>
            </li>
            <li><strong>DB-level:</strong> DBs own buffer cache</li>
          </ul>
        </DefinitionBox>
      </Column>
    </TwoColumn>

    {/* Summary comparison */}
    <Callout type="info" title="Quick Comparison">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-4">Pattern</th>
              <th className="text-left py-2 pr-4">Read Logic</th>
              <th className="text-left py-2 pr-4">Write Logic</th>
              <th className="text-left py-2">Consistency</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4 font-medium">Cache Aside</td>
              <td className="py-2 pr-4">App checks cache → DB</td>
              <td className="py-2 pr-4">App writes DB, invalidates cache</td>
              <td className="py-2">Eventually consistent</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4 font-medium">Read Through</td>
              <td className="py-2 pr-4">Cache auto-loads from DB</td>
              <td className="py-2 pr-4">App writes DB, invalidates cache</td>
              <td className="py-2">Eventually consistent</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4 font-medium">Write Through</td>
              <td className="py-2 pr-4">From cache</td>
              <td className="py-2 pr-4">Cache writes to DB sync</td>
              <td className="py-2">Strong</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4 font-medium">Write Behind</td>
              <td className="py-2 pr-4">From cache</td>
              <td className="py-2 pr-4">Cache writes to DB async</td>
              <td className="py-2">Eventual (risk of loss)</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">Refresh Ahead</td>
              <td className="py-2 pr-4">From cache (pre-warmed)</td>
              <td className="py-2 pr-4">Background refresh</td>
              <td className="py-2">Eventually consistent</td>
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
