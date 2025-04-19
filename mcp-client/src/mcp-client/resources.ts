import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { Resource, ResourceTemplate } from "@modelcontextprotocol/sdk/types.js";

export const getResourcesDefinition = async (client: Client): Promise<ResourceTemplate[]> => {
    return (await client.listResourceTemplates()).resourceTemplates;
};