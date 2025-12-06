import { Section, Paragraph, Heading } from "@/components/AlgorithmContent";
import { Callout } from "@/components/Callout";
import { QuizQuestion } from "@/components/Quiz";

export const quizQuestions: QuizQuestion[] = [
  // Powers of Two
  {
    question: "Approximately how many bytes is 2^30?",
    options: ["1 KB", "1 MB", "1 GB", "1 TB"],
    correctIndex: 2,
    explanation: "2^30 ≈ 1 GB (1,073,741,824 bytes). Remember: 10→KB, 20→MB, 30→GB, 40→TB, 50→PB."
  },
  {
    question: "How many bytes is 2^40?",
    options: ["1 GB", "1 TB", "1 PB", "1 MB"],
    correctIndex: 1,
    explanation: "2^40 ≈ 1 TB. Every 10 powers of 2 multiplies by ~1000."
  },
  // Latency fundamentals
  {
    question: "Which operation is approximately 100,000x slower than main memory reference?",
    options: ["L1 cache reference", "L2 cache reference", "Mutex lock/unlock", "Disk seek (HDD)"],
    correctIndex: 3,
    explanation: "Main memory reference is ~100ns, disk seek is ~10ms (10,000,000ns) - about 100,000x slower."
  },
  {
    question: "What is the approximate latency for a round trip within the same data center?",
    options: ["1 ns", "100 ns", "0.5 ms", "100 ms"],
    correctIndex: 2,
    explanation: "A round trip within the same data center is approximately 0.5ms (500μs)."
  },
  {
    question: "How long does an L1 cache reference take?",
    options: ["~1 ns", "~100 ns", "~1 μs", "~1 ms"],
    correctIndex: 0,
    explanation: "L1 cache is the fastest memory, taking about 1 nanosecond - it sits closest to the CPU."
  },
  {
    question: "How long does a main memory (RAM) reference take?",
    options: ["~1 ns", "~10 ns", "~100 ns", "~1 ms"],
    correctIndex: 2,
    explanation: "RAM access is approximately 100 nanoseconds - about 100x slower than L1 cache."
  },
  // Network latency
  {
    question: "Approximately how long does it take to send a packet from California to Netherlands and back?",
    options: ["1 ms", "10 ms", "100 ms", "1 second"],
    correctIndex: 2,
    explanation: "Cross-continent round trips are approximately 100ms due to physical distance and speed of light limits."
  },
  {
    question: "What is typical latency for a request from US East to US West coast?",
    options: ["1-5 ms", "30-50 ms", "100-150 ms", "500 ms"],
    correctIndex: 1,
    explanation: "US cross-country latency is typically 30-50ms round trip, mainly due to physical distance."
  },
  {
    question: "What latency should you expect for a request from Europe to Asia?",
    options: ["10 ms", "50 ms", "150-250 ms", "500 ms"],
    correctIndex: 2,
    explanation: "Europe to Asia round trip is typically 150-250ms due to the long physical distance."
  },
  {
    question: "A user in Tokyo accesses a service in London. What is the minimum network latency?",
    options: ["10 ms", "50 ms", "100 ms", "200+ ms"],
    correctIndex: 3,
    explanation: "Tokyo to London is approximately 9,500km. At light speed in fiber (~200km/ms), round trip is ~200ms minimum."
  },
  // Disk and SSD
  {
    question: "How much faster is SSD random read compared to HDD seek?",
    options: ["2x faster", "10x faster", "100x faster", "Same speed"],
    correctIndex: 2,
    explanation: "HDD seek is ~10ms, SSD random read is ~0.1ms. SSDs are roughly 100x faster for random access."
  },
  {
    question: "What is approximate sequential read throughput from a modern SSD?",
    options: ["50 MB/s", "500 MB/s", "5 GB/s", "50 GB/s"],
    correctIndex: 1,
    explanation: "Modern SATA SSDs read at ~500 MB/s. NVMe SSDs can reach 3-7 GB/s."
  },
  // Compression
  {
    question: "Why should you compress data before sending over the internet?",
    options: ["Compression is slower than network transfer", "Compression is fast and reduces network latency", "Network has unlimited bandwidth", "Compression improves security"],
    correctIndex: 1,
    explanation: "Compression is very fast (~10μs for 1KB). Since network transfer is slow relative to CPU, compressing first reduces total time."
  },
  {
    question: "How long does it take to compress 1KB with a fast algorithm like LZ4?",
    options: ["~1 ns", "~10 μs", "~10 ms", "~1 second"],
    correctIndex: 1,
    explanation: "Fast compression algorithms like LZ4 or Snappy compress 1KB in approximately 10 microseconds."
  },
  // Data sizes
  {
    question: "How much storage would 1 million SQL rows typically require?",
    options: ["1-5 MB", "10-50 MB", "100-500 MB", "1-5 GB"],
    correctIndex: 2,
    explanation: "With typical rows of 100-500 bytes, 1M rows = 100-500 MB. This easily fits in memory for most servers."
  },
  {
    question: "What is the approximate size of a typical REST API paginated response?",
    options: ["100 bytes - 1 KB", "10-100 KB", "1-10 MB", "100+ MB"],
    correctIndex: 1,
    explanation: "A paginated API response with 20-50 items typically ranges from 10-100 KB depending on the data structure."
  },
  // Scenario-based calculations
  {
    question: "An API returns 50KB and the user is on a 10 Mbps connection. How long to download?",
    options: ["~4 ms", "~40 ms", "~400 ms", "~4 seconds"],
    correctIndex: 1,
    explanation: "50KB = 400Kb. At 10 Mbps, 400Kb / 10Mbps = 40ms. Plus RTT overhead."
  },
  {
    question: "You need to read 1GB from disk sequentially on SSD. Approximately how long?",
    options: ["~100 ms", "~2 seconds", "~20 seconds", "~2 minutes"],
    correctIndex: 1,
    explanation: "At ~500 MB/s sequential read, 1GB takes about 2 seconds."
  },
  {
    question: "Your service makes 3 sequential calls to other services in the same DC. Each takes 5ms. Total latency?",
    options: ["5 ms", "10 ms", "15 ms", "20 ms"],
    correctIndex: 2,
    explanation: "Sequential calls add up: 5ms + 5ms + 5ms = 15ms. This is why parallelizing calls matters."
  },
  {
    question: "If those same 3 calls (5ms each) were made in parallel, what would total latency be?",
    options: ["5 ms", "10 ms", "15 ms", "20 ms"],
    correctIndex: 0,
    explanation: "In parallel, latency is the max of all calls = 5ms. Parallelization reduces latency significantly."
  },
  // Database latency
  {
    question: "What is typical latency for a simple indexed query to a local PostgreSQL database?",
    options: ["~0.1 ms", "~1-5 ms", "~50 ms", "~500 ms"],
    correctIndex: 1,
    explanation: "Simple indexed queries typically take 1-5ms including connection overhead. Complex queries take longer."
  },
  {
    question: "What latency should you expect for a Redis cache hit in the same datacenter?",
    options: ["~0.01 ms", "~0.1-0.5 ms", "~5-10 ms", "~50 ms"],
    correctIndex: 1,
    explanation: "Redis in the same DC typically responds in 0.1-0.5ms for simple operations."
  },
  {
    question: "A full table scan on 10 million rows (no index) would take approximately?",
    options: ["10 ms", "100 ms", "1-10 seconds", "1+ minutes"],
    correctIndex: 2,
    explanation: "Full table scans are expensive. 10M rows could take seconds to tens of seconds depending on row size and disk speed."
  },
  // TLS and connection overhead
  {
    question: "How much latency does a TLS handshake add (new connection)?",
    options: ["~0.1 ms", "~1-2 RTTs (2-4 ms same DC)", "~100 ms", "~1 second"],
    correctIndex: 1,
    explanation: "TLS 1.2 requires 2 RTTs, TLS 1.3 requires 1 RTT. In same DC, this adds 1-4ms."
  },
  {
    question: "Why do connection pools improve performance?",
    options: ["They compress data", "They avoid TCP/TLS handshake overhead on each request", "They add caching", "They reduce memory usage"],
    correctIndex: 1,
    explanation: "Reusing connections avoids TCP (1 RTT) and TLS (1-2 RTT) handshakes, saving milliseconds per request."
  },
  // Throughput calculations
  {
    question: "If a service handles 10,000 RPS with 10ms average latency, how many concurrent connections needed?",
    options: ["10", "100", "1,000", "10,000"],
    correctIndex: 1,
    explanation: "Using Little's Law: Concurrency = Throughput × Latency = 10,000 × 0.01s = 100 concurrent requests."
  },
  {
    question: "A 1 Gbps network link can transfer how much data per second?",
    options: ["1 MB/s", "~125 MB/s", "1 GB/s", "~125 GB/s"],
    correctIndex: 1,
    explanation: "1 Gbps = 1000 Mbps / 8 = 125 MB/s. Remember: bits vs bytes!"
  },
  {
    question: "Your API sends 100KB responses at 5000 RPS. What bandwidth is required?",
    options: ["50 MB/s", "500 MB/s", "5 GB/s", "50 GB/s"],
    correctIndex: 1,
    explanation: "100KB × 5000 = 500,000 KB/s = 500 MB/s = 4 Gbps."
  },
  // End-to-end scenarios
  {
    question: "User in Sydney requests data from US-West server, which queries a DB. Minimum realistic latency?",
    options: ["10 ms", "50 ms", "150-200 ms", "1 second"],
    correctIndex: 2,
    explanation: "Sydney to US-West is ~150ms RTT. DB query adds a few ms. Total: 150-200ms minimum."
  },
  {
    question: "A mobile user on 4G makes an API call. What latency overhead does the mobile network add?",
    options: ["1-5 ms", "20-50 ms", "200-300 ms", "1 second"],
    correctIndex: 1,
    explanation: "4G networks add 20-50ms latency. 3G can add 100-300ms. 5G is closer to 10-20ms."
  },
  {
    question: "You cache a value in CDN edge. User 100km away requests it. CDN response time?",
    options: ["~1 ms", "~5-10 ms", "~50 ms", "~100 ms"],
    correctIndex: 1,
    explanation: "CDN edge servers are geographically close. 100km ≈ 1ms network + processing = 5-10ms typical."
  },
  // Memory and caching
  {
    question: "How much data can you scan in RAM in 1 second?",
    options: ["~1 MB", "~100 MB", "~10 GB", "~100 GB+"],
    correctIndex: 3,
    explanation: "Modern RAM bandwidth is 20-50 GB/s. You can scan 100GB+ per second with sequential access."
  },
  {
    question: "If 1M users have 1KB profile each, how much RAM to cache all profiles?",
    options: ["~1 MB", "~100 MB", "~1 GB", "~100 GB"],
    correctIndex: 2,
    explanation: "1M × 1KB = 1GB. This fits easily in a single server's RAM."
  },
  // Disk I/O patterns
  {
    question: "Random reads are slow on HDD because of:",
    options: ["CPU bottleneck", "Network latency", "Physical disk head movement (seek time)", "Memory limits"],
    correctIndex: 2,
    explanation: "HDD requires physical head movement (~10ms) for each random read. Sequential reads avoid this."
  },
  {
    question: "Why is sequential I/O much faster than random I/O?",
    options: ["It uses more CPU", "No seek time needed between reads", "It compresses data", "It uses more RAM"],
    correctIndex: 1,
    explanation: "Sequential I/O eliminates seek time and allows prefetching. Can be 100x faster than random on HDD."
  }
];

