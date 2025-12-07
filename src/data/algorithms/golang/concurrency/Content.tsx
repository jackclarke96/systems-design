import { Section, Paragraph, Heading, List, ListItem } from "@/components/AlgorithmContent";
import { Callout } from "@/components/Callout";
import { QuizQuestion } from "@/components/Quiz";
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

export const quizQuestions: QuizQuestion[] = [
  { question: "What is the fundamental difference between Go's concurrency model and traditional threading?", options: ["Go uses OS-level threads exclusively", "Go is based on Communicating Sequential Processes (CSP) - sharing by communicating rather than communicating by sharing", "Go doesn't support concurrency", "Go uses only mutex-based synchronization"], correctIndex: 1, explanation: "Go's concurrency is based on CSP, where goroutines communicate via channels rather than sharing memory with locks." },
  { question: "What is the initial stack size of a goroutine?", options: ["1MB (same as OS threads)", "8KB", "~2KB", "64KB"], correctIndex: 2, explanation: "Goroutines start with a small ~2KB stack that grows and shrinks as needed, making them much more memory-efficient than OS threads." },
  { question: "What happens when you write to a closed channel?", options: ["Returns an error", "The write is silently ignored", "Causes a panic", "Returns false"], correctIndex: 2, explanation: "Writing to a closed channel causes a panic. Only the goroutine writing to a channel should close it." },
  { question: "What is the zero value of a channel?", options: ["An empty channel", "A closed channel", "nil", "A buffered channel with capacity 0"], correctIndex: 2, explanation: "The zero value of a channel is nil. Reading from or writing to a nil channel blocks forever." },
  { question: "In an unbuffered channel, what happens when a goroutine writes to it?", options: ["The write completes immediately", "The writing goroutine pauses until another goroutine reads from the channel", "The value is discarded if no reader is ready", "An error is returned"], correctIndex: 1, explanation: "Unbuffered channels require a rendezvous - the writer blocks until a reader is ready, and vice versa." },
  { question: "How does select prevent deadlocks when accessing multiple channels?", options: ["It uses timeouts automatically", "It acquires locks in a consistent order", "It randomly selects which channel operation to perform, avoiding lock ordering issues", "It buffers all channel operations"], correctIndex: 2, explanation: "Select randomly chooses among ready cases, preventing the deadlock pattern where goroutines wait on each other in inconsistent order." },
  { question: "What is a goroutine leak?", options: ["A goroutine that uses too much CPU", "A goroutine that will never exit, keeping its memory allocated forever", "A goroutine that writes to too many channels", "A goroutine that spawns too many child goroutines"], correctIndex: 1, explanation: "A goroutine leak occurs when a goroutine blocks forever (e.g., on a channel read that will never happen), preventing GC from reclaiming its stack and rooted memory." },
  { question: "Why should channels and mutexes NOT be exposed in public APIs?", options: ["They're too slow for public use", "They're implementation details that should be hidden", "Go doesn't allow exporting channel types", "They can only be used within a single package"], correctIndex: 1, explanation: "Good APIs hide implementation details. Concurrency primitives are implementation details - the API consumer shouldn't need to know how concurrency is managed internally." },
  { question: "When is concurrency NOT worth the overhead?", options: ["When processing I/O operations", "When the concurrent work is very fast (faster than channel communication overhead)", "When you have multiple CPU cores", "When processing independent data"], correctIndex: 1, explanation: "Concurrency has overhead from goroutine creation and channel communication. If the work itself is faster than this overhead, concurrency slows things down." },
  { question: "What does 'escape analysis' determine in Go?", options: ["Whether a goroutine will leak", "Whether a variable can stay on the stack or must be allocated on the heap", "Whether a channel is buffered or unbuffered", "Whether a function can be inlined"], correctIndex: 1, explanation: "Escape analysis determines if a variable's lifetime exceeds its function's scope. If it 'escapes', it must be heap-allocated; otherwise it stays on the faster stack." },
  { question: "How do you properly handle early exit from a channel-reading loop to prevent goroutine leaks?", options: ["Use a defer statement", "Close the channel from the reader", "Use context cancellation to signal the writing goroutine to stop", "Use a buffered channel"], correctIndex: 2, explanation: "Context cancellation (via ctx.Done()) signals the writing goroutine to exit, preventing it from blocking forever on a channel write that will never be read." },
  { question: "What is the purpose of the comma-ok idiom when reading from a channel: v, ok := <-ch?", options: ["To check if the value is valid", "To check if the channel is still open", "To check if the read timed out", "To check if there are more values in the buffer"], correctIndex: 1, explanation: "The ok value is true if the channel is open and the value was received normally; false if the channel is closed (and v is the zero value)." },
  { question: "Why do goroutine stacks grow by copying rather than extending?", options: ["It's faster than extension", "Go requires contiguous stack memory for pointer safety", "Extension isn't supported by operating systems", "Copying uses less total memory"], correctIndex: 1, explanation: "Go requires contiguous stacks so that stack pointers remain valid. When growing, the runtime copies the entire stack to a larger contiguous block." },
  { question: "What is 'heap churn' and why is it problematic?", options: ["Too many goroutines accessing the heap simultaneously", "Lots of short-lived heap allocations causing frequent GC work", "Memory fragmentation on the heap", "Deadlocks caused by heap access"], correctIndex: 1, explanation: "Heap churn means many short-lived allocations (e.g., growing slices repeatedly). This increases GC pressure and can hurt performance." },
  { question: "In a select statement, what happens if multiple cases are ready simultaneously?", options: ["The first case in order is chosen", "An error occurs", "One is chosen randomly", "All ready cases execute"], correctIndex: 2, explanation: "Unlike switch, select randomly picks among ready cases. This prevents starvation where one case would always be favored." },
  { question: "What is backpressure in concurrent systems?", options: ["Memory pressure from too many allocations", "Components limiting work they accept to prevent overload", "Pressure on the CPU from too many goroutines", "Network pressure from too many connections"], correctIndex: 1, explanation: "Backpressure means components refuse additional work when at capacity, preventing cascade failures and allowing the system to shed load gracefully." },
  { question: "Why is a default case in a for-select loop usually a bad idea?", options: ["It makes the code harder to read", "The loop runs constantly (busy-wait), consuming CPU", "It can cause channel deadlocks", "Go doesn't support it"], correctIndex: 1, explanation: "A default case means the loop never blocks - it busy-waits, spinning the CPU constantly checking if channels are ready." },
  { question: "What triggers a variable to 'escape' to the heap?", options: ["Using it in a loop", "Returning a pointer to it, storing in heap object, or capturing in a closure used after function returns", "Passing it to another function", "Using it with channels"], correctIndex: 1, explanation: "Variables escape when the compiler can't prove they'll die with the function: returning pointers, storing addresses in heap objects, or closure capture for later use." },
  { question: "How should you implement exactly-once channel close with multiple writers?", options: ["Have any writer close when done", "Use a sync.WaitGroup to coordinate closing after all writers finish", "Use a mutex to protect the close", "Use a buffered channel"], correctIndex: 1, explanation: "sync.WaitGroup tracks when all writers are done. The coordinating goroutine waits on the WaitGroup and then closes the channel exactly once." },
  { question: "What is the advantage of goroutine scheduling happening in user-space vs OS scheduling?", options: ["More CPU cores can be used", "Context switches are faster (no system calls) and the scheduler can optimize with knowledge of the Go runtime", "Goroutines can access more memory", "It's more secure"], correctIndex: 1, explanation: "User-space scheduling avoids expensive OS system calls. The Go scheduler also integrates with the network poller and GC for better optimization." },
];

