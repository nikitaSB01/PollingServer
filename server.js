const express = require("express");
const cors = require("cors"); // Для разрешения кросс-доменных запросов
const faker = require("faker"); // Для генерации случайных данных

const app = express();
const PORT = process.env.PORT || 3000; // Используем порт из переменных окружения или 3000

// Настройка CORS
const corsOptions = {
  origin: "*", // Разрешаем доступ с любых доменов
  methods: ["GET"], // Разрешаем только GET-запросы
};
app.use(cors(corsOptions));

// Маршрут для получения непрочитанных сообщений
app.get("/messages/unread", (req, res) => {
  const messages = generateMessages();
  res.json({
    status: "ok",
    timestamp: Date.now(),
    messages,
  });
});

// Функция для генерации случайных сообщений
function generateMessages() {
  const numberOfMessages = faker.datatype.number({ min: 1, max: 5 });
  const messages = [];

  for (let i = 0; i < numberOfMessages; i++) {
    messages.push({
      id: faker.datatype.uuid(),
      from: faker.internet.email(),
      subject: faker.lorem.words(3),
      body: faker.lorem.paragraph(),
      received: faker.date.recent().getTime(),
    });
  }

  return messages;
}

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
