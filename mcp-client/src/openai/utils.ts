import { Tool } from "@modelcontextprotocol/sdk/types.js";
import OpenAI from "openai";

/**
 * Esto hay que usarlo con mucho cuidado, ya que OpenAI no soporta todos los tipos de JSON Schema.
 * El tipo Tool de MCP ahorra mismo es compatible con OpenAI, por lo que el fin es proporcionar un parseador (normalizar).
 * Por el momento, existen muchos campos puestos ad hoc, por lo que no es una solución definitiva.
 */
export const normalizeToolsForOpenAI = (
  tools: Tool[]
): OpenAI.Responses.Tool[] => {
  return tools.map((tool) => {
    const cleanedParams = removeUnsupportedFields(tool.inputSchema);

    return {
      type: "function",
      name: tool.name,
      description: tool.description ?? "No description provided.",
      parameters: cleanedParams,
      strict: true,
    };
  });
};

type JSONSchemaObject = {
  type: "object";
  properties?: Record<string, JSONSchemaProperty>;
  required?: string[];
  additionalProperties?: boolean;
};

type JSONSchemaProperty = {
  type: "string" | "number" | "boolean" | "object" | "array";
  description?: string;
  properties?: Record<string, JSONSchemaProperty>;
  items?: JSONSchemaProperty;
  required?: string[];
  enum?: string[];
  additionalProperties?: boolean;
};

const removeUnsupportedFields = (schema: any): any => {
  if (schema?.type === "object" && schema.properties) {
    const cleaned: JSONSchemaObject = {
      type: "object",
      properties: {},
      required: [],
      additionalProperties: false,
    };

    for (const [key, prop] of Object.entries(schema.properties)) {
      const typedProp = prop as JSONSchemaProperty;
      const { type, description, enum: enumValues } = typedProp;

      const newProp: JSONSchemaProperty = { type, description };

      if (type === "object" && typedProp.properties) {
        const cleanedSub = removeUnsupportedFields(typedProp);
        newProp.properties = cleanedSub.properties;
        newProp.required = cleanedSub.required;
        newProp.additionalProperties = false;
      }

      if (typedProp.items) {
        newProp.items = removeUnsupportedFields(typedProp.items);
      }

      if (enumValues) {
        newProp.enum = enumValues;
      }

      cleaned.properties![key] = newProp;
    }

    cleaned.required = Object.keys(cleaned.properties || {});
    return cleaned;
  }

  return schema;
};
