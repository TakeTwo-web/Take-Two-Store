# Stage 1: Base image
FROM node:18-alpine AS base
WORKDIR /app
RUN apk add --no-cache dumb-init
ENV DUMB_INIT_SIGNAL HANDLER 1

# Stage 2: Production dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 3: Development dependencies
FROM base AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Stage 4: Build application
FROM base AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build || true

# Stage 5: Production
FROM base AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma 2>/dev/null || true

# Copy application files
COPY --from=builder /app ./

# Set ownership
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Start application
CMD ["dumb-init", "node", "server.js"]
