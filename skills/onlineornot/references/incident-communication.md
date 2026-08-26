# Incident Communication And Maintenance

Read this reference before creating or updating status-page incidents, incident
updates, scheduled status-page maintenance, or monitor maintenance windows.

## Evidence First

1. Retrieve the affected checks or heartbeats and their current status.
2. Retrieve the target status page, components, and open incidents.
3. Separate observed facts from hypotheses.
4. Identify the customer-visible impact and affected components.

Never invent a cause, start time, scope, mitigation, or resolution. When evidence
is incomplete, use precise language such as "We are investigating" and name only
confirmed impact.

## Publication Gate

Public communication requires a preview containing:

- Target status page.
- Affected components.
- Incident state supported by the current schema.
- Exact title and message.
- Any proposed start or resolution time.
- Whether OnlineOrNot will notify status-page subscribers.

A user's direct request containing the exact target and copy authorizes that
publication only when it also specifies subscriber-notification behavior.
Otherwise obtain explicit confirmation of the preview before calling the
mutation. Set the current schema's subscriber-notification option to false when
notification was neither requested nor confirmed; do not rely on its default.

## Incident Lifecycle

1. List open incidents to avoid duplicates.
2. Search the live schema for incident and incident-update operations.
3. Create or update the incident using only supported states and fields.
4. Append chronological updates instead of rewriting history when a new event
   occurred.
5. Resolve only when the user confirms recovery or monitor evidence supports it
   and the user has authorized resolution.
6. Retrieve the incident and updates after publication.

Deleting an incident or update always requires a fresh confirmation after
previewing its resolved identifier and public effect.

## Planned Maintenance

OnlineOrNot has two related concepts. Select the one the user intends:

| Need | Resource |
| --- | --- |
| Suppress monitoring alerts for checks or heartbeats | Maintenance window |
| Communicate planned work on a public status page | Status-page scheduled maintenance |

Some update operations replace associated check or heartbeat lists. Retrieve the
current resource and send the complete intended association set when the live
schema defines replacement semantics.

Confirm time zone, start time, duration, affected resources, and public copy.
Also confirm whether status-page subscribers should be notified; set notification
off when it was not requested or confirmed.
After creation, retrieve both resources when the plan includes alert suppression
and public communication.
