FROM docker.io/oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install

# Gera o Prisma Client
RUN bunx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "bunx prisma migrate deploy && bun run start"]