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

export const Patterns = () => (
  <>
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

      <Heading>5. Using WaitGroups</Heading>
      <Paragraph>
        Use `sync.WaitGroup` to wait for multiple goroutines to complete. Add increments the counter, Done decrements it, and Wait blocks until zero.
      </Paragraph>
      <Code language="go">{`func main() {
    var wg sync.WaitGroup
    wg.Add(3)
    
    go func() {
        defer wg.Done()  // Always defer to ensure it runs
        doThing1()
    }()
    go func() {
        defer wg.Done()
        doThing2()
    }()
    go func() {
        defer wg.Done()
        doThing3()
    }()
    
    wg.Wait()  // Blocks until all three complete
}`}</Code>

      <Callout type="tip" title="Closure Captures WaitGroup">
        The closure captures the WaitGroup variable. This is safe because we're using the same WaitGroup instance. The closure handles concurrency bookkeeping while the called function provides the algorithm.
      </Callout>

      <Paragraph>
        A more realistic example - processing items and gathering results:
      </Paragraph>
      <Code language="go">{`func processAndGather[T, R any](
    in <-chan T, 
    processor func(T) R, 
    num int,
) []R {
    out := make(chan R, num)
    var wg sync.WaitGroup
    wg.Add(num)
    
    // Launch worker goroutines
    for i := 0; i < num; i++ {
        go func() {
            defer wg.Done()
            for v := range in {
                out <- processor(v)
            }
        }()
    }
    
    // Monitoring goroutine - closes out when all workers done
    go func() {
        wg.Wait()
        close(out)
    }()
    
    // Collect results (exits when out is closed and empty)
    var result []R
    for v := range out {
        result = append(result, v)
    }
    return result
}`}</Code>

      <Callout type="warning" title="When to Use WaitGroups">
        WaitGroups shouldn't be your first choice. Use them when you have cleanup to do after all goroutines exit - like closing a channel they all write to. If you just need to collect results, counting with a buffered channel is simpler.
      </Callout>
    </Section>
  </>
);
