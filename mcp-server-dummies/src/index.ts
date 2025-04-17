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

  // tools: {
  //   "update-user-goal": {
  //     name: "Update User Goal",
  //     description: "Actualiza el objetivo de un usuario",
  //     mimeType: "application/json",
  //   },
  // },
  // resources: {
  //   "fetch-weather": {
  //     name: "Fetch Weather",
  //     description: "Obten el clima a partir del nombre de una ciudad",
  //     mimeType: "text/plain",
  //   },
  //   "fetch-users": {
  //     name: "Fetch Users",
  //     description:
  //       "Obten información sobre usuarios del sistema a parir del nombre",
  //     mimeType: "text/plain",
  //   },
  // },
  // prompts: {
  //   "generate-training-plan": {
  //     name: "Generate Training Plan",
  //     description:
  //       "Genera un prompt para un plan de entrenamiento personalizado",
  //     mimeType: "text/plain",
  //   },
  //   "generate-diet-plan": {
  //     name: "Generate Diet Plan",
  //     description: "Genera un prompt para un plan de dieta personalizado",
  //     mimeType: "text/plain",
  //   },
  // },

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