export const Content = () => (
  <div className="space-y-6">
    {/* Powers of Two */}
    <Section title="Powers of Two for Memory">
      <Paragraph>
        Quick reference for memory sizes. Useful for back-of-envelope calculations.
      </Paragraph>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left border-b border-border">Power</th>
              <th className="p-3 text-left border-b border-border">Exact Value</th>
              <th className="p-3 text-left border-b border-border">Approx</th>
              <th className="p-3 text-left border-b border-border">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-mono">2^10</td>
              <td className="p-3 font-mono">1,024</td>
              <td className="p-3 font-mono">~1 thousand</td>
              <td className="p-3 font-semibold text-blue-400">1 KB</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3 font-mono">2^20</td>
              <td className="p-3 font-mono">1,048,576</td>
              <td className="p-3 font-mono">~1 million</td>
              <td className="p-3 font-semibold text-green-400">1 MB</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-mono">2^30</td>
              <td className="p-3 font-mono">1,073,741,824</td>
              <td className="p-3 font-mono">~1 billion</td>
              <td className="p-3 font-semibold text-yellow-400">1 GB</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3 font-mono">2^40</td>
              <td className="p-3 font-mono">1,099,511,627,776</td>
              <td className="p-3 font-mono">~1 trillion</td>
              <td className="p-3 font-semibold text-orange-400">1 TB</td>
            </tr>
            <tr>
              <td className="p-3 font-mono">2^50</td>
              <td className="p-3 font-mono">1,125,899,906,842,624</td>
              <td className="p-3 font-mono">~1 quadrillion</td>
              <td className="p-3 font-semibold text-red-400">1 PB</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="Memory Trick">
        Every 10 powers of 2 ≈ 3 decimal digits (×1000). So 2^10 ≈ 10^3, 2^20 ≈ 10^6, etc.
      </Callout>
    </Section>

    {/* Common Data Sizes */}
    <Section title="Common Data Sizes">
      <Paragraph>
        Useful estimates for back-of-envelope calculations. These are approximations - actual sizes vary.
      </Paragraph>

      <Heading>Text & Documents</Heading>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left border-b border-border">Item</th>
              <th className="p-3 text-left border-b border-border">Size</th>
              <th className="p-3 text-left border-b border-border">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3">1 ASCII character</td>
              <td className="p-3 font-mono">1 byte</td>
              <td className="p-3 text-muted-foreground">UTF-8 can be 1-4 bytes</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3">UUID</td>
              <td className="p-3 font-mono">36 bytes</td>
              <td className="p-3 text-muted-foreground">As string with hyphens</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3">Tweet (280 chars)</td>
              <td className="p-3 font-mono">~300 bytes</td>
              <td className="p-3 text-muted-foreground">With some overhead</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3">Typical webpage HTML</td>
              <td className="p-3 font-mono">50-100 KB</td>
              <td className="p-3 text-muted-foreground">Without assets</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3">PDF page</td>
              <td className="p-3 font-mono">~100 KB</td>
              <td className="p-3 text-muted-foreground">Text-heavy; images much more</td>
            </tr>
            <tr>
              <td className="p-3">Average email</td>
              <td className="p-3 font-mono">~50 KB</td>
              <td className="p-3 text-muted-foreground">Without attachments</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Heading>Database & Structured Data</Heading>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left border-b border-border">Item</th>
              <th className="p-3 text-left border-b border-border">Size</th>
              <th className="p-3 text-left border-b border-border">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3">Typical SQL row</td>
              <td className="p-3 font-mono">100-500 bytes</td>
              <td className="p-3 text-muted-foreground">Depends on columns</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3">CSV row (10 fields)</td>
              <td className="p-3 font-mono">~200 bytes</td>
              <td className="p-3 text-muted-foreground">Average field ~20 chars</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3">JSON object (small)</td>
              <td className="p-3 font-mono">200-500 bytes</td>
              <td className="p-3 text-muted-foreground">User profile, config</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3">Protobuf message</td>
              <td className="p-3 font-mono">~50% of JSON</td>
              <td className="p-3 text-muted-foreground">Binary, no field names</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3">1M SQL rows</td>
              <td className="p-3 font-mono">100-500 MB</td>
              <td className="p-3 text-muted-foreground">Fits in memory</td>
            </tr>
            <tr>
              <td className="p-3">1B SQL rows</td>
              <td className="p-3 font-mono">100-500 GB</td>
              <td className="p-3 text-muted-foreground">Needs sharding/partitioning</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Heading>Media Files</Heading>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left border-b border-border">Item</th>
              <th className="p-3 text-left border-b border-border">Size</th>
              <th className="p-3 text-left border-b border-border">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3">Thumbnail image</td>
              <td className="p-3 font-mono">5-20 KB</td>
              <td className="p-3 text-muted-foreground">100x100 JPEG</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3">Web image (compressed)</td>
              <td className="p-3 font-mono">100-500 KB</td>
              <td className="p-3 text-muted-foreground">JPEG/WebP, 1080p</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3">High-res photo</td>
              <td className="p-3 font-mono">2-5 MB</td>
              <td className="p-3 text-muted-foreground">4K JPEG</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3">RAW photo</td>
              <td className="p-3 font-mono">20-50 MB</td>
              <td className="p-3 text-muted-foreground">Uncompressed</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3">MP3 song (4 min)</td>
              <td className="p-3 font-mono">4-8 MB</td>
              <td className="p-3 text-muted-foreground">128-256 kbps</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3">HD video (1 min)</td>
              <td className="p-3 font-mono">100-150 MB</td>
              <td className="p-3 text-muted-foreground">1080p H.264</td>
            </tr>
            <tr>
              <td className="p-3">4K video (1 min)</td>
              <td className="p-3 font-mono">300-500 MB</td>
              <td className="p-3 text-muted-foreground">H.265/HEVC</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Heading>Network & API</Heading>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left border-b border-border">Item</th>
              <th className="p-3 text-left border-b border-border">Size</th>
              <th className="p-3 text-left border-b border-border">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3">HTTP headers</td>
              <td className="p-3 font-mono">200-800 bytes</td>
              <td className="p-3 text-muted-foreground">Cookies can add KB</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3">TLS handshake</td>
              <td className="p-3 font-mono">5-10 KB</td>
              <td className="p-3 text-muted-foreground">Certificates included</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3">REST API response (list)</td>
              <td className="p-3 font-mono">10-100 KB</td>
              <td className="p-3 text-muted-foreground">Paginated, 20-50 items</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3">GraphQL response</td>
              <td className="p-3 font-mono">1-50 KB</td>
              <td className="p-3 text-muted-foreground">Only requested fields</td>
            </tr>
            <tr>
              <td className="p-3">WebSocket frame overhead</td>
              <td className="p-3 font-mono">2-14 bytes</td>
              <td className="p-3 text-muted-foreground">Per message</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="Quick Calculations">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>1M users × 1KB profile = 1GB</strong></li>
          <li><strong>1M daily messages × 300B = 300MB/day</strong></li>
          <li><strong>1000 RPS × 10KB response = 10MB/s = 80Mbps</strong></li>
          <li><strong>1B rows × 200B = 200GB</strong> (needs partitioning)</li>
        </ul>
      </Callout>
    </Section>

    {/* Latency Numbers */}
    <Section title="Latency Numbers Every Programmer Should Know">
      <Callout type="warning" title="Key Takeaways">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Memory is fast, disk is slow</strong></li>
          <li><strong>Avoid disk seeks</strong> (especially on HDD)</li>
          <li><strong>Compress before sending</strong> over network where possible</li>
          <li><strong>Data centers in different regions</strong> add significant latency</li>
        </ul>
      </Callout>

      <Heading>~1 nanosecond (10⁻⁹ seconds)</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>L1 cache reference</strong> - closest to CPU</li>
      </ul>

      <Heading>~10 nanoseconds (10⁻⁸ seconds)</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>L2 cache reference</strong> - between CPU and RAM</li>
        <li><strong>Branch mispredict</strong> - CPU speculatively does work, condition false</li>
      </ul>

      <Heading>~100 nanoseconds (10⁻⁷ seconds)</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Mutex lock/unlock</strong></li>
        <li><strong>Main memory reference</strong> (RAM)</li>
      </ul>

      <Heading>~10 microseconds (10⁻⁵ seconds = 0.01ms)</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Compress 1KB with Zippy</strong></li>
        <li><strong>Send 2KB over 1Gbps network</strong></li>
      </ul>

      <Heading>~100 microseconds (10⁻⁴ seconds = 0.1ms)</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Read 1MB sequentially from memory</strong> (RAM)</li>
        <li><strong>Round trip within same datacenter</strong></li>
      </ul>

      <Heading>~10 milliseconds (10⁻² seconds)</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Disk seek</strong> (HDD only - SSD is faster)</li>
        <li><strong>Read 1MB sequentially from network</strong></li>
        <li><strong>Read 1MB sequentially from disk</strong> (SSD faster than HDD)</li>
      </ul>

      <Heading>~100 milliseconds (10⁻¹ seconds)</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Send packet CA → Netherlands → CA</strong></li>
      </ul>

      <div className="p-4 rounded-lg border border-border bg-card mt-4">
        <h4 className="font-semibold mb-2">Visual Scale</h4>
        <div className="space-y-2 text-sm font-mono">
          <div className="flex items-center gap-2">
            <span className="text-green-400">L1 cache:</span>
            <span>1ns</span>
            <div className="flex-1 bg-green-500/20 h-2 rounded" style={{ width: '2%' }}></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">RAM:</span>
            <span>100ns</span>
            <div className="flex-1 bg-blue-500/20 h-2 rounded" style={{ width: '5%' }}></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">SSD:</span>
            <span>~1ms</span>
            <div className="flex-1 bg-yellow-500/20 h-2 rounded" style={{ width: '20%' }}></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-400">HDD seek:</span>
            <span>~10ms</span>
            <div className="flex-1 bg-orange-500/20 h-2 rounded" style={{ width: '50%' }}></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-400">Cross-DC:</span>
            <span>~100ms</span>
            <div className="flex-1 bg-red-500/20 h-2 rounded" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    </Section>

    {/* Compression */}
    <Section title="When to Compress">
      <Paragraph>
        Compression is CPU-bound but very fast. Network transfer is slow. Compressing before sending often reduces total time.
      </Paragraph>

      <Callout type="info" title="Worth Compressing">
        <ul className="list-disc list-inside space-y-1">
          <li>Text data (JSON, XML, HTML, logs)</li>
          <li>Repetitive data structures</li>
          <li>Data sent over slow/metered connections</li>
          <li>Large payloads where compression ratio is good</li>
        </ul>
      </Callout>

      <Callout type="warning" title="Not Worth Compressing">
        <ul className="list-disc list-inside space-y-1">
          <li>Already compressed data (images, video, zip files)</li>
          <li>Very small payloads (overhead exceeds savings)</li>
          <li>Real-time streams where latency is critical</li>
        </ul>
      </Callout>
    </Section>
  </div>
);
