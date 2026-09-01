# Repository Discovery And Deployment Verification

Read this reference when asked to monitor a project, add monitoring after a deployment, verify deployment health, or find important production endpoints that lack coverage.

## Build A Production Candidate List

Inspect high-signal files that exist in the repository:

- README and operations documentation.
- Package and application manifests.
- Example environment files for variable names only; never open actual environment or credential files.
- Health, readiness, liveness, and public API route definitions.
- Dockerfiles and Compose configuration.
- Kubernetes manifests, Helm values, and service or ingress definitions.
- Terraform and other infrastructure-as-code, without reading state or secret variable values.
- Vercel, Netlify, Fly.io, Render, Railway, and similar deployment configuration.
- Cron, scheduled function, queue worker, and recurring job definitions.
- CI/CD workflows and deployment scripts.

For each candidate record the evidence, environment, target or job identity, customer outcome, cheapest useful check type, and confidence. A provider project name or repository name is not a hostname.

## Production Eligibility

Include a target only when repository evidence or the user identifies it as production. Exclude:

- `localhost`, loopback addresses, local ports, and development-only hostnames.
- Preview, pull-request, branch, ephemeral, and staging deployments.
- Private service addresses that OnlineOrNot cannot reach, unless the user explicitly has a supported private-connectivity setup.
- URLs assembled from guessed naming conventions.

Ask for the deployed production hostname when the evidence is ambiguous. Do not inspect environment values to resolve it.

## Propose Minimum Useful Coverage

Start with the smallest set that proves important production outcomes:

1. Prefer one HTTP check for each independently deployed public service, using a stable health or readiness endpoint when it covers critical dependencies.
2. Add a content or JSON assertion only when status alone could mask failure.
3. Add one heartbeat per important production scheduled job whose completion cannot be inferred from an HTTP check.
4. Add DNS or TCP checks only for a distinct protocol-level requirement.
5. Add a browser check only for a critical user journey that HTTP cannot prove.

Avoid creating separate checks for every route, replica, region, static asset, or deployment alias. Before any mutation, list existing OnlineOrNot resources and compare normalized URL, protocol, port, job identity, and asserted outcome. Mark each candidate as covered, partially covered, missing, intentionally skipped, or ambiguous.

Ask before creating more than five monitors. Show the exact count and settings rather than splitting a broad request into unreviewed batches.

## Deployment Verification

1. Resolve the production deployment and expected health outcome from explicit evidence.
2. Reuse an equivalent existing monitor or propose one narrow missing check.
3. Search the live MCP schema for current status, bounded result history, and any run operation.
4. Inspect fresh OnlineOrNot evidence when available. If no on-demand operation exists, distinguish successful monitor configuration from a completed post-deployment execution.
5. A direct request from the developer environment may supplement verification, but label it separately from OnlineOrNot evidence.
6. Report observed health, result timestamp and regions when available, and any evidence still pending.

After making deployment-related code changes, suggest this verification when the repository reveals a production deployment path. Never claim the deployment is healthy from configuration alone.
