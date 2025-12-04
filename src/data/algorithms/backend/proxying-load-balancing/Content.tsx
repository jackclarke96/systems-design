import { Section, Paragraph, Heading } from "@/components/AlgorithmContent";
import { Callout } from "@/components/Callout";
import { QuizQuestion } from "@/components/Quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the key difference between a proxy and a reverse proxy?",
    options: ["Proxies are faster", "Proxy acts on behalf of client, reverse proxy acts on behalf of server", "Reverse proxies don't support HTTPS", "Proxies only work at Layer 7"],
    correctIndex: 1,
    explanation: "A proxy makes requests on behalf of the client (client knows destination). A reverse proxy sits in front of servers - client doesn't know the final destination."
  },
  {
    question: "Why can't a Layer 4 load balancer cache responses?",
    options: ["It doesn't support SSL", "It doesn't parse or understand the application protocol", "It has no memory", "Caching is disabled by default"],
    correctIndex: 1,
    explanation: "L4 LB only sees segments and IP/ports. It doesn't parse the protocol content, so it can't understand what to cache."
  },
  {
    question: "What is a major disadvantage of Layer 7 load balancing?",
    options: ["Cannot route based on URL path", "Must terminate TLS and share certificates", "Cannot work with HTTP", "Only supports UDP"],
    correctIndex: 1,
    explanation: "L7 LB must decrypt traffic to parse it, requiring TLS termination. The certificate must be available on the load balancer."
  },
  {
    question: "In NAT mode for L4 load balancing, what does the load balancer change?",
    options: ["The HTTP headers", "The destination IP address", "The TLS certificate", "The URL path"],
    correctIndex: 1,
    explanation: "In NAT mode, the L4 LB acts as a gateway and rewrites the destination IP. It keeps a mapping table to route responses back."
  }
];

export const Content = () => (
  <div className="space-y-6">
    {/* Proxy */}
    <Section title="Proxy">
      <Paragraph>
        A server that makes requests on your behalf. Your client connects to the proxy, which then connects to the destination. The content is completely rewritten (e.g., X-Forwarded-For header shows origin).
      </Paragraph>

      <Callout type="info" title="Proxy Use Cases">
        <ul className="list-disc list-inside space-y-1">
          <li>Anonymity</li>
          <li>Caching</li>
          <li>Logging (sidecar pattern)</li>
          <li>Blocking sites</li>
          <li>Microservices</li>
          <li>Debugging requests</li>
        </ul>
      </Callout>

      <Callout type="tip" title="VPN vs Proxy">
        VPNs operate at IP level (L3). Proxies operate at L4 and above - they need a protocol.
      </Callout>
    </Section>

    {/* Reverse Proxy */}
    <Section title="Reverse Proxy">
      <Paragraph>
        The client doesn't know the final destination server. The reverse proxy sits in front of backend servers and forwards requests.
      </Paragraph>

      <Callout type="info" title="Reverse Proxy Use Cases">
        <ul className="list-disc list-inside space-y-1">
          <li>Load balancing</li>
          <li>API Gateway</li>
          <li>CDN with caching</li>
          <li>Ingress / Authentication</li>
          <li>Canary deployment (10% to new server)</li>
          <li>Microservices routing</li>
        </ul>
      </Callout>

      <Callout type="warning" title="Tunnel Mode">
        Proxies can use tunnel mode: client asks proxy to open connection ("CONNECT google.com"), then uses it as a dumb pipe. Proxy cannot see content - TLS is end-to-end.
      </Callout>
    </Section>

    {/* Layer 4 Load Balancer */}
    <Section title="Layer 4 Load Balancer">
      <Paragraph>
        A load balancer is a reverse proxy with logic to balance traffic. L4 LB only deals with IPs, ports, and segments - data is not parsed.
      </Paragraph>

      <div className="p-4 rounded-lg border border-border bg-card">
        <h4 className="font-semibold mb-2">How L4 LB Works</h4>
        <ol className="text-sm space-y-2 list-decimal list-inside">
          <li>Starts up and establishes TCP connections to backend servers (keeps them warm)</li>
          <li>Client establishes connection - LB maps this to one backend</li>
          <li>All segments for that connection go to same server (sticky per connection)</li>
          <li>Forwards segments directly - no buffering, no parsing</li>
        </ol>
        <p className="text-sm mt-2 text-muted-foreground">NAT mode: LB acts as gateway, changes destination IP. Keeps mapping table for responses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
          <h4 className="font-semibold text-green-400 mb-2">L4 Pros</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Simpler, more efficient</li>
            <li>More secure (no decryption)</li>
            <li>Works with any protocol</li>
            <li>One TCP connection (NAT)</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <h4 className="font-semibold text-red-400 mb-2">L4 Cons</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>No smart routing (can't see paths)</li>
            <li>No caching</li>
            <li>Protocol unaware (can bypass rules)</li>
            <li>Sticky per connection (not per request)</li>
          </ul>
        </div>
      </div>
    </Section>

    {/* Layer 7 Load Balancer */}
    <Section title="Layer 7 Load Balancer">
      <Paragraph>
        L7 LB is protocol-aware. Parses requests, can route based on URL path, headers, cookies. Requires buffering and potentially TLS termination.
      </Paragraph>

      <div className="p-4 rounded-lg border border-border bg-card">
        <h4 className="font-semibold mb-2">How L7 LB Works</h4>
        <ol className="text-sm space-y-2 list-decimal list-inside">
          <li>Establishes TCP connections to backend servers</li>
          <li>Client connects - LB buffers and parses the request</li>
          <li>If encrypted, must decrypt (TLS termination) - needs certificate</li>
          <li>Each logical request can be forwarded to different backend</li>
          <li>Since HTTP is stateless, requests can be load balanced independently</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
          <h4 className="font-semibold text-green-400 mb-2">L7 Pros</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Smart routing (path, headers, cookies)</li>
            <li>Caching</li>
            <li>Great for microservices</li>
            <li>API Gateway logic</li>
            <li>Authentication at edge</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <h4 className="font-semibold text-red-400 mb-2">L7 Cons</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>More expensive (CPU)</li>
            <li>Must terminate TLS</li>
            <li>Two TCP connections</li>
            <li>Must share TLS certificate</li>
            <li>Buffering can be bottleneck</li>
          </ul>
        </div>
      </div>

      <Callout type="tip" title="Key Difference">
        L4: Connection-sticky, protocol-agnostic, efficient. L7: Request-aware, can route intelligently, but higher overhead.
      </Callout>
    </Section>
  </div>
);
