# Base image with essential dependencies
FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 80

# Dependencies installation stage
FROM base as deps
WORKDIR /app
# Install dependencies only (no devDependencies for production build)
RUN npm ci --only=production && \
    cp -R node_modules /node_modules

# Builder stage
FROM base as builder
WORKDIR /app
COPY . .
# Install all dependencies, including devDependencies, for building the project
RUN npm ci && npm run build

# Production stage
FROM node:18-alpine as production
WORKDIR /app

# Environment setup
ENV NODE_ENV=production
COPY --from=deps /node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Create a non-root user and set proper permissions
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

USER nextjs

# Start the application
CMD ["npm", "start"]
