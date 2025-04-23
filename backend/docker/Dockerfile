FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Only build in production
ARG NODE_ENV=development
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 3000

# Use nodemon in development, regular node in production
CMD if [ "$NODE_ENV" = "production" ]; then npm start; else npm run dev; fi 