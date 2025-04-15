# <img src="https://res.cloudinary.com/brandpad/image/upload/c_scale,dpr_auto,f_auto,w_1792/v1713826774/28444/tachometer-white-png" alt="Fastly Logo" height="25"> FastlyMCP [![](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white "LinkedIn")](https://www.linkedin.com/in/your-linkedin/)


Fastly MCP brings the power of Fastly's API directly to your AI assistants through the Model Context Protocol (MCP).

[![](https://badge.mcpx.dev?type=server "MCP Server")](https://modelcontextprotocol.io/introduction)
[![](https://img.shields.io/badge/Node.js-16+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![](https://img.shields.io/badge/License-MIT-red.svg "MIT License")](https://opensource.org/licenses/MIT)
[![](https://img.shields.io/badge/status-beta-orange?style=flat-square)](https://github.com/yourusername/fastly-mcp)

<a href="https://github.com/Arodoid/FastlyMCP/stargazers"><img src="https://img.shields.io/github/stars/Arodoid/FastlyMCP" alt="Stars Badge"/></a>
<a href="https://github.com/Arodoid/FastlyMCP/network/members"><img src="https://img.shields.io/github/forks/Arodoid/FastlyMCP" alt="Forks Badge"/></a>
<a href="https://github.com/Arodoid/FastlyMCP/pulls"><img src="https://img.shields.io/github/issues-pr/Arodoid/FastlyMCP" alt="Pull Requests Badge"/></a>
<a href="https://github.com/Arodoid/FastlyMCP/issues"><img src="https://img.shields.io/github/issues/Arodoid/FastlyMCP" alt="Issues Badge"/></a>

### Fastly's API-First Approach

Fastly's API-first design philosophy means:

- **Everything is an API** - Every feature available in the Fastly UI is accessible via API
- **Programmatic Control** - Full control over services, configurations, and edge logic
- **Automation Ready** - Support for CI/CD workflows and infrastructure as code
- **Real-time Changes** - API changes propagate globally in seconds, not minutes or hours

## What Can I Do With Fastly API?

Fastly's [comprehensive API](https://www.fastly.com/documentation/reference/api/) allows you to:

- **Manage CDN Services** - Create, configure, and deploy content delivery services
- **Control Caching** - Set up cache strategies and perform instant purges
- **Configure Security** - Manage WAF, DDoS protection, and TLS certificates
- **Monitor Performance** - Access real-time metrics and historical stats
- **Implement Edge Logic** - Deploy custom VCL or Compute@Edge applications
- **Automate Workflows** - Integrate with CI/CD pipelines and infrastructure tools

## Fastly MCP: AI-Powered Fastly Management

Fastly MCP enables AI assistants to directly interact with the Fastly API, allowing you to:

- Manage your Fastly configurations through natural language conversations
- Get real-time insights about your services, traffic, and performance
- Automate routine tasks like cache purging and configuration updates
- Troubleshoot issues by asking your AI assistant to check logs and metrics

### What You Can Ask Your AI

With Fastly MCP configured, you can ask your AI assistant questions like:

- "List all my Fastly services and their domains"
- "What's the traffic pattern for my service over the last week?"
- "Purge all cache for my product catalog service"
- "Show me the backends configured for my main website"
- "What's my current cache hit ratio?"

## Getting Started

### Prerequisites

- A Fastly account and API key ([Get started with Fastly](https://www.fastly.com/signup/))
- An AI assistant that supports MCP (e.g., Claude, GPT with plugins)

### Connect Your AI Assistant

Configure your AI assistant with:

```json
{
  "mcpServers": {
    "fastly": {
      "command": "node",
      "args": ["path/to/fastly-mcp.mjs"],
      "env": {
        "FASTLY_API_KEY": "your_fastly_api_key"
      }
    }
  }
}
```

## Common Operations

| What You Want To Do | Example AI Request                                                |
| ------------------- | ----------------------------------------------------------------- |
| List your services  | "Show me all my Fastly services"                                  |
| Get domain details  | "What domains are configured for my e-commerce service?"          |
| Purge cache         | "Purge the cache for my product service"                          |
| Check traffic       | "What's the traffic pattern for my main site over the last week?" |
| View configuration  | "Show me the backend servers for my API service"                  |
| Check performance   | "What's my current cache hit ratio?"                              |

## Learn More

- [Fastly API Documentation](https://www.fastly.com/documentation/reference/api/)
- [Model Context Protocol](https://modelcontextprotocol.io/introduction)
- [Getting Started with Fastly](https://docs.fastly.com/en/guides/start-here)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
