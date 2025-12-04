import { Section, Paragraph, Heading } from "@/components/AlgorithmContent";
import { Callout } from "@/components/Callout";
import { QuizQuestion } from "@/components/Quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Approximately how many bytes is 2^30?",
    options: ["1 KB", "1 MB", "1 GB", "1 TB"],
    correctIndex: 2,
    explanation: "2^30 ≈ 1 GB (1,073,741,824 bytes). Remember: 10→KB, 20→MB, 30→GB, 40→TB, 50→PB."
  },
  {
    question: "Which operation is approximately 100x slower than main memory reference?",
    options: ["L1 cache reference", "L2 cache reference", "Mutex lock/unlock", "Disk seek"],
    correctIndex: 3,
    explanation: "Main memory reference is ~100ns, disk seek is ~10ms (10,000,000ns) - about 100,000x slower. Disk seek is orders of magnitude slower than RAM."
  },
  {
    question: "What is the approximate latency for a round trip within the same data center?",
    options: ["1 ns", "100 ns", "0.5 ms", "100 ms"],
    correctIndex: 2,
    explanation: "A round trip within the same data center is approximately 0.5ms (500,000ns)."
  },
  {
    question: "Why should you compress data before sending over the internet?",
    options: ["Compression is slower than network transfer", "Compression is fast and reduces network latency", "Network has unlimited bandwidth", "Compression improves security"],
    correctIndex: 1,
    explanation: "Compression is very fast (~10μs for 1KB). Since network transfer is slow relative to CPU, compressing first reduces total time."
  },
  {
    question: "Approximately how long does it take to send a packet from California to Netherlands and back?",
    options: ["1 ms", "10 ms", "100 ms", "1 second"],
    correctIndex: 2,
    explanation: "Cross-continent round trips are approximately 100ms due to the physical distance and speed of light limits."
  },
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
