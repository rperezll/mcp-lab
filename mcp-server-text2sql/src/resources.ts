import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getDb } from "./db";

export const ResourcesSet = (server: McpServer) => {
  server.resource("schema", "schema://main", async (uri) => {
    const db = await getDb();
    try {
      const tables = await db.all(
        "SELECT sql FROM sqlite_master WHERE type='table'"
      );
      return {
        contents: [
          {
            uri: uri.href,
            text: tables.map((t: { sql: string }) => t.sql).join("\n"),
          },
        ],
      };
    } finally {
      await db.close();
    }
  });
};
