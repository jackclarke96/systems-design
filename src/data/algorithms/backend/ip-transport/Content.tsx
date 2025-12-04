import { Section, Paragraph, Heading } from "@/components/AlgorithmContent";
import { Callout } from "@/components/Callout";
import { QuizQuestion } from "@/components/Quiz";

export const quizQuestions: QuizQuestion[] = [
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
    question: "What is the purpose of the TCP window size?",
    options: ["Maximum packet size", "Amount of data sender can transmit before requiring ACK", "Time before connection timeout", "Number of retries allowed"],
    correctIndex: 1,
    explanation: "Window size determines how much data can be sent before requiring an acknowledgment, preventing fast senders from overwhelming slow receivers."
  }
];

export const Content = () => (
  <div className="space-y-6">
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
        <li><strong>CPU:</strong> Hashing the 4-tuple for connection lookup</li>
      </ul>

      <Heading>4-Way Handshake (Connection Close)</Heading>
      <div className="p-4 rounded-lg border border-border bg-card">
        <ol className="space-y-2 text-sm">
          <li><strong>1.</strong> Initiator sends FIN</li>
          <li><strong>2.</strong> Receiver sends ACK</li>
          <li><strong>3.</strong> Receiver sends FIN</li>
          <li><strong>4.</strong> Initiator sends ACK (enters TIME_WAIT state)</li>
        </ol>
        <p className="text-sm mt-2 text-muted-foreground">TIME_WAIT handles any lost/retransmitted segments before fully closing.</p>
      </div>

      <Heading>TCP Header Fields</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Sequence Number:</strong> Orders bytes in the stream</li>
        <li><strong>ACK Number:</strong> Acknowledges received bytes</li>
        <li><strong>Window Size (16-bit):</strong> Flow control - data allowed before ACK</li>
        <li><strong>Flags:</strong> SYN, ACK, FIN, RST, PSH, URG</li>
        <li><strong>MSS:</strong> Max Segment Size (typically 1460 bytes with 1500 MTU)</li>
      </ul>
    </Section>
  </div>
);
