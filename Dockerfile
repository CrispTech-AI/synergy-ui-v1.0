# Use official Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy everything and install deps
COPY . .

# Install pnpm v9
RUN npm install -g pnpm@9
RUN pnpm config set enable-pre-post-scripts true


# Install dependencies
RUN pnpm install

# Build the application
RUN pnpm run build

# Default command for preview mode
CMD ["pnpm", "run", "preview"]

