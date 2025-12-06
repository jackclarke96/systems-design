import { Section, Paragraph, Heading } from "@/components/AlgorithmContent";
import { Callout } from "@/components/Callout";
import { QuizQuestion } from "@/components/Quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Why does TLS 1.3 prefer Diffie-Hellman over RSA for key exchange?",
    options: ["RSA is slower", "Diffie-Hellman provides forward secrecy", "RSA requires more bandwidth", "Diffie-Hellman is easier to implement"],
    correctIndex: 1,
    explanation: "Diffie-Hellman provides forward secrecy - even if a private key is later compromised, past sessions cannot be decrypted."
  },
  {
    question: "What problem does HTTP/2 multiplexing solve?",
    options: ["SSL/TLS overhead", "Head-of-line blocking from HTTP/1.1 pipelining", "DNS resolution latency", "Cookie size limits"],
    correctIndex: 1,
    explanation: "HTTP/1.1 pipelining required responses in order. HTTP/2 uses stream IDs so multiple requests can be handled concurrently on one connection."
  },
  {
    question: "Why does HTTP/3 use QUIC instead of TCP?",
    options: ["QUIC is more secure", "TCP has head-of-line blocking at the transport layer", "QUIC uses less bandwidth", "TCP doesn't support encryption"],
    correctIndex: 1,
    explanation: "TCP delivers all bytes in order. If one packet is lost, all subsequent data waits. QUIC handles each stream independently, avoiding this blocking."
  },
  {
    question: "How many round trips does HTTPS over TCP with TLS 1.2 require before sending data?",
    options: ["1 RTT", "2 RTT", "3 RTT", "4 RTT"],
    correctIndex: 2,
    explanation: "TLS 1.2 needs: 1 RTT for TCP handshake + 2 RTT for TLS handshake = 3 RTT total before data transfer."
  },
  {
    question: "What enables 0-RTT in TLS 1.3?",
    options: ["Faster CPU processing", "Pre-shared keys from previous connections", "UDP instead of TCP", "Smaller certificates"],
    correctIndex: 1,
    explanation: "0-RTT uses pre-shared keys from previous sessions, allowing the client to send data with the first message."
  }
];

