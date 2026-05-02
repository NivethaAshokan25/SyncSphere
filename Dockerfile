# Stage 1: Build Client
FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Build Server
FROM node:20-alpine AS server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./
RUN npx tsc

# Stage 3: Final Image
FROM node:20-alpine
WORKDIR /app/server

# Copy built server
COPY --from=server-build /app/server/dist ./dist
COPY --from=server-build /app/server/src/data ./dist/data
COPY --from=server-build /app/server/package*.json ./

# Copy built client into the expected location relative to server
COPY --from=client-build /app/client/dist ../client/dist

# Install production dependencies
RUN npm install --omit=dev

# Environment
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/index.js"]
