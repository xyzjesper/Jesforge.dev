FROM oven/bun:slim

COPY . .

RUN bun install
RUN bun run build

CMD ["bun ", "run", "preview"]