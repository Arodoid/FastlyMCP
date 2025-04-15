# Fastly MCP [![](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white "LinkedIn")](https://www.linkedin.com/in/your-linkedin/)

[![](https://badge.mcpx.dev?type=server "MCP Server")](https://modelcontextprotocol.io/introduction)
[![](https://img.shields.io/badge/Node.js-16+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![](https://img.shields.io/badge/License-MIT-red.svg "MIT License")](https://opensource.org/licenses/MIT)
[![](https://img.shields.io/badge/status-beta-orange?style=flat-square)](https://github.com/yourusername/fastly-mcp)

<a href="https://github.com/yourusername/fastly-mcp/stargazers"><img src="https://img.shields.io/github/stars/yourusername/fastly-mcp" alt="Stars Badge"/></a>
<a href="https://github.com/yourusername/fastly-mcp/network/members"><img src="https://img.shields.io/github/forks/yourusername/fastly-mcp" alt="Forks Badge"/></a>
<a href="https://github.com/yourusername/fastly-mcp/pulls"><img src="https://img.shields.io/github/issues-pr/yourusername/fastly-mcp" alt="Pull Requests Badge"/></a>
<a href="https://github.com/yourusername/fastly-mcp/issues"><img src="https://img.shields.io/github/issues/yourusername/fastly-mcp" alt="Issues Badge"/></a>

Fastly MCP brings the power of Fastly's API directly to your AI assistants through the Model Context Protocol (MCP).

<div align="center">
  <img src="https://assets.fastly.com/assets/logos/1.0/fastly-logo-full-color.svg" alt="Fastly Logo" width="250">
</div>

## What is Fastly?

Fastly is a powerful edge cloud platform that enables businesses to build, secure, and deliver digital experiences at scale. As an API-first company, Fastly provides complete programmatic access to its platform's functionality through a comprehensive API.

### API-First Approach

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

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/fastly-mcp.git
cd fastly-mcp

# Install dependencies
npm install

# Set up your Fastly API key
export FASTLY_API_KEY=your_fastly_api_key

# Start the server
node fastly-mcp.mjs
```

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
- [Getting Started with Fastly](https://www.fastly.com/documentation/guides/getting-started/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
