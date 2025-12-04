import { Section, Paragraph, Heading } from "@/components/AlgorithmContent";
import { Callout } from "@/components/Callout";
import { QuizQuestion } from "@/components/Quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Which OSI layer is responsible for IP addressing and routing?",
    options: ["Layer 2 - Data Link", "Layer 3 - Network", "Layer 4 - Transport", "Layer 5 - Session"],
    correctIndex: 1,
    explanation: "Layer 3 (Network) handles IP addressing, routing, and packet forwarding between networks."
  },
  {
    question: "What is the main difference between a hub and a switch?",
    options: ["Hubs are faster than switches", "Switches broadcast to all ports, hubs forward to specific MAC", "Hubs broadcast to all ports, switches forward to specific MAC", "There is no difference"],
    correctIndex: 2,
    explanation: "A hub broadcasts data to every port (L1), while a switch reads the MAC address and forwards only to the destination port (L2)."
  },
  {
    question: "At which OSI layer does TLS operate?",
    options: ["Layer 3 - Network", "Layer 4 - Transport", "Layer 5 - Session", "Layer 7 - Application"],
    correctIndex: 2,
    explanation: "TLS operates at Layer 5 (Session) where connection establishment and state management occur."
  },
  {
    question: "What data unit is used at Layer 4 (Transport)?",
    options: ["Bits", "Frames", "Packets", "Segments"],
    correctIndex: 3,
    explanation: "Layer 4 uses segments (TCP) or datagrams (UDP). Packets are Layer 3, frames are Layer 2, bits are Layer 1."
  }
];

export const Content = () => (
  <div className="space-y-6">
    {/* Protocol Properties */}
    <Section title="Protocol Properties">
      <Paragraph>
        A protocol is a system of rules that allows two parties to communicate. Protocols are designed with specific properties based on their purpose (TCP, UDP, HTTP, gRPC, FTP).
      </Paragraph>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <Heading>Data Format</Heading>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li><strong>Text-based:</strong> Plain, JSON, XML</li>
            <li><strong>Binary:</strong> Protobuf, RESP, H2, H3</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <Heading>Transfer Mode</Heading>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li><strong>Message-based:</strong> UDP, HTTP</li>
            <li><strong>Stream:</strong> TCP, WebRTC</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <Heading>Addressing</Heading>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>DNS name</li>
            <li>IP address</li>
            <li>MAC address</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <Heading>Directionality</Heading>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li><strong>Bidirectional:</strong> TCP</li>
            <li><strong>Unidirectional:</strong> Broadcast</li>
            <li><strong>Half-duplex:</strong> WiFi (one at a time)</li>
            <li><strong>Full-duplex:</strong> Both simultaneously</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <Heading>State</Heading>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li><strong>Stateful:</strong> TCP, gRPC, Apache Thrift</li>
            <li><strong>Stateless:</strong> UDP, HTTP</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <Heading>Control & Errors</Heading>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li><strong>Flow/Congestion:</strong> TCP has both, UDP has none</li>
            <li><strong>Errors:</strong> Codes, retries, timeouts</li>
          </ul>
        </div>
      </div>
    </Section>

    {/* OSI Model */}
    <Section title="OSI Model (Open Systems Interconnection)">
      <Callout type="info" title="Why We Need a Communication Model">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Agnostic Applications:</strong> Apps work regardless of network medium (WiFi, Ethernet, LTE, Fiber)</li>
          <li><strong>Equipment Management:</strong> Network equipment can be upgraded without affecting applications</li>
          <li><strong>Decoupled Innovation:</strong> Each layer can evolve independently</li>
        </ul>
      </Callout>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left border-b border-border">Layer</th>
              <th className="p-3 text-left border-b border-border">Name</th>
              <th className="p-3 text-left border-b border-border">Purpose</th>
              <th className="p-3 text-left border-b border-border">Data Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-mono">7</td>
              <td className="p-3">Application</td>
              <td className="p-3">HTTP, FTP, gRPC - the application itself</td>
              <td className="p-3">Data</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3 font-mono">6</td>
              <td className="p-3">Presentation</td>
              <td className="p-3">Encoding/Serialization (JSON → string)</td>
              <td className="p-3">Data</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-mono">5</td>
              <td className="p-3">Session</td>
              <td className="p-3">Connection establishment, TLS, state</td>
              <td className="p-3">Data</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3 font-mono">4</td>
              <td className="p-3">Transport</td>
              <td className="p-3">UDP/TCP - port visibility</td>
              <td className="p-3">Segments</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 font-mono">3</td>
              <td className="p-3">Network</td>
              <td className="p-3">IP addressing, routing</td>
              <td className="p-3">Packets</td>
            </tr>
            <tr className="border-b border-border bg-muted/50">
              <td className="p-3 font-mono">2</td>
              <td className="p-3">Data Link</td>
              <td className="p-3">MAC addresses, Ethernet</td>
              <td className="p-3">Frames</td>
            </tr>
            <tr>
              <td className="p-3 font-mono">1</td>
              <td className="p-3">Physical</td>
              <td className="p-3">Electric signals, fiber, radio waves</td>
              <td className="p-3">Bits</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Heading>OSI Example: Sending HTTPS POST Request</Heading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
          <h4 className="font-semibold text-green-400 mb-2">Sender (Down the Stack)</h4>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>L7: POST request with JSON data</li>
            <li>L6: Serialize JSON to bytes</li>
            <li>L5: Establish TCP/TLS connection</li>
            <li>L4: SYN to port 443</li>
            <li>L3: Add source/dest IPs to packet</li>
            <li>L2: Add MAC addresses to frame</li>
            <li>L1: Convert to radio/electric/light</li>
          </ol>
        </div>
        
        <div className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/10">
          <h4 className="font-semibold text-blue-400 mb-2">Receiver (Up the Stack)</h4>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>L1: Receive signal → digital bits</li>
            <li>L2: Assemble into frames</li>
            <li>L3: Assemble into IP packets</li>
            <li>L4: Assemble into TCP segments</li>
            <li>L5: Identify/establish session</li>
            <li>L6: Deserialize bytes to JSON</li>
            <li>L7: Application receives request</li>
          </ol>
        </div>
      </div>

      <Callout type="info" title="Network Devices by Layer">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Hub:</strong> L1 - Broadcasts to all ports</li>
          <li><strong>Switch:</strong> L2 - Forwards based on MAC address</li>
          <li><strong>Router:</strong> L3 - Routes based on IP address</li>
          <li><strong>Firewall:</strong> L4 - Filters by IP and ports (some L7)</li>
          <li><strong>Load Balancer:</strong> L7 - Routes based on URL path, caching</li>
        </ul>
      </Callout>
    </Section>
  </div>
);
