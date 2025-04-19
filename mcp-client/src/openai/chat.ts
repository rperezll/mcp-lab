import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

import OpenAI from "openai";
import { mcpToolToOpenaiTool } from "./utils";
import { interaction } from "./interaction";

import * as p from "@clack/prompts";

import dotenv from "dotenv";
dotenv.config();

export const chat = async (mcpClient: Client, tools?: Tool[]) => {
  const client = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
  });

  const mcpOpenaiTools = await mcpToolToOpenaiTool(tools ?? []);

  p.intro("🧠 Chat usando OpenAI Responses API + MCP Server");
  let chatAlive = true;
  while (chatAlive) {
    const message = await p.text({ message: "Yo:"  });

    if (p.isCancel(message)) {
      chatAlive = false;
      p.outro("👋 Chat finalizado.");
    } else {
      await interaction(client, mcpClient, message.toString(), mcpOpenaiTools)
    }
  }

  process.exit(0);
};