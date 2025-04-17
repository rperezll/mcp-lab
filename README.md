# MCP Lab

Este repositorio es un laboratorio personal donde he estado trasteando con el SDK de [**Model Context Protocol**](https://modelcontextprotocol.io/introduction) ([@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)) usando TypeScript. La idea principal es entender bien cómo funciona el protocolo, hacer pruebas rápidas y montar casos de uso más reales según me iba sintiendo cómodo con la herramienta.

## Estructura del proyecto

```text
.
├── 📂 mcp-server-dummies/   # Primeros pasos usando el SDK de MCP.
├── 📂 mcp-lab-text2sql/     # Caso de uso avanzado: Text-to-SQL sobre una base de datos SQLite.
```

## 🧪 mcp-server-dummies

Este proyecto contiene una implementación básica para familiarizarse con el SDK de MCP. Fue pensado como un primer acercamiento al protocolo, útil para pruebas simples y entender su funcionamiento (nada sofisticado).

### Instalación

> [!NOTE] 
> El proyecto requiere una versión de Node.js >= v20.

```bash
cd mcp-server-dummies
npm i
```

### Ejecución

```bash
npm run build     # Compila el proyecto con tsc
npm run dev       # Ejecuta el servidor con ts-node
```

Como herramienta de depuración, podemos utilizar el siguiente comando, que lanza el [**MCP Inspector**](https://github.com/modelcontextprotocol/inspector). Esta utilidad proporciona una interfaz visual para probar y depurar nuestro servidor MCP de forma más cómoda e interactiva.

```bash
npm run test
```

El comando nos expone el inspector en [http://localhost:6274](http://localhost:6274) asociado a nuestro servidor MCP.

## 💬 mcp-lab-text2sql

Este segundo proyecto implementa un sistema de Text-to-SQL: se puede chatear con una base de datos SQLite utilizando lenguaje natural. Este servidor MCP expone las herramientas y recursos necesarios para que nuestro LLM sea capaz de chatear con nuestros datos.

### Instalación

> [!NOTE] 
> El proyecto requiere una versión de Node.js >= v20.

```bash
cd mcp-server-dummies
npm i
```

### Ejecución

```bash
npm run build     # Compila el proyecto con tsc
npm run dev       # Ejecuta el servidor con ts-node
```

Como herramienta de depuración, podemos utilizar el siguiente comando, que lanza el [**MCP Inspector**](https://github.com/modelcontextprotocol/inspector). Esta utilidad proporciona una interfaz visual para probar y depurar nuestro servidor MCP de forma más cómoda e interactiva.

```bash
npm run test
```

El comando nos expone el inspector en [http://localhost:6274](http://localhost:6274) asociado a nuestro servidor MCP.

## Claude Desktop

Podemos probar nuestros servidores MCP desde [**Claude Desktop**](https://claude.ai/download). Para asociar nuestros servidores MCP debemos modificar el archivo `claude_desktop_config.json` de la siguiente manera:

```json
{
    "mcpServers": {
        "mcp-lab-dummies": {
            "command": "node",
            "args": [
                "C://PATH//mcp-lab//mcp-server-dummies//dist//index.js"
            ]
        },
        "mcp-lab-text2sql": {
            "command": "node",
            "args": [
                "C://PATH//mcp-lab//mcp-server-text2sql//dist//index.js"
            ]
        }
    }
}
```

> [!IMPORTANT] 
> Recuerda ejecutar `npm run build` dentro de cada proyecto previamente.

¿Dónde se encuentra `claude_desktop_config.json` en Windows? ➡️ `PATH//AppData//Roaming//Claude`.

Para conocer más sobre la sintaxis y ubicación de este archivo de configuración usa la [documentación oficial](https://modelcontextprotocol.io/quickstart/user).

## 📄 Licencia

**MIT © [rperezll](https://github.com/rperezll)**