# borrow-project-backend

เหลือสร้าง schema และสร้าง api ของ

- admin
- type

## pre requires

- docker
- docker compose
- nodejs v.14+
- make (optional)

... or you need to use your db server. you can config at `.env` then docker is optional.

## exec to mongo cmd

```bash
docker exec -it borrow-backend-mongodb-database-1 bash
mongosh -u root -p example
```

## start this project

```bash
# run db first
docker compose up -d
npx prisma db seed
npm run start
```

## how to run db

- start

```bash
make up # for linux
docker compose up -d # any
```

- stop

```bash
make down # for linux
docker compose down # any
```

## update schema

Could config schema at `prisma/schema.prisma` and run

```bash
npm run migrate
```

## how to test api with postman

- import `borrow-project.postman_collection.json` to postman
- create env

![image](https://user-images.githubusercontent.com/47467214/223127584-a323123b-640a-4b29-af8f-3158b53ac524.png)

- select env

![image](https://user-images.githubusercontent.com/47467214/223127760-8a76ed4b-6e16-408d-9c61-a5d6af2cfb05.png)

- run it

![image](https://user-images.githubusercontent.com/47467214/223128181-02674bbc-93af-4171-b80d-99692fe18eaf.png)
