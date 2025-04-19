import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { ToolsSet } from "./tools";
import { ResourcesSet } from "./resources";
import { PromptsSet } from "./prompts";

async function main() {
  // 🖲️ Creación del servidor MCP
  const server = new McpServer(
    {
      name: "MCP Server for Dummies",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
        resources: {},
        prompts: {},
      },
      instructions:
        "Soy un servidor MCP que expone herramientas, recursos y prompts de ejemplo.",
    }
  );

  // 🛠️ Importación de los sets de herramientas
  await ToolsSet(server);

  // 🏗️ Importación de los sets de recursos
  await ResourcesSet(server);

  // 🤖 Importación de los sets de prompts
  await PromptsSet(server);

  const transport = new StdioServerTransport();
  server.connect(transport);
}

main().catch(console.error);
