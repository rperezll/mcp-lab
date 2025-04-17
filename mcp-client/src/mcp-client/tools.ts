import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const getToolsDefinition = async (client: Client): Promise<Tool[]> => {
  const tools = await client.listTools();
  const mappingTools = tools.tools.map(
    (t): Tool => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema,
    })
  );

  return mappingTools;
};
