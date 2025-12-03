import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quiz } from "@/components/Quiz";
import { TechTooltip } from "@/components/TechTooltip";

const SectionHeader = ({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
      <span className="text-3xl">{icon}</span>
      {title}
    </h2>
    {subtitle && <p className="text-muted-foreground mt-1 ml-12">{subtitle}</p>}
  </div>
);

const ConceptCard = ({ title, icon, children, variant = "default" }: { title: string; icon: string; children: React.ReactNode; variant?: "default" | "success" | "warning" | "info" }) => {
  const variants = {
    default: "bg-card border-border",
    success: "bg-green-500/10 border-green-500/30",
    warning: "bg-red-500/10 border-red-500/30",
    info: "bg-blue-500/10 border-blue-500/30",
  };
  
  return (
    <Card className={`${variants[variant]} border`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-2">
        {children}
      </CardContent>
    </Card>
  );
};

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2">
        <span className="text-accent mt-1">•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const CodeBlock = ({ title, code }: { title: string; code: string }) => (
  <div className="rounded-lg overflow-hidden border border-border">
    <div className="bg-muted px-4 py-2 text-sm font-medium text-foreground">{title}</div>
    <pre className="bg-card p-4 overflow-x-auto text-sm">
      <code className="text-muted-foreground">{code}</code>
    </pre>
  </div>
);

export const GrpcAuthContent = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-xl p-6 border border-violet-500/30">
        <h1 className="text-3xl font-bold text-foreground mb-2">gRPC Authentication Patterns</h1>
        <p className="text-muted-foreground">
          Securing service-to-service communication with mTLS, interceptors, and identity propagation in microservices architectures.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-violet-500/20 border-violet-500/50">mTLS</Badge>
          <Badge variant="outline" className="bg-purple-500/20 border-purple-500/50">Interceptors</Badge>
          <Badge variant="outline" className="bg-fuchsia-500/20 border-fuchsia-500/50">Service Mesh</Badge>
        </div>
      </div>

      {/* mTLS Section */}
      <section>
        <SectionHeader 
          icon="🔐" 
          title="Mutual TLS (mTLS)" 
          subtitle="Two-way certificate authentication for service-to-service communication"
        />
        
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                In standard TLS, only the client verifies the server's identity. With{" "}
                <TechTooltip 
                  triggerText="mTLS"
                  content="Mutual TLS requires both parties to present certificates. The server verifies the client's certificate, and the client verifies the server's certificate, establishing bidirectional trust."
                />, both parties authenticate each other using X.509 certificates, ensuring only trusted services can communicate.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <ConceptCard title="Standard TLS" icon="🔓" variant="warning">
                  <BulletList items={[
                    "Client verifies server identity only",
                    "Server accepts any client connection",
                    "Vulnerable to unauthorized service access",
                    "Suitable for public-facing APIs"
                  ]} />
                </ConceptCard>
                
                <ConceptCard title="Mutual TLS" icon="🔒" variant="success">
                  <BulletList items={[
                    "Both parties verify each other",
                    "Client must present valid certificate",
                    "Zero-trust network model",
                    "Required for service-to-service auth"
                  ]} />
                </ConceptCard>
              </div>
            </CardContent>
          </Card>

          <CodeBlock 
            title="gRPC Server with mTLS (Go)"
            code={`// Load server certificate and key
cert, _ := tls.LoadX509KeyPair("server.crt", "server.key")

// Load CA cert to verify client certificates
caCert, _ := os.ReadFile("ca.crt")
certPool := x509.NewCertPool()
certPool.AppendCertsFromPEM(caCert)

// Configure TLS with client cert verification
tlsConfig := &tls.Config{
    Certificates: []tls.Certificate{cert},
    ClientAuth:   tls.RequireAndVerifyClientCert,
    ClientCAs:    certPool,
}

// Create gRPC server with mTLS
creds := credentials.NewTLS(tlsConfig)
server := grpc.NewServer(grpc.Creds(creds))`}
          />

          <Card className="bg-blue-500/10 border-blue-500/30">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-foreground mb-3">📋 Certificate Management Challenges</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">Rotation</p>
                  <p className="text-muted-foreground">Certificates expire; need automated rotation without downtime</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Distribution</p>
                  <p className="text-muted-foreground">Securely distribute certs to all services at scale</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Revocation</p>
                  <p className="text-muted-foreground">Handle compromised certs via CRL or OCSP</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interceptors Section */}
      <section>
        <SectionHeader 
          icon="🎯" 
          title="Auth Interceptors" 
          subtitle="Centralized authentication and authorization logic"
        />
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            gRPC{" "}
            <TechTooltip 
              triggerText="interceptors"
              content="Interceptors are middleware that execute before/after RPC calls. Unary interceptors handle single request/response, while stream interceptors handle streaming RPCs. They're ideal for cross-cutting concerns like auth, logging, and metrics."
            />{" "}
            provide a clean way to implement cross-cutting concerns like authentication, authorization, and audit logging without polluting business logic.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <ConceptCard title="Unary Interceptor" icon="➡️" variant="info">
              <p>For single request/response RPCs. Intercepts each individual call.</p>
              <code className="text-xs bg-muted px-2 py-1 rounded mt-2 block">
                func(ctx, req, info, handler) (resp, error)
              </code>
            </ConceptCard>
            
            <ConceptCard title="Stream Interceptor" icon="🔄" variant="info">
              <p>For streaming RPCs. Wraps the stream for ongoing communication.</p>
              <code className="text-xs bg-muted px-2 py-1 rounded mt-2 block">
                func(srv, stream, info, handler) error
              </code>
            </ConceptCard>
          </div>

          <CodeBlock 
            title="JWT Auth Interceptor (Go)"
            code={`func AuthInterceptor(
    ctx context.Context,
    req interface{},
    info *grpc.UnaryServerInfo,
    handler grpc.UnaryHandler,
) (interface{}, error) {
    // Skip auth for health checks
    if info.FullMethod == "/grpc.health.v1.Health/Check" {
        return handler(ctx, req)
    }
    
    // Extract token from metadata
    md, ok := metadata.FromIncomingContext(ctx)
    if !ok {
        return nil, status.Error(codes.Unauthenticated, "missing metadata")
    }
    
    tokens := md.Get("authorization")
    if len(tokens) == 0 {
        return nil, status.Error(codes.Unauthenticated, "missing token")
    }
    
    // Validate JWT and extract claims
    claims, err := validateJWT(strings.TrimPrefix(tokens[0], "Bearer "))
    if err != nil {
        return nil, status.Error(codes.Unauthenticated, "invalid token")
    }
    
    // Add claims to context for downstream use
    ctx = context.WithValue(ctx, "claims", claims)
    return handler(ctx, req)
}`}
          />

          <CodeBlock 
            title="Role-Based Authorization Interceptor"
            code={`func RBACInterceptor(
    ctx context.Context,
    req interface{},
    info *grpc.UnaryServerInfo,
    handler grpc.UnaryHandler,
) (interface{}, error) {
    // Get claims from context (set by auth interceptor)
    claims := ctx.Value("claims").(*Claims)
    
    // Define method -> required roles mapping
    requiredRole := methodRoles[info.FullMethod]
    if requiredRole == "" {
        return handler(ctx, req) // No role required
    }
    
    // Check if user has required role
    if !hasRole(claims.Roles, requiredRole) {
        return nil, status.Errorf(
            codes.PermissionDenied,
            "role %s required for %s",
            requiredRole, info.FullMethod,
        )
    }
    
    return handler(ctx, req)
}

// Chain interceptors: auth first, then RBAC
server := grpc.NewServer(
    grpc.ChainUnaryInterceptor(AuthInterceptor, RBACInterceptor),
)`}
          />
        </div>
      </section>

      {/* Service-to-Service Auth */}
      <section>
        <SectionHeader 
          icon="🔗" 
          title="Service-to-Service Authentication" 
          subtitle="Identity propagation and trust in microservices"
        />
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <ConceptCard title="Service Accounts" icon="🤖">
              <p>Each service has its own identity (certificate or token) for outbound calls.</p>
              <Badge className="mt-2 bg-violet-500/20 text-violet-300 border-violet-500/50">Kubernetes SA</Badge>
            </ConceptCard>
            
            <ConceptCard title="Identity Propagation" icon="🔀">
              <p>Pass original user identity through service chain for audit and authorization.</p>
              <Badge className="mt-2 bg-purple-500/20 text-purple-300 border-purple-500/50">JWT Forwarding</Badge>
            </ConceptCard>
            
            <ConceptCard title="Service Mesh" icon="🕸️">
              <p>Sidecar proxies handle mTLS automatically (Istio, Linkerd).</p>
              <Badge className="mt-2 bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/50">Zero-Trust</Badge>
            </ConceptCard>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-foreground mb-4">🏗️ Authentication Strategies Comparison</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground">Strategy</th>
                      <th className="text-left py-2 text-foreground">Pros</th>
                      <th className="text-left py-2 text-foreground">Cons</th>
                      <th className="text-left py-2 text-foreground">Use When</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-3 font-medium text-foreground">mTLS Only</td>
                      <td className="py-3">Strong identity, no tokens to manage</td>
                      <td className="py-3">Cert management overhead</td>
                      <td className="py-3">Internal services, service mesh</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 font-medium text-foreground">JWT + mTLS</td>
                      <td className="py-3">User context + service identity</td>
                      <td className="py-3">More complexity</td>
                      <td className="py-3">User-initiated requests</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 font-medium text-foreground">API Keys</td>
                      <td className="py-3">Simple to implement</td>
                      <td className="py-3">No standard rotation, less secure</td>
                      <td className="py-3">Legacy systems, simple cases</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-foreground">SPIFFE/SPIRE</td>
                      <td className="py-3">Automated identity, cloud-native</td>
                      <td className="py-3">Operational complexity</td>
                      <td className="py-3">Large-scale microservices</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <CodeBlock 
            title="Identity Propagation Pattern"
            code={`// Service A receives user request, calls Service B
func (s *ServiceA) ProcessOrder(ctx context.Context, req *OrderRequest) (*Response, error) {
    // Original JWT is in context from auth interceptor
    userToken := ctx.Value("user_token").(string)
    
    // Create outgoing context with both:
    // 1. User identity (for authorization decisions)
    // 2. Service identity (mTLS handles this automatically)
    outCtx := metadata.AppendToOutgoingContext(ctx,
        "x-user-token", userToken,           // Original user
        "x-request-id", uuid.NewString(),    // Correlation
        "x-caller-service", "service-a",     // Audit trail
    )
    
    // Call Service B - mTLS authenticates Service A
    // Service B can authorize based on user OR service identity
    resp, err := s.serviceBClient.ValidateInventory(outCtx, &InventoryReq{...})
    ...
}`}
          />
        </div>
      </section>

      {/* SPIFFE/SPIRE Section */}
      <section>
        <SectionHeader 
          icon="🪪" 
          title="SPIFFE & SPIRE" 
          subtitle="Standardized workload identity for cloud-native environments"
        />
        
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                <TechTooltip 
                  triggerText="SPIFFE"
                  content="Secure Production Identity Framework For Everyone - a set of standards for identifying and securing workloads. Uses SPIFFE IDs (URIs like spiffe://trust-domain/workload-id) and SVIDs (SPIFFE Verifiable Identity Documents) for cryptographic proof of identity."
                /> provides a standard for workload identity, while{" "}
                <TechTooltip 
                  triggerText="SPIRE"
                  content="SPIFFE Runtime Environment - the reference implementation of SPIFFE. It automatically issues and rotates short-lived certificates (SVIDs) to workloads based on attestation policies."
                /> is the runtime that implements it. Together, they solve certificate management at scale.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-foreground mb-2">SPIFFE ID Format</h5>
                  <code className="text-sm bg-muted px-3 py-2 rounded block text-accent">
                    spiffe://trust-domain/path/to/workload
                  </code>
                  <p className="text-xs text-muted-foreground mt-2">
                    Example: spiffe://payments.example.com/service/ledger
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-2">Key Benefits</h5>
                  <BulletList items={[
                    "Automatic cert rotation (short-lived SVIDs)",
                    "Platform-agnostic identity",
                    "Workload attestation (prove you are who you claim)",
                    "No secrets in config files"
                  ]} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <SectionHeader icon="✅" title="Best Practices" />
        
        <div className="grid md:grid-cols-2 gap-4">
          <ConceptCard title="Defense in Depth" icon="🛡️" variant="success">
            <BulletList items={[
              "Combine mTLS with application-level auth",
              "Validate both service AND user identity",
              "Use network policies as additional layer",
              "Encrypt sensitive fields even over mTLS"
            ]} />
          </ConceptCard>
          
          <ConceptCard title="Fail Secure" icon="🚫" variant="warning">
            <BulletList items={[
              "Default deny - require explicit allow",
              "Reject requests with missing/invalid creds",
              "Don't leak auth failure details",
              "Log all auth failures for monitoring"
            ]} />
          </ConceptCard>
          
          <ConceptCard title="Interceptor Chain Order" icon="📋" variant="info">
            <BulletList items={[
              "1. Rate limiting (protect from abuse)",
              "2. Authentication (who are you?)",
              "3. Authorization (can you do this?)",
              "4. Audit logging (record access)"
            ]} />
          </ConceptCard>
          
          <ConceptCard title="Token Handling" icon="🎟️" variant="info">
            <BulletList items={[
              "Use short-lived tokens (minutes, not days)",
              "Implement token refresh before expiry",
              "Cache validated tokens briefly",
              "Support token revocation for emergencies"
            ]} />
          </ConceptCard>
        </div>
      </section>

      {/* Quiz Section */}
      <section>
        <SectionHeader icon="🧠" title="Test Your Knowledge" />
        <GrpcAuthQuiz />
      </section>
    </div>
  );
};

