FROM node:25-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install


FROM gcr.io/distroless/nodejs20-debian13

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 5000

CMD ["index.js"]