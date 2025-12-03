import { useState } from "react";
import { Quiz } from "@/components/Quiz";
import { Flag, Server, Globe, Shield, RefreshCw, AlertTriangle, CheckCircle, Zap, Clock, Database } from "lucide-react";

const ConceptCard = ({ 
  title, 
  icon: Icon, 
  children, 
  variant = "default" 
}: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
  variant?: "default" | "green" | "red" | "blue" | "amber" | "purple";
}) => {
  const variants = {
    default: "border-border bg-card",
    green: "border-green-500/30 bg-green-500/5",
    red: "border-red-500/30 bg-red-500/5",
    blue: "border-blue-500/30 bg-blue-500/5",
    amber: "border-amber-500/30 bg-amber-500/5",
    purple: "border-purple-500/30 bg-purple-500/5",
  };
  
  const iconVariants = {
    default: "text-primary",
    green: "text-green-500",
    red: "text-red-500",
    blue: "text-blue-500",
    amber: "text-amber-500",
    purple: "text-purple-500",
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

const BulletList = ({ items, bulletColor = "text-primary" }: { items: (string | React.ReactNode)[]; bulletColor?: string }) => (
  <ul className="space-y-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2">
        <span className={`${bulletColor} mt-1`}>•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
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
          Safe deployments and controlled feature releases are critical for maintaining reliability. 
          This covers feature flags for gradual rollout, deployment strategies like blue/green and canary, 
          and multi-region patterns for disaster recovery.
        </p>
      </div>

      <SectionHeader>Feature Flags</SectionHeader>
      
      <ConceptCard title="What Are Feature Flags?" icon={Flag} variant="blue">
        <p>Toggles that control feature visibility <strong>without redeploying code</strong>.</p>
        <div className="mt-3 space-y-2">
          <p className="font-medium text-foreground">Use cases:</p>
          <BulletList 
            items={[
              "Turn features on/off instantly",
              "Gradual rollout (1% → 10% → 50% → 100%)",
              "A/B testing different variants",
              "Kill switch for problematic features",
              "Beta programs for specific users"
            ]}
            bulletColor="text-blue-500"
          />
        </div>
      </ConceptCard>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Especially Nice For Risky Changes
        </h4>
        <p className="text-sm text-muted-foreground">
          Rolling out a new PSP integration? Use feature flags to enable it for 1% of traffic, 
          monitor for errors, then gradually increase. If issues arise, disable instantly without rollback.
        </p>
      </div>

      <SectionHeader>Deployment Patterns</SectionHeader>
      
      <div className="grid md:grid-cols-2 gap-4">
        <ConceptCard title="Blue/Green Deployment" icon={Server} variant="green">
          <p className="mb-3">Two identical production environments (stacks):</p>
          <div className="space-y-2">
            <div className="bg-blue-500/10 rounded p-2 text-xs">
              <strong className="text-blue-400">Blue (Live):</strong> Current production traffic
            </div>
            <div className="bg-green-500/10 rounded p-2 text-xs">
              <strong className="text-green-400">Green (Standby):</strong> New version deployed here
            </div>
          </div>
          <p className="mt-3 text-xs">When ready, switch load balancer to Green. Blue becomes the rollback option.</p>
        </ConceptCard>

        <ConceptCard title="Canary Deployment" icon={Zap} variant="amber">
          <p className="mb-3">Small % of traffic gets new version first:</p>
          <BulletList 
            items={[
              "Deploy to canary (e.g., 5% of traffic)",
              "Monitor metrics, errors, latency",
              "If healthy, gradually increase %",
              "If problems, roll back canary only"
            ]}
            bulletColor="text-amber-500"
          />
          <p className="mt-2 text-xs italic">Watch metrics, then roll forward or back.</p>
        </ConceptCard>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 border-b border-border">Pattern</th>
              <th className="text-left p-3 border-b border-border">Traffic Split</th>
              <th className="text-left p-3 border-b border-border">Rollback Speed</th>
              <th className="text-left p-3 border-b border-border">Risk</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">Blue/Green</td>
              <td className="p-3 text-muted-foreground">100% switch</td>
              <td className="p-3 text-green-500">Instant</td>
              <td className="p-3 text-amber-500">Medium (full switch)</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">Canary</td>
              <td className="p-3 text-muted-foreground">Gradual (1%→100%)</td>
              <td className="p-3 text-green-500">Instant for canary</td>
              <td className="p-3 text-green-500">Low (limited blast radius)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeader>Multi-Region & Disaster Recovery</SectionHeader>
      
      <div className="grid md:grid-cols-2 gap-4">
        <ConceptCard title="Active-Passive" icon={Database} variant="blue">
          <p className="mb-2">Primary region handles all traffic; secondary is standby.</p>
          <BulletList 
            items={[
              "Primary: All reads + writes",
              "Secondary: Data replicated, ready to take over",
              "Failover: Manual or automated switch"
            ]}
            bulletColor="text-blue-500"
          />
          <p className="mt-2 text-xs text-amber-400">Con: Secondary resources underutilized until failover</p>
        </ConceptCard>

        <ConceptCard title="Active-Active" icon={Globe} variant="green">
          <p className="mb-2">Both regions handle traffic simultaneously.</p>
          <BulletList 
            items={[
              "Traffic routed to nearest region",
              "Both regions process requests",
              "Data sync between regions"
            ]}
            bulletColor="text-green-500"
          />
          <p className="mt-2 text-xs text-amber-400">Con: Complex data consistency, conflict resolution</p>
        </ConceptCard>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 mt-4">
        <h4 className="font-semibold mb-3">RPO & RTO - Key DR Metrics</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <span className="font-medium">RPO (Recovery Point Objective)</span>
            </div>
            <p className="text-sm text-muted-foreground">
              How much data loss is acceptable? If RPO = 1 hour, you can lose up to 1 hour of data.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-blue-500" />
              <span className="font-medium">RTO (Recovery Time Objective)</span>
            </div>
            <p className="text-sm text-muted-foreground">
              How long can you be down? If RTO = 15 minutes, you must recover within 15 minutes.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 mt-4">
        <h4 className="font-semibold mb-2">Different Tiers Need Different DR</h4>
        <div className="text-sm space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-red-500 font-bold">Critical:</span>
            <span>Core wallet - needs very low RPO/RTO</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 font-bold">Important:</span>
            <span>Reporting - can tolerate some delay</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500 font-bold">Nice-to-have:</span>
            <span>Notifications - higher RPO/RTO acceptable</span>
          </div>
        </div>
      </div>

      <SectionHeader>Best Practices</SectionHeader>
      
      <div className="space-y-4">
        <ConceptCard title="Feature Flag Hygiene" icon={Flag} variant="default">
          <BulletList 
            items={[
              "Clean up old flags after full rollout",
              "Document flag purposes and owners",
              "Set expiration dates for temporary flags",
              "Test both flag states in CI/CD"
            ]}
          />
        </ConceptCard>

        <ConceptCard title="Deployment Safety" icon={Shield} variant="green">
          <BulletList 
            items={[
              "Always have a rollback plan",
              "Monitor key metrics during rollout",
              "Use automated rollback triggers",
              "Deploy during low-traffic windows for risky changes"
            ]}
            bulletColor="text-green-500"
          />
        </ConceptCard>
      </div>

      <SectionHeader>Quick Reference</SectionHeader>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 border-b border-border">Scenario</th>
              <th className="text-left p-3 border-b border-border">Recommended Approach</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">New PSP integration</td>
              <td className="p-3 text-muted-foreground">Feature flag with gradual rollout (1% → 100%)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">Major backend change</td>
              <td className="p-3 text-muted-foreground">Blue/green with instant rollback option</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-medium">UI update</td>
              <td className="p-3 text-muted-foreground">Canary to monitor user metrics</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">Regional outage</td>
              <td className="p-3 text-muted-foreground">Multi-region failover (active-passive or active-active)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4 mt-6">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          Key Takeaways
        </h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span><strong>Feature flags</strong> decouple deployment from release</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span><strong>Blue/green</strong> for instant rollback; <strong>canary</strong> for gradual validation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span><strong>Multi-region</strong> for disaster recovery—choose based on RPO/RTO requirements</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span>Always monitor metrics and have a <strong>rollback plan</strong></span>
          </li>
        </ul>
      </div>
        </div>
      ) : (
        <DeploymentPatternsQuiz />
      )}
    </div>
  );
};

