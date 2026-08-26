# Browser Checks

Read this reference when the user wants to monitor a rendered page, interaction,
login, signup, checkout, or another browser journey with Playwright.

## Design The Journey

1. Identify the single customer outcome the check must prove.
2. Inspect application routes and existing Playwright tests when repository
   access is available.
3. Confirm the deployed base URL. Never substitute localhost or infer a
   production hostname.
4. Choose a URL-based browser check for page-load coverage or a scripted check
   for an interaction.
5. Keep the journey short. Stop after the first stable assertion that proves the
   outcome.

## Script Rules

- Use Playwright Test syntax accepted by the current OnlineOrNot browser-check
  schema and documentation.
- Prefer role, label, placeholder, and test-id locators over CSS structure or
  generated class names.
- Assert user-visible outcomes rather than implementation details.
- Wait on observable page states through Playwright assertions instead of fixed
  sleeps.
- Make setup data unique when the journey creates records.
- Avoid destructive production journeys unless the user provides an isolated
  synthetic account and cleanup strategy.
- Keep third-party dependencies and cross-origin interactions outside the
  journey unless they are explicitly part of the monitored outcome.

## Credentials

Never copy credentials from repository environment files, browser profiles,
fixtures, logs, or chat history into a script. Before creating an authenticated
check, establish a user-approved synthetic identity and a supported secret
delivery mechanism. If the current OnlineOrNot schema does not provide an
appropriate mechanism, explain the limitation and create an unauthenticated
check or stop.

Avoid scripts that print cookies, tokens, authorization headers, form values, or
page content that may contain personal data.

## Create And Verify

1. List current browser checks and detect equivalent target plus journey.
2. Search the MCP specification for the typed browser-check operation.
3. Read the current body schema and supported runtime/script fields.
4. Show the proposed journey, target, assertions, schedule, and regions.
5. Create or update the check.
6. Verify the mutation response or a redacted follow-up response. Avoid a detail
   operation when it can return scripts, credentials, headers, or other stored
   secret material to the model.

If the public API does not expose on-demand execution, do not claim the journey
has passed. Distinguish successful configuration from successful execution.
