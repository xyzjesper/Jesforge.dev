FROM oven/bun:slim

RUN bun install
RUN bun run build

CMD ["bun ", "run", "preview"]