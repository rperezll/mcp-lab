import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";

const inputData = {
  name: z.string(),
  fitnessGoal: z.string(),
  subscribedPlan: z.enum(["Basic", "Full", "Premium"]),
  age: z
    .string()
    .regex(/^(?:[0-9]|[1-9][0-9])$/, "La edad debe ser un número entre 0 y 99 en formato string"),
};

export const PromptsSet = async (server: McpServer) => {
  server.prompt(
    "generate-training-plan",
    inputData,
    ({ name, fitnessGoal, subscribedPlan, age }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Por favor genera un plan de entrenamiento para ${name}, que tiene como objetivo ${fitnessGoal} y su edad es ${age}. Además, está suscrito al plan ${subscribedPlan}.`,
          },
        },
      ],
    })
  );

  server.prompt(
    "generate-diet-plan",
    inputData,
    ({ name, fitnessGoal, subscribedPlan, age }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Genera una dieta personalizada para ${name}, de ${age} años. Su objetivo principal es ${fitnessGoal} y tiene una suscripción ${subscribedPlan}. Ten en cuenta su nivel de acceso al plan, y asegúrate de que la dieta sea variada, equilibrada y fácil de seguir.`,
          },
        },
      ],
    })
  );
};
