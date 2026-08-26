# Status Pages

Read this reference to create or organize status pages, components, component
groups, or subscribers.

## Build From Existing Resources

1. List status pages and select by public identifier or exact name.
2. List checks and heartbeats that represent customer-visible services.
3. List the selected page's components and groups before proposing changes.
4. Map customer-facing services to existing monitor identifiers.
5. Search the MCP specification for the exact page, component, group, or ordering
   operation and inspect its current schema.

Do not expose internal service names, infrastructure topology, private hostnames,
or raw database identifiers on a public status page.

## Page Design

- Name components after capabilities customers recognize.
- Group components only when the grouping makes incident impact clearer.
- Associate each component with the narrow monitors that represent it.
- Preserve existing ordering unless the user asks for reorganization.
- Preview public names, grouping, and monitor associations before creating a new
  page or making a bulk structural change.

## Subscribers

Subscriber creation and deletion affects customer communication and personal
data. Show the target page and subscriber address, obtain explicit confirmation,
and keep addresses out of broad summaries. Never enumerate subscribers unless
the user specifically requests it and has appropriate access.

## Verification

After mutation, retrieve the page and list its components and groups. Report the
public page identifier, component associations, and ordering. Do not state that a
custom domain or subscriber delivery works unless the relevant operation or
evidence confirms it.

Read [incident communication](incident-communication.md) before publishing
incidents or scheduled maintenance.
