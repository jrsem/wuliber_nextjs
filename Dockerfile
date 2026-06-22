# 1. Base image for installing dependencies - CHANGED TO node:20-alpine
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN \
  if [ -f "package-lock.json" ]; then npm ci; \
  elif [ -f "yarn.lock" ]; then yarn --frozen-lockfile; \
  elif [ -f "pnpm-lock.yaml" ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 2. Rebuild the source code only when needed - CHANGED TO node:20-alpine
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f "package-lock.json" ]; then npm run build; \
  elif [ -f "yarn.lock" ]; then yarn build; \
  elif [ -f "pnpm-lock.yaml" ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 3. Production image, copy all the files and run next - CHANGED TO node:20-alpine
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]



# FROM node:22.16.0-alpine AS base

# ###################################################
# # setup docker image to install all node packages #
# ###################################################
# FROM base AS dependencies
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci

# ########################################
# # setup docker image for next.js build #
# ########################################
# FROM base AS build
# WORKDIR /app
# COPY --from=dependencies /app/node_modules ./node_modules
# COPY . .
# ENV NEXT_TELEMETRY_DISABLED=1
# RUN npm run build

# ############################################################
# # setup docker image to hold build, static and run the app #
# ############################################################
# FROM base AS runner
# WORKDIR /app
# ENV NODE_ENV=production \
#     NEXT_TELEMETRY_DISABLED=1 \
#     HOSTNAME="0.0.0.0"
# COPY --from=build /app/public ./public
# RUN mkdir .next
# COPY --from=build /app/.next/standalone ./
# COPY --from=build /app/.next/static ./.next/static
# CMD ["node", "server.js"]
