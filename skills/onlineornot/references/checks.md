# HTTP, DNS, And TCP Checks

Read this reference for uptime checks, API checks, website checks, DNS record
monitoring, TCP connectivity, or broad monitoring setup.

## Choose The Narrowest Check

| Need | Check type |
| --- | --- |
| Verify an HTTP endpoint, status, content, or JSON property | HTTP uptime |
| Exercise a browser-rendered user journey | Browser; read `browser-checks.md` |
| Resolve and validate a DNS record | DNS |
| Open a TCP connection or validate a TCP payload | TCP |
| Confirm a scheduled job completes | Heartbeat; read `heartbeats.md` |

Prefer a narrow protocol check when it proves the requirement. Browser checks
are appropriate when browser behavior itself is part of the requirement.

## Configuration Workflow

1. Establish the production target. Inspect the repository for candidates, but
   ask for the deployed hostname when it is not explicit.
2. List existing checks and follow pagination. Match by normalized target and
   check type before name alone.
3. Search the MCP specification for the typed create or update operation for the
   selected check type.
4. Inspect the current schema for required fields, assertions, intervals,
   regions, timeout, confirmation, recovery, and alert associations.
5. Propose the smallest check that proves the user's requirement.
6. Execute the typed operation and verify from its response or a redacted list
   response. Use a detail endpoint only when its response is confirmed to redact
   stored headers, passwords, cookies, and other secrets.

Use typed HTTP, DNS, TCP, and browser operations rather than a legacy generic
check operation when the typed operation is available.

## HTTP Checks

- Use a stable health or readiness endpoint when the goal is service health.
- Add a content or JSON assertion when a successful status alone could mask a
  broken dependency or error page.
- Use the HTTP method, headers, body, redirect, TLS, and authentication fields
  supported by the current schema.
- Keep secret header values out of source files and the completion report. Ask
  the user to approve the intended secret source before configuring one.
- Avoid monitoring endpoints that cause mutations unless the user explicitly
  designed them for synthetic checks.

## DNS Checks

- Confirm the record name and record type.
- Use a custom resolver only when the user needs resolver-specific behavior.
- Compare expected record data according to the live assertion schema.
- Do not infer that a DNS record should equal an address found in local or stale
  infrastructure files.

## TCP Checks

- Confirm hostname and port independently.
- Use payload assertions only when the protocol and expected response are safe
  and stable.
- Treat an open port as connectivity evidence, not application correctness.

## Bulk Changes

For bulk interval, region, alert, pause, or mute changes:

1. List every matching check and show the exact selection rule.
2. Display the count and proposed field-level change.
3. Obtain explicit confirmation.
4. Update one check first when failure impact is material.
5. Verify all updated resources through mutation or redacted list responses and
   report partial failures individually.

Deletion always requires a fresh confirmation after previewing the resolved
check identifiers, even when the initial request named them explicitly.
