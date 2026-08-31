# OnlineOrNot Agent Skills

Official installable agent integration for [OnlineOrNot](https://onlineornot.com): production uptime monitoring, browser checks, heartbeat monitoring, DNS/TCP checks, deployment verification, status pages, maintenance windows, and incidents.

The plugin combines a portable [Agent Skill](https://agentskills.io) with the hosted [OnlineOrNot MCP server](https://mcp.onlineornot.com/). The skill teaches monitoring judgment and repository-aware workflows; MCP supplies live API schemas and authenticated operations. No API schema is copied into the prompt.

## Install

| Agent | Skill and MCP setup |
| --- | --- |
| Claude Code | Native plugin marketplace; MCP included |
| Codex | Native plugin marketplace; MCP included |
| Cursor | Agent Skill CLI plus one-click MCP install |

### Claude Code

```text
/plugin marketplace add OnlineOrNot/skills
/plugin install onlineornot@onlineornot
```

Run `/reload-plugins` after installation. Claude Code opens OnlineOrNot OAuth when the MCP server is first used.

### Codex

```bash
codex plugin marketplace add OnlineOrNot/skills
```

Open `/plugins`, choose the **OnlineOrNot** marketplace, and install **onlineornot**. Restart Codex if the skill does not appear immediately. The plugin includes the skill and remote MCP configuration.

For Codex versions without plugin marketplaces:

```bash
npx -y skills add OnlineOrNot/skills --skill onlineornot --yes --global
codex mcp add onlineornot --url https://mcp.onlineornot.com/mcp
```

### Cursor

Install the skill:

```bash
npx -y skills add OnlineOrNot/skills --skill onlineornot --yes --global
```

Then [install the OnlineOrNot MCP server in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=OnlineOrNot&config=eyJ1cmwiOiJodHRwczovL21jcC5vbmxpbmVvcm5vdC5jb20vbWNwIn0%3D), or add:

```json
{
  "mcpServers": {
    "onlineornot": {
      "url": "https://mcp.onlineornot.com/mcp"
    }
  }
}
```

The repository also conforms to the Agent Plugins 1.0 format and includes a Cursor plugin manifest for marketplace distribution.

## Try It

- “Monitor my production app. Inspect this repository, propose the smallest useful setup, and ask before creating more than five monitors.”
- “Add monitoring for what I just deployed and verify it is healthy.”
- “Set up a heartbeat for every production cron job that is not already monitored.”
- “Add a browser check that proves login works, using a dedicated synthetic account.”
- “Tell me which important production endpoints are not monitored yet.”
- “Investigate whether our site is currently down, and separate evidence from guesses.”

See [three end-to-end workflows](docs/examples.md) for expected agent behavior.

## What The Skill Does

The agent inspects deployment configuration, health routes, infrastructure, scheduled jobs, and CI/CD definitions; compares production candidates with existing OnlineOrNot resources; and proposes the smallest useful coverage. It avoids localhost and preview targets, duplicate checks, secret exposure, unnecessary browser journeys, and unsupported root-cause claims.

The canonical instructions live in [`skills/onlineornot/SKILL.md`](skills/onlineornot/SKILL.md). Detailed workflows load only when relevant to keep token use low.

## Validate

```bash
npm test
```

Validation checks all JSON manifests, Agent Plugin metadata, MCP endpoints, skill frontmatter, internal links, and ecosystem installation docs.

## Distribution

Keep this dedicated repository as the canonical package and link to it from the main OnlineOrNot repository and docs. See the [prioritized distribution plan](docs/distribution.md).

## License

Apache-2.0
