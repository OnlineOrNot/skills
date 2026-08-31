# Distribution Plan

## Repository Decision

Keep `OnlineOrNot/skills` as the canonical repository. A dedicated repository gives Claude Code, Codex, Cursor, Agent Skills installers, marketplaces, and search engines one stable package root without coupling releases to the OnlineOrNot monorepo. The main repository should advertise and pin the canonical skill, not duplicate it.

## Prioritized Follow-Up

1. **Publish the repository metadata.** Add the GitHub description “Official OnlineOrNot Agent Skill and MCP plugin for Claude Code, Codex, Cursor, and compatible agents,” set the website to `https://onlineornot.com/docs/reference/mcp`, and add topics such as `agent-skills`, `claude-code`, `codex`, `cursor`, `mcp`, `uptime-monitoring`, and `synthetic-monitoring`.
2. **Submit the existing plugin to Cursor Marketplace.** The repository already carries Cursor and portable Agent Plugin manifests. Marketplace presence removes the remaining two-step Cursor installation.
3. **Submit to the public Claude plugin directory and Codex universal plugin directory.** Keep direct marketplace installation available while review is pending.
4. **Add first-party install links to product docs and the MCP landing page.** Link the GitHub repository, Claude commands, Codex marketplace command, Cursor skill command, and Cursor MCP deep link from one canonical page.
5. **Keep discovery metadata pinned and automated.** Update `/.well-known/agent-skills/index.json` to each released skill commit and digest. Add a release workflow or bot PR so the pin cannot silently drift.
6. **List the integration in agent directories.** Prioritize official Claude, Codex, and Cursor directories, then Agent Skills indexes and `cursor.directory`. Use the same description and canonical GitHub URL.
7. **Add an optional installer only if two-step setup remains a measured problem.** A small `npx @onlineornot/agent install` could detect the current client and install both skill and MCP configuration, but marketplace-native installation should come first.

## Packaging Choices

- **npm:** not required for the skill itself; Git repositories are the native distribution unit. Use npm only for a future cross-client installer.
- **Homebrew:** not useful for instruction and MCP-only integrations. Reserve it for the OnlineOrNot CLI.
- **Main product docs:** host installation and authentication how-to guides, while this repository owns versioned agent instructions and manifests.
- **API docs:** remain the source for endpoint semantics. The skill should continue searching MCP's live OpenAPI catalog rather than embedding schemas.

## Product And API Gaps

- Cursor requires separate skill and MCP installation until the plugin is accepted into a marketplace.
- The public API exposes bounded check-result history but no explicit on-demand check execution endpoint, so an agent cannot always force immediate post-deployment verification.
- Authenticated browser workflows need a model-safe secret-injection mechanism. Until one is documented and exposed, the skill must stop rather than copy credentials into scripts or MCP inputs.
- Discovery metadata pins a commit and digest manually; release automation would prevent stale public pointers.
- Repository-to-monitor coverage is necessarily inferred client-side. A future dry-run or declarative monitor-plan API could make previews and idempotent bulk setup safer, but is not required for the first release.
