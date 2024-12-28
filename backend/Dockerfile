FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production
RUN npm install typescript
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./
RUN npm install --production
EXPOSE 8080
CMD ["node", "build/index.js"]