const GrpcAuthQuiz = () => {
  const questions = [
    {
      question: "What is the key difference between TLS and mTLS?",
      options: [
        "mTLS uses stronger encryption algorithms",
        "In mTLS, both client and server authenticate each other with certificates",
        "mTLS only works with gRPC, not REST",
        "TLS encrypts data while mTLS only authenticates"
      ],
      correctIndex: 1,
      explanation: "In standard TLS, only the client verifies the server's certificate. In mutual TLS (mTLS), both parties present and verify certificates, ensuring bidirectional authentication."
    },
    {
      question: "What gRPC component is best suited for implementing authentication logic?",
      options: [
        "Service definitions",
        "Protocol buffers",
        "Interceptors",
        "Metadata only"
      ],
      correctIndex: 2,
      explanation: "Interceptors are middleware that execute before/after RPC calls, making them ideal for cross-cutting concerns like authentication and authorization without polluting business logic."
    },
    {
      question: "In a microservices architecture, why is identity propagation important?",
      options: [
        "To reduce network latency",
        "To maintain the original user context through the service chain for authorization and audit",
        "To encrypt data between services",
        "To reduce the number of certificates needed"
      ],
      correctIndex: 1,
      explanation: "Identity propagation passes the original user identity through the service chain, allowing downstream services to make authorization decisions and maintain audit trails based on who initiated the request."
    },
    {
      question: "What does SPIFFE provide?",
      options: [
        "A database for storing credentials",
        "A standardized framework for workload identity",
        "A replacement for TLS encryption",
        "A load balancing protocol"
      ],
      correctIndex: 1,
      explanation: "SPIFFE (Secure Production Identity Framework For Everyone) provides a set of standards for identifying and securing workloads using SPIFFE IDs and SVIDs (verifiable identity documents)."
    },
    {
      question: "What is the correct order for interceptors in a gRPC server?",
      options: [
        "Authorization → Authentication → Rate Limiting → Logging",
        "Logging → Authentication → Authorization → Rate Limiting",
        "Rate Limiting → Authentication → Authorization → Logging",
        "Authentication → Rate Limiting → Logging → Authorization"
      ],
      correctIndex: 2,
      explanation: "The correct order is: Rate limiting first (to protect from abuse), then authentication (who are you?), then authorization (can you do this?), and finally logging (record access)."
    },
    {
      question: "How does a service mesh like Istio simplify gRPC authentication?",
      options: [
        "By removing the need for any authentication",
        "By handling mTLS automatically through sidecar proxies",
        "By replacing gRPC with REST",
        "By storing all passwords centrally"
      ],
      correctIndex: 1,
      explanation: "Service meshes use sidecar proxies to automatically handle mTLS between services, abstracting away certificate management and making zero-trust networking easier to implement."
    },
    {
      question: "What is the main challenge with mTLS at scale?",
      options: [
        "High CPU usage for encryption",
        "Certificate management (rotation, distribution, revocation)",
        "Incompatibility with HTTP/2",
        "Lack of logging capabilities"
      ],
      correctIndex: 1,
      explanation: "Certificate management is the primary challenge with mTLS at scale - certificates expire and need rotation, must be securely distributed to all services, and compromised certs need revocation mechanisms."
    },
    {
      question: "Why should authentication interceptors return generic error messages?",
      options: [
        "To reduce response payload size",
        "To prevent leaking information about valid vs invalid credentials",
        "To comply with gRPC specifications",
        "To improve performance"
      ],
      correctIndex: 1,
      explanation: "Generic error messages prevent attackers from learning whether a username exists, a token format is valid, etc. Detailed errors can be exploited for enumeration attacks."
    },
    {
      question: "What is a SPIFFE SVID?",
      options: [
        "A type of database index",
        "A cryptographic document that proves workload identity",
        "A service discovery protocol",
        "A load balancer configuration"
      ],
      correctIndex: 1,
      explanation: "SVID (SPIFFE Verifiable Identity Document) is a cryptographic document (usually an X.509 certificate or JWT) that proves a workload's identity and can be verified by other workloads."
    },
    {
      question: "When should you use JWT + mTLS instead of mTLS alone?",
      options: [
        "When you need faster authentication",
        "When you need to propagate user context through service calls",
        "When services are in different data centers",
        "When using REST instead of gRPC"
      ],
      correctIndex: 1,
      explanation: "JWT + mTLS is ideal when you need both service identity (mTLS) and user context (JWT). mTLS authenticates the calling service, while the JWT carries information about the end user for authorization decisions."
    },
    {
      question: "What gRPC status code should be returned for authentication failures?",
      options: [
        "codes.NotFound",
        "codes.Unauthenticated",
        "codes.InvalidArgument",
        "codes.Internal"
      ],
      correctIndex: 1,
      explanation: "codes.Unauthenticated (equivalent to HTTP 401) should be returned when authentication fails. codes.PermissionDenied (HTTP 403) is for authorization failures when the user is authenticated but not authorized."
    },
    {
      question: "Why are short-lived tokens preferred over long-lived tokens?",
      options: [
        "They're faster to validate",
        "They reduce the window of opportunity if a token is compromised",
        "They use less memory",
        "They're required by gRPC specification"
      ],
      correctIndex: 1,
      explanation: "Short-lived tokens limit the damage from token theft. If compromised, the token becomes invalid quickly (minutes vs days), reducing the attacker's window to exploit it."
    }
  ];

  return <Quiz questions={questions} title="gRPC Authentication Patterns Quiz" />;
};

export default GrpcAuthContent;
