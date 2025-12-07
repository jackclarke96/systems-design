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

export const Select = () => (
  <>
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

    <Section title="Disabling Select Cases with Nil">
      <Paragraph>
        A closed channel **always succeeds** when read, returning the zero value. This means it keeps getting selected. A **nil channel** blocks forever on both read and write - we can use this to disable a case.
      </Paragraph>

      <Callout type="info" title="Nil Channel Behavior">
        Reading from or writing to a `nil` channel hangs forever. This seems like a footgun, but it's actually useful for disabling select cases dynamically.
      </Callout>

      <Heading>Pattern: Disable on Close</Heading>
      <Code language="go">{`// Read from two channels until both are closed
func mergeChannels(in1, in2 <-chan int) <-chan int {
    out := make(chan int)
    
    go func() {
        defer close(out)
        
        for count := 0; count < 2; {
            select {
            case v, ok := <-in1:
                if !ok {
                    in1 = nil  // Disable this case!
                    count++
                    continue
                }
                out <- v
            case v, ok := <-in2:
                if !ok {
                    in2 = nil  // Disable this case!
                    count++
                    continue
                }
                out <- v
            }
        }
    }()
    
    return out
}`}</Code>

      <Heading>Why This Works</Heading>
      <List>
        <ListItem>When `in1` closes, `ok` is `false` and we set `in1 = nil`</ListItem>
        <ListItem>A nil channel **never succeeds** in a select - case is permanently disabled</ListItem>
        <ListItem>Select continues checking only the non-nil channel</ListItem>
        <ListItem>When both are nil, we've processed both closures and can exit</ListItem>
      </List>

      <Callout type="tip" title="Common Use Cases">
        Use the nil-channel pattern when merging multiple input channels, implementing fan-in, or when you need to dynamically enable/disable channel operations based on runtime conditions.
      </Callout>

      <Heading>Contrast: Closed vs Nil</Heading>
      <Code language="go">{`// Closed channel: always returns immediately with zero value
closedCh := make(chan int)
close(closedCh)
v := <-closedCh  // Returns 0, ok=false, INSTANTLY

// Nil channel: blocks forever
var nilCh chan int  // nil by default
v := <-nilCh        // HANGS FOREVER

// In select: closed = always chosen; nil = never chosen`}</Code>
    </Section>

    <Section title="Timeouts with Context">
      <Paragraph>
        Use `context.WithTimeout` to limit how long an operation can run. When the timeout is reached, the context is automatically cancelled.
      </Paragraph>

      <Heading>Basic Timeout Pattern</Heading>
      <Code language="go">{`func doWorkWithTimeout() error {
    // Create context that auto-cancels after 2 seconds
    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel()  // Always call cancel to release resources
    
    resultCh := make(chan Result, 1)
    
    go func() {
        resultCh <- doExpensiveWork()
    }()
    
    select {
    case result := <-resultCh:
        return processResult(result)
    case <-ctx.Done():
        return ctx.Err()  // context.DeadlineExceeded
    }
}`}</Code>

      <Heading>Generic Timeout Wrapper</Heading>
      <Paragraph>
        A reusable function that runs any worker with a timeout:
      </Paragraph>
      <Code language="go">{`func withTimeout[T any](worker func() T, limit time.Duration) (T, error) {
    var zero T
    
    ctx, cancel := context.WithTimeout(context.Background(), limit)
    defer cancel()
    
    resultCh := make(chan T, 1)  // Buffered: worker can complete even if we timeout
    
    go func() {
        resultCh <- worker()
    }()
    
    select {
    case result := <-resultCh:
        return result, nil
    case <-ctx.Done():
        return zero, ctx.Err()
    }
}

// Usage
result, err := withTimeout(func() int {
    time.Sleep(100 * time.Millisecond)
    return 42
}, 1*time.Second)

if errors.Is(err, context.DeadlineExceeded) {
    fmt.Println("operation timed out")
}`}</Code>

      <Callout type="warning" title="Buffered Channel Matters">
        The result channel must be buffered (capacity 1). If we timeout and stop reading, the worker goroutine still completes and tries to send. Without a buffer, it would block forever → goroutine leak.
      </Callout>

      <Heading>Timeout vs Deadline vs Cancel</Heading>
      <Code language="go">{`// Timeout: cancel after duration
ctx, cancel := context.WithTimeout(parent, 5*time.Second)

// Deadline: cancel at specific time
ctx, cancel := context.WithDeadline(parent, time.Now().Add(5*time.Second))

// Manual cancel only (no auto-cancel)
ctx, cancel := context.WithCancel(parent)

// All three: ALWAYS defer cancel() to release resources`}</Code>

      <List>
        <ListItem>**WithTimeout**: Duration from now - most common for API calls, DB queries</ListItem>
        <ListItem>**WithDeadline**: Absolute time - useful when you have a fixed deadline to meet</ListItem>
        <ListItem>**WithCancel**: Manual only - for user-initiated cancellation, shutdown signals</ListItem>
      </List>

      <Callout type="info" title="Context Propagation">
        Pass the context to any functions that support it (HTTP clients, DB queries, etc.). They'll automatically respect the timeout and cancel their work.
      </Callout>
    </Section>
  </>
);
