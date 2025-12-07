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

export const Memory = () => (
  <>
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
  </>
);
