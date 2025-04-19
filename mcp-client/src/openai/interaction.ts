import OpenAI from "openai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import * as p from "@clack/prompts";

export const messages: OpenAI.Responses.ResponseInput = [];

export const interaction = async (
  openaiClient: OpenAI,
  mcpClient: Client,
  message: string,
  tools: OpenAI.Responses.Tool[]
) => {
  const spinner = p.spinner();
  spinner.start("Respondiendo");

  messages.push({ role: "user", content: message });

  let response = await openaiClient.responses.create({
    model: "gpt-3.5-turbo",
    tools,
    input: messages,
    temperature: 0.3,
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

    const response2 = await openaiClient.responses.create({
      model: "gpt-3.5-turbo",
      input: messages,
      temperature: 0.3,
      max_output_tokens: 100,
      tool_choice: "none",
    });

    messages.push({
      role: "assistant",
      content: response2.output_text,
    });

    response = response2;
  }

  spinner.stop(`AI: ${response.output_text}`);
};
