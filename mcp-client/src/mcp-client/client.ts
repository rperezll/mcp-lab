import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export const getMcpClient = async (): Promise<Client> => {
  try {
    const client = new Client({
      name: "MCP Client for consume my dummy server",
      version: "1.0.0",
    });

    const transport = new StdioClientTransport({
      command: "node",
      args: ["../mcp-server-dummies/dist/index.js"],
    });

    await client.connect(transport);

    return client;
  } catch (e) {
    console.error("Failed to connect to MCP server: ", e);
    throw e;
  }
};
