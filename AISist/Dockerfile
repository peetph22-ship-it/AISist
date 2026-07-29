FROM node:22-alpine AS builder

WORKDIR /app

# คัดลอกไฟล์แพ็กเกจ
COPY package*.json ./
COPY pnpm-workspace.yaml* ./
RUN npm install
COPY . .
RUN npm run build
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]