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

export const Channels = () => (
  <>
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
  </>
);
