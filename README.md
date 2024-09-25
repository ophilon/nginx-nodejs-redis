## Compose демо

## Node.js application with Nginx proxy and Redis database

## Приложение Node.js с прокси-сервером Nginx и базой данных Redis
Структура проекта:

```
.
├── README.md
├── compose.yaml
├── nginx
│   ├── Dockerfile
│   └── nginx.conf
└── web
    ├── Dockerfile
    ├── package.json
    └── server.js

2 directories, 7 files

```
[_compose.yaml_](compose.yaml)
```
redis:
    image: 'redislabs/redismod'
    ports:
      - '6379:6379'
  web1:
    restart: on-failure
    build: ./web
    hostname: web1
    ports:
      - '81:5000'
  web2:
    restart: on-failure
    build: ./web
    hostname: web2
    ports:
      - '82:5000'
  nginx:
    build: ./nginx
    ports:
    - '80:80'
    depends_on:
    - web1
    - web2
```

Файл compose определяет приложение с четырьмя службами `redis`, `nginx`, `web1` и `web2`. При развертывании приложения docker compose сопоставляет порт 80 контейнера служб nginx с портом 80 хоста, как указано в файле nginx.web1web2

> ℹ️ **_ИНФОРМАЦИЯ_**
> Nging работает на порту 80 - пожалуйста, проверьте, доступен ли этот порт. Redis по умолчанию работает на порту 6379. Убедитесь, что порт 6379 на хосте не используется другим контейнером, в противном случае порт следует изменить.

## Развертывание с помощью docker compose

```
$ docker compose up -d
[+] Running 24/24
 ⠿ redis Pulled                                                                                                                                                                                                                      ...
   ⠿ 565225d89260 Pull complete                                                                                                                                                                                                      
[+] Building 2.4s (22/25)
 => [nginx-nodejs-redis_nginx internal] load build definition from Dockerfile                                                                                                                                                         ...
[+] Running 5/5
 ⠿ Network nginx-nodejs-redis_default    Created                                                                                                                                                                                      
 ⠿ Container nginx-nodejs-redis-web2-1   Started                                                                                                                                                                                      
 ⠿ Container nginx-nodejs-redis-redis-1  Started                                                                                                                                                                                      
 ⠿ Container nginx-nodejs-redis-web1-1   Started                                                                                                                                                                                      
 ⠿ Container nginx-nodejs-redis-nginx-1  Started
```

## Ожидаемый результат
Список контейнеров должен содержать три запущенных контейнера и сопоставление портов, как показано ниже:

```
docker-compose ps
```

## Тестирование приложения

После запуска приложения перейдите http://localhost:80 в веб-браузере или выполните:

```
curl localhost:80
curl localhost:80
web1: Total number of visits is: 1
```

```
curl localhost:80
web1: Total number of visits is: 2
```
```
$ curl localhost:80
web2: Total number of visits is: 3
```

## Остановите и удалите контейнеры.

```
$ docker compose down
```