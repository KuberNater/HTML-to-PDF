FROM node:20-alpine

RUN npm i -g pnpm

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY . .

RUN pnpm run build

RUN pnpm prune --prod

EXPOSE 8000

ENV PORT=8000

CMD [ "node", "dist/server.js" ]
