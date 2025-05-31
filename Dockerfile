FROM oven/bun:slim

COPY . .

ENV GITHUB_AUTH_TOKEN=0

RUN bun install
RUN bun run build

CMD ["bun", "run", "preview"]