FROM node:16
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

EXPOSE 3000

RUN npx prisma generate

# RUN npx prisma db seed

CMD ["npm", "run", "start:migrate:prod"]
