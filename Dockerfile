FROM node:18-alpine AS builder
WORKDIR /app
COPY . .

# Install dependencies
RUN npm ci

# Generate Prisma client and ensure it's available for build
RUN npx prisma generate

# Make an environment variable for the build to detect we're in Docker build
ENV NEXT_BUILD_IN_DOCKER=true

# Build the application
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

# Install Cloud SQL Auth proxy
RUN apk add --no-cache wget
RUN wget https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.0.0/cloud-sql-proxy.linux.amd64 -O /cloud-sql-proxy
RUN chmod +x /cloud-sql-proxy

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Install production dependencies
RUN npm install -g prisma
RUN npm install @prisma/client
RUN prisma generate

EXPOSE 3000

# Use an entrypoint script that starts both Cloud SQL proxy and your app
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"] 