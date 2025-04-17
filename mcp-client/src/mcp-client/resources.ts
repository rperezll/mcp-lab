import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export const getResources = async (client: Client) => {
    const result = await client.listResources();
    return JSON.stringify(result, null, 2);
};