# ---- deps: install node modules ----
FROM node:20-slim AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
# No lockfile is shipped by default, so use install. Commit a
# package-lock.json and switch to `npm ci` for reproducible builds.
RUN npm install

# ---- builder: compile the Next.js app ----
FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# next/font fetches Google Fonts at build time — this stage needs
# outbound internet access to fonts.googleapis.com / fonts.gstatic.com.
RUN npm run build

# ---- runner: minimal production image ----
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs -m nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
