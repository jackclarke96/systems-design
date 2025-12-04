import { Section, Paragraph, Heading } from "@/components/AlgorithmContent";
import { Callout } from "@/components/Callout";
import { QuizQuestion } from "@/components/Quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Which storage class is most cost-effective for data accessed less than once per month?",
    options: ["Standard", "Infrequent Access", "Glacier/Archive", "Reduced Redundancy"],
    correctIndex: 2,
    explanation: "Glacier/Archive storage costs ~$1/TB/month vs $23/TB for standard, but has retrieval delays and costs."
  },
  {
    question: "What is the primary cost driver for cloud databases like RDS?",
    options: ["Storage only", "Compute (instance size)", "Network egress", "Number of tables"],
    correctIndex: 1,
    explanation: "Compute (instance size) is typically 60-80% of RDS costs. Storage and I/O are secondary."
  },
  {
    question: "Which cost reduction strategy can save 60-70% on compute?",
    options: ["Using smaller instances", "Reserved instances (1-3 year)", "Spot instances", "Auto-scaling"],
    correctIndex: 1,
    explanation: "Reserved instances offer 60-72% savings for 1-3 year commitments. Spot can save more but with interruption risk."
  },
  {
    question: "What is a common mistake that leads to unexpected cloud costs?",
    options: ["Using too few instances", "Forgetting to delete unused resources", "Using reserved instances", "Enabling auto-scaling"],
    correctIndex: 1,
    explanation: "Orphaned resources (unused EBS volumes, old snapshots, idle load balancers) accumulate costs silently."
  },
  {
    question: "How can you reduce data transfer costs between services?",
    options: ["Use larger instances", "Keep services in the same region/AZ", "Use more regions", "Disable compression"],
    correctIndex: 1,
    explanation: "Data transfer within the same AZ is often free. Cross-region and internet egress are expensive."
  }
];

