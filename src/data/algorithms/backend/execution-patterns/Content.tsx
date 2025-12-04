import { Section, Paragraph, Heading } from "@/components/AlgorithmContent";
import { Callout } from "@/components/Callout";
import { QuizQuestion } from "@/components/Quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the main difference between a process and a thread?",
    options: ["Threads are faster", "Processes share memory, threads don't", "Threads share memory within a process, processes are isolated", "There is no difference"],
    correctIndex: 2,
    explanation: "Threads within the same process share memory space. Processes are isolated and have their own memory, providing stability but requiring IPC to communicate."
  },
  {
    question: "What is a file descriptor?",
    options: ["A file's name", "An integer that uniquely identifies an open file or I/O resource", "The file's size", "The file's location on disk"],
    correctIndex: 1,
    explanation: "A file descriptor is an integer the OS uses to track open files, sockets, pipes, etc. for a process."
  },
  {
    question: "In the TCP accept flow, what happens when the Accept Queue is full?",
    options: ["New connections are dropped", "The kernel creates more threads", "The server crashes", "Connections are cached in memory"],
    correctIndex: 0,
    explanation: "When the Accept Queue is full, the kernel cannot accept more completed connections. New connections may be dropped or delayed."
  },
  {
    question: "What is the purpose of the SYN Queue?",
    options: ["To store completed connections", "To store half-open connections during handshake", "To store rejected connections", "To buffer data"],
    correctIndex: 1,
    explanation: "The SYN Queue holds connections that have received SYN but haven't completed the 3-way handshake yet (half-open)."
  },
  {
    question: "Why does Redis use fork() for backups?",
    options: ["Forking is faster than copying", "Copy-on-write allows backup without blocking writes", "Forking compresses data", "Redis doesn't use fork"],
    correctIndex: 1,
    explanation: "Fork with copy-on-write means the child process gets a snapshot. Only pages that change get copied, allowing the backup to proceed while the main process continues serving requests."
  },
  {
    question: "What is the recommended number of threads/processes for CPU-bound work?",
    options: ["As many as possible", "Equal to number of CPU cores", "Always 1", "Always 100"],
    correctIndex: 1,
    explanation: "For CPU-bound work, one thread/process per core is optimal. More causes context switching overhead without benefit."
  },
  {
    question: "What problem does socket sharding (SO_REUSEPORT) solve?",
    options: ["Encryption performance", "Multiple processes can listen on the same port with separate queues", "Memory allocation", "DNS resolution"],
    correctIndex: 1,
    explanation: "SO_REUSEPORT allows multiple processes to bind to the same port. The OS distributes connections across their separate accept queues, avoiding contention."
  },
  {
    question: "What makes a request idempotent?",
    options: ["It's encrypted", "Repeating it doesn't change backend state", "It's fast", "It uses GET method"],
    correctIndex: 1,
    explanation: "An idempotent request can be retried without causing additional side effects. Achieved via request IDs or upsert operations."
  }
];

