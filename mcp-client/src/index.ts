import { getMcpClient } from "./mcp-client/client";
import { getToolsDefinition } from "./mcp-client/tools";
import { interaction } from "./openai/interaction";

async function main() {
  const client = await getMcpClient();

  const availableTools = await getToolsDefinition(client);

  await interaction(
    "Actualiza el objetivo del usuario llamado Carlos. El nuevo objetivo es: ganar masa muscular.",
    client,
    availableTools
  );
}

main().catch(console.error);
