FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
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

# Install production dependencies
RUN npm install -g prisma
RUN npm install @prisma/client

EXPOSE 3000

# Use an entrypoint script that starts both Cloud SQL proxy and your app
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"] 