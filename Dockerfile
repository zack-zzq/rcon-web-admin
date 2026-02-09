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

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application files
COPY package*.json ./
COPY src ./src
COPY public ./public
COPY config.template.js ./

# Create directories for data persistence
RUN mkdir -p db logs && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose ports (web interface: 4326, websocket: 4327)
EXPOSE 4326 4327

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:4326/ || exit 1

# Default command - install core widgets and start
CMD ["sh", "-c", "node src/main.js install-core-widgets && node src/main.js start"]
