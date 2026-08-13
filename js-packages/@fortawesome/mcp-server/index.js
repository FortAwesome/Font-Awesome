#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Locate the metadata file
let iconsData;
try {
  // First, attempt to load it from the monorepo root (if running inside the Font-Awesome repo)
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const localRepoPath = path.resolve(__dirname, '../../../metadata/icon-families.json');
  if (fs.existsSync(localRepoPath)) {
    iconsData = JSON.parse(fs.readFileSync(localRepoPath, 'utf8'));
  } else {
    // If not in monorepo, try resolving the peer dependency
    const faFreePath = require.resolve('@fortawesome/fontawesome-free/package.json');
    const faFreeDir = path.dirname(faFreePath);
    const peerPath = path.join(faFreeDir, 'metadata/icon-families.json');
    iconsData = JSON.parse(fs.readFileSync(peerPath, 'utf8'));
  }
} catch (error) {
  console.error("Failed to load FontAwesome metadata. Ensure @fortawesome/fontawesome-free is installed.");
  process.exit(1);
}

const server = new Server(
  {
    name: "font-awesome-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_icons",
        description: "Search for FontAwesome icons by query (e.g. 'user', 'settings')",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The search term",
            },
            limit: {
              type: "number",
              description: "Max number of results to return (default: 10)",
            }
          },
          required: ["query"],
        },
      },
      {
        name: "get_icon_svg",
        description: "Get the raw SVG path and class names for a specific FontAwesome icon by ID",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the icon (e.g. 'user-gear')",
            },
          },
          required: ["id"],
        },
      }
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "search_icons") {
    const query = args.query.toLowerCase();
    const limit = args.limit || 10;
    
    const results = [];
    for (const [id, icon] of Object.entries(iconsData)) {
      if (results.length >= limit) break;
      
      const searchTerms = icon.search?.terms || [];
      const label = (icon.label || "").toLowerCase();
      
      if (
        id.includes(query) || 
        label.includes(query) || 
        searchTerms.some(t => t.toString().toLowerCase().includes(query))
      ) {
        results.push({
          id,
          label: icon.label,
          styles: Object.keys(icon.svgs || {}).flatMap(family => Object.keys(icon.svgs[family] || {}))
        });
      }
    }
    
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
    };
  }

  if (name === "get_icon_svg") {
    const id = args.id;
    const icon = iconsData[id];
    
    if (!icon) {
      return {
        content: [{ type: "text", text: `Icon with ID '${id}' not found.` }],
        isError: true,
      };
    }
    
    // Build a map of the svgs
    const svgs = {};
    for (const family of Object.keys(icon.svgs || {})) {
      for (const style of Object.keys(icon.svgs[family] || {})) {
        const svgData = icon.svgs[family][style];
        svgs[`fa-${family} fa-${id}`] = svgData.raw;
      }
    }
    
    return {
      content: [{ type: "text", text: JSON.stringify({ id, label: icon.label, svgs }, null, 2) }],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Font Awesome MCP Server running on stdio");
}

run().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
