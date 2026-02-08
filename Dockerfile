# Use official Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy everything and install deps
COPY . .

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Default command for preview mode
CMD ["pnpm", "run", "preview"]
