import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const getToolsDefinition = async (client: Client): Promise<Tool[]> => {
  return (await client.listTools()).tools;
};
