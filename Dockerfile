# Stage 1: Build the React app
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy our custom config to the Nginx config directory
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from Stage 1 to Nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx config if you have one, or use default
# EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]