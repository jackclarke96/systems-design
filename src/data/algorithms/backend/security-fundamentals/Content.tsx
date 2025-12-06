import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Key, Database, FileText, Eye, Server, Code, UserCheck } from "lucide-react";
import { Quiz } from "@/components/Quiz";

export const Content = () => {
  return (
    <div className="space-y-8">
      {/* Traffic & Network */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          1. Traffic & Network
        </h2>
        <p className="text-muted-foreground mb-4">
          Defaults to state — assume everything is hostile until proven otherwise.
        </p>

        <div className="grid gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="h-5 w-5" />
                🔒 TLS Everywhere
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>External:</strong> HTTPS only, HSTS enabled</p>
              <p><strong>Internal:</strong> TLS / mTLS between services (often via service mesh)</p>
              <p><strong>DB connections:</strong> TLS with certificate validation</p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">🌐 Network Isolation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Private subnets</strong> for app + DB</p>
              <p><strong>Public only</strong> for load balancer / API gateway</p>
              <p><strong>Security groups / firewall:</strong> "deny by default, allow minimal"</p>
            </CardContent>
          </Card>

          <Card className="border-orange-500/30 bg-orange-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">🧱 Edge Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>WAF</strong> in front of public endpoints (SQLi/XSS/known-bad patterns)</p>
              <p><strong>Rate limiting</strong> + IP throttling / burst protection</p>
              <p><strong>DDoS protection</strong> (AWS Shield, Cloud Armor, etc.)</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Auth & Authz */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <UserCheck className="h-6 w-6 text-primary" />
          2. Auth & Authz
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Use <strong>OIDC / OAuth2</strong> or similar (no home-grown auth)</p>
              <p><strong>Short-lived access tokens</strong> (JWT or opaque)</p>
              <p><strong>Refresh tokens</strong> stored securely (httpOnly cookies if browser)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Authorisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Least privilege:</strong> enforce per-resource permissions</p>
              <p><strong>Service-to-service auth:</strong> mTLS identity or signed service tokens</p>
              <p><strong>Centralise authz decisions</strong> (policy engine / middleware)</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4 border-green-500/30 bg-green-500/5">
          <CardContent className="pt-4">
            <p className="text-sm italic">
              💬 <strong>Interview phrase:</strong> "We use strong authentication (OIDC), check scopes/roles per request, and enforce least privilege both at the app layer and for service-to-service calls."
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Data In Transit & At Rest */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          3. Data In Transit & At Rest
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">In Transit</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>TLS everywhere (as above)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">At Rest</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>DB encryption at rest</strong> (cloud managed keys)</p>
              <p><strong>Encrypted object storage</strong> (S3/GCS) for files</p>
              <p><strong>Encrypted backups / snapshots</strong></p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Field-Level Encryption for Sensitive Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>For very sensitive data (card PAN, secrets):</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">KMS or HSM-managed keys</Badge>
              <Badge variant="secondary">Avoid handling raw card data</Badge>
              <Badge variant="secondary">Use PSP tokenisation</Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Secrets & Configuration */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Key className="h-6 w-6 text-primary" />
          4. Secrets & Configuration
        </h2>

        <div className="grid gap-4">
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">❌ Never Do</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Never hard-code secrets in code / images</p>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">✅ Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Use <strong>secret manager</strong> (AWS Secrets Manager, GCP SM, Vault)</p>
              <p><strong>Rotate keys & credentials</strong> regularly</p>
              <p><strong>Different secrets per environment</strong> (dev/stage/prod)</p>
              <p><strong>Read-only config maps</strong> / env vars</p>
              <p><strong>Don't log secrets</strong></p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4 border-green-500/30 bg-green-500/5">
          <CardContent className="pt-4">
            <p className="text-sm italic">
              💬 <strong>Interview phrase:</strong> "All secrets are stored in a dedicated secret manager and injected at runtime; no credentials are committed to source or baked into images."
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Input, Output & Data Handling */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          5. Input, Output & Data Handling
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Input Validation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Validate and normalise</strong> all external input (API, webhooks, files)</p>
              <p>Use <strong>strong types and schema validation</strong> (JSON schema, protobuf)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Output Encoding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>HTML-escape</strong> user content in UIs to avoid XSS</p>
              <p><strong>Prepared statements</strong> — never interpolate untrusted strings into SQL</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Avoiding Injection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>SQL:</strong> prepared statements, no string concat</p>
              <p><strong>No eval</strong> / dynamic code exec on user input</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">File Uploads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Size limits</strong></p>
              <p><strong>Type checking</strong> (MIME + magic bytes)</p>
              <p><strong>Virus scanning</strong> if relevant</p>
              <p>Store in <strong>object storage</strong>, not directly on app disk</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Logging, Auditing & Monitoring */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Eye className="h-6 w-6 text-primary" />
          6. Logging, Auditing & Monitoring
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Structured Logging (JSON)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Request IDs, correlation IDs</p>
              <p>User ID / service identity (where allowed)</p>
              <p className="text-destructive font-medium">No secrets/PII in logs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Audit Logging</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>For sensitive operations: <strong>who did what, when, from where</strong></p>
              <p><strong>Immutable / append-only</strong>, access-controlled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Monitoring & Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Metrics:</strong> error rates, auth failures, traffic spikes</p>
              <p><strong>Security alerts:</strong> repeated failed logins, strange IP patterns</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4 border-green-500/30 bg-green-500/5">
          <CardContent className="pt-4">
            <p className="text-sm italic">
              💬 <strong>Interview phrase:</strong> "For financial operations we maintain an immutable audit log of all balance-affecting actions, with actor, timestamp and context, and we monitor for unusual patterns."
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Permissions & Infrastructure */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Server className="h-6 w-6 text-primary" />
          7. Permissions & Infrastructure
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Least Privilege</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>DB users:</strong> minimal grants (app user can't DROP TABLE)</p>
              <p><strong>IAM roles:</strong> scoped to specific services/resources</p>
              <p>Separate roles for read vs write if appropriate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Environment Isolation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Separate accounts/projects</strong> for dev/stage/prod</p>
              <p><strong>No direct internet access</strong> from DBs</p>
              <p>Jump boxes / VPN / SSO for admin access</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Backups & DR</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Regular <strong>automated backups</strong></p>
              <p><strong>Tested restore procedures</strong></p>
              <p>Retention policies aligned with compliance</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Development Practices */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          8. Development Practices
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Secure Defaults</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>TLS on by default</p>
              <p>"Deny" as default policy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Dependency Hygiene</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Pin versions</strong></p>
              <p>Use Snyk / Dependabot / etc.</p>
              <p>Regular vulnerability scans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">OWASP Awareness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Know <strong>OWASP Top 10:</strong> Injection, broken auth, sensitive data exposure</p>
              <p><strong>Threat modelling</strong> for critical flows (login, payment, admin)</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Privacy & Compliance */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          9. Privacy & Compliance (Fintech)
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Data Minimisation</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Only store what you need</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">GDPR-Style Concerns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Data retention policies</p>
              <p>Access / erasure handling</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">PCI-DSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>If handling cards...</p>
              <p>Or better: <strong>"we avoid raw card data and use a PSP's tokenisation instead"</strong></p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export const quizQuestions = [
  {
    question: "What is the recommended approach for storing secrets in production?",
    options: [
      "Hard-code them in environment variables in the codebase",
      "Use a dedicated secret manager and inject at runtime",
      "Store them in a config file in the repository",
      "Embed them in Docker images for portability"
    ],
    correctIndex: 1,
    explanation: "Secrets should be stored in a dedicated secret manager (AWS Secrets Manager, Vault, etc.) and injected at runtime. Never commit credentials to source or bake into images."
  },
  {
    question: "What does 'deny by default, allow minimal' mean for network security?",
    options: [
      "Block all traffic except what's explicitly allowed",
      "Allow all traffic except what's explicitly blocked",
      "Deny traffic during business hours only",
      "Allow minimal logging of denied traffic"
    ],
    correctIndex: 0,
    explanation: "Deny by default means all traffic is blocked unless explicitly permitted. This principle of least privilege ensures only necessary connections are allowed."
  },
  {
    question: "Why should refresh tokens be stored in httpOnly cookies for browser clients?",
    options: [
      "To improve performance",
      "To prevent JavaScript access and XSS attacks",
      "To enable cross-domain requests",
      "To reduce cookie size"
    ],
    correctIndex: 1,
    explanation: "httpOnly cookies cannot be accessed by JavaScript, preventing XSS attacks from stealing refresh tokens. This is a critical browser security measure."
  },
  {
    question: "What is the primary purpose of mTLS between services?",
    options: [
      "Compress traffic between services",
      "Mutual authentication - both sides verify each other's identity",
      "Improve latency for service calls",
      "Enable service discovery"
    ],
    correctIndex: 1,
    explanation: "Mutual TLS (mTLS) provides mutual authentication where both the client and server verify each other's identity via certificates, ensuring trusted service-to-service communication."
  },
  {
    question: "How should SQL injection be prevented?",
    options: [
      "Input validation alone",
      "Output encoding",
      "Prepared statements / parameterised queries",
      "HTTPS encryption"
    ],
    correctIndex: 2,
    explanation: "Prepared statements separate SQL code from data, preventing injection. Never concatenate user input into SQL strings. Input validation is defense-in-depth, not the primary protection."
  },
  {
    question: "What should audit logs for sensitive operations include?",
    options: [
      "Full request/response bodies including passwords",
      "Who did what, when, from where - immutable and access-controlled",
      "Only error conditions",
      "Aggregated daily summaries"
    ],
    correctIndex: 1,
    explanation: "Audit logs should capture the actor, action, timestamp, and context. They must be immutable/append-only and access-controlled. Never log secrets or PII."
  },
  {
    question: "Why should database users have minimal grants?",
    options: [
      "To improve query performance",
      "To reduce storage costs",
      "To limit blast radius if credentials are compromised",
      "To enable connection pooling"
    ],
    correctIndex: 2,
    explanation: "Least privilege for DB users means if credentials are compromised, the attacker can only do what that user is permitted to do. An app user shouldn't be able to DROP TABLE."
  },
  {
    question: "What is the recommended approach for handling card data in fintech systems?",
    options: [
      "Store encrypted card numbers in your database",
      "Use PSP tokenisation to avoid handling raw card data",
      "Store card data in a separate microservice",
      "Keep card data only in memory"
    ],
    correctIndex: 1,
    explanation: "Best practice is to avoid handling raw card data entirely by using a PSP's tokenisation. This removes PCI-DSS scope and reduces risk significantly."
  },
  {
    question: "What should file upload validation include?",
    options: [
      "File extension check only",
      "Size limits, type checking (MIME + magic bytes), virus scanning",
      "Client-side validation only",
      "Filename validation only"
    ],
    correctIndex: 1,
    explanation: "File uploads need multiple layers: size limits, type checking (both MIME and magic bytes), virus scanning if relevant, and storage in object storage rather than app disk."
  },
  {
    question: "Why should different environments (dev/stage/prod) have different secrets?",
    options: [
      "To reduce secret manager costs",
      "To prevent accidental production access from non-prod environments",
      "To improve secret rotation speed",
      "To enable faster deployments"
    ],
    correctIndex: 1,
    explanation: "Separate secrets per environment prevents dev or staging from accidentally accessing production data or services. This is a key isolation control."
  },
  {
    question: "What is the purpose of HSTS (HTTP Strict Transport Security)?",
    options: [
      "To compress HTTP traffic",
      "To tell browsers to only connect via HTTPS",
      "To enable HTTP/2",
      "To cache HTTP responses"
    ],
    correctIndex: 1,
    explanation: "HSTS tells browsers to only connect to the site via HTTPS, preventing downgrade attacks and accidental HTTP connections."
  },
  {
    question: "What security control should be in front of public endpoints?",
    options: [
      "Only a load balancer",
      "WAF with rate limiting and DDoS protection",
      "VPN gateway",
      "Database proxy"
    ],
    correctIndex: 1,
    explanation: "Public endpoints should have a WAF (Web Application Firewall) for SQLi/XSS protection, rate limiting for abuse prevention, and DDoS protection."
  }
];

export const SecurityQuiz = () => {
  return <Quiz questions={quizQuestions} />;
};
