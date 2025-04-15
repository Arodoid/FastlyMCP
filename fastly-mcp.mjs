#!/usr/bin/env node

import fs from "fs";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Setup logging
const logFile = fs.createWriteStream("fastly-mcp-debug.log", { flags: "a" });
const log = (msg) => {
  const timestamp = new Date().toISOString();
  logFile.write(`${timestamp}: ${msg}\n`);
  console.error(`${timestamp}: ${msg}`);
};

log("=== Fastly MCP Server Starting ===");

// Define a single flexible tool for the Fastly API
const FASTLY_API_TOOL = {
  name: "fastly_api",
  description:
    "Make requests to the Fastly API. Allows accessing all endpoints of the Fastly API with custom paths, methods and parameters.\n\n" +
    "IMPORTANT USAGE NOTES FOR LLMs:\n" +
    "1. When making multiple API calls, summarize the results between calls. The user doesn't see raw API responses.\n" +
    "2. Base URL is automatically added - just provide the path (e.g. '/service').\n" +
    "3. Authentication is handled automatically - no need to include API keys or know API keys.\n" +
    "4. Common paths:\n" +
    "   - List services: GET /service\n" +
    "   - Get service details: GET /service/{service_id}\n" +
    "   - Get domains: GET /service/{service_id}/version/{version}/domain\n" +
    "   - Get backends: GET /service/{service_id}/version/{version}/backend\n" +
    "   - Purge cache: POST /service/{service_id}/purge_all\n" +
    "   - Get stats: GET /stats (with params: service_id, from, to)\n" +
    "5. Always check status codes in responses. Status 200-299 indicates success.\n" +
    "6. Include simple explanations of what you're doing and what the results mean before and after each API call." +
    "\n\n# Creating Fastly Compute@Edge Sites\n\n" +
    "To create a Compute@Edge site, you can use a combination of API calls and terminal commands. The API handles service creation and configuration, while terminal commands handle the local build and deployment process.\n\n" +
    "Follow these general steps:\n" +
    '1. Create a new service using the API: POST /service with {"name": "My Site", "type": "wasm"}\n' +
    "2. Initialize a local Compute project using the Fastly CLI\n" +
    "3. Build the project using the appropriate build tools\n" +
    "4. Deploy using the Fastly CLI with the service ID from step 1\n\n" +
    "# COMMON PITFALLS TO AVOID:\n\n" +
    "1. DO NOT use --name flag with fastly compute init (use interactive mode or -d -y flags instead)\n" +
    "2. PowerShell requires semicolons (;) not ampersands (&&) for command chaining\n" +
    "3. Fastly compute build creates the package archive AFTER you've built the Wasm binary\n" +
    "4. Build is a TWO-STEP process: first compile to Wasm, then create the package archive\n" +
    "5. Deploy command needs -d flag to avoid hanging on interactive prompts\n" +
    "6. NEVER attempt to extract or use the user's API key directly - auth is handled by MCP\n" +
    "7. To create a service from scratch, you must use API calls for configuration and CLI for local build\n" +
    "8. Check current directory paths carefully before running commands\n" +
    "9. Full URL paths aren't needed in API calls - just use the path portion (e.g. '/service')\n\n" +
    "See the full guide for detailed instructions on handling common errors and PowerShell-specific commands.",
  inputSchema: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description:
          "API path (e.g., '/service' or '/service/{service_id}/purge_all'). Don't include base URL.",
      },
      method: {
        type: "string",
        description: "HTTP method (GET, POST, PUT, DELETE)",
        enum: ["GET", "POST", "PUT", "DELETE"],
      },
      body: {
        type: "object",
        description:
          "Request body for POST/PUT requests (optional). Will be JSON-encoded automatically.",
      },
      params: {
        type: "object",
        description:
          "URL parameters to add to the request (optional). For filtering, pagination, etc.",
      },
    },
    required: ["path", "method"],
  },
};

// New CLI tool for Fastly CLI commands
const FASTLY_CLI_TOOL = {
  name: "fastly_cli",
  description:
    "Execute Fastly CLI commands securely without exposing API keys.\n\n" +
    "This tool allows you to run Fastly CLI commands while the MCP server handles authentication automatically. " +
    "The LLM never sees or needs to handle the API key directly.\n\n" +
    "USAGE EXAMPLES:\n" +
    "1. Initialize a Compute project: fastly_cli('compute init --language javascript -d -y')\n" +
    "2. Build a package: fastly_cli('compute build')\n" +
    "3. Deploy a service: fastly_cli('compute deploy --service-id SERVICE_ID -d -y')\n\n" +
    "COMMON COMMANDS:\n" +
    "- compute init: Initialize a new Compute project\n" +
    "- compute build: Build a Compute package\n" +
    "- compute deploy: Deploy a Compute package\n" +
    "- compute publish: Build and deploy in one step\n" +
    "- whoami: Check authentication status\n\n" +
    "SECURITY NOTE: Authentication is handled automatically. Never attempt to pass API keys in commands.",
  inputSchema: {
    type: "object",
    properties: {
      command: {
        type: "string",
        description:
          "The Fastly CLI command to execute (without the 'fastly' prefix)",
      },
      working_directory: {
        type: "string",
        description: "Optional working directory for command execution",
      },
    },
    required: ["command"],
  },
};

