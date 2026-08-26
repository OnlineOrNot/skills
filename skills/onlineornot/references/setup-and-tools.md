# Setup And Tools

Read this reference when OnlineOrNot MCP tools are missing, authentication fails,
or the client exposes an unfamiliar MCP interface.

## Connection

The remote endpoint is:

```text
https://mcp.onlineornot.com/mcp
```

The protected-resource metadata at the endpoint supports OAuth discovery. Use
the client's normal MCP authentication flow. Current client-specific guidance is
linked from `https://onlineornot.com/llms.txt`.

When manual configuration is required, add an HTTP MCP server named
`onlineornot` with the endpoint above. Configuration field names vary by client,
so retrieve the current client documentation instead of guessing its file format.

## Authentication

1. Initiate the MCP client's OAuth flow.
2. Let the user choose and authorize their OnlineOrNot organisation.
3. Verify access with a read-only list operation.
4. Continue only after the operation returns the intended organisation's data.

Do not ask the user to paste tokens into chat. If a client cannot use OAuth,
direct the user to `https://onlineornot.com/docs/reference/mcp` for supported
alternatives.

## Tool Discovery

### Code Mode

Code Mode exposes a specification search tool and an execution tool. Search is
read-only and should happen before execution. Search for actual paths, tags, and
operation summaries, then inspect the selected operation's parameters and body
schema.

### Generated Endpoint Tools

Some clients use `?codemode=false` and expose one tool per API endpoint. Select
the narrow endpoint, inspect its input schema, and call it directly. Avoid loading
or describing unrelated endpoint schemas.

## Failure Handling

| Failure | Action |
| --- | --- |
| No OnlineOrNot server | Help configure the MCP endpoint, then stop until connected |
| Authentication required | Start OAuth and wait for user completion |
| Forbidden operation | Explain the missing permission; do not request broader access automatically |
| Validation error | Re-read the live operation schema and correct only invalid fields |
| Not found | Re-list resources and verify organisation plus identifier |
| Service error | Report the status and safe response detail; avoid blind retries of mutations |

After an ambiguous network failure during a mutation, retrieve or list resources
before retrying. The original operation may have succeeded.
