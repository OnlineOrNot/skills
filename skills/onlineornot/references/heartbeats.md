# Heartbeats

Read this reference for cron jobs, scheduled functions, queue consumers, backups,
data imports, recurring workflows, or missed-job monitoring.

## Discover Jobs

When repository access is available, search for scheduler declarations,
cron expressions, CI schedules, framework job definitions, queue consumers, and
existing heartbeat URLs. Produce a candidate list before editing code.

For each job establish:

| Field | Meaning |
| --- | --- |
| Identity | Stable human-readable job name |
| Schedule | Interval or cron expression actually used in production |
| Time zone | Scheduler's effective time zone |
| Grace | Expected runtime and acceptable lateness |
| Success point | The line after all required work commits successfully |
| Owner | Alert recipient or integration, when requested |

## Create The Monitor

1. List existing heartbeat monitors and match by job identity and schedule.
2. Search the live MCP specification for heartbeat create or update operations.
3. Use the schema-supported interval or cron representation.
4. Create the monitor and retrieve its current ping details from the response or
   current documentation. Do not construct heartbeat URLs from memory.

## Instrument The Job

- Send the success ping only after required work completes successfully.
- Keep the ping off failure paths. A `finally` block reports false success unless
  it is explicitly gated by the outcome.
- Give the ping request a bounded timeout.
- Choose whether ping-delivery failure should fail the job based on the user's
  reliability policy. Monitoring usually remains secondary to committed work.
- Store the ping URL or identifier in the project's existing environment or
  secret configuration pattern rather than hardcoding it in source.
- Preserve the job's existing error propagation and exit status.
- Add focused tests when the codebase already tests the job boundary.

If the user asks only to create a heartbeat monitor, leave application code
unchanged. If the user asks to instrument the repository, complete both the
OnlineOrNot resource and the code change, then report the required environment
variable without its value.

## Verify

Retrieve the heartbeat resource and confirm its schedule, grace behavior,
paused or muted state, and alert associations. Code instrumentation verification
does not prove the deployed job is pinging; state that deployment and first-ping
observation remain outstanding when applicable.
