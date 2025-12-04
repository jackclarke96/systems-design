import { Section, Paragraph, Heading } from "@/components/AlgorithmContent";
import { Callout } from "@/components/Callout";
import { QuizQuestion } from "@/components/Quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    question: "How do WebSockets establish a connection?",
    options: ["Direct TCP connection on port 80", "HTTP Upgrade header with 101 response", "UDP handshake on port 443", "gRPC initialization request"],
    correctIndex: 1,
    explanation: "WebSockets upgrade from HTTP/1.1 using the Upgrade header. Server responds with 101 Switching Protocols to confirm."
  },
  {
    question: "What is a disadvantage of WebSockets for horizontal scaling?",
    options: ["They don't support encryption", "They are stateful, requiring session affinity", "They have high bandwidth overhead", "They only work with HTTP/1.0"],
    correctIndex: 1,
    explanation: "WebSocket connections are stateful. Scaling horizontally requires session affinity or shared state between servers."
  },
  {
    question: "Which gRPC mode would you use for file uploads?",
    options: ["Unary RPC", "Server Streaming RPC", "Client Streaming RPC", "Bidirectional Streaming RPC"],
    correctIndex: 2,
    explanation: "Client Streaming RPC allows the client to send a stream of data (the file) to the server."
  },
  {
    question: "Why doesn't gRPC have native browser support?",
    options: ["Browsers don't support HTTP/2", "Browser APIs don't expose HTTP/2 primitives needed for gRPC", "gRPC requires TCP directly", "Protobuf isn't supported in JavaScript"],
    correctIndex: 1,
    explanation: "While browsers support HTTP/2, they don't expose the low-level APIs gRPC needs. A proxy is required to convert HTTP calls to gRPC."
  }
];

export const Content = () => (
  <div className="space-y-6">
    {/* WebSockets */}
    <Section title="WebSockets">
      <Paragraph>
        Bidirectional communication under the umbrella of HTTP. TCP is bidirectional, but browsers restrict direct TCP access for security. WebSockets provide full-duplex under HTTP protection.
      </Paragraph>

      <Heading>Connection Establishment</Heading>
      <div className="p-4 rounded-lg border border-border bg-card font-mono text-sm">
        <p className="text-muted-foreground"># Client Request</p>
        <p>GET /chat HTTP/1.1</p>
        <p>Upgrade: websocket</p>
        <p>Connection: Upgrade</p>
        <p>Sec-WebSocket-Key: x3JJHMbDL1EzLk...</p>
        <p className="mt-4 text-muted-foreground"># Server Response</p>
        <p>HTTP/1.1 <span className="text-green-400">101 Switching Protocols</span></p>
        <p>Upgrade: websocket</p>
      </div>

      <Callout type="info" title="Use Cases">
        <ul className="list-disc list-inside space-y-1">
          <li>Chat applications</li>
          <li>Live feeds / notifications</li>
          <li>Multiplayer gaming</li>
          <li>Real-time progress/logging</li>
        </ul>
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
          <h4 className="font-semibold text-green-400 mb-2">Pros</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Full-duplex communication</li>
            <li>HTTP compatible</li>
            <li>Firewall friendly (unlike raw TCP)</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <h4 className="font-semibold text-red-400 mb-2">Cons</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>L7 proxying is tricky</li>
            <li>L7 LB timeouts (use ping/pong)</li>
            <li>Stateful = hard to scale horizontally</li>
          </ul>
        </div>
      </div>

      <Callout type="tip" title="Alternatives">
        Consider long polling or Server-Sent Events if you don't need true bidirectional communication.
      </Callout>
    </Section>

    {/* gRPC */}
    <Section title="gRPC (Google RPC)">
      <Paragraph>
        Client-server communication framework. Uses HTTP/2 (hidden) with Protocol Buffers for message format. One maintained client library per language - solves the problem of maintaining client libraries across languages.
      </Paragraph>

      <Heading>gRPC Modes</Heading>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left border-b border-border">Mode</th>
              <th className="p-3 text-left border-b border-border">Description</th>
              <th className="p-3 text-left border-b border-border">Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-semibold">Unary</td>
              <td className="p-3">Request/response (like REST)</td>
              <td className="p-3">Simple API calls</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3 font-semibold">Server Streaming</td>
              <td className="p-3">Client sends one, server streams many</td>
              <td className="p-3">File download, logs, progress</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-semibold">Client Streaming</td>
              <td className="p-3">Client streams many, server responds once</td>
              <td className="p-3">File upload</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Bidirectional</td>
              <td className="p-3">Both stream simultaneously</td>
              <td className="p-3">Chat, real-time collaboration</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
          <h4 className="font-semibold text-green-400 mb-2">Pros</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Fast and compact (HTTP/2 + protobuf)</li>
            <li>One client library per language</li>
            <li>Built-in progress feedback</li>
            <li>Request cancellation</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <h4 className="font-semibold text-red-400 mb-2">Cons</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Schema required (protobuf)</li>
            <li>Thick client libraries with potential bugs</li>
            <li>Proxies tricky to implement</li>
            <li>No native browser support (need proxy)</li>
          </ul>
        </div>
      </div>
    </Section>
  </div>
);