log("Creating server instance");

// Server implementation
const server = new Server(
  {
    name: "fastly-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Check for API key
const FASTLY_API_KEY = process.env.FASTLY_API_KEY || "";
const API_BASE_URL = "https://api.fastly.com";

log(`API key configured: ${FASTLY_API_KEY ? "Yes" : "No"}`);

async function callFastlyApi(path, method, body = null, params = null) {
  try {
    log(`Making ${method} request to ${path}`);

    // Build URL with query parameters if provided
    let url = new URL(
      path.startsWith("/") ? path.substring(1) : path,
      API_BASE_URL
    );

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    // Setup request options
    const options = {
      method: method,
      headers: {
        "Fastly-Key": FASTLY_API_KEY,
        Accept: "application/json",
      },
    };

    // Add body for POST/PUT requests
    if ((method === "POST" || method === "PUT") && body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    // Make the request
    log(`Sending request to ${url}`);
    const response = await fetch(url, options);

    // Parse response
    let responseData;
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    // Log response status
    log(`Response status: ${response.status}`);

    // Return formatted response
    return {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: responseData,
    };
  } catch (error) {
    log(`Error in API call: ${error.message}`);
    throw new Error(`Fastly API error: ${error.message}`);
  }
}

async function executeFastlyCLI(command, workingDir = null) {
  try {
    log(`Executing Fastly CLI command: ${command}`);

    // Set up command with authentication but for PowerShell execution
    const psCommand = `fastly ${command} --token ${FASTLY_API_KEY}`;

    // Use child_process to execute the command via PowerShell
    const { exec } = await import("child_process");

    return new Promise((resolve, reject) => {
      const options = workingDir ? { cwd: workingDir } : {};

      // Use PowerShell explicitly
      exec(
        `powershell -Command "${psCommand}"`,
        options,
        (error, stdout, stderr) => {
          if (error) {
            log(`CLI command error: ${error.message}`);
            reject(new Error(`Fastly CLI error: ${error.message}`));
            return;
          }

          log(`CLI command completed successfully`);
          resolve({
            stdout: stdout.trim(),
            stderr: stderr.trim(),
            success: true,
          });
        }
      );
    });
  } catch (error) {
    log(`Error in CLI execution: ${error.message}`);
    throw new Error(`Fastly CLI execution error: ${error.message}`);
  }
}

// Tool handlers
log("Registering request handlers");

server.setRequestHandler(ListToolsRequestSchema, async () => {
  log("Handling ListTools request");
  return {
    tools: [FASTLY_API_TOOL, FASTLY_CLI_TOOL],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;
    log(`Handling CallTool request for tool: ${name}`);

    if (name === "fastly_api") {
      if (!args?.path || !args?.method) {
        log("Error: path and method are required");
        throw new Error("path and method are required");
      }

      log(`Executing fastly_api call: ${args.method} ${args.path}`);

      const result = await callFastlyApi(
        args.path,
        args.method,
        args.body || null,
        args.params || null
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
        isError: false,
      };
    } else if (name === "fastly_cli") {
      if (!args?.command) {
        log("Error: command is required");
        throw new Error("command is required");
      }

      log(`Executing Fastly CLI command: ${args.command}`);

      const result = await executeFastlyCLI(
        args.command,
        args.working_directory || null
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
        isError: false,
      };
    } else {
      log(`Unknown tool: ${name}`);
      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true,
      };
    }
  } catch (error) {
    log(`Error handling request: ${error.message}`);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
      isError: true,
    };
  }
});

// Handle unexpected errors
process.on("uncaughtException", (err) => {
  log(`UNCAUGHT EXCEPTION: ${err.message}`);
  log(err.stack);
});

process.on("unhandledRejection", (reason) => {
  log(`UNHANDLED REJECTION: ${reason}`);
});

// Start the server
async function runServer() {
  try {
    log("Creating StdioServerTransport");
    const transport = new StdioServerTransport();

    log("Connecting server to transport");
    await server.connect(transport);

    log("Server connected and running");
  } catch (error) {
    log(`Error in runServer: ${error.message}`);
    log(error.stack);
    process.exit(1);
  }
}

log("Starting server...");
runServer().catch((error) => {
  log(`Fatal error running server: ${error.message}`);
  log(error.stack);
  process.exit(1);
});
