import { Category } from "@/types/algorithms";
import { componentShowcase } from "./componentExamples";
import { alg4pt1 } from "./algorithms/4.1-bfs";
import { alg4pt2 } from "./algorithms/4.2-minimal-tree";
import { FEATURES } from "@/config/features";
import { consistentHashing } from "./algorithms/patterns/consistent-hashing";
import { connectionPooling } from "./algorithms/patterns/connection-pooling";
import { cachingPatterns } from "./algorithms/patterns/caching-patterns";
import { circuitBreakerPattern } from "./algorithms/patterns/circuit-breaker";
import { rateLimitingPattern } from "./algorithms/patterns/rate-limiting";
import { retriesDlqPattern } from "./algorithms/patterns/retries-dlq";
import { messagingDeliveryPattern } from "./algorithms/patterns/messaging-delivery";
import { deploymentPatternsPattern } from "./algorithms/patterns/deployment-patterns";
import { acidTopic } from "./algorithms/data/acid";
import { capTopic } from "./algorithms/data/cap";
import { sqlVsNosqlTopic } from "./algorithms/data/sql-vs-nosql";
import { financeTopic } from "./algorithms/data/finance";
import { paymentLifecycleTopic } from "./algorithms/data/payment-lifecycle";
import { reconciliationTopic } from "./algorithms/data/reconciliation";
import { rateLimiterDesign } from "./algorithms/designs/rate-limiter";
import { walletLedgerDesign } from "./algorithms/designs/wallet-ledger";


const patternsTopics = [
  consistentHashing,
  connectionPooling,
  cachingPatterns,
  circuitBreakerPattern,
  rateLimitingPattern,
  retriesDlqPattern,
  messagingDeliveryPattern,
  deploymentPatternsPattern,
  ...(FEATURES.SHOW_EXAMPLES ? [{
    ...componentShowcase,
    id: "example-components",
    title: "Component Showcase",
    category: "patterns",
  }] : []),
];


const designsTopics = [
  rateLimiterDesign,
  walletLedgerDesign,
  {
    ...alg4pt2,
    id: "url-shortener",
    title: "URL Shortener",
    category: "designs",
  },
  ...(FEATURES.SHOW_EXAMPLES ? [{
    ...componentShowcase,
    id: "example-components-2",
    title: "Component Showcase",
    category: "designs",
  }] : []),
];

const dataTopics = [
  acidTopic,
  capTopic,
  sqlVsNosqlTopic,
  financeTopic,
  paymentLifecycleTopic,
  reconciliationTopic,
  ...(FEATURES.SHOW_EXAMPLES ? [{
    ...componentShowcase,
    id: "example-components-3",
    title: "Component Showcase",
    category: "data",
  }] : []),
];

export const algorithmCategories: Category[] = [
  {
    id: "patterns",
    name: "Patterns",
    algorithms: patternsTopics,
  },
  {
    id: "designs",
    name: "Designs",
    algorithms: designsTopics,
  },
  {
    id: "data",
    name: "Data",
    algorithms: dataTopics,
  },
];
