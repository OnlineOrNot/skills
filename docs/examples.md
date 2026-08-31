# End-to-End Examples

These examples describe expected behavior, not fixed API payloads. The agent searches the live OnlineOrNot MCP specification before each operation.

## Monitor A Production Application

**Prompt**

> Monitor my production app. Inspect this repository and propose the smallest useful setup.

**Expected workflow**

1. Inspect deployment manifests, README, example environment keys, health routes, infrastructure, scheduled jobs, and CI/CD configuration without opening secret-bearing environment files.
2. Identify only explicitly production targets. Exclude localhost, preview deployments, branch URLs, and staging unless the user asks for them.
3. List existing OnlineOrNot checks and heartbeats, normalize their targets, and mark duplicate coverage.
4. Propose the narrowest set: usually one HTTP health check per public service plus heartbeats for important production jobs. Add DNS, TCP, or browser checks only when they prove a distinct requirement.
5. Preview targets, assertions, intervals, and the number of resources. Ask before creating more than five monitors.
6. Search the live MCP schema, create approved missing resources, retrieve redacted state, and report created, existing, and skipped candidates.

## Add Monitoring After A Deployment

**Prompt**

> Add monitoring for what I just deployed and verify it is healthy.

**Expected workflow**

1. Resolve the production deployment target from explicit deployment output or repository configuration; ask when only a provider project name or preview URL is available.
2. Reuse an equivalent existing uptime check. Otherwise propose one inexpensive HTTP check against a stable health or readiness endpoint.
3. Create the check only after showing what it proves. Do not replace it with a browser check unless browser behavior is required.
4. Inspect current OnlineOrNot status and bounded result history when available. If the API has no on-demand run, state that configuration succeeded but a fresh OnlineOrNot execution is still pending.
5. Optionally make a direct non-secret request to the deployed endpoint when the user's environment permits it, labeling that as local verification rather than an OnlineOrNot result.
6. Report observed health, remaining evidence gaps, and the new or reused monitor identifier.

## Investigate And Communicate An Outage

**Prompt**

> Is our API currently down? If it is, post an incident update to our status page.

**Expected workflow**

1. Retrieve the API monitor, bounded recent results, maintenance windows, and open status-page incidents.
2. Separate observed state from likely explanations and unknown root cause. Never infer a database, DNS, TLS, network, or deployment cause without direct evidence.
3. Identify the public status page and customer-facing component. Avoid duplicate incidents.
4. Preview the exact title, message, state, affected component, and subscriber-notification choice. Obtain confirmation for any public wording or notification behavior the user did not provide.
5. Publish through the current incident schema, retrieve the incident and updates, and report the public identifier without exposing internal or secret fields.
