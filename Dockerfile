FROM public.ecr.aws/docker/library/node:lts-alpine

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app
COPY package*.json ./
RUN apk add chromium


RUN npm install
COPY . .

CMD ["npm" , "run" , "watch"]
