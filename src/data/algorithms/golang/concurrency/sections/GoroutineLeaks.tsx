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

export const GoroutineLeaks = () => (
  <>
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
  </>
);
