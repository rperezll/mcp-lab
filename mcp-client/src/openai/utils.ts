import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import OpenAI from "openai";

export function mcpToolToOpenaiTool(mcpTools: Tool[]): OpenAI.Responses.Tool[] {
  return mcpTools.map((mcpTool) => {
    const inputSchema = mcpTool.inputSchema;

    return {
      type: "function",
      name: mcpTool.name,
      description: mcpTool.description ?? 'Sin descripción',
      parameters: {
        type: "object",
        properties: inputSchema.properties ?? {},
        required: inputSchema.required ?? [],
        additionalProperties: inputSchema.additionalProperties ?? false,
      },
      strict: true,
    };
  });
}
