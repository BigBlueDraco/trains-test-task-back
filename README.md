# Trains-Back

Це README.md файл, який містить кроки для запуску проєкту.

## Початок роботи

Переконайтеся, що ви маєте встановлені [Node.js](https://nodejs.org) і [npm](https://www.npmjs.com/).

### Крок 1: Встановлення залежностей

Виконайте наступну команду, щоб встановити необхідні залежності:

```bash
$ npm install
```

### Крок 2: Налаштування бази даних

Створіть базу даних MySQL з назвою `mySQLDB`. Ви можете використовувати будь-який інструмент адміністрування баз даних, такий як [phpMyAdmin](https://www.phpmyadmin.net/) або командний рядок MySQL.

### Крок 3: Налаштування оточення

Створіть файл `.env` у кореневій папці проекту і скопіюйте вміст з файлу `exemple.env`. Відкрийте `.env` файл та вкажіть власні дані конфігурації, такі як ім'я користувача, пароль і назва бази даних, які ви використовуєте.

### Крок 4: Запуск проєкту

Виконайте наступну команду для запуску проєкту:

```bash
$ npm start
```

Тепер за замовчуванням ваш проєкт повинен бути доступний за адресою http://localhost:8080. Та якщо ви змінили порт та хост він буде за посиланням що відповідає вашій конфігурації

### Додатково: Використання файлу trainsDump

Якщо ви хочете заповнити базу даних тестовими даними, ви можете використати файл `trainsDump.sql`. Відкрийте файл і виконайте його в своїй базі даних MySQL, використовуючи, наприклад, команду:

```bash
$ mysql -u [username] -p [database_name] < trainsDump.sql
```

Це заповнить вашу базу даних зразковими даними для тестування.

## Контролер Cities

### Крок 1: Створення міста

Endpoint: `POST /cities`

Створює нове місто за допомогою наданої інформації. Приймає об'єкт `CreateCityDto` як тіло запиту. Повертає створене місто.

```json
Request body:
{
  "name": "Назва міста",
}
```

### Крок 2: Отримання списку міст

Endpoint: GET /cities

Повертає масив усіх міст.

### Крок 3: Отримання міста по id

Endpoint: GET /cities/:id

Отримує деталі конкретного міста за його ідентифікатором id. Повертає об'єкт міста.

### Крок 4: Оновлення міста

Endpoint: PATCH /cities/:id

Оновлює існуюче місто за допомогою наданої інформації. Приймає ідентифікатор міста id та об'єкт як тіло запиту. Повертає оновлене місто.

```json
Request body:
{
  "name": "Назва міста",
}
```

### Крок 5: Видалення міста

Endpoint: DELETE /cities/:id

Видаляє місто за його ідентифікатором id. Повертає підтвердження видалення.

## Контролер Trains

### Крок 1: Створення поїзда

Endpoint: `POST /trains`

Створює новий поїзд за допомогою наданої інформації. Приймає об'єкт як тіло запиту де fromId та toId це ідентифікатори міст. Повертає створений поїзд.

```json
Request body:
{
  "fromId": 1,
  "toId": 2
}
```

Зуважте що ідентифікатори точки відправлення та точки прибуття мають бути різні.
Приклад невірного тіла запиту:

```json
Request body:
{
  "fromId": 2,
  "toId": 2
}
```

### Крок 2: Отримання списку поїздів

Endpoint: GET /trains

Повертає список усіх поїздів. Можна фільтрувати список за допомогою параметрів fromId і toId. Наприклад, /trains?fromId=1&toId=2 поверне список поїздів, які їдуть з міста з ідентифікатором 1 до міста з ідентифікатором 2

### Крок 3: Отримання поїзда по id

Endpoint: GET /trains/:id

Отримує деталі конкретного поїзда за його ідентифікатором id. Повертає об'єкт поїзда.

### Крок 4: Оновлення поїзда

Endpoint: PATCH /trains/:id

Оновлює існуючий поїзд за допомогою наданої інформації. Приймає ідентифікатор поїзда id та об'єкт UpdateTrainDto як тіло запиту. Повертає оновлений поїзд.

```json
Request body:
{
  "fromId": 2,
  "toId": 3
}
```

### Крок 5: Видалення поїзда

Endpoint: DELETE /trains/:id

Видаляє поїзд за його ідентифікатором id. Повертає підтвердження видалення.

## NEST running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
