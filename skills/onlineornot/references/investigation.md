# Investigation

Read this reference when the user asks what is failing, why an alert fired, or
whether monitoring configuration is correct.

## Available Evidence

Use the live MCP specification to discover what the account currently exposes.
The public surface may provide monitor configuration and current status without
detailed execution history, regional attempts, response evidence, browser
artifacts, or on-demand execution.

1. List checks and heartbeats, following pagination.
2. Filter unhealthy, pending, paused, muted, maintenance, recovering, or
   verifying states according to current schema values.
3. Use list or explicitly redacted responses for targets and statuses. Retrieve
   typed details only after confirming the operation redacts stored headers,
   passwords, cookies, scripts, request bodies, and other secret material from
   model-visible output.
4. Retrieve related maintenance windows and status-page incidents.
5. Use audit logs when the question concerns configuration changes.
6. Search the current schema for result or execution endpoints before concluding
   they are unavailable.

## Diagnosis Standard

Separate findings into:

| Category | Meaning |
| --- | --- |
| Observed | Returned directly by OnlineOrNot or another named source |
| Likely | Inference supported by stated evidence |
| Unknown | Requires execution data or system access not currently available |

Current status alone does not establish root cause. Avoid attributing an outage
to DNS, TLS, networking, deployment, or application behavior without direct
evidence.

## Safe Follow-Up

Recommend targeted local or provider diagnostics when MCP evidence is
insufficient, but do not mutate the monitor merely to test a theory. Ask before
changing intervals, assertions, regions, pause or mute state, or incident state.

Finish with the affected resource identifiers, observed statuses, configuration
risks, evidence gaps, and the next narrow diagnostic action.
