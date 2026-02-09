# Build stage - install dependencies
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies if any)
RUN npm install --production

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install su-exec for dropping privileges
RUN apk add --no-cache su-exec

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application files
COPY package*.json ./
COPY src ./src
COPY public ./public
COPY config.template.js ./
COPY docker-entrypoint.sh /usr/local/bin/

# Make entrypoint executable and create directories
RUN chmod +x /usr/local/bin/docker-entrypoint.sh && \
    mkdir -p /app/db /app/logs && \
    chown -R node:node /app

# Expose ports (web interface: 4326, websocket: 4327)
EXPOSE 4326 4327

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:4326/ || exit 1

# Use entrypoint to handle permissions
ENTRYPOINT ["docker-entrypoint.sh"]

# Default command - install core widgets and start
CMD ["sh", "-c", "node src/main.js install-core-widgets && node src/main.js start"]
