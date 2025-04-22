# <img src="https://res.cloudinary.com/brandpad/image/upload/c_scale,dpr_auto,f_auto,w_1792/v1713826774/28444/tachometer-white-png" alt="Fastly Logo" height="25"> FastlyMCP [![](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white "LinkedIn")](https://www.linkedin.com/in/jack-w-richards/) [![smithery badge](https://smithery.ai/badge/@Arodoid/fastlymcp)](https://smithery.ai/server/@Arodoid/fastlymcp)

Fastly MCP brings the power of Fastly's API directly to your AI assistants through the Model Context Protocol (MCP).

[![](https://badge.mcpx.dev?type=server "MCP Server")](https://modelcontextprotocol.io/introduction)
[![](https://img.shields.io/badge/Node.js-16+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![](https://img.shields.io/badge/License-MIT-red.svg "MIT License")](https://opensource.org/licenses/MIT)
[![](https://img.shields.io/badge/status-beta-orange?style=flat-square)](https://github.com/yourusername/fastly-mcp)

<a href="https://github.com/Arodoid/FastlyMCP/stargazers"><img src="https://img.shields.io/github/stars/Arodoid/FastlyMCP" alt="Stars Badge"/></a>
<a href="https://github.com/Arodoid/FastlyMCP/network/members"><img src="https://img.shields.io/github/forks/Arodoid/FastlyMCP" alt="Forks Badge"/></a>
<a href="https://github.com/Arodoid/FastlyMCP/pulls"><img src="https://img.shields.io/github/issues-pr/Arodoid/FastlyMCP" alt="Pull Requests Badge"/></a>
<a href="https://github.com/Arodoid/FastlyMCP/issues"><img src="https://img.shields.io/github/issues/Arodoid/FastlyMCP" alt="Issues Badge"/></a>

![image](https://github.com/user-attachments/assets/2bc41b64-0df1-4339-942b-8effb229a43d)

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

### Your API Key Stays Safe!
The AI assistant never sees your Fastly API key. It talks to a local helper (FastlyMCP) which uses the key securely.

### What You Can Ask Your AI

With Fastly MCP configured, you can ask your AI assistant questions like:

| What You Want To Do | Example AI Request                                                |
| ------------------- | ----------------------------------------------------------------- |
| List your services  | "Show me all my Fastly services"                                  |
| Get domain details  | "What domains are configured for my e-commerce service?"          |
| Purge cache         | "Purge the cache for my product service"                          |
| Check traffic       | "What's the traffic pattern for my main site over the last week?" |
| View configuration  | "Show me the backend servers for my API service"                  |
| Check performance   | "What's my current cache hit ratio?"                              |

### "What the traffic pattern my for services over the last week?"
<img src="https://github.com/user-attachments/assets/14958973-b8a9-426b-aa27-470bea012d7d" alt="2025-04-16-09-13-35" width="500"/>

### "List all my Fastly services and their domains."
<img src="https://github.com/user-attachments/assets/08550182-b3d9-4534-8bf4-bec7cb951465" alt="2025-04-16-09-13-35" width="500"/>

### "Build an interactive preformance dashboard about my Fastly serivce."
<img src="https://github.com/user-attachments/assets/542b0b42-af5e-4a18-b88a-5ab2eee22214" alt="2025-04-16-09-13-35" width="600"/>


## Getting Started

### Prerequisites

- A Fastly account and API key ([Get started with Fastly](https://www.fastly.com/signup/))
- An AI assistant that supports MCP (e.g., Claude, GPT with plugins)
- The Fastly CLI installed ([Installation Guide](https://www.fastly.com/documentation/reference/cli/))

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

## Advanced Operation Examples

| Task Goal                        | Example AI Request                                                                                                                  |
| :------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| Optimize service based on traffic | "Analyze the configuration for `[service_id/name]` and suggest optimizations based on its traffic profile, prioritizing low latency." |
| Configure for live video         | "Configure `[service_id/name]` for optimal live video streaming following the best practices outlined in `[link_to_guide_or_doc]`."    |
| Find config conflicts            | "Identify potential configuration conflicts in `[service_id/name]` compared to standard e-commerce delivery patterns."                |
| Optimize video chunk caching     | "Optimize caching for `[service_id/name]` to handle 10-second video chunks efficiently, minimizing origin load."                      |
| Enhance WAF security             | "Review the WAF rules for `[service_id/name]` and suggest stricter settings to mitigate potential SQL injection attacks."             |
| Set up origin mTLS               | "Set up Mutual TLS (mTLS) authentication between Fastly and the origin servers for `[service_id/name]`."                              |
| Implement A/B testing (Edge)     | "Deploy a Compute@Edge function to `[service_id/name]` that performs A/B testing by routing 10% of users to backend `[backend_name]`." |
| Add dynamic image rewriting (VCL) | "Write and deploy VCL for `[service_id/name]` to dynamically rewrite image URLs based on the requesting device's user agent."         |
| Troubleshoot 5xx errors          | "Analyze logs for `[service_id/name]` from the past 24 hours to identify the root cause of the recent spike in 5xx errors."         |

## Learn More

- [Fastly API Documentation](https://www.fastly.com/documentation/reference/api/)
- [Model Context Protocol](https://modelcontextprotocol.io/introduction)
- [Getting Started with Fastly](https://docs.fastly.com/en/guides/start-here)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
