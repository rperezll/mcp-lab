import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ToolsSet } from "./tools";
import { ResourcesSet } from "./resources";

async function main() {
  // 🖲️ Creación del servidor MCP
  const server = new McpServer(
    {
      name: "MCP Server for Chat with SQLite",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {
          query: {
            name: "SQLite DB Query",
            description: "Ejecuta una consulta SQL en la base de datos SQLite",
            mimeType: "application/json",
          },
        },
        resources: {
          schema: {
            name: "SQLite DB Schema",
            description: "Obten el esquema de la base de datos SQLite",
            mimeType: "text/plain",
          },
        },
      },
      instructions:
        "Hola, servidor MCP permite obtener información de una base de datos SQLite",
    }
  );

  // 🛠️ Importación de los sets de herramientas
  await ToolsSet(server);

  // 🏗️ Importación de los sets de recursos
  await ResourcesSet(server);

  const transport = new StdioServerTransport();
  server.connect(transport);
}

main().catch(console.error);
