import OpenAI from "openai";
import dotenv from "dotenv";
import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { normalizeToolsForOpenAI } from "./utils";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
dotenv.config();

export const interaction = async (
  message: string,
  mcpClient: Client,
  tools?: Tool[]
) => {
  const client = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
  });

  const openaiTools = normalizeToolsForOpenAI(tools ?? []);

  const messages: OpenAI.Responses.ResponseInput = [];
  messages.push({ role: "user", content: message });

  let response = await client.responses.create({
    model: "gpt-3.5-turbo",
    tools: openaiTools,
    input: messages,
    temperature: 0,
    max_output_tokens: 100,
    tool_choice: "auto",
  });

  if (response.output[0].type !== "function_call") {
    messages.push({ role: "assistant", content: response.output_text });
  } else {
    const toolCall = response.output[0];
    const args = JSON.parse(toolCall.arguments);

    messages.push(toolCall);

    const mcpResponse = await mcpClient.callTool({
      name: toolCall.name,
      arguments: args,
    });

    messages.push({
      type: "function_call_output",
      call_id: toolCall.call_id,
      output: JSON.stringify(mcpResponse),
    });

    const response2 = await client.responses.create({
      model: "gpt-3.5-turbo",
      input: messages,
      temperature: 0,
      max_output_tokens: 100,
      tool_choice: "none",
    });

    messages.push({
      role: "assistant",
      content: response2.output_text,
    });

    response = response2;
  }

  console.log(`OpenAI response: ${response.output_text}`);
};
