FROM node:20-alpine

WORKDIR /app

# Create additional directories
RUN mkdir -p /app/data /app/uploads /app/logs

# Set permissions
RUN chown -R node:node /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install serve to run the static build
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Switch to non-root user
USER node

# Start the server
CMD ["serve", "-s", "dist", "-l", "3000"]