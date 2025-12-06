import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Quiz } from "@/components/Quiz";
import { TrendingUp, Database, Zap, Shield, Clock, Layers, ArrowRightLeft, BarChart3 } from "lucide-react";

const SectionHeader = ({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ElementType }) => (
  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
    {Icon && <Icon className="h-6 w-6 text-primary" />}
    {children}
  </h2>
);

const FlowStep = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <div className="flex-1">
      <h4 className="font-semibold mb-1">{title}</h4>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  </div>
);

const PropertyCard = ({ title, achieved, icon: Icon }: { title: string; achieved: string; icon: React.ElementType }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-base flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{achieved}</p>
    </CardContent>
  </Card>
);

export const Content = () => {
  const [activeTab, setActiveTab] = useState("learn");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="learn">Learn</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="learn" className="space-y-8 mt-6">
          {/* Overview */}
          <section>
            <SectionHeader icon={TrendingUp}>Stock Exchange System</SectionHeader>
            <p className="text-muted-foreground mb-4">
              A stock exchange matches buy and sell orders, maintains order books, disseminates market data, 
              and coordinates clearing/settlement. The core challenge is <strong>ultra-low latency</strong> matching 
              with <strong>strict fairness</strong> (price-time priority) and <strong>no data loss</strong>.
            </p>

            <div className="grid md:grid-cols-4 gap-3">
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="pt-4 text-center">
                  <Zap className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold text-sm">Matching Engine</p>
                  <p className="text-xs text-muted-foreground">Price-time priority</p>
                </CardContent>
              </Card>
              <Card className="border-blue-500/30 bg-blue-500/5">
                <CardContent className="pt-4 text-center">
                  <Layers className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <p className="font-semibold text-sm">Order Book</p>
                  <p className="text-xs text-muted-foreground">Bids & asks per symbol</p>
                </CardContent>
              </Card>
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="pt-4 text-center">
                  <BarChart3 className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <p className="font-semibold text-sm">Market Data</p>
                  <p className="text-xs text-muted-foreground">Real-time quotes & trades</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/30 bg-orange-500/5">
                <CardContent className="pt-4 text-center">
                  <ArrowRightLeft className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                  <p className="font-semibold text-sm">Clearing</p>
                  <p className="text-xs text-muted-foreground">Settlement & positions</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Core Components */}
          <section>
            <SectionHeader icon={Database}>Core Components</SectionHeader>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Gateway / Order Router</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>Entry point for all orders from brokers/participants.</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>Authentication:</strong> Verify participant credentials, session management</li>
                    <li><strong>Validation:</strong> Symbol exists, price within limits, quantity valid</li>
                    <li><strong>Rate limiting:</strong> Per-participant message rate limits</li>
                    <li><strong>Sequencing:</strong> Assign gateway sequence number for ordering</li>
                    <li><strong>Routing:</strong> Forward to correct matching engine partition by symbol</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Matching Engine</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>The heart of the exchange — matches buy and sell orders.</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>Single-threaded per symbol:</strong> Deterministic, no locks, maximum throughput</li>
                    <li><strong>Price-time priority:</strong> Best price first, then earliest order at that price</li>
                    <li><strong>Order book:</strong> In-memory sorted structure (bids descending, asks ascending)</li>
                    <li><strong>Match loop:</strong> For each incoming order, match against resting orders until filled or no match</li>
                    <li><strong>Event output:</strong> Emit OrderAccepted, Trade, OrderCancelled events</li>
                  </ul>
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs font-medium mb-1">Latency target:</p>
                    <p className="text-xs text-muted-foreground">Sub-microsecond matching for simple orders. Total round-trip (gateway → match → ack) often &lt;100μs for colocated participants.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Order Book Data Structure</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-2">Bids (Buy Orders)</p>
                      <div className="bg-green-500/10 rounded p-3 text-xs font-mono space-y-1">
                        <div className="flex justify-between"><span>$150.05</span><span>500 shares</span></div>
                        <div className="flex justify-between"><span>$150.04</span><span>1,200 shares</span></div>
                        <div className="flex justify-between"><span>$150.03</span><span>800 shares</span></div>
                        <div className="flex justify-between text-muted-foreground"><span>$150.02</span><span>2,000 shares</span></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Sorted descending (best bid at top)</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Asks (Sell Orders)</p>
                      <div className="bg-red-500/10 rounded p-3 text-xs font-mono space-y-1">
                        <div className="flex justify-between"><span>$150.06</span><span>300 shares</span></div>
                        <div className="flex justify-between"><span>$150.07</span><span>750 shares</span></div>
                        <div className="flex justify-between"><span>$150.08</span><span>1,100 shares</span></div>
                        <div className="flex justify-between text-muted-foreground"><span>$150.10</span><span>500 shares</span></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Sorted ascending (best ask at top)</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    <strong>Spread:</strong> $150.06 - $150.05 = $0.01. A market buy would match at $150.06.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Market Data Publisher</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>Disseminates real-time data to all participants.</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>Trade feed:</strong> Every executed trade (price, quantity, timestamp)</li>
                    <li><strong>Quote feed:</strong> Best bid/ask updates (top of book)</li>
                    <li><strong>Depth feed:</strong> Full order book (top N levels or all)</li>
                    <li><strong>Multicast:</strong> UDP multicast for lowest latency to colocated clients</li>
                    <li><strong>Sequence numbers:</strong> For gap detection and recovery</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Clearing & Settlement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>Post-trade processing to finalize ownership transfer.</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>Trade capture:</strong> Record all trades from matching engine</li>
                    <li><strong>Netting:</strong> Aggregate trades per participant to reduce settlements</li>
                    <li><strong>Risk checks:</strong> Margin requirements, position limits</li>
                    <li><strong>Settlement:</strong> T+1 or T+2 delivery of securities and cash</li>
                    <li><strong>Central counterparty (CCP):</strong> Clearinghouse becomes buyer to every seller</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Flows */}
          <section>
            <SectionHeader icon={ArrowRightLeft}>Key Flows</SectionHeader>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Flow 1: Place Limit Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FlowStep number={1} title="Gateway receives order">
                    Participant sends: symbol=AAPL, side=BUY, qty=100, price=$150.05, order_id=uuid
                  </FlowStep>
                  <FlowStep number={2} title="Validation & sequencing">
                    Validate credentials, symbol, price limits. Assign gateway_seq_no. Route to AAPL matching engine.
                  </FlowStep>
                  <FlowStep number={3} title="Matching engine processes">
                    <ul className="list-disc list-inside mt-1">
                      <li>Check asks: best ask is $150.06 → no match (buy price too low)</li>
                      <li>Add order to bid side of book at $150.05</li>
                      <li>Emit <code className="bg-muted px-1 rounded">OrderAccepted</code> event</li>
                    </ul>
                  </FlowStep>
                  <FlowStep number={4} title="Ack to participant">
                    Gateway sends order acknowledgment with exchange_order_id and timestamp.
                  </FlowStep>
                  <FlowStep number={5} title="Market data update">
                    If best bid changed, publish new quote to market data feed.
                  </FlowStep>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Flow 2: Market Order Match</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FlowStep number={1} title="Market sell order arrives">
                    Participant sends: symbol=AAPL, side=SELL, qty=100, type=MARKET
                  </FlowStep>
                  <FlowStep number={2} title="Matching engine matches">
                    <ul className="list-disc list-inside mt-1">
                      <li>Best bid is $150.05 with 500 shares resting</li>
                      <li>Match 100 shares at $150.05</li>
                      <li>Reduce resting bid to 400 shares</li>
                      <li>Emit <code className="bg-muted px-1 rounded">Trade</code> event: buyer_id, seller_id, price=$150.05, qty=100</li>
                    </ul>
                  </FlowStep>
                  <FlowStep number={3} title="Execution reports">
                    Both buyer and seller receive fill notifications with trade details.
                  </FlowStep>
                  <FlowStep number={4} title="Market data & clearing">
                    Trade published to trade feed. Trade sent to clearing for settlement.
                  </FlowStep>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Flow 3: Cancel Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FlowStep number={1} title="Cancel request">
                    Participant sends: cancel order_id=xyz
                  </FlowStep>
                  <FlowStep number={2} title="Matching engine removes">
                    Locate order in book, remove it, emit <code className="bg-muted px-1 rounded">OrderCancelled</code> event.
                  </FlowStep>
                  <FlowStep number={3} title="Ack & market data">
                    Cancel confirmation to participant. Update market data if top of book changed.
                  </FlowStep>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Order Types */}
          <section>
            <SectionHeader icon={Layers}>Order Types</SectionHeader>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Limit Order</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Buy/sell at specified price or better. Rests in book if not immediately matched.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Market Order</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Execute immediately at best available price. No price specified.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">IOC (Immediate or Cancel)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Fill what you can immediately, cancel the rest. No resting.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">FOK (Fill or Kill)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Fill entire quantity immediately or cancel entire order.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">GTC (Good Till Cancelled)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Remains active until filled or explicitly cancelled.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Stop Order</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Becomes market/limit order when stop price is reached (trigger price).
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Latency & Performance */}
          <section>
            <SectionHeader icon={Clock}>Latency & Performance</SectionHeader>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Why Single-Threaded?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>No locks:</strong> Lock contention is the enemy of low latency</li>
                    <li><strong>Deterministic:</strong> Same input → same output (easier testing, replay)</li>
                    <li><strong>Cache-friendly:</strong> Hot data stays in L1/L2 cache</li>
                    <li><strong>Simpler:</strong> No race conditions, no deadlocks</li>
                  </ul>
                  <p className="text-xs mt-2">Scale by partitioning: one matching engine per symbol (or symbol group).</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Performance Techniques</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>Kernel bypass:</strong> DPDK, RDMA for network I/O</li>
                    <li><strong>Lock-free queues:</strong> Between gateway and matching engine</li>
                    <li><strong>Memory-mapped files:</strong> For journaling without syscalls</li>
                    <li><strong>Pre-allocated memory:</strong> No GC pauses, no malloc in hot path</li>
                    <li><strong>CPU pinning:</strong> Dedicated cores, no context switches</li>
                    <li><strong>Colocation:</strong> Participants in same data center</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Typical Latency Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-2">Component</th>
                        <th className="text-left p-2">Latency</th>
                        <th className="text-left p-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="p-2">Network (colocated)</td>
                        <td className="p-2">~1-5 μs</td>
                        <td className="p-2 text-muted-foreground">Switch + NIC</td>
                      </tr>
                      <tr>
                        <td className="p-2">Gateway processing</td>
                        <td className="p-2">~5-20 μs</td>
                        <td className="p-2 text-muted-foreground">Validation, routing</td>
                      </tr>
                      <tr>
                        <td className="p-2">Matching engine</td>
                        <td className="p-2">&lt;1 μs</td>
                        <td className="p-2 text-muted-foreground">Core matching logic</td>
                      </tr>
                      <tr>
                        <td className="p-2">Journaling</td>
                        <td className="p-2">~1-10 μs</td>
                        <td className="p-2 text-muted-foreground">Persist before ack</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Total round-trip</td>
                        <td className="p-2 font-medium">~10-50 μs</td>
                        <td className="p-2 text-muted-foreground">Order → ack</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Fault Tolerance */}
          <section>
            <SectionHeader icon={Shield}>Fault Tolerance & Recovery</SectionHeader>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Journaling</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Every order/event written to append-only journal before processing</li>
                    <li>On crash: replay journal to rebuild order book state</li>
                    <li>Synchronous write (fsync) for durability guarantee</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Replication</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Primary-backup for matching engine</li>
                    <li>Backup receives same input stream, maintains shadow order book</li>
                    <li>On primary failure: backup takes over with same state</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Sequence Numbers</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Every message has sequence number</li>
                    <li>Gap detection: if seq 42 missing, request retransmit</li>
                    <li>Ensures no lost or duplicate messages</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Market Data Recovery</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Snapshot service: periodic full order book snapshots</li>
                    <li>Client missed messages: request snapshot + apply incremental updates</li>
                    <li>Sequence numbers for gap detection in feeds</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Properties */}
          <section>
            <SectionHeader icon={Shield}>Key Properties</SectionHeader>

            <div className="grid md:grid-cols-2 gap-4">
              <PropertyCard
                icon={Zap}
                title="1. Price-Time Priority (Fairness)"
                achieved="Matching engine processes orders in sequence order. At same price, earlier orders match first. Single-threaded = deterministic."
              />
              <PropertyCard
                icon={Shield}
                title="2. No Lost Orders"
                achieved="Journal-first: every order persisted before ack. On crash, replay journal. Sequence numbers detect gaps."
              />
              <PropertyCard
                icon={Clock}
                title="3. Ultra-Low Latency"
                achieved="Single-threaded, in-memory order book, kernel bypass networking, pre-allocated memory, CPU pinning."
              />
              <PropertyCard
                icon={Database}
                title="4. Consistency (Order Book = Truth)"
                achieved="All state derived from input stream. Replay same inputs → same order book. Primary-backup replication."
              />
              <PropertyCard
                icon={BarChart3}
                title="5. Fair Market Data Distribution"
                achieved="Multicast to all participants simultaneously. Sequence numbers for gap detection and recovery."
              />
              <PropertyCard
                icon={ArrowRightLeft}
                title="6. Trade Integrity"
                achieved="Every trade captured, sent to clearing. Netting reduces settlement volume. CCP guarantees settlement."
              />
            </div>
          </section>

          {/* Interview Tips */}
          <section>
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  💬 Interview Talking Points
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p><strong>On matching:</strong> "Single-threaded per symbol ensures price-time priority without locks. We scale by partitioning symbols across matching engines."</p>
                <p><strong>On latency:</strong> "The matching loop itself is sub-microsecond. Total latency is dominated by network and journaling. We use kernel bypass and memory-mapped files."</p>
                <p><strong>On durability:</strong> "We journal-first: every order is persisted before acknowledgment. On crash, we replay the journal to rebuild exact order book state."</p>
                <p><strong>On market data:</strong> "We multicast to ensure all participants receive data simultaneously — fairness is critical. Sequence numbers enable gap detection."</p>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="schema" className="space-y-6 mt-6">
          <SectionHeader icon={Database}>Data Model</SectionHeader>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">orders</CardTitle>
              <p className="text-sm text-muted-foreground">All orders received by the exchange</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-2">Column</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr><td className="p-2 font-mono">order_id</td><td className="p-2">UUID PK</td><td className="p-2 text-muted-foreground">Exchange-assigned order ID</td></tr>
                    <tr><td className="p-2 font-mono">client_order_id</td><td className="p-2">VARCHAR</td><td className="p-2 text-muted-foreground">Participant's order reference</td></tr>
                    <tr><td className="p-2 font-mono">participant_id</td><td className="p-2">UUID FK</td><td className="p-2 text-muted-foreground">Broker/firm submitting order</td></tr>
                    <tr><td className="p-2 font-mono">symbol</td><td className="p-2">VARCHAR</td><td className="p-2 text-muted-foreground">Instrument (e.g., AAPL)</td></tr>
                    <tr><td className="p-2 font-mono">side</td><td className="p-2">ENUM</td><td className="p-2 text-muted-foreground">BUY | SELL</td></tr>
                    <tr><td className="p-2 font-mono">order_type</td><td className="p-2">ENUM</td><td className="p-2 text-muted-foreground">LIMIT | MARKET | STOP | ...</td></tr>
                    <tr><td className="p-2 font-mono">price</td><td className="p-2">DECIMAL</td><td className="p-2 text-muted-foreground">Limit price (null for market)</td></tr>
                    <tr><td className="p-2 font-mono">quantity</td><td className="p-2">INT</td><td className="p-2 text-muted-foreground">Order quantity</td></tr>
                    <tr><td className="p-2 font-mono">filled_qty</td><td className="p-2">INT</td><td className="p-2 text-muted-foreground">Quantity filled so far</td></tr>
                    <tr><td className="p-2 font-mono">status</td><td className="p-2">ENUM</td><td className="p-2 text-muted-foreground">NEW | PARTIAL | FILLED | CANCELLED</td></tr>
                    <tr><td className="p-2 font-mono">time_in_force</td><td className="p-2">ENUM</td><td className="p-2 text-muted-foreground">DAY | GTC | IOC | FOK</td></tr>
                    <tr><td className="p-2 font-mono">gateway_seq_no</td><td className="p-2">BIGINT</td><td className="p-2 text-muted-foreground">Sequence at gateway (ordering)</td></tr>
                    <tr><td className="p-2 font-mono">received_at</td><td className="p-2">TIMESTAMP</td><td className="p-2 text-muted-foreground">Nanosecond precision</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">trades</CardTitle>
              <p className="text-sm text-muted-foreground">All executed trades</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-2">Column</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr><td className="p-2 font-mono">trade_id</td><td className="p-2">UUID PK</td><td className="p-2 text-muted-foreground">Unique trade ID</td></tr>
                    <tr><td className="p-2 font-mono">symbol</td><td className="p-2">VARCHAR</td><td className="p-2 text-muted-foreground">Traded instrument</td></tr>
                    <tr><td className="p-2 font-mono">buy_order_id</td><td className="p-2">UUID FK</td><td className="p-2 text-muted-foreground">Buyer's order</td></tr>
                    <tr><td className="p-2 font-mono">sell_order_id</td><td className="p-2">UUID FK</td><td className="p-2 text-muted-foreground">Seller's order</td></tr>
                    <tr><td className="p-2 font-mono">buyer_id</td><td className="p-2">UUID FK</td><td className="p-2 text-muted-foreground">Buyer participant</td></tr>
                    <tr><td className="p-2 font-mono">seller_id</td><td className="p-2">UUID FK</td><td className="p-2 text-muted-foreground">Seller participant</td></tr>
                    <tr><td className="p-2 font-mono">price</td><td className="p-2">DECIMAL</td><td className="p-2 text-muted-foreground">Execution price</td></tr>
                    <tr><td className="p-2 font-mono">quantity</td><td className="p-2">INT</td><td className="p-2 text-muted-foreground">Traded quantity</td></tr>
                    <tr><td className="p-2 font-mono">trade_seq_no</td><td className="p-2">BIGINT</td><td className="p-2 text-muted-foreground">Sequence for market data</td></tr>
                    <tr><td className="p-2 font-mono">executed_at</td><td className="p-2">TIMESTAMP</td><td className="p-2 text-muted-foreground">Nanosecond precision</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">order_book (in-memory)</CardTitle>
              <p className="text-sm text-muted-foreground">Live order book maintained by matching engine</p>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <p className="text-muted-foreground">Not persisted as a table — rebuilt from journal on startup.</p>
                <div className="bg-muted/30 p-3 rounded font-mono text-xs">
                  <p>// Per symbol, in matching engine memory:</p>
                  <p>bids: SortedMap&lt;Price, Queue&lt;Order&gt;&gt;  // descending by price</p>
                  <p>asks: SortedMap&lt;Price, Queue&lt;Order&gt;&gt;  // ascending by price</p>
                  <p>orders: Map&lt;OrderId, Order&gt;  // for O(1) cancel lookup</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">journal</CardTitle>
              <p className="text-sm text-muted-foreground">Append-only event log for recovery</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-2">Column</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr><td className="p-2 font-mono">seq_no</td><td className="p-2">BIGINT PK</td><td className="p-2 text-muted-foreground">Monotonic sequence</td></tr>
                    <tr><td className="p-2 font-mono">event_type</td><td className="p-2">ENUM</td><td className="p-2 text-muted-foreground">ORDER_NEW | ORDER_CANCEL | TRADE | ...</td></tr>
                    <tr><td className="p-2 font-mono">payload</td><td className="p-2">BYTES</td><td className="p-2 text-muted-foreground">Serialized event data</td></tr>
                    <tr><td className="p-2 font-mono">timestamp</td><td className="p-2">TIMESTAMP</td><td className="p-2 text-muted-foreground">Event time (nanoseconds)</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="mt-6">
          <StockExchangeQuiz />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const quizQuestions = [
  {
    question: "Why is the matching engine typically single-threaded per symbol?",
    options: [
      "To reduce memory usage",
      "To ensure deterministic price-time priority without locks",
      "Because modern CPUs only have one core",
      "To simplify the user interface"
    ],
    correctIndex: 1,
    explanation: "Single-threaded processing ensures deterministic price-time priority ordering without lock contention. This makes the system faster and easier to reason about."
  },
  {
    question: "What is 'price-time priority' in order matching?",
    options: [
      "Larger orders are matched first",
      "Best price first, then earliest order at that price",
      "Orders are matched randomly",
      "Newest orders are matched first"
    ],
    correctIndex: 1,
    explanation: "Price-time priority means the best price wins, and at the same price level, the order that arrived first gets matched first. This ensures fairness."
  },
  {
    question: "What happens when a limit buy order at $150.05 arrives and the best ask is $150.06?",
    options: [
      "The order is rejected",
      "The order matches at $150.06",
      "The order rests in the order book at $150.05",
      "The order is automatically cancelled"
    ],
    correctIndex: 2,
    explanation: "Since the buy price ($150.05) is below the best ask ($150.06), there's no match. The order rests in the book as a bid at $150.05."
  },
  {
    question: "Why does an exchange use journaling?",
    options: [
      "To encrypt orders",
      "To persist all events so state can be rebuilt on crash",
      "To compress market data",
      "To slow down processing for fairness"
    ],
    correctIndex: 1,
    explanation: "Journaling persists every order/event before processing. On crash, the order book can be rebuilt by replaying the journal."
  },
  {
    question: "What is an IOC (Immediate or Cancel) order?",
    options: [
      "An order that waits until end of day",
      "An order that fills what it can immediately and cancels the rest",
      "An order that must be fully filled or entirely cancelled",
      "An order that triggers at a specific price"
    ],
    correctIndex: 1,
    explanation: "IOC fills whatever quantity is immediately available and cancels any unfilled portion. It never rests in the order book."
  },
  {
    question: "Why do exchanges use UDP multicast for market data?",
    options: [
      "It's more secure than TCP",
      "It delivers data to all participants simultaneously with lowest latency",
      "It uses less bandwidth",
      "It guarantees delivery"
    ],
    correctIndex: 1,
    explanation: "UDP multicast sends data to all subscribers simultaneously, ensuring fairness (everyone gets it at the same time) with minimal latency."
  },
  {
    question: "What is the role of sequence numbers in market data feeds?",
    options: [
      "To encrypt the data",
      "To detect gaps and enable recovery of missed messages",
      "To compress the data",
      "To identify the sender"
    ],
    correctIndex: 1,
    explanation: "Sequence numbers let clients detect if they missed any messages (gap) and request retransmission or snapshot recovery."
  },
  {
    question: "What is 'netting' in the clearing process?",
    options: [
      "Encrypting trade data",
      "Aggregating trades to reduce the number of settlements",
      "Rejecting invalid trades",
      "Splitting large trades"
    ],
    correctIndex: 1,
    explanation: "Netting aggregates all trades per participant, so instead of settling each trade individually, participants settle their net position (reducing settlement volume)."
  },
  {
    question: "How does a primary-backup matching engine handle failover?",
    options: [
      "The backup has no data and must rebuild from scratch",
      "The backup receives the same input stream and maintains a shadow order book",
      "Trading stops until the primary is restored",
      "Orders are replayed from client systems"
    ],
    correctIndex: 1,
    explanation: "The backup receives the same input stream and maintains an identical order book. On primary failure, it can immediately take over."
  },
  {
    question: "What is a 'stop order'?",
    options: [
      "An order to stop all trading",
      "An order that becomes active when a trigger price is reached",
      "An order that cancels other orders",
      "An order with the highest priority"
    ],
    correctIndex: 1,
    explanation: "A stop order is dormant until the market reaches the stop/trigger price, at which point it becomes an active market or limit order."
  },
  {
    question: "Why is kernel bypass (DPDK, RDMA) used in exchange systems?",
    options: [
      "To improve security",
      "To reduce network latency by avoiding OS kernel overhead",
      "To increase storage capacity",
      "To simplify the code"
    ],
    correctIndex: 1,
    explanation: "Kernel bypass technologies like DPDK eliminate OS kernel overhead in the network path, reducing latency from microseconds to nanoseconds."
  },
  {
    question: "What is the typical round-trip latency for a colocated participant?",
    options: [
      "~1 second",
      "~100 milliseconds",
      "~10-50 microseconds",
      "~10 minutes"
    ],
    correctIndex: 2,
    explanation: "Modern exchanges achieve ~10-50 microsecond round-trip latency for colocated participants using optimized networking and in-memory processing."
  }
];

export const StockExchangeQuiz = () => {
  return <Quiz questions={quizQuestions} />;
};
