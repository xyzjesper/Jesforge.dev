FROM oven/bun:slim

ENV GITHUB_AUTH_TOKEN=0

COPY . .

RUN bun install
RUN bun run build

CMD ["bun", "run", "preview", "--host"]
