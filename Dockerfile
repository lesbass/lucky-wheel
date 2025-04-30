FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else npm i; \
  fi

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
