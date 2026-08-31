import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const expectedMcpUrl = 'https://mcp.onlineornot.com/mcp';
const errors = [];

async function readJson(path) {
  try {
    return JSON.parse(await readFile(join(root, path), 'utf8'));
  } catch (error) {
    errors.push(`${path}: invalid JSON (${error.message})`);
    return undefined;
  }
}

async function collectFiles(directory = root) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(path)));
    else files.push(path);
  }
  return files;
}

function expect(condition, message) {
  if (!condition) errors.push(message);
}

const files = await collectFiles();
for (const file of files.filter((path) => path.endsWith('.json'))) {
  await readJson(relative(root, file));
}

const portablePlugin = await readJson('plugin.json');
expect(
  portablePlugin?.$schema ===
    'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json',
  'plugin.json: unsupported Agent Plugins schema',
);
expect(portablePlugin?.name === 'onlineornot', 'plugin.json: name must be onlineornot');
expect(portablePlugin?.repository === 'https://github.com/OnlineOrNot/skills', 'plugin.json: canonical repository is missing');

const portableMcp = await readJson('mcp.json');
expect(
  portableMcp?.$schema ===
    'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json',
  'mcp.json: unsupported Agent Plugins MCP schema',
);
expect(
  portableMcp?.mcpServers?.onlineornot?.type === 'streamable-http',
  'mcp.json: OnlineOrNot must use streamable-http',
);
expect(
  portableMcp?.mcpServers?.onlineornot?.url === expectedMcpUrl,
  'mcp.json: unexpected OnlineOrNot endpoint',
);

for (const path of ['.mcp.json', 'mcp.json']) {
  const config = await readJson(path);
  expect(
    config?.mcpServers?.onlineornot?.url === expectedMcpUrl,
    `${path}: unexpected OnlineOrNot endpoint`,
  );
}

for (const path of [
  '.claude-plugin/plugin.json',
  '.codex-plugin/plugin.json',
  '.cursor-plugin/plugin.json',
]) {
  const manifest = await readJson(path);
  expect(manifest?.name === 'onlineornot', `${path}: name must be onlineornot`);
  expect(Boolean(manifest?.description), `${path}: description is required`);
}

const skillPath = 'skills/onlineornot/SKILL.md';
const skill = await readFile(join(root, skillPath), 'utf8');
expect(skill.startsWith('---\n'), `${skillPath}: frontmatter must start on line 1`);
const frontmatterEnd = skill.indexOf('\n---\n', 4);
expect(frontmatterEnd > 0, `${skillPath}: frontmatter is not closed`);
const frontmatter = frontmatterEnd > 0 ? skill.slice(4, frontmatterEnd) : '';
expect(/^name: onlineornot$/m.test(frontmatter), `${skillPath}: name must match its directory`);
expect(/^description: .{50,}$/m.test(frontmatter), `${skillPath}: description must include useful triggers`);
expect(skill.split('\n').length <= 200, `${skillPath}: keep the canonical skill at or below 200 lines`);

const markdownLink = /\[[^\]]+\]\(([^)]+)\)/g;
for (const file of files.filter((path) => path.endsWith('.md'))) {
  const content = await readFile(file, 'utf8');
  for (const match of content.matchAll(markdownLink)) {
    const target = match[1].split('#', 1)[0];
    if (!target || /^(?:https?:|cursor:|mailto:)/.test(target)) continue;
    const resolved = resolve(dirname(file), target);
    try {
      await stat(resolved);
    } catch {
      errors.push(`${relative(root, file)}: broken link ${match[1]}`);
    }
  }
}

const readme = await readFile(join(root, 'README.md'), 'utf8');
for (const ecosystem of ['Claude Code', 'Codex', 'Cursor']) {
  expect(readme.includes(`### ${ecosystem}`), `README.md: missing ${ecosystem} installation instructions`);
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Validated ${files.length} files and all OnlineOrNot plugin surfaces.`);
