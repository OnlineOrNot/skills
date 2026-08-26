# Account Administration

Read this reference for webhooks, organisation members, invitations, API tokens,
permissions, or audit logs.

## Webhooks

1. List existing webhooks and status-page associations.
2. Search the live schema for supported events and fields.
3. Confirm the destination and event scope before creation or update.
4. Keep secret query parameters and credentials out of displayed URLs.
5. Retrieve the saved webhook and report its non-secret configuration.

Deletion requires a fresh confirmation after previewing the resolved webhook.

## Members And Invitations

Listing members and pending invitations is read-only. Inviting or removing a
person changes organisation access:

1. Show the organisation, address or member identifier, and intended role.
2. Obtain explicit confirmation.
3. Invoke the narrow operation once.
4. Re-list members or invitations to verify the result.

Never infer an email address or role from repository metadata.

## API Tokens

Prefer MCP OAuth for agent access. Create or delete an API token only when the
user explicitly asks for token administration.

- Search the permissions endpoint and use least privilege.
- Preview token name and permissions before creation.
- Treat ordinary MCP tool results as model-visible. Create a token through MCP
  only when the client provides a verified response channel that keeps secret
  material outside the model transcript and logs.
- When no such channel exists, direct the user to create the token in the
  OnlineOrNot dashboard. Do not invoke the token-creation operation.
- Never place returned token material in source files, command history, chat,
  logs, or the completion summary.
- Token deletion requires a fresh confirmation after previewing the resolved
  token identifier and permissions.

## Audit Logs

Use audit logs to answer who changed account configuration and when. Follow
pagination and report relevant event metadata without exposing personal data
unrelated to the user's question. Audit evidence records an action; it does not
prove that the action caused an outage.