export const Content = () => (
  <div className="space-y-6">
    {/* Storage Costs */}
    <Section title="Cloud Storage Costs">
      <Paragraph>
        Storage costs vary significantly by access patterns. Choose the right tier for your data.
      </Paragraph>

      <Heading>Object Storage (S3, GCS, Azure Blob)</Heading>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left border-b border-border">Tier</th>
              <th className="p-3 text-left border-b border-border">AWS S3</th>
              <th className="p-3 text-left border-b border-border">GCS</th>
              <th className="p-3 text-left border-b border-border">Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-semibold">Standard</td>
              <td className="p-3 font-mono">$23/TB/mo</td>
              <td className="p-3 font-mono">$20/TB/mo</td>
              <td className="p-3 text-muted-foreground">Frequently accessed</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3 font-semibold">Infrequent Access</td>
              <td className="p-3 font-mono">$12.5/TB/mo</td>
              <td className="p-3 font-mono">$10/TB/mo</td>
              <td className="p-3 text-muted-foreground">Monthly access</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-semibold">Glacier/Archive</td>
              <td className="p-3 font-mono">$4/TB/mo</td>
              <td className="p-3 font-mono">$4/TB/mo</td>
              <td className="p-3 text-muted-foreground">Yearly access, backups</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Deep Archive</td>
              <td className="p-3 font-mono">$1/TB/mo</td>
              <td className="p-3 font-mono">$1.2/TB/mo</td>
              <td className="p-3 text-muted-foreground">Compliance, rarely accessed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="warning" title="Hidden Costs">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Retrieval fees:</strong> Glacier retrieval can cost $10-30/TB</li>
          <li><strong>API requests:</strong> $0.40 per 10K PUT, $0.04 per 10K GET</li>
          <li><strong>Egress:</strong> $90/TB to internet (first 100GB often free)</li>
        </ul>
      </Callout>

      <Heading>Block Storage (EBS, Persistent Disk)</Heading>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left border-b border-border">Type</th>
              <th className="p-3 text-left border-b border-border">AWS EBS</th>
              <th className="p-3 text-left border-b border-border">GCP PD</th>
              <th className="p-3 text-left border-b border-border">Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-semibold">SSD (gp3/balanced)</td>
              <td className="p-3 font-mono">$80/TB/mo</td>
              <td className="p-3 font-mono">$170/TB/mo</td>
              <td className="p-3 text-muted-foreground">General workloads</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3 font-semibold">Provisioned IOPS</td>
              <td className="p-3 font-mono">$125/TB/mo</td>
              <td className="p-3 font-mono">$340/TB/mo</td>
              <td className="p-3 text-muted-foreground">High-performance DB</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">HDD (throughput)</td>
              <td className="p-3 font-mono">$45/TB/mo</td>
              <td className="p-3 font-mono">$40/TB/mo</td>
              <td className="p-3 text-muted-foreground">Sequential, big data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    {/* Compute Costs */}
    <Section title="Compute Costs">
      <Heading>Virtual Machines (EC2, Compute Engine)</Heading>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left border-b border-border">Instance</th>
              <th className="p-3 text-left border-b border-border">Specs</th>
              <th className="p-3 text-left border-b border-border">On-Demand</th>
              <th className="p-3 text-left border-b border-border">Reserved (1yr)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-mono">t3.medium</td>
              <td className="p-3">2 vCPU, 4GB</td>
              <td className="p-3 font-mono">$30/mo</td>
              <td className="p-3 font-mono text-green-400">$19/mo</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3 font-mono">m5.large</td>
              <td className="p-3">2 vCPU, 8GB</td>
              <td className="p-3 font-mono">$70/mo</td>
              <td className="p-3 font-mono text-green-400">$44/mo</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-mono">m5.xlarge</td>
              <td className="p-3">4 vCPU, 16GB</td>
              <td className="p-3 font-mono">$140/mo</td>
              <td className="p-3 font-mono text-green-400">$88/mo</td>
            </tr>
            <tr>
              <td className="p-3 font-mono">r5.2xlarge</td>
              <td className="p-3">8 vCPU, 64GB</td>
              <td className="p-3 font-mono">$365/mo</td>
              <td className="p-3 font-mono text-green-400">$230/mo</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Heading>Managed Databases</Heading>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left border-b border-border">Service</th>
              <th className="p-3 text-left border-b border-border">Small</th>
              <th className="p-3 text-left border-b border-border">Medium</th>
              <th className="p-3 text-left border-b border-border">Large</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-semibold">RDS PostgreSQL</td>
              <td className="p-3 font-mono">$50/mo</td>
              <td className="p-3 font-mono">$200/mo</td>
              <td className="p-3 font-mono">$800/mo</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3 font-semibold">Aurora</td>
              <td className="p-3 font-mono">$80/mo</td>
              <td className="p-3 font-mono">$300/mo</td>
              <td className="p-3 font-mono">$1200/mo</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-semibold">DynamoDB</td>
              <td className="p-3 font-mono">$1/mo*</td>
              <td className="p-3 font-mono">$50/mo*</td>
              <td className="p-3 font-mono">$500/mo*</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">ElastiCache Redis</td>
              <td className="p-3 font-mono">$25/mo</td>
              <td className="p-3 font-mono">$100/mo</td>
              <td className="p-3 font-mono">$400/mo</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted-foreground">*DynamoDB pricing is capacity-based (RCU/WCU)</p>
    </Section>

    {/* Data Transfer Costs */}
    <Section title="Data Transfer Costs">
      <Paragraph>
        Data transfer (egress) is often the surprise cost. Ingress is usually free.
      </Paragraph>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left border-b border-border">Transfer Type</th>
              <th className="p-3 text-left border-b border-border">Cost</th>
              <th className="p-3 text-left border-b border-border">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3">Same AZ</td>
              <td className="p-3 font-mono text-green-400">Free</td>
              <td className="p-3 text-muted-foreground">Between services in same zone</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3">Cross-AZ (same region)</td>
              <td className="p-3 font-mono">$10/TB</td>
              <td className="p-3 text-muted-foreground">Both directions charged</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3">Cross-region</td>
              <td className="p-3 font-mono">$20/TB</td>
              <td className="p-3 text-muted-foreground">Varies by region pair</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3">To Internet</td>
              <td className="p-3 font-mono text-red-400">$90/TB</td>
              <td className="p-3 text-muted-foreground">First 100GB/mo often free</td>
            </tr>
            <tr>
              <td className="p-3">CloudFront/CDN</td>
              <td className="p-3 font-mono">$85/TB</td>
              <td className="p-3 text-muted-foreground">Cheaper than direct + caching</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="Egress Calculation">
        <p className="font-mono">1M users × 1MB response × 10 requests/day = 10TB/day = $900/day = $27K/month</p>
        <p className="mt-2">This is why CDNs and edge caching are critical for high-traffic apps.</p>
      </Callout>
    </Section>

    {/* Cost Reduction Strategies */}
    <Section title="Cost Reduction Strategies">
      <Heading>Compute Optimization</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
          <h4 className="font-semibold text-green-400 mb-2">Reserved Instances</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>1-year: 30-40% savings</li>
            <li>3-year: 60-72% savings</li>
            <li>Best for predictable workloads</li>
            <li>Convertible RIs offer flexibility</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10">
          <h4 className="font-semibold text-yellow-400 mb-2">Spot/Preemptible</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>70-90% savings</li>
            <li>Can be interrupted</li>
            <li>Good for batch jobs, CI/CD</li>
            <li>Use with fault-tolerant workloads</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/10">
          <h4 className="font-semibold text-blue-400 mb-2">Right-Sizing</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Monitor actual CPU/memory usage</li>
            <li>Downsize over-provisioned instances</li>
            <li>Use AWS Compute Optimizer</li>
            <li>Review quarterly</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg border border-purple-500/30 bg-purple-500/10">
          <h4 className="font-semibold text-purple-400 mb-2">Auto-Scaling</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Scale down during off-hours</li>
            <li>Scale to zero for dev/staging</li>
            <li>Use scheduled scaling for patterns</li>
            <li>Target tracking policies</li>
          </ul>
        </div>
      </div>

      <Heading>Storage Optimization</Heading>
      <ul className="list-disc list-inside space-y-2 text-sm">
        <li><strong>Lifecycle policies:</strong> Auto-transition to cheaper tiers (S3 → IA → Glacier)</li>
        <li><strong>Delete unused snapshots:</strong> Old EBS snapshots accumulate cost</li>
        <li><strong>Compress data:</strong> Gzip/LZ4 before storing, especially logs</li>
        <li><strong>Deduplication:</strong> Avoid storing same data multiple times</li>
        <li><strong>Intelligent tiering:</strong> Let cloud auto-optimize (small premium)</li>
      </ul>

      <Heading>Network Optimization</Heading>
      <ul className="list-disc list-inside space-y-2 text-sm">
        <li><strong>Same-AZ placement:</strong> Keep tightly coupled services together</li>
        <li><strong>VPC endpoints:</strong> Free traffic to S3/DynamoDB vs NAT gateway ($45/TB)</li>
        <li><strong>CDN caching:</strong> Reduce origin egress, improve latency</li>
        <li><strong>Compress responses:</strong> Gzip reduces transfer size 70-90%</li>
        <li><strong>Regional deployments:</strong> Serve users from nearest region</li>
      </ul>

      <Heading>Database Optimization</Heading>
      <ul className="list-disc list-inside space-y-2 text-sm">
        <li><strong>Reserved capacity:</strong> RDS reserved instances save 30-60%</li>
        <li><strong>Read replicas:</strong> Cheaper than scaling primary</li>
        <li><strong>Aurora Serverless:</strong> Auto-scales, good for variable loads</li>
        <li><strong>Connection pooling:</strong> Reduce instance count needed</li>
        <li><strong>Query optimization:</strong> Reduce I/O costs on DynamoDB</li>
      </ul>
    </Section>

    {/* Common Mistakes */}
    <Section title="Common Cost Mistakes">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <h4 className="font-semibold text-red-400 mb-2">Orphaned Resources</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Unused EBS volumes</li>
            <li>Old snapshots</li>
            <li>Idle load balancers</li>
            <li>Stopped instances with EBS</li>
            <li>Unused Elastic IPs ($4/mo each)</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <h4 className="font-semibold text-red-400 mb-2">Over-Provisioning</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Instances too large for workload</li>
            <li>Provisioned IOPS when gp3 is enough</li>
            <li>Multi-AZ for non-critical workloads</li>
            <li>Too many NAT gateways</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <h4 className="font-semibold text-red-400 mb-2">No Cost Monitoring</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>No billing alerts set up</li>
            <li>No cost allocation tags</li>
            <li>Monthly reviews only (too late)</li>
            <li>No per-team/project breakdown</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <h4 className="font-semibold text-red-400 mb-2">Architecture Issues</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Services in different AZs unnecessarily</li>
            <li>No caching layer (hitting DB directly)</li>
            <li>Logging everything at full resolution</li>
            <li>Not using S3 lifecycle policies</li>
          </ul>
        </div>
      </div>

      <Callout type="tip" title="Cost Monitoring Setup">
        <ul className="list-disc list-inside space-y-1">
          <li>Set billing alerts at 50%, 80%, 100% of budget</li>
          <li>Enable Cost Explorer and tag all resources</li>
          <li>Review costs weekly, not monthly</li>
          <li>Use AWS Trusted Advisor / GCP Recommender</li>
        </ul>
      </Callout>
    </Section>
  </div>
);
