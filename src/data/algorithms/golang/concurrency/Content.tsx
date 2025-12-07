import { QuizQuestion } from "@/components/Quiz";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fundamentals } from "./sections/Fundamentals";
import { Channels } from "./sections/Channels";
import { Select } from "./sections/Select";
import { GoroutineLeaks } from "./sections/GoroutineLeaks";
import { Memory } from "./sections/Memory";
import { Patterns } from "./sections/Patterns";

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
  { question: "What happens when you read from a closed channel?", options: ["It panics", "It blocks forever", "It returns the zero value immediately (with ok=false)", "It returns an error"], correctIndex: 2, explanation: "Reading from a closed channel returns the zero value immediately with ok=false. This is why closed channels in select statements keep getting selected." },
  { question: "How can you disable a case in a select statement at runtime?", options: ["Use a boolean flag to skip the case", "Set the channel to nil - nil channels never succeed in select", "Close the channel", "Use a default case"], correctIndex: 1, explanation: "Setting a channel to nil disables its select case because nil channels block forever. A closed channel keeps succeeding with zero values." },
  { question: "In a fan-in pattern merging two channels, why set a channel to nil after it closes instead of breaking?", options: ["To save memory", "So the select continues processing the other channel until it also closes", "To prevent panics", "It's just a style preference"], correctIndex: 1, explanation: "Setting the closed channel to nil disables that case, allowing the select to continue processing the remaining open channel until both are done." },
  { question: "Why must the result channel be buffered in a timeout wrapper function?", options: ["Unbuffered channels are slower", "So the worker goroutine can complete and send even if we've already timed out", "Buffered channels use less memory", "The select statement requires buffered channels"], correctIndex: 1, explanation: "If we timeout and stop reading, the worker still completes and tries to send. Without a buffer, it blocks forever → goroutine leak." },
  { question: "What error does ctx.Err() return when a context times out?", options: ["context.Canceled", "context.DeadlineExceeded", "context.TimedOut", "io.EOF"], correctIndex: 1, explanation: "context.DeadlineExceeded is returned when the context's deadline passes. context.Canceled is returned when cancel() is called manually." },
  { question: "When should you use context.WithDeadline instead of context.WithTimeout?", options: ["When you need microsecond precision", "When you have a fixed absolute time to meet rather than a duration from now", "When the timeout is longer than 1 hour", "WithDeadline is deprecated, always use WithTimeout"], correctIndex: 1, explanation: "WithDeadline takes an absolute time.Time, useful when you must complete by a specific moment. WithTimeout takes a duration from now." },
  { question: "What are the three main methods of sync.WaitGroup?", options: ["Start, Stop, Wait", "Add, Done, Wait", "Begin, End, Block", "Inc, Dec, Sync"], correctIndex: 1, explanation: "Add increments the counter, Done decrements it (typically deferred), and Wait blocks until the counter reaches zero." },
  { question: "Why should wg.Done() always be called with defer?", options: ["It's faster when deferred", "To ensure it runs even if the goroutine panics or returns early", "Go requires it to be deferred", "It only works inside a defer statement"], correctIndex: 1, explanation: "Using defer wg.Done() ensures the counter is decremented no matter how the goroutine exits - normal return, early return, or panic." },
  { question: "In the processAndGather pattern, why is there a separate 'monitoring' goroutine that calls wg.Wait() and close(out)?", options: ["To improve performance", "So the main goroutine can start collecting results while workers are still running", "WaitGroup can only be used from a separate goroutine", "To prevent deadlocks"], correctIndex: 1, explanation: "The monitoring goroutine waits for workers and closes the output channel. This lets the main goroutine range over results without deadlock - it doesn't block on Wait." },
  { question: "When should you prefer counting with a buffered channel over using WaitGroup?", options: ["When you have more than 10 goroutines", "When you just need to collect a known number of results without cleanup", "When using unbuffered channels", "WaitGroup is always preferred"], correctIndex: 1, explanation: "If you know exactly how many results to expect and don't need to close a shared channel, counting reads from a buffered channel is simpler than WaitGroup." },
];

export const Content = () => {
  return (
    <Tabs defaultValue="fundamentals" className="w-full">
      <TabsList className="grid w-full grid-cols-6 mb-6">
        <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
        <TabsTrigger value="channels">Channels</TabsTrigger>
        <TabsTrigger value="select">Select</TabsTrigger>
        <TabsTrigger value="leaks">Leaks</TabsTrigger>
        <TabsTrigger value="memory">Memory</TabsTrigger>
        <TabsTrigger value="patterns">Patterns</TabsTrigger>
      </TabsList>
      <TabsContent value="fundamentals">
        <Fundamentals />
      </TabsContent>
      <TabsContent value="channels">
        <Channels />
      </TabsContent>
      <TabsContent value="select">
        <Select />
      </TabsContent>
      <TabsContent value="leaks">
        <GoroutineLeaks />
      </TabsContent>
      <TabsContent value="memory">
        <Memory />
      </TabsContent>
      <TabsContent value="patterns">
        <Patterns />
      </TabsContent>
    </Tabs>
  );
};
