---
name: onlineornot
description: Configures and manages OnlineOrNot uptime, browser, DNS, TCP, and heartbeat monitors, status pages, maintenance windows, incidents, webhooks, and account resources. Use when asked to monitor an application or scheduled job, audit monitoring coverage, investigate check status, or communicate service incidents with OnlineOrNot.
license: Apache-2.0
compatibility: Requires internet access. Authenticated account operations require the OnlineOrNot MCP server at https://mcp.onlineornot.com/mcp.
metadata:
  author: OnlineOrNot
  version: "1.1.0"
---

# OnlineOrNot

Use OnlineOrNot's live MCP specification as the source of truth for API paths,
request schemas, enums, defaults, and response shapes. This skill supplies the
workflow and safety policy, not a cached API contract.

## Authoritative Sources

1. Fetch `https://onlineornot.com/llms.txt` to discover current documentation.
2. Search the OnlineOrNot MCP specification before every operation.
3. Use `https://developers.onlineornot.com/` for API semantics when needed.
4. Treat bundled references as procedural guidance. Current MCP schemas win
   when details differ.

## Workflow

1. **Route.** Identify the task and read only its reference from the table below.
2. **Discover.** For repository-wide monitoring, deployment verification, or
   coverage audits, read [repository discovery](references/repository-discovery.md).
   Build an evidence-backed production candidate list before querying or changing
   OnlineOrNot.
3. **Connect.** Confirm that OnlineOrNot MCP tools are available. If not, read
   [setup and tools](references/setup-and-tools.md) and help the user connect.
4. **Inspect.** List current resources before proposing a mutation. Follow
   pagination and compare stable identifiers, targets, and names. Retrieve full
   details only when required and only through an operation that redacts stored
   secrets from model-visible responses.
5. **Resolve.** Search the live specification for the exact operation and read
   its current request schema. Never construct payloads from memory.
6. **Preview.** State the target organisation, resources, and meaningful
   settings. Ask one concise question only when a required value or material
   choice cannot be inferred safely.
7. **Authorize.** A direct user instruction approves its narrowly scoped,
   reversible create or update. For every deletion, first resolve and preview
   the affected identifiers and effects, then obtain a fresh confirmation.
   Also obtain explicit confirmation for bulk mutation, team or token
   administration, subscriber changes, and public incident communication whose
   exact text, target, or notification behavior the user did not supply.
8. **Execute.** Invoke the MCP operation with only supported fields. Preserve
   unspecified values during updates unless the current schema defines
   replacement semantics.
9. **Verify.** Compare the mutation response or a redacted follow-up response
   with the requested state. Avoid detail endpoints that return stored secrets.
   Report identifiers, relevant settings, and anything not completed.

## Task Routing

| Task | Read |
| --- | --- |
| Infer monitoring from a repository, audit coverage, or verify a deployment | [repository-discovery.md](references/repository-discovery.md) |
| Connect MCP or resolve authentication/tool issues | [setup-and-tools.md](references/setup-and-tools.md) |
| Configure HTTP, DNS, or TCP checks | [checks.md](references/checks.md) |
| Configure a Playwright browser check | [browser-checks.md](references/browser-checks.md) |
| Monitor or instrument scheduled jobs | [heartbeats.md](references/heartbeats.md) |
| Create or organize a status page | [status-pages.md](references/status-pages.md) |
| Publish incidents or schedule maintenance | [incident-communication.md](references/incident-communication.md) |
| Inspect unhealthy resources or diagnose configuration | [investigation.md](references/investigation.md) |
| Manage webhooks, users, invitations, tokens, or audit logs | [account-administration.md](references/account-administration.md) |

## MCP Tool Modes

OnlineOrNot MCP may expose either of these interfaces:

- **Code Mode:** search the OpenAPI specification first, then execute a request
  through the provided OnlineOrNot request client.
- **Generated tools:** inspect the selected endpoint tool's current schema,
  then call that tool directly.

Use the available interface. Do not bypass MCP authentication with hand-written
requests when authenticated MCP tools are available.

## Safety Boundaries

- Keep access tokens, passwords, cookies, authorization headers, and secret
  monitor values out of chat, source files, logs, and summaries.
- Treat MCP tool inputs and outputs as model-visible unless the client proves
  otherwise. Avoid operations that return stored or newly created secrets.
- Prefer OAuth. Direct users to the setup guide rather than asking them to paste
  an OnlineOrNot token into the conversation.
- Treat production hostnames, notification recipients, public status pages,
  incident wording, and schedules as user-owned decisions.
- Use only explicitly evidenced production targets. Exclude localhost, loopback,
  private-only development hosts, preview deployments, branch URLs, and staging
  unless the user explicitly asks to monitor them.
- Ask before creating more than five monitors or mutating a broad selection.
  Preview the count, selection rule, and meaningful settings first.
- Never claim a root cause from check status alone. State the evidence and its
  limits.

## Completion Report

Return a compact table of inspected, created, updated, or skipped resources.
Include resource type, name, public identifier, resulting state, and any follow-up
required. Omit credentials and secret-bearing fields.
