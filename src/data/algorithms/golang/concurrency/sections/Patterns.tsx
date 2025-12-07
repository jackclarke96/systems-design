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

      <Heading>6. Running Code Exactly Once with sync.Once</Heading>
      <Paragraph>
        Sometimes you want to lazy load or call initialization code exactly once after program launch. This is useful when initialization is slow and may not even be needed. The sync package provides `sync.Once` for this.
      </Paragraph>
      <Code language="go">{`type SlowComplicatedParser interface {
    Parse(string) string
}

func initParser() SlowComplicatedParser {
    // do all sorts of expensive setup...
    return &myParser{}
}

var parser SlowComplicatedParser
var once sync.Once

func Parse(dataToParse string) string {
    once.Do(func() {
        parser = initParser()  // Only runs once, ever
    })
    return parser.Parse(dataToParse)
}`}</Code>

      <Callout type="tip" title="sync.Once Guarantees">
        `sync.Once` ensures the function passed to `Do()` executes exactly once, even if called from multiple goroutines simultaneously. All other callers block until the first execution completes, then proceed without running the function again.
      </Callout>

      <Paragraph>
        Common use cases for `sync.Once`:
      </Paragraph>
      <List>
        <ListItem><strong>Lazy initialization</strong> - defer expensive setup until first use</ListItem>
        <ListItem><strong>Singleton patterns</strong> - ensure only one instance of a resource</ListItem>
        <ListItem><strong>One-time configuration</strong> - load config files or establish connections</ListItem>
      </List>

      <Code language="go">{`// Database connection example
var db *sql.DB
var dbOnce sync.Once

func GetDB() *sql.DB {
    dbOnce.Do(func() {
        var err error
        db, err = sql.Open("postgres", connString)
        if err != nil {
            log.Fatal(err)  // Handle error appropriately
        }
    })
    return db
}`}</Code>

      <Callout type="warning" title="Error Handling with sync.Once">
        If the function passed to `Do()` panics or fails, it still counts as "done" - subsequent calls won't retry. For initialization that might fail, consider using `sync.OnceValue` (Go 1.21+) or handle errors within the Once block.
      </Callout>

      <Heading>7. When to Use Mutexes</Heading>
      <Paragraph>
        Mutexes obscure the flow of data through a program. When data is passed from goroutine to goroutine over a series of channels, data flow is clear and access is localized to a single goroutine at a time. When a mutex is used to protect a value, there's nothing to indicate which goroutine currently has ownership - access is shared by all concurrent processes.
      </Paragraph>

      <Callout type="tip" title="Channels vs Mutexes">
        Use a **channel** when coordinating goroutines or tracking a value as it's transformed by a series of goroutines. Use a **mutex** when sharing access to a field in a struct.
      </Callout>

      <Paragraph>
        Here's a scoreboard example using `sync.RWMutex`:
      </Paragraph>
      <Code language="go">{`type MutexScoreboardManager struct {
    l          sync.RWMutex
    scoreboard map[string]int
}

func NewMutexScoreboardManager() *MutexScoreboardManager {
    return &MutexScoreboardManager{
        scoreboard: map[string]int{},
    }
}

func (msm *MutexScoreboardManager) Update(name string, val int) {
    msm.l.Lock()         // Exclusive write lock
    defer msm.l.Unlock()
    msm.scoreboard[name] = val
}

func (msm *MutexScoreboardManager) Read(name string) (int, bool) {
    msm.l.RLock()        // Shared read lock
    defer msm.l.RUnlock()
    val, ok := msm.scoreboard[name]
    return val, ok
}`}</Code>

      <Heading>Why RWMutex Instead of Channels Here?</Heading>
      <Paragraph>
        If we used channels, only one reader could read at a time. With `RWMutex`, only one writer can write at a time, but the read lock is shared - many goroutines can read simultaneously.
      </Paragraph>

      <List>
        <ListItem><strong>Channels</strong>: Each value sent goes to exactly one receiver. Great for work queues, but reads are effectively serialized through whoever owns the data.</ListItem>
        <ListItem><strong>RWMutex</strong>: `Lock()`/`Unlock()` is exclusive (one writer). `RLock()`/`RUnlock()` is shared (many concurrent readers).</ListItem>
      </List>

      <Code language="go">{`// Channel approach - reads are serialized
// One goroutine owns the map, others send requests on a channel
// Requests handled one-by-one → serialized reads

// RWMutex approach - parallel reads
var (
    mu     sync.RWMutex
    config map[string]string
)

func Get(key string) string {
    mu.RLock()
    defer mu.RUnlock()
    return config[key]  // 100 goroutines can read simultaneously
}

func Set(key, val string) {
    mu.Lock()
    defer mu.Unlock()
    config[key] = val   // Exclusive - waits for readers, blocks new ones
}`}</Code>

      <Callout type="info" title="When RWMutex Shines">
        Use RWMutex when data is read much more often than written: cached config, in-memory indexes, routing tables. You get high throughput reads without building complex message-passing or fan-out systems.
      </Callout>

      <Paragraph>
        Summary of when to use each:
      </Paragraph>
      <List>
        <ListItem><strong>Channels</strong>: Model tasks, events, or pipelines (things consumed once). Clear data ownership through owner goroutine.</ListItem>
        <ListItem><strong>Mutexes</strong>: High-volume reads of shared in-memory state. Many readers at once, writes are exclusive but brief.</ListItem>
      </List>
    </Section>
  </>
);
