# OnlineOrNot Skills

Official [Agent Skills](https://agentskills.io) for monitoring applications and
managing incidents with [OnlineOrNot](https://onlineornot.com).

The skills provide OnlineOrNot-specific workflows and safety rules. The remote
[OnlineOrNot MCP server](https://mcp.onlineornot.com/) provides current API
schemas and authenticated account operations.

## Install

### Claude Code

```text
/plugin marketplace add OnlineOrNot/skills
/plugin install onlineornot@onlineornot
```

Restart Claude Code or run `/reload-plugins` after installation.

### Other agents

Install the skills globally with the Agent Skills CLI:

```bash
npx -y skills add OnlineOrNot/skills --skill '*' --yes --global
```

The Agent Skills CLI installs skill files only. Configure the OnlineOrNot MCP
endpoint separately for your client:

```json
{
  "mcpServers": {
    "onlineornot": {
      "url": "https://mcp.onlineornot.com/mcp"
    }
  }
}
```

OAuth starts when the agent first connects. See the
[MCP setup guide](https://onlineornot.com/docs/how-to/mcp/connect) for
client-specific instructions.

## Use

The `onlineornot` skill loads automatically for OnlineOrNot tasks. Example
requests:

- "Create an uptime check for https://example.com."
- "Monitor our login flow with a browser check."
- "Add heartbeat monitoring to the scheduled jobs in this repository."
- "Create a status page for these production services."
- "Publish an incident update for the API outage."
- "Show me which checks are currently unhealthy."

## How It Stays Current

The installed skill contains workflow guidance, not copied API schemas. Agents
must search the live OnlineOrNot MCP specification before making API calls and
prefer current documentation discovered through
[OnlineOrNot's documentation index](https://onlineornot.com/llms.txt).

## License

Apache-2.0
