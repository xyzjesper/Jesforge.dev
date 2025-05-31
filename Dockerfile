FROM oven/bun:slim

COPY . .

ENV GITHUB_AUTH_TOKEN=${GITHUB_AUTH_TOKEN}

RUN bun install
RUN bun run build

CMD ["bun", "run", "preview", "--host"]
