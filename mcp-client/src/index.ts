import { getMcpClient } from "./mcp-client/client";
import { getToolsDefinition } from "./mcp-client/tools";
import { chat } from "./openai/chat";

async function main() {
  const client = await getMcpClient();

  const availableTools = await getToolsDefinition(client);
  
  await chat(client, availableTools);
}

main().catch(console.error);
