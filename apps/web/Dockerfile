FROM node:24-alpine
WORKDIR /web
COPY package.json ./
RUN npm install
COPY . .

ARG DIRECT_URL
ENV DIRECT_URL=${DIRECT_URL}
RUN npx prisma db pull
RUN npx prisma generate
RUN npm run build
RUN npm run start