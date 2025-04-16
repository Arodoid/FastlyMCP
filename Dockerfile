# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
# Using --omit=dev because we only need runtime dependencies in the final image
RUN npm install --omit=dev

# Copy the rest of the application code
COPY fastly-mcp.mjs .

# No CMD needed here as smithery.yaml will provide the start command
# But it's good practice to have a default execution
CMD ["node", "fastly-mcp.mjs"] 