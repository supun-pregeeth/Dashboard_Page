# =========================
# Build Stage
# =========================
FROM node:18 AS build

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Clean cache and install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build React app
RUN npm run build

# =========================
# Production Stage
# =========================
FROM nginx:alpine


# Copy React build files from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy your custom Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
