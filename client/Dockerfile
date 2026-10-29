# Build stage: compile the Vite/React app to static files
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage: serve the static build with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Writes config.js from $API_URL when the container starts (nginx runs
# every script in /docker-entrypoint.d/ before it serves).
COPY docker-entrypoint.d/40-runtime-config.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/40-runtime-config.sh
EXPOSE 80
