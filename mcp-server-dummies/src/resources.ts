import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { findAllUsersName, findUsersByName } from "./utils/users";
import { getWeatherByCity } from "./utils/weather";

export const ResourcesSet = async (server: McpServer) => {
  server.resource(
    "fetch-weather",
    new ResourceTemplate("weather://city/{cityName}", { list: undefined }),
    async (uri, { cityName }) => {
      const citySearch = Array.isArray(cityName) ? cityName : [cityName];
      const weather = await getWeatherByCity(citySearch[0]);

      if (weather.error) {
        return {
          contents: [
            {
              uri: uri.href,
              text: weather.message,
            },
          ],
        };
      }

      return {
        contents: [
          {
            uri: uri.href,
            text: `El clima en ${weather.city}, ${weather.country} es de ${weather.temperature}°C con viento de ${weather.windspeed} km/h 🌤️`,
          },
        ],
      };
    }
  );

  server.resource(
    "fetch-users",
    new ResourceTemplate("fetch-users://users/{userName}", {
      list: async () => {
        const allUsers = findAllUsersName();
        return {
          resources: allUsers.map((user) => ({
            uri: `fetch-users://users/${user}`,
            name: `Consultar información de ${user}`,
            mimeType: "text/plain",
            description: "Obten información sobre usuarios del sistema",
          })),
        };
      },
      complete: {
        userName: async (match) => {
          const matches = findUsersByName(match);
          return matches.map((user) => user.name);
        },
      },
    }),
    async (uri, { userName }) => {
      const users = await findUsersByName(userName);

      if (!users || users.length === 0) {
        return {
          contents: [
            {
              uri: uri.href,
              text: `No se encontraron usuarios con el nombre "${userName}".`,
            },
          ],
        };
      }

      return {
        contents: [
          {
            uri: uri.href,
            text:
              `Usuarios encontrados a partir de '${userName}':\n` +
              users
                .map(
                  (user) =>
                    `- Nombre: ${user.name}, Edad: ${user.age}, Plan: ${user.subscribedPlan}, Objetivo: ${user.fitnessGoal}`
                )
                .join("\n"),
          },
        ],
      };
    }
  );
};