export const Content = () => (
  <div className="space-y-6">
    {/* File Descriptors */}
    <Section title="File Descriptors">
      <Paragraph>
        A file descriptor is an integer that uniquely identifies an open file or I/O resource (pipe, socket, device) for a process. Used in UNIX/Linux systems.
      </Paragraph>

      <Callout type="info" title="Standard File Descriptors">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>0:</strong> stdin (standard input)</li>
          <li><strong>1:</strong> stdout (standard output)</li>
          <li><strong>2:</strong> stderr (standard error)</li>
        </ul>
      </Callout>

      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><code>read(fd)</code> - read data from file descriptor</li>
        <li><code>write(fd)</code> - write data to file descriptor</li>
        <li><code>close(fd)</code> - release the file descriptor</li>
        <li>Each process has a limit on open file descriptors</li>
      </ul>
    </Section>

    {/* Kernel, Processes, Threads */}
    <Section title="Kernel, Processes & Threads">
      <Heading>The Kernel</Heading>
      <Paragraph>
        Core component of OS. Main interface between hardware and processes. Provides access to CPU, memory, disk I/O, and networking.
      </Paragraph>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-semibold mb-2 text-blue-400">Process</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Instance of a program in execution</li>
            <li>Own memory space (isolated)</li>
            <li>Contains: program counter, stack, data section</li>
            <li>Communicate via IPC (sockets, shared memory)</li>
            <li>Heavyweight to create (new memory allocation)</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-semibold mb-2 text-green-400">Thread</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Smallest schedulable unit</li>
            <li>Shares memory within process</li>
            <li>Own stack and local variables</li>
            <li>Easy communication (shared memory)</li>
            <li>Lightweight to create</li>
          </ul>
        </div>
      </div>

      <Callout type="warning" title="Thread Safety">
        Threads sharing memory must use synchronization (mutexes, locks) to avoid race conditions.
      </Callout>
    </Section>

    {/* Execution Models */}
    <Section title="Execution Models">
      <Heading>Single-Threaded Process</Heading>
      <Paragraph>
        One process with one thread. Simple model. Example: Node.js (uses event loop for concurrency without threads).
      </Paragraph>

      <Heading>Multi-Process</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Multiple processes, each with own memory</li>
        <li>Examples: NGINX, PostgreSQL</li>
        <li>Can utilize multiple CPU cores</li>
        <li>More memory but isolated (stable)</li>
        <li><strong>Copy-on-Write:</strong> Fork creates snapshot; only changed pages copied (used by Redis for backups)</li>
      </ul>

      <Heading>Multi-Threaded</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>One process, multiple threads</li>
        <li>Shared memory (compete for resources)</li>
        <li>Can utilize multiple CPU cores</li>
        <li>Less memory than multi-process</li>
        <li>Requires locks/mutexes to prevent race conditions</li>
      </ul>

      <Callout type="tip" title="How Many Threads?">
        Rule of thumb: number of CPU cores. More threads cause context switching overhead without benefit for CPU-bound work.
      </Callout>
    </Section>

    {/* Backend Connection Handling */}
    <Section title="How Backend Accepts Connections">
      <Paragraph>
        When a server listens on address:port, the kernel manages TCP handshakes using queues.
      </Paragraph>

      <div className="p-4 rounded-lg border border-border bg-card">
        <h4 className="font-semibold mb-2">Connection Flow</h4>
        <ol className="text-sm space-y-2 list-decimal list-inside">
          <li>App calls <code>listen()</code> - kernel creates socket with SYN queue and Accept queue</li>
          <li>Client sends SYN → kernel adds to SYN queue, replies SYN/ACK</li>
          <li>Client sends ACK → kernel completes connection</li>
          <li>Connection moves from SYN queue to Accept queue</li>
          <li>App calls <code>accept()</code> → connection removed from Accept queue</li>
          <li>File descriptor created for the connection</li>
        </ol>
      </div>

      <Callout type="warning" title="Common Problems">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Backend too slow to accept:</strong> Accept queue fills up</li>
          <li><strong>SYN flooding:</strong> Attacker sends SYNs without ACKs, filling SYN queue</li>
          <li><strong>Small backlog:</strong> Queue size too small for traffic</li>
        </ul>
      </Callout>
    </Section>

    {/* Send/Receive Buffers */}
    <Section title="Reading and Sending Data">
      <Heading>Receive Flow</Heading>
      <ol className="text-sm space-y-1 list-decimal list-inside">
        <li>Client sends data → NIC receives frame</li>
        <li>Frame parsed → IP packet → TCP segment</li>
        <li>Kernel puts data in receive buffer (without app asking)</li>
        <li>Kernel ACKs and updates window</li>
        <li>App calls <code>read()</code> → copies from receive buffer</li>
        <li>Kernel discards its copy</li>
      </ol>

      <Heading>Send Flow</Heading>
      <ol className="text-sm space-y-1 list-decimal list-inside">
        <li>App calls <code>send()</code> → data copied to kernel send buffer</li>
        <li>Kernel buffers until segment size reached (efficiency)</li>
        <li>Kernel sends segments and handles retransmission</li>
      </ol>

      <Callout type="warning" title="Bottlenecks">
        <ul className="list-disc list-inside space-y-1">
          <li>Backend reads too slowly → receive buffer fills → kernel drops packets → client slows down</li>
          <li>Send buffer full → app blocks on <code>send()</code></li>
        </ul>
      </Callout>
    </Section>

    {/* Listener/Acceptor/Reader Patterns */}
    <Section title="Listener, Acceptor & Reader Patterns">
      <Paragraph>
        Different architectures for handling connections. Trade-offs between simplicity and scalability.
      </Paragraph>

      <Heading>Single Listener/Acceptor/Reader</Heading>
      <Paragraph>
        One process does everything. Example: Node.js with event loop. Simple but can become bottleneck with many connections.
      </Paragraph>

      <Heading>Single Acceptor, Multiple Readers</Heading>
      <Paragraph>
        Main process accepts, worker threads read. Example: Memcached. Main process assigns connections to thread pool.
      </Paragraph>

      <Heading>Multiple Acceptors on Single Socket</Heading>
      <Paragraph>
        Multiple threads call <code>accept()</code> on shared socket. Requires locking. Good for reverse proxies.
      </Paragraph>

      <Heading>Socket Sharding (SO_REUSEPORT)</Heading>
      <Paragraph>
        Multiple processes bind to same port. OS creates separate queues for each, distributes connections. No locking needed. Default in modern proxies.
      </Paragraph>

      <div className="p-4 rounded-lg border border-border bg-card">
        <h4 className="font-semibold mb-2">Comparison</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-2 text-left">Pattern</th>
                <th className="p-2 text-left">Pros</th>
                <th className="p-2 text-left">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-2">Single everything</td>
                <td className="p-2">Simple</td>
                <td className="p-2">Doesn't scale</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-2">Multi-reader</td>
                <td className="p-2">Better throughput</td>
                <td className="p-2">Load imbalance</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-2">Multi-acceptor</td>
                <td className="p-2">High throughput</td>
                <td className="p-2">Lock contention</td>
              </tr>
              <tr>
                <td className="p-2">Socket sharding</td>
                <td className="p-2">Best scalability</td>
                <td className="p-2">OS-dependent, complex</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Section>

    {/* Idempotency */}
    <Section title="Achieving Idempotency">
      <Paragraph>
        Idempotency means a request can be repeated without changing backend state. Critical for handling retries safely.
      </Paragraph>

      <Callout type="warning" title="The Problem">
        Client sends request → timeout → client retries → but original request was processed. Without idempotency, action happens twice (e.g., double payment).
      </Callout>

      <Heading>Implementation Strategies</Heading>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Request ID:</strong> Client sends unique ID. Server checks if already processed.</li>
        <li><strong>Upsert:</strong> Insert or update based on unique key (same result either way)</li>
        <li><strong>Idempotency keys:</strong> Store in database with TTL</li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
          <h4 className="font-semibold text-green-400 mb-2">Naturally Idempotent</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>GET requests</li>
            <li>DELETE (deleting same thing twice = same result)</li>
            <li>PUT with full resource replacement</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <h4 className="font-semibold text-red-400 mb-2">Not Naturally Idempotent</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>POST (creates new resource each time)</li>
            <li>Increment operations</li>
            <li>Payment processing</li>
          </ul>
        </div>
      </div>

      <Callout type="tip" title="Best Practice">
        For critical operations (payments), always implement idempotency keys. Store them with the transaction for deduplication.
      </Callout>
    </Section>
  </div>
);
