import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getDb } from "./db";
import { z } from "zod";

export const ToolsSet = async (server: McpServer) => {
  server.tool("query", { sql: z.string() }, async ({ sql }) => {
    const db = getDb();
    try {
      const results = await db.all(sql);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    } catch (err: unknown) {
      const error = err as Error;
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    } finally {
      await db.close();
    }
  });
};