export const Content = () => {
  return (
    <div className="space-y-8">
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

      {/* Channels */}
      <Section title="Channels">
        <Paragraph>
          Channels are the pipes through which goroutines communicate. Created with `make`, they are **reference types** with a zero value of `nil`.
        </Paragraph>

        <Heading>Reading & Writing</Heading>
        <Code language="go">{`ch := make(chan int)

// Write: arrow points INTO channel
ch <- writeVal

// Read: arrow points OUT of channel  
readVal := <-ch

// Each value is read only once
// If multiple goroutines read, only one gets each value`}</Code>

        <Heading>Direction Restrictions</Heading>
        <Code language="go">{`// Read-only channel (can only receive)
func consumer(ch <-chan int) { ... }

// Write-only channel (can only send)
func producer(ch chan<- int) { ... }

// The compiler enforces these restrictions`}</Code>

        <Heading>Unbuffered vs Buffered</Heading>
        <Code language="go">{`// Unbuffered - requires rendezvous
ch := make(chan int)
// Writer blocks until reader is ready
// Reader blocks until writer sends

// Buffered - allows limited async writes
ch := make(chan int, 10) // buffer size 10
// Writer blocks only when buffer is full
// Reader blocks only when buffer is empty

len(ch) // current items in buffer
cap(ch) // buffer capacity (cannot change)`}</Code>

        <Callout type="info" title="When to Buffer">
          Most of the time, use **unbuffered channels**. Buffered channels add complexity - you must handle the full-buffer case. Use buffered when you know exactly how many goroutines you have, or for backpressure control.
        </Callout>

        <Heading>Closing Channels</Heading>
        <Code language="go">{`close(ch) // Built-in function

// After close:
// - Writing -> PANIC
// - Reading -> returns zero values (or buffered values first)

// Check if channel is closed
v, ok := <-ch
// ok == true: channel open, v is valid
// ok == false: channel closed

// Range reads until channel closes
for v := range ch {
    process(v)
}`}</Code>

        <Callout type="warning" title="Who Closes?">
          The responsibility to close lies with the **writing** goroutine. Only close if a goroutine is waiting for it (e.g., for-range loop). With multiple writers, use `sync.WaitGroup` to coordinate a single close.
        </Callout>
      </Section>

      {/* Select */}
      <Section title="Select Statement">
        <Paragraph>
          The `select` statement is the control structure for concurrency. It solves: "If you can perform two concurrent operations, which one do you do first?"
        </Paragraph>

        <Code language="go">{`select {
case v := <-ch1:
    fmt.Println("received from ch1:", v)
case v := <-ch2:
    fmt.Println("received from ch2:", v)
case ch3 <- x:
    fmt.Println("sent to ch3:", x)
case <-time.After(time.Second):
    fmt.Println("timeout")
default:
    fmt.Println("no channel ready")
}`}</Code>

        <Heading>Key Behaviors</Heading>
        <List>
          <ListItem>**Random selection**: Unlike switch, if multiple cases are ready, one is chosen **randomly** (prevents starvation)</ListItem>
          <ListItem>**Each case is its own block**: Variables declared in a case are scoped to that case</ListItem>
          <ListItem>**Default case**: Executes if no channel is ready (but usually bad in loops - causes busy-wait)</ListItem>
        </List>

        <Heading>Select Prevents Deadlocks</Heading>
        <Paragraph>
          Acquiring locks in inconsistent order causes deadlocks. Select avoids this:
        </Paragraph>

        <Code language="go">{`// DEADLOCK example (without select)
func main() {
    ch1 := make(chan int)
    ch2 := make(chan int)
    
    go func() {
        ch1 <- 1      // (A) blocks waiting for reader
        v := <-ch2    // never reached
    }()
    
    ch2 <- 2          // (B) blocks waiting for reader
    v := <-ch1        // never reached
    
    // Goroutine blocked on (A), main blocked on (B)
    // Neither can proceed -> DEADLOCK
}`}</Code>

        <Code language="go">{`// FIXED with select
func main() {
    ch1 := make(chan int)
    ch2 := make(chan int)
    
    go func() {
        ch1 <- 1
        v := <-ch2
    }()
    
    var fromGoroutine int
    select {
    case ch2 <- 2:
        // might happen if goroutine reads ch2 first
    case fromGoroutine = <-ch1:
        // or this happens if goroutine writes ch1 first
    }
    // Select checks both options - one will succeed
}`}</Code>

        <Heading>For-Select Loop</Heading>
        <Code language="go">{`// Common pattern: select in a loop
for {
    select {
    case v := <-ch:
        process(v)
    case <-done:
        return // EXIT the loop
    }
}

// WARNING: Avoid default in for-select loops
// (causes constant spinning, burns CPU)`}</Code>
      </Section>

      {/* Goroutine Leaks */}
      <Section title="Goroutine Leaks">
        <Paragraph>
          Unlike variables, the Go runtime **cannot detect** when a goroutine will never be used again. If a goroutine doesn't exit, its stack memory stays allocated and any heap memory rooted in its stack cannot be garbage collected.
        </Paragraph>

        <Heading>Classic Leak Example</Heading>
        <Code language="go">{`func countTo(max int) <-chan int {
    ch := make(chan int)
    go func() {
        for i := 0; i < max; i++ {
            ch <- i  // blocks if no reader
        }
        close(ch)
    }()
    return ch
}

func main() {
    for i := range countTo(10) {
        if i > 5 {
            break  // LEAK! goroutine still trying to write
        }
        fmt.Println(i)
    }
    // countTo goroutine blocked forever on ch <- 6
}`}</Code>

        <Heading>Fix: Context Cancellation</Heading>
        <Code language="go">{`func countTo(ctx context.Context, max int) <-chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        for i := 0; i < max; i++ {
            select {
            case <-ctx.Done():
                return  // Clean exit on cancellation
            case ch <- i:
            }
        }
    }()
    return ch
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()  // Ensures goroutine exits when main returns
    
    for i := range countTo(ctx, 10) {
        if i > 5 {
            break
        }
        fmt.Println(i)
    }
    // cancel() called via defer, goroutine sees ctx.Done() and exits
}`}</Code>
      </Section>

      {/* Memory Model */}
      <Section title="Memory: Stack vs Heap">
        <Heading>Goroutine Stacks</Heading>
        <List>
          <ListItem>**One stack per goroutine**, starts small (~2KB)</ListItem>
          <ListItem>**Grows/shrinks automatically** by copying to larger/smaller contiguous memory</ListItem>
          <ListItem>Contains: function frames, parameters, return slots, local variables</ListItem>
          <ListItem>When goroutine parks, stack stays allocated (can shrink during GC)</ListItem>
        </List>

        <Heading>The Heap</Heading>
        <List>
          <ListItem>**Shared, GC-managed** memory for the whole process</ListItem>
          <ListItem>Contains: maps, channels, closures, escaped variables, `make` results</ListItem>
          <ListItem>GC traces from roots (globals + all goroutine stacks) to find live objects</ListItem>
          <ListItem>Allocation cost: fast (thread-local caches) but adds GC pressure</ListItem>
        </List>

        <Heading>Escape Analysis</Heading>
        <Paragraph>
          The compiler decides if a variable can stay on the stack or must "escape" to the heap:
        </Paragraph>

        <Code language="go">{`// ESCAPES: returning pointer to local
func bad() *int {
    x := 42
    return &x  // x must survive after bad() returns -> heap
}

// ESCAPES: captured by closure used later
func makeCounter() func() int {
    x := 0  // captured by returned closure -> heap
    return func() int {
        x++
        return x
    }
}

// Check with: go build -gcflags='-m=2' .
// Output: "moved to heap: x"`}</Code>

        <Heading>Type Storage</Heading>
        <List>
          <ListItem>**Slices**: header (ptr, len, cap) on stack; backing array often on heap</ListItem>
          <ListItem>**Maps/Channels**: small handle on stack; actual data structure on heap</ListItem>
          <ListItem>**Strings**: header on stack; bytes on heap (literals in read-only data)</ListItem>
          <ListItem>**Structs/Arrays**: stack if small and non-escaping; heap otherwise</ListItem>
        </List>

        <Heading>Performance Tips</Heading>
        <List>
          <ListItem>**Avoid unnecessary escaping**: don't return pointers to short-lived locals</ListItem>
          <ListItem>**Pre-size slices/maps**: reduces heap churn from repeated growing</ListItem>
          <ListItem>**Value receivers for small types**: pointer receivers can force heap allocation</ListItem>
          <ListItem>**sync.Pool**: reuse heap objects under pressure</ListItem>
          <ListItem>**Measure**: `go test -bench . -benchmem`, `pprof`, `-gcflags='-m=2'`</ListItem>
        </List>

        <Callout type="info" title="Heap Churn">
          "Heap churn" = lots of short-lived heap allocations and frees. Usually from repeatedly growing slices/maps or creating throwaway objects. Increases GC pressure significantly.
        </Callout>
      </Section>

      {/* Concurrency Patterns */}
      <Section title="Concurrency Patterns & Best Practices">
        <Heading>1. Keep APIs Concurrency-Free</Heading>
        <Paragraph>
          Never expose channels or mutexes in API types, functions, or methods. Concurrency is an implementation detail.
        </Paragraph>
        <Code language="go">{`// BAD: exposes channel
type BadAPI struct {
    Results chan int  // Don't export this!
}

// GOOD: hide concurrency
type GoodAPI struct {
    results chan int  // unexported
}

func (g *GoodAPI) GetResults() []int {
    // ... collect from internal channel and return
}`}</Code>

        <Heading>2. Goroutines & Loop Variables (Pre-1.22)</Heading>
        <Code language="go">{`// Before Go 1.22, this printed "20 20 20 20 20"
a := []int{2, 4, 6, 8, 10}
ch := make(chan int, len(a))

for _, v := range a {
    go func() { ch <- v * 2 }()  // All captured same v!
}

// Fixed in Go 1.22, but still be careful with closures
// that depend on variables that might change`}</Code>

        <Heading>3. Buffered Channels: Knowing the Count</Heading>
        <Code language="go">{`func processChannel(ch chan int) []int {
    const conc = 10
    results := make(chan int, conc)  // Know exactly how many
    
    for i := 0; i < conc; i++ {
        go func() {
            v := <-ch
            results <- process(v)
        }()
    }
    
    // Collect exactly conc results - no leaks
    out := make([]int, 0, conc)
    for i := 0; i < conc; i++ {
        out = append(out, <-results)
    }
    return out
}`}</Code>

        <Heading>4. Implementing Backpressure</Heading>
        <Paragraph>
          Backpressure limits work to prevent overload. Use buffered channel + select:
        </Paragraph>
        <Code language="go">{`type PressureGauge struct {
    ch chan struct{}
}

func New(limit int) *PressureGauge {
    return &PressureGauge{
        ch: make(chan struct{}, limit),  // limit tokens
    }
}

func (pg *PressureGauge) Process(f func()) error {
    select {
    case pg.ch <- struct{}{}:  // Try to acquire token
        defer func() { <-pg.ch }()  // Release on exit
        f()
        return nil
    default:
        return errors.New("no more capacity")  // Reject work
    }
}`}</Code>

        <Callout type="tip" title="Backpressure Pattern">
          The buffered channel holds "tokens". Each request tries to acquire one. If buffer is full (all tokens taken), the default case runs and returns an error instead of blocking.
        </Callout>
      </Section>

      {/* Channel Operation Flow */}
      <Section title="Channel Memory Flow Example">
        <Paragraph>
          Understanding what happens in memory when channels are used:
        </Paragraph>

        <Code language="go">{`func countTo(max int) <-chan int {
    ch := make(chan int)  // hchan allocated on HEAP
    go func() {
        for i := 0; i < max; i++ {
            ch <- i
        }
        close(ch)
    }()
    return ch  // Return descriptor (points to heap hchan)
}`}</Code>

        <Heading>Timeline</Heading>
        <List>
          <ListItem><strong>T0</strong>: main() calls countTo(10), frame pushed to main's stack</ListItem>
          <ListItem><strong>T1</strong>: make(chan int) creates hchan on heap. go func() creates producer goroutine with fresh stack. countTo returns ch (descriptor pointing to heap hchan)</ListItem>
          <ListItem><strong>T2</strong>: Producer goroutine runs. On unbuffered channel, ch sends block until receiver ready. Value passed directly (no extra heap allocation for int)</ListItem>
          <ListItem><strong>T3</strong>: After i == 9 sent, producer calls close(ch). Goroutine exits, stack reclaimed, no longer a GC root</ListItem>
          <ListItem><strong>T4</strong>: Main drains channel. Once ch unreachable, GC can free hchan</ListItem>
        </List>

        <Callout type="info" title="What Escapes?">
          The `hchan` (channel object) is always on the heap. The local `ch` variable (a small descriptor) escapes because it's captured by the closure AND returned. Compiler creates closure environment on heap holding `ch`.
        </Callout>
      </Section>

      {/* Why Parked Goroutines Leak */}
      <Section title="Why Parked Goroutines Leak Memory">
        <Paragraph>
          Live goroutine stacks are **GC roots**. Anything reachable from a parked goroutine's stack cannot be collected.
        </Paragraph>

        <Code language="go">{`func leaky() {
    ch := make(chan int)  // hchan on heap
    go func() {
        v := <-ch  // Blocks forever if nothing writes
        fmt.Println(v)
    }()
    // If we never write to ch, goroutine is parked forever
    // Its stack roots the channel, preventing GC
}`}</Code>

        <Callout type="warning" title="The Leak">
          Even though the parked goroutine does nothing, it roots memory: its stack, the closure environment, the channel. All permanently unreclaimable.
        </Callout>
      </Section>
    </div>
  );
};
