import { Section, Paragraph, Heading, List, ListItem } from "@/components/AlgorithmContent";
import { Callout } from "@/components/Callout";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const Code = ({ children, language = "go" }: { children: string; language?: string }) => (
  <SyntaxHighlighter
    language={language}
    style={vscDarkPlus}
    customStyle={{
      borderRadius: "0.5rem",
      padding: "1rem",
      fontSize: "0.875rem",
      margin: "1rem 0",
    }}
  >
    {children}
  </SyntaxHighlighter>
);

export const Fundamentals = () => (
  <>
    {/* Overview */}
    <Section title="Go Concurrency Overview">
      <Paragraph>
        Most languages provide concurrency via a library using OS-level threads that share data by attempting to acquire locks. Go's concurrency, on the other hand, is based on **Communicating Sequential Processes (CSP)**.
      </Paragraph>
      <Callout type="info" title="CSP Philosophy">
        "Don't communicate by sharing memory; share memory by communicating." Instead of multiple threads fighting over shared data with locks, goroutines send data to each other through channels.
      </Callout>
    </Section>

    {/* When to Use */}
    <Section title="When to Use Concurrency">
      <Callout type="warning" title="Don't Overdo It">
        Concurrency often doesn't make programs faster. People add it, then add buffers when channels block, increase buffer sizes for deadlocks, move to mutexes, then give up.
      </Callout>
      
      <Heading>Concurrency ≠ Parallelism</Heading>
      <Paragraph>
        **Concurrency** is a tool to better structure problems. Whether concurrent code runs in **parallel** depends on hardware and whether the algorithm allows it.
      </Paragraph>

      <Heading>When Concurrency Makes Sense</Heading>
      <List>
        <ListItem>Programs follow: take data in → transform it → output it</ListItem>
        <ListItem>Use concurrency when **two independent steps** contribute to the overall response</ListItem>
        <ListItem>The concurrent process must take **significant time** to be worth the overhead</ListItem>
        <ListItem>**I/O operations** are ideal - disk/network is 1000x+ slower than in-memory processing</ListItem>
      </List>

      <Callout type="warning" title="Concurrency Overhead">
        Passing values via channels has overhead. If the work itself is faster than this overhead, concurrency makes things slower.
      </Callout>
    </Section>

    {/* Processes & Threads */}
    <Section title="Processes, Threads & Goroutines">
      <Heading>Definitions</Heading>
      <List>
        <ListItem>**Process**: An instance of a program run by the OS. The OS associates resources (memory) with it and isolates it from other processes.</ListItem>
        <ListItem>**Thread**: A unit of execution within a process. Threads share access to process resources. The OS schedules threads on CPU cores.</ListItem>
        <ListItem>**Goroutine**: A lightweight "thread" managed by the Go runtime, not the OS.</ListItem>
      </List>

      <Heading>How Goroutines Work</Heading>
      <Paragraph>
        When a Go program starts, the runtime creates a number of OS threads and launches a single goroutine to run `main()`. All goroutines are then multiplexed onto these threads by the **Go scheduler**.
      </Paragraph>

      <Callout type="tip" title="Goroutine Advantages">
        <List>
          <ListItem>**Faster creation** - not creating OS resources</ListItem>
          <ListItem>**Smaller stacks** - start at ~2KB, grow as needed (threads start at ~1MB)</ListItem>
          <ListItem>**Faster switching** - happens within process, no OS calls</ListItem>
          <ListItem>**Smarter scheduling** - integrates with network poller and GC</ListItem>
        </List>
      </Callout>

      <Paragraph>
        This means we can spawn **hundreds of thousands** of goroutines. Launching thousands of OS threads would make a program crawl.
      </Paragraph>

      <Heading>Launching Goroutines</Heading>
      <Code language="go">{`// Launch with 'go' keyword before function invocation
go process(val)

// Customary: use closure wrapping business logic
// Closure handles concurrent bookkeeping; business logic stays clean
func processConcurrently(inVals []int) []int {
    in := make(chan int, 5)
    out := make(chan int, 5)
    
    for i := 0; i < 5; i++ {
        go func() {
            for val := range in {
                out <- process(val) // process() is concurrency-unaware
            }
        }()
    }
    // ... feed in, collect out
}`}</Code>

      <Callout type="info" title="Keep Business Logic Clean">
        The `process()` function is completely unaware it runs in a goroutine. This keeps code modular, testable, and keeps concurrency out of APIs.
      </Callout>
    </Section>
  </>
);
