import { Section, Paragraph, Heading } from "@/components/AlgorithmContent";
import { Callout } from "@/components/Callout";
import { Quiz, QuizQuestion } from "@/components/Quiz";

const quizQuestions: QuizQuestion[] = [
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
    question: "How does a host determine if a destination IP is in the same subnet?",
    options: ["By comparing the first octet only", "By performing bitwise AND with the subnet mask", "By sending an ARP request", "By querying the DNS server"],
    correctIndex: 1,
    explanation: "The host applies the subnet mask to both IPs using bitwise AND. If results match, they're in the same subnet."
  },
  {
    question: "What does TTL represent in an IP packet?",
    options: ["Time in seconds before packet expires", "Total transmission length", "Number of router hops before packet is discarded", "Time to live in milliseconds"],
    correctIndex: 2,
    explanation: "TTL is decremented at each router hop. When it reaches 0, the packet is discarded and an ICMP message is sent back."
  },
  {
    question: "Why is UDP considered 'connectionless'?",
    options: ["It cannot connect to servers", "It doesn't require a handshake before sending data", "It only works on local networks", "It doesn't use ports"],
    correctIndex: 1,
    explanation: "UDP doesn't require any handshake or connection establishment. Data can be sent immediately without prior communication."
  },
  {
    question: "What are the four properties that uniquely identify a TCP connection?",
    options: ["Protocol, Version, Flags, Checksum", "Source IP, Source Port, Destination IP, Destination Port", "Sequence Number, ACK Number, Window Size, Checksum", "TTL, Protocol, Source IP, Destination IP"],
    correctIndex: 1,
    explanation: "A TCP connection (socket) is uniquely identified by the 4-tuple: Source IP, Source Port, Destination IP, Destination Port."
  },
  {
    question: "In TCP's 3-way handshake, what does the server send in response to SYN?",
    options: ["ACK only", "SYN only", "SYN/ACK", "FIN/ACK"],
    correctIndex: 2,
    explanation: "The server responds with SYN/ACK - acknowledging the client's SYN and sending its own SYN with initial sequence number."
  },
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

    {/* Internet Protocol */}
    <Section title="Internet Protocol (IP) - Layer 3">
      <Paragraph>
        IP addresses are 4 bytes (32 bits) in IPv4. The address has a network portion and host portion, determined by the subnet mask.
      </Paragraph>

      <Heading>Subnet Mask & Routing</Heading>
      <div className="p-4 rounded-lg border border-border bg-card font-mono text-sm">
        <p>192.168.254.0<span className="text-primary">/24</span> → Subnet mask: 255.255.255.0</p>
        <p className="mt-2">First 24 bits = network, Last 8 bits = hosts (254 usable)</p>
      </div>

      <Callout type="tip" title="Same Subnet Check">
        <p className="mb-2">Host 192.168.1.3 wants to talk to 192.168.1.2:</p>
        <div className="font-mono text-sm space-y-1">
          <p>255.255.255.0 AND 192.168.1.3 = 192.168.1.0</p>
          <p>255.255.255.0 AND 192.168.1.2 = 192.168.1.0</p>
          <p className="text-green-400">Same subnet → Use MAC address directly</p>
        </div>
        <p className="mt-2 text-sm">If different subnets → Send to Default Gateway (router)</p>
      </Callout>

      <Heading>IP Packet Anatomy</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Header:</strong> 20-60 bytes</li>
        <li><strong>Data:</strong> Up to 65,536 bytes</li>
        <li><strong>TTL:</strong> Number of hops (not time) - decrements at each router</li>
        <li><strong>Protocol:</strong> What's inside (TCP=6, UDP=17)</li>
        <li><strong>ECN:</strong> Explicit Congestion Notification from routers</li>
      </ul>

      <Heading>ICMP - Internet Control Message Protocol</Heading>
      <Paragraph>
        Informational messages (host unreachable, packet expired). Used by PING and traceroute. Uses IP directly - no ports. Some firewalls block ICMP for security, but this can cause connection issues.
      </Paragraph>
    </Section>

    {/* UDP */}
    <Section title="UDP - User Datagram Protocol (Layer 4)">
      <Paragraph>
        Simple, connectionless protocol. The user's message fits exactly into a UDP datagram which sits in an IP packet. No handshake, no state, 8-byte header.
      </Paragraph>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
          <h4 className="font-semibold text-green-400 mb-2">UDP Pros</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Simple, small header (8 bytes)</li>
            <li>Less bandwidth</li>
            <li>Stateless - less memory</li>
            <li>Low latency - no handshake</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <h4 className="font-semibold text-red-400 mb-2">UDP Cons</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>No guaranteed delivery</li>
            <li>No flow/congestion control</li>
            <li>No ordered packets</li>
            <li>Easily spoofed (no handshake)</li>
          </ul>
        </div>
      </div>

      <Callout type="info" title="Use Cases">
        Video streaming, VPN, DNS, WebRTC - where speed matters more than 100% delivery
      </Callout>

      <Heading>Multiplexing/Demultiplexing</Heading>
      <Paragraph>
        IP targets hosts only. Ports (16-bit, 0-65535) identify the application/process. Sender multiplexes apps into UDP; receiver demultiplexes to each app. Source port needed so responses know where to return.
      </Paragraph>
    </Section>

    {/* TCP */}
    <Section title="TCP - Transmission Control Protocol (Layer 4/5)">
      <Paragraph>
        Connection-oriented protocol with guaranteed delivery. Requires handshake, maintains state, 20-60 byte header. Used for reliable communication: web, databases, remote shells.
      </Paragraph>

      <Callout type="warning" title="TCP Connection">
        <p>A connection is identified by 4 properties: <strong>SourceIP:SourcePort ↔ DestIP:DestPort</strong></p>
        <p className="mt-1">Also called a socket or file descriptor. Requires 3-way handshake.</p>
      </Callout>

      <Heading>3-Way Handshake</Heading>
      <div className="p-4 rounded-lg border border-border bg-card">
        <ol className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <span className="font-mono bg-primary/20 px-2 py-1 rounded">1</span>
            <div><strong>SYN:</strong> Client sends SYN with initial sequence number (e.g., 1000)</div>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono bg-primary/20 px-2 py-1 rounded">2</span>
            <div><strong>SYN/ACK:</strong> Server responds with its sequence (e.g., 5000) and ACK=1001</div>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono bg-primary/20 px-2 py-1 rounded">3</span>
            <div><strong>ACK:</strong> Client sends ACK=5001. Connection established!</div>
          </li>
        </ol>
      </div>

      <Heading>After Handshake</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>File Descriptor:</strong> OS reference to the connection</li>
        <li><strong>Memory:</strong> Buffering data before send/after receive</li>
        <li><strong>CPU:</strong> Hashing the 4-tuple, processing packets, retransmissions</li>
      </ul>

      <Heading>Data Transfer</Heading>
      <Paragraph>
        Segments are sequenced and acknowledged. Lost segments are retransmitted. Can send multiple segments before ACK returns (limited by congestion control). ACK 3 acknowledges everything before 3.
      </Paragraph>

      <Heading>Connection Closing (4-Way Handshake)</Heading>
      <div className="font-mono text-sm p-3 bg-muted rounded">
        Client → FIN → Server → ACK → Server → FIN → Client → ACK
      </div>
      <Paragraph>
        Initiator enters TIME_WAIT state to handle any delayed retransmissions.
      </Paragraph>

      <Heading>TCP Header Fields</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Window Size (16-bit):</strong> Flow control - how much data before needing ACK</li>
        <li><strong>Flags (9-bit):</strong> SYN, FIN, ACK, RST, CWR (congestion)</li>
        <li><strong>MSS:</strong> Max Segment Size, typically 1460 bytes (MTU 1500 - headers)</li>
      </ul>
    </Section>

    {/* TLS */}
    <Section title="TLS - Transport Layer Security">
      <Paragraph>
        Standard encryption for HTTP (HTTPS). Stateful (Layer 5). Uses symmetric encryption (fast) with asymmetric key exchange.
      </Paragraph>

      <Heading>TLS 1.2 (RSA Key Exchange)</Heading>
      <ol className="list-decimal list-inside space-y-1 text-sm">
        <li>Client Hello: "I want to encrypt using RSA + AES"</li>
        <li>Server responds with certificate containing public key</li>
        <li>Client generates symmetric key, encrypts with server's public key</li>
        <li>Server decrypts with private key → both have shared key</li>
      </ol>
      
      <Callout type="warning" title="RSA Problem">
        No forward secrecy - if server's private key is compromised, all past traffic can be decrypted.
      </Callout>

      <Heading>TLS 1.3 (Diffie-Hellman)</Heading>
      <Paragraph>
        Uses two private keys (client x, server y) and public parameters (g, n). The math: g^x mod n and g^y mod n can be exchanged, but g^xy mod n (the shared secret) cannot be derived without knowing both private keys.
      </Paragraph>
      
      <ol className="list-decimal list-inside space-y-1 text-sm">
        <li>Client generates private (x), sends g^x mod n with Hello</li>
        <li>Server generates private (y), computes symmetric key, sends g^y mod n</li>
        <li>Client computes symmetric key from (g^y mod n)^x</li>
      </ol>
      
      <Callout type="tip" title="TLS 1.3 Advantage">
        One round trip instead of two. Even if one private key leaks, past sessions remain secure (forward secrecy).
      </Callout>
    </Section>

    {/* HTTP */}
    <Section title="HTTP Evolution">
      <Heading>HTTP Request/Response Structure</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded border border-border bg-card">
          <h5 className="font-semibold mb-2">Request</h5>
          <ul className="space-y-1">
            <li>Method (GET, POST, etc.)</li>
            <li>Path + Query params</li>
            <li>Protocol version</li>
            <li>Headers (Host is crucial)</li>
            <li>Body</li>
          </ul>
        </div>
        <div className="p-3 rounded border border-border bg-card">
          <h5 className="font-semibold mb-2">Response</h5>
          <ul className="space-y-1">
            <li>Protocol version</li>
            <li>Status code (200, 404, etc.)</li>
            <li>Status text</li>
            <li>Headers</li>
            <li>Body</li>
          </ul>
        </div>
      </div>

      <Heading>HTTP/1.0</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>New TCP connection per request (slow)</li>
        <li>No persistent connections</li>
        <li>No Host header (1 IP = 1 website)</li>
      </ul>

      <Heading>HTTP/1.1</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Persistent TCP connections (keep-alive)</li>
        <li>Host header enables virtual hosting</li>
        <li>Chunked transfer encoding</li>
        <li>Pipelining (disabled by default - responses must be in order)</li>
      </ul>
      
      <Callout type="warning" title="HTTP Smuggling">
        Content-Length confusion between proxies/servers can cause security issues.
      </Callout>

      <Heading>HTTP/2</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Multiplexing:</strong> Multiple requests on same connection via stream IDs</li>
        <li>Header compression (HPACK)</li>
        <li>Binary framing (not text)</li>
        <li>Server push</li>
        <li>Secure by default (TLS)</li>
      </ul>
      
      <Callout type="warning" title="HTTP/2 Problem: TCP Head-of-Line Blocking">
        TCP delivers bytes in order. If packet 1 is lost but 2-10 arrive, all must wait. Streams don't care about order, but TCP does.
      </Callout>

      <Heading>HTTP/3 (QUIC)</Heading>
      <Paragraph>
        Replaces TCP with QUIC (UDP-based with congestion control). Solves head-of-line blocking because each stream is independent.
      </Paragraph>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
          <h4 className="font-semibold text-green-400 mb-2">QUIC Pros</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>No head-of-line blocking</li>
            <li>Merged connection + TLS handshake</li>
            <li>Per-stream congestion control</li>
            <li>Connection migration (connectionID)</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <h4 className="font-semibold text-red-400 mb-2">QUIC Cons</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>High CPU for parsing</li>
            <li>UDP often blocked in enterprises</li>
            <li>No IP fragmentation support</li>
          </ul>
        </div>
      </div>
    </Section>

    {/* WebSockets */}
    <Section title="WebSockets">
      <Paragraph>
        Bidirectional communication under HTTP umbrella. Uses ws:// or wss:// protocol. Upgrades from HTTP/1.1 via Upgrade header, server responds with 101 Switching Protocols.
      </Paragraph>

      <Callout type="info" title="Use Cases">
        Chat, live feeds, multiplayer gaming, real-time progress/logging
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
          <h4 className="font-semibold text-green-400 mb-2">Pros</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Full-duplex communication</li>
            <li>HTTP compatible</li>
            <li>Firewall friendly</li>
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
        Client-server communication framework. Uses HTTP/2 (hidden) with Protocol Buffers for message format. One maintained client library per language.
      </Paragraph>

      <Heading>gRPC Modes</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Unary:</strong> Request/response (like REST)</li>
        <li><strong>Server Streaming:</strong> File download, logging, progress</li>
        <li><strong>Client Streaming:</strong> File upload</li>
        <li><strong>Bidirectional:</strong> WebRTC-like communication</li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <li>No native browser support</li>
          </ul>
        </div>
      </div>
    </Section>

    {/* Quiz */}
    <Section title="Quiz">
      <Quiz questions={quizQuestions} />
    </Section>
  </div>
);