export const Content = () => (
  <div className="space-y-6">
    {/* TLS */}
    <Section title="TLS (Transport Layer Security)">
      <Paragraph>
        Standard way to encrypt communication. Usually used with HTTP (HTTPS). TLS is stateful (Layer 5). Uses symmetric encryption for speed, but needs key exchange first.
      </Paragraph>

      <Heading>TLS 1.2 with RSA</Heading>
      <div className="p-4 rounded-lg border border-border bg-card">
        <ol className="space-y-2 text-sm">
          <li><strong>1.</strong> Client Hello: "I want to encrypt using RSA + AES"</li>
          <li><strong>2.</strong> Server Hello: Sends certificate with public key</li>
          <li><strong>3.</strong> Client generates symmetric key, encrypts with server's public key</li>
          <li><strong>4.</strong> Server decrypts with private key → both have symmetric key</li>
        </ol>
      </div>

      <Callout type="warning" title="RSA Lacks Forward Secrecy">
        If the server's private key is compromised later, all past recorded traffic can be decrypted.
      </Callout>

      <Heading>TLS 1.3 with Diffie-Hellman</Heading>
      <Paragraph>
        Uses ephemeral keys for forward secrecy. Even if one private key is leaked, you'd need the other to decrypt.
      </Paragraph>

      <div className="p-4 rounded-lg border border-border bg-card font-mono text-sm">
        <p>Public: g, n (large primes)</p>
        <p>Client private: x → sends g^x mod n</p>
        <p>Server private: y → sends g^y mod n</p>
        <p className="text-green-400 mt-2">Both compute: g^(xy) mod n = symmetric key</p>
      </div>

      <Callout type="tip" title="TLS 1.3 Advantage">
        One fewer round trip than TLS 1.2 because key exchange happens in the first message.
      </Callout>
    </Section>

    {/* HTTP Versions */}
    <Section title="HTTP Evolution">
      <Heading>HTTP/1.0</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Stateless - new TCP connection per request</li>
        <li>No persistent connections</li>
        <li>Slow due to connection overhead</li>
      </ul>

      <Heading>HTTP/1.1</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Persistent TCP connections (keep-alive)</li>
        <li>Pipelining (send multiple requests, but responses must be in order)</li>
        <li>Host header enables virtual hosting</li>
        <li>Chunked transfer encoding</li>
      </ul>

      <Callout type="warning" title="HTTP Smuggling">
        Servers can get confused about request boundaries from content-length mismatches.
      </Callout>

      <Heading>HTTP/2</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Binary protocol (not text)</li>
        <li>Multiplexing - multiple streams on one connection with stream IDs</li>
        <li>Header compression (HPACK)</li>
        <li>Server push</li>
        <li>Secure by default</li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
          <h4 className="font-semibold text-green-400 mb-2">HTTP/2 Pros</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Multiplexing solves pipelining issues</li>
            <li>Header compression</li>
            <li>Much faster for many files</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <h4 className="font-semibold text-red-400 mb-2">HTTP/2 Cons</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>TCP head-of-line blocking remains</li>
            <li>Higher CPU for parsing streams</li>
          </ul>
        </div>
      </div>

      <Heading>HTTP/3 (QUIC)</Heading>
      <Paragraph>
        HTTP over QUIC (UDP-based). Each stream is independent - lost packet only affects that stream.
      </Paragraph>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
          <h4 className="font-semibold text-green-400 mb-2">HTTP/3 Pros</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>No TCP head-of-line blocking</li>
            <li>Connection + TLS in one handshake</li>
            <li>Connection migration (switch WiFi to 4G)</li>
            <li>Per-stream congestion control</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <h4 className="font-semibold text-red-400 mb-2">HTTP/3 Cons</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>High CPU for QUIC parsing</li>
            <li>UDP often blocked by enterprises</li>
            <li>IP fragmentation issues</li>
          </ul>
        </div>
      </div>
    </Section>

    {/* HTTPS Latency */}
    <Section title="HTTPS Latency Comparison">
      <Paragraph>
        Different protocol combinations result in different round-trip times (RTT) before data can be sent.
      </Paragraph>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left border-b border-border">Protocol Stack</th>
              <th className="p-3 text-left border-b border-border">RTT Before Data</th>
              <th className="p-3 text-left border-b border-border">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-mono">TCP + TLS 1.2</td>
              <td className="p-3 font-mono text-red-400">3 RTT</td>
              <td className="p-3 text-sm">1 TCP + 2 TLS handshake</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3 font-mono">TCP + TLS 1.3</td>
              <td className="p-3 font-mono text-yellow-400">2 RTT</td>
              <td className="p-3 text-sm">1 TCP + 1 TLS (combined key exchange)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-mono">QUIC (HTTP/3)</td>
              <td className="p-3 font-mono text-green-400">1 RTT</td>
              <td className="p-3 text-sm">Connection + TLS combined</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3 font-mono">TCP + TLS 1.3 0RTT</td>
              <td className="p-3 font-mono text-green-400">1 RTT</td>
              <td className="p-3 text-sm">Pre-shared key + data with SYN</td>
            </tr>
            <tr>
              <td className="p-3 font-mono">QUIC 0RTT</td>
              <td className="p-3 font-mono text-green-400">0 RTT</td>
              <td className="p-3 text-sm">Pre-shared key, data sent immediately</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="0-RTT Requirements">
        0-RTT requires a previous connection to the same server (pre-shared key). First connection still needs full handshake.
      </Callout>
    </Section>

    {/* HTTP Headers */}
    <Section title="HTTP Headers">
      <div className="grid md:grid-cols-2 gap-5">
        {/* Request Side Headers */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-foreground text-center border-b border-border pb-2">Request Side Headers</h3>
          
          <div className="space-y-3 text-sm">
            <div>
              <p><strong className="text-foreground">Authorization:</strong> <span className="text-muted-foreground">for tokens/creds</span></p>
            </div>
            <div>
              <p><strong className="text-foreground">Content-Type:</strong> <span className="text-muted-foreground">How is body encoded?</span></p>
              <p className="text-xs text-muted-foreground ml-4 italic">application/json, application/grpc, application/x-www-form-urlencoded</p>
            </div>
            <div>
              <p><strong className="text-foreground">Accept:</strong> <span className="text-muted-foreground">what formats can I handle. Used for content negotiation and versioning</span></p>
            </div>
            <div>
              <p><strong className="text-foreground">Host:</strong> <span className="text-muted-foreground">used for virtual domain hosting. L7 gateways can route based on host & path</span></p>
            </div>
            <div>
              <p><strong className="text-foreground">Cookie:</strong> <span className="text-muted-foreground">holds session cookie in SPA (CSRF, XSS considerations)</span></p>
            </div>
            <div>
              <p><strong className="text-foreground">X-Request-Id:</strong> <span className="text-muted-foreground">correlation headers for tracing</span></p>
            </div>
          </div>
        </div>

        {/* Response Side Headers */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-foreground text-center border-b border-border pb-2">Response Side Headers</h3>
          
          <div className="space-y-3 text-sm">
            <div>
              <p><strong className="text-foreground">Set-Cookie:</strong> <span className="text-muted-foreground">Server instructs browser to store a cookie with flags (HttpOnly, Secure, SameSite)</span></p>
            </div>
            <div>
              <p><strong className="text-foreground">Content-Type:</strong> <span className="text-muted-foreground">How is body encoded?</span></p>
            </div>
            <div>
              <p><strong className="text-foreground">Location:</strong> <span className="text-muted-foreground">e.g. 3xx to redirect, or 201 to point to new resource</span></p>
            </div>
            <div>
              <p><strong className="text-foreground">Cache-Control:</strong> <span className="text-muted-foreground">no-store, max-age, public, private. Finance data → probably no-store</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Proxies/LB Context */}
      <div className="bg-muted/50 rounded-xl p-5 space-y-3 mt-5">
        <h3 className="font-bold text-foreground">Proxies/LB Context</h3>
        <div className="space-y-2 text-sm">
          <div>
            <p><strong className="text-foreground">X-Forwarded-For:</strong> <span className="text-muted-foreground">Original client IP as it passes through load balancers/proxies (e.g. for logging)</span></p>
          </div>
          <div>
            <p><strong className="text-foreground">X-Forwarded-Proto / X-Forwarded-Host:</strong> <span className="text-muted-foreground">Let backend know original scheme/host (e.g. if SSL terminates at gateway)</span></p>
          </div>
        </div>
      </div>

      {/* Caching/Conditional Requests */}
      <div className="bg-muted/50 rounded-xl p-5 space-y-3 mt-5">
        <h3 className="font-bold text-foreground">Caching/Conditional Requests</h3>
        <div className="space-y-2 text-sm">
          <p><strong className="text-foreground">ETag + If-None-Match:</strong> <span className="text-muted-foreground">Server sends ETag, client sends If-None-Match to validate cache</span></p>
          <p><strong className="text-foreground">Last-Modified + If-Modified-Since:</strong> <span className="text-muted-foreground">Timestamp-based cache validation</span></p>
        </div>
      </div>

      {/* CORS */}
      <div className="bg-muted/50 rounded-xl p-5 space-y-3 mt-5">
        <h3 className="font-bold text-foreground">CORS</h3>
        <div className="space-y-2 text-sm">
          <p><strong className="text-foreground">Origin</strong> <span className="text-muted-foreground">(request): Browser sends origin of the page making the request</span></p>
          <p><strong className="text-foreground">Access-Control-Allow-Origin</strong> <span className="text-muted-foreground">(response): Which origins are allowed</span></p>
          <p><strong className="text-foreground">Access-Control-Allow-Credentials:</strong> <span className="text-muted-foreground">If cookies + SPAs need cross-origin requests</span></p>
        </div>
        <Callout type="info" title="CORS Summary">
          Browser sends Origin, server responds with CORS headers to control which frontends can call the API from JS.
        </Callout>
      </div>

      {/* Security Hardening Headers */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4 mt-5">
        <h3 className="font-bold text-foreground">Security Hardening Headers</h3>
        <div className="space-y-2 text-sm">
          <p><strong className="text-foreground">Strict-Transport-Security (HSTS):</strong> <span className="text-muted-foreground">Forces browser to use HTTPS</span></p>
          <p><strong className="text-foreground">Content-Security-Policy (CSP):</strong> <span className="text-muted-foreground">Limit where scripts can be loaded from (XSS prevention)</span></p>
          <p><strong className="text-foreground">X-Frame-Options/frame-ancestors:</strong> <span className="text-muted-foreground">Prevents clickjacking (blocks site in iFrames)</span></p>
          <p><strong className="text-foreground">X-Content-Type-Options: nosniff:</strong> <span className="text-muted-foreground">Stop MIME sniffing</span></p>
        </div>
        <Callout type="tip" title="Edge vs API Auth">
          At the edge we set security headers like HSTS, CSP, and X-Content-Type-Options to harden the web UI, but core API auth is via OAuth2/JWT in the Authorization header.
        </Callout>
      </div>
    </Section>
  </div>
);
