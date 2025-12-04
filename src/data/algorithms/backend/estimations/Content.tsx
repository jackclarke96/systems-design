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
