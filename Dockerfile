# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json AND the lock file
COPY package*.json ./

# Set NODE_ENV to production - good practice and influences npm ci
ENV NODE_ENV=production

# Use npm ci for a clean, reproducible install from package-lock.json
# --omit=dev is the default for production, but being explicit doesn't hurt
RUN npm install --omit=dev

# Copy the rest of the application code
COPY fastly-mcp.mjs .

# No CMD needed here as smithery.yaml will provide the start command
# But it's good practice to have a default execution
CMD ["node", "fastly-mcp.mjs"] 