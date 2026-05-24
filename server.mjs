import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "gh600-study-server",
  version: "1.0.0"
});

server.tool(
  "get_timestamp",
  "Returns the current date and time in ISO format",
  {},
  async () => ({
    content: [{ type: "text", text: new Date().toISOString() }]
  })
);

server.tool(
  "get_repo_summary",
  "Returns a summary of a GitHub repo including name and description",
  { repo: z.string().describe("Repository name in owner/repo format") },
  async ({ repo }) => ({
    content: [{ type: "text", text: `Repo requested: ${repo} at ${new Date().toISOString()}` }]
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);