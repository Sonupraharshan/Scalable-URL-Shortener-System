# 1. Base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install --production

# 5. Copy source code
COPY . .

# 6. Set environment variables
ENV NODE_ENV=production

# 7. Expose port
EXPOSE 3000

# 8. Start the app
CMD ["node", "src/app.js"]
