import {
  McpServer
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { updateFitnessGoalByUser } from "./utils/users";
import { UserSchema } from "./utils/fake-db";

export const ToolsSet = (server: McpServer) => {
  server.tool("update-user-goal", { user: UserSchema }, async ({ user }) => {
    const updatedUser = await updateFitnessGoalByUser(user);

    if (updatedUser.success) {
      return {
        content: [
          {
            type: "text",
            text: `Objetivo del usuario ${updatedUser.user?.name} actualizado: Nuevo objetivo → ${updatedUser.user?.fitnessGoal}`,
          },
        ],
      };
    } else {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${updatedUser.message}`,
          },
        ],
      };
    }
  });
};
