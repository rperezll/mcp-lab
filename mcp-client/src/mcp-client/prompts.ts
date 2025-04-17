import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export const getPrompts = async (client: Client) => {
    const result = await client.listPrompts();
    return JSON.stringify(result, null, 2);
};