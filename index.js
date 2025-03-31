const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Настройка хранения загружаемых файлов
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Указываем папку для сохранения файлов
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    // Генерируем уникальное имя файла
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Инициализация Multer
const upload = multer({ storage });

// Подаем статические файлы из папки public
app.use(express.static('public'));

// Маршрут для загрузки файла
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('Нет файла для обработки.');
    }
  
    // Получаем путь к загруженному файлу
    const filePath = req.file.path;
  
    // Читаем содержимое файла
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Ошибка чтения файла:', err);
        return res.status(500).send('Не удалось прочитать файл.');
      }
  
      // Применяем изменения к содержимому файла
      const modifiedText = modifyText(data);
  
      // Возвращаем измененный текст клиенту
      res.send(modifiedText);
    });
  });

// Маршрут для главной страницы (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
function modifyText(text) {
    // Здесь можно применить любые преобразования над текстом
    // Например, преобразуем все буквы в верхний регистр
    return text.toUpperCase();
  }
// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

