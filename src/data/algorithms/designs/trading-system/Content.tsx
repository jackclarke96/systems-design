import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ArrowRight, Database, Server, Zap, Shield, BarChart3, RefreshCw } from "lucide-react";
import { Quiz } from "@/components/Quiz";
import tradingSystemArchitecture from "@/assets/trading-system-architecture.png";

export const Content = () => {
  return (
    <Tabs defaultValue="architecture" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="architecture">Architecture</TabsTrigger>
        <TabsTrigger value="flows">Flows</TabsTrigger>
        <TabsTrigger value="properties">Properties</TabsTrigger>
        <TabsTrigger value="quiz">Quiz</TabsTrigger>
      </TabsList>

      <TabsContent value="architecture" className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Trading / Order Management System</h2>
          <p className="text-muted-foreground">Order placement, matching engine, positions & ledger integration</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              System Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img 
              src={tradingSystemArchitecture} 
              alt="Trading System Architecture" 
              className="w-full rounded-lg border border-border bg-white/90"
            />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-green-500/30 bg-green-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-green-600 dark:text-green-400">Core Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Order Service:</strong> POST /orders (idempotent), state machine (NEW→ACCEPTED→FILLED/CANCELLED)</p>
              <p><strong>Matching Engine:</strong> Single writer per symbol, in-memory order book, emits TradeExecuted</p>
              <p><strong>Trade/Positions Service:</strong> Consumes TradeExecuted, updates positions, emits to Ledger</p>
              <p><strong>Ledger Service:</strong> Double-entry cash movements, append-only ledger_entries</p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-blue-600 dark:text-blue-400">Infrastructure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>API Gateway:</strong> TLS termination, rate limiting, JWT validation, routes to services</p>
              <p><strong>Broker:</strong> OrderCommand → ME, TradeExecuted/OrderUpdated downstream, partitioned by symbol</p>
              <p><strong>Outbox Worker:</strong> Polls order_outbox_events, publishes to Broker</p>
              <p><strong>Market Data Publisher:</strong> Publishes trade feed, order book snapshots</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Order State Machine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Badge variant="outline">NEW</Badge>
              <ArrowRight className="h-4 w-4" />
              <Badge variant="outline">ACCEPTED</Badge>
              <ArrowRight className="h-4 w-4" />
              <Badge variant="outline">PARTIALLY_FILLED</Badge>
              <ArrowRight className="h-4 w-4" />
              <Badge className="bg-green-600">FILLED</Badge>
              <span className="text-muted-foreground mx-2">or</span>
              <Badge className="bg-red-600">CANCELLED</Badge>
              <span className="text-muted-foreground mx-2">or</span>
              <Badge className="bg-orange-600">REJECTED</Badge>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="flows" className="space-y-6">
        {/* Flow 1: Place Order */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-blue-600">Flow 1</Badge>
              Place Order
            </CardTitle>
            <p className="text-sm text-muted-foreground">Goal: Accept order once, don't over-spend, get it to Matching Engine</p>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">1</Badge>
                <div>
                  <strong>Client → API GW → Order Service</strong>
                  <p className="text-muted-foreground">POST /orders with symbol, side, type, price, quantity, Idempotency-Key</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">2</Badge>
                <div>
                  <strong>Idempotency & Persistence</strong>
                  <p className="text-muted-foreground">Look up (account_id, idempotency_key) in order_idempotency_keys. If exists → return existing. If new → DB tx: insert orders (state=NEW) + idempotency row</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">3</Badge>
                <div>
                  <strong>Risk / Balance Check</strong>
                  <p className="text-muted-foreground">Fetch available cash/position from Ledger. If insufficient → set state=REJECTED, return error</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">4</Badge>
                <div>
                  <strong>Accept Order & Write to Outbox</strong>
                  <p className="text-muted-foreground">DB tx: update state=ACCEPTED, insert order_outbox_events (OrderCreated)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">5</Badge>
                <div>
                  <strong>Outbox → Broker → Matching Engine</strong>
                  <p className="text-muted-foreground">Worker polls outbox, publishes OrderCommand (partitioned by symbol). Engine adds to in-memory book</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flow 2: Matching */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-purple-600">Flow 2</Badge>
              Matching & Trade Creation
            </CardTitle>
            <p className="text-sm text-muted-foreground">Goal: Convert resting & incoming orders into trades</p>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">1</Badge>
                <div>
                  <strong>Engine Processes OrderCommand</strong>
                  <p className="text-muted-foreground">Updates order book for that symbol</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">2</Badge>
                <div>
                  <strong>If Order Crosses Best Price</strong>
                  <p className="text-muted-foreground">Generates TradeExecuted events: event_id, trade_id, symbol, price, qty, buy_order_id, sell_order_id, seq_no</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">3</Badge>
                <div>
                  <strong>Emit OrderUpdated Events</strong>
                  <p className="text-muted-foreground">For maker/taker: new filled_qty, remaining_qty, state (PARTIALLY_FILLED/FILLED)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">4</Badge>
                <div>
                  <strong>Publish to Broker</strong>
                  <p className="text-muted-foreground">TradeExecuted and OrderUpdated events sent downstream</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flow 3: Trades to Positions */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-green-600">Flow 3</Badge>
              Trades → Positions & Ledger
            </CardTitle>
            <p className="text-sm text-muted-foreground">Goal: Update per-account positions and monetary balances exactly once</p>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">1</Badge>
                <div>
                  <strong>Broker → Trade/Positions Service</strong>
                  <p className="text-muted-foreground">Consumes TradeExecuted (and optionally OrderUpdated)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">2</Badge>
                <div>
                  <strong>Idempotent Trade Handling</strong>
                  <p className="text-muted-foreground">DB tx: INSERT INTO trades_inbox(event_id). PK conflict → duplicate → ignore</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">3</Badge>
                <div>
                  <strong>Update Positions</strong>
                  <p className="text-muted-foreground">For each side: adjust long/short qty, recompute avg entry price, update realized/unrealized PnL</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">4</Badge>
                <div>
                  <strong>Emit to Ledger</strong>
                  <p className="text-muted-foreground">Insert TradeSettled event to positions-side outbox (or call Ledger directly)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">5</Badge>
                <div>
                  <strong>Ledger Service Processing</strong>
                  <p className="text-muted-foreground">ledger_events(event_id PK) inbox dedup. Double-entry: debit buyer cash, credit seller cash, fee entries</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flow 4: Read APIs */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-amber-500/10 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-amber-600">Flow 4</Badge>
              Get Order / Position / Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-muted/50">
                <strong>Get Order</strong>
                <p className="text-muted-foreground">GET /orders/{'{id}'} → Order Service → read orders table</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <strong>Get Positions</strong>
                <p className="text-muted-foreground">GET /positions → Trade/Positions Service → read positions table</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <strong>Get Balances</strong>
                <p className="text-muted-foreground">GET /balances → Ledger Service → derive from ledger_entries or balances view</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flow 5: Cancel Order */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-red-500/10 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-red-600">Flow 5</Badge>
              Cancel Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">1</Badge>
                <div>
                  <strong>POST /orders/{'{id}'}/cancel → Order Service</strong>
                  <p className="text-muted-foreground">Marks order CANCEL_REQUESTED, writes OrderCancelRequested to outbox</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">2</Badge>
                <div>
                  <strong>Outbox → Broker → Matching Engine</strong>
                  <p className="text-muted-foreground">Engine removes/marks order cancelled if still resting</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">3</Badge>
                <div>
                  <strong>Engine Emits OrderUpdated</strong>
                  <p className="text-muted-foreground">state = CANCELLED</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="properties" className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">6 Key Properties</h2>
          <p className="text-muted-foreground">How each is achieved in the system</p>
        </div>

        <div className="grid gap-4">
          {/* Property 1 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-5 w-5 text-blue-500" />
                1. Idempotent POST /orders
              </CardTitle>
              <p className="text-sm text-muted-foreground">Client can safely retry order submission without creating duplicates</p>
            </CardHeader>
            <CardContent>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-sm">
                <strong className="text-green-600 dark:text-green-400">Achieved by:</strong>
                <p className="mt-1">order_idempotency_keys(account_id, idempotency_key) PK → order_id. On POST /orders: insert idempotency row first. If conflict → load & return existing order. Else → create new orders row and proceed.</p>
              </div>
            </CardContent>
          </Card>

          {/* Property 2 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <XCircle className="h-5 w-5 text-red-500" />
                2. No Over-Spend / Over-Sell
              </CardTitle>
              <p className="text-sm text-muted-foreground">Orders only accepted if available cash/position is sufficient</p>
            </CardHeader>
            <CardContent>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-sm">
                <strong className="text-green-600 dark:text-green-400">Achieved by:</strong>
                <p className="mt-1">Order Service checks cash balance (for BUY) and position (for SELL) before moving NEW → ACCEPTED. Balances come from Ledger/balances view, positions from positions table. Optional: enforce via single-writer or locking to avoid racy parallel order placement.</p>
              </div>
            </CardContent>
          </Card>

          {/* Property 3 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-5 w-5 text-purple-500" />
                3. Deterministic Matching & Per-Market Ordering
              </CardTitle>
              <p className="text-sm text-muted-foreground">Same inputs ⇒ same trades; per-symbol fairness</p>
            </CardHeader>
            <CardContent>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-sm">
                <strong className="text-green-600 dark:text-green-400">Achieved by:</strong>
                <p className="mt-1">Single writer per symbol (dedicated ME instance or partition). Broker partitions OrderCommand by symbol, preserving arrival order per market. Engine processes commands sequentially and assigns monotonic seq_no. Given same command stream → reproduce same trades.</p>
              </div>
            </CardContent>
          </Card>

          {/* Property 4 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                4. No Order or Trade is Missed
              </CardTitle>
              <p className="text-sm text-muted-foreground">Every accepted order and every trade eventually shows up in DBs</p>
            </CardHeader>
            <CardContent>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-sm">
                <strong className="text-green-600 dark:text-green-400">Achieved by:</strong>
                <p className="mt-1">Orders row + order_outbox_events written in same DB tx. Outbox worker retries publishing until ack. ME emits to durable Broker. Trade/Positions Service uses trades_inbox(event_id PK) for exactly-once processing. Consumers restart from broker/log on crash.</p>
              </div>
            </CardContent>
          </Card>

          {/* Property 5 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Database className="h-5 w-5 text-amber-500" />
                5. Trades Not Double-Counted in Positions or Balances
              </CardTitle>
              <p className="text-sm text-muted-foreground">At-least-once delivery, but effectively exactly-once effects</p>
            </CardHeader>
            <CardContent>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-sm">
                <strong className="text-green-600 dark:text-green-400">Achieved by:</strong>
                <p className="mt-1">trades_inbox(event_id PK): first insert → process trade and update positions; duplicate → PK conflict → no-op. ledger_events(event_id PK): first insert → write ledger entries; duplicate → no-op. Retries don't create extra position or cash changes.</p>
              </div>
            </CardContent>
          </Card>

          {/* Property 6 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <RefreshCw className="h-5 w-5 text-cyan-500" />
                6. Replayable & Auditable
              </CardTitle>
              <p className="text-sm text-muted-foreground">Can reconstruct book, trades, positions, and cash from history</p>
            </CardHeader>
            <CardContent>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-sm">
                <strong className="text-green-600 dark:text-green-400">Achieved by:</strong>
                <p className="mt-1">Append-only streams: OrderCommand (from Order Service), TradeExecuted (from ME). Append-only trades and positions history. Append-only ledger_entries for cash/fees. To audit: replay OrderCommand → rebuild book + trades; replay TradeExecuted → positions; replay TradeSettled → ledger_entries.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="quiz">
        <TradingSystemQuiz />
      </TabsContent>
    </Tabs>
  );
};

export const TradingSystemQuiz = () => {
  const questions = [
    {
      question: "What is the purpose of the order_idempotency_keys table?",
      options: [
        "To track order history for auditing",
        "To ensure duplicate order submissions return the same result",
        "To store order cancellation requests",
        "To maintain the order book state"
      ],
      correctIndex: 1,
      explanation: "order_idempotency_keys(account_id, idempotency_key) PK → order_id ensures that if a client retries the same order submission, the system returns the existing order instead of creating a duplicate."
    },
    {
      question: "When does the Order Service write to the order_outbox_events table?",
      options: [
        "When the order is created with state=NEW",
        "When the order fails risk/balance checks",
        "When the order is accepted and state changes to ACCEPTED",
        "When the order is fully filled"
      ],
      correctIndex: 2,
      explanation: "The outbox event (OrderCreated) is written in the same DB transaction as the state update to ACCEPTED. This ensures atomicity - either both happen or neither does."
    },
    {
      question: "Why is the Broker partitioned by symbol for OrderCommand messages?",
      options: [
        "To improve read performance for market data",
        "To ensure per-market ordering and deterministic matching",
        "To reduce storage costs",
        "To enable faster order cancellation"
      ],
      correctIndex: 1,
      explanation: "Partitioning by symbol ensures all orders for a given symbol arrive at the Matching Engine in order, enabling deterministic matching and fair per-market processing."
    },
    {
      question: "How does the Trade/Positions Service achieve exactly-once trade processing?",
      options: [
        "By using optimistic locking on position rows",
        "By deduplicating based on trade_id in application code",
        "By using trades_inbox(event_id PK) - first insert processes, duplicates conflict",
        "By rejecting messages with timestamps older than 5 minutes"
      ],
      correctIndex: 2,
      explanation: "The trades_inbox table with event_id as primary key acts as an inbox dedup mechanism. First insert → process; duplicate event_id → PK conflict → no-op."
    },
    {
      question: "What happens if the Order Service crashes after updating state=ACCEPTED but before the outbox worker publishes?",
      options: [
        "The order is lost and never reaches the Matching Engine",
        "The outbox worker will pick up the pending event on restart and publish it",
        "The client must resubmit the order",
        "The order is automatically cancelled"
      ],
      correctIndex: 1,
      explanation: "Because the order state update and outbox event are written in the same DB transaction, the event persists. The outbox worker polls for status='PENDING' events and will publish on restart."
    },
    {
      question: "Which component is responsible for maintaining the in-memory order book?",
      options: [
        "Order Service",
        "Trade/Positions Service",
        "Matching Engine",
        "Ledger Service"
      ],
      correctIndex: 2,
      explanation: "The Matching Engine maintains in-memory order books (one per symbol). It consumes OrderCommand messages and applies price-time priority matching rules."
    },
    {
      question: "When a trade executes, what events does the Matching Engine emit?",
      options: [
        "Only TradeExecuted",
        "TradeExecuted and OrderUpdated (for maker/taker)",
        "OrderAccepted and TradeSettled",
        "BalanceUpdated and PositionChanged"
      ],
      correctIndex: 1,
      explanation: "The Matching Engine emits TradeExecuted (the trade details) and OrderUpdated (for both maker and taker with new filled_qty, remaining_qty, and state)."
    },
    {
      question: "How does the system prevent double-counting of cash movements in the Ledger?",
      options: [
        "By using distributed locks across services",
        "By having the Ledger Service reject duplicate trade_ids",
        "By using ledger_events(event_id PK) as an inbox dedup mechanism",
        "By requiring synchronous calls from Trade/Positions Service"
      ],
      correctIndex: 2,
      explanation: "ledger_events(event_id PK) acts as an inbox. First insert → write ledger entries; duplicate event_id → PK conflict → no-op. This ensures each trade is booked exactly once."
    },
    {
      question: "What is the Order state machine transition path for a fully executed market order?",
      options: [
        "NEW → FILLED",
        "NEW → ACCEPTED → FILLED",
        "NEW → ACCEPTED → PARTIALLY_FILLED → FILLED",
        "PENDING → ACCEPTED → EXECUTED"
      ],
      correctIndex: 1,
      explanation: "A market order that passes risk checks goes NEW → ACCEPTED, then when the Matching Engine fills it completely, it becomes FILLED. PARTIALLY_FILLED is only for partial fills."
    },
    {
      question: "Why can the system replay OrderCommand stream to reconstruct the order book state?",
      options: [
        "Because orders are stored in a relational database",
        "Because the Matching Engine processing is deterministic given the same input sequence",
        "Because all orders are timestamped",
        "Because the Broker stores unlimited message history"
      ],
      correctIndex: 1,
      explanation: "The single-writer-per-symbol pattern ensures deterministic processing. Given the same OrderCommand stream in the same order, the Matching Engine will produce the exact same trades and book state."
    },
    {
      question: "What check does Order Service perform before transitioning an order from NEW to ACCEPTED?",
      options: [
        "Validates the symbol exists in the system",
        "Checks if the Matching Engine is available",
        "Verifies sufficient cash (BUY) or position (SELL) is available",
        "Confirms the client has an active session"
      ],
      correctIndex: 2,
      explanation: "Order Service performs risk/balance checks: for BUY orders, it verifies available cash; for SELL orders, it verifies sufficient position. If insufficient, the order is REJECTED."
    },
    {
      question: "How does the system handle order cancellation if the order has already been partially filled?",
      options: [
        "The entire order including filled portion is reversed",
        "The cancel request is rejected entirely",
        "Only the remaining unfilled portion is cancelled",
        "The order enters a CANCEL_PENDING state indefinitely"
      ],
      correctIndex: 2,
      explanation: "Order cancellation only affects the resting (unfilled) portion. The Matching Engine removes/marks the remaining quantity as cancelled, but already-executed trades are not reversed."
    }
  ];

  return <Quiz questions={questions} />;
};

export default Content;