export const DeploymentPatternsQuiz = () => {
  const questions = [
    {
      question: "What is the main benefit of feature flags?",
      options: [
        "Faster code compilation",
        "Decouple deployment from release—control features without redeploying",
        "Reduce database size",
        "Improve network latency"
      ],
      correctIndex: 1,
      explanation: "Feature flags let you deploy code but control whether features are visible/active. You can enable features gradually or disable them instantly without a new deployment."
    },
    {
      question: "In a blue/green deployment, what happens when you want to release a new version?",
      options: [
        "Both environments run simultaneously at 50% each",
        "The green (standby) gets the new version, then traffic is switched from blue to green",
        "Blue is deleted and green is created fresh",
        "Users are asked to choose which version they want"
      ],
      correctIndex: 1,
      explanation: "In blue/green, you deploy the new version to the standby environment (green), verify it works, then switch the load balancer to route all traffic to green. Blue becomes the rollback option."
    },
    {
      question: "What is a canary deployment?",
      options: [
        "Deploying only to users in Canada",
        "Sending a small percentage of traffic to the new version first",
        "A deployment that happens at night",
        "Deploying to a test environment only"
      ],
      correctIndex: 1,
      explanation: "Canary deployments route a small % (e.g., 5%) of traffic to the new version. If metrics look good, gradually increase the %. If problems occur, roll back only the canary."
    },
    {
      question: "What does RPO (Recovery Point Objective) measure?",
      options: [
        "How long the system can be down",
        "How much data loss is acceptable",
        "How many requests per second",
        "How many regions are needed"
      ],
      correctIndex: 1,
      explanation: "RPO defines the maximum acceptable data loss in time. An RPO of 1 hour means you can tolerate losing up to 1 hour of data in a disaster."
    },
    {
      question: "What is the difference between active-passive and active-active multi-region?",
      options: [
        "Active-passive uses more servers",
        "Active-active only handles reads",
        "In active-passive, one region handles all traffic; in active-active, both regions serve traffic",
        "Active-passive is always faster"
      ],
      correctIndex: 2,
      explanation: "Active-passive has a primary region handling all traffic while the secondary waits. Active-active has both regions serving traffic simultaneously, requiring data sync between them."
    },
    {
      question: "When would you use a feature flag for a new PSP integration?",
      options: [
        "Never—PSP integrations don't need flags",
        "To gradually roll out to 1% → 10% → 100% while monitoring for errors",
        "Only after full deployment",
        "Only for UI changes"
      ],
      correctIndex: 1,
      explanation: "Risky changes like new PSP integrations benefit from gradual rollout via feature flags. Start with 1%, monitor, then increase. If issues arise, disable instantly."
    },
    {
      question: "What is RTO (Recovery Time Objective)?",
      options: [
        "The maximum time a system can be down during recovery",
        "The rate of transactions per hour",
        "The required team response time",
        "The time to deploy new code"
      ],
      correctIndex: 0,
      explanation: "RTO defines how quickly you must recover from a disaster. An RTO of 15 minutes means the system must be back online within 15 minutes of an outage."
    },
    {
      question: "Which deployment strategy offers the lowest risk for a major change?",
      options: [
        "Big bang (deploy everything at once)",
        "Blue/green with instant switch",
        "Canary with gradual traffic increase",
        "Manual deployment to each server"
      ],
      correctIndex: 2,
      explanation: "Canary has the lowest risk because only a small % of traffic sees the new version initially. Problems affect fewer users and can be caught before full rollout."
    }
  ];

  return <Quiz questions={questions} title="Deployment & Feature Flags Quiz" />;
};
